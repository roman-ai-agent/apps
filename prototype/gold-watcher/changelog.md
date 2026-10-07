# Changelog — Gold Watcher

## r2.12 — 2026-10-01

- **revision_id:** r2.12
- **Baza:** r2.11.
- **Zakres:** wyłącznie kształt znacznika publikacji na wykresie g/m² i w jego legendzie. Zmianę zlecił bezpośrednio użytkownik. Dotyczy wszystkich targetów, wszystkich stanów i katalogu.

### Znacznik publikacji
- Romb zastąpiłem kółkiem o tej samej budowie co marker sygnału na wykresie złota:
  - 11×11 px łącznie z obwódką;
  - obwódka 2 px w kolorze serii #14b8a6;
  - białe halo 2 px.
- Środek kółka jest ciemny turkusowy (#0f4c45). Odróżnia to publikację od sygnału, który ma pomarańczową obwódkę.
- Legenda „publikacja” ma identyczne kółko. Atrybuty `data-part` się nie zmieniły: `pp-publication-marker` i `pp-publication-legend`.

### Bez zmian
- Dane, fixture'y, stany, targety, scenariusze capture, tooltipy i wykres ceny złota.
- Publiczne ID. Nie było migracji ID: `id_migrations: []`.

---

## r2.11 — 2026-10-01

- **revision_id:** r2.11
- **Baza:** r2.10.
- **Zakres:** brief 012 i odpowiedzi Lidera: znaczenie serii g/m² i znaczniki. Dodatkowo podgląd dopasowuje się do okna i otwiera się z pliku.

### Wykres g/m² (`element.purchasing-power-chart`), wszystkie targety i stany
- Linia ciągła oznacza wynik liczony z interpolowanej ceny mieszkania między publikacjami.
- Linia przerywana oznacza odcinek od ostatniej publikacji do dziś, liczony z ostatniej znanej ceny mieszkania (`carried_forward`).
- Legenda ma dokładnie 3 pozycje, w tej kolejności:
  1. `interpolacja ceny mieszkania`;
  2. `ostatnia znana cena mieszkania`;
  3. `publikacja`.
- Z legendy i z wykresu usunąłem oznaczenie „brak danych” (kreskowany pas i opis).
- **Tooltip g/m²:** dopiski `· interpolacja ceny mieszkania`, `· publikacja` i `· ostatnia znana cena mieszkania`.
- Stany `gold-overview.empty-range` i `gold-overview.empty-range-housing-details-expanded` są bez zmian. Ich panel i ID zostają.

### Znaczniki
- **Romb publikacji, na wykresie i w legendzie:**
  - kwadrat **11×11 CSS px przed obrotem o 45°**, czyli obrys około 15,6 px;
  - ciemny turkusowy środek #0f4c45 i biała obwódka 1,5 px.
- **Koło sygnału:** widoczny rozmiar **11 px** na wykresie i w legendzie. W r2.10 w legendzie miało 10 px.

### Fixture
- Ceny mieszkań PL, FI i FR rozszerzyłem wstecz do kwartału kończącego się 2011-06-30, czyli pokrywają cały zakres złota od 2011-09-28.
  - Dodane kwartały: PL 7, FI 19, FR 27.
  - Wartości są syntetyczne i ekstrapolowane wstecz ze średniego tempa zmian pierwszych 8 kwartałów.
- Zakres „Pełna” jest ciągły i ma wspólną oś czasu z wykresem ceny złota.
- Pozostałe dane bez zmian.

### Podgląd (`user_preview`)
- Powierzchnia targetu skaluje się do wielkości okna (maksymalnie 1:1), więc cały ekran jest widoczny bez przewijania. `mode=capture` zawsze renderuje 1:1.
- `index.html` zawiera kopię `prototype-manifest.json` i `assets/fixtures.json` utworzoną przy eksporcie. Prototyp otwiera się więc także po kliknięciu pliku (`file://`).
  - Przez HTTP nadal wczytuje pliki z paczki, które pozostają źródłem danych.
  - Kopia jest z nimi identyczna, a ich sumy są w `checksums.sha256`.

### Bez zmian
- Wykres ceny złota, markery sygnału na wykresie, punkty hovera i tooltipy ceny.
- Stany, targety i scenariusze capture.
- Publiczne ID. Nie było migracji ID: `id_migrations: []`.

---

## r2.10 — 2026-10-01

- **revision_id:** r2.10
- **Baza:** r2.9.
- **Zakres:** ujednolicenie znaczników na obu wykresach i w legendach. Dotyczy wszystkich targetów, wszystkich stanów i katalogu.

### Zasada rozmiaru
- Koło sygnału i romb publikacji mają ten sam widoczny obrys, bez białego halo:
  - na wykresie: **11 px**;
  - w legendzie: **10 px**, czyli o 1 px mniej.
- Obrys rombu to jego przekątna, czyli obrys po obrocie o 45°.

### Romb publikacji (wykres g/m²)
- **Na wykresie** (`pp-publication-marker`):
  - kwadrat 7,78 px obrócony o 45°, czyli obrys 11 px (w r2.9: 11 px przed obrotem, około 15,6 px obrysu);
  - **ciemny turkusowy środek #0f4c45** i biała obwódka 1,5 px.
  - Romb jest teraz wyraźnie widoczny na jasnoturkusowej linii serii (#14b8a6).
- **W legendzie** (`pp-publication-legend`): ten sam wygląd, kwadrat 7,07 px, czyli obrys 10 px.

### Koło sygnału (wykres ceny)
- Prototyp bez zmian: 11 px na wykresie, 10 px w legendzie.
- Katalog ma teraz legendę „sygnał” identyczną z prototypem: 10 px, białe halo 2 px i jasnopomarańczowy pierścień 1 px. Wcześniej miał tu inną wersję, o obrysie około 13 px.
- Katalog: marker sygnału na wykresie ma teraz 11 px łącznie z obwódką, tak jak w prototypie. Wcześniej miał 15 px, bo obwódka powiększała go poza 11 px.
- Legenda „sygnał” ma atrybut pomocniczy `data-part="signal-legend"`.

### Bez zmian
- Dane, fixture'y, stany, targety i interakcje.
- Wykres g/m² nadal nie ma sygnałów.
- Wykres ceny złota, markery sygnału na wykresie, punkty hovera i tooltipy.
- Publiczne ID. Nie było migracji ID: `id_migrations: []`.

---

## r2.9 — 2026-10-01

- **revision_id:** r2.9
- **Baza:** r2.8.
- **Zakres:** wyłącznie rozmiar rombu publikacji danych mieszkaniowych w `element.purchasing-power-chart`. Dotyczy wszystkich targetów, wszystkich stanów i katalogu.

### Znacznik publikacji
- **Wykres** (`data-part="pp-publication-marker"`): romb 7×7 → **11×11 CSS px**. Element ma 11×11 px przed obrotem o 45°; po obrocie jego obrys ma około 15,6 px.
- **Legenda „publikacja”** (`data-part="pp-publication-legend"`): romb 7×7 → **10×10 CSS px**.
- Turkusowe wypełnienie (#14b8a6) i biała obwódka 1,5 px na wykresie bez zmian. Znacznik jest wyśrodkowany na punkcie publikacji.
- Katalog komponentów ma ten sam wygląd. Dodałem tam atrybuty `data-part` dla rombów.

### Bez zmian
- Dane, fixture'y, stany, targety i interakcje.
- Wykres g/m² nadal nie ma sygnałów. Romb oznacza wyłącznie publikację.
- Wykres ceny złota, markery sygnału, punkty hovera i tooltipy.
- Publiczne ID. Nie było migracji ID: `id_migrations: []`.

---

## r2.8 — 2026-10-01

- **revision_id:** r2.8
- **Baza:** r2.7, opublikowana i niezmieniona. Wszystkie poprawki r2.7 zostają.
- **Zakres:** znacznik publikacji na wykresie g/m² oraz ujednolicenie katalogu komponentów.

### Wykres g/m²: tylko znaczniki publikacji
- Wykres g/m² nie ma markerów ani tekstów sygnału. Sygnały i próg alertu dotyczą wyłącznie serii ceny złota.
- Dni publikacji danych mieszkaniowych oznacza turkusowy romb 7 px z białą obwódką 1,5 px. Wcześniej było to koło 8 px, podobne do markera sygnału. Ten sam romb jest w legendzie „publikacja”.
- Romb ma atrybut pomocniczy `data-part="pp-publication-marker"`.
- Działa tak samo w prototypie i w katalogu.

### Katalog komponentów: tooltipy zgodne z r2.7
- Data ma format `YYYY-MM-DD UTC`.
- Wiersz sygnału na wykresie ceny ma treść `Spadek <drawdown> (próg: <threshold>)`, bez „Sygnał · spadek” i bez „●”. Wykres g/m² ma tylko datę i wartość.
- Typografia i wygląd są takie jak w prototypie:
  - data 12 px / 400;
  - wartość i wiersz spadku 12,5 px / 700;
  - tło #0b1b2b, padding 6×10 px, line-height 1,4.
- Górna krawędź tooltipu jest na wysokości górnej krawędzi karty wykresu. Tooltip nie zasłania danych. W tym celu nagłówek karty (tytuł i legenda) ma dwa wiersze, tak jak w prototypie.
- Punkty hovera w katalogu mają ten sam wygląd co w prototypie: pełne kropki 7 px w kolorze serii.

### Bez zmian
- Dane, fixture'y, stany, targety, scenariusze capture i markery sygnału na wykresie ceny.
- Publiczne ID. Nie było migracji ID: `id_migrations: []`.

---

## r2.7 — 2026-10-01

- **revision_id:** r2.7
- **Baza:** r2.6. Wszystkie poprawki r2.6 zostają bez zmian, w tym scenariusze capture hovera i panel progu z r2.5.
- **Zakres:** wyłącznie tooltipy wykresu ceny i wykresu g/m², na wszystkich targetach.

### Treść
- Data ma zawsze format `YYYY-MM-DD UTC`. Usunięte zostały teksty „zamknięcie UTC” i „ostatni odczyt HH:MM UTC”.
- Tooltip ceny ma datę i cenę dnia. W dniu sygnału ma też jeden pomarańczowy, pogrubiony wiersz `Spadek <drawdown> (próg: <threshold>)`.
  - `drawdown` pochodzi z markera wskazanego dnia i ma 2 miejsca po przecinku.
  - `threshold` to aktualny próg roboczy, a podczas edycji panelu niezapisany próg podglądu. Markery są liczone dla tego samego progu.
- Usunięte zostały: wiersz „Bieżący próg”, słowo „Sygnał”, tekst „zamknięcie dnia” i prefiks „●”.
- `gold-overview.intraday-rebound` ma ten sam układ co zwykły sygnał dzienny: data, cena dnia i wiersz spadku. Godziny 10:00 i 14:00 UTC zostały usunięte.
- Tooltip g/m² ma datę i wartość. Opis rodzaju wartości (publikacja, interpolacja albo wartość utrzymana) jest bez zmian.

### Typografia (wspólna dla obu wykresów, zwykłego tooltipu i tooltipu sygnału)
- Data: 12 px, waga 400, kolor #cbd5e1.
- Wartość i wiersz spadku: 12,5 px, waga 700. Na wykresie g/m² wartość ma teraz 12,5 px zamiast 13 px.
- Kontener: line-height 1,4, padding 6×10 px, odstęp 1 px. Wcześniej line-height 1,45 i padding 8×10 px. Zmiana pozwala, żeby trzywierszowy tooltip sygnału zmieścił się nad obszarem danych na `mac-wide`.

### Pozycja
- Górna krawędź każdego tooltipu jest na wysokości górnej krawędzi własnego komponentu wykresu (`top: -1px` względem obramowania), na wszystkich targetach. Tooltip może zasłonić tytuł i legendę, ale nie obszar danych, osie ani marker.
- Poziomo bez zmian: na `mac-wide` środek tooltipu jest nad wskazanym dniem, w granicach 15–85% obszaru danych. Na telefonach tooltip jest na środku obszaru danych.
- Kontrola `mode=capture` dla obu scenariuszy sprawdza górną krawędź i brak zasłonięcia danych. Jeśli warunek nie jest spełniony, zwraca błąd `render-invalid`.
- Nowe atrybuty pomocnicze `data-part`: `tooltip-date`, `tooltip-value`, `tooltip-signal`, `price-chart-area`, `pp-chart-area`.

### Bez zmian
- Dane, fixture'y, wykresy, markery, punkty hovera, stany, targety i scenariusze capture.
- Publiczne ID. Nie było migracji ID: `id_migrations: []`.

---

## r2.6 — 2026-10-01

- **revision_id:** r2.6
- **Baza:** r2.5 (z panelem „Próg sygnału” z r2.5)
- **Zakres:** dwa scenariusze capture hovera wykresów na `gold-overview.ready` / `mac-wide`.

### Scenariusze capture
- Nowy, opcjonalny parametr `capture_scenario` w `mode=capture`:
  - `price-chart-hover-normal`: 2026-01-10, zwykły dzień bez sygnału;
  - `price-chart-hover-signal`: 2025-11-08, dzień sygnału (spadek 8,05%, próg 5,0%).
- Oba wykresy wskazują ten sam dzień: pionowa linia, punkt hovera i tooltip na każdym wykresie.
- Po renderze anchor ma `data-prototype-ready="true"` i `data-capture-scenario-id` z dosłowną wartością parametru.
- Bez parametru capture działa jak w r2.5. Gdy scenariusz jest nieznany, zwraca błąd `unknown-capture-scenario`. Gdy para stan–target nie jest dozwolona, zwraca błąd `capture-scenario-unavailable`. Żaden z błędów nie przełącza na zwykły widok.
- Dane scenariuszy są w `assets/fixtures.json` → `capture_scenarios`. Każdy scenariusz wskazuje istniejący fixture `default` i ustala kraj PL, zakres 360, jednostkę USD/oz, próg 5% i dzień hovera.
- Scenariusze nie są wpisami `states[]`. Manifest pozostaje minimalny i zmienia się w nim tylko `revision_id`.

### Hover (user_preview i capture)
- Punkt hovera jest mały i wypełniony kolorem serii: niebieski na wykresie ceny, turkusowy na wykresie g/m². Ma 7 px i białą obwódkę 1,5 px. Wcześniej był to pierścień 12 px.
- Pomarańczowy marker sygnału nie zmienia się. Punkt hovera jest osobnym wskaźnikiem na linii danych.
- Położenie tooltipów się nie zmienia.
- Dodane atrybuty pomocnicze `data-part`: `price-hover-line`, `price-hover-point`, `pp-hover-line`, `pp-hover-point`, `pp-tooltip`. Marker sygnału ma też `data-day`.

### Bez zmian
- Publiczne `state_id`, `element_id`, `component_id`, `interaction_id` i targety. Nie było migracji ID: `id_migrations: []`.
- Stany, układ, panel progu z r2.5, telefony i dane mockowe.

---

## r2.5 — 2026-09-30

- **revision_id:** r2.5
- **Baza:** r2.4
- **Zakres:** wyłącznie panel progu sygnału (`element.alert-settings-panel`, wariant side-panel) na `mac-wide`.

### Panel „Próg sygnału” (mac-wide)
- **Wysokość:** według treści zamiast pełnej wysokości ekranu. Przyciski Anuluj i Zapisz są tuż pod treścią, a nie przy dolnej krawędzi, i nie trzeba przewijać, żeby je kliknąć.
- **Położenie:** 12 px od prawej krawędzi i 12 px pod paskiem aplikacji (top 76), wysokość maksymalnie 100% − 100 px.
- **Wygląd:** szerokość 400 → 388 px, promień 16, obramowanie 1 px, cień.
- **Pomiar w 1440×900:** panel zajmuje 76–601 px, Anuluj i Zapisz kończą się na 586 px. W oknie 1500×760 w `user_preview` przyciski są widoczne nad paskiem debug.
- **Bez zmian:** treść, kolejność, zachowanie i niemodalność panelu, a także zwężenie treści o 400 px.

### Bez zmian
- Telefony: bottom-sheet i DOM identyczne z r2.4.
- `mac-wide` poza panelem, stany, fixture'y, kraje, publiczne ID i `id_migrations: []`.

---

## r2.4 — 2026-09-30

- **revision_id:** r2.4
- **Baza:** r2.3
- **Zakres:**
  - target `mac-wide` ma wysokość 900, czyli realną wysokość treści okna aplikacji na typowym laptopie;
  - zagęszczony układ wide;
  - kraje pierwszego etapu: Polska, Finlandia, Francja.
  - Telefony: układ bez zmian.

### Target
- `mac-wide`: 1440×932 → **1440×900**. `target_id` bez zmian, zmienia się tylko geometria; `id_migrations: []`.

### Układ wide (tylko `mac-wide`)
- Cała treść `gold-overview` mieści się w 900 px bez przewijania we wszystkich stanach dozwolonych na `mac-wide`, poza `gold-overview.source-error`. Tam baner błędu zostaje u góry i przesuwa kolumny, a przewijanie jest dopuszczalne (decyzja użytkownika).
- **Wykresy:** price-chart 300 → 256 px, purchasing-power-chart 240 → 204 px.
- **Marginesy i odstępy:** margines treści 32 → 24, odstęp między kolumnami i kartami 24 → 16.
- **Lewa kolumna:** 368 → 420 px, a z otwartym panelem progu 320 → 360 px. Mniej zawijania tekstu w sygnale i szczegółach.
- **price-summary:** padding 22 → 18, odstęp 14 → 10, cena 52 → 46 px.
- **purchasing-power-summary i karty wykresów:** padding 20 → 16; odstęp w purchasing-power-summary 12 → 10.

### Kraje
- W selectorze, danych i katalogu zostały tylko: **Polska — Warszawa (PLN)**, **Finlandia — Helsinki (EUR)** i **Francja — Paryż (EUR)**.
- Usunięto USA — Waszyngton D.C. i Belgię — Brukselę.
- `country_id` / `data-option`: `PL`, `FI`, `FR` (wcześniej `PL`, `US`, `BE`).
- **`assets/fixtures.json` → `shared_series`:**
  - dodano `housing_fi` (42 kwartały od 2016-03-31) i `housing_fr` (34 kwartały od 2018-03-31);
  - dodano `fx_eur`, wspólny kurs EUR/USD dla FI i FR (wartości dotychczasowego `fx_be`);
  - usunięto `housing_us`, `housing_be` i `fx_be`.
  - Dane mieszkań FI i FR są ilustracyjne, a nie źródłowe. Początek historii jest taki jak dla usuniętych krajów, więc obszar „brak danych” nadal występuje.
- Każdy fixture wskazuje nowe `countries`. Pozostałe dane fixture'ów są bez zmian.

---

## r2.3 — 2026-09-29

- **revision_id:** r2.3
- **Baza:** zaakceptowany r2.2
- **Zakres:**
  - minimalny manifest `schema_version: 3` (GW-DESIGNER-BRIEF-008);
  - `assets/fixtures.json` jako jedyne źródło danych renderu;
  - 6 jawnych stanów rozwiniętych szczegółów mieszkań na telefonach (GW-DESIGNER-BRIEF-007 z odpowiedziami Lidera);
  - wygląd UI bez zmian.

### Dodane ID
- `gold-overview.ready-housing-details-expanded` (fixture `default`; targety: iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max)
- `gold-overview.refreshing-housing-details-expanded` (fixture `default`; targety: iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max)
- `gold-overview.stale-housing-details-expanded` (fixture `stale`; targety: iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max)
- `gold-overview.source-error-housing-details-expanded` (fixture `stale`; targety: iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max)
- `gold-overview.empty-range-housing-details-expanded` (fixture `short-housing-history`; targety: iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max)
- `gold-overview.intraday-rebound-housing-details-expanded` (fixture `intraday-rebound`; targety: iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max)

Każdy z tych stanów pokazuje swój stan bazowy z rozwiniętymi szczegółami mieszkań, czyli wynik kliknięcia „Szczegóły obliczenia” z r2.2.

W DOM dodano atrybut `data-interaction-id` na 16 elementach interaktywnych. Jego wartości to dotychczasowe `interaction_id`, np. `interaction.pp-details-toggle`.

### Zmienione / usunięte ID
Brak. `id_migrations: []`. 7 migracji z r2.0 (r1.3 → r2.0) jest opisanych niżej, w sekcji r2.0, i nie przechodzi do minimalnego manifestu.

### Manifest (schema_version 3)
- **Pola:** `schema_version`, `revision_id`, `id_migrations`, `targets[]` (`target_id`, `width`, `height`) i `states[]` (`state_id`, `fixture_id`, opcjonalnie `target_ids`).
- **Usunięte:**
  - `base_revision`, `product`, `entry`;
  - `profiles` → `targets`; `screens`;
  - `states[].screen_id`, `selector`, `description`, `availability` → `target_ids`;
  - `components`, `instances`, `state_templates`, `fixtures`, `responsive_rules`, `interactions`.
- Kolejność list nie ma znaczenia.

### assets/fixtures.json
- **Struktura:** `{ "shared_series": {…}, "fixtures": { "default", "stale", "no-gold", "short-housing-history", "intraday-rebound" } }`.
- **`shared_series`:**
  - dzienne zamknięcia złota w wariancie zwykłym i intraday-rebound;
  - dzienne kursy FX dla PL i BE;
  - kwartalne publikacje cen mieszkań dla PL, US i BE, z datą publikacji.
  - Wartości mają pełną precyzję, dokładnie te same co w r2.2.
- **Fixture'y:** każdy wskazuje potrzebne serie po nazwie i zawiera własne różnice stanu:
  - czas odczytu i świeżość;
  - brak odczytu w `no-gold`;
  - początek historii mieszkań w `short-housing-history`;
  - parametry sygnału w `intraday-rebound`;
  - bieżący czas `now_utc`, datę kursu FX i metadane krajów.

### Prototyp
- **Źródło danych:** `index.html` przy starcie wczytuje `prototype-manifest.json` (targety, stany, `fixture_id`, `target_ids`) oraz `assets/fixtures.json`. Seria złota, kursy, publikacje mieszkań, czasy odczytu, „12 min temu” / „4 godz. temu” i parametry intraday pochodzą z fixture'u. Generator danych z kodu usunięto. Wymagany jest lokalny serwer HTTP.
- **`mode=capture`:**
  - wymaga parametrów `state` i `target`, bez wartości domyślnych;
  - błędy: `missing-parameter`, `unknown-state`, `unknown-target`, `state-unavailable-for-target`, `fixtures-unavailable`, `render-invalid`. Błąd oznacza brak anchoru i gotowości, obecność `[data-prototype-error="<kod>"]` i wpis w konsoli;
  - nie korzysta z `localStorage`, bieżącego czasu, losowości, sieci ani zewnętrznych fontów; animacje i przejścia CSS są wyłączone;
  - `data-prototype-ready="true"` pojawia się po `document.fonts.ready`, dwóch klatkach i samokontroli (jeden anchor, jeden korzeń stanu z `data-screen-id`, brak duplikatów `data-element-id`, brak narzędzi w DOM).
- **`user_preview`:** bez parametrów otwiera `gold-overview.ready` na `mac-wide`. Niedozwolona para otwiera stan bazowy. Lista stanów zawiera tylko stany dozwolone dla wybranego targetu.
- **`catalog.html`:** zmieniono wyłącznie oznaczenie rewizji. `responsive-spec.md` uzupełniono o stany rozwinięte i uaktualniono odwołania do manifestu.

---

## r2.2 — 2026-09-29

- **revision_id:** r2.2
- **base_revision:** r2.1
- **Zakres:** techniczna migracja nazewnictwa pól manifestu do docelowego standardu. `index.html`, `catalog.html`, `responsive-spec.md` i `assets/fixtures.json` są identyczne bajtowo z r2.1. UI, copy, dane fixture'ów, interakcje, stany, targety i publiczne ID są bez zmian.

### Manifest — `instances[]` (wszystkie 29 wpisy, w tym `element.product-work-surface`)
- `config` → `configuration`; treść obiektu bez zmian.
- `visible_in_states` + `visible_in_profiles` → `visibility: { state_ids, profile_ids }`; wartości bez zmian.
- Stare pola usunięto i nie występują równolegle.

### Pozostałe
- `state_templates[visibility].description`: odwołanie do pól zaktualizowane na `visibility.state_ids` / `visibility.profile_ids`.
- `id_migrations[]`: bez nowych wpisów (to migracja nazw pól, nie ID).

---

## r2.1 — 2026-09-29

- **revision_id:** r2.1
- **base_revision:** r2.0 (nieodebrany kandydat)
- **Zakres:** wyłącznie narzędzie prototypu w `mode=user_preview` (GW-DESIGNER-BRIEF-006). Bez zmian: powierzchnia produktu i jej UI, dane fixture'ów, stany, responsywność produktu, publiczne ID, manifest capture i `mode=capture` (zachowanie i URL jak w r2.0).

### user_preview
- Jeden ciemny panel narzędzi (`data-prototype-tool="user-preview-panel"`, `data-product-ui="false"`) zajmuje pełną szerokość na dole okna, pod przewijanym obszarem z `element.product-work-surface`. Nad powierzchnią ani obok niej nie ma żadnego narzędzia. Górny pasek usunięto.
- Panel zawiera:
  - pierwszy wiersz: link „Katalog komponentów” (`catalog.html`) oraz „EKRAN / STAN”: lista 10 stanów (`ekran · stan`), przyciski ‹ i ›, licznik `n / 10` i obsługa ← / → na klawiaturze (poza polami formularza i powierzchnią produktu);
  - drugi wiersz: `element.preview-profile`, czyli 5 kart targetów z wymiarami; aktywna karta jest jasna.
- Usunięto etykietę fixture'u (fixture wynika wyłącznie ze `state_id`) i etykietę skali.
- Powierzchnia produktu ma zawsze rozmiar 1:1, równy `logical_size` wybranego targetu, bez dopasowania do okna. Gdy okno jest za małe, stronę się przewija. Powierzchnia jest wyśrodkowana na tle #ece6dd, ma promień 0 i obrys 1 px zamiast rogów 12 / 36 i cienia z r2.0. To zmiana wyłącznie ramki podglądu, a nie UI produktu.
- Lista stanów pokazuje teraz faktycznie otwarty stan. To usuwa odziedziczone ograniczenie, w którym lista zawsze pokazywała „gold-overview.ready”; zmiana dotyczy tylko tego narzędzia.

### Dane i dokumenty
- **Manifest:** zmieniono tylko `revision_id`/`base_revision` oraz opisy narzędzia: `components[preview-profile].semantics`, `config` instancji `preview-profile` i `product-work-surface` (część user_preview) oraz teksty reguł `element.product-work-surface` i `element.preview-profile`. `entry`, `profiles[].capture_surface`, stany, fixture'y i interakcje są bez zmian.
- **`id_migrations[]`:** bez nowych wpisów. 7 migracji z r2.0 (`revision: "r2.0"`) pozostaje, bo r2.0 nie został odebrany, a r2.1 jest kandydatem migracji z zaakceptowanego r1.3.
- **`catalog.html`:** zmieniono wyłącznie oznaczenie rewizji.
- **`responsive-spec.md`:** zmieniono opis panelu i skali user_preview.

### ID
Bez zmian: nic nie dodano, nie usunięto ani nie zmigrowano.

---

## r2.0 — 2026-09-28

- **revision_id:** r2.0
- **base_revision:** r1.3 (jedyna baza wizualna, zachowania i publicznych ID)
- **Wynik:** kanoniczna migracja techniczna. UI, copy, fixture'y, interakcje i responsywność r1.3 bez celowej zmiany.

### Migracje ID (`id_migrations[]`, revision r2.0)
| from | to | powód |
|---|---|---|
| `iphone-standard` | `iphone-16` | Konkretne urządzenie odtwarzalne w symulatorze; geometria 393×852 bez zmian. |
| `android-standard` | `pixel-8` | Konkretne urządzenie odtwarzalne w emulatorze; geometria 412×915 bez zmian. |
| `mobile-compact` | `galaxy-s20` | Konkretne urządzenie odtwarzalne w emulatorze; geometria 360×800 i layout mobile+compact bez zmian. |
| `mobile-large` | `iphone-16-pro-max` | Konkretne urządzenie odtwarzalne w symulatorze; geometria 440×956 bez zmian. |
| `alert-settings` | `gold-overview` | Panel alertu jest wariantem jedynego ekranu bez zmiany UI. |
| `alert-settings.editing` | `gold-overview.alert-settings-editing` | Jednoznaczny wariant panelu. |
| `alert-settings.saved` | `gold-overview.alert-settings-saved` | Jednoznaczny wariant po zapisie. |

### Dodane ID
- **state_id:** `gold-overview.intraday-rebound` (fixture `intraday-rebound`). Dodany stan z istniejącego fixture'u, bez migracji `from`. Zastępuje wejście r1.3 `fixture=intraday-rebound`; rezultat jest ten sam: sygnał o 09:00 UTC, potem odbicie ceny, ostatni odczyt 14:00 UTC, próg 5%.

### Usunięte ID
Brak (poza zmigrowanymi powyżej).

### Zachowane ID
Wszystkie pozostałe publiczne ID r1.3 są zachowane dosłownie i semantycznie: 7 stanów `gold-overview.*`, 17 `component_id`, 29 `element_id` (w tym `element.product-work-surface` i `element.preview-profile`), 5 `fixture_id` oraz 16 `interaction_id`.

### Tryby i capture
- `mode=capture`: `index.html?mode=capture&state={state_id}&target={target_id}`. Renderuje wyłącznie `element.product-work-surface`: dokładnie raz, 1:1, w lewym górnym rogu, bez rogów, cienia i widocznego paska przewijania. Bez narzędzi, `preview-profile` i ramki podglądu. Nie czyta ani nie zapisuje `localStorage`; startuje z PL · 360 dni · USD/oz · próg 5%. Nie zmienia adresu.
- `user_preview` (`index.html?mode=user_preview` albo `index.html`): ręczny podgląd jak w r1.3. Ma selektor stanu (10 stanów) i `preview-profile` (5 targetów). Osobny selektor fixture'u usunięto, bo fixture wynika ze stanu.
- Parametry URL: prototyp czyta wyłącznie `mode`, `state` i `target`. Usunięto `profile`, `fixture`, `country`, `range`, `unit` i `scale`; `scale=1` z r1.3 zastępuje `mode=capture`.
- `entry.ready_selector`: `[data-element-id="element.product-work-surface"][data-prototype-ready="true"]`, ustawiany po wyrenderowaniu żądanego stanu.

### Publiczne korzenie stanu (decyzja Lidera, Q2)
- W `gold-overview.alert-settings-editing` i `gold-overview.alert-settings-saved` `element.product-work-surface` jest jedynym publicznym korzeniem, z `data-screen-id="gold-overview"` i `data-state-id` stanu. Widok ready pod panelem albo toastem jest wizualnie identyczny, ale nie ma własnych atrybutów ekranu ani stanu. Panel i toast nie mają już `data-screen-id` ani `data-state-id`.
- W pozostałych 8 stanach korzeniem pozostaje `main[data-screen-id="gold-overview"]` z `data-state-id` stanu, jak w r1.3.

### Manifest
- Ma dokładnie 15 sekcji standardu. Usunięto `url_parameters`, `local_preferences`, `states[].open_url`, `profiles[].open_url`, `fixtures[].open_url` i `fixtures[].url_parameter`.
- `entry` jest obiektem kanonicznym.
- `screens[]`: tylko `gold-overview`.
- `states[]`: 10 stanów, każdy z jednym `fixture_id`.
- `instances[]`: `screen_id` i `visible_in_*` po migracjach. `gold-overview.intraday-rebound` jest dodany wszędzie tam, gdzie widoczny jest `gold-overview.ready`.
- `responsive_rules.rules[]`: reguły panelu mają `target_id: "gold-overview.alert-settings-editing"` (`target_kind: "state"`), a profile to nowe `target_id`.
- `assets/fixtures.json`: wartości danych bez zmian. W `intraday_rebound` pole `url` (adres legacy) zastąpiono polem `state_id: "gold-overview.intraday-rebound"`.
- `catalog.html`: komponenty i warianty r1.3 bez zmian. Zmieniono etykiety rewizji, nazwy targetów i opis ekranu (panel progu jako wariant `gold-overview`). Link do prototypu prowadzi do `index.html?mode=user_preview`.

### Świadome ograniczenia
- Odziedziczone z r1.3: selektor stanu w `user_preview` pokazuje „gold-overview.ready” niezależnie od otwartego stanu. Bez zmian.

---

## r1.3 — 2026-09-27

- **revision_id:** r1.3
- **base_revision:** r1.2
- **Wynik:** techniczna powierzchnia robocza dla visual capture; UX, wygląd, stany, fixture'y, responsywność i interakcje r1.2 bez zmian.

### Dodane ID
- **component_id:** `product-work-surface` (`product_ui: false`, techniczny).
- **element_id:** `element.product-work-surface` — jedyny dodany publiczny anchor; selector `[data-element-id="element.product-work-surface"]`; bez `interaction_id`.

### Zmienione ID
Brak.

### Usunięte ID
Brak.

### Potwierdzenie chronionych ID
Wszystkie publiczne ID r1.2 zachowane z tą samą wartością i semantyką: 2 `screen_id`, 9 `state_id`, 16 `component_id`, 28 `element_id`, 5 `fixture_id`, 16 `interaction_id`. `id_migrations: []`.

### Zmiany manifestu
- `profiles[]`: `capture_surface` (`element_id`, `selector`, `logical_size` = viewport) dla 5 profili (GW-R1.3-003).
- `components[]`: `product-work-surface`; `instances[]`: `element.product-work-surface` widoczny w 9 stanach i 5 profilach (GW-R1.3-005).
- `state_templates[visibility].instances`: dodany `element.product-work-surface`.
- `responsive_rules.rules[]`: 1 reguła dla `element.product-work-surface` (43 → 44).
- `url_parameters`: `scale` (GW-R1.3-004).

### Pozostałe zmiany
- `index.html`: istniejąca ramka ekranu `div[data-profile-id]` oznaczona `data-component-id="product-work-surface"` i `data-element-id="element.product-work-surface"` (bez nowego elementu DOM). Parametr `scale=1`: skala 1:1 bez dopasowania do okna, promień 0, bez cienia, pasek przewijania ukryty wizualnie (także w panelu progu), ramka wyrównana do lewej krawędzi obszaru podglądu, aby była w całości osiągalna. Bez parametru — jak r1.2. Etykiety rewizji r1.2 → r1.3.
- `catalog.html`: wyłącznie etykiety rewizji i nazwa archiwum (r1.2 → r1.3); anchor nie jest pokazywany (GW-R1.3-005).
- `responsive-spec.md`: wiersz i sekcja „Powierzchnia robocza”.
- `README.md`: tryb capture, profile z `logical_size`, Raport kontroli z pomiarami.

### Świadome ograniczenia
- Odziedziczone z r1.2: selektor stanu pokazuje „gold-overview.ready” niezależnie od otwartego stanu — bez zmian (Q9).

---

## r1.2 — 2026-09-26

- **revision_id:** r1.2
- **base_revision:** r1.1
- **Wynik:** kanoniczny format paczki i manifestu; wygląd, stany, responsywność, fixture'y i zachowania bez zmian.

### Dodane ID
**interaction_id** (16)
- `interaction.country-selector`
- `interaction.data-refresh`
- `interaction.source-error-retry`
- `interaction.gold-unit-selector`
- `interaction.price-unavailable-retry`
- `interaction.alert-settings-open`
- `interaction.pp-details-toggle`
- `interaction.range-selector`
- `interaction.price-chart`
- `interaction.purchasing-power-chart`
- `interaction.pp-empty-range-show-360`
- `interaction.alert-settings-close`
- `interaction.alert-threshold-input`
- `interaction.alert-settings-cancel`
- `interaction.alert-settings-save`
- `interaction.preview-profile`

### Zmienione ID
Brak.

### Usunięte ID
Brak.

### Potwierdzenie chronionych ID
Wszystkie publiczne ID r1.1 zachowane z tą samą wartością i semantyką: 2 `screen_id`, 9 `state_id`, 16 `component_id`, 28 `element_id`, 5 `fixture_id`. `id_migrations: []`.

### Zmiany formatu manifestu
- Dodane: `schema_version: 1`, `entry: "index.html"` (kolejność sekcji kanoniczna).
- `profiles[]`: dodane `role: "product"` dla 5 profili.
- `states[]`: dodany jawny `fixture_id` (default / stale / no-gold / short-housing-history).
- `instances[]`: `action` i `expected_effect` przeniesione do `interactions[]`; dodane `interaction_id` i `visible_in_profiles` (dotychczasowe `config.visible_profiles`); `visible_in_states: ["*"]` rozpisane na 9 stanów.
- `interactions[]`: nowa sekcja, 16 wpisów (`element_id`, `action`, `initial_state`, `result_state`, `expected_effect`).
- `fixtures[]`: `applies_to_states`; `intraday-rebound` z `applies_to_state: "gold-overview.ready"` i własnym `open_url`; fixture'y pochodne z `derived_from` i `overrides`.
- `responsive_rules`: obiekt `{ path: "responsive-spec.md", rules[] }`; reguły z jawnymi listami `profile_id`, rozbite per grupa profili tam, gdzie różnią się wartości.
- `state_templates[visibility]`: dodane `path`, `parameters` i `instances`.
- Usunięte z manifestu: `protected_ids`, `changelog`, `component_catalog` (katalog: stała ścieżka `catalog.html`, wskazana w README), `generated_note`, `added_beyond_brief`.
- Zachowane bez zmian: `url_parameters`, `local_preferences` (klucz `gold-watcher.r1.prefs`), `open_url` profili i stanów.

### Informacje przeniesione z manifestu r1.1
- `generated_note` (r1.1): „Publiczne ID bez zmian względem r1.”
- `added_beyond_brief: true` (r1): `gold-overview.refreshing`, `gold-overview.source-error`. Pozostałe 7 stanów: `false`.

### Pozostałe zmiany
- `index.html`: etykiety narzędziowe „r1.1” → „r1.2” (tytuł dokumentu, pasek narzędzi prototypu).
- `catalog.html`: nagłówek „obowiązuje w r1.2”, odwołania do bieżącej rewizji i nazwy archiwum.
- `responsive-spec.md`: definicja grup profili i tabela „Elementy zależne od profilu” (spisane z istniejącego zachowania, bez zmian wartości).
- `README.md`: przypisanie stanów do fixture'ów, opis selektora stanu jako narzędzia prototypu, sekcja „Raport kontroli”.

### Świadome ograniczenia
Bez zmian względem r1.1.

---

## r1.1 — 2026-09-23

- **revision_id:** r1.1
- **base_revision:** r1
- **Dodane ID:** brak
- **Usunięte ID:** brak
- **Zmienione ID:** brak (wszystkie publiczne ID z r1 zachowane)

### Dodane
- Fixture `intraday-rebound` (`?fixture=intraday-rebound`): sygnał 09:00 UTC, odbicie do 14:00 UTC, wykres dzienny z ceną 14:00, marker na dniu D, wyciszenie do 2026-09-30 09:00 UTC. Sztywno dla X = 5,0%.
- Parametr URL `fixture` i selektor fixture w pasku narzędzi prototypu.
- Tooltip markera rozróżnia czas sygnału od ostatniej ceny dnia i pokazuje bieżący próg; na telefonie przypięty u góry wykresu.
- `signal-status` (below-threshold) w trakcie wyciszenia: bieżący stan i ostatni sygnał w osobnych liniach (konfiguracja, bez nowego wariantu).

### Zmienione
- Katalog: `country-selector` mobile opisany jako lista rozwijana pod przyciskiem (zgodnie z prototypem).
- Katalog: typografia ceny 52 / 40 / 34 px (wide / mobile / compact), zgodnie ze specyfikacją i prototypem.
- Katalog: status „katalog r1 zaakceptowany”.
- Manifest: `element.source-error-retry` → expected_effect „refreshing → ready albo source-error”.
- README: kontrola sum na macOS (`shasum -a 256 -c checksums.sha256`).

### Świadome ograniczenia
- Dane syntetyczne; dostawcy danych nie są wybrani.
- Brak powiadomień, konta i synchronizacji.
- Tylko motyw jasny; brak układu poziomego telefonu.
- preview-profile i selektor stanu są narzędziami prototypu, nie UI produktu.
- Fixture intraday-rebound obsługuje wyłącznie X = 5,0%; brak ogólnego godzinowego przeliczania sygnałów.
- Poza dniem D fixture’a intraday-rebound sygnały liczone na dziennych zamknięciach UTC.

---

## r1 — 2026-09-23

- **base_revision:** none
- **Usunięte ID:** brak
- **Zmienione ID:** brak

### Dodane ID

**screen_id**
- `gold-overview`
- `alert-settings`

**state_id**
- `gold-overview.ready`
- `gold-overview.loading`
- `gold-overview.refreshing`
- `gold-overview.stale`
- `gold-overview.source-error`
- `gold-overview.unavailable`
- `gold-overview.empty-range`
- `alert-settings.editing`
- `alert-settings.saved`

**component_id**
- `app-shell`
- `country-selector`
- `range-selector`
- `segmented-control`
- `price-summary`
- `freshness-indicator`
- `signal-status`
- `price-chart`
- `purchasing-power-summary`
- `purchasing-power-chart`
- `threshold-input`
- `alert-settings-panel`
- `button`
- `toast`
- `data-state-panel`
- `preview-profile`

**element_id**
- `element.app-shell`
- `element.country-selector`
- `element.bar-freshness`
- `element.data-refresh`
- `element.source-error-banner`
- `element.source-error-retry`
- `element.price-summary`
- `element.gold-unit-selector`
- `element.price-freshness`
- `element.price-unavailable`
- `element.price-unavailable-retry`
- `element.signal-status`
- `element.alert-settings-open`
- `element.purchasing-power-summary`
- `element.pp-details-toggle`
- `element.housing-freshness`
- `element.range-selector`
- `element.price-chart`
- `element.purchasing-power-chart`
- `element.pp-empty-range`
- `element.pp-empty-range-show-360`
- `element.alert-settings-panel`
- `element.alert-settings-close`
- `element.alert-threshold-input`
- `element.alert-settings-cancel`
- `element.alert-settings-save`
- `element.toast`
- `element.preview-profile`

### Rozszerzenia względem briefu (zaakceptowane w katalogu)
- Komponenty: `signal-status`, `alert-settings-panel`, `toast`.
- Stany: `gold-overview.refreshing`, `gold-overview.source-error` (rozróżnienie „chwilowa awaria źródła”).
- Breakpointy: 900 px (wide / mobile), 374 px (compact). Bez dodatkowych profili.
- Markery sygnałów jako kropki; kolorystyka Ocean Depth.

### Pliki
- `catalog.html` — zaakceptowany katalog komponentów dołączony do paczki.

### Świadome ograniczenia
- Dane syntetyczne; dostawcy danych nie są wybrani.
- Sygnały liczone na dziennych zamknięciach UTC (fixture bez odczytów godzinowych).
- Brak powiadomień, konta i synchronizacji.
- Tylko motyw jasny; brak układu poziomego telefonu.
- preview-profile i selektor stanu są narzędziami prototypu, nie UI produktu.
- Mobile `country-selector`: lista rozwijana pod przyciskiem (w katalogu opisana jako bottom sheet).
