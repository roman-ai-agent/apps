# Bloomgrid r3 — specyfikacja responsywności

r3 zmienia wygląd (Q96, Q102): geometria, kolejność, widoczność i scroll są jak w r2. Jedyny wyjątek: w grze klasycznej nie ma nazwy trybu w nagłówku (Q107); pozostałe elementy zostają na swoich miejscach. Nowe są sekcje „Tło i grafiki” i „Tła na targetach” na końcu.

Targety: `mac-wide` 1440×900, `iphone-standard` 393×852, `android-standard` 412×915, `mobile-compact` 360×800, `mobile-large` 440×956, `tablet-narrow` 820×1180, `phone-landscape` 852×393. `element.product-work-surface` obejmuje cały ekran targetu.

## Reguła układu dla dowolnej szerokości okna (r2, Q65 wariant A)

O układzie decyduje wyłącznie szerokość okna:

| Szerokość okna | Układ |
|---|---|
| < 1024 px | Układ telefonu (sekcje „telefony” niżej) w kolumnie o szerokości min(okno, 440 px), wyśrodkowanej poziomo. Tło (niebo i pas ogrodu) na całą szerokość okna. Geometria planszy i trójki liczona z szerokości kolumny, więc od 440 px w górę jest taka jak na `mobile-large`. |
| ≥ 1024 px | Układ `mac-wide` (sekcje „mac-wide” niżej), treść do 1040 px wyśrodkowana. |

- Wysokość nie zmienia układu. Ekran w układzie telefonu ma co najmniej 800 px wysokości (wysokość `mobile-compact`). Niższe okno, np. telefon w poziomie, przewija stronę w pionie. Przewija się sam ekran, a nakładki (zasłona dialogu, panelu końca i błędu programu) zostają nad oknem. Karta na zasłonie przewija się, gdy jest wyższa niż okno. Poziomego przewijania nie ma.
- Wyższe okno (np. `tablet-narrow`) daje układ telefonu z większym wolnym miejscem: grupa gry wyśrodkowana pionowo, trójka i menu przy dolnej krawędzi.
- Przeciągany klocek przewija się razem z ekranem. Podczas przeciągania strona się nie przewija (`touch-action: none` na planszy i klockach).
- Zmierzone (px od góry, `game.classic-start`): `tablet-narrow` — plansza 408–815, trójka 1020–1146; `phone-landscape` — plansza 219–626, trójka 642–768 (wysokość ekranu 800, okno 393, przewijanie do 407 px). Pozostałe targety bez zmian względem r1.

## Marginesy treści

- Telefony: 59 px u góry (pasek stanu), 34 px u dołu (wskaźnik), 16 px po bokach. Szerokość treści = szerokość targetu − 32 px (328 / 361 / 380 / 408 px).
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
- Pole w trójce = ⌊(szerokość slotu − 16 − 4·2) / 5⌋, żeby slot mieścił klocek 5×5. Slot = (szerokość trójki − 2·12) / 3.
- Klocek nad palcem (R-1.8): dolna krawędź rysowanego klocka max(44 px, pole + 8 px) nad punktem dotyku, klocek wyśrodkowany poziomo względem palca. Miejsce wyznacza lewy górny róg rysowanego klocka, zaokrąglony do najbliższego pola.
- Mysz: przeciągany klocek ma rozmiar pól planszy i zachowuje punkt chwytu (proporcjonalnie przeliczony z trójki).
- Przeciągany klocek podąża za wskaźnikiem bez przyciągania; przyciągane jest tylko podświetlenie pól. W stanach `game.dragging-*` klocek stoi 0,3 pola w lewo i w górę od pól docelowych, więc podświetlenie jest widoczne.
- Plakietka „×2” (22×18 px) nie zasłania żadnego pola (Q59). Rząd: od prawej ramki na wysokości rzędu, wystaje do 14 px poza planszę (na telefonach mieści się w marginesie 16 px). Kolumna: nad górną ramką, wystaje do 10 px ponad planszę, w pas serii.

## screen.game — telefony

Kolejność od góry:

1. Nagłówek (min. 48 px), siatka `1fr auto 1fr`: `component.icon-button` 44 px po lewej, `component.mode-label` w środku tylko w wyzwaniu dnia (zawija się do 2 wierszy; r3, Q107: w grze klasycznej środek pusty), `component.score-display` `record` po prawej (zawsze trzecia kolumna siatki).
2. Grupa gry wyśrodkowana pionowo w miejscu między nagłówkiem a trójką:
   - `component.score-display` `score` (etykieta 13 px, cyfry 40 px), 8 px pod nagłówkiem;
   - pasek 44 px o szerokości planszy: `component.combo-badge` po lewej, `component.move-points` po prawej; pasek ma stałą wysokość także bez obu elementów, więc plansza nie skacze;
   - `component.board` wyśrodkowana.
3. Tylko `game.save-error`: `component.alert` `save-error` na pełną szerokość treści, 12 px pod grupą gry. Grupa gry przesuwa się w górę (38 px), trójka zostaje na miejscu.
4. `component.piece-tray` na pełną szerokość treści, przy dolnym marginesie (zasięg kciuka), co najmniej 16 px pod grupą gry.

Zmierzone położenie (px od góry, mobile-compact / iphone / android / mobile-large):

| Stan | Plansza | Komunikat zapisu | Trójka |
|---|---|---|---|
| `game.classic-start` | 271–598 / 276–635 / 297–672 / 296–703 | — | 665–766 / 707–818 / 765–881 / 796–922 |
| `game.save-error` | 233–560 / 238–597 / 259–634 / 258–665 | 585–649 / 627–691 / 685–749 / 716–780 | jw. |

Nadmiar wysokości dzieli się po równo nad i pod grupą gry.

`game.crash` (telefony): zasłona na całą powierzchnię, pasek `component.alert` `crash` 16 px od boków, u góry na 59 px (w miejscu nagłówka).

## screen.game — mac-wide

- Nagłówek na szerokość 1040 px: przycisk wyjścia, nazwa trybu w środku (tylko wyzwanie dnia, Q107), rekord po prawej.
- Pod nim siatka `564px 380px` z odstępem 72 px, wyśrodkowana w poziomie i w pionie:
  - lewa kolumna: plansza 564 px (pole 64 px);
  - prawa kolumna, od góry: wynik (etykieta 13 px, cyfry 60 px, do lewej), pasek 52 px (seria, punkty ruchu), trójka 380 px (slot 116 px); w `game.save-error` pod trójką komunikat zapisu 380 px (kolumna wyśrodkowana pionowo: trójka 460–576, komunikat 596–660).
- Plansza: 192–756 px od góry. `game.crash`: pasek 560 px wyśrodkowany, 32 px od góry, na zasłonie.
- Uzasadnienie: przy 900 px wysokości układ kolumnowy wymusiłby pole ~48 px. Układ obok siebie daje pole 64 px, a droga myszy z trójki na planszę to ~300 px.
- Hover na klocku (tylko urządzenia z kursorem): rozjaśnienie i cień, kursor `grab`; podczas przeciągania `grabbing`.

## Nakładki: dialog i panel końca gry

- Zasłona na całą powierzchnię (`rgba(28,22,14,.46)`), karta do 380 px (`mac-wide` do 460 px) wyśrodkowana, margines 16 px. Etykiety przycisków nie łamią się.
- Telefony: przyciski jeden pod drugim, na pełną szerokość karty. `mac-wide`: przyciski obok siebie, równa szerokość.
- Panel końca gry nie zasłania nagłówka logicznie (zasłona go przyciemnia), końcowa plansza pozostaje widoczna pod zasłoną.

## screen.home

- Telefony, od góry: `component.wordmark` (nazwa 34 px, znak 44 px) 24 px pod marginesem, pod nim ilustracja skrzyni z kwiatami `assets/img/home-hero.webp` (320×160, obraz 640×320, dekoracja). Kolumna menu przy dolnym marginesie (zasięg kciuka), odstęp 12 px: [`component.alert` `read-error` — tylko `home.read-error`], [„Kontynuuj” primary — tylko przy zapisie], „Nowa gra” (primary bez zapisu, secondary z zapisem), „Wyzwanie dnia” secondary. `component.menu-button` min. 68 px, pełna szerokość treści.
- Zmierzone (iphone-standard, `home.resume-available`): nazwa i ilustracja 83–329 px, kolumna menu 586–818 px. Na mobile-compact menu 534–766 px; wolne miejsce zostaje między ilustracją a menu.
- `mac-wide`: nazwa 48 px, znak 60 px, ilustracja 380 px, wyśrodkowane u góry (72–370 px). Kolumna menu 400 px wyśrodkowana w poziomie i w pionie w pozostałym miejscu (503–735 px przy 3 przyciskach).

## Tło i grafiki

- Tło sceny (Q98, Q104): jedna z trzech ilustracji `blossom-wall`, `garden-dusk`, `hedge`, każda w dwóch kadrach: pionowym 9:16 (`assets/img/bg-<tło>-phone.webp`, 768×1376) i poziomym 16:9 (`bg-<tło>-desktop.webp`, 1376×768). Ekran startowy ma zawsze `blossom-wall`; gra klasyczna — tło losowane przy nowej grze; wyzwanie dnia — tło z daty ciągu (numer dnia od 1970-01-01 modulo 3). Tło jest dekoracją, nie zawiera informacji, nie przewija się z ekranem.
- Kafle kolorów (R-1.9, Q103): `assets/img/tile-<color>.webp` (128×128) wypełniają pole planszy i przeciągany klocek (pole 36–64 px); klocki w trójce (pole 15–20 px) mają uproszczony kafel `tile-<color>-s.webp` (64×64): jeden duży kwiat z grubym konturem, czytelny przy 15 px.
- Rama planszy: `assets/img/board-frame.webp` jako border-image o szerokości rama + wysunięcie: telefony 6 + 8 px, mac-wide 8 + 10 px. Wysunięcie (border-image-outset) nie zmienia układu; na telefonach mieści się w bocznym marginesie 16 px.
- Wyzwanie dnia (Q108): nazwa trybu na śliwkowej wstędze (`assets/img/daily-ribbon.webp`, pseudo-element wystający 5 px w górę, 16 px w dół i w bok 22 px na mac-wide, 11 px na telefonach); na ramie planszy złota listwa 2 px (−3…−1 px od krawędzi planszy) i złote słońca w narożnikach (22 px telefony, 30 px mac-wide, środek w narożniku ramy); dialog i panel końca na karcie `daily-card.webp`. Układ bez zmian.
- Rama planszy i ramy kart powtarzają boki obrazu (`border-image-repeat: round`), gładkie pigułki przycisków i plakietki są rozciągane (`stretch`).
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
- `phone-landscape`: układ telefonu z przewijaniem (ekran 800 px w oknie 393 px), tło z kadru poziomego, stałe pod przewijanym ekranem.

## Pasek narzędzi podglądu (tylko user_preview i katalog)

Pasek jest przyklejony do dołu okna przeglądarki, poza powierzchnią. Powierzchnia skaluje się do miejsca nad paskiem (maks. 100%). Na wąskim oknie rzędy się zawijają, a pole uwag zajmuje cały wiersz. W `mode=capture` paska nie ma.

## Teksty EN

Fixture `english` zmienia wszystkie etykiety. Kontenery tekstu nie mają stałej szerokości ani `nowrap`, z wyjątkiem plakietek (seria, „×2”, nowy rekord) i dopisków punktów ruchu, które zawijają się między dopiskami. Najdłuższe teksty EN („Your score won't count toward your best”, „A new daily challenge is available.”) zawijają się w karcie 328 px. Grupowanie cyfr według `Intl.NumberFormat` (R-2.5): pl od 10 000 („2340”, „18 420”), en od 1 000 („6,842”).
