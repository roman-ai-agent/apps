# Gold Watcher — prototyp r2.12

Klikalny kontrakt designu i zachowania, a nie kod aplikacji. Baza: r2.11.

Zmiana: dni publikacji na wykresie g/m² oznacza kółko 11 px, zbudowane jak marker sygnału na wykresie złota (obwódka 2 px i białe halo). Ma turkusową obwódkę i ciemny środek #0f4c45. Legenda „publikacja” ma to samo kółko. Prototyp otwiera się także z pliku i dopasowuje się do okna.

Historia zmian jest w `changelog.md`.

## Uruchomienie
Prototyp trzeba otworzyć przez lokalny serwer HTTP, bo `index.html` wczytuje `prototype-manifest.json` i `assets/fixtures.json`. Przykład:
```
cd prototype && python3 -m http.server 8000
```
Potem otwórz `http://localhost:8000/index.html`. Od r2.11 prototyp otwiera się także po kliknięciu pliku (`file://`). Używa wtedy kopii manifestu i fixture'ów wbudowanej w `index.html` przy eksporcie. Przez HTTP wczytuje pliki z paczki.

## Tryby
- **capture:** `index.html?mode=capture&state=<state_id>&target=<target_id>`.
  - Renderuje wyłącznie `element.product-work-surface` w rozmiarze targetu, 1:1, w pozycji 0,0.
  - Gotowość: `data-prototype-ready="true"` na anchorze.
  - Błąd: `[data-prototype-error]` z jednym z kodów: `missing-parameter`, `unknown-state`, `unknown-target`, `state-unavailable-for-target`, `unknown-capture-scenario`, `capture-scenario-unavailable`, `fixtures-unavailable`, `render-invalid`.
- **capture_scenario (opcjonalny):** wybiera stan prezentacji interakcji po nazwie. Bez tego parametru capture renderuje zwykły widok.
  - `index.html?mode=capture&state=gold-overview.ready&target=mac-wide&capture_scenario=price-chart-hover-normal`: 2026-01-10, zwykły dzień bez sygnału.
  - `index.html?mode=capture&state=gold-overview.ready&target=mac-wide&capture_scenario=price-chart-hover-signal`: 2025-11-08, dzień sygnału. Marker sygnału wygląda zwykle. Tooltip ceny pokazuje `2025-11-08 UTC`, cenę i `Spadek 8,05% (próg: 5,0%)`.
  - W obu scenariuszach oba wykresy wskazują ten sam dzień. Każdy ma pionową linię, mały punkt hovera w kolorze serii i tooltip. Ten sam wygląd ma zwykły hover w `user_preview`.
  - Po renderze anchor ma `data-prototype-ready="true"` i `data-capture-scenario-id` równe wartości parametru.
  - Scenariusze są zdefiniowane w `assets/fixtures.json` → `capture_scenarios`. Nie są stanami (`states[]`).
- **user_preview:** `index.html?mode=user_preview&state=<state_id>&target=<target_id>`.
  - Bez parametrów otwiera `gold-overview.ready` na `mac-wide`.
  - Dolny panel narzędzi: link do katalogu, EKRAN / STAN (lista, ‹ ›, ← / →) i wybór targetu.
  - Preferencje zapisuje w `localStorage` pod kluczem `gold-watcher.r1.prefs`, wyłącznie w tym trybie.

## Stany i targety
Źródłem listy jest `prototype-manifest.json` (`schema_version: 3`).
- **Targety:** `mac-wide` 1440×900, `iphone-16` 393×852, `pixel-8` 412×915, `galaxy-s20` 360×800, `iphone-16-pro-max` 440×956.
- **Stany:** 16, w tym 6 stanów `*-housing-details-expanded` dozwolonych wyłącznie na 4 telefonach.

## Pliki
- `index.html`: prototyp.
- `catalog.html`: katalog komponentów.
- `assets/fixtures.json`: jedyne źródło danych. `shared_series` zawiera wspólne serie, a `fixtures` jest rejestrem fixture'ów wskazywanych przez `states[].fixture_id`.
- `prototype-manifest.json`: indeks stanów i targetów.
- `responsive-spec.md`: reguły responsywności dla człowieka.
- `changelog.md`: historia zmian.
- `checksums.sha256`: SHA-256 pozostałych 7 plików.

## Publiczne atrybuty DOM
`data-screen-id`, `data-state-id`, `data-element-id`, `data-component-id`, `data-interaction-id`, `data-variant`. Narzędzia `user_preview` mają `data-prototype-tool` i nie istnieją w `mode=capture`.

## Raport kontroli
Kontrola eksportu z 2026-10-01. Wynik: **pozytywny**.
- **Archiwum i checksumy — OK.** ZIP zawiera wyłącznie katalog `prototype/` z 8 plikami. `checksums.sha256` pokrywa 7 pozostałych plików i wszystkie sumy się zgadzają.
- **Manifest — OK.** `schema_version: 3`, `revision_id: "r2.12"`, 16 stanów i `id_migrations: []`. Fixture'y są bez zmian.
- **Capture — OK.**
  - Wszystkie 74 dozwolone pary stan–target i oba scenariusze hovera mają `data-prototype-ready="true"`.
  - Błędy zwracają `unknown-capture-scenario` i `capture-scenario-unavailable`.
- **Znacznik publikacji — OK.** Na wykresie i w legendzie, we wszystkich stanach i na wszystkich targetach oraz w katalogu, kółko ma 11×11 px, border-radius 50% i środek #0f4c45. Na wykresie g/m² nie ma elementów sygnału.
- **Konsola i układ — OK.** Brak błędów konsoli, a automatyczny przegląd strony zakończył się bez zgłoszeń.
