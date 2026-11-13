# Bloomgrid r6 — specyfikacja responsywności i ruchu

r6 (Q147–Q153, Q175, Q176, Q184, Q185) dodaje: etykietę poziomu w środku nagłówka gry klasycznej, plakietkę awansu i przenikanie tła, poziom w panelu końca i trzy nowe tła kręgu motywów — sekcja „Poziomy (r6)” oraz wiersze 10 i 11 w „Ruch”. Q177–Q181 i Q199–Q203: każdy ekran mieści się w oknie bez przewijania do 375×548 / 852×340 — sekcja „Wysokość okna (r6)”; nowy target `iphone-se`; telefon w poziomie w układzie obok siebie; pochwała „Pusta grządka! +300” i reguła dopisków punktów. Geometria r5 bez zmian poza: nowym elementem w środku nagłówka gry klasycznej (nagłówek nie zmienia wysokości), wyższym panelem końca gry klasycznej (+28 px, linia poziomu) i stanami po ruchu bez ramki czyszczenia (pola w pełnym rozmiarze).

r5 (Q128–Q143, Q162) dodaje: przełącznik dźwięku na ekranie startowym i w nagłówku gry, krok końca gry z komunikatem nad trójką, powód końca i różnicę do rekordu w panelu, animacje (sekcja „Ruch” na końcu), wyśrodkowany tekst komunikatu bez przycisku i punkty ruchu w jednym wierszu na telefonach. Zmiany geometrii r5: sekcje „screen.game — telefony” (pasek serii i punktów, nagłówek), „screen.home” (przełącznik, znak), „Krok końca gry”.

r4 (Q111–Q114) zmienia geometrię w trzech miejscach, opisanych niżej: wspólna siatka ekranu gry na mac-wide (sekcja „screen.game — mac-wide”), całkowite szerokości slotów trójki na wszystkich targetach (sekcja „Geometria planszy i trójki”) i przyciski menu z wyśrodkowanym tekstem i większym wierszem informacji (sekcja „screen.home”, Q111, Q115). Pozostała geometria jak w r3 (r3: wygląd z Q96, Q102; brak nazwy trybu w grze klasycznej, Q107). Nowe są sekcje „Tło i grafiki” i „Tła na targetach” na końcu.

Targety: `mac-wide` 1440×900, `iphone-standard` 393×852, `iphone-se` 375×667 (r6, Q178), `android-standard` 412×915, `mobile-compact` 360×800, `mobile-large` 440×956, `tablet-narrow` 820×1180, `phone-landscape` 852×393. `element.product-work-surface` obejmuje cały ekran targetu.

## Reguła układu dla dowolnej szerokości okna (r2, Q65 wariant A)

O układzie decyduje wyłącznie szerokość okna:

| Szerokość okna | Układ |
|---|---|
| < 1024 px | Układ telefonu (sekcje „telefony” niżej) w kolumnie o szerokości min(okno, 440 px), wyśrodkowanej poziomo. Tło (niebo i pas ogrodu) na całą szerokość okna. Geometria planszy i trójki liczona z szerokości kolumny, więc od 440 px w górę jest taka jak na `mobile-large`. |
| ≥ 1024 px | Układ `mac-wide` (sekcje „mac-wide” niżej), treść do 1040 px wyśrodkowana. |

- ~~Wysokość nie zmienia układu; ekran telefonu ma co najmniej 800 px, niższe okno przewija~~ — zasada r2 usunięta w r6 (Q177). Obowiązuje sekcja „Wysokość okna (r6)” niżej.
- Wyższe okno (np. `tablet-narrow`) daje układ telefonu z większym wolnym miejscem: grupa gry wyśrodkowana pionowo, trójka i menu przy dolnej krawędzi.
- Podczas przeciągania strona się nie przewija (`touch-action: none` na planszy i klockach); blokadę przewijania dokumentu (Q187) wdraża aplikacja.

## Wysokość okna (r6, Q177–Q181, Q199–Q202)

Każdy ekran — start, gra (także wyzwanie dnia), krok końca, panel końca, dialog wyjścia i komunikaty — mieści się w widocznym obszarze okna bez przewijania pionowego i poziomego. Układ liczy się od dynamicznej wysokości okna (w aplikacji `100dvh` albo równoważnie; paski Safari zmieniają wysokość). Dolna granica (Q181): 375×548 w pionie i 852×340 w poziomie mieszczą się zawsze; mniejsze okna mogą się przewijać, ale pole planszy nigdy nie spada poniżej 32 px. W prototypie liczy to `BG.fitHeight` (`assets/bloomgrid-ui.js`), a wynik stoi na powierzchni jako `data-layout` i zmienne CSS (`--pad-t`, `--pad-b`, `--score-gap`, `--tray-gap`, `--min-h`).

### Układy

| Układ (`data-layout`) | Kiedy | Co |
|---|---|---|
| `phone` | okno < 1024 px, wyższe niż szerokie | jak r5: nagłówek, wynik, pasek serii i punktów, plansza, trójka w kolumnie do 440 px |
| `phone-merged` (Q199) | jak `phone`, ale po skurczeniu odstępów i planszy do pola 32 px nadal brak miejsca (375 px szerokości: okno < 578 px) | seria (skrócona do ikony i „×c”) po lewej i punkty ruchu po prawej stronie wyniku, w jego wierszu; pasek znika z układu; pole 32 px |
| `landscape` (Q180, Q200) | okno < 1024 px, szersze niż wysokie | plansza po lewej na całą wysokość, po prawej kolumna 380 px: nagłówek (dom, dźwięk, poziom albo nazwa trybu, rekord), wynik, pasek, trójka; odstęp 32 px; ekran startowy w dwóch kolumnach (Q202) |
| `wide` | okno ≥ 1024 px | siatka Q112; plansza od wysokości okna (pole do 64 px), nagłówek = plansza + 72 + 380 px |

### Kolejność dopasowania w pionie (Q179)

1. Odstępy: góra 59 → 8 px, dół 34 → 8 px, wynik pod nagłówkiem 8 → 4 px, trójka pod planszą 16 → 12 px — proporcjonalnie, tyle, ile trzeba.
2. Plansza i trójka proporcjonalnie (pole trójki = pole trójki naturalne × pole / pole naturalne, w dół), do pola 32 px.
3. Q199: seria i punkty do wiersza wyniku (`phone-merged`), pole 32 px.
4. Gdy i to się nie mieści, ekran przewija się (wysokość ekranu = `--min-h`), pole zostaje 32 px.
- Szerokość: margines boczny 16 px; gdy przy nim pole byłoby < 32 px (okno węższe niż 344 px), margines 12 px.
- Ekran startowy: te same odstępy; potem zmniejsza się obrazek (ozdoba, do 48 px wysokości), przyciski menu nie.
- Panel końca i dialog: w `phone-merged` i `landscape` karta ma mniejsze odstępy (padding 14 / 18 px, przerwy 8 px), w `landscape` przyciski obok siebie.
- Komunikat błędu zapisu (Q201): gdy jego 76 px nie mieści się w kolumnie (każde okno niższe niż układ naturalny + 76 px: `iphone-se`, 390×660, 375×548, poziomo), leży na wierszu wyniku w wariancie jednowierszowym (ikona, „Nie zapisano”, „Spróbuj ponownie”; 56 px), szerokość treści (poziomo: kolumny). Zasłania wynik, serię i punkty, nigdy przycisków nagłówka, planszy ani trójki.
- Punkty ruchu (Q203): suma i dopiski serii i koloru, gdy się mieszczą; gdy nie — zostaje dopisek o większej wartości (mobile-compact, `phone-merged`). W `phone-merged` suma nad dopiskiem, dopisek może zawinąć się w 2 wiersze.

## Marginesy treści

- Telefony: 59 px u góry (pasek stanu), 34 px u dołu (wskaźnik), 16 px po bokach — na wysokich oknach; niższe okna kurczą je do 8 px (sekcja „Wysokość okna (r6)”). Szerokość treści = szerokość targetu − 32 px (328 / 361 / 380 / 408 px).
- `mac-wide`: 32 px u góry i u dołu, 40 px po bokach. Treść wyśrodkowana, maksymalnie 1040 px szerokości.

## Geometria planszy i trójki

| Target | Pole planszy | Odstęp / rama | Plansza | Pole w trójce | Slot (wys.) | Klocek nad palcem |
|---|---|---|---|---|---|---|
| mobile-compact | 36 | 3 / 6 | 327 | 15 | 101 | 44 |
| iphone-standard | 40 | 3 / 6 | 359 | 17 | 111 | 48 |
| android-standard | 42 | 3 / 6 | 375 | 18 | 116 | 50 |
| mobile-large | 46 | 3 / 6 | 407 | 20 | 126 | 54 |
| mac-wide | 64 | 4 / 8 | 564 | 18 | 116 | — (mysz) |

- Plansza = 8·pole + 9·odstęp + 2·rama. Na telefonach pole = ⌊(min(szerokość treści, 420) − 9·odstęp − 2·rama) / 8⌋; plansza nie rośnie powyżej 420 px.
- Pole w trójce = ⌊(szerokość slotu − 16 − 4·2) / 5⌋, żeby slot mieścił klocek 5×5, gdzie szerokość slotu = (szerokość trójki − 2·12) / 3.
- r4: sloty rysowane są w całkowitej szerokości S = ⌊(szerokość trójki − 24) / 3⌋, zmniejszonej o 1, gdy (szerokość trójki − 3·S) jest nieparzyste; dwa odstępy = (szerokość trójki − 3·S) / 2. Wynik: iphone-standard 111 px / odstęp 14, mobile-compact 100 / 14, android-standard i mac-wide 118 / 13, mobile-large, tablet-narrow i phone-landscape 128 / 12. Trzy sloty stoją na całkowitych pozycjach i rysują się identycznie (slot to jeden obraz rozciągnięty na cały slot, bez 9-slice). Pole w trójce i wysokość slotu bez zmian.
- Klocek nad palcem (R-1.8): dolna krawędź rysowanego klocka max(44 px, pole + 8 px) nad punktem dotyku, klocek wyśrodkowany poziomo względem palca. Miejsce wyznacza lewy górny róg rysowanego klocka, zaokrąglony do najbliższego pola.
- Mysz: przeciągany klocek ma rozmiar pól planszy i zachowuje punkt chwytu (proporcjonalnie przeliczony z trójki).
- Przeciągany klocek podąża za wskaźnikiem bez przyciągania; przyciągane jest tylko podświetlenie pól. W stanach `game.dragging-*` klocek stoi 0,3 pola w lewo i w górę od pól docelowych, więc podświetlenie jest widoczne.
- Plakietka „×2” (22×18 px) nie zasłania żadnego pola (Q59). Rząd: od prawej ramki na wysokości rzędu, wystaje do 14 px poza planszę (na telefonach mieści się w marginesie 16 px). Kolumna: nad górną ramką, wystaje do 10 px ponad planszę, w pas serii.

## screen.game — telefony

Kolejność od góry:

1. Nagłówek (min. 48 px), siatka `1fr auto 1fr`: po lewej `component.icon-button` 44 px i obok niego `component.sound-toggle` 44 px (r5, odstęp 4 px, środki na jednej linii), `component.mode-label` w środku tylko w wyzwaniu dnia (zawija się do 2 wierszy; r3, Q107: w grze klasycznej środek pusty), `component.score-display` `record` po prawej (zawsze trzecia kolumna siatki).
2. Grupa gry wyśrodkowana pionowo w miejscu między nagłówkiem a trójką:
   - `component.score-display` `score` (etykieta 13 px, cyfry 40 px), 8 px pod nagłówkiem;
   - pasek 44 px o szerokości planszy: `component.combo-badge` po lewej, `component.move-points` po prawej; pasek ma stałą wysokość także bez obu elementów, więc plansza nie skacze. r5: zawartość wyśrodkowana w górnych 36 px paska (dolne 8 px zajmuje rama planszy wysunięta w górę), punkty ruchu w jednym wierszu: suma, potem dopiski (wcześniej dopiski pod sumą wychodziły pod ramę i były przycięte, np. „seria +150” w `game.combo`); tabliczka punktów kończy się ≥ 1,9 px nad ramą;
   - `component.board` wyśrodkowana.
3. Tylko `game.save-error`: `component.alert` `save-error` na pełną szerokość treści, 12 px pod grupą gry. Grupa gry przesuwa się w górę (38 px), trójka zostaje na miejscu.
4. `component.piece-tray` na pełną szerokość treści, przy dolnym marginesie (zasięg kciuka), co najmniej 16 px pod grupą gry.

Zmierzone położenie (px od góry, mobile-compact / iphone / android / mobile-large):

| Stan | Plansza | Komunikat zapisu | Trójka |
|---|---|---|---|
| `game.classic-start` | 271–598 / 276–635 / 297–672 / 296–703 | — | 665–766 / 707–818 / 765–881 / 796–922 |
| `game.save-error` | 233–560 / 238–597 / 259–634 / 258–665 | 585–649 / 627–691 / 685–749 / 716–780 | jw. |

Nadmiar wysokości dzieli się po równo nad i pod grupą gry.

- r5: wstęga wyzwania dnia na telefonach wystaje w bok 9 px (było 11), żeby nie nachodziła na przełącznik dźwięku; najmniejszy odstęp wstęga–przełącznik 2,9 px (mobile-compact EN), wstęga–tabliczka rekordu 3 px.

## Krok końca gry (r5, Q128–Q131)

- Po ruchu kończącym grę (R-1.7) — po animacji tego ruchu — przez 1,5 s: plansza przygaszona (pola i ziemia, rama bez zmian), klocki trójki w wariancie `no-fit`, komunikat `element.game.no-moves.message` nad trójką; warstwa `element.game.no-moves` pokrywa cały ekran gry (przewija się z nim), bez zasłony. Potem panel końca gry; przygaszenie i oznaczenie zostają pod panelem.
- Komunikat: tabliczka na szerokość trójki, tekst 17 px wyśrodkowany i zawijany w wyrównane wiersze, dolna krawędź tekstu 12 px nad trójką (tabliczka 4 px nad trójką). Telefony: między planszą a trójką; gdzie miejsca brak (mobile-compact: tekst PL w 2 wierszach; phone-landscape: 16 px między planszą a trójką), tabliczka nachodzi na dolną ramę przygaszonej planszy (do 33 px), nigdy na trójkę. mac-wide: w kolumnie trójki, w miejscu paska serii i punktów (w kroku zawartość paska jest ukryta).
- Stuknięcie, klik albo Esc w czasie kroku pokazuje panel od razu; panel przez 300 ms nie przyjmuje kliknięć, a fokus trafia na „Zagraj ponownie” po tym czasie.

`game.crash` (telefony): zasłona na całą powierzchnię, pasek `component.alert` `crash` 16 px od boków, u góry na 59 px (w miejscu nagłówka).

## screen.game — mac-wide

- r5 (Q143): przełącznik dźwięku 56×56 px obok przycisku wyjścia (x 280, odstęp 12 px), środki obu na jednej linii z rekordem (y 60).
- r4 (Q112) — wspólna siatka: nagłówek ma szerokość planszy + odstępu + kolumny trójki (564 + 72 + 380 = 1016 px), wyśrodkowany jak siatka gry. Przycisk wyjścia (56×56 px, Q113) stoi lewą krawędzią na lewej krawędzi planszy (x 212), rekord (etykieta 14 px, cyfry 22 px, tekst wyśrodkowany w tabliczce) prawą krawędzią na prawej krawędzi kolumny trójki (x 1228); środki przycisku i rekordu na jednej linii (y 60). Nazwa trybu w środku tylko w wyzwaniu dnia (Q107). Nagłówek ma 56 px wysokości.
- Pod nim siatka `564px 380px` z odstępem 72 px, wyśrodkowana w poziomie i w pionie:
  - lewa kolumna: plansza 564 px (pole 64 px);
  - prawa kolumna, od góry: wynik (etykieta 13 px, cyfry 60 px), pasek 96 px, trójka 380 px (sloty 118 px, odstęp 13, wysokość 116 px); w `game.save-error` pod trójką komunikat zapisu 380 px.
  - Oś pionowa: wynik (etykieta i cyfry), seria i punkty ruchu są wyśrodkowane na osi środkowego slotu trójki (x 1038 = środek kolumny). Pasek ma układ kolumnowy: seria (32 px), odstęp 6 px, punkty ruchu z dopiskami; stała wysokość 96 px, więc kolumna nie skacze, gdy seria albo punkty znikają.
  - Tolerancja wspólnych krawędzi i osi: ±1 px (zmierzone 0 px w `game.combo`, `game.color-bonus`, `game.line-clear`, `game.classic-start`, `game.dragging-line-preview`, `game.daily-start`).
- Zmierzone (px od góry, `game.classic-start`): plansza 196–760, wynik 312,5–391,5, trójka 527,5–643,5; `game.save-error`: wynik 270,5, trójka 485,5–601,5, komunikat 621,5–685,5. `game.crash`: pasek 560 px wyśrodkowany, 32 px od góry, na zasłonie.
- Gdzie siatka Q112 obowiązuje: tylko w układzie mac-wide (okno ≥ 1024 px), bo tylko tam kolumna trójki stoi obok planszy. `tablet-narrow` (820 px) i `phone-landscape` (852 px) mają układ telefonu (kolumna do 440 px; trójka pod planszą), więc Q112 ich nie zmienia; na telefonach przycisk wyjścia i rekord zostają przy krawędziach treści (rekord prawą krawędzią przy prawej krawędzi trójki, 0 px).
- Uzasadnienie: przy 900 px wysokości układ kolumnowy wymusiłby pole ~48 px. Układ obok siebie daje pole 64 px, a droga myszy z trójki na planszę to ~300 px.
- Hover na klocku (tylko urządzenia z kursorem): rozjaśnienie i cień, kursor `grab`; podczas przeciągania `grabbing`.

## Nakładki: dialog i panel końca gry

- Zasłona na całą powierzchnię (`rgba(28,22,14,.46)`), karta do 380 px (`mac-wide` do 460 px) wyśrodkowana, margines 16 px. Etykiety przycisków nie łamią się.
- Telefony: przyciski jeden pod drugim, na pełną szerokość karty. `mac-wide`: przyciski obok siebie, równa szerokość.
- Panel końca gry nie zasłania nagłówka logicznie (zasłona go przyciemnia), końcowa plansza pozostaje widoczna pod zasłoną.

## screen.home

- r5 (Q143): `component.sound-toggle` w prawym górnym rogu ekranu: telefony 44 px, 59 px od góry, prawa krawędź na prawej krawędzi treści — tej samej, co prawa krawędź przycisków menu (16 px od krawędzi kolumny; zmierzone 0 px różnicy na 6 targetach telefonu); mac-wide 56 px, 32 px od góry, prawa krawędź na prawej krawędzi rekordu i kolumny trójki ekranu gry (x 1228, różnica 0 px, Q112). Na telefonach znak z hasłem ma szerokość do (szerokość treści − 106 px) i tabliczkę wystającą 6 px w bok, więc nie sięga pod przełącznik (odstęp ≥ 3 px, mobile-compact EN); dłuższe hasło (EN na mobile-compact) zawija się w 2 wiersze.
- r5 (Q162): `component.alert` `read-error` — tekst wyśrodkowany w całym komunikacie, ikona przy lewej krawędzi.

- r4 (Q111, Q115): w przycisku menu ikona przy lewej krawędzi, blok tekstu wyśrodkowany w całym przycisku (prawy margines bloku 46 px = ikona 36 + odstęp 10). Wiersz informacji 15 px; „Wyzwanie dnia” pokazuje tylko „Rekord dnia N” (bez daty). Wszystkie wiersze informacji mieszczą się w jednym wierszu na każdym targecie (także mobile-compact i EN); przycisk ma 70,6 px wysokości (r3: 69,3), kolumna menu przy dolnym marginesie rośnie w górę o ok. 1,3 px na przycisk. Dłuższy tekst zawinąłby się w wyrównane wiersze bez nachodzenia na ikonę.

- Telefony, od góry: `component.wordmark` (nazwa 34 px, znak 44 px) 24 px pod marginesem, pod nim ilustracja skrzyni z kwiatami `assets/img/home-hero.webp` (320×160, obraz 640×320, dekoracja). Kolumna menu przy dolnym marginesie (zasięg kciuka), odstęp 12 px: [`component.alert` `read-error` — tylko `home.read-error`], [„Kontynuuj” primary — tylko przy zapisie], „Nowa gra” (primary bez zapisu, secondary z zapisem), „Wyzwanie dnia” secondary. `component.menu-button` min. 68 px, pełna szerokość treści.
- Zmierzone (iphone-standard, `home.resume-available`): nazwa i ilustracja 83–329 px, kolumna menu 586–818 px. Na mobile-compact menu 534–766 px; wolne miejsce zostaje między ilustracją a menu.
- `mac-wide`: nazwa 48 px, znak 60 px, ilustracja 380 px, wyśrodkowane u góry (72–370 px). Kolumna menu 400 px wyśrodkowana w poziomie i w pionie w pozostałym miejscu (503–735 px przy 3 przyciskach).

## Tło i grafiki

- Tło sceny (Q98, Q104): jedna z trzech ilustracji `blossom-wall`, `garden-dusk`, `hedge`, każda w dwóch kadrach: pionowym 9:16 (`assets/img/bg-<tło>-phone.webp`, 768×1376) i poziomym 16:9 (`bg-<tło>-desktop.webp`, 1376×768). Ekran startowy ma zawsze `blossom-wall`; gra klasyczna — tło losowane przy nowej grze; wyzwanie dnia — tło z daty ciągu (numer dnia od 1970-01-01 modulo 3). Tło jest dekoracją, nie zawiera informacji, nie przewija się z ekranem.
- r6 (Q147, Q148): krąg sześciu motywów gry klasycznej w kolejności `blossom-wall`, `lily-pond`, `garden-dusk`, `dawn-meadow`, `hedge`, `firefly-night` (dzienne i wieczorne na przemian). Nowe tła mają te same kadry 9:16 i 16:9 i te same zasady (cover, u dołu), z wyjątkiem `bg-lily-pond-desktop.webp` 1202×676 (wycinek bez brzegu papieru, ta sama proporcja 16:9; na mac-wide skala 1,331 zamiast 1,172). Ekran startowy i wyzwanie dnia bez zmian (trzy pierwotne tła).
- Kafle kolorów (R-1.9, Q103): `assets/img/tile-<color>.webp` (128×128) wypełniają pole planszy i przeciągany klocek (pole 36–64 px); klocki w trójce (pole 15–20 px) mają uproszczony kafel `tile-<color>-s.webp` (64×64): jeden duży kwiat z grubym konturem, czytelny przy 15 px.
- Rama planszy: `assets/img/board-frame.webp` jako border-image o szerokości rama + wysunięcie: telefony 6 + 8 px, mac-wide 8 + 10 px. Wysunięcie (border-image-outset) nie zmienia układu; na telefonach mieści się w bocznym marginesie 16 px.
- Wyzwanie dnia (Q108): nazwa trybu na śliwkowej wstędze (`assets/img/daily-ribbon.webp`, pseudo-element wystający 5 px w górę, 16 px w dół i w bok 22 px na mac-wide, 11 px na telefonach); na ramie planszy złota listwa 2 px (−3…−1 px od krawędzi planszy) i złote słońca w narożnikach (22 px telefony, 30 px mac-wide, środek w narożniku ramy); dialog i panel końca na karcie `daily-card.webp`. Układ bez zmian.
- r4: rama planszy, ramy kart, pigułki przycisków i plakietka serii są rozciągane (`border-image-repeat: stretch`). W r3 `round` na ramach z fakturą zostawiał widoczne złącza powtórzeń na środku boków. Slot trójki, przycisk wyjścia, moneta „×2” i wstęga wyzwania to pojedyncze obrazy rozciągnięte na cały element (bez 9-slice).
- Tekst na tle sceny (rekord, wynik, punkty ruchu, znak z hasłem) leży na kremowej tabliczce rysowanej pseudo-elementem wystającym 4 px w pionie i 12 px w poziomie (znak: 10 / 14 px); nie zmienia rozmiaru elementów. Na mac-wide wynik zajmuje kolumnę 380 px, więc tabliczka leży tylko pod cyframi i etykietą.

## Tła na targetach

Kadr wybiera proporcja powierzchni, nie układ: powierzchnia wyższa niż szeroka → kadr 9:16, pozostałe → 16:9. Obraz pokrywa całą powierzchnię (cover), zakotwiczony u dołu i wyśrodkowany w poziomie.

| Target | Powierzchnia | Kadr | Skala | Przycięcie |
|---|---|---|---|---|
| mac-wide | 1440×900 | 16:9 | 1,172 (1612×900) | po 86 px z boków |
| iphone-standard | 393×852 | 9:16 | 0,619 (476×852) | po 41 px z boków |
| android-standard | 412×915 | 9:16 | 0,665 (511×915) | po 49 px z boków |
| mobile-compact | 360×800 | 9:16 | 0,581 (447×800) | po 43 px z boków |
| mobile-large | 440×956 | 9:16 | 0,695 (534×956) | po 47 px z boków |
| tablet-narrow | 820×1180 | 9:16 | 1,068 (820×1469) | 289 px od góry (gałęzie, niebo) |
| phone-landscape | 852×393 | 16:9 | 0,619 (852×475) | 82 px od góry |

- `tablet-narrow`: układ telefonu (kolumna 440 px), ale tło na całą szerokość okna z kadru pionowego; obraz powiększony o 7%, przycięta górna część nieba.
- `phone-landscape`: r6 — układ obok siebie bez przewijania (Q180), tło z kadru poziomego.
- `iphone-se` 375×667 (r6): kadr 9:16, cover jak pozostałe telefony.

## Pasek narzędzi podglądu (tylko user_preview i katalog)

Pasek jest przyklejony do dołu okna przeglądarki, poza powierzchnią. Powierzchnia skaluje się do miejsca nad paskiem (maks. 100%). Na wąskim oknie rzędy się zawijają, a pole uwag zajmuje cały wiersz. W `mode=capture` paska nie ma.

## Teksty EN

Fixture `english` zmienia wszystkie etykiety. Kontenery tekstu nie mają stałej szerokości ani `nowrap`, z wyjątkiem plakietek (seria, „×2”, nowy rekord) i dopisków punktów ruchu, które zawijają się między dopiskami. Najdłuższe teksty EN („Your score won't count toward your best”, „A new daily challenge is available.”) zawijają się w karcie 328 px. Grupowanie cyfr według `Intl.NumberFormat` (R-2.5): pl od 10 000 („2340”, „18 420”), en od 1 000 („6,842”). r5: komunikat końca „No room for any piece” mieści się w jednym wierszu na każdym targecie (tekst PL na mobile-compact w 2 wyśrodkowanych wierszach); różnica do rekordu „11,578 short of your best”.

## Poziomy (r6)

### Etykieta poziomu (Q147, Q151)

- Tylko gra klasyczna, środek nagłówka — to samo miejsce co nazwa trybu w wyzwaniu dnia (oś treści między lewą grupą wyjście + dźwięk a rekordem; wyśrodkowanie zmierzone 0 px na każdym targecie). Nagłówek bez zmiany wysokości: 48 px telefony, 56 px mac-wide.
- Dwa wiersze na kremowej tabliczce (jak wynik i rekord): „Poziom n” 16 px / 800, nazwa motywu 12,5 px / 700 w jednym wierszu; mac-wide 18 / 14 px. Etykieta 32,8 px wysokości na telefonach, 36,8 px na mac-wide.
- Nazwy motywów mają najwyżej 14 znaków, żeby na mobile-compact tabliczka nie sięgała pod przełącznik dźwięku: najmniejszy odstęp tabliczki od przełącznika 10 px („Ogród o zmroku”), od tabliczki rekordu 31 px (mobile-compact). EN krótsze.
- Poziom z wyniku (Q197, Q153): progi 300, 800, 2000, 3500, 6000, 9000, dalej co 4000; poziom = 1 + liczba osiągniętych progów. Motyw poziomu n: `CIRCLE[(start + n − 1) mod 6]`, `start` losowany przy nowej grze (Q148). W prototypie `start` wynika z tła stanu.

### Plakietka awansu i przenikanie tła (Q150, Q188)

- Plakietka na wyniku: środek plakietki = środek elementu wyniku (0 px, zmierzone), w opakowaniu `.bg-score-wrap`. Telefony: 24 / 15 px, wysokość 57,6 px (wynik 58 px), szerokość wg treści (mobile-compact „Poziom 4! · Żywopłot” 160 px); mac-wide: 32 / 17 px, 215×75 px na wyniku 380×79 w kolumnie trójki. Nie nachodzi na planszę (z ramą 8 / 10 px) ani trójkę na żadnym targecie; na telefonach od ramy planszy dzieli ją pasek serii i punktów (mobile-compact 38 px).
- Pochwała z tego samego ruchu stoi nad środkiem planszy (jak w r5) — plakietka awansu i pochwała są widoczne naraz, w różnych miejscach, bez nakładania (`game.level-up-praise`).
- Przenikanie: nowe tło od razu na powierzchni, stare na warstwie `.bg-bgfade` (pierwsze dziecko powierzchni, pod ekranem) gaśnie liniowo 800 ms; reduced-motion 150 ms.

### Pusta grządka (Q189, Q203)

- Pochwała „Pusta grządka! +300” (`component.praise`, `data-variant="empty-garden"`) nad środkiem pustej planszy: tekst 26 px (mac-wide 40 px), wyśrodkowany, zawija się w planszy (szerokość do planszy − 24 px; telefony 2 wiersze). Ma pierwszeństwo przed „Świetnie!” i „Wspaniale!” — jedna pochwała na ruch.
- Rozkwit: płatki 0,6 pola na 24 z 64 pól w stałym wzorze (co trzecie pole), na warstwie efektów planszy; stała klatka w capture.
- Punkty ruchu: suma ruchu (z premią), bez dopisku „pusta grządka”.

### Interakcja klocka

- Wygląd przeciągania bez zmian względem r5 (klocek nad palcem z odsunięciem max(44 px, pole + 8 px), slot `lifted`). Stuknij-stuknij nie ma (Q185). Moment podniesienia, pole chwytu, niesienie myszą i blokadę przewijania (Q182, Q186, Q187, R-1.10, R-1.11) wdraża Wykonawca; prototyp ich nie pokazuje.

## Ruch (r5, Q135–Q139; r6: wiersze 8, 10, 11, 12)

Zasady: animacje grają tylko po interakcji gracza i nie blokują gry — stan po ruchu (plansza po czyszczeniu, nowa trójka, wynik) jest od razu końcowy, a efekty leżą na warstwie nad planszą albo na klasie elementu zdejmowanej po czasie (Q136); następny klocek można chwycić w trakcie animacji. Bez wstrząsu ekranu, bez błysków częstszych niż 3/s (jeden złoty błysk na linię), bez efektów kasynowych (Q137). W `mode=capture` animacji nie ma: każdy stan to stała klatka końcowa (0 animacji, DOM stały). Stałe czasów: `BG.MOTION` w `assets/bloomgrid-ui.js`.

| # | Animacja | Czas | Krzywa i przebieg | reduced-motion |
|---|---|---|---|---|
| 1 | osadzenie położonego klocka (pola, które zostały na planszy) | 150 ms | ease-out; skala 0,84 → 1,06 (60%) → 1 | przezroczystość 0 → 1, 150 ms linear |
| 2 | czyszczenie linii — rozkwit | 450 ms | kopia kafla na warstwie efektów: ease-in; skala 1 → 1,14 (30%) → 0,3 z obrotem 18°, przezroczystość 1 → 0 (od 30%); 3 płatki w kolorze kafla (`assets/img/petal-<kolor>.webp`, ½ pola) z jego środka: ease-out, przesunięcie do ±0,75 pola w bok i 0,45–1,15 pola w dół, obrót ±90–210°, skala 0,6 → 1, przezroczystość 1 → 0 | kopia kafla zanika (przezroczystość 1 → 0, 150 ms), bez płatków |
| 3 | linia jednego koloru | 600 ms | rozkwit jak 2, ale 600 ms; jeden złoty błysk (gradient 40% długości linii) przesuwa się wzdłuż linii ease-in-out, pojawia się i znika w 15% / 85%; kopia plakietki „×2” podskakuje (skala 0,4 → 1,3 (25%) → 1 (45%)) i gaśnie od 80% | zanikanie 150 ms, bez błysku, „×2” zanika |
| 4 | plakietka serii przy wzroście licznika | 250 ms | ease-out; skala 1 → 1,22 (40%) → 1 | przezroczystość 150 ms |
| 5 | punkty ruchu | 300 ms | ease-out; 10 px w górę i pojawienie; zostają widoczne do następnego położenia (r4: znikały po 1,4 s) | przezroczystość 150 ms |
| 6 | wynik dolicza się | ≤ 400 ms | ease-out cubic, wartość pośrednia zaokrąglana, `requestAnimationFrame` | od razu nowa wartość |
| 7 | nowa trójka | 3 × 80 ms | klocki wjeżdżają kolejno: start co 80 ms, każdy wjazd 240 ms `cubic-bezier(.2,.8,.3,1.2)`, z 18 px niżej i skali 0,7 | przezroczystość 150 ms, wszystkie naraz |
| 8 | nowy rekord — deszcz płatków na karcie panelu | 1000 ms | 18 płatków pięciu kolorów, start rozłożony do 400 ms, spadek liniowy przez kartę z obrotem, każdy kończy w 1000 ms. r6 (Q176): droga spadku = wysokość karty + 48 px (`--fall`; start 24 px nad górną krawędzią karty, koniec 24 px pod dolną), więc płatki są na karcie przez całą sekundę na każdym targecie. Zmierzone: mac-wide karta 325 px, droga 373 px (r5: stałe 520 px — płatki opuszczały kartę po ok. 60% czasu); iphone-standard karta 324 px; płatków na karcie w 250 / 500 / 750 ms: 14 / 18 / 18 z 18 | brak |
| 9 | krok końca gry | 1500 ms | przygaszenie planszy 300 ms ease-out, komunikat wsuwa się 8 px w górę w 300 ms; po 1,5 s panel końca: 250 ms ease-out (12 px w górę, skala 0,96 → 1); stuknięcie, klik albo Esc skraca krok | ten sam czas 1,5 s; komunikat i panel tylko przezroczystość 150 ms |
| 10 | r6: awans — plakietka poziomu na wyniku (Q150, Q188) | 1500 ms | ease-out; skala 0,7 → 1,06 (14%) → 1 (22%), postój, zanik od 85% (1275 ms); równocześnie etykieta poziomu jak 4 (250 ms) i — gdy ruch czyści 2+ linie — pochwała nad planszą | pojawienie 150 ms, widoczna, zanik 150 ms (tylko przezroczystość); etykieta: przezroczystość 150 ms |
| 11 | r6: przenikanie tła przy awansie (Q150) | 800 ms | linear; stare tło na warstwie nad nowym, przezroczystość 1 → 0 | przezroczystość 150 ms |
| 12 | r6: pusta grządka (Q189) | 1200 ms | rozkwit falą od środka planszy: płatki na polach, pierścień co 60 ms (do 4 pierścieni, start ≤ 240 ms), każdy płatek 600 ms ease-out: skala 0,2 → 1,15 (35%) → 0,9, przezroczystość 0 → 1 → 0, 6 px w górę; pochwała „Pusta grządka! +300” (Q203): skala 0,6 → 1,08 (15%) → 1 (25%), postój, zanik od 85% (1020 ms); punkty ruchu jak 5, wynik jak 6 | bez fali i skali: płatki przezroczystość 150 ms, plakietka pojawienie 150 ms, widoczna, zanik 150 ms |
| — | pochwała (Q139) | 800 ms | ease-out; skala 0,7 → 1,06 (20%) → 1 (30%), potem unosi się o 30% wysokości i gaśnie od 75%; „Świetnie!” przy 2 liniach naraz, „Wspaniale!” przy 3 i więcej, najwyżej jedna na ruch; bez „Seria ×N!” | pojawienie 144 ms, widoczna, zanik 144 ms (tylko przezroczystość) |

- r6 (Q175): stany `game.line-clear`, `game.color-bonus`, `game.combo` pokazują stan po ruchu (plansza po czyszczeniu, wynik i punkty ruchu, seria); rozkwit i ramka czyszczenia są tylko w katalogu (`foundation.motion`) i na żywo.
- Kolejność po ruchu: 1–3, 5, 6 i pochwała (albo przy awansie 10 i 11 zamiast pochwały) startują razem; 4 gdy licznik serii rośnie; 7 gdy ruch dobrał nową trójkę; krok końca (9) zaczyna się po animacji ruchu (150 / 450 / 600 ms, przy reduced-motion 150 ms).
- Katalog (`foundation.motion`, `component.game-over-panel`, `component.no-moves-step`) ma przyciski „Odtwórz” przy animacjach.
