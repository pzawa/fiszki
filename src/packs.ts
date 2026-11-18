import { WCAG } from './packs/wcag';
import { AI } from './packs/ai';
import { FRONTEND } from './packs/frontend';
import { UX } from './packs/ux';
import { CLAUDE_CODE } from './packs/claude-code';

/**
 * Gotowe kategorie ze słówkami. Dodawane do bazy raz – w migracji v4 (istniejąca baza)
 * albo przy pierwszym uruchomieniu. Zmiana tych list NIE trafi do istniejących instalacji
 * sama z siebie – do tego potrzebna jest nowa wersja bazy (patrz CLAUDE.md).
 *
 * Format linii: `angielski | polski | wymowa` (wymowa opcjonalna; WIELKIE litery = akcent).
 */
export interface PackWord {
  en: string;
  pl: string;
  pronunciation?: string;
}

export interface WordPack {
  name: string;
  description?: string;
  words: PackWord[];
}

export function parsePack(raw: string): PackWord[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const [en, pl, pron] = line.split('|').map((p) => p.trim());
      if (!en || !pl) throw new Error(`Niepoprawna linia: ${line}`);
      return pron ? { en, pl, pronunciation: pron } : { en, pl };
    });
}

export const WORD_PACKS: WordPack[] = [
  { name: 'WCAG i dostępność cyfrowa', description: 'czytnik ekranu, kontrast, tekst alternatywny', words: parsePack(WCAG) },
  { name: 'AI (sztuczna inteligencja)', description: 'model, prompt, uczenie maszynowe', words: parsePack(AI) },
  { name: 'Frontend (HTML, CSS, JS)', description: 'znaczniki, selektory, funkcje, DOM', words: parsePack(FRONTEND) },
  { name: 'UI i UX', description: 'makieta, prototyp, badania z użytkownikami', words: parsePack(UX) },
  { name: 'Claude Code', description: 'słowa i komunikaty z konsoli', words: parsePack(CLAUDE_CODE) },
];
