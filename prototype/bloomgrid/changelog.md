# Changelog

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
