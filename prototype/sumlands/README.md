# Sumlands — paczka prototypu `r1`

Pełna paczka r1: 3 ekrany, 11 stanów, 5 targetów i katalog komponentów. Uwzględnia akceptację `r1-katalog` i 4 poprawki z SUM-DESIGNER-ANSWERS-002.

## Uruchomienie

```sh
cd prototype
python3 -m http.server 8731 --bind 127.0.0.1
```

- Prototyp: http://127.0.0.1:8731/index.html?mode=user_preview&state=land-map.first-run&target=iphone-standard
- Capture: http://127.0.0.1:8731/index.html?mode=capture&state=<state_id>&target=<target_id>
- Katalog: http://127.0.0.1:8731/catalog.html?target=mac-wide

Nie otwieraj plików przez `file://`. Manifest i fixture ładują się przez HTTP.

## Zawartość

- `index.html`: render 11 stanów w `mode=capture` i `mode=user_preview`. W `user_preview` jest pasek narzędzi podglądu (`data-prototype-tool="preview-toolbar"`).
- `catalog.html`: 8 komponentów i przełącznik fixture `default` / `english`. Ma ten sam pasek bez wyboru stanu.
- `assets/sumlands-ui.js`, `assets/sumlands.css`: wspólny runtime, style i pasek. Reguły gry są w `SL.rules`, oddzielone od widoku.
- `assets/fixtures.json`: rejestr `default` (pl) i `english` (en). Poziom 4 Doliny Dwudziestki ma cele 11, 14, 17 i 7 list działań. Listy są kluczowane zbiorem niezbitych liczb (R-2.7).
- `assets/land-*-entry.svg` (16:9) i `assets/land-*-level-bg.svg` (2000×2000): 6 grafik zastępczych z opisem motywu.

## Pasek narzędzi podglądu

- Ciemne tło, biały tekst, przyklejony do dołu okna. Powierzchnia jest skalowana tak, żeby pasek jej nie zasłaniał.
- Rząd 1: „Katalog komponentów”, lista „Ekran / stan” (pogrupowana według `screen_id`), strzałki ‹ › (w kółko) i licznik `bieżący / wszystkie`.
- Rząd 2: przyciski `target_id szerokość×wysokość` w kolejności z manifestu. Wybrany ma jasne tło i ciemny tekst.
- Rząd 3: „Uwagi do tego stanu”. Uwagi zapisują się w `localStorage` (`sumlands.prototype.notes`) osobno dla każdej pary stan + profil. „Wyczyść” usuwa uwagę bieżącej pary. „Kopiuj” kopiuje wszystkie uwagi z `state_id` i `target_id`.
- Zmiana stanu albo profilu zapisuje `mode=user_preview&state=…&target=…` w adresie i otwiera ten widok.
- Katalog: rząd 1 ma „Katalog komponentów” (bieżąca strona) i odnośnik „Prototyp”. Profil ustawia szerokość katalogu na szerokość targetu i zapisuje `?target=` w adresie. Uwagi katalogu zapisują się jako `state_id: catalog`.

## Klikalność w `user_preview`

- Mapa: „Dolina Dwudziestki” → `land.valley-in-progress`. To jedyny stan ekranu krainy, więc z map innych niż `first-run` pojawia się o tym komunikat. Inne dostępne krainy pokazują komunikat „stan poza paczką r1”.
- Kraina: poziom 4 → `level.start`. Poziomy 1–3 pokazują komunikat. Zablokowane nie reagują. Powrót → `land-map.first-run`.
- Poziom: gra działa na żywo od każdego stanu `level.*`. Powrót → `land.valley-in-progress`. „Następny poziom” pokazuje komunikat (poziomu 5 nie ma w paczce).
- Komunikaty mają `data-prototype-tool` i nie występują w `mode=capture`.

## Raport kontroli

Wynik: **zielony**. Kontrolę wykonano na tej wersji plików, którą zawiera ZIP. Sumy kontrolne policzono po kontroli. Automatyczny przegląd strony zakończył się przed przekazaniem.

| Kontrola | Wynik |
|---|---|
| Układ ZIP-a | `prototype/` zawiera wszystkie pliki standardu i `assets/` (runtime, style, 6 SVG). Nie ma PNG, `captures/` ani plików kontroli. |
| Checksumy | `checksums.sha256` obejmuje wszystkie pliki oprócz siebie (SHA-256, ścieżki względem `prototype/`). |
| Manifest v3 | Ma dokładnie pola `schema_version` 3, `revision_id` `r1`, `id_migrations` `[]`, `targets`, `states`. 5 targetów, 11 stanów. Oba `fixture_id` istnieją w rejestrze. |
| Lokalne zasoby | Brak odwołań sieciowych i CDN. Czcionki systemowe. Render nie używa `Date` ani `Math.random`. |
| Anchor (55 par stan × target) | Każda para ma dokładnie 1 `element.product-work-surface` o rozmiarze targetu, `data-prototype-ready="true"` i 0 `data-prototype-tool` w dokumencie. DOM nie zmienia się bez interakcji. |
| Jawne błędy | Brak `target`, nieznany stan, target, tryb lub parametr oraz nieobsługiwany `capture_scenario` dają komunikat błędu i 0 anchorów. |
| Układ (55 par) | Żaden element nie wychodzi poza powierzchnię. Teksty mieszczą się w kartach, przyciskach, celach, polu sumy i komunikatach. Płytki, karty, poziomy i cele nie nachodzą na siebie. Na telefonach treść trzyma marginesy 59 / 34 / 16 px. Najmniejszy odstęp między płytkami: 22,7 px (`mobile-compact`). Przy dwóch płytkach w ścieżce (skala 1,06) jest to 17,8 px. |
| Poprawka 2 — fixture | Sprawdzono wszystkie podzbiory 7 płytek każdej listy. Każda lista pozwala zbić 1 albo 2 z pozostałych liczb wyłącznie ścieżką z 2 działań. Żadna ścieżka z 3–7 działań nie daje liczby celu. Żadna płytka nie ma wyniku równego liczbie celu. Zapis działań jest zgodny z wynikiem, liczby ≤ 20. Szczegóły: `changelog.md`. |
| Poprawka 3 — opis tła | Opis w 3 tłach poziomów zajmuje x 697–1303 i y 558–741 z 2000×2000. Mieści się w strefie 900×1250 i w widocznym kadrze każdego targetu (najwęższy: x 550–1450 na `mobile-compact` i `android-standard`). W `level.start` nie zasłaniają go nagłówek, cele, pole sumy ani płytki na żadnym targecie. Opis obrazków wejścia mieści się w środkowych 640 px z 1600 (kadr 128 px karty w rzędzie). |
| Poprawka 4 — pasek | `user_preview` (`land-map.first-run` · `mobile-compact`, `level.hit` · `mac-wide`): pasek ma `position: fixed` przy dolnej krawędzi, ciemne tło, biały tekst i 3 rzędy. Lista ma 11 stanów, licznik się zgadza. 5 profili jest w kolejności z manifestu, wybrany podświetlony. Pasek nie zasłania powierzchni. Uwagi zapisują się dla pary stan + profil, a „Wyczyść” je usuwa. › przechodzi do następnego stanu, a profil zmienia `target` w adresie. Katalog (`mac-wide`, `mobile-compact`): ten sam pasek bez wyboru stanu, szerokość katalogu równa targetowi, brak poziomego przewijania strony. |
| Ukrycie wyników | `level.start`, `level.start.en`, `level.drawing`: 0 plakietek wyników, pole sumy „?”, wynik nie występuje w atrybutach płytek. |
| Smoke test (`mobile-compact`) | 6+7 → „Wyszło 13” (pudło, ta sama lista). Jedna płytka → „Połącz co najmniej 2 działania”. 6+5 → „Wyszło 11 ✓”, 11 zbite, nowa lista [14, 17]. 7+10 → 17, lista [14]. 6+8 → 14, „Poziom ukończony”. W trakcie rysowania pole „?” i 0 plakietek. |
| Ręczne zrzuty | `level.start`, `level.drawing`, `level.miss`, `level.hit`, `level.complete`, mapy i kraina na `mobile-compact`, `mac-wide` i `mobile-large`. Wszystkie płytki i ich teksty są czytelne. |
| Konsola | 0 błędów: index (wszystkie pary) i katalog. |

Uwaga: host podglądu, który dokleja własne parametry do URL-a, dostanie jawny błąd „nieznany parametr”. Tak wymaga standard.
