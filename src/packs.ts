import { WCAG } from './packs/wcag';
import { AI } from './packs/ai';
import { FRONTEND } from './packs/frontend';
import { UX } from './packs/ux';
import { CLAUDE_CODE } from './packs/claude-code';
import { IRREGULAR_VERBS } from './packs/irregular-verbs';
import { SEED_WORDS_1 } from './packs/seed-words-1';
import { SEED_WORDS_2 } from './packs/seed-words-2';
import { SEED_WORDS_3 } from './packs/seed-words-3';
import { SEED_WORDS_4 } from './packs/seed-words-4';
import { SEED_WORDS_5 } from './packs/seed-words-5';

/**
 * Gotowe kategorie ze słówkami. Dodawane do bazy raz – w migracji v4 (istniejąca baza)
 * albo przy pierwszym uruchomieniu. Zmiana tych list NIE trafi do istniejących instalacji
 * sama z siebie – do tego potrzebna jest nowa wersja bazy (patrz CLAUDE.md).
 *
 * Format linii: `angielski | polski | wymowa` (wymowa opcjonalna; WIELKIE litery = akcent).
 */
export interface PackWord {
  en: string;
  pl: string;
  pronunciation?: string;
}

export interface WordPack {
  name: string;
  description?: string;
  words: PackWord[];
}

export function parsePack(raw: string): PackWord[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const [en, pl, pron] = line.split('|').map((p) => p.trim());
      if (!en || !pl) throw new Error(`Niepoprawna linia: ${line}`);
      return pron ? { en, pl, pronunciation: pron } : { en, pl };
    });
}

export const WORD_PACKS: WordPack[] = [
  { name: 'WCAG i dostępność cyfrowa', description: 'czytnik ekranu, kontrast, tekst alternatywny', words: parsePack(WCAG) },
  { name: 'AI (sztuczna inteligencja)', description: 'model, prompt, uczenie maszynowe', words: parsePack(AI) },
  { name: 'Frontend (HTML, CSS, JS)', description: 'znaczniki, selektory, funkcje, DOM', words: parsePack(FRONTEND) },
  { name: 'UI i UX', description: 'makieta, prototyp, badania z użytkownikami', words: parsePack(UX) },
  { name: 'Claude Code', description: 'słowa i komunikaty z konsoli', words: parsePack(CLAUDE_CODE) },
];

/**
 * Kilka kategorii w jednym tekście: linia `## Nazwa kategorii`, pod nią słówka w formacie jak wyżej.
 */
export function parseSections(raw: string): WordPack[] {
  const packs: WordPack[] = [];
  let lines: string[] = [];
  const flush = () => {
    if (packs.length) packs[packs.length - 1].words = parsePack(lines.join('\n'));
    lines = [];
  };
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (t.startsWith('## ')) {
      flush();
      packs.push({ name: t.slice(3).trim(), words: [] });
    } else if (t) {
      if (!packs.length) throw new Error(`Słówko przed nagłówkiem kategorii: ${t}`);
      lines.push(t);
    }
  }
  flush();
  return packs;
}

/**
 * v5: po 50 słówek do 40 startowych kategorii (`seed.ts`), dopasowanie po nazwie.
 * Dopisywane tylko do istniejących kategorii – usunięta kategoria startowa nie wraca.
 */
export const SEED_WORD_PACKS: WordPack[] = [SEED_WORDS_1, SEED_WORDS_2, SEED_WORDS_3, SEED_WORDS_4, SEED_WORDS_5].flatMap(
  parseSections,
);

/** v5: nowa kategoria. Angielski: trzy formy („go – went – gone”), polski: bezokolicznik. */
export const IRREGULAR_VERBS_PACK: WordPack = {
  name: 'Czasowniki nieregularne',
  description: 'go – went – gone, trzy formy',
  words: parsePack(IRREGULAR_VERBS),
};
