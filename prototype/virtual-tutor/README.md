# VirtualTutor V4 — prototyp VT-VIRTUALTUTOR-PROTOTYPE-R11-RC6

- **Rewizja:** `VT-VIRTUALTUTOR-PROTOTYPE-R11-RC6` (ta sama w `prototype-manifest.json → revision_id`, `index.html`, `catalog.html`, `responsive-spec.md` i `changelog.md`).
- **Baza:** `VT-VIRTUALTUTOR-PROTOTYPE-R11-RC5`.
- **Standard:** `process/docs/prototype-package-standard.md` (manifest v3); paczka 10 plików — wyjątek Lidera dla `assets/voice_help/*.png`.
- **Status:** kandydat do odbioru, niezaakceptowany.
- **Zakres:** `wizard-voice-m` z zaznaczonym głosem (bez odtwarzania), aby widoczny był przycisk „Ten głos mi odpowiada”. Szczegóły: `changelog.md`.

## Uruchomienie

Sposób uruchamiania prototypu jest opisany w narzędziach procesu.

| Plik | Rola |
| --- | --- |
| `index.html` | Produkt: 74 stany, tryby `capture` i `user_preview` |
| `catalog.html` | Katalog komponentów (`data-component-id`) |
| `prototype-manifest.json` | Manifest v3: `schema_version`, `revision_id`, `id_migrations`, `targets`, `states` |
| `responsive-spec.md` | Specyfikacja responsywności dla człowieka |
| `assets/voice_help/*.png` | 2 ilustracje `voice-download-callout` (pliki bez zmian) |
| `assets/fixtures.json` | Rejestr danych `{ "fixtures": { … } }`, 74 wpisy |
| `changelog.md` | Zmiany R11-RC3, historia rewizji i migracji ID |
| `checksums.sha256` | SHA-256 pozostałych 9 plików |

## Adresy

- **Capture:** `index.html?mode=capture&state=<state_id>&target=<target_id>`. Wymaga obu parametrów; każdy inny parametr, nieznany stan lub target albo niedozwolona para → jawny błąd (`body[data-prototype-state="__error__"]`). Po gotowości: dokładnie jeden nieinteraktywny `[data-element-id="element.product-work-surface"]` o rozmiarze `targets[].width × height` z `data-prototype-ready="true"` (selektor gotowości: `[data-element-id="element.product-work-surface"][data-prototype-ready="true"]`); pomocniczo także `body[data-prototype-ready="true"]` i `data-prototype-state="<state_id>"`.
- **Podgląd:** `index.html` lub `index.html?mode=user_preview`, opcjonalnie z kompletną parą `&state=<state_id>&target=<target_id>`. Tylko jeden z pary, nieznany stan lub target → błąd; pozostałe parametry są ignorowane. Nie jest częścią kontraktu capture.
- **Pary:** wszystkie 74 × 5 (`states[]` bez `target_ids`).

## Targety

| `target_id` | `width × height` |
| --- | --- |
| `mac-wide` | 1440×900 |
| `iphone-16` | 393×852 |
| `pixel-8` | 412×915 |
| `galaxy-s20` | 360×800 |
| `iphone-16-pro-max` | 440×956 |

## Raport kontroli (kontrola eksportu R11-RC6, 06.10.2026)

- **Struktura ZIP-a:** katalog główny `prototype/`, 10 plików (8 plików standardu + 2 obrazy `assets/voice_help/`).
- **Checksumy:** `checksums.sha256` obejmuje 9 plików; zweryfikowane 9/9 na plikach, z których budowany jest ZIP. Rozpakowania gotowego ZIP-a nie wykonano.
- **Manifest v3:** JSON parsuje się; dokładnie 5 kluczy; `schema_version: 3`; `revision_id` = `VT-VIRTUALTUTOR-PROTOTYPE-R11-RC6`; `id_migrations: []`; 5 targetów; 74 stany, każdy `fixture_id` ma dane w `assets/fixtures.json`.
- **Lokalne zasoby:** 0 odwołań zewnętrznych w `index.html` i `catalog.html`.
- **Smoke test** (świeże otwarcie `index.html?mode=capture&state=<state_id>&target=mac-wide`, okno 1440×900; 0 błędów konsoli):
  - `wizard-voice-m`: `voice-option-us-m-evan` zaznaczony (`data-ui-state="selected"`) i widoczny w liście; brak odtwarzania („Odtwarzam” nieobecne); `voice-confirm` „Ten głos mi odpowiada” widoczny w obszarze roboczym.
  - `wizard-voice-f`: bez zaznaczenia i bez `voice-confirm` (bez zmian).
- **Nie wykonano:** capture 74 × 5, zrzuty, porównania pikselowe.
