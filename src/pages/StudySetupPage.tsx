import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, orderedCategories } from '../db';
import CategoryPicker from '../components/CategoryPicker';
import Icon from '../components/Icon';
import { statsByCategory } from '../stats';
import { pickSessionWords, type Direction } from '../study';
import { isNew } from '../srs';

const PREFS_KEY = 'fiszki.studyPrefs';
const MAX_NEW = 200;

interface Prefs {
  selected: number[] | null;
  dir: Direction;
  newLimit: number;
}

function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return { selected: null, dir: 'en-pl', newLimit: 20, ...JSON.parse(raw) };
  } catch {
    /* brak dostępu do localStorage */
  }
  return { selected: null, dir: 'en-pl', newLimit: 20 };
}

const DIRECTIONS: [Direction, string][] = [
  ['en-pl', 'EN → PL'],
  ['pl-en', 'PL → EN'],
  ['mix', 'Losowo'],
];

export default function StudySetupPage() {
  const navigate = useNavigate();
  const allCategories = useLiveQuery(orderedCategories);
  const words = useLiveQuery(() => db.words.toArray());
  // Do nauki pokazujemy tylko kategorie, w których są słówka.
  const categories = useMemo(() => {
    if (!allCategories || !words) return undefined;
    const used = new Set(words.map((w) => w.categoryId));
    return allCategories.filter((c) => used.has(c.id));
  }, [allCategories, words]);
  const [prefs] = useState(loadPrefs);
  const [selected, setSelected] = useState<Set<number> | null>(null);
  const [dir, setDir] = useState<Direction>(prefs.dir);
  const [newLimit, setNewLimit] = useState(prefs.newLimit);

  // Domyślnie: poprzedni wybór (jeśli kategorie nadal istnieją) albo wszystkie.
  useEffect(() => {
    if (!categories || selected) return;
    const ids = new Set(categories.map((c) => c.id));
    const prev = prefs.selected?.filter((id) => ids.has(id));
    setSelected(new Set(prev && prev.length ? prev : ids));
  }, [categories, selected, prefs.selected]);

  if (!categories || !words || !selected) return null;

  if (categories.length === 0 || words.length === 0) {
    return (
      <section aria-labelledby="page-title">
        <header className="page-head">
          <h1 id="page-title">Nauka</h1>
        </header>
        <div className="empty">
          <span className="empty-icon">
            <Icon name="learn" size={40} />
          </span>
          <p>Najpierw dodaj słówka do jednej z kategorii.</p>
          <Link to="/" className="button primary">
            Przejdź do kategorii
          </Link>
        </div>
      </section>
    );
  }

  const stats = statsByCategory(words);
  const allSelected = categories.every((c) => selected.has(c.id));
  const inSelection = words.filter((w) => selected.has(w.categoryId));
  const session = pickSessionWords(inSelection, { newLimit, extra: false });
  const newCount = session.filter(isNew).length;
  const dueCount = session.length - newCount;
  const clamp = (n: number) => Math.max(0, Math.min(MAX_NEW, n));

  function start(extra: boolean) {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ selected: [...selected!], dir, newLimit }));
    } catch {
      /* ignoruj */
    }
    const params = new URLSearchParams({
      cats: allSelected ? 'all' : [...selected!].join(','),
      dir,
      new: String(newLimit),
    });
    if (extra) params.set('extra', '1');
    navigate(`/study?${params}`);
  }

  return (
    <section aria-labelledby="page-title">
      <header className="page-head">
        <h1 id="page-title">Nauka</h1>
      </header>

      <div className="card">
        <CategoryPicker categories={categories} stats={stats} selected={selected} onChange={setSelected} />
      </div>

      <div className="card">
        <h2>Ustawienia sesji</h2>
        <fieldset className="option">
          <legend>Kierunek</legend>
          <div className="segmented">
            {DIRECTIONS.map(([value, label]) => (
              <label key={value} className={dir === value ? 'active' : ''}>
                <input
                  type="radio"
                  name="direction"
                  value={value}
                  checked={dir === value}
                  onChange={() => setDir(value)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="option">
          <label htmlFor="new-limit">Nowych słówek na sesję</label>
          <div className="stepper">
            <button
              type="button"
              className="icon-button"
              aria-label="Mniej nowych słówek"
              onClick={() => setNewLimit((n) => clamp(n - 5))}
              disabled={newLimit <= 0}
            >
              −
            </button>
            <input
              id="new-limit"
              type="number"
              inputMode="numeric"
              min={0}
              max={MAX_NEW}
              value={newLimit}
              onChange={(e) => setNewLimit(clamp(Number(e.target.value) || 0))}
            />
            <button
              type="button"
              className="icon-button"
              aria-label="Więcej nowych słówek"
              onClick={() => setNewLimit((n) => clamp(n + 5))}
              disabled={newLimit >= MAX_NEW}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="start-bar" aria-live="polite">
        {selected.size === 0 ? (
          <p className="muted">Zaznacz co najmniej jedną kategorię.</p>
        ) : session.length > 0 ? (
          <>
            <p className="session-summary">
              <span>
                <strong>{dueCount}</strong> do powtórki
              </span>
              <span>
                <strong>{newCount}</strong> nowych
              </span>
            </p>
            <button type="button" className="primary big" onClick={() => start(false)}>
              <Icon name="play" />
              Rozpocznij naukę
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Na dziś wszystko powtórzone!</strong>
              <br />
              <span className="muted">Możesz powtórzyć słówka dodatkowo.</span>
            </p>
            <button type="button" className="big" disabled={inSelection.length === 0} onClick={() => start(true)}>
              <Icon name="flip" />
              Powtórz mimo to ({inSelection.length})
            </button>
          </>
        )}
      </div>
    </section>
  );
}
