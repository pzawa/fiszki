import type { Word } from './db';

/** Uproszczony algorytm SM-2 (jak w Anki). */

export type Rating = 'again' | 'hard' | 'good' | 'easy';

export const MINUTE = 60 * 1000;
export const DAY = 24 * 60 * MINUTE;
export const MIN_EASE = 1.3;
/** Odstęp dla "Trudne" przy słówku w trakcie nauki. */
export const LEARNING_STEP = 10 * MINUTE;

/** Słówko jest w trakcie nauki i powinno wrócić jeszcze w tej sesji. */
export function isLearning(s: Pick<SrsState, 'interval'>) {
  return s.interval === 0;
}

export type SrsState = Pick<Word, 'interval' | 'ease' | 'due' | 'reps' | 'lapses'>;

const round2 = (x: number) => Math.round(x * 100) / 100;

export function isNew(w: Pick<Word, 'reps' | 'lapses'>) {
  return w.reps === 0 && w.lapses === 0;
}

export function endOfToday(now = Date.now()) {
  const d = new Date(now);
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

/** Słówko już się uczyło i jego powtórka przypada najpóźniej dziś. */
export function isDueToday(w: SrsState, now = Date.now()) {
  return !isNew(w) && w.due <= endOfToday(now);
}

function goodInterval(interval: number, ease: number) {
  if (interval < 1) return 1;
  if (interval < 3) return 3;
  return Math.round(interval * ease);
}

/** Zwraca nowy stan powtórek po ocenie odpowiedzi. */
export function review(w: SrsState, rating: Rating, now = Date.now()): SrsState {
  let { interval, ease } = w;

  if (rating === 'again') {
    // Nie umiem: wraca za minutę (jeszcze w tej sesji) i od nowa buduje odstępy.
    return {
      interval: 0,
      ease: Math.max(MIN_EASE, round2(ease - 0.2)),
      reps: 0,
      lapses: w.lapses + 1,
      due: now + MINUTE,
    };
  }

  if (rating === 'hard' && interval < 1) {
    // Trudne przy słówku w trakcie nauki (nowe / zapomniane): wraca za 10 min, w tej samej sesji.
    return { interval: 0, ease, reps: w.reps + 1, lapses: w.lapses, due: now + LEARNING_STEP };
  }

  if (rating === 'hard') {
    interval = Math.max(1, Math.round(interval * 1.2));
    ease = Math.max(MIN_EASE, ease - 0.15);
  } else if (rating === 'good') {
    interval = goodInterval(interval, ease);
  } else {
    const g = goodInterval(interval, ease);
    interval = Math.max(g + 1, Math.round(g * 1.3));
    ease = ease + 0.15;
  }

  return {
    interval,
    ease: round2(ease),
    reps: w.reps + 1,
    lapses: w.lapses,
    due: now + interval * DAY,
  };
}

/** Czytelny opis odstępu, np. "1 min", "3 dni". */
export function formatDelay(ms: number) {
  if (ms < 60 * MINUTE) return `${Math.max(1, Math.round(ms / MINUTE))} min`;
  if (ms < DAY) return `${Math.round(ms / (60 * MINUTE))} godz.`;
  const days = Math.round(ms / DAY);
  if (days === 1) return '1 dzień';
  if (days < 30) return `${days} dni`;
  const months = Math.round(days / 30);
  return months === 1 ? '1 mies.' : `${months} mies.`;
}
