# Bloomgrid — paczka prototypu `r1`

Pełna rewizja r1: 2 ekrany (`screen.home`, `screen.game`), 23 stany, 5 targetów i katalog 15 komponentów. Baza: zaakceptowany katalog `r1-katalog` z poprawkami Q59 (plakietka „×2” poza polami) i kluczami kolorów `poppy`, `sun`, `leaf`, `drop`, `berry`. Nowy komponent `component.alert` (R-4.5, R-4.6, R-5.3).

## Uruchomienie

```sh
cd prototype
python3 -m http.server 8741 --bind 127.0.0.1
```

- Prototyp: http://127.0.0.1:8741/index.html?mode=user_preview&state=home.first-run&target=iphone-standard
- Capture: http://127.0.0.1:8741/index.html?mode=capture&state=<state_id>&target=<target_id>
- Katalog: http://127.0.0.1:8741/catalog.html?target=mac-wide

Nie otwieraj plików przez `file://`. Manifest i fixture ładują się przez HTTP.

## Zawartość

- `index.html`: render 23 stanów w `mode=capture` i `mode=user_preview`. Każdy stan czyta scenariusz z `fixtures[fixture_id].scenarios[state_id bez „.en”]`. W `user_preview` jest pasek narzędzi podglądu (`data-prototype-tool="preview-toolbar"`).
- `catalog.html`: 15 komponentów, podstawy (kolory, symbole, oprawa, ruch), tabela responsywności, lista stanów r1 i przełącznik fixture `default` / `english`. Sekcja `component.board` ma demo na żywo.
- `assets/bloomgrid-rules.js`: reguły gry R-1 i R-2 (37 kształtów, mieszczenie, czyszczenie, punktacja, seria, koniec gry, format liczb). Czyste funkcje bez DOM, oddzielone od widoku (S-1.2). Klatki czyszczenia (`game.line-clear`, `game.color-bonus`, `game.combo`) są liczone tymi regułami z planszy sprzed ruchu.
- `assets/bloomgrid-ui.js`, `assets/bloomgrid.css`: komponenty, przeciąganie (dotyk i mysz), pasek podglądu, style.
- `assets/fixtures.json`: rejestr `default` (pl, 19 scenariuszy) i `english` (en, 4 scenariusze). Stałe plansze, trójki, wyniki, rekordy i ziarna losowania dalszych trójek.
- Grafiki narysowane ręcznie dla Bloomgrid: `assets/symbol-poppy|sun|leaf|drop|berry.svg` (symbole kolorów, R-1.9), `assets/bloomgrid-mark.svg` (znak), `assets/home-hero.svg` (ilustracja ekranu startowego), `assets/garden-border.svg` (pas ogrodu w tle).

## Klikalność w `user_preview`

- Start: „Kontynuuj” → `game.classic-resumed`, „Nowa gra” → `game.classic-start`, „Wyzwanie dnia” → `game.daily-start`. W stanach `.en` przejście trafia do wersji `.en`, gdy istnieje.
- Gra działa na żywo w każdym stanie `game.*`: przeciąganie, podgląd, czyszczenie, punkty, seria, nowa trójka. Koniec gry otwiera panel końca z wynikiem z tej rozgrywki. W stanach z klatką (przeciąganie, czyszczenie) pierwsze chwycenie klocka zastępuje klatkę stanem gry.
- Wyjście: w trybie klasycznym → `home.resume-available`, w wyzwaniu dnia → dialog „Zakończyć podejście?” („Graj dalej” go zamyka, „Zakończ” → `home.with-records`).
- Panel końca: „Zagraj ponownie” → start tego samego trybu, „Do startu” → `home.with-records`.
- `game.save-error`: „Spróbuj ponownie” symuluje udany zapis — komunikat znika. `game.crash`: „Uruchom ponownie” → `home.resume-available`.
- Komunikaty narzędzia mają `data-prototype-tool` i nie występują w `mode=capture`.

## Raport kontroli

Wynik: **zielony**. Własna kontrola Designera i automatyczne otwarcie stanów przez Lidera bez błędów. Po otwarciu poprawiono jeden stan (R-3.6); ponowne otwarcie wykonuje Lider.

| Kontrola | Wynik |
|---|---|
| Capture procesu (Lider, pakiet sha256 `fc5db3be…9219`) | 46/46 udane: 23 stany × `iphone-standard` i `mac-wide`. |
| Poprawka po odbiorze (R-3.6, Q44) | `game.over-daily-new-day`: panel bez wiersza rekordu i bez „Nowy rekord!”; wynik, informacja o nowym wyzwaniu i oba przyciski zostają. Sprawdzone na 5 targetach: brak `element.game.over.record` i `element.game.over.new-record`, układ i konsola bez błędów. |
| Poprawka nagłówka (uwagi Reprezentanta 4a, 4b) | 6 stanów końca × 5 targetów: rekord w nagłówku równy rekordowi w panelu (`over-classic-new-record` 21 360 w obu); w `over-daily-new-day` nagłówek bez rekordu. Przyciski panelu mają 52 px wysokości (etykiety w jednym wierszu) na wszystkich targetach. |
| Układ paczki | `prototype/` zawiera wszystkie pliki standardu i `assets/` (2 skrypty, style, fixture, 8 SVG). Nie ma PNG, `captures/` ani plików kontroli. |
| Checksumy | `checksums.sha256` obejmuje wszystkie pliki oprócz siebie (SHA-256, ścieżki względem `prototype/`). Sumy policzono po kontroli. |
| Manifest v3 | Ma dokładnie pola `schema_version` 3, `revision_id` `r1`, `id_migrations` `[]`, `targets`, `states`. 5 targetów, 23 stany. Każdy `fixture_id` istnieje w rejestrze, a każdy stan ma scenariusz. |
| Lokalne zasoby | Brak odwołań sieciowych i CDN. Czcionki systemowe. Render nie używa `Date` ani `Math.random` (losowanie z ziarnem tylko po interakcji). |
| Anchor (115 par stan × target, Playwright Chromium) | Każda para ma dokładnie 1 `element.product-work-surface` o rozmiarze targetu, `data-prototype-ready="true"`, bez `data-interaction-id` i bez `data-prototype-tool` w dokumencie. DOM nie zmienia się przez 250 ms bez interakcji. |
| Jawne błędy | Brak `target`, nieznany stan, target, tryb lub parametr oraz nieobsługiwany `capture_scenario` dają komunikat błędu i 0 anchorów. |
| ID i interakcje | Bez duplikatów `data-element-id` w żadnej parze. 2–5 interakcji na stan, każda z `data-action` i `data-expected-effect`. Ich kontrakty opisuje katalog. |
| Układ (115 par) | Żaden element, klocek, plakietka, komunikat ani karta nie wychodzi poza powierzchnię. Plakietka „×2” nie nachodzi na żadne pole. Teksty mieszczą się w przyciskach, komunikatach, kartach, plakietkach i nagłówku (także EN). Nagłówek, wynik, plansza, komunikat zapisu, trójka i menu nie nachodzą na siebie. |
| Scenariusze (node) | Żadna plansza scenariusza nie ma pełnej linii. Plansze końca gry: żaden klocek trójki się nie mieści (R-1.7). Klatki: `line-clear` +81 (1 + 80), `color-bonus` +161 (1 + 80 + 80), `combo` +472 (2 + 320 + seria ×3 150). Przeciąganie: `dragging-fits` 4 pola bez linii, `dragging-line-preview` 2 pola, rząd 6 jednego koloru i rząd 7. |
| Smoke test przejść (`user_preview`) | Nowa gra, Kontynuuj, Wyzwanie dnia, wersja EN, wyjście klasyczne, dialog wyzwania (fokus na „Graj dalej”, zamknięcie, „Zakończ”), ponowienie zapisu, „Uruchom ponownie”, „Zagraj ponownie” w obu trybach, „Do startu” — każde prowadzi do stanu z tabeli w katalogu. |
| Smoke test gry | `game.dragging-line-preview`: statyczna klatka (8 pól `bonus`, 8 `clear`, 1 klocek). Chwycenie zastępuje klatkę grą; ruch na r6 c8 daje wynik 6842. |
| Katalog (`mac-wide`, `mobile-compact`) | 16 sekcji, brak poziomego przewijania, żaden okaz nie wychodzi poza ramkę. |
| Ręczne zrzuty | `home.resume-available`, `game.dragging-line-preview`, `game.dragging-fits`, `game.combo`, `game.save-error`, `game.over-daily-new-day` (telefony), `home.read-error`, `game.crash`, `game.over-classic.en` (`mac-wide`). |
| Konsola | 0 błędów: index (115 par i smoke testy) i katalog. |

Uwaga: host podglądu, który dokleja własne parametry do URL-a, dostanie jawny błąd „nieznany parametr”. Tak wymaga standard.
