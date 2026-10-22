# Gold Watcher — prototyp r3.3

Klikalny kontrakt designu i zachowania, nie kod aplikacji. Baza: `r3.2`. Poprawa skali osi Y wykresów i tytułu dokumentu (GW-DESIGNER-BRIEF-008-ANSWERS-1); stany, targety, fixture'y i treść bez zmian.
- **`index.html`:** ekran `gold-overview` w 7 stanach na 5 targetach.
- **`catalog.html`:** katalog z ponownie otwartym fragmentem `pain-chart` i nowym komponentem `chart-legend`.

## Uruchomienie
```
cd prototype
python3 -m http.server 8731 --bind 127.0.0.1
```
- Ekran: `http://127.0.0.1:8731/index.html?mode=user_preview&state=gold-overview.ready&target=mac-wide`. Pasek narzędzi ma wybór stanu i targetu.
- Katalog: `http://127.0.0.1:8731/catalog.html`.

Manifest i fixture są też wbudowane w oba pliki HTML jako kopia plików z paczki.

## Render
- `index.html?mode=capture&state=<state_id>&target=<target_id>`.
- Stany:
  - `gold-overview.ready` — dziś, poza rynkiem, sekcje zwinięte, próg 20%;
  - `gold-overview.ready-in-market` — 2024-09-30, w złocie;
  - `gold-overview.details-expanded` — wszystkie sekcje i liczby rozwinięte, kalkulator 2000 / 10 lat z wykresem;
  - `gold-overview.loading` — szkielet, „Odśwież” zajęty;
  - `gold-overview.refreshing` — dane widoczne, „Odśwież” zajęty;
  - `gold-overview.stale` — baner z czasem synchronizacji nad treścią;
  - `gold-overview.unavailable` — karta „Brak danych” i „Spróbuj ponownie”.
- Scenariusz `capture_scenario=price-chart-hover-normal` działa tylko z `gold-overview.ready` na `mac-wide`: dzień notowań 2026-01-09, zakres 1 rok. Tooltip pokazuje datę, cenę, średnią 50 i średnią 200.
- Kody błędów:
  - `missing-parameter`;
  - `unknown-state`;
  - `unknown-target`;
  - `state-unavailable-for-target`;
  - `unknown-capture-scenario`;
  - `capture-scenario-unavailable`;
  - `fixtures-unavailable`.
- Anchor `element.product-work-surface` występuje dokładnie raz, ma rozmiar targetu i `data-prototype-ready="true"`. Strona przewija się wewnątrz anchoru, w jednym kontenerze.

## Dane
`assets/fixtures.json` zawiera jeden rejestr `fixtures`:
- `default` — dane z 2026-10-15;
- `in-market` — dane z 2024-09-30; seria to pierwsze `dni_serii` dni serii `default` (sprawdzone: wartości są identyczne);
- `no-data`.

Wartości pochodzą 1:1 z odświeżonych plików Lidera (`GW-DESIGNER-DATA-STRAZNIK-001*.json`, 2026-10-22), bez ręcznych poprawek tekstu. Pola bólu są dodatnie (spadek od szczytu w %).
- daty jako przyrosty dni;
- pasma tylko w oknach wykresu stanu;
- przebiegi wartości 0/1;
- słownik tekstów kalkulatora.

Sprawdziłem, że po rozkodowaniu wartości są identyczne z plikami źródłowymi. Formatowanie liczb jest zgodne z `fmt`, `pc`, `dz` i `p0` prototypu (odpowiedź Lidera 4). Czas synchronizacji w wariancie stale to wartość przykładowa (`sync.example: true`).

## Raport kontroli
Kontrola eksportu z 2026-10-22. Wynik: **pozytywny**.
- **Archiwum i checksumy — OK.** ZIP zawiera wyłącznie katalog `prototype/` z 8 plikami ze standardu. `checksums.sha256` pokrywa 7 pozostałych plików i wszystkie sumy się zgadzają.
- **Manifest — OK.** Dokładnie pola v3: `schema_version: 3`, `revision_id: "r3.3"`, `id_migrations: []`, 5 targetów i 7 stanów. Tytuł dokumentu: „Gold Watcher r3.3”.
- **Capture — OK.** Wszystkie 35 par stan × target otwierają się deterministycznie:
  - jeden anchor o rozmiarze targetu i `data-prototype-ready="true"`;
  - brak `data-prototype-tool` i powielonych ID;
  - brak poziomego przewijania strony na 360 px.
- **Skala osi Y — OK.**
  - **Spójność etykiet ze skalą:** we wszystkich 35 parach i w katalogu wszystkie etykiety każdego wykresu liniowego leżą na jednej prostej y = a − b·ln(v) (odchylenie maks. 0,00 px).
  - **Wykres bólu:** „0%” leży na dolnej krawędzi pola, a etykieta progu paniki na czerwonej linii (maks. 1,0 px).
- **Pomiar znanych wartości z danych.** Położenie z linii wobec położenia wynikającego z etykiet, w px od góry pola:

  | stan @ target | status: kurs 4156 | status: średnia 200 | historia: kurs 4156 | wartość: Wytrwały pierwszy / ostatni | kalkulator: Wytrwały pierwszy / ostatni |
  | --- | --- | --- | --- | --- | --- |
  | ready @ mac-wide | 123 / 123 (0,4) | 90 / 90 (0,3) | 102 / 102 (0,3) | 182 / 181 (0,9) · 27 / 27 (0,1) | — |
  | details-expanded @ mac-wide | 123 / 123 (0,4) | 90 / 90 (0,3) | 102 / 102 (0,3) | 182 / 181 (0,9) · 27 / 27 (0,1) | 173 / 172 (0,9) · 20 / 20 (0,1) |
  | ready @ galaxy-s20 | 98 / 97 (0,4) | 72 / 71 (0,3) | 71 / 71 (0,3) | 155 / 154 (0,9) · 23 / 23 (0,1) | — |
  | details-expanded @ galaxy-s20 | 98 / 97 (0,4) | 72 / 71 (0,3) | 71 / 71 (0,3) | 155 / 154 (0,9) · 23 / 23 (0,1) | 147 / 146 (0,9) · 17 / 17 (0,1) |

  Maksymalna różnica wynosi 0,9 px (dopuszczalne 2 px). Na wykresie wartości widoczne są też etykiety poniżej 100.
- **Interakcje, nazwy postaci i usunięte teksty — OK.** Bez zmian względem r3.2.
- **Konsola — OK.** Brak błędów, a automatyczny przegląd strony zakończył się bez zgłoszeń.
