import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { db, type Word } from '../db';
import Flashcard from '../components/Flashcard';
import Icon from '../components/Icon';
import { formatDelay, isLearning, review, type Rating } from '../srs';
import { parseCats, pickSessionWords, type Direction } from '../study';

interface Item {
  word: Word;
  reverse: boolean; // true = pokazujemy polski, pytamy o angielski
}

const RATINGS: { rating: Rating; label: string; key: string }[] = [
  { rating: 'again', label: 'Nie umiem', key: '1' },
  { rating: 'hard', label: 'Trudne', key: '2' },
  { rating: 'good', label: 'Umiem', key: '3' },
  { rating: 'easy', label: 'Łatwe', key: '4' },
];

export default function StudyPage() {
  const [params] = useSearchParams();
  const paramsKey = params.toString();
  const [queue, setQueue] = useState<Item[] | null>(null);
  const [total, setTotal] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Map<number, Rating>>(new Map());
  const [missed, setMissed] = useState<Word[]>([]);

  useEffect(() => {
    let cancelled = false;
    const p = new URLSearchParams(paramsKey);
    const cats = parseCats(p.get('cats'));
    const dir = (p.get('dir') ?? 'en-pl') as Direction;
    const newLimit = Number(p.get('new') ?? 20);
    const extra = p.get('extra') === '1';

    (async () => {
      const words = cats === 'all' ? await db.words.toArray() : await db.words.where('categoryId').anyOf(cats).toArray();
      const picked = pickSessionWords(words, { newLimit, extra });
      if (cancelled) return;
      setQueue(
        picked.map((word) => ({
          word,
          reverse: dir === 'pl-en' || (dir === 'mix' && Math.random() < 0.5),
        })),
      );
      setTotal(picked.length);
      setResults(new Map());
      setMissed([]);
      setFlipped(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [paramsKey]);

  const current = queue?.[0];

  const rate = useCallback(
    async (rating: Rating) => {
      if (!current) return;
      const next = review(current.word, rating);
      await db.words.update(current.word.id, next);
      const updated: Item = { ...current, word: { ...current.word, ...next } };

      // Liczymy tylko pierwszą odpowiedź na dane słówko.
      setResults((r) => (r.has(current.word.id) ? r : new Map(r).set(current.word.id, rating)));
      if (rating === 'again') {
        setMissed((m) => (m.some((w) => w.id === current.word.id) ? m : [...m, current.word]));
      }
      setQueue((q) => {
        const rest = q!.slice(1);
        // "Nie umiem" i "Trudne" przy nowym słówku → wraca na koniec kolejki w tej samej sesji.
        return isLearning(next) ? [...rest, updated] : rest;
      });
      setFlipped(false);
    },
    [current],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!current || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setFlipped((f) => !f);
        return;
      }
      const r = RATINGS.find((x) => x.key === e.key);
      if (r && flipped) rate(r.rating);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, flipped, rate]);

  if (!queue) return null;

  if (total === 0) {
    return (
      <section className="study empty">
        <h1 className="sr-only">Nauka</h1>
        <p>Brak słówek do nauki w tym wyborze.</p>
        <Link to="/learn" className="button primary">
          Wybierz inne kategorie
        </Link>
      </section>
    );
  }

  if (!current) {
    const counts = { again: 0, hard: 0, good: 0, easy: 0 };
    results.forEach((r) => counts[r]++);
    return (
      <section className="study summary" aria-labelledby="summary-title">
        <span className="summary-icon">
          <Icon name="sparkle" size={36} />
        </span>
        <h1 id="summary-title">Koniec sesji!</h1>
        <dl className="summary-stats">
          <div className="stat good">
            <dt>Znane od razu</dt>
            <dd>{counts.good + counts.easy + counts.hard}</dd>
          </div>
          <div className="stat again">
            <dt>Do poprawki</dt>
            <dd>{counts.again}</dd>
          </div>
        </dl>
        {missed.length > 0 && (
          <div className="card">
            <h2>Te słówka sprawiły trudność</h2>
            <ul className="missed">
              {missed.map((w) => (
                <li key={w.id}>
                  <strong lang="en">{w.en}</strong>
                  <span>{w.pl}</span>
                </li>
              ))}
            </ul>
            <p className="muted">Wrócą do Ciebie częściej w kolejnych powtórkach.</p>
          </div>
        )}
        <div className="row-actions center">
          <Link to="/learn" className="button primary">
            <Icon name="flip" size={18} />
            Nowa sesja
          </Link>
          <Link to="/" className="button">
            <Icon name="cards" size={18} />
            Kategorie
          </Link>
        </div>
      </section>
    );
  }

  const { word, reverse } = current;
  const done = total - new Set(queue.map((i) => i.word.id)).size;
  const now = Date.now();

  return (
    <section className="study" aria-labelledby="study-title">
      <h1 id="study-title" className="sr-only">
        Nauka – karta {Math.min(done + 1, total)} z {total}
      </h1>
      <div className="study-head">
        <Link to="/learn" className="icon-button" aria-label="Zakończ naukę" title="Zakończ">
          <Icon name="close" />
        </Link>
        <div
          className="progress"
          role="progressbar"
          aria-label="Postęp sesji"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={done}
          aria-valuetext={`${done} z ${total}`}
        >
          <div style={{ width: `${(done / total) * 100}%` }} />
        </div>
        <span className="counter" aria-hidden="true">
          {done}/{total}
        </span>
      </div>

      <Flashcard
        key={`${word.id}-${word.lapses}-${word.reps}`}
        front={reverse ? word.pl : word.en}
        back={reverse ? word.en : word.pl}
        frontLang={reverse ? 'pl' : 'en'}
        backLang={reverse ? 'en' : 'pl'}
        example={word.example}
        flipped={flipped}
        onFlip={() => setFlipped((f) => !f)}
      />

      <div className="ratings" role="group" aria-label="Jak Ci poszło?">
        {flipped ? (
          RATINGS.map(({ rating, label, key }) => {
            const delay = formatDelay(review(word, rating, now).due - now);
            return (
              <button
                key={rating}
                type="button"
                className={`rate ${rating}`}
                onClick={() => rate(rating)}
                aria-keyshortcuts={key}
              >
                <span className="rate-label">{label}</span>
                <span className="rate-delay">
                  <span className="sr-only">, powtórka za </span>
                  {delay}
                </span>
              </button>
            );
          })
        ) : (
          <button type="button" className="primary big show" onClick={() => setFlipped(true)} aria-keyshortcuts="Space">
            Pokaż odpowiedź
          </button>
        )}
      </div>
      <p className="keys-hint" aria-hidden="true">
        Klawiatura: spacja – odwróć, 1–4 – ocena
      </p>
    </section>
  );
}
