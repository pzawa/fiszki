import { useEffect, useRef } from 'react';
import type { Category } from '../db';
import { Avatar, plural } from '../pages/CategoriesPage';

export interface CategoryStats {
  total: number;
  due: number;
  fresh: number;
}

interface Props {
  categories: Category[];
  stats: Map<number, CategoryStats>;
  selected: Set<number>;
  onChange: (selected: Set<number>) => void;
}

export default function CategoryPicker({ categories, stats, selected, onChange }: Props) {
  const allRef = useRef<HTMLInputElement>(null);
  const count = categories.filter((c) => selected.has(c.id)).length;
  const allSelected = categories.length > 0 && count === categories.length;

  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = count > 0 && !allSelected;
  }, [count, allSelected]);

  function toggle(id: number) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(next);
  }

  return (
    <fieldset className="picker">
      <legend>Z czego się uczysz?</legend>
      <label className="picker-row picker-all">
        <input
          ref={allRef}
          type="checkbox"
          checked={allSelected}
          onChange={() => onChange(allSelected ? new Set() : new Set(categories.map((c) => c.id)))}
        />
        <span className="name">Wszystkie kategorie</span>
        <span className="muted">
          {count}/{categories.length}
        </span>
      </label>
      {categories.map((c) => {
        const s = stats.get(c.id) ?? { total: 0, due: 0, fresh: 0 };
        return (
          <label key={c.id} className="picker-row">
            <input type="checkbox" checked={selected.has(c.id)} onChange={() => toggle(c.id)} />
            <Avatar category={c} />
            <span className="picker-text">
              <span className="name">{c.name}</span>
              <span className="pills">
                {s.due > 0 && <span className="pill due">{s.due} do powtórki</span>}
                {s.fresh > 0 && (
                  <span className="pill new">
                    {s.fresh} {plural(s.fresh, 'nowe', 'nowe', 'nowych')}
                  </span>
                )}
                {s.total === 0 && <span className="muted">pusta</span>}
                {s.total > 0 && s.due === 0 && s.fresh === 0 && <span className="muted">powtórzone</span>}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
