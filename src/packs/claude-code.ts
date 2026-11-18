// Słowa i komunikaty, które często pojawiają się w konsoli Claude Code.
// Format: angielski | polski | wymowa (WIELKIE litery = akcent)
export const CLAUDE_CODE = `
terminal | terminal | TER-my-nl
command line | wiersz poleceń | ko-MEND lajn
command | polecenie | ko-MEND
prompt | pole do wpisania polecenia; prompt | prompt
shell | powłoka (np. Bash, PowerShell) | szel
working directory | katalog roboczy | ŁER-king daj-REK-to-ri
directory | katalog, folder | daj-REK-to-ri
path | ścieżka | pes
file | plik | fajl
codebase | baza kodu (cały kod projektu) | KOŁD-bejs
project | projekt | PRO-dżekt
session | sesja | SE-szyn
conversation | rozmowa | kon-wer-SEJ-szyn
Thinking… | Myślę… | TYN-king
Working… | Pracuję… | ŁER-king
Reading | Czytam (plik) | RI-ding
Searching | Szukam | SER-czyng
Writing | Zapisuję | RAJ-ting
Running | Uruchamiam | RA-ning
Read file | odczytaj plik | rid fajl
Write file | zapisz plik | rajt fajl
Edit file | edytuj plik | E-dyt fajl
Create file | utwórz plik | kri-EJT fajl
Update | zaktualizuj; aktualizacja | ap-DEJT
Search | szukaj | sercz
Run | uruchom | ran
tool | narzędzie | tul
tool call | wywołanie narzędzia | tul kol
tool use | użycie narzędzia | tul jus
permission | uprawnienie, pozwolenie | per-MY-szyn
Do you want to proceed? | Czy chcesz kontynuować? | du ju łont tu pro-SID
Do you want to make this edit? | Czy chcesz wprowadzić tę zmianę? | du ju łont tu mejk dys E-dyt
Yes | tak | jes
No | nie | noł
Yes, and don't ask again | tak i nie pytaj więcej | jes, end dołnt ask a-GEN
No, and tell Claude what to do differently | nie, powiedz Claude'owi, co zrobić inaczej | noł, end tel klod łot tu du DY-fe-rent-li
allow | zezwól | a-LAŁ
deny | odmów | dy-NAJ
approve | zatwierdź | a-PRUW
reject | odrzuć | ry-DŻEKT
accept edits | akceptuj zmiany | ak-SEPT E-dyts
auto-accept | automatyczna akceptacja | O-toł ak-SEPT
plan mode | tryb planowania | plen mołd
auto mode | tryb automatyczny | O-toł mołd
Here is Claude's plan | Oto plan Claude'a | hir yz klodz plen
Would you like to proceed? | Czy chcesz kontynuować? | łud ju lajk tu pro-SID
interrupt | przerwać | yn-te-RAPT
Interrupted by user | przerwane przez użytkownika | yn-te-RAP-tyd baj JU-zer
press Esc to interrupt | naciśnij Esc, aby przerwać | pres ESK tu yn-te-RAPT
press Enter to continue | naciśnij Enter, aby kontynuować | pres EN-ter tu kon-TY-nju
shortcut | skrót klawiszowy | SZORT-kat
slash command | polecenie z ukośnikiem (np. /help) | slesz ko-MEND
/help | pomoc | help
/clear | wyczyść rozmowę | klir
/compact | skompresuj rozmowę (streszczenie kontekstu) | kom-PEKT
/init | utwórz plik CLAUDE.md | y-NYT
/model | zmień model | MO-dl
/resume | wznów poprzednią rozmowę | ry-ZJUM
/config | ustawienia | KON-fyg
/cost | koszt sesji | kost
/memory | edytuj pamięć | ME-mo-ri
/review | przegląd kodu | ry-WJU
context | kontekst | KON-tekst
context window | okno kontekstu | KON-tekst ŁYN-doł
context left | pozostały kontekst | KON-tekst left
compacting conversation | kompresuję rozmowę | kom-PEK-ting kon-wer-SEJ-szyn
summary | podsumowanie, streszczenie | SA-ma-ri
memory | pamięć | ME-mo-ri
CLAUDE.md | plik z instrukcjami dla Claude'a w projekcie | klod em-DI
instructions | instrukcje | in-STRAK-szynz
settings | ustawienia | SE-tyngz
configuration | konfiguracja | kon-fy-gju-REJ-szyn
hook | hak (skrypt uruchamiany automatycznie) | huk
skill | umiejętność (pakiet instrukcji) | skyl
plugin | wtyczka | PLA-gyn
MCP server | serwer MCP (łączy Claude'a z narzędziami) | em-si-PI SER-wer
agent | agent | EJ-dżent
subagent | podagent | SAB-ej-dżent
background task | zadanie w tle | BEK-graund task
run in background | uruchom w tle | ran yn BEK-graund
todo list | lista zadań | TU-du lyst
task | zadanie | task
in progress | w trakcie | yn PROŁ-gres
completed | ukończone | kom-PLI-tyd
pending | oczekujące | PEN-dyng
done | gotowe | dan
failed | nie powiodło się | fejld
error | błąd | E-ror
warning | ostrzeżenie | ŁOR-nyng
Error: file not found | błąd: nie znaleziono pliku | E-ror: fajl not faund
No such file or directory | nie ma takiego pliku ani katalogu | noł sacz fajl or daj-REK-to-ri
Permission denied | odmowa dostępu | per-MY-szyn dy-NAJD
command not found | nie znaleziono polecenia | ko-MEND not faund
exit code | kod wyjścia (wynik zakończenia polecenia) | EK-syt kołd
timeout | przekroczenie czasu | TAJM-ałt
timed out | przekroczono czas | tajmd ałt
retry | spróbuj ponownie | ri-TRAJ
retrying | ponawiam próbę | ri-TRAJ-ing
rate limit | limit zapytań | rejt LI-myt
usage limit | limit użycia | JU-sydż LI-myt
overloaded | przeciążony | oł-wer-LOŁ-dyd
connection | połączenie | ko-NEK-szyn
API error | błąd API | ej-pi-AJ E-ror
log in | zaloguj się | log yn
log out | wyloguj się | log ałt
authenticate | uwierzytelnić (potwierdzić tożsamość) | o-TEN-ty-kejt
token usage | zużycie tokenów | TOŁ-kn JU-sydż
cost | koszt | kost
output | wynik (dane wyjściowe) | AŁT-put
truncated | ucięty (skrócony) | tran-KEJ-tyd
diff | różnica (porównanie zmian) | dyf
added lines | dodane wiersze | E-dyd lajnz
removed lines | usunięte wiersze | ry-MUWD lajnz
line | wiersz, linia | lajn
changes | zmiany | CZEJN-dżyz
unchanged | bez zmian | an-CZEJNDŻD
overwrite | nadpisać | oł-wer-RAJT
undo | cofnij | an-DU
rewind | przewiń wstecz (cofnij do punktu w rozmowie) | ri-ŁAJND
checkpoint | punkt kontrolny | CZEK-pojnt
restore | przywróć | ry-STOR
git | system kontroli wersji | gyt
repository | repozytorium | ry-PO-zy-to-ri
commit | zapisanie zmian w historii (commit) | ko-MYT
commit message | opis zmian w commicie | ko-MYT ME-sydż
branch | gałąź | brencz
main branch | gałąź główna | mejn brencz
push | wypchnij (wyślij na serwer) | pusz
pull | pobierz zmiany | pul
pull request | prośba o włączenie zmian (PR) | pul ry-KŁEST
merge | scal | merdż
merge conflict | konflikt przy scalaniu | merdż KON-flykt
staged changes | zmiany przygotowane do commita | stejdżd CZEJN-dżyz
untracked files | nieśledzone pliki | an-TREKT fajlz
working tree | drzewo robocze (pliki w projekcie) | ŁER-king tri
clean | czysty (bez zmian) | klin
worktree | dodatkowa kopia robocza repozytorium | ŁERK-tri
install | zainstaluj | yn-STOL
dependencies | zależności (biblioteki projektu) | dy-PEN-den-siz
build | zbuduj; budowanie | byld
build succeeded | budowanie zakończone sukcesem | byld sak-SI-dyd
build failed | budowanie nie powiodło się | byld fejld
test | test | test
tests passed | testy przeszły | tests past
tests failed | testy nie przeszły | tests fejld
run the tests | uruchom testy | ran de tests
lint | sprawdź styl kodu | lynt
type check | sprawdzenie typów | tajp czek
dev server | serwer deweloperski | dew SER-wer
deploy | wdróż (opublikuj) | dy-PLOJ
fix | napraw; poprawka | fyks
bug | błąd w programie | bag
refactor | przebuduj kod | ri-FEK-ter
implement | zaimplementuj (napisz kod) | YM-ply-ment
feature | funkcja, funkcjonalność | FI-czer
investigate | zbadaj | yn-WES-ty-gejt
root cause | główna przyczyna | rut koz
let me check | sprawdzę | let mi czek
let me look at | przyjrzę się | let mi luk et
I'll start by | zacznę od | ajl start baj
I found the issue | znalazłem problem | aj faund dy Y-szu
the issue is | problem polega na tym, że | dy Y-szu yz
issue | problem; zgłoszenie | Y-szu
now let me | teraz… | nał let mi
I've updated | zaktualizowałem | ajw ap-DEJ-tyd
verify | zweryfikuj, sprawdź | WE-ry-faj
works as expected | działa zgodnie z oczekiwaniami | łerks ez eks-PEK-tyd
edge case | przypadek brzegowy | edż kejs
approach | podejście | a-PROŁCZ
trade-off | kompromis (coś za coś) | TREJD-of
recommend | polecam, zalecam | re-ko-MEND
suggestion | sugestia | sa-DŻES-czyn
optional | opcjonalny | OP-szy-nl
required | wymagany | ry-KŁAJERD
deprecated | przestarzały (wycofywany) | DE-pry-kej-tyd
experimental | eksperymentalny | eks-pe-ry-MEN-tl
default | domyślny; wartość domyślna | dy-FOLT
enable | włącz | e-NEJ-bl
disable | wyłącz | dys-EJ-bl
toggle | przełącz | TO-gl
expand | rozwiń | eks-PEND
collapse | zwiń | ko-LEPS
scroll up | przewiń w górę | skrołl ap
copy to clipboard | skopiuj do schowka | KO-pi tu KLYP-bord
paste | wklej | pejst
screenshot | zrzut ekranu | SKRIN-szot
attach | załącz | a-TECZ
upgrade | zaktualizuj (do nowszej wersji) | AP-grejd
version | wersja | WER-żn
Welcome back! | Witaj ponownie! | ŁEL-kam bek
Tips for getting started | wskazówki na początek | typs for GE-tyng STAR-tyd
What's new | co nowego | łots nju
`;
