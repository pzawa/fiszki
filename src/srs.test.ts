import { describe, expect, it } from 'vitest';
import { DAY, MIN_EASE, MINUTE, isDueToday, isNew, review, type SrsState } from './srs';
import { pickSessionWords } from './study';
import type { Word } from './db';

const NOW = new Date(2026, 10, 17, 12, 0).getTime();
const fresh: SrsState = { interval: 0, ease: 2.5, due: NOW, reps: 0, lapses: 0 };

describe('review', () => {
  it('rośnie odstęp przy kolejnych "Umiem": 1 → 3 → 8 dni', () => {
    const a = review(fresh, 'good', NOW);
    expect(a.interval).toBe(1);
    expect(a.due).toBe(NOW + DAY);
    const b = review(a, 'good', NOW);
    expect(b.interval).toBe(3);
    const c = review(b, 'good', NOW);
    expect(c.interval).toBe(8);
  });

  it('"Nie umiem" resetuje odstęp i wraca za minutę', () => {
    const learned = { ...fresh, interval: 20, reps: 4 };
    const r = review(learned, 'again', NOW);
    expect(r.interval).toBe(0);
    expect(r.reps).toBe(0);
    expect(r.lapses).toBe(1);
    expect(r.due).toBe(NOW + MINUTE);
    expect(isNew(r)).toBe(false);
  });

  it('"Trudne" przy nowym słówku wraca za 10 min, potem "Umiem" daje 1 dzień', () => {
    const r = review(fresh, 'hard', NOW);
    expect(r.interval).toBe(0);
    expect(r.due).toBe(NOW + 10 * MINUTE);
    expect(r.ease).toBe(2.5);
    expect(isNew(r)).toBe(false);
    expect(isDueToday(r, NOW)).toBe(true);
    expect(review(r, 'good', NOW).interval).toBe(1);
  });

  it('"Trudne" przy zapomnianym słówku też wraca w sesji', () => {
    const lapsed = review({ ...fresh, interval: 20, reps: 4 }, 'again', NOW);
    expect(review(lapsed, 'hard', NOW).interval).toBe(0);
  });

  it('ease nie spada poniżej minimum', () => {
    let s = fresh;
    for (let i = 0; i < 20; i++) s = review(s, 'again', NOW);
    expect(s.ease).toBe(MIN_EASE);
  });

  it('"Łatwe" daje dłuższy odstęp niż "Umiem", a "Trudne" krótszy', () => {
    const base = { ...fresh, interval: 10, reps: 3 };
    const hard = review(base, 'hard', NOW).interval;
    const good = review(base, 'good', NOW).interval;
    const easy = review(base, 'easy', NOW).interval;
    expect(hard).toBeLessThan(good);
    expect(good).toBeLessThan(easy);
  });
});

describe('pickSessionWords', () => {
  const mk = (id: number, s: Partial<SrsState>): Word => ({
    id, categoryId: 1, en: `w${id}`, pl: `s${id}`, createdAt: id, ...fresh, ...s,
  });

  it('bierze zaległe powtórki i nowe do limitu, pomija przyszłe', () => {
    const words = [
      mk(1, { reps: 1, interval: 1, due: NOW - DAY }), // zaległe
      mk(2, { reps: 1, interval: 3, due: NOW + 3 * DAY }), // przyszłe
      mk(3, {}), mk(4, {}), mk(5, {}), // nowe
    ];
    const picked = pickSessionWords(words, { newLimit: 2, extra: false }, NOW);
    expect(picked.map((w) => w.id).sort()).toEqual([1, 3, 4]);
    expect(picked[0].id).toBe(1);
    expect(isDueToday(words[1], NOW)).toBe(false);
  });

  it('tryb extra bierze wszystko', () => {
    const words = [mk(1, { reps: 1, due: NOW + 5 * DAY }), mk(2, {})];
    expect(pickSessionWords(words, { newLimit: 0, extra: true }, NOW)).toHaveLength(2);
  });
});
