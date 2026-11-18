import Dexie, { type EntityTable } from 'dexie';
import { SEED_CATEGORIES } from './seed';

export interface Category {
  id: number;
  name: string;
  /** Krótki opis tematu, np. "nowi ludzie, kilka słów o sobie". */
  description?: string;
  /** Kolejność na liście (gotowe kategorie 1–40, własne na końcu). */
  position: number;
  createdAt: number;
}

export interface Word {
  id: number;
  categoryId: number;
  en: string;
  pl: string;
  example?: string;
  /** Wymowa angielskiego słowa, np. "ˈæp.əl" (dodane później – starsze słówka jej nie mają). */
  pronunciation?: string;
  /** Aktualny odstęp między powtórkami w dniach (0 = w trakcie nauki). */
  interval: number;
  /** Współczynnik łatwości (SM-2), start 2.5, minimum 1.3. */
  ease: number;
  /** Timestamp następnej powtórki. */
  due: number;
  /** Liczba udanych powtórek z rzędu. */
  reps: number;
  /** Ile razy słówko zostało zapomniane. */
  lapses: number;
  createdAt: number;
}

export interface Meta {
  key: string;
  value: unknown;
}

/*
 * UWAGA – ochrona słówek przy aktualizacjach aplikacji:
 * - nigdy nie zmieniaj nazwy bazy ('fiszki') ani nie usuwaj starych wersji schematu,
 * - każdą zmianę schematu dodawaj jako NOWĄ wersję: db.version(N + 1).stores({...}).upgrade(...),
 *   Dexie sam przeniesie istniejące dane.
 */
export const db = new Dexie('fiszki') as Dexie & {
  categories: EntityTable<Category, 'id'>;
  words: EntityTable<Word, 'id'>;
  meta: EntityTable<Meta, 'key'>;
};

db.version(1).stores({
  categories: '++id, name',
  words: '++id, categoryId, due',
});

// v2: tabela na ustawienia aplikacji (np. data ostatniej kopii zapasowej).
db.version(2).stores({
  meta: 'key',
});

// v3: gotowe kategorie + kolejność kategorii. Istniejące kategorie i słówka zostają,
// brakujące gotowe kategorie są dopisywane (bez duplikatów po nazwie), własne trafiają na koniec.
db.version(3)
  .stores({ categories: '++id, name, position' })
  .upgrade(async (tx) => {
    const table = tx.table<Category, number>('categories');
    const existing = await table.toArray();
    const byName = new Map(existing.map((c) => [c.name.trim().toLowerCase(), c]));
    const now = Date.now();
    let pos = 0;
    for (const seed of SEED_CATEGORIES) {
      pos++;
      const match = byName.get(seed.name.toLowerCase());
      if (match) {
        await table.update(match.id, { position: pos, description: match.description ?? seed.description });
        byName.delete(seed.name.toLowerCase());
      } else {
        await table.add({ ...seed, position: pos, createdAt: now } as Category);
      }
    }
    const own = [...byName.values()].sort((a, b) => a.createdAt - b.createdAt);
    for (const c of own) await table.update(c.id, { position: ++pos });
  });

// Pierwsze uruchomienie (pusta baza): od razu gotowe kategorie.
db.on('populate', (tx) => {
  const now = Date.now();
  tx.table('categories').bulkAdd(SEED_CATEGORIES.map((s, i) => ({ ...s, position: i + 1, createdAt: now })));
});

/** Kategorie w kolejności wyświetlania. */
export function orderedCategories() {
  return db.categories.orderBy('position').toArray();
}

export async function getMeta<T>(key: string): Promise<T | undefined> {
  return (await db.meta.get(key))?.value as T | undefined;
}

export function setMeta(key: string, value: unknown) {
  return db.meta.put({ key, value });
}

/** Prosi przeglądarkę o trwałe przechowywanie danych (mniejsze ryzyko automatycznego usunięcia). */
export async function requestPersistentStorage() {
  try {
    if (navigator.storage?.persisted && !(await navigator.storage.persisted())) {
      await navigator.storage.persist?.();
    }
  } catch {
    /* przeglądarka nie obsługuje – trudno */
  }
}

// ---------- Kategorie ----------

export async function addCategory(name: string) {
  const last = await db.categories.orderBy('position').last();
  return db.categories.add({ name: name.trim(), position: (last?.position ?? 0) + 1, createdAt: Date.now() });
}

export function renameCategory(id: number, name: string) {
  return db.categories.update(id, { name: name.trim() });
}

export function deleteCategory(id: number) {
  return db.transaction('rw', db.categories, db.words, async () => {
    await db.words.where('categoryId').equals(id).delete();
    await db.categories.delete(id);
  });
}

// ---------- Słówka ----------

export interface WordInput {
  en: string;
  pl: string;
  example?: string;
  pronunciation?: string;
}

function clean(input: WordInput): WordInput {
  const example = input.example?.trim();
  const pronunciation = input.pronunciation?.trim();
  return {
    en: input.en.trim(),
    pl: input.pl.trim(),
    example: example || undefined,
    pronunciation: pronunciation || undefined,
  };
}

export function addWord(categoryId: number, input: WordInput) {
  const now = Date.now();
  return db.words.add({
    ...clean(input),
    categoryId,
    interval: 0,
    ease: 2.5,
    due: now,
    reps: 0,
    lapses: 0,
    createdAt: now,
  });
}

export function updateWord(id: number, input: WordInput) {
  return db.words.update(id, clean(input));
}

export function deleteWord(id: number) {
  return db.words.delete(id);
}

// ---------- Kopia zapasowa ----------

export interface Backup {
  app: 'fiszki';
  version: 1;
  exportedAt: string;
  categories: Category[];
  words: Word[];
}

export const LAST_BACKUP_KEY = 'lastBackupAt';
export const BACKUP_REMINDER_DAYS = 14;

export async function exportData(): Promise<Backup> {
  const [categories, words] = await Promise.all([db.categories.toArray(), db.words.toArray()]);
  return { app: 'fiszki', version: 1, exportedAt: new Date().toISOString(), categories, words };
}

export function parseBackup(json: string): Backup {
  const data = JSON.parse(json);
  if (data?.app !== 'fiszki' || !Array.isArray(data.categories) || !Array.isArray(data.words)) {
    throw new Error('To nie jest plik kopii zapasowej Fiszek.');
  }
  return data as Backup;
}

export async function importData(backup: Backup) {
  await db.transaction('rw', db.categories, db.words, async () => {
    await db.words.clear();
    await db.categories.clear();
    // Starsze kopie nie mają pola position – nadajemy kolejność z pliku.
    await db.categories.bulkAdd(
      backup.categories.map((c, i) => ({ ...c, position: typeof c.position === 'number' ? c.position : i + 1 })),
    );
    await db.words.bulkAdd(backup.words);
  });
}
