import Icon from './Icon';
import Pron from './Pron';

interface Props {
  front: string;
  back: string;
  frontLang: 'en' | 'pl';
  backLang: 'en' | 'pl';
  example?: string;
  /** Wymowa i przykład – pokazywane tylko na stronie z angielskim słówkiem. */
  pronunciation?: string;
  flipped: boolean;
  onFlip: () => void;
}

const LANG_NAME = { en: 'Angielski', pl: 'Polski' };

/**
 * Jedna strona fiszki. Strona angielska: słówko, wymowa i przykładowe zdanie.
 * Strona polska: tylko polskie słówko.
 */
function FaceContent({ text, lang, example, pron }: { text: string; lang: 'en' | 'pl'; example?: string; pron?: string }) {
  return (
    <>
      <span className="lang">{LANG_NAME[lang]}</span>
      <span className="term" lang={lang}>
        {text}
      </span>
      {lang === 'en' && pron && <Pron text={pron} />}
      {lang === 'en' && example && (
        <span className="example" lang="en">
          {example}
        </span>
      )}
    </>
  );
}

export default function Flashcard({ front, back, frontLang, backLang, example, pronunciation: pron, flipped, onFlip }: Props) {
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
            <FaceContent text={front} lang={frontLang} example={example} pron={pron} />
            <span className="hint" id="flip-hint">
              <Icon name="flip" size={16} />
              Stuknij, aby odwrócić
            </span>
          </span>
          <span className="face back" aria-hidden={!flipped}>
            <FaceContent text={back} lang={backLang} example={example} pron={pron} />
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
