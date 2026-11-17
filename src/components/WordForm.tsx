import { useId, useRef, useState, type FormEvent } from 'react';
import type { WordInput } from '../db';
import Icon from './Icon';

interface Props {
  initial?: WordInput;
  submitLabel: string;
  onSubmit: (input: WordInput) => Promise<unknown> | void;
  onCancel?: () => void;
}

export default function WordForm({ initial, submitLabel, onSubmit, onCancel }: Props) {
  const id = useId();
  const enRef = useRef<HTMLInputElement>(null);
  const [en, setEn] = useState(initial?.en ?? '');
  const [pl, setPl] = useState(initial?.pl ?? '');
  const [example, setExample] = useState(initial?.example ?? '');
  const [status, setStatus] = useState('');

  const valid = en.trim() !== '' && pl.trim() !== '';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid) return;
    await onSubmit({ en, pl, example });
    if (!initial) {
      setStatus(`Dodano: ${en.trim()} – ${pl.trim()}`);
      setEn('');
      setPl('');
      setExample('');
      enRef.current?.focus();
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
          onChange={(e) => setEn(e.target.value)}
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
        <button type="submit" className="primary" disabled={!valid}>
          <Icon name={initial ? 'check' : 'plus'} />
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Anuluj
          </button>
        )}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
