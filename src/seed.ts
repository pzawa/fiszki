/**
 * Kategorie dostępne od pierwszego uruchomienia (w tej kolejności).
 * Format: "Nazwa – opis". Lista jest dodawana do bazy tylko raz (migracja v3 / pierwsze utworzenie bazy),
 * więc usunięta przez użytkownika kategoria nie wraca.
 */
const RAW = `
Cześć! – nowi ludzie, kilka słów o sobie, jak zagadać
Gdzie mieszkasz? – miasto i wieś, blok i dom, sień i WC, sąsiedzi
Polska i Polacy – województwo, Wisła, Wałęsa
Mówisz po angielsku? – tak sobie, nauka i poziomy zaawansowania
Krewni i znajomi – kuzyni, pradziadek, znamy się z widzenia
Miłość i związki – kocha, lubi, szanuje
Szkoła i studia – kartkówka, WF, matura, zeszyt w kratkę
Imprezy – sylwester, domówka, podpieranie ścian
Wpadki i trochę kultury – przepraszam, miłego dnia i nie puść bąka
Przed podróżą – rezerwacje, ubezpieczenie, last minute
Lecę, bo chcę – na lotnisku, w samolocie, zagubiony bagaż
Hotel – widok na morze, kemping i karaluchy
Zwiedzanie – zabytki, kieszonkowcy i Kali pić
Wiza do USA – zielona karta, czytelny podpis, PESEL
W aucie – parkowanie, nawigacja, prawo jazdy
W mieście – autobus, Uber, metro, wynajem roweru
Niedobrze mi – mam katar, wysypkę i oparzenie słoneczne
Delikatne tematy – rak, śmierć, niepełnosprawność
Higiena – toaleta i ludzkie ciało
Seks – ciąża, orientacja, zdrowie intymne
Zdrowie psychiczne – nałogi, terapia, wsparcie
Relaks i hobby
Sport – dyscypliny, uprawa i kibicowanie
Pielęgnacja – makijaż, fryzjer, depilacja
Moda – stylówka dnia, spódnica, sznurówka
Nowa praca – jak wybrać zawód, CV i rozmowa rekrutacyjna
W pracy – spotkanie, dedlajn, delegacja
Pieniądze, ach, pieniądze – bank, oszczędzanie, podatki
Zakupy online – aukcja, koszyk, przesyłka
W sklepie – promocje, reklamacja, rozmiary
Nie gotuję – jedzenie w restauracji, w kawiarni, na dowóz
Pierogies, pesto, protein – kuchnia polska, kuchnie świata, jeść zdrowo, alkohol
Gotowanie i pieczenie – przepisy, pół szklanki, przyprawy
Książki – miękka oprawa, e-book, dramat
Ekran i głośnik – kino, film, TV, Netflix i muzyka
Telefon – SMS-y, zasięg, emotikony i selfie
Lajk i hejt – media społecznościowe, hasztag, blog
Internet i komputer – przeglądarka, PDF, pendrive
Eko – przyroda, recykling i zero waste
Metry a stopy – ile masz wzrostu, mile, uncje i galony
`;

export interface SeedCategory {
  name: string;
  description?: string;
}

export const SEED_CATEGORIES: SeedCategory[] = RAW.trim()
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const i = line.indexOf(' – ');
    return i === -1 ? { name: line } : { name: line.slice(0, i).trim(), description: line.slice(i + 3).trim() };
  });
