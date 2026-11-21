import { describe, expect, it } from 'vitest';
import { EXAMPLES, exampleFor, parseExamples } from './examples';
import { IRREGULAR_VERBS_PACK, SEED_WORD_PACKS, WORD_PACKS } from './packs';

const ALL_PACKS = [...SEED_WORD_PACKS, IRREGULAR_VERBS_PACK, ...WORD_PACKS];

describe('przykładowe zdania', () => {
  it('każde zdanie pasuje do istniejącego słówka w swojej kategorii', () => {
    const packs = new Map(ALL_PACKS.map((p) => [p.name.toLowerCase(), new Set(p.words.map((w) => w.en.toLowerCase()))]));
    for (const [cat, words] of EXAMPLES) {
      expect(packs.has(cat), `kategoria: ${cat}`).toBe(true);
      for (const en of words.keys()) expect(packs.get(cat)!.has(en), `${cat}: ${en}`).toBe(true);
    }
  });

  it('każde gotowe słówko ma przykładowe zdanie', () => {
    const missing = ALL_PACKS.flatMap((p) => p.words.filter((w) => !exampleFor(EXAMPLES, p.name, w.en)).map((w) => `${p.name}: ${w.en}`));
    expect(missing).toEqual([]);
  });

  it('zdania są rozbudowane (co najmniej 6 słów), bez znaków psujących format', () => {
    for (const [cat, words] of EXAMPLES) {
      for (const [en, ex] of words) {
        expect(ex.split(/\s+/).length, `${cat}: ${en}`).toBeGreaterThanOrEqual(6);
        expect(ex, `${cat}: ${en}`).not.toMatch(/[|`]/);
      }
    }
  });

  it('parser', () => {
    const s = parseExamples('## Kat\nGo | We go home.\n# komentarz\n');
    expect(exampleFor(s, 'kat', 'go')).toBe('We go home.');
    expect(() => parseExamples('go | We go.')).toThrow();
    expect(() => parseExamples('## K\ngo')).toThrow();
    expect(() => parseExamples('## K\ngo | a\ngo | b')).toThrow();
  });
});
