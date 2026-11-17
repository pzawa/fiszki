import type { Word } from './db';
import { isDueToday, isNew } from './srs';

export type Direction = 'en-pl' | 'pl-en' | 'mix';

export interface StudyOptions {
  /** Maksymalna liczba nowych słówek w sesji. */
  newLimit: number;
  /** Powtórz wszystkie słówka niezależnie od terminu. */
  extra: boolean;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Wybiera słówka do sesji: najpierw zaległe powtórki, potem nowe (do limitu). */
export function pickSessionWords(words: Word[], opts: StudyOptions, now = Date.now()): Word[] {
  if (opts.extra) {
    return [...words].sort((a, b) => a.due - b.due);
  }
  const due = shuffle(words.filter((w) => isDueToday(w, now)));
  const fresh = words
    .filter(isNew)
    .sort((a, b) => a.createdAt - b.createdAt)
    .slice(0, Math.max(0, opts.newLimit));
  return [...due, ...shuffle(fresh)];
}

/** "all" albo lista id kategorii rozdzielona przecinkami. */
export function parseCats(value: string | null): number[] | 'all' {
  if (!value || value === 'all') return 'all';
  return value
    .split(',')
    .map(Number)
    .filter((n) => Number.isInteger(n) && n > 0);
}
