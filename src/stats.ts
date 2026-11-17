import type { Word } from './db';
import type { CategoryStats } from './components/CategoryPicker';
import { isDueToday, isNew } from './srs';

export function statsByCategory(words: Word[], now = Date.now()) {
  const map = new Map<number, CategoryStats>();
  for (const w of words) {
    const s = map.get(w.categoryId) ?? { total: 0, due: 0, fresh: 0 };
    s.total++;
    if (isNew(w)) s.fresh++;
    else if (isDueToday(w, now)) s.due++;
    map.set(w.categoryId, s);
  }
  return map;
}
