import Icon from './Icon';

interface Props {
  front: string;
  back: string;
  frontLang: 'en' | 'pl';
  backLang: 'en' | 'pl';
  example?: string;
  flipped: boolean;
  onFlip: () => void;
}

const LANG_NAME = { en: 'Angielski', pl: 'Polski' };

export default function Flashcard({ front, back, frontLang, backLang, example, flipped, onFlip }: Props) {
  return (
    <>
      <button
        type="button"
        className={`flashcard${flipped ? ' flipped' : ''}`}
        onClick={onFlip}
        aria-pressed={flipped}
        aria-describedby="flip-hint"
      >
        <span className="flashcard-inner">
          <span className="face front" aria-hidden={flipped}>
            <span className="lang">{LANG_NAME[frontLang]}</span>
            <span className="term" lang={frontLang}>
              {front}
            </span>
            <span className="hint" id="flip-hint">
              <Icon name="flip" size={16} />
              Stuknij, aby odwrócić
            </span>
          </span>
          <span className="face back" aria-hidden={!flipped}>
            <span className="lang">{LANG_NAME[backLang]}</span>
            <span className="term" lang={backLang}>
              {back}
            </span>
            <span className="sub" lang={frontLang}>
              {front}
            </span>
            {example && (
              <span className="example" lang="en">
                {example}
              </span>
            )}
          </span>
        </span>
      </button>
      {/* Czytnik ekranu ogłasza odpowiedź po odwróceniu karty. */}
      <p className="sr-only" aria-live="polite">
        {flipped ? `${LANG_NAME[backLang]}: ${back}` : ''}
      </p>
    </>
  );
}
