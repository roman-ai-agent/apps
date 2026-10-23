# Sumlands r1 — specyfikacja responsywności

Targety: `mac-wide` 1440×900, `iphone-standard` 393×852, `android-standard` 412×915, `mobile-compact` 360×800, `mobile-large` 440×956. Telefony tylko w pionie. `element.product-work-surface` obejmuje cały ekran targetu.

## Marginesy treści

- Telefony: 59 px u góry (pasek stanu), 34 px u dołu (wskaźnik), 16 px po bokach. Szerokość treści = szerokość targetu − 32 px (328 / 361 / 380 / 408 px).
- `mac-wide`: 32 px u góry i u dołu, 40 px po bokach. Treść wyśrodkowana, maksymalnie 1100 px szerokości.

## screen.level — telefony

Kolejność od góry, bez przewijania:

1. Nagłówek (min. 48 px): `component.back-button` 44 px, obok nazwa krainy (14 px) i „Poziom N” (22 px). Nazwa może zawinąć się do 2 wierszy.
2. Liczby celu: 20 px pod nagłówkiem, wiersz wyśrodkowany, odstęp 10 px. Przy 5 liczbach trzycyfrowych na 360 px zawija się do 2 wierszy.
3. Elastyczna przerwa. Pole sumy i koło trzymają się dołu, w zasięgu kciuka.
4. `component.path-result`: pełna szerokość treści, min. 64 px, 20 px nad kołem.
5. `component.operation-wheel`: wyśrodkowane, 24 px nad dolnym marginesem.

| Target | Bok koła | Płytka | Tekst płytki | Odstęp między płytkami |
|---|---|---|---|---|
| mobile-compact | 320 | 81 | 24 | ≈ 23 |
| iphone-standard | 344 | 87 | 26 | ≈ 24 |
| android-standard | 344 | 87 | 26 | ≈ 24 |
| mobile-large | 344 | 87 | 26 | ≈ 24 |

Bok koła = min(szerokość targetu − 40, 344). Na większych telefonach koło nie rośnie dalej, żeby nie wydłużać drogi kciuka. Nadmiar wysokości trafia do przerwy w punkcie 3.

## screen.level — mac-wide

- Nagłówek u góry, nad dwiema kolumnami: przycisk powrotu, nazwa krainy (16 px), „Poziom N” (28 px).
- Pod nim siatka `minmax(0,1fr) 460px` z odstępem 72 px, wyśrodkowana pionowo w pozostałej wysokości:
  - lewa kolumna: liczby celu (76 px wys., 40 px, wyrównanie do lewej), pod nimi pole sumy (min. 84 px, 34 px);
  - prawa kolumna: koło 460 px, płytki 116 px, tekst 35 px.
- Uzasadnienie: przy 900 px wysokości układ kolumnowy wymusiłby mniejsze koło. Układ obok siebie trzyma sumę i cele na jednej linii wzroku z kołem.
- Rysowanie myszą lub gładzikiem: naciśnięcie zaczyna, przeciąganie dodaje, puszczenie kończy. Strefa dodania jest taka sama jak na telefonie (70% promienia). Hover na płytce zmienia tylko obrys.

## screen.land-map — telefony

Kolejność od góry, bez przewijania:

1. Nagłówek: „Sumlands” (14 px) i „Mapa krain” (26 px). Nie ma przycisku powrotu.
2. Tylko w `land-map.all-complete`: komunikat „Kolejne krainy wkrótce” (✓ i tekst 20 px, do 2 wierszy), 16 px pod nagłówkiem. To nie jest okno modalne, bo ukończone krainy można grać ponownie (R-2.6).
3. 3 karty `component.land-card` w układzie poziomym, jedna pod drugą, odstęp 12 px. Obrazek 128 px po lewej, kadr od środka. Nazwa 19 px i zakres 14 px zawijają się bez ograniczenia wierszy. Najwyższy układ (`all-complete` po angielsku na 360 px) mieści się nad dolnym marginesem.

## screen.land-map — mac-wide

- Nagłówek 16 / 34 px i komunikat (26 px) na szerokość treści (1100 px).
- Karty w układzie pionowym, siatka 3 × `minmax(0,1fr)`, odstęp 24 px, wyśrodkowane pionowo w pozostałej wysokości. Obrazek 16:9 na całą szerokość karty (≈ 350 px).

## screen.land — telefony

1. Nagłówek: `component.back-button` (do mapy), nazwa krainy (22 px) i zakres (14 px).
2. Obrazek wejścia 16:9 na pełną szerokość treści (184 px wys. na 360 px), 20 px pod nagłówkiem.
3. „Poziomy” (16 px), a pod nim siatka 5×2 przycisków 56 px rozłożona na całą szerokość treści, 16 px między wierszami.

## screen.land — mac-wide

Pod nagłówkiem siatka `minmax(0,1fr) 440px` z odstępem 64 px, wyśrodkowana pionowo. Po lewej obrazek 16:9 (≈ 596 px szer.), po prawej „Poziomy” i siatka 5×2 przycisków 72 px (odstęp 20 / 24 px).

## Tło i grafiki

- Tło poziomu: `object-fit: cover`, kadr od środka, grafika 2000×2000. Strefa bezpieczna 900×1250 w środku jest widoczna na wszystkich 5 targetach. Najwęższy widoczny kadr ma 900 px szerokości (`mobile-compact`, `android-standard`).
- Opis grafiki zastępczej leży w x 697–1303 i y 558–741. Na telefonach wypada między liczbami celu a polem sumy, a na `mac-wide` nad lewą kolumną, obok koła. Docelowa ilustracja powinna trzymać ważne motywy w tej samej strefie.
- Obrazek wejścia ma 16:9. W karcie w układzie poziomym widać środkowy kadr 128 px (≥ 640 z 1600 px grafiki), dlatego opis mieści się w środkowych 640 px. Na `mac-wide` i na ekranie krainy obrazek jest widoczny w całości.

## Pasek narzędzi podglądu (tylko user_preview i katalog)

Pasek jest przyklejony do dołu okna przeglądarki, poza powierzchnią. Powierzchnia skaluje się do miejsca nad paskiem (maks. 100%). Na wąskim oknie rzędy się zawijają, a pole uwag zajmuje cały wiersz. W `mode=capture` paska nie ma.

## Teksty EN

Fixture `english` zmienia wszystkie etykiety. Żaden kontener tekstu nie ma stałej szerokości ani `nowrap`, z wyjątkiem zapisu działania w płytce (maks. 5 znaków). Nagłówki, nazwy krain i komunikaty zawijają się.
