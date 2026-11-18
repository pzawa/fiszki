import 'fake-indexeddb/auto';
import Dexie from 'dexie';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WORD_PACKS } from './packs';
import { SEED_CATEGORIES } from './seed';

async function loadApp() {
  vi.resetModules();
  const mod = await import('./db');
  await mod.db.open();
  return mod.db;
}

beforeEach(async () => {
  await Dexie.delete('fiszki');
});

afterEach(async () => {
  const { db } = await import('./db');
  db.close();
});

describe('migracja v3 → v4', () => {
  it('zachowuje stare słówka i kategorie, dopisuje 5 nowych kategorii na końcu', async () => {
    // Stara wersja aplikacji (schemat v3) z danymi użytkowniczki.
    const old = new Dexie('fiszki');
    old.version(3).stores({ categories: '++id, name, position', words: '++id, categoryId, due', meta: 'key' });
    await old.open();
    const catId = (await old.table('categories').add({ name: 'Moje', position: 41, createdAt: 1 })) as number;
    await old.table('categories').add({ name: 'UI i UX', position: 42, createdAt: 2 }); // już istnieje u niej
    const uxId = (await old.table('categories').where('name').equals('UI i UX').first()).id;
    await old.table('words').bulkAdd([
      { categoryId: catId, en: 'cat', pl: 'kot', interval: 6, ease: 2.6, due: 123, reps: 3, lapses: 1, createdAt: 5 },
      { categoryId: uxId, en: 'Wireframe', pl: 'moja makieta', interval: 1, ease: 2.5, due: 9, reps: 1, lapses: 0, createdAt: 6 },
    ]);
    await old.table('meta').put({ key: 'lastBackupAt', value: 42 });
    old.close();

    const db = await loadApp();
    expect(db.verno).toBe(4);

    // Stare dane bez zmian.
    const cat = await db.words.where('en').equals('cat').first().catch(() => undefined);
    const words = await db.words.toArray();
    expect(cat ?? words.find((w) => w.en === 'cat')).toMatchObject({ pl: 'kot', interval: 6, reps: 3, lapses: 1, due: 123 });
    expect(await db.meta.get('lastBackupAt')).toEqual({ key: 'lastBackupAt', value: 42 });

    // Nowe kategorie po istniejących; istniejąca „UI i UX” nie jest dublowana.
    const cats = await db.categories.orderBy('position').toArray();
    expect(cats.filter((c) => c.name === 'UI i UX')).toHaveLength(1);
    const newNames = WORD_PACKS.map((p) => p.name).filter((n) => n !== 'UI i UX');
    expect(cats.slice(-4).map((c) => c.name)).toEqual(newNames);
    expect(cats.slice(-4).map((c) => c.position)).toEqual([43, 44, 45, 46]);

    // Słówka z list: wszystkie w nowych kategoriach, w „UI i UX” bez duplikatu „wireframe”.
    for (const pack of WORD_PACKS) {
      const c = cats.find((x) => x.name === pack.name)!;
      const inCat = await db.words.where('categoryId').equals(c.id).toArray();
      if (pack.name === 'UI i UX') {
        expect(inCat).toHaveLength(pack.words.length);
        expect(inCat.find((w) => w.en.toLowerCase() === 'wireframe')?.pl).toBe('moja makieta');
      } else {
        expect(inCat).toHaveLength(pack.words.length);
        expect(inCat.every((w) => w.reps === 0 && w.interval === 0 && w.ease === 2.5)).toBe(true);
      }
    }
    const focus = words.find((w) => w.en === 'focus');
    expect(focus?.pronunciation).toBe('FOŁ-kus');
  });

  it('nowa instalacja: 40 kategorii startowych + 5 ze słówkami', async () => {
    const db = await loadApp();
    const cats = await db.categories.orderBy('position').toArray();
    expect(cats).toHaveLength(SEED_CATEGORIES.length + WORD_PACKS.length);
    expect(cats.slice(-5).map((c) => c.name)).toEqual(WORD_PACKS.map((p) => p.name));
    const total = WORD_PACKS.reduce((n, p) => n + p.words.length, 0);
    expect(await db.words.count()).toBe(total);
  });
});
