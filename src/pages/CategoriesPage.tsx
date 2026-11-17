import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { addCategory, db, orderedCategories, type Category } from '../db';
import { statsByCategory } from '../stats';
import { BackupReminder } from '../components/Banners';
import Icon from '../components/Icon';

const AVATAR_COLORS = 6;

/** Kolorowy kafelek z numerem kategorii (dekoracyjny – numer nie niesie dodatkowej informacji). */
export function Avatar({ category }: { category: Pick<Category, 'position'> }) {
  return (
    <span className={`avatar c${category.position % AVATAR_COLORS}`} aria-hidden="true">
      {category.position}
    </span>
  );
}

const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');

export default function CategoriesPage() {
  const categories = useLiveQuery(orderedCategories);
  const words = useLiveQuery(() => db.words.toArray());
  const [newName, setNewName] = useState('');
  const [filter, setFilter] = useState('');

  if (!categories || !words) return null;
  const stats = statsByCategory(words);
  const totalDue = [...stats.values()].reduce((n, s) => n + s.due + s.fresh, 0);
  const q = normalize(filter.trim());
  const shown = q
    ? categories.filter((c) => normalize(`${c.name} ${c.description ?? ''}`).includes(q))
    : categories;

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    await addCategory(newName);
    setNewName('');
  }

  return (
    <section aria-labelledby="page-title">
      <header className="page-head">
        <div>
          <h1 id="page-title">Kategorie</h1>
          <p className="subtitle">
            {categories.length} {plural(categories.length, 'kategoria', 'kategorie', 'kategorii')} ·{' '}
            {words.length} {plural(words.length, 'słówko', 'słówka', 'słówek')}
          </p>
        </div>
      </header>

      <BackupReminder />

      {words.length > 0 && (
        <Link to="/learn" className="hero">
          <span className="hero-icon">
            <Icon name="learn" size={28} />
          </span>
          <span className="hero-text">
            <strong>{totalDue > 0 ? 'Czas na naukę' : 'Wszystko powtórzone'}</strong>
            <span>
              {totalDue > 0
                ? `${totalDue} ${plural(totalDue, 'słówko czeka', 'słówka czekają', 'słówek czeka')} na Ciebie`
                : 'Wybierz kategorie i powtórz dodatkowo'}
            </span>
          </span>
          <Icon name="play" size={22} />
        </Link>
      )}

      {categories.length > 8 && (
        <div className="search full">
          <Icon name="search" size={18} />
          <input
            type="search"
            placeholder="Szukaj kategorii"
            aria-label="Szukaj kategorii"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {q ? `Znaleziono ${shown.length}` : ''}
      </p>

      {categories.length === 0 ? (
        <div className="empty">
          <span className="empty-icon">
            <Icon name="cards" size={40} />
          </span>
          <p>
            <strong>Nie masz jeszcze kategorii.</strong>
            <br />
            Dodaj pierwszą poniżej.
          </p>
        </div>
      ) : shown.length === 0 ? (
        <p className="muted">Nic nie znaleziono dla „{filter}”.</p>
      ) : (
        <ul className="cat-list" aria-label="Kategorie">
          {shown.map((c) => {
            const s = stats.get(c.id) ?? { total: 0, due: 0, fresh: 0 };
            const known = s.total - s.fresh;
            const pct = s.total ? Math.round((known / s.total) * 100) : 0;
            return (
              <li key={c.id} className="cat-row">
                <Link to={`/category/${c.id}`} className="cat-main">
                  <Avatar category={c} />
                  <span className="cat-text">
                    <span className="cat-name">{c.name}</span>
                    {c.description && <span className="cat-desc">{c.description}</span>}
                    <span className="cat-meta">
                      {s.total === 0 ? (
                        'brak słówek'
                      ) : (
                        <>
                          {s.total} {plural(s.total, 'słówko', 'słówka', 'słówek')}
                          {s.due > 0 && <span className="pill due">{s.due} do powtórki</span>}
                          {s.fresh > 0 && (
                            <span className="pill new">
                              {s.fresh} {plural(s.fresh, 'nowe', 'nowe', 'nowych')}
                            </span>
                          )}
                        </>
                      )}
                    </span>
                    {s.total > 0 && (
                      <span className="meter" aria-hidden="true">
                        <span style={{ width: `${pct}%` }} />
                      </span>
                    )}
                  </span>
                  <span className="chevron" aria-hidden="true">
                    <Icon name="back" size={20} />
                  </span>
                </Link>
                {s.total > 0 && (
                  <Link
                    to={`/study?cats=${c.id}`}
                    className="icon-button play"
                    aria-label={`Ucz się: ${c.name}`}
                    title="Ucz się"
                  >
                    <Icon name="play" size={20} />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <form className="add-form card" onSubmit={handleAdd}>
        <label htmlFor="new-category">Dodaj własną kategorię</label>
        <div className="input-row">
          <input
            id="new-category"
            placeholder="np. Owoce"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className="primary" disabled={!newName.trim()}>
            <Icon name="plus" />
            Dodaj
          </button>
        </div>
      </form>
    </section>
  );
}

export function plural(n: number, one: string, few: string, many: string) {
  if (n === 1) return one;
  const d = n % 10;
  const t = n % 100;
  return d >= 2 && d <= 4 && (t < 12 || t > 14) ? few : many;
}
