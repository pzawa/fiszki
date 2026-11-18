import Icon from './Icon';

interface Props {
  front: string;
  back: string;
  frontLang: 'en' | 'pl';
  backLang: 'en' | 'pl';
  example?: string;
  /** Wymowa angielskiego słowa – pokazywana na tej stronie karty, gdzie jest angielski. */
  pronunciation?: string;
  flipped: boolean;
  onFlip: () => void;
}

const LANG_NAME = { en: 'Angielski', pl: 'Polski' };

function Pron({ text }: { text?: string }) {
  return text ? <span className="pron">[{text}]</span> : null;
}

export default function Flashcard({ front, back, frontLang, backLang, example, pronunciation, flipped, onFlip }: Props) {
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
            {frontLang === 'en' && <Pron text={pronunciation} />}
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
            {backLang === 'en' && <Pron text={pronunciation} />}
            <span className="sub" lang={frontLang}>
              {front}
              {frontLang === 'en' && pronunciation && ` [${pronunciation}]`}
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
