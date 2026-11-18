import { useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import type { WordInput } from '../db';
import Icon from './Icon';

interface Props {
  initial?: WordInput;
  submitLabel: string;
  /** Zwróć `false`, żeby anulować (formularz zostanie wypełniony). */
  onSubmit: (input: WordInput) => Promise<unknown> | unknown;
  onCancel?: () => void;
}

interface Added {
  en: string;
  pl: string;
  key: number;
}

export default function WordForm({ initial, submitLabel, onSubmit, onCancel }: Props) {
  const id = useId();
  const enRef = useRef<HTMLInputElement>(null);
  const exampleRef = useRef<HTMLTextAreaElement>(null);
  const [en, setEn] = useState(initial?.en ?? '');
  const [pl, setPl] = useState(initial?.pl ?? '');
  const [example, setExample] = useState(initial?.example ?? '');
  const [pron, setPron] = useState(initial?.pronunciation ?? '');
  const [saving, setSaving] = useState(false);
  const [added, setAdded] = useState<Added | null>(null);

  // Komunikat „Dodano” znika po kilku sekundach.
  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(null), 4000);
    return () => clearTimeout(t);
  }, [added]);

  const valid = en.trim() !== '' && pl.trim() !== '';

  // Pole na zdanie rośnie razem z tekstem, żeby całe zdanie było widać podczas pisania.
  useLayoutEffect(() => {
    const el = exampleRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight + el.offsetHeight - el.clientHeight}px`;
  }, [example]);

  // Enter w zdaniu zapisuje słówko (jak w zwykłym polu), zamiast wstawiać nową linię.
  function handleExampleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid || saving) return;
    setSaving(true);
    try {
      const result = await onSubmit({ en, pl, example, pronunciation: pron });
      if (result === false) return;
      if (!initial) {
        setAdded({ en: en.trim(), pl: pl.trim(), key: Date.now() });
        setEn('');
        setPl('');
        setExample('');
        setPron('');
        enRef.current?.focus();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="word-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor={`${id}-en`}>Po angielsku</label>
        <input
          id={`${id}-en`}
          ref={enRef}
          lang="en"
          placeholder="apple"
          value={en}
          onChange={(e) => {
            setEn(e.target.value);
            setAdded(null);
          }}
          autoFocus={!!initial}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
        />
      </div>
      <div className="field">
        <label htmlFor={`${id}-pl`}>Po polsku</label>
        <input
          id={`${id}-pl`}
          placeholder="jabłko"
          value={pl}
          onChange={(e) => setPl(e.target.value)}
          autoComplete="off"
          autoCapitalize="none"
        />
      </div>
      <div className="field wide">
        <label htmlFor={`${id}-pr`}>
          Wymowa <span className="optional">(opcjonalnie)</span>
        </label>
        <input
          id={`${id}-pr`}
          placeholder="E-pel"
          value={pron}
          onChange={(e) => setPron(e.target.value)}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>
      <div className="field wide">
        <label htmlFor={`${id}-ex`}>
          Przykładowe zdanie <span className="optional">(opcjonalnie)</span>
        </label>
        <textarea
          id={`${id}-ex`}
          ref={exampleRef}
          lang="en"
          rows={1}
          placeholder="I eat an apple every day."
          value={example}
          onChange={(e) => setExample(e.target.value.replace(/\r?\n/g, ' '))}
          onKeyDown={handleExampleKeyDown}
          enterKeyHint="done"
          autoComplete="off"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="primary" disabled={!valid || saving}>
          <Icon name={initial ? 'check' : 'plus'} />
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Anuluj
          </button>
        )}
      </div>
      <div className="form-status" role="status" aria-live="polite">
        {added && (
          <p className="added-toast" key={added.key}>
            <span className="added-check">
              <Icon name="check" size={16} />
            </span>
            <span>
              Dodano: <strong lang="en">{added.en}</strong> – {added.pl}
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
