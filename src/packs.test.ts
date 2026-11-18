import { describe, expect, it } from 'vitest';
import { IRREGULAR_VERBS_PACK, SEED_WORD_PACKS, WORD_PACKS, parsePack, parseSections } from './packs';
import { SEED_CATEGORIES } from './seed';

describe('gotowe kategorie ze słówkami', () => {
  it('jest ich 5, każda ma od 100 do 200 słówek', () => {
    expect(WORD_PACKS.map((p) => p.name)).toEqual([
      'WCAG i dostępność cyfrowa',
      'AI (sztuczna inteligencja)',
      'Frontend (HTML, CSS, JS)',
      'UI i UX',
      'Claude Code',
    ]);
    for (const pack of WORD_PACKS) {
      expect(pack.words.length, pack.name).toBeGreaterThanOrEqual(100);
      expect(pack.words.length, pack.name).toBeLessThanOrEqual(200);
    }
  });

  it('słówka w kategorii się nie powtarzają i mają tłumaczenie', () => {
    for (const pack of WORD_PACKS) {
      const seen = new Set<string>();
      for (const w of pack.words) {
        const key = w.en.toLowerCase();
        expect(seen.has(key), `${pack.name}: ${w.en}`).toBe(false);
        seen.add(key);
        expect(w.pl, w.en).not.toBe('');
      }
    }
  });

  it('nazwy nie kolidują z 40 kategoriami startowymi', () => {
    const seed = new Set(SEED_CATEGORIES.map((c) => c.name.toLowerCase()));
    for (const pack of WORD_PACKS) expect(seed.has(pack.name.toLowerCase())).toBe(false);
  });

  it('parser: wymowa jest opcjonalna, komentarze pomijane', () => {
    expect(parsePack('# komentarz\nfocus | fokus | FOŁ-kus\nalt text | tekst alternatywny\n')).toEqual([
      { en: 'focus', pl: 'fokus', pronunciation: 'FOŁ-kus' },
      { en: 'alt text', pl: 'tekst alternatywny' },
    ]);
    expect(() => parsePack('samo słowo')).toThrow();
  });
});

describe('słówka do 40 startowych kategorii', () => {
  it('każda startowa kategoria ma dokładnie 50 słówek, nazwy jak w seed.ts', () => {
    expect(SEED_WORD_PACKS.map((p) => p.name)).toEqual(SEED_CATEGORIES.map((c) => c.name));
    for (const pack of SEED_WORD_PACKS) {
      expect(pack.words, pack.name).toHaveLength(50);
      const ens = pack.words.map((w) => w.en.toLowerCase());
      expect(new Set(ens).size, pack.name).toBe(50);
    }
  });

  it('parser sekcji', () => {
    expect(parseSections('## A\nx | iks\n\n## B\ny | igrek | i')).toEqual([
      { name: 'A', words: [{ en: 'x', pl: 'iks' }] },
      { name: 'B', words: [{ en: 'y', pl: 'igrek', pronunciation: 'i' }] },
    ]);
    expect(() => parseSections('x | iks')).toThrow();
  });
});

describe('czasowniki nieregularne', () => {
  it('trzy formy po angielsku, wymowa trzech form, bez powtórzeń', () => {
    const { words } = IRREGULAR_VERBS_PACK;
    expect(words.length).toBeGreaterThanOrEqual(100);
    for (const w of words) {
      expect(w.en.split(' – '), w.en).toHaveLength(3);
      expect(w.pronunciation?.split(' – '), w.en).toHaveLength(3);
    }
    expect(new Set(words.map((w) => w.en)).size).toBe(words.length);
  });
});
