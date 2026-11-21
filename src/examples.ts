import { EXAMPLES_SEED_1 } from './examples/seed-1';
import { EXAMPLES_SEED_2 } from './examples/seed-2';
import { EXAMPLES_SEED_3 } from './examples/seed-3';
import { EXAMPLES_SEED_4 } from './examples/seed-4';
import { EXAMPLES_SEED_5 } from './examples/seed-5';
import { EXAMPLES_IRREGULAR_VERBS } from './examples/irregular-verbs';
import { EXAMPLES_WCAG } from './examples/wcag';
import { EXAMPLES_AI } from './examples/ai';
import { EXAMPLES_FRONTEND } from './examples/frontend';
import { EXAMPLES_UX } from './examples/ux';
import { EXAMPLES_CLAUDE_CODE } from './examples/claude-code';

/**
 * Przykładowe zdania do gotowych słówek (v6). Klucz: nazwa kategorii + angielskie słowo (bez rozróżniania wielkości liter).
 * Format: linia `## Nazwa kategorii`, pod nią `angielski | przykładowe zdanie`.
 * Nie zmieniaj tych list po publikacji – kolejne zdania to nowa wersja bazy (patrz CLAUDE.md).
 */
export type ExampleSections = Map<string, Map<string, string>>;

const key = (s: string) => s.trim().toLowerCase();

export function parseExamples(raw: string): ExampleSections {
  const sections: ExampleSections = new Map();
  let current: Map<string, string> | undefined;
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t || (t.startsWith('#') && !t.startsWith('## '))) continue;
    if (t.startsWith('## ')) {
      current = new Map();
      sections.set(key(t.slice(3)), current);
      continue;
    }
    const i = t.indexOf('|');
    const en = t.slice(0, i).trim();
    const example = t.slice(i + 1).trim();
    if (!current) throw new Error(`Przykład przed nagłówkiem kategorii: ${t}`);
    if (i < 0 || !en || !example) throw new Error(`Niepoprawna linia: ${t}`);
    if (current.has(key(en))) throw new Error(`Powtórzone słówko: ${en}`);
    current.set(key(en), example);
  }
  return sections;
}

export function exampleFor(sections: ExampleSections, category: string, en: string) {
  return sections.get(key(category))?.get(key(en));
}

export const EXAMPLES: ExampleSections = parseExamples(
  [
    EXAMPLES_SEED_1,
    EXAMPLES_SEED_2,
    EXAMPLES_SEED_3,
    EXAMPLES_SEED_4,
    EXAMPLES_SEED_5,
    EXAMPLES_IRREGULAR_VERBS,
    EXAMPLES_WCAG,
    EXAMPLES_AI,
    EXAMPLES_FRONTEND,
    EXAMPLES_UX,
    EXAMPLES_CLAUDE_CODE,
  ].join('\n'),
);
