import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
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
  const [en, setEn] = useState(initial?.en ?? '');
  const [pl, setPl] = useState(initial?.pl ?? '');
  const [example, setExample] = useState(initial?.example ?? '');
  const [saving, setSaving] = useState(false);
  const [added, setAdded] = useState<Added | null>(null);

  // Komunikat „Dodano” znika po kilku sekundach.
  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(null), 4000);
    return () => clearTimeout(t);
  }, [added]);

  const valid = en.trim() !== '' && pl.trim() !== '';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid || saving) return;
    setSaving(true);
    try {
      const result = await onSubmit({ en, pl, example });
      if (result === false) return;
      if (!initial) {
        setAdded({ en: en.trim(), pl: pl.trim(), key: Date.now() });
        setEn('');
        setPl('');
        setExample('');
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
        <label htmlFor={`${id}-ex`}>
          Przykładowe zdanie <span className="optional">(opcjonalnie)</span>
        </label>
        <input
          id={`${id}-ex`}
          lang="en"
          placeholder="I eat an apple every day."
          value={example}
          onChange={(e) => setExample(e.target.value)}
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
