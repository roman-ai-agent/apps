# Changelog

## r6

- Rewizja bazowa: `r5` (zaakceptowana, wdrożona w BLG-13, commit 0615a4f)
- Rewizja docelowa: `r6`
- Migracje ID: brak (`id_migrations: []`); wszystkie ID r5 zachowane, żadne nie zmienia znaczenia. Kontrakt `interaction.game.drag-piece-1…3` jak w r5.
- Wejście: decyzje Q147–Q153 (poziomy), Q175 (stany po ruchu), Q176 (deszcz płatków), Q184 (napis „Ekran startowy”), Q185 (stuknij-stuknij Q154–Q160 wycofane), Q177–Q181 i Q199–Q202 (mieszczenie się w oknie), Q188, Q189, Q197 (progi, plakietka awansu, pusta grządka), Q203 (pochwała pustej grządki, dopiski punktów). Q182, Q186, Q187 — poza zakresem prototypu (niżej).
- Nowy target `iphone-se` 375×667 (Q178): 8 targetów, 34 stany, 272 pary stan × target. Pomiary bez par: 390×660, 375×548, 1280×680, 852×340, 320×449 (README, Raport kontroli).
- Obrazy: bez nowych wywołań generatora w tej rewizji. Trzy nowe tła pochodzą z obrazów wygenerowanych wcześniej na zlecenie Lidera (`tmp/r6-backgrounds`, `process image generate`, model google/gemini-3-pro-image, 0,14 USD za obraz); do paczki weszło 6 z nich (oryginały i pliki pochodzenia w `assets/generated/`, prompty skopiowane do `assets/prompts/` — pole `prompt_file` w plikach pochodzenia wskazuje ich pierwotne miejsce w `tmp/r6-backgrounds/prompts/`):
  - `bg-lily-pond-desktop-v2` → `assets/img/bg-lily-pond-desktop.webp`: wycinek `[72, 92, 1274, 768]` (1202×676, 16:9), bo wariant v2 ma przy krawędziach brzeg papieru; brak brzegu w wycinku sprawdzony wzrokowo i wykrywaniem krawędzi (`tmp/r6-build/edges.cjs`, receipty 741, 756, 758). Prompt `bg-lily-pond-v2.txt`.
  - `bg-lily-pond-phone` → `bg-lily-pond-phone.webp` (pełny kadr). Prompt `bg-lily-pond.txt`.
  - `bg-dawn-meadow-desktop` → `bg-dawn-meadow-desktop.webp` (pełny kadr). Prompt `bg-dawn-meadow.txt`.
  - `bg-dawn-meadow-phone-v2` → `bg-dawn-meadow-phone.webp` (pełny kadr). Wybór v2, nie v1: wariant v1 ma namalowaną białą ramkę (u góry do 459 px, po bokach do 256 px), której wycinek 9:16 nie usuwa bez utraty łąki; v2 jest pełnym kadrem w tym samym stylu i porze dnia. Prompt `bg-dawn-meadow-v2.txt`.
  - `bg-firefly-night-desktop`, `bg-firefly-night-phone` → `bg-firefly-night-desktop.webp`, `bg-firefly-night-phone.webp` (pełne kadry). Prompt `bg-firefly-night.txt`.
  - Kopie oryginałów i promptów do paczki (receipty 742, 743), wycinki i WebP q90 (`slice.cjs`, `cwebp` przez `process command run`, receipty 744–759; 741 i 756–758 to wykrywanie brzegu); pochodzenie każdego pliku w `assets/img/derived.json`. Obrazy ładowane przez grę: 41 plików, 1,83 MB (limit 3 MB).

### Dodane stany (6)

| Stan | Fixture | Targety | Opis |
|---|---|---|---|
| `game.level-up` | default | wszystkie | chwila awansu na poziom 3 (wynik 860): nowe tło `dawn-meadow`, etykieta „Poziom 3 · Łąka o świcie”, plakietka „Poziom 3!” na wyniku (stała w capture; w user_preview znika po 1,5 s) |
| `game.level-5` | default | wszystkie | poziom 5, tło `lily-pond`, wynik 5940; w user_preview kwadrat 2×2 w lewym górnym rogu czyści kolumnę i daje awans na poziom 6 (`garden-dusk`, 6024) z plakietką i przenikaniem |
| `game.level-6` | default | wszystkie | poziom 6, tło `firefly-night`, wynik 6480 (inna gra, inny początek kręgu) |
| `game.level-up-praise` | default | wszystkie | Q188: stan po ruchu, który czyści 2 linie i daje awans na poziom 4 (1580 → 2062, tło `hedge`): plakietka „Poziom 4!” na wyniku i „Świetnie!” nad planszą — naraz, w różnych miejscach |
| `game.empty-garden` | default | wszystkie | Q189, Q203: stan po ruchu, który opróżnia planszę (2100 → 2481, w tym premia +300 z danych stanu; poziom 4 bez awansu): rozkwit na całej planszy, pochwała „Pusta grządka! +300”, punkty ruchu z sumą (bez dopisku premii) |
| `game.combo-color` | default | wszystkie | Q203: ruch w serii czyszczący linię jednego koloru (2240 → 2551): dopiski „seria +150” i „jeden kolor +…”; gdzie się nie mieszczą (mobile-compact, niskie okno w pionie) zostaje dopisek o większej wartości |

Razem 34 stany; z nowym targetem `iphone-se` 272 pary stan × target.

### Usunięte w trakcie r6 (Q185) — ID kandydata r6, nie r5

Stuknij-stuknij (Q154–Q160) było w kandydacie r6 i zostało wycofane decyzją Q185 przed przyjęciem rewizji. Żadne z tych ID nie istniało w r5, więc nie ma migracji:

- stany `game.tap-selected`, `game.tap-preview`, `game.tap-hint`;
- `component.tap-hint`, `element.game.tap-hint`, `element.game.tap-hint.close`, `interaction.game.tap-hint-close`;
- `interaction.game.board-tap` (kontrakt stuknięcia na `element.game.board`; element zostaje, bez interakcji jak w r5);
- wariant klocka `selected`, atrybut slotu `data-selected`, znacznik pola `data-tap="target"`;
- teksty fixture `tap_hint`, `tap_hint_close`, `piece_selected_sr`; pola scenariusza `tap`, `tapHint`;
- runtime: `BG.tapHint`, `BG.centerCell`, ikona `tap`, logika `TAP_PX` / `TAP_MS` (zaznaczanie, podgląd pod stukniętym polem, anulowanie zaznaczenia).
- Q203 (też kandydat r6): `component.empty-garden`, `element.game.empty-garden` (pusta grządka jest teraz wariantem pochwały `component.praise` / `element.game.praise`, `data-variant="empty-garden"`), dopisek punktów `data-note="empty"`, teksty `move_empty`, `empty_garden`, `empty_garden_sr` (zastępuje je `praise_empty` „Pusta grządka! +{n}”).

### Dodane komponenty i ID

- `component.level-label` (Q147, Q151): `element.game.level` — środek nagłówka gry klasycznej, „Poziom n” i nazwa motywu; zwykły tekst (bez `aria-live`).
- `component.level-up-badge` (Q150, Q188): `element.game.level-up` — plakietka awansu na wyniku (nie na planszy ani trójce), `role="status"`, 1,5 s.
- `component.praise`: nowy wariant `data-variant="empty-garden"` (Q189, Q203) — „Pusta grządka! +300” / „Clear garden! +300” nad środkiem pustej planszy, z rozkwitem na całej planszy (warstwa efektów, bez ID); tekst `praise_empty`; pola scenariusza `move.emptyBonus`, `emptyGarden`, `praise`.
- `component.combo-badge`: wariant skrócony w wierszu wyniku (Q199) — ikona i „×c”, pełny tekst dla czytnika (`.bg-combo-full`, `.bg-combo-short`, `.bg-sr`).
- `component.alert`: wariant jednowierszowy `is-line` błędu zapisu (Q201), tekst `save_error_short` „Nie zapisano” / „Not saved”, pełny tekst dla czytnika.
- Runtime: `BG.fitHeight` (dopasowanie do wysokości okna), `BG.MIN_CELL` (32), `data-layout` na powierzchni (`phone`, `phone-merged`, `landscape`, `wide`).
- `element.game.over.level` (Q152): w panelu końca gry klasycznej „Poziom n · nazwa motywu”; w wyzwaniu dnia brak.
- Teksty fixture (pl / en): `level`, `level_up`, `level_up_sr`, `over_level`, `motifs` (nazwy sześciu motywów). Pole scenariusza: `levelUp`.
- Runtime: `BG.CIRCLE`, `BG.levelThreshold`, `BG.levelOf`, `BG.motifOf`, `BG.fx.levelUp`, `BG.fx.crossfade`, `BG.MOTION.levelUp` (1500), `BG.MOTION.crossfade` (800).
- Katalog: sekcje `component.level-label`, `component.level-up-badge` (z „Odtwórz”); krąg sześciu motywów w `foundation.palette`; wiersze 10 i 11 z demo „Odtwórz awans” w `foundation.motion`; poziom w okazach panelu końca; zdanie o interakcji w `component.piece`; plan stanów r6.

### Zmienione stany (bez zmiany ID)

- `game.line-clear`, `game.color-bonus`, `game.combo` (Q175): stan po ruchu — plansza po czyszczeniu (bez bladej ramki i pomniejszonych pól czyszczenia), wynik po ruchu, punkty ruchu, seria. Rozkwit tylko w katalogu (`foundation.motion`) i na żywo.
- Wszystkie stany gry klasycznej: etykieta poziomu w środku nagłówka (był pusty). Poziom wynika z wyniku stanu (Q153), motyw = tło stanu.
- `game.over-classic`, `game.over-classic.en`, `game.over-classic-new-record`, `game.over-classic-tied`: linia poziomu w panelu (panel +28 px, elementy panelu przesunięte).
- Stany wyzwania dnia: bez zmian (bez poziomów, Q147).

### Zmiana: poziomy (Q147–Q153)

- Krąg sześciu motywów w kolejności `blossom-wall`, `lily-pond`, `garden-dusk`, `dawn-meadow`, `hedge`, `firefly-night` — tła dzienne i wieczorne na przemian, żeby kolejne awanse wyraźnie zmieniały scenę (decyzja Designera o kolejności; brief jej nie ustala). Gra klasyczna zaczyna na losowym motywie kręgu; poziom n ma motyw `CIRCLE[(start + n − 1) mod 6]`.
- Progi (Q197; zastępują 300/800/1500/2500/4000/6000/co 2500 z Q188 i 2000/5000/9000/14 000/20 000/co 8000 z Q149): 300, 800, 2000, 3500, 6000, 9000, dalej co 4000. Wyniki stanów poziomów dopasowane (`game.level-up` 860, `game.level-5` 5940, `game.level-6` 6480, `game.level-up-praise` 1580 → 2062); `levels.cjs` sprawdza, że żaden stan z ruchem nie przekracza progu bez pokazania awansu (`game.combo` 4210 → 4682 zostaje na poziomie 5, wynik jak w r5). Pozostałe stany gry klasycznej mają przy nowych progach wyższe poziomy (np. `game.over-classic` 6842 — poziom 6), motyw = tło stanu. Poziom = 1 + liczba osiągniętych progów; nie jest osobno zapisywany (Q153) — wznowiona gra liczy go z wyniku, a początek kręgu jest częścią zapisu gry jak tło w r5 (interpretacja Designera: zapis gry r5 już przechowuje tło, więc start kręgu nie jest nowym stanem).
- Awans: plakietka 1,5 s na wyniku (Q188: nie zasłania planszy ani trójki; telefony — w wierszu wyniku, mac-wide — na wyniku w kolumnie trójki; wysokość jak wynik), przenikanie tła 800 ms, etykieta wyskakuje. Pochwała z tego samego ruchu stoi jak dotąd nad planszą — oba elementy naraz, w różnych miejscach (wcześniej w kandydacie r6 pochwała była w ruchu z awansem tłumiona). Wynik na mac-wide dostał opakowanie `.bg-score-wrap` jak na telefonach (miejsce plakietki; geometria bez zmian). reduced-motion: tylko przezroczystość, przenikanie 150 ms, plakietka pojawia się i znika po 150 ms.
- Ekran startowy (`blossom-wall`) i tło wyzwania dnia (data modulo 3 z trzech pierwotnych teł, R-5.4) bez zmian — interpretacja Designera: brief zmienia tylko grę klasyczną, a zmiana reguły tła wyzwania zmieniłaby tło zapisanych podejść.
- Nazwy motywów mają najwyżej 14 znaków (PL), żeby etykieta mieściła się w nagłówku mobile-compact bez zawijania i bez zmiany wysokości nagłówka.

### Interakcja klocka (Q182, Q185, Q186, Q187 — poza zakresem prototypu)

Na polecenie Tomasza Designer projektuje wygląd, a logiki gestów nie wdraża. Kod przeciągania w prototypie jest taki jak w r5 (funkcje `start`, `move`, `up`, `cancel` i kontrakt `interaction.game.drag-piece-1…3` bez zmian względem r5; sprawdzone porównaniem z eksportem r5). Katalog (`component.piece`) opisuje interakcję jednym zdaniem: „dotknięcie lub wciśnięcie w slocie podnosi klocek; tylko przeciąganie (dotyk) albo przeciąganie i niesienie (mysz)”. Moment podniesienia (Q182), chwyt całym slotem i `touch-action` (Q186), niesienie myszą (R-1.10, R-1.11) i blokadę przewijania (Q187) wdraża Wykonawca w aplikacji według decyzji Reprezentanta. Robocze wdrożenie chwytu slotem i niesienia w trakcie r6 zostało cofnięte.

### Pusta grządka (Q189, Q203)

Ruch, po którym plansza jest pusta, daje premię +300 (punktację wdraża Wykonawca; w prototypie premia jest daną stanu `move.emptyBonus`). Wygląd: rozkwit na całej planszy — płatki pięciu kolorów na polach, falą od środka (pierścień co 60 ms, płatek 600 ms) — i pochwała „Pusta grządka! +300” nad środkiem pustej planszy, 1200 ms; ma pierwszeństwo przed „Świetnie!” i „Wspaniale!” (jedna pochwała na ruch). Tekst 26 px (mac-wide 40 px), zawija się wyśrodkowany w planszy. reduced-motion: bez fali i skali, płatki i pochwała tylko przezroczystość 150 ms. W `mode=capture` stała klatka (płatki na 24 polach, pochwała). Tabliczka punktów ruchu pokazuje sumę (z premią) bez dopisku „pusta grządka”. Animacja (12) w `foundation.motion` z „Odtwórz”; wiersz 12 w tabeli „Ruch” w `responsive-spec.md`.

### Dopiski punktów ruchu (Q203)

Tabliczka punktów pokazuje sumę oraz dopiski serii i koloru, gdy się mieszczą. Gdy nie (tabliczka wychodzi poza pasek albo wiersz wyniku, wchodzi na wskaźnik serii albo wynik), zostaje jeden dopisek — ten o większej wartości (przy równych: seria). Na szerszych ekranach oba. Stan `game.combo-color`: iphone-standard i szersze — oba dopiski; mobile-compact i 375×548 — „seria +150”.

### Wysokość okna (Q177–Q181, Q199–Q202)

- Zasada r2 „ekran telefonu ma co najmniej 800 px, niższe okno przewija” usunięta. Ekran ma wysokość okna (w aplikacji `100dvh`); każdy ekran — start, gra, krok końca, panel końca, dialog, komunikaty — mieści się bez przewijania do 375×548 w pionie i 852×340 w poziomie (Q181). Mniejsze okna przewijają się, pole planszy nigdy < 32 px.
- Pion: najpierw odstępy (góra 59 → 8, dół 34 → 8, wynik 8 → 4, trójka 16 → 12 px), potem plansza i trójka proporcjonalnie do pola 32 px, potem (Q199) seria i punkty w wierszu wyniku (`phone-merged`; przy szerokości 375 px okno < 578 px). Margines boczny 12 px, gdy przy 16 px pole byłoby < 32 px (okno < 344 px).
- Poziom (Q180, Q200): plansza po lewej na całą wysokość okna, po prawej kolumna 380 px z nagłówkiem (dom, dźwięk, poziom/nazwa trybu, rekord), wynikiem, paskiem i trójką. Ekran startowy w dwóch kolumnach (Q202). Panel końca i dialog z przyciskami obok siebie i mniejszymi odstępami.
- Laptop i mac-wide: plansza od wysokości okna (1280×680: pole 59 px), nagłówek = plansza + 72 + 380 px (siatka Q112); 1440×900 bez zmian.
- Komunikat błędu zapisu (Q201): gdy jego 76 px nie mieści się w kolumnie, leży na wierszu wyniku w wariancie jednowierszowym (ikona, „Nie zapisano”, „Spróbuj ponownie”, 56 px); zasłania wynik, serię i punkty, nigdy przycisków nagłówka, planszy ani trójki.
- Ekran startowy: te same odstępy, potem zmniejsza się obrazek (do 48 px).
- Zmierzone pola planszy: `iphone-se` 38 px (odstępy zmniejszone), 390×660 39 px, 375×548 32 px (`phone-merged`), 852×393 39 px i 852×340 32 px (`landscape`), 1280×680 59 px; 320×449 32 px, ekran przewija się o 87 px (poniżej granicy). Pozostałe targety bez zmian.

### Napis „Ekran startowy” (Q184)

Przycisk `element.game.over.to-home` po polsku: „Ekran startowy” (było „Do startu”); angielski bez zmian („Home”). Mieści się w jednym wierszu, wyśrodkowany, bez przycięcia na każdym targecie i przy 375×667 (pomiar w Raporcie kontroli).

### Poprawka: deszcz płatków (Q176)

Droga spadku płatka = wysokość karty + 48 px (było stałe 520 px). Na mac-wide karta ma 325 px, więc w r5 płatki opuszczały kartę po ok. 60% sekundy; teraz w 250 / 500 / 750 ms na karcie jest 14 / 18 / 18 z 18 płatków na mac-wide i iphone-standard.

### Zmienione geometrie względem r5 (zmierzone, 196 par stanów r5)

2187 różnic. `phone-landscape` (1713): nowy układ obok siebie (Q180, Q200) — zmienione położenia wszystkich elementów ekranu gry i startowego. Pozostałe 6 targetów po 79 (474), wszystkie z tej listy: nowy `element.game.level`; nowy `element.game.over.level` i przesunięte elementy panelu końca gry klasycznej; pola planszy w `game.line-clear`, `game.color-bonus`, `game.combo` (stan po ruchu bez pomniejszenia pól czyszczenia). Na tych targetach nagłówek, przycisk wyjścia, przełącznik dźwięku, rekord, wynik, plansza, trójka, panel wyzwania dnia i ekran startowy bez zmian — dopasowanie do wysokości (Q177) ich nie zmienia, bo mieszczą się w układzie naturalnym.

## r5

- Rewizja bazowa: `r4` (zaakceptowana, wdrożona w BLG-11, commit 1fcf7ab)
- Rewizja docelowa: `r5`
- Migracje ID: brak (`id_migrations: []`); żadne istniejące ID nie zmienia znaczenia
- Wejście: decyzje Reprezentanta Q128–Q139 (koniec gry, animacje), Q143 (przełącznik dźwięku), Q162 (komunikat bez przycisku); poprawka z odbioru BLG-11 (przycięty dopisek punktów)
- Nowy obraz z generatora: `petals` (1 wywołanie, 0,14 USD) → 5 płatków `assets/img/petal-<kolor>.webp`

### Dodane stany (5)

| Stan | Fixture | Opis |
|---|---|---|
| `home.sound-muted` | default | ekran startowy z wyciszonym dźwiękiem (Q143) |
| `game.no-moves-classic` | default | krok końca gry klasycznej: przygaszona plansza, oznaczona trójka, „Nie ma już miejsca na żaden klocek” (Q128, Q129) |
| `game.no-moves-classic.en` | english | jw. po angielsku („No room for any piece”) |
| `game.no-moves-daily` | default | krok końca wyzwania dnia (jeden slot pusty) |
| `game.over-classic-tied` | default | panel końca z „Rekord wyrównany” (wynik = rekord, Q130) |

W `user_preview` stany `game.no-moves-*` po 1,5 s (albo po stuknięciu, kliknięciu, Esc) przechodzą w panel końca; w `mode=capture` zostają na kroku.

### Dodane komponenty i ID

- `component.sound-toggle` (Q143): `element.home.sound` + `interaction.home.sound-toggle`, `element.game.sound` + `interaction.game.sound-toggle`; trwały przełącznik `aria-pressed`, nazwa „Dźwięk” / „Sound”, warianty `on`, `muted`.
- `component.no-moves-step` (Q128, Q131): `element.game.no-moves` + `interaction.game.no-moves-skip` (tap / klik / Escape → panel końca od razu, bez uruchomienia przycisku panelu), `element.game.no-moves.message`.
- `component.praise` (Q139): `element.game.praise` — chwilowa pochwała „Świetnie!” (2 linie) / „Wspaniale!” (3+), tylko na żywo, nie występuje w stanach capture.
- `component.game-over-panel`: nowe elementy `element.game.over.reason` (powód końca, zawsze) i `element.game.over.record-gap` (`data-variant` `gap` — „Do rekordu zabrakło N” — albo `tied` — „Rekord wyrównany”; brak przy nowym rekordzie i po podejściu innego dnia, R-3.6). Nowy parametr szablonu `recordBefore`.
- `component.piece`: nowy wariant `no-fit` (Q129) — tylko w chwili końca gry; slot ze znakiem przekreślonego koła i kreskowaniem. Nazwa dostępna klocka z dopiskiem „ — nie mieści się”.
- Teksty fixture (pl / en): `no_moves`, `no_fit_sr`, `over_reason`, `record_gap`, `record_tied`, `sound`, `praise_2`, `praise_3`. Fixture: `noMoves` w scenariuszu (krok końca), `sound: false` (wyciszony).
- Katalog: sekcje `component.sound-toggle`, `component.no-moves-step`, `foundation.motion` (animacje z przyciskami „Odtwórz”); wariant `no-fit` w `component.piece`; nowe warianty panelu końca.

### Zmienione stany (bez zmiany ID)

- `game.over-classic`, `game.over-classic.en`, `game.over-classic-new-record`, `game.over-daily`, `game.over-daily.en`, `game.over-daily-new-day`: panel ma linię powodu „Brak ruchów — żaden klocek się nie mieści”; gdy wynik < rekord sprzed gry — „Do rekordu zabrakło …” (over-classic: 11 578, over-daily: 840, EN „11,578 short of your best”); pod panelem plansza przygaszona, klocki trójki oznaczone `no-fit`. Panel jest wyższy (mac-wide +59 px, telefony do +80 px), elementy panelu przesunięte.
- Wszystkie stany gry: przełącznik dźwięku w nagłówku obok przycisku wyjścia. Wszystkie stany startowe: przełącznik w prawym górnym rogu.

### Zmiana: animacje (Q135–Q139)

Dziewięć animacji i pochwała, opis, czasy i krzywe w `responsive-spec.md`, sekcja „Ruch”. Stan po ruchu jest od razu końcowy, a efekty grają na warstwie nad planszą, więc gra nie jest blokowana (r4: przez 340 ms czyszczenia nowe chwycenie nie startowało). Punkty ruchu zostają do następnego położenia (r4: znikały po 1,4 s). reduced-motion: tylko przezroczystość ≤ 150 ms (krok końca nadal 1,5 s). `mode=capture`: bez animacji.

### Poprawki po przeglądzie Reprezentanta

- Tytuł panelu końca w grze klasycznej: „Koniec gry” / „Game over” bez „· Gra klasyczna” / „· Classic” (Q107: tryb domyślny nie ma nazwy). Dotyczy `game.over-classic`, `game.over-classic.en`, `game.over-classic-new-record`, `game.over-classic-tied` i panelu po grze klasycznej na żywo. W wyzwaniu dnia bez zmian: „Koniec gry · Wyzwanie dnia”. Zmiana tekstu, bez zmiany ID; nieużywany tekst `mode_classic` usunięty z fixture (nie ma go już w żadnym widoku).
- Przełącznik dźwięku na ekranie startowym na telefonach: prawa krawędź na prawej krawędzi treści (przycisków menu), było 4 px dalej w prawo (12 zamiast 16 px od krawędzi kolumny). Tabliczka znaku na telefonach wystaje 6 px w bok (było 10), żeby nie sięgała pod przełącznik. Na mac-wide oś już się zgadzała (x 1228 = prawa krawędź rekordu i trójki ekranu gry).

### Poprawki

- Q162: `component.alert` bez przycisku (`read-error`) — tekst wyśrodkowany w całym komunikacie, ikona przy lewej krawędzi. Na mobile-compact tekst zawija się w 2 wiersze, komunikat ma 59 px (był 40), kolumna menu rośnie w górę.
- Telefony: dopisek punktów ruchu („seria +150” w `game.combo`) był przycięty ramą planszy — punkty ruchu w jednym wierszu (suma, dopiski), zawartość paska wyśrodkowana w górnych 36 px paska 44 px. Zmienione geometrie: `element.game.combo` 4 px wyżej, `element.game.move-points` (telefony, stany z punktami).
- Katalog: okazy trójki na wąskim katalogu (mobile-compact) wychodziły poza ramkę okazu (było już w r4) — teraz w rozmiarze, który się mieści.

### Zmienione geometrie względem r4 (zmierzone, 161 par stanów r4)

Nowe elementy: `element.game.sound` (18 stanów gry × 7), `element.home.sound` (5 × 7), `element.game.over.reason` (6 × 7), `element.game.over.record-gap` (4 × 7). Przesunięte: elementy panelu końca (`element.game.over*`) w stanach końca; `element.game.combo` i `element.game.move-points` na telefonach; `element.home.read-error` na mobile-compact (Q162); `element.home.wordmark` w `home.first-run.en` na mobile-compact (hasło w 2 wierszach, żeby znak nie sięgał pod przełącznik dźwięku). Plansza, trójka, wynik, rekord, przycisk wyjścia i menu bez zmian.

## r4

- Rewizja bazowa: `r3` (zaakceptowana i opublikowana, commit 7166ef6)
- Rewizja docelowa: `r4` (Q114)
- Migracje ID: brak (`id_migrations: []`); stany, komponenty, elementy i interakcje bez zmian
- Wejście: uwagi Tomasza do r3 i decyzje Reprezentanta Q111–Q115
- Nowe obrazy: brak (r4 używa obrazów r3)

### Zmiana: tekst wyśrodkowany w poziomie (Q111)

Wszystkie teksty są wyśrodkowane w poziomie, także wielowierszowe:
- przyciski menu (`component.menu-button`): ikona przy lewej krawędzi, blok tekstu (etykieta i wiersz informacji) wyśrodkowany w całym przycisku; prawy margines bloku równy ikonie z odstępem (46 px po Q115), więc tekst nie nachodzi na ikonę; długie wiersze zawijają się w wyrównane wiersze (`text-wrap: balance`);
- karty dialogu i panelu końca (tytuł, treść, „Wynik nie trafi do rekordu”), ramka informacji wyzwania („Ten sam ciąg klocków obowiązuje do północy.”, wyśrodkowana względem całej ramki mimo ikony po lewej), komunikaty `component.alert`;
- tabliczka rekordu (etykieta i liczba wyśrodkowane w tabliczce), punkty ruchu (suma i dopiski).

### Zmiana: wspólna siatka mac-wide (Q112) i większe elementy nagłówka (Q113)

Tylko mac-wide; telefony bez zmian (siatka nie dotyczy `tablet-narrow` ani `phone-landscape`, bo mają układ telefonu z trójką pod planszą):
- nagłówek ma szerokość 1016 px (plansza 564 + odstęp 72 + kolumna trójki 380): przycisk domu na lewej krawędzi planszy, rekord na prawej krawędzi kolumny trójki, środki na jednej linii;
- przycisk domu 56×56 px (był 44×44) z proporcjonalnie większą ikoną; rekord: etykieta 14 px (była 12), liczba 22 px (była 17);
- wynik, seria i punkty ruchu jeden pod drugim na osi środkowego slotu trójki; pasek serii i punktów ma układ kolumnowy i stałą wysokość 96 px (był 52 px, seria po lewej, punkty po prawej).

Zmienione geometrie względem r3 (mac-wide, wszystkie stany gry): `element.game.exit` 200,34 44×44 → 212,32 56×56; `element.game.record` prawa krawędź 1240 → 1228, wysokość 32,8 → 40,1; `element.game.board` i pola 192 → 196 px od góry (nagłówek wyższy o 8 px); `element.game.score` 330,5 → 312,5; `element.game.combo` x 848 → 982 i y 439,5 → 411,5; `element.game.move-points` x 1144,6 → 996,3 i y 436,5 → 449,5; `element.game.tray` 501,5 → 527,5; klocki w trójce przesunięte razem z trójką; w `game.save-error` komunikat 595,5 → 621,5. W wyzwaniu dnia `element.game.mode` przesunięty razem z nagłówkiem.

### Zmiana: sloty trójki bez szwów (wada z r3)

Przyczyna: slot w r3 był 9-slice (`border-image` z `slot.webp`, slice 40 → szerokość 20 px) na ułamkowych szerokościach i pozycjach slotów (np. 112,33 px na iphone-standard, 118,67 px na mac-wide). Przy skalowaniu wycinków na granicach powstawały szwy, a każdy slot leżał na innym ułamku piksela, więc dostawał inne kreski i inną ramkę (także przy DPR > 1). Naprawa:
- slot to jeden obraz rozciągnięty na cały slot (bez 9-slice);
- sloty mają całkowitą, równą szerokość i stoją na całkowitych pozycjach (iphone 111 px / odstęp 14, mobile-compact 100 / 14, android i mac-wide 118 / 13, mobile-large, tablet-narrow i phone-landscape 128 / 12); pole klocka w trójce i wysokość slotu bez zmian.
Zmienione geometrie: klocki w skrajnych slotach trójki przesunięte o ≤ 0,7 px w poziomie (iphone-standard, mobile-compact; na pozostałych targetach ≤ 0,5 px).

Przy przeglądzie innych elementów 9-slice: ramy z fakturą (rama planszy, karty) w r3 miały `border-image-repeat: round`, który zostawiał widoczne złącza powtórzeń na środku boków (te same drobne kreski) — w r4 `stretch`. Pigułki przycisków i plakietka serii (`stretch`) bez szwów na wycinkach DPR 3.

### Zmiana: wysokości po wyśrodkowaniu tekstu (Q111)

Ramka informacji wyzwania w panelu końca ma symetryczne marginesy (ikona po lewej, tekst wyśrodkowany względem całej ramki), więc na android-standard, mobile-large, tablet-narrow i phone-landscape tekst zawija się na 2 wiersze i panel końca wyzwania (`game.over-daily`, `.en`, `-new-day`) jest wyższy o ok. 18 px; zmienione geometrie `element.game.over` i jego elementów (przesunięcie ≤ 10 px w pionie, ramka informacji pełnej szerokości karty).

### Zmiana: wiersz informacji przycisków menu (Q115)

- „Wyzwanie dnia” ma wiersz informacji tylko z rekordem dnia: pl „Rekord dnia 2980” (było „10 listopada · rekord dnia 2980”), en „Today's best 2,980” (było „November 10 · today's best 2,980”) — `meta_daily` w fixture bez `{date}`. Data zostaje na wstędze w grze (data rozpoczęcia podejścia, R-3.6, Q108).
- Wiersze informacji wszystkich trzech przycisków („Rekord 18 420”, „Rekord dnia 2980”, „Zapisana gra · wynik 2340”) mają 15 px (było 14 px z przezroczystością 0,88) i pełne krycie.
- Odstęp ikona–tekst 10 px (był 14), prawy margines bloku tekstu 46 px, żeby „Zapisana gra · wynik 2340” mieścił się w jednym wierszu na mobile-compact; między „gra” a „·” twarda spacja (pl i en), więc ewentualne zawinięcie nie zaczyna wiersza od kropki.
- Zmienione geometrie: każdy przycisk menu ma 70,6 px wysokości (r3: 69,3) na wszystkich 7 targetach; kolumna menu rośnie w górę o ok. 1,3 px na przycisk (`element.home.continue`, `element.home.new-game`, `element.home.daily`, `element.home.read-error`, 12 różnic na target). Na mobile-compact żaden wiersz informacji się nie zawija (wcześniejsza wersja r4 przed Q115 miała tam 3 wiersze w „Wyzwanie dnia”).

## r3

- Rewizja bazowa: `r2` (zatwierdzona, commit a6ec2ba)
- Rewizja docelowa: `r3`
- Migracje ID: brak (`id_migrations: []`); publiczne ID ekranów, stanów, komponentów, elementów i interakcji bez zmian
- Wejście: decyzje Reprezentanta Q96–Q106 (zakres tylko wygląd; kierunek rastrowy z generatora; kwiaty zamiast symboli; tła sceny; WebP; prompty w repo)

### Zmiana: wygląd

- Pola zajęte: błyszczące kafle z kwiatami (Q103) zamiast koloru z symbolem SVG; mapowanie kluczy (bez zmian w kodzie i DOM): `poppy` → mak, `sun` → słonecznik, `leaf` → koniczyna, `drop` → chaber, `berry` → kwiat wiśni. W trójce (pole 15–20 px) uproszczone kafle małego rozmiaru (Q102 warunek 1).
- Pole puste: wgłębienie w ziemi z obrazu, przyciemnione do 62%; ziemia między polami `#5E321B`.
- Plansza: drewniana skrzynia z obrazu (border-image wysunięty 8 / 10 px poza planszę, bez wpływu na układ).
- Podgląd położenia, linia do wyczyszczenia i linia ×2: te same znaki poza kolorem co w r2 (biała obwódka; zasłona z obwódką ciągłą; paski z obwódką przerywaną i plakietką), obwódki linii podwójne (jasna + ciemna), żeby były widoczne na każdym kaflu. Plakietka „×2” to złota moneta.
- Przyciski (`component.menu-button`, `component.button` primary / secondary / danger), przycisk wyjścia, sloty trójki, karta dialogu i panelu końca, plakietka serii: obrazy z jednego zestawu UI. Tekst przycisku głównego ciemnozielony `#123F14` zamiast białego.
- Tło sceny (Q98, Q104): trzy ilustracje (`blossom-wall`, `garden-dusk`, `hedge`) w kadrach 9:16 i 16:9 zamiast gradientu nieba i pasa ogrodu. Ekran startowy: `blossom-wall`; gra klasyczna: losowane przy nowej grze (w prototypie wynik losowania w scenariuszu stanu, pole `background` w fixture); wyzwanie dnia: z daty ciągu (`daily_date_iso` w fixture; numer dnia od 1970-01-01 modulo 3). Tła stanów: README.md.
- Tekst na tle sceny (rekord, wynik, punkty ruchu, znak z hasłem) na kremowej tabliczce (pseudo-element, bez wpływu na układ).
- Ekran startowy: ilustracja skrzyni z kwiatami (`assets/img/home-hero.webp`) zamiast `home-hero.svg`; znak w kolorach kafli r3.
- Ładowanie (Q105, Q110): wszystkie obrazy ładowane przez grę (30 plików WebP, plus znak SVG; rozmiar w Raporcie kontroli; limit 3 MB dotyczy tych plików, nie oryginałów PNG w `assets/generated/`) wczytywane przed gotowością renderu (`BG.preload`), potem bez sieci.

### Zmiana: teksty nazw kolorów (Q109)

Nazwy kolorów w fixture (`strings.colors`, używane w nazwie dostępnej klocka „Klocek: n pól, <kolor>” i w katalogu) to nazwy kwiatów (Q103, Q109): pl `słońce`, `liść`, `kropla`, `jagoda` → `słonecznik`, `koniczyna`, `chaber`, `kwiat wiśni` (`mak` bez zmian); en `sun`, `leaf`, `drop`, `berry` → `sunflower`, `clover`, `cornflower`, `cherry blossom`. Nazwa dostępna opisuje to, co widać na polu.

### Zmiana: nagłówek gry klasycznej bez nazwy trybu (Q107) — świadomy wyjątek

Gra klasyczna jest trybem domyślnym, więc jej nagłówek nie ma nazwy trybu: `element.game.mode` nie jest renderowany w stanach gry klasycznej (`game.classic-start`, `game.classic-start.en`, `game.classic-resumed`, `game.dragging-fits`, `game.dragging-line-preview`, `game.line-clear`, `game.color-bonus`, `game.combo`, `game.save-error`, `game.crash`, `game.over-classic`, `game.over-classic.en`, `game.over-classic-new-record`). Nagłówek ma przycisk wyjścia po lewej i rekord klasyczny po prawej (R-3.4); środek jest pusty. `component.mode-label` traci wariant `classic` i zostaje tylko z wariantem `daily`. To wyjątek od „bez zmiany stanów i ID”: usunięcie wariantu i jego instancji w trybie klasycznym, nie migracja ID (`id_migrations: []`); w wyzwaniu dnia `element.game.mode` bez zmian. Pozostałe elementy nagłówka zostają na tych samych miejscach (zmierzone).

### Zmiana: oprawa wyzwania dnia (Q108)

Wariant `daily` istniejących komponentów, bez nowych stanów i bez zmiany układu:
- `component.mode-label` `daily`: „Wyzwanie dnia” i data rozpoczęcia na śliwkowej wstędze ze złotymi lamówkami (`assets/img/daily-ribbon.webp`), tekst kremowy, data złota;
- `component.board` w wyzwaniu: złota listwa na ramie i złote słońca w narożnikach (`assets/img/daily-sun-cap.webp`), tylko na ramie, z dala od pól; podgląd, linie do wyczyszczenia i plakietka „×2” bez zmian i rozróżnialne (pomiar w Raporcie kontroli);
- `component.dialog` (tylko w wyzwaniu) i `component.game-over-panel` `daily`: karta ze złotą listwą i słońcami (`assets/img/daily-card.webp`), treść bez zmian.
Tryb wyzwania jest oznaczony na powierzchni atrybutem `data-game-mode="daily"` (atrybut prototypu, nie publiczne ID).

### Zmiana techniczna po przeglądzie

- Rama planszy i ramy kart powtarzają boki obrazu (`border-image-repeat: round`) zamiast rozciągać fakturę drewna; gładkie pigułki zostają rozciągane. (Cofnięte w r4: złącza powtórzeń były widoczne.)
- Etykieta „Wynik” na mac-wide była zakryta tabliczką cyfr (tabliczka leżała nad etykietą); teraz tabliczka leży pod etykietą i cyframi, kontrast etykiety ≥ 4,5:1 na wszystkich targetach (Raport kontroli).

### Obrazy z generatora (Q862, Q106)

Model `google/gemini-3-pro-image` przez `process image generate`; prompt w `assets/prompts/`, pochodzenie (model, prompt, wzorce, proporcja, koszt) w `assets/generated/<obraz>.json`, oryginał PNG w `assets/generated/<obraz>.png`:

| Obraz | Prompt | Wzorce | Proporcja | Koszt USD |
|---|---|---|---|---|
| `tiles` | `tiles.txt` | — | 16:9 | 0,1388 |
| `ui-kit` | `ui-kit.txt` | `tiles.png` | 16:9 | 0,1401 |
| `bg-blossom-wall-desktop`, `-phone` | `bg-blossom-wall.txt` | `tiles.png`, `ui-kit.png` | 16:9, 9:16 | 0,1404 + 0,1406 |
| `bg-garden-dusk-desktop`, `-phone` | `bg-garden-dusk.txt` | `tiles.png`, `ui-kit.png` | 16:9, 9:16 | 0,1407 + 0,1413 |
| `bg-hedge-desktop`, `-phone` | `bg-hedge.txt` | `tiles.png`, `ui-kit.png` | 16:9, 9:16 | 0,1408 + 0,1404 |
| `home-hero` | `home-hero.txt` | `tiles.png`, `ui-kit.png` | 16:9 | 0,1408 |
| `tiles-small` | `tiles-small.txt` | `tiles.png` | 21:9 | 0,1395 |
| `daily-ribbon` | `daily-ribbon.txt` | `ui-kit.png` | 21:9 | 0,1394 |
| `daily-card` | `daily-card.txt` | `ui-kit.png` | 4:3 | 0,1389 |
| `daily-sun-cap` | `daily-sun-cap.txt` | `ui-kit.png` | 1:1 | 0,1390 |
| `daily-board-frame` (nieużyty) | `daily-board-frame.txt` | `ui-kit.png` | 1:1 | 0,1395 |

Razem 14 wywołań, 1,96 USD. `daily-board-frame` (cała rama ze złotymi słońcami) nie nadawał się na border-image — słońca wystawały poza ramę na pola — więc akcent ramy powstał z osobnego słońca `daily-sun-cap` i listwy CSS; obraz i jego pochodzenie zostają jako ślad wywołania. Prompty klocków, zestawu UI i teł wychodzą z wzorców zaakceptowanych przez Tomasza (`tmp/image-gen/prompts/03`–`07`); w promptach teł dopisany zakaz rysowania kafli i kwadratowych ikon (wersje telefonowe wzorca miały dorysowane kwiaty-klocki). Pliki WebP ładowane przez prototyp (`assets/img/*.webp`) to wycinki tych obrazów; wycinek, usunięcie białego tła, filtr (tylko kafel koniczyny: przesunięcie odcienia do szmaragdu, Q99) i kodowanie opisuje `assets/img/derived.json`.

### Usunięte zasoby

`assets/symbol-poppy|sun|leaf|drop|berry.svg`, `assets/garden-border.svg`, `assets/home-hero.svg` (zastąpione obrazami r3). Nie były publicznymi ID.

### Bez zmian

Zachowanie, stany (23), targety (7), komponenty (15), publiczne ID (poza nierenderowanym `element.game.mode` w grze klasycznej, Q107), interakcje i ich kontrakty, układ: położenia i rozmiary pozostałych elementów z `data-element-id` w 161 parach stan × target jak w r2 (pomiar w Raporcie kontroli).

## r2

- Rewizja bazowa: `r1` (zatwierdzona, commit 1aae26a)
- Rewizja docelowa: `r2`
- Migracje ID: brak (`id_migrations: []`)
- Wejście: decyzja Reprezentanta Q65, wariant A

### Zmiana

Reguła układu dla szerokości okna spoza targetów (`responsive-spec.md`, sekcja „Reguła układu”; działa w prototypie):
- okno < 1024 px — układ telefonu w kolumnie do 440 px, wyśrodkowanej, tło ogrodu na całą szerokość;
- okno ≥ 1024 px — układ mac-wide (wcześniej próg 1000 px, bez wpływu na targety r1);
- niskie okno (telefon w poziomie) — układ telefonu z przewijaniem strony; ekran telefonu ma co najmniej 800 px wysokości.

Technicznie: ekran leży w przewijanym obszarze na całą powierzchnię; nakładki zostają na powierzchni; przeciągany klocek leży na ekranie i przewija się z planszą; karta na zasłonie przewija się, gdy jest wyższa niż okno.

### Dodane

Targety: `tablet-narrow` 820×1180 (okno < 1024 px, wysokie), `phone-landscape` 852×393 (telefon w poziomie, przewijanie). Wszystkie 23 stany działają na nowych targetach.

### Bez zmian

Stany, komponenty, teksty, fixture i publiczne ID z r1. Układ na 5 targetach r1 jest identyczny (zmierzone położenia planszy, trójki, komunikatu zapisu i menu takie same jak w r1).

## r1

- Rewizja bazowa: `r1-katalog` (zaakceptowana przez Reprezentanta, commit 497956f, Q57–Q61)
- Rewizja docelowa: `r1`
- Migracje ID: brak (`id_migrations: []`); żadne publiczne ID z `r1-katalog` nie zmieniło nazwy ani znaczenia
- Wejście: decyzje Q57–Q61, polecenie Lidera po akceptacji, wymagania R-2.5 (Q54), R-4.5, R-4.6, R-5.3

### Zmiany po akceptacji katalogu

1. Q59: plakietka „×2” nie zasłania żadnego pola. Rząd: od prawej ramki na wysokości rzędu; kolumna: nad górną ramką nad kolumną. 22×18 px, bez ikony gwiazdki; tekst „×2” oraz paski i przerywana obwódka pól linii pozostają rozróżnieniem nie tylko kolorem.
2. Klucze kolorów (decyzja Lidera): `poppy`, `sun`, `leaf`, `drop`, `berry`, w tej kolejności, w regułach (`BGRules.COLORS`), fixture i wartościach `data-color`. `petal` → `poppy`; plik `assets/symbol-petal.svg` → `assets/symbol-poppy.svg` (ta sama grafika). To nie są ID elementów, więc bez migracji.
3. Sloty trójki mają prawie nieprzezroczyste tło (90%; puste 60%), więc łodygi pasa ogrodu nie prześwitują przez klocki.
4. Panel końca gry: przyciski na pełną szerokość karty (zgodnie z katalogiem); w okazach katalogu nagłówki nie przejmują stylu katalogu.
5. Formatowanie liczb według R-2.5 (Q54): równoważne `Intl.NumberFormat` — pl od 10 000, en od 1 000.
6. R-3.6 (Q44), po pierwszym odbiorze r1: `game.over-daily-new-day` i szablon `component.game-over-panel` przy `dailyInfo=new-available` nie pokazują wiersza rekordu (`element.game.over.record`) ani „Nowy rekord!” (`element.game.over.new-record`). Panel ma wynik, „Nowe wyzwanie dnia jest już dostępne”, „Zagraj ponownie” i „Do startu”. Nagłówek gry zostaje: „Rekord dnia 2980” to rekord daty rozpoczęcia podejścia. Fixture: `over.record` `null`, `over.newRecord` `false`.
7. Nagłówek ekranu gry pod panelem końca (uwagi Reprezentanta 4a, 4b): w `game.over-daily-new-day` nagłówek nie ma rekordu dnia (`element.game.record` nie występuje; tytuł „Wyzwanie dnia · 10 listopada” zostaje, R-3.6). Przy nowym rekordzie nagłówek pokazuje ten sam nowy rekord co panel (R-4.1, R-3.4): `game.over-classic-new-record` „Rekord 21 360”. Reguła działa w obu trybach i w grze na żywo; `game.over-daily` nie ma nowego rekordu, więc bez zmian.
8. Karta dialogu i panelu końca na `mac-wide` ma do 460 px, a etykiety przycisków się nie łamią („Zagraj ponownie” w jednym wierszu).

### Dodane ID

Komponent: `component.alert` (warianty `save-error`, `read-error`, `crash`; R-4.5, R-4.6, R-5.3). Nowy fragment katalogu do akceptacji razem z r1.

Ekran: `screen.home`

Stany (22 nowe, razem 23): `home.first-run`, `home.first-run.en`, `home.with-records`, `home.resume-available`, `home.read-error`, `game.classic-start.en`, `game.classic-resumed`, `game.daily-start`, `game.dragging-fits`, `game.dragging-line-preview`, `game.line-clear`, `game.color-bonus`, `game.combo`, `game.daily-exit-confirm`, `game.save-error`, `game.crash`, `game.over-classic`, `game.over-classic.en`, `game.over-classic-new-record`, `game.over-daily`, `game.over-daily.en`, `game.over-daily-new-day`

Elementy (`screen.home`): `element.home.wordmark`, `element.home.read-error`, `element.home.continue`, `element.home.new-game`, `element.home.daily`

Elementy (`screen.game`): `element.game.save-error`, `element.game.save-error.retry`, `element.app.crash`, `element.app.crash.restart`, `element.game.confirm`, `element.game.confirm.keep`, `element.game.confirm.end`, `element.game.over`, `element.game.over.score`, `element.game.over.record`, `element.game.over.new-record`, `element.game.over.daily-info`, `element.game.over.play-again`, `element.game.over.to-home`

Interakcje: `interaction.home.continue`, `interaction.home.new-game`, `interaction.home.daily`, `interaction.game.save-retry`, `interaction.app.crash-restart`, `interaction.game.confirm.keep`, `interaction.game.confirm.end`, `interaction.game.over.play-again`, `interaction.game.over.to-home`

Fixture: `default` i `english` mają rejestr `scenarios` (klucz = `state_id` bez `.en`); `records` z poziomu fixture przeniesione do scenariuszy i `catalog.records`.

Grafika: `assets/home-hero.svg` (ilustracja ekranu startowego).

### Zmienione

- `game.classic-start`: bez zmian układu; dane z `scenarios["game.classic-start"]`.

### Usunięte

- Brak publicznych ID. Usunięty plik `assets/symbol-petal.svg` (zastąpiony `symbol-poppy.svg`).

## r1-katalog

- Rewizja bazowa: brak (greenfield)
- Rewizja docelowa: `r1-katalog`
- Migracje ID: brak (`id_migrations: []`)
- Wejście: BLOOMGRID-DESIGNER-BRIEF-001, decyzje Q19–Q32, wymagania R-1–R-5 (w tym R-1.8, R-1.9, R-2.6, R-2.7, R-3.5, R-3.6, R-4.4).

### Dodane ID

Komponenty (14): `component.board`, `component.board-cell`, `component.piece`, `component.piece-tray`, `component.score-display`, `component.combo-badge`, `component.move-points`, `component.mode-label`, `component.icon-button`, `component.menu-button`, `component.button`, `component.wordmark`, `component.dialog`, `component.game-over-panel`

Ekran i stan: `screen.game`, `game.classic-start`

Elementy (`screen.game`): `element.game.exit`, `element.game.mode`, `element.game.record`, `element.game.score`, `element.game.combo` (tylko przy serii ≥ 2), `element.game.move-points` (tylko po ruchu z czyszczeniem), `element.game.board`, `element.game.board.cell-r1-c1`…`element.game.board.cell-r8-c8`, `element.game.tray`, `element.game.piece-1`…`element.game.piece-3`

Interakcje: `interaction.game.exit`, `interaction.game.drag-piece-1`…`interaction.game.drag-piece-3`

Zarezerwowane w katalogu dla ekranów r1 (jeszcze bez stanu): `element.game.confirm.keep`, `element.game.confirm.end`, `interaction.game.confirm.keep`, `interaction.game.confirm.end`, `element.game.over.play-again`, `element.game.over.to-home`, `interaction.game.over.play-again`, `interaction.game.over.to-home`

Fixture: `default` (pl), `english` (en)

Targety: `mac-wide`, `iphone-standard`, `android-standard`, `mobile-compact`, `mobile-large`

Narzędzia prototypu (poza powierzchnią): `data-prototype-tool="preview-toolbar"`, `"preview-toast"`, `"catalog-fixture"`, `"catalog-demo-reset"`

### Zmiany względem hipotezy stanów z briefu

- Usunięty `game.dragging-blocked` (Q24: nad miejscem bez zmieszczenia nic nie jest podświetlone).
- Planowane dodatkowo: `game.classic-resumed`, `game.daily-start`, `game.dragging-line-preview`, `game.daily-exit-confirm`, `game.over-classic-new-record`, `game.over-daily-new-day`. Pełny plan: `catalog.html#states-plan`.
