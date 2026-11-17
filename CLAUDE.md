# Fiszki – zasady dla zmian w kodzie

Aplikacja działa na iPhonie właścicielki jako PWA (dodana do ekranu początkowego). Słówka są zapisane
**tylko na telefonie** w IndexedDB (Dexie). Każda aktualizacja aplikacji musi je zachować.

## Nie wolno
- zmieniać nazwy bazy `new Dexie('fiszki')`,
- edytować ani usuwać istniejących `db.version(N)` w `src/db.ts`,
- zmieniać nazw/znaczenia istniejących pól `Word`/`Category` bez migracji,
- zmieniać adresu (domeny/ścieżki), pod którym aplikacja jest opublikowana – dane są przypisane do adresu,
- wracać do `BrowserRouter` (hosting statyczny + offline wymagają `HashRouter`),
- zmieniać formatu pliku kopii zapasowej tak, by stare kopie (`version: 1`) przestały się importować.

## Jak zmieniać schemat bazy
Dodaj nową wersję na końcu `src/db.ts`, np.:
```ts
db.version(3).stores({ words: '++id, categoryId, due, tag' }).upgrade((tx) =>
  tx.table('words').toCollection().modify((w) => { w.tag ??= ''; }),
);
```
Nowe pola w typach oznaczaj jako opcjonalne albo uzupełniaj je w `upgrade`.

## Gotowe kategorie (`src/seed.ts`)
- 40 kategorii dodaje `db.on('populate')` (nowa baza) i migracja v3 (istniejąca baza), dopasowując po nazwie.
- Zmiana listy w `seed.ts` **nie** trafi do istniejących instalacji sama z siebie. Żeby dodać nowe gotowe
  kategorie, napisz nową wersję bazy z `upgrade`, która dopisze tylko brakujące (po nazwie). Nie przywracaj kategorii,
  które użytkowniczka usunęła.
- Kolejność to pole `position`. Własne kategorie dostają `max(position) + 1`.

## Przed publikacją
- `npm test` i `npm run build` muszą przechodzić,
- sprawdź migrację: stara baza (poprzednia wersja schematu) z danymi → nowa wersja aplikacji → dane są.

## Polecenia
- `npm run dev` – serwer deweloperski, `npm test` – testy, `npm run build` – build do `dist/`,
- `npx vite preview` – podgląd builda produkcyjnego (z service workerem).
