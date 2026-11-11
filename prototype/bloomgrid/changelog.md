# Changelog

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

- Rama planszy i ramy kart powtarzają boki obrazu (`border-image-repeat: round`) zamiast rozciągać fakturę drewna; gładkie pigułki zostają rozciągane.
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
