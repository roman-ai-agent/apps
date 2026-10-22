# Changelog — Gold Watcher

## r3.3 — 2026-10-22

- **revision_id:** r3.3
- **Baza:** r3.2.
- **Źródło:** GW-DESIGNER-BRIEF-008-ANSWERS-1.

### Poprawa skali osi Y (wada znaczenia)
- **Błąd w r3.2:** etykiety i linie siatki osi Y w `status-chart`, `value-chart` i `price-chart` (ekran i katalog) były liczone z wysokości pola w pikselach, ale wstawiane jako procent wysokości obszaru rysowania serii. Przesuwało to je i ściskało ku górze względem linii.
- **Poprawka:** etykiety i siatka używają teraz tej samej skali logarytmicznej, tego samego marginesu i tego samego obszaru rysowania co serie. Na `pain-chart` etykiety 0%, progu bólu i progu paniki leżą na swoich liniach.
- **Zakres etykiet:** na wykresie wartości gęstszy krok etykiet (min. 16 px), więc widoczne są też wartości poniżej 100 (np. 90, 80).

### Inne
- Tytuł dokumentu zgodny z `revision_id`: „Gold Watcher r3.3”.

### Bez zmian
Wykres bólu, odstępy 16 px, `chart-legend` i teksty z briefu 008.

### ID
Brak zmian. `id_migrations: []`.

---

## r3.2 — 2026-10-22

- **revision_id:** r3.2
- **Baza:** r3.1 (kandydat niezaakceptowany).
- **Źródło:** GW-DESIGNER-BRIEF-008.
- **Bez zmian:** stany, targety i fixture'y. `default` i `in-market` są zbudowane ponownie z odświeżonych plików danych.

### `element.pain-chart` — zmienione znaczenie i wygląd
- **Kierunek:** 0% na dole, większy ból wyżej. Linia progu bólu (szara przerywana) i czerwona linia progu paniki są w górnej części wykresu. Etykiety osi są dodatnie (0%, próg bólu %, próg paniki %), a nad wykresem stoi tytuł osi „↑ spadek od szczytu”.
- **Dane:** dodatnie pola `bolStraznik`, `bolWytrwaly`, `bolNerwowy`, rysowane w górę od 0.
- **Forma:**
  - półprzezroczyste pola od osi 0 w kolorach postaci; Nerwowy Trzymacz ma kreskowanie i przerywany kontur;
  - ciepłe tło pola wykresu (#fbf6f4);
  - wysokość 130 px na `mac-wide` i 110 px na telefonie, wobec 200 i 170 px wykresu wartości;
  - etykiety progów w polu wykresu.
- **Podpis:** z nowego prototypu („… im wyżej, tym większy ból; czerwona linia u góry — próg paniki.”).
- **Zakres:** tabela sytuacji i kalkulator, na wszystkich targetach.

### Nowy komponent `chart-legend`
- **Budowa:** próbki w dokładnym stylu serii (linia ciągła lub przerywana, pole, pas, kropka, trójkąt), krój 12 px, własne tło #f6f8fb z ramką #e2e8f0 i promień 10 px. Objaśnienia są oddzielone linią od próbek.
- **Warianty:**
  - `status` — wykres stanu; na telefonie objaśnienia 1–3 rozwijane przyciskiem w legendzie;
  - `history`;
  - `value`;
  - `pain` — ciepłe tło;
  - `stats`.

### Odstępy
Jedna reguła: między polem wykresu (z osiami) a sąsiednim tekstem lub legendą jest 16 px. Między wierszami tekstu jest 4–8 px. Reguła obowiązuje dla `status-chart`, `value-chart`, `pain-chart`, `price-chart` i wykresów statystyki; jest opisana w `responsive-spec.md`.

### Teksty
- **Nazwy własne:** Strażnik Trendu, Wytrwały Trzymacz, Nerwowy Trzymacz, we wszystkich tekstach stałych ekranu i katalogu.
- **`element.intro`:** nowe pierwsze zdanie („… żeby w długim okresie ograniczyć utratę wartości oraz ból i panikę, które jej towarzyszą.”).
- **Akapit po wykresie stanu:** zastąpiony akapitem „Strażnik nie służy do zarobienia więcej w hossie…”, bez powtórzenia pierwszego zdania. Nota o inflacji jest bez zmian.
- **Nagłówek karty:** „Sygnał na dziś” bez zmian.

### Inne
- Ostatnia etykieta osi czasu jest pomijana, gdy nachodzi na poprzednią.

### ID
- **Dodany `component_id`:** `chart-legend`.
- **Zmienione znaczenie:** `element.pain-chart`.
- Brak dodanych i usuniętych `element_id` oraz `interaction_id`.

### id_migrations
`[]`

---

## r3.1 — 2026-10-22

- **revision_id:** r3.1
- **Baza:** r3.0. Ekran złożony wyłącznie z komponentów zaakceptowanego katalogu `r3.1-catalog`.
- **Źródło:** GW-DESIGNER-BRIEF-007 i odpowiedzi Lidera rundy 1 i 2.

### Zmiany względem r3.1-catalog
- **Stany:** dodane `details-expanded` (zmienione znaczenie), `loading`, `refreshing`, `stale` i `unavailable`, wszystkie na 5 targetach. `ready` i `ready-in-market` były już w katalogu.
- **`element.data-state` na ekranie:**
  - `stale`: baner nad treścią z „Ostatnia synchronizacja: 15.10.2026, 22:05” (wartość przykładowa) i `element.data-retry`;
  - `unavailable`: karta „Brak danych o cenie złota” z `element.data-retry`;
  - `loading`: szkielet.
- **Nagłówek:** wariant „Brak danych”. `element.data-refresh` jest zajęty (`aria-busy`, `disabled`) w `loading` i `refreshing`.
- **Kalkulator:** wybór roku albo czasu nie zmienia już wykresu pod tabelą sytuacji ani zaznaczenia na wykresie historii (odpowiedź 2, punkt 3).
- **Fixture `default`:** teksty wprost z odświeżonego `GW-DESIGNER-DATA-STRAZNIK-001.json`; usunięte pole `zmiany_tekstu`.
- **Siatka ekranu:** wiersze bez rozciągania (`align-content: start`), żeby karta stanu danych stała zaraz pod wstępem.

### Pełna lista ID względem r3.0
Lista dodanych, zmienionych i usuniętych ID jest w sekcji `r3.1-catalog` poniżej. `r3.1` nie dodaje ani nie usuwa żadnego ID. Zmienione znaczenie mają `element.price-chart` i stan `gold-overview.details-expanded`.

### id_migrations
`[]`

---

## r3.1-catalog — 2026-10-21

- **revision_id:** r3.1-catalog (katalog do akceptacji przed `r3.1`).
- **Baza:** r3.0.
- **Źródło:** GW-DESIGNER-BRIEF-007 i odpowiedzi Lidera (runda 1).
- **Nowy cel ekranu:** rynek złota oczami algorytmu Strażnik trendu.

### Zachowane ID
- **`element.app-header`**, **`element.data-refresh`**, **`element.data-retry`**, **`element.data-state`:** bez zmian znaczenia.
- **`element.data-freshness`:** „Dane do …”, pierwsza część `stan.dzien`.
- **`element.price-summary`:** tylko kurs w USD za uncję (druga część `stan.dzien`), bez drugiej jednostki.
- **`element.price-chart`:** **zmienione znaczenie** — wykres historii Strażnika:
  - skala logarytmiczna;
  - stałe warstwy: posiadanie i pasek kierunku długoterminowego;
  - przełączane warstwy: Średnie oraz Kupno i sprzedaż;
  - przeciąganie przesuwa okres;
  - tooltip dnia i tooltip transakcji;
  - wyróżnienie wybranego okresu albo transakcji.
- **`element.range-selector`:** zakresy 1 rok, 3 lata, 5 lat (domyślny), 10 lat, Całość.
- **`element.product-work-surface`:** bez zmian.

### Dodane ID
- **Elementy:**
  - `element.intro`;
  - `element.signal-status`;
  - `element.market-assessment`;
  - `element.recent-period`;
  - `element.status-chart`;
  - `element.scenario-table`;
  - `element.panic-threshold`;
  - `element.value-chart`;
  - `element.pain-chart`;
  - `element.chart-layers`;
  - `element.entry-year-calculator`;
  - `element.synthetic-stats`;
  - `element.signal-history`;
  - `element.algorithm-explainer`;
  - `element.physical-gold-costs`.
- **Interakcje:**
  - `interaction.assessment-numbers-toggle`;
  - `interaction.status-legend-toggle` (telefony);
  - `interaction.panic-threshold-select`;
  - `interaction.scenario-row-select`;
  - `interaction.chart-layer-toggle`;
  - `interaction.calculator-year-select`;
  - `interaction.calculator-term-select`;
  - `interaction.signal-history-row-select`;
  - `interaction.entry-year-calculator-toggle`;
  - `interaction.synthetic-stats-toggle`;
  - `interaction.signal-history-toggle`;
  - `interaction.algorithm-explainer-toggle`;
  - `interaction.physical-gold-costs-toggle`.
- **Zmienione znaczenie:** `interaction.price-chart-hover` obejmuje teraz także przeciąganie (`data-action="hover, drag"`).

### Usunięte (bez zastępstwa — dlatego nie ma ich w `id_migrations`)
- **Elementy i interakcje:**
  - `element.situation-summary`;
  - `element.similar-days` i `interaction.similar-days-details-toggle`;
  - `element.trend-context` i `interaction.trend-context-details-toggle`;
  - `element.unit-selector` i `interaction.unit-select`.
- **Wykres historii:** usunięte warstwy stref dołków i linii filtru trendu, razem z przełącznikami. Usunięte też kropki dołków; zostają tylko na wykresie stanu.
- **Tooltip:** usunięta linia „Faza: …”.
- **Stany:** usunięte `gold-overview.few-cases` i `gold-overview.similar-days-insufficient`.

### Stany w tej paczce
- `gold-overview.ready` → `default`.
- `gold-overview.ready-in-market` → `in-market` (nowy).

`details-expanded` (zmienione znaczenie), `loading`, `refreshing`, `stale` i `unavailable` będą w paczce `r3.1`.

### Decyzje Designera do akceptacji
- **Wykres wartości i bólu kalkulatora** stoi w sekcji „Sprawdź dowolny rok wejścia”. W prototypie merytorycznym kalkulator przerysowuje wspólny wykres pod tabelą sytuacji i przewija do niego.
- **`intro`** ma dwie części. Tytuł i pierwsze zdanie (`element.intro`) są nad sygnałem. Po wykresie stanu (`data-part="intro-continued"`) stoi cały akapit wstępu z powtórzonym pierwszym zdaniem i nota o inflacji.

### Poprawki Użytkownika (2026-10-22)
- **Znak sygnału:** kolorowa pigułka — „POZA RYNKIEM” jasnoczerwona z ciemnoczerwonym tekstem, „TRZYMAJ ZŁOTO” jasnozielona z ciemnozielonym tekstem. Karta sygnału ma w obu wariantach białe tło.
- **Ikona statusu:** „Trend ostatnich miesięcy: niewyraźny” ma w szarym kółku falę. Pozostałe statusy `neu` mają puste szare kółko. Ikona zależy tu od nazwy i wartości warunku, nie tylko od pola `stan`.
- **Tekst „Moment wejścia”** w `default` zmieniony z „dobry” na „dobry ale dopiero jak trend będzie rosnący” (w `r3.1` już w pliku danych). W statusie pogrubione jest tylko „dobry”, a reszta stoi pod nim mniejszym tekstem.
- **Legenda wykresu stanu** w `default`: „Teraz: cena jest w zielonym pasie — moment wejścia byłby dobry.” zmienione na „Teraz: cena jest w zielonym pasie — moment wejścia będzie dobry, jeśli nadal będziemy w zielonym pasie, a trend zmieni się na wzrostowy.”. Zmiana jest w `fixtures.default.zmiany_tekstu`.
- **Wstęp po wykresie stanu** zaczyna się powtórzonym pierwszym zdaniem („Strażnik trendu to algorytm…”), żeby „Nie służy do zarobienia więcej w hossie…” miało podmiot. Treść się nie zmienia.
- **Ostatnia etykieta osi czasu** na wykresach jest wyrównana do prawej, żeby nie wychodziła poza kartę.

### id_migrations
`[]`
