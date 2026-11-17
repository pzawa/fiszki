# Fiszki

Aplikacja do nauki angielskich słówek z powtórkami rozłożonymi w czasie.

## Uruchomienie

```bash
npm install
npm run dev
```

Otwórz adres podany w terminalu (domyślnie http://localhost:5173).

Inne komendy:

- `npm test` – testy algorytmu powtórek,
- `npm run build` – wersja produkcyjna w katalogu `dist/`.

## Jak to działa

- **Kategorie** – na start jest 40 gotowych tematów (od „Cześć!” do „Metry a stopy”). Możesz dodawać własne, które pojawiają się na końcu listy, oraz zmieniać nazwy i usuwać dowolne kategorie. Do każdej kategorii dodajesz słówka: angielski, polski i opcjonalnie przykładowe zdanie.
- **Nauka** – wybierasz jedną, kilka albo wszystkie kategorie, kierunek (EN→PL, PL→EN, losowo) i limit nowych słówek.
- **Ocena** – po odwróceniu karty (klik / spacja) oceniasz się klawiszami 1–4:
  - **Nie umiem** – słówko wraca jeszcze w tej sesji i od nowa zaczyna budować odstępy,
  - **Trudne** – przy nowym (lub właśnie zapomnianym) słówku wraca za 10 min, jeszcze w tej sesji; przy utrwalonym – krótszy odstęp niż „Umiem”,
  - **Umiem** – 1 dzień, potem 3 dni, potem coraz dłużej,
  - **Łatwe** – dłuższy odstęp.

  Słówka często zapominane dostają niższy współczynnik łatwości, więc wracają częściej (uproszczony algorytm SM-2, `src/srs.ts`).

## Na iPhonie

1. Otwórz adres aplikacji w **Safari**.
2. Stuknij **Udostępnij** → **Do ekranu początkowego**.
3. Ucz się zawsze z ikony na ekranie. Aplikacja z ikony ma osobne miejsce na dane, niezależne od karty Safari. iOS nie czyści go automatycznie, a aplikacja działa też bez internetu.

Po opublikowaniu nowej wersji aplikacja pokaże pasek „Jest nowa wersja” → **Odśwież**. Aktualizacja podmienia tylko kod, słówka zostają.

## Dane

Słówka są zapisane w bazie IndexedDB przeglądarki (biblioteka Dexie.js) – nie trzeba serwera.
W **Ustawieniach** można wyeksportować wszystko do pliku JSON i zaimportować z powrotem (kopia zapasowa / przeniesienie na inny komputer).
