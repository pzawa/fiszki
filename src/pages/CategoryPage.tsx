import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { addWord, db, deleteCategory, deleteWord, renameCategory, updateWord, type Word } from '../db';
import WordForm from '../components/WordForm';
import Pron from '../components/Pron';
import Icon from '../components/Icon';
import { Avatar, plural } from './CategoriesPage';
import { formatDelay, isDueToday, isNew } from '../srs';

function status(w: Word) {
  if (isNew(w)) return <span className="pill new">nowe</span>;
  if (isDueToday(w)) return <span className="pill due">do powtórki</span>;
  return <span className="when">za {formatDelay(w.due - Date.now())}</span>;
}

export default function CategoryPage() {
  const id = Number(useParams().id);
  const category = useLiveQuery(() => db.categories.get(id), [id]);
  const words = useLiveQuery(() => db.words.where('categoryId').equals(id).reverse().sortBy('createdAt'), [id]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filter, setFilter] = useState('');
  const [renaming, setRenaming] = useState<string | null>(null);
  const [justAddedId, setJustAddedId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Podświetlenie świeżo dodanego słówka gaśnie po chwili.
  useEffect(() => {
    if (justAddedId === null) return;
    const t = setTimeout(() => setJustAddedId(null), 2500);
    return () => clearTimeout(t);
  }, [justAddedId]);

  if (category === undefined && words !== undefined) {
    return (
      <section className="empty">
        <p>Nie ma takiej kategorii.</p>
        <Link to="/" className="button">
          Wróć do listy
        </Link>
      </section>
    );
  }
  if (!category || !words) return null;

  const q = filter.trim().toLowerCase();
  const shown = q ? words.filter((w) => w.en.toLowerCase().includes(q) || w.pl.toLowerCase().includes(q)) : words;

  async function handleRename(e: FormEvent) {
    e.preventDefault();
    if (!renaming?.trim()) return;
    await renameCategory(id, renaming);
    setRenaming(null);
  }

  async function handleDeleteCategory() {
    const n = words!.length;
    const msg = n
      ? `Usunąć kategorię „${category!.name}” razem z ${n} ${plural(n, 'słówkiem', 'słówkami', 'słówkami')}?`
      : `Usunąć kategorię „${category!.name}”?`;
    if (!confirm(msg)) return;
    await deleteCategory(id);
    navigate('/', { replace: true });
  }

  async function handleAdd(input: Parameters<typeof addWord>[1]) {
    const dup = words!.find((w) => w.en.trim().toLowerCase() === input.en.trim().toLowerCase());
    if (dup && !confirm(`Słówko „${dup.en}” już jest w tej kategorii (${dup.pl}). Dodać mimo to?`)) return false;
    const newId = await addWord(id, input);
    setFilter('');
    setJustAddedId(newId);
  }

  return (
    <section aria-labelledby="page-title">
      <Link to="/" className="back-link">
        <Icon name="back" size={20} />
        Kategorie
      </Link>
      {renaming !== null ? (
        <form className="add-form card" onSubmit={handleRename}>
          <label htmlFor="rename">Nazwa kategorii</label>
          <div className="input-row">
            <input id="rename" value={renaming} onChange={(e) => setRenaming(e.target.value)} autoFocus autoComplete="off" />
            <button type="submit" className="primary" disabled={!renaming.trim()}>
              <Icon name="check" />
              Zapisz
            </button>
            <button type="button" onClick={() => setRenaming(null)}>
              Anuluj
            </button>
          </div>
        </form>
      ) : (
        <header className="page-head">
          <div className="title-with-avatar">
            <Avatar category={category} />
            <div>
              <h1 id="page-title">{category.name}</h1>
              <p className="subtitle">
                {category.description && <>{category.description} · </>}
                {words.length} {plural(words.length, 'słówko', 'słówka', 'słówek')}
              </p>
            </div>
          </div>
          <div className="head-actions">
            {words.length > 0 && (
              <Link to={`/study?cats=${id}`} className="button primary">
                <Icon name="play" size={18} />
                Ucz się
              </Link>
            )}
            <button
              type="button"
              className="icon-button"
              aria-label="Zmień nazwę kategorii"
              title="Zmień nazwę"
              onClick={() => setRenaming(category.name)}
            >
              <Icon name="pencil" size={20} />
            </button>
            <button
              type="button"
              className="icon-button danger"
              aria-label="Usuń kategorię"
              title="Usuń kategorię"
              onClick={handleDeleteCategory}
            >
              <Icon name="trash" size={20} />
            </button>
          </div>
        </header>
      )}

      <div className="card">
        <h2>Dodaj słówko</h2>
        <WordForm submitLabel="Dodaj słówko" onSubmit={handleAdd} />
      </div>

      {words.length === 0 ? (
        <div className="empty">
          <span className="empty-icon">
            <Icon name="sparkle" size={40} />
          </span>
          <p>Ta kategoria jest pusta. Dodaj pierwsze słówko powyżej.</p>
        </div>
      ) : (
        <>
          <div className="list-head">
            <h2>Słówka</h2>
            {words.length > 8 && (
              <div className="search">
                <Icon name="search" size={18} />
                <input
                  type="search"
                  placeholder="Szukaj"
                  aria-label="Szukaj słówka"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            )}
          </div>
          {shown.length === 0 && <p className="muted">Nic nie znaleziono dla „{filter}”.</p>}
          <ul className="word-list">
            {shown.map((w) =>
              editingId === w.id ? (
                <li key={w.id} className="word-item editing">
                  <WordForm
                    initial={w}
                    submitLabel="Zapisz"
                    onSubmit={async (input) => {
                      await updateWord(w.id, input);
                      setEditingId(null);
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                </li>
              ) : (
                <li key={w.id} className={w.id === justAddedId ? 'word-item just-added' : 'word-item'}>
                  <div className="word-main">
                    <span className="en" lang="en">
                      {w.en}
                    </span>
                    {w.pronunciation && <Pron text={w.pronunciation} />}
                    <span className="pl">{w.pl}</span>
                    {w.example && (
                      <span className="example" lang="en">
                        {w.example}
                      </span>
                    )}
                  </div>
                  <div className="word-side">
                    {status(w)}
                    <div className="word-actions">
                      <button
                        type="button"
                        className="icon-button"
                        aria-label={`Edytuj ${w.en}`}
                        title="Edytuj"
                        onClick={() => setEditingId(w.id)}
                      >
                        <Icon name="pencil" size={18} />
                      </button>
                      <button
                        type="button"
                        className="icon-button danger"
                        aria-label={`Usuń ${w.en}`}
                        title="Usuń"
                        onClick={() => confirm(`Usunąć „${w.en}”?`) && deleteWord(w.id)}
                      >
                        <Icon name="trash" size={18} />
                      </button>
                    </div>
                  </div>
                </li>
              ),
            )}
          </ul>
        </>
      )}
    </section>
  );
}
