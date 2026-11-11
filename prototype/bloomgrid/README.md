# Bloomgrid — paczka prototypu `r3`

Rewizja r3 na bazie zatwierdzonej r2: nowy wygląd z grafik rastrowych z generatora (Q96, Q102–Q106) — kafle z kwiatami, drewniana skrzynia planszy, przyciski, sloty, karty i plakietki z jednego zestawu UI, trzy ilustrowane tła sceny; wyzwanie dnia ma wyróżnioną oprawę (wstęga z nazwą i datą, złote akcenty ramy planszy i kart, Q108), a gra klasyczna nie ma nazwy trybu w nagłówku (Q107, jedyny wyjątek od niezmienionych ID — `element.game.mode` nie jest renderowany w grze klasycznej). Zachowanie, układ (położenia i rozmiary), stany, komponenty i pozostałe publiczne ID bez zmian względem r2: 2 ekrany (`screen.home`, `screen.game`), 23 stany, 7 targetów, katalog 15 komponentów. Zmiany i lista obrazów z generatora: `changelog.md`.

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

- `index.html`: render 23 stanów w `mode=capture` i `mode=user_preview`. Każdy stan czyta scenariusz z `fixtures[fixture_id].scenarios[state_id bez „.en”]`. Ekran leży w przewijanym obszarze powierzchni (reguła układu r2). W `user_preview` jest pasek narzędzi podglądu (`data-prototype-tool="preview-toolbar"`).
- `catalog.html`: 15 komponentów, podstawy (kafle z kwiatami i mapowanie kolorów, kontrola dostępności, mały rozmiar, tła sceny, oprawa, ruch), tabela responsywności, lista stanów i przełącznik fixture `default` / `english`. Sekcja `component.board` ma demo na żywo.
- `assets/bloomgrid-rules.js`: reguły gry R-1 i R-2 (bez zmian od r2).
- `assets/bloomgrid-ui.js`, `assets/bloomgrid.css`: komponenty, geometria (`BG.geometry`, bez zmian), przeciąganie, pasek podglądu, style r3, lista obrazów wczytywanych na starcie (`BG.assets`, `BG.preload`), wybór tła (`BG.BACKGROUNDS`, `BG.HOME_BACKGROUND`, `BG.dailyBackground`).
- `assets/fixtures.json`: rejestr `default` (pl, 19 scenariuszy) i `english` (en, 4 scenariusze). r3 dodaje `daily_date_iso` (data ciągu wyzwania) i pole `background` scenariuszy gry klasycznej.
- `assets/img/*.webp`: 30 obrazów ładowanych przez prototyp: kafle `tile-<color>.webp` i małe `tile-<color>-s.webp`, `board-frame`, `cell-empty`, `btn-primary|secondary|danger`, `icon-home`, `slot`, `card`, `badge-combo`, `badge-coin`, `home-hero`, tła `bg-<tło>-phone|desktop`, oprawa wyzwania dnia `daily-ribbon`, `daily-sun-cap`, `daily-card` (Q108). Pochodzenie każdego pliku (źródło, wycinek, filtr, kodowanie): `assets/img/derived.json`.
- `assets/generated/<obraz>.png` + `<obraz>.json`: oryginały z generatora (`process image generate`) z plikami pochodzenia; `assets/prompts/<obraz>.txt`: prompty (Q106). Oryginały zostają w paczce jako źródła z pochodzeniem i nie są ładowane przez grę; limit 3 MB z Q105 dotyczy wyłącznie obrazów ładowanych przez grę (`assets/img/*.webp` i znak SVG), nie oryginałów (Q110).
- `assets/bloomgrid-mark.svg`: znak (rysunek własny, kolory kafli r3).

## Kolory i kwiaty (Q103)

Klucze kolorów w kodzie i DOM (`data-color`) bez zmian; zmienia się symbol na polu:

| Klucz | Kwiat (pl / en) | Kształt |
|---|---|---|
| `poppy` | mak / poppy | 4 szerokie okrągłe płatki, ciemnofioletowy środek |
| `sun` | słonecznik / sunflower | wieniec wąskich płatków, duży brązowy środek |
| `leaf` | koniczyna / clover | 4 liście w kształcie serca |
| `drop` | chaber / cornflower | kolczasta gwiazda płatków |
| `berry` | kwiat wiśni / cherry blossom | kwiaty o 5 płatkach z wcięciem (mały kafel: jeden kwiat) |

## Tła stanów (Q104)

Ekran startowy ma zawsze `blossom-wall`. Gra klasyczna losuje tło przy każdej nowej grze; w prototypie wynik losowania jest zapisany w scenariuszu stanu (pole `background`), więc capture jest powtarzalny. Wyzwanie dnia liczy tło z daty ciągu: numer dnia od 1970-01-01 (UTC) modulo 3 w kolejności `blossom-wall`, `garden-dusk`, `hedge`; dla 2026-11-10 wychodzi `garden-dusk`. Kadr: 9:16 dla powierzchni wyższej niż szeroka, 16:9 dla pozostałych (`responsive-spec.md`, „Tła na targetach”). Tło stanu ma atrybut `data-background` na `element.product-work-surface`.

| Stan | Tło |
|---|---|
| `home.first-run`, `home.first-run.en`, `home.with-records`, `home.resume-available`, `home.read-error` | `blossom-wall` (stałe) |
| `game.classic-start`, `game.classic-start.en` | `garden-dusk` |
| `game.classic-resumed` | `hedge` |
| `game.dragging-fits` | `blossom-wall` |
| `game.dragging-line-preview` | `garden-dusk` |
| `game.line-clear` | `hedge` |
| `game.color-bonus` | `blossom-wall` |
| `game.combo` | `garden-dusk` |
| `game.save-error` | `hedge` |
| `game.crash` | `blossom-wall` |
| `game.over-classic`, `game.over-classic.en` | `hedge` |
| `game.over-classic-new-record` | `garden-dusk` |
| `game.daily-start`, `game.daily-exit-confirm`, `game.over-daily`, `game.over-daily.en`, `game.over-daily-new-day` | `garden-dusk` (z daty 2026-11-10) |

## Klikalność w `user_preview`

- Start: „Kontynuuj” → `game.classic-resumed`, „Nowa gra” → `game.classic-start`, „Wyzwanie dnia” → `game.daily-start`. W stanach `.en` przejście trafia do wersji `.en`, gdy istnieje.
- Gra działa na żywo w każdym stanie `game.*`: przeciąganie, podgląd, czyszczenie, punkty, seria, nowa trójka. Koniec gry otwiera panel końca z wynikiem z tej rozgrywki. W stanach z klatką (przeciąganie, czyszczenie) pierwsze chwycenie klocka zastępuje klatkę stanem gry.
- Wyjście: w trybie klasycznym → `home.resume-available`, w wyzwaniu dnia → dialog „Zakończyć podejście?” („Graj dalej” go zamyka, „Zakończ” → `home.with-records`).
- Panel końca: „Zagraj ponownie” → start tego samego trybu, „Do startu” → `home.with-records`.
- `game.save-error`: „Spróbuj ponownie” symuluje udany zapis — komunikat znika. `game.crash`: „Uruchom ponownie” → `home.resume-available`.
- Na `phone-landscape` ekran przewija się w pionie; przy przeciąganiu klocka strona się nie przewija. Tło zostaje nieruchome.
- Komunikaty narzędzia mają `data-prototype-tool` i nie występują w `mode=capture`.

## Raport kontroli

Wynik własnej kontroli Designera: **zielony**. Capture procesu i pomiar anchoru wykonuje Lider; wynik zostanie wpisany tutaj.

| Kontrola | Wynik |
|---|---|
| Capture procesu r3 (Lider) | `process capture full --source prototype`, targety `iphone-standard` i `mac-wide`, wszystkie 23 stany z manifestu: outcome succeeded, 46/46 par, failed []. package_sha256 `7c13b446df2283a2c97f1017cce30c73c519c88ead1dabdb0e1b5ff25ce3c70a`. Anchor `element.product-work-surface`: 393×852 we wszystkich 23 stanach `iphone-standard`, 1440×900 we wszystkich 23 stanach `mac-wide` — zgodnie z `targets[]` manifestu. Artefakty: `tmp/captures/prototype/7c13b446…/<target>/<state>/`. Lider obejrzał ręcznie `game.daily-exit-confirm` (`iphone-standard`) i `home.first-run` (`mac-wide`) bez uwag. |
| Baza r2 | Zatwierdzona, commit a6ec2ba; capture r2 50/50. |
| Układ paczki | `prototype/` zawiera wszystkie pliki standardu; `assets/`: 2 skrypty, style, fixture, 1 SVG, `img/` (30 WebP + `derived.json`), `generated/` (14 PNG + 14 plików pochodzenia; `daily-board-frame` nieużyty, opis w changelogu), `prompts/` (11 promptów). Nie ma `captures/` ani plików kontroli. |
| Checksumy | `checksums.sha256` obejmuje wszystkie pliki oprócz siebie (SHA-256, ścieżki względem `prototype/`). Sumy policzono po kontroli. |
| Manifest v3 | Dokładnie pola `schema_version` 3, `revision_id` `r3`, `id_migrations` `[]`, `targets`, `states`. 7 targetów, 23 stany. Każdy `fixture_id` istnieje w rejestrze, każdy stan ma scenariusz i tło. |
| Lokalne zasoby | Brak odwołań sieciowych i CDN (0 żądań poza lokalnym serwerem i `data:` w 161 parach). Czcionki systemowe. Render nie używa czasu bieżącego ani `Math.random`; tło wyzwania dnia liczy `Date.UTC` ze stałej daty z fixture. |
| Obrazy (Q105, Q110) | 30 plików WebP ładowanych przez grę, razem 1,00 MB (limit 3 MB dotyczy tylko tych plików, Q110); wszystkie w `BG.assets`, wczytane przed `data-prototype-ready`. 0 nieudanych żądań i 0 odpowiedzi ≥ 400. Oryginały PNG z generatora (16 MB) zostają w `assets/generated/` jako źródła z pochodzeniem i nie są ładowane. |
| Anchor (161 par stan × target, Playwright Chromium) | Każda para ma dokładnie 1 `element.product-work-surface` o rozmiarze targetu, `data-prototype-ready="true"`, bez `data-interaction-id` i bez `data-prototype-tool` w dokumencie. DOM nie zmienia się przez 250 ms bez interakcji. |
| Geometria względem r2 (receipt 157, 169) | 161 par, 9716 elementów z `data-element-id` w r2: 91 różnic, wszystkie „`element.game.mode`: tylko r2” — 13 stanów gry klasycznej × 7 targetów (Q107). Pozostałe położenia i rozmiary identyczne z r2 (różnica ≤ 0,5 px). Rama skrzyni, akcenty wyzwania, wstęga i tabliczki pod tekstem wychodzą poza elementy tylko wizualnie. |
| Nagłówek (Q107, Q108; `header.cjs`, receipty 158, 170 i partia 4) | 7 targetów × 10 stanów. Gra klasyczna: brak `element.game.mode`, przycisk wyjścia przy lewej, rekord przy prawej krawędzi treści (0 px), środek pusty. Wyzwanie dnia: wstęga nie nachodzi na przycisk wyjścia ani na tabliczkę rekordu. Pierwszy przebieg pokazał na `mobile-compact` nachodzenie wstęgi na tabliczkę rekordu (3 px PL, 10 px EN) — wada, poprawiona: wstęga na telefonach wystaje w bok 11 px zamiast 22. Etykieta „Wynik” odsłonięta na wszystkich targetach. Wiersze „ZLE” z `labelVisible: false` w stanach z panelem końca i dialogiem (`game.over-classic`, `game.daily-exit-confirm`, `game.over-daily`, `.en`, `-new-day`) to oczekiwane zasłonięcie przez zasłonę i kartę nakładki, nie wada: skrypt sprawdza teraz etykietę z chwilowo ukrytą nakładką. Ostatni przebieg (receipt 176): 70 par, 0 problemów. |
| Jawne błędy | Brak `target`, nieznany stan, target, tryb lub parametr oraz nieobsługiwany `capture_scenario` dają komunikat błędu i 0 anchorów. |
| ID i interakcje | Bez duplikatów `data-element-id` w żadnej parze. 2–5 interakcji na stan, każda z `data-action` i `data-expected-effect`; kontrakty bez zmian w katalogu. |
| Układ (161 par) | Żaden element, klocek, plakietka, komunikat ani karta nie wychodzi poza powierzchnię ani poza swój obszar przewijania; brak poziomego przewijania. Plakietka „×2” nie nachodzi na żadne pole. Teksty mieszczą się (także EN). Nagłówek, wynik, plansza, komunikat zapisu, trójka i menu nie nachodzą na siebie. |
| Smoke test przejść i gry (`user_preview`) | Wszystkie przejścia z r2 prowadzą do tych samych stanów; `game.dragging-line-preview`: 8 pól `bonus`, 8 `clear`, 2 pola `place`, 1 klocek; ruch na r6 c8 daje wynik 6842. Konsola bez błędów. |
| Katalog (`mac-wide`, `mobile-compact`) | 16 sekcji, brak poziomego przewijania strony, żaden okaz nie wychodzi poza ramkę, konsola bez błędów. |
| Q99: pole zajęte : puste | Puste pole (obraz przyciemniony do 62%, mediana `#2F140B`). Lico kafla (mediana obrazu poza kwiatem) : puste: mak 3,84, słonecznik 9,81, koniczyna 5,47, chaber 3,65, kwiat wiśni 4,21 — wszystkie ≥ 3:1. Mediana całego kafla z kwiatem i konturem: chaber 2,85, pozostałe ≥ 3,19 (chaber ma ciemny fioletowy kwiat; rozróżnia go jasna krawędź połysku i kształt). |
| Q99: daltonizm (Machado 2009, pełne nasilenie, ΔE76) | Lico: protanopia 14,4 (chaber–wiśnia), deuteranopia 30,0, tritanopia 17,6 (mak–wiśnia); kwiat: 18,2 / 17,7 / 25,6. Mak–kwiat wiśni: lico 71,2 / 62,2 / 17,6, kwiat 49,2 / 41,2 / 59,1 — plus inna sylwetka kwiatu. r2 dla porównania: 15,8 / 24,3 / 18,9. Kafel koniczyny przesunięty do szmaragdu, bo limonka dawała przy protanopii 8,8 ze słonecznikiem. Małe kafle: lico 9,2 / 19,7 / 22,5, kwiat 24,4 / 24,0 / 21,7. |
| Q99: symbol na połysku | Kontur kwiatu (10. percentyl jasności środka) : najjaśniejszy połysk lica (90. percentyl pasa u góry): mak 6,12, słonecznik 10,25, koniczyna 3,71, chaber 11,00, kwiat wiśni 5,33; małe kafle ≥ 7,22. |
| Q99: tekst | Tabliczka pod tekstem na tle sceny (najgorszy przypadek: czarne tło pod tabliczką): tekst 12,83, etykiety 6,94. Przycisk główny 5,70 (ciemnozielony na zielonej pigułce), drugorzędny 12,40, ostrzegawczy 7,79, plakietka serii 9,53, „×2” 7,13, karta 14,20 / 7,67, ikona domu 6,68. |
| Q99: znaki R-1.4 poza kolorem | Podgląd położenia: biała obwódka 2 px; linia do wyczyszczenia: zasłona i ciągła podwójna obwódka (jasna `#FFF1B8` + ciemna `#1A1008`, lepsza z nich ≥ 4,1:1 na każdym polu); linia ×2: paski, przerywana obwódka i plakietka „×2”. |
| Q108: oprawa wyzwania (`q99-daily.cjs`, receipt 161) | Wstęga: nazwa trybu `#FFF6E2` 8,65:1, data `#FFD978` 6,84:1 na śliwkowym środku wstęgi (tekst leży poniżej pasa połysku; dolna lamówka pod datą). Rama: złota listwa `#F7C948` : drewno 8,72:1, z ciemnym obrysem. Rozróżnialność od podglądu i premii: listwa i słońca leżą tylko na ramie (od −frame-out do 0 px), pierwsze pole zaczyna się 9 / 12 px od krawędzi planszy; listwa vs jasna obwódka linii `#FFF1B8` ΔE76 40,7, słońce vs obwódka ΔE76 51,6; plakietka „×2” na listwie: ciemna obwódka monety : listwa 6,24:1, tekst „×2” : moneta 9,08:1; słońce vs moneta ΔE76 10,3 i inne miejsce (narożnik ramy kontra środek boku przy rzędzie). Karta wyzwania: tekst 13,72, opis 7,41, „Zakończ” 8,64. |
| Etykieta „Wynik” (poprawka techniczna 2) | Na mac-wide tabliczka cyfr leżała nad etykietą (zasłonięta); teraz pod etykietą i cyframi. `#5A4630` na tabliczce ≥ 6,94:1 (najgorszy przypadek: czarne tło pod tabliczką) na wszystkich targetach; odsłonięcie sprawdza `header.cjs`. |
| Q102: klocki 15 px | Na `mobile-compact` (pole trójki 15 px, DPR 1) pełne kafle rozmywały kwiat wiśni i koniczynę; trójka używa uproszczonych kafli `tile-*-s.webp` (jeden duży kwiat z grubym konturem) — wszystkie 5 kwiatów rozpoznawalne przy 15 px (obejrzane zrzuty DPR 1 i 3). Plansza i przeciągany klocek (pole ≥ 36 px) mają pełne kafle. |
| Ręczne zrzuty r3 (obejrzane) | Wszystkie 23 stany na `iphone-standard` i `mac-wide` na arkuszach zbiorczych (z odczytanym tłem każdego stanu, zgodnym z tabelą wyżej); w pełnym rozmiarze `game.dragging-line-preview` (oba targety), `home.resume-available` (`iphone-standard`), `game.over-classic-new-record` (`mac-wide`), `game.daily-exit-confirm` i `game.crash` (`iphone-standard`), `home.with-records` (`mac-wide`); `game.classic-start` i `home.with-records` na `tablet-narrow`; `game.classic-start` na `phone-landscape`; `game.save-error` na `mobile-compact`; trójka na `mobile-compact` w powiększeniu; sekcje katalogu `foundation.palette`, `component.board`, `component.button`. |
| Zrzuty po poprawkach Q107–Q110 (obejrzane) | `game.daily-start`, `game.over-daily`, `game.daily-exit-confirm`, `game.classic-start` (`iphone-standard`, `mac-wide`); nagłówek wyzwania w powiększeniu (`iphone-standard`, `mac-wide`, `mobile-compact` EN); karta dialogu wyjścia (`iphone-standard`); sekcje katalogu `component.board`, `component.dialog`, `component.mode-label`. Poprawione po obejrzeniu: dolna lamówka wstęgi przecinała datę; rama karty wyzwania (30 px) nachodziła na tytuł dialogu — teraz 22 px, z czego 6 px na zewnątrz. |
| Konsola | 0 błędów: index (161 par i smoke testy) i katalog (receipty 159, 168). |
| Narzędzia | Pierwsza tura r3 (przed decyzją F-16): wprost w powłoce Designera uruchomione wycinki i usuwanie tła (`tmp/r3-build/slice.cjs`, Playwright), konwersje `cwebp` 27 plików WebP, wszystkie skrypty Playwright kontroli, geometrii, pomiarów pikseli i zrzutów (`check-r3.cjs`, `geom.cjs`, `pixels.cjs`, `crop.cjs`, `catshot.cjs`, `sheet.cjs`, `catwide.cjs`) oraz `boxes.cjs` dla obrazów wyzwania na początku tury poprawek. Po decyzji F-16 wycinki, konwersje, kontrola, pomiary i zrzuty uruchamia Lider przez `process command run`: receipty `tmp/project/commands/157–175` i partia 4. `process image generate` (14 wywołań, 1,96 USD) wołał Designer. Wcześniej hook odrzucał Designerowi `process command run` (zgłoszone Liderowi procesu). |
| Partia 4 (po ostatnich poprawkach stylu; receipty 176–179) | `header.cjs`: 70 par (7 targetów × 10 stanów), 0 problemów. `check-r3.cjs --shots`: 161 par, `problems: []`, konsola i katalog bez błędów, zrzuty wszystkich stanów odświeżone. Wycinki nagłówka wyzwania (`iphone-standard`, `mobile-compact` EN) obejrzane: wstęga nie nachodzi na przycisk wyjścia ani na rekord, lamówki nad nazwą i pod datą; na `mobile-compact` EN napis „Daily challenge” wypełnia prawie całą szerokość wstęgi (małe słońca wstęgi wchodzą pod krawędzie liter, tekst czytelny). |

Uwaga: host podglądu, który dokleja własne parametry do URL-a, dostanie jawny błąd „nieznany parametr”. Tak wymaga standard.
