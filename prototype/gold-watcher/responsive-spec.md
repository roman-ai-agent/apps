# Gold Watcher r2.12 — specyfikacja responsywności

Reguły rysowania wybiera jawny `target_id` (5 targetów produktu); układ wynika z szerokości targetu. Viewport capture jest tylko technicznym wymiarem renderowania.

- **wide**: szerokość ≥ 900 px
- **mobile**: < 900 px
- **compact** (modyfikator mobile): ≤ 374 px
- 440–900 px: układ mobile, treść max 560 px, wyśrodkowana
- wide < 1200 px dostępnej szerokości (np. z otwartym panelem progu): lewa kolumna 360 px zamiast 420 px
- wide (r2.4): cała treść `gold-overview` mieści się w 1440×900 bez przewijania we wszystkich stanach poza `gold-overview.source-error`. Tam baner błędu u góry przesuwa kolumny, a przewijanie jest dopuszczalne.

Wszystkie targety telefonu mają tę samą podróż i hierarchię.

Grupy targetów używane w tabelach: **wide** = `mac-wide`; **mobile** = `iphone-16`, `pixel-8`, `iphone-16-pro-max`; **compact** = `galaxy-s20`; **mobile-\*** = mobile + compact. Dokument opisuje reguły dla człowieka; o konkretnym renderze pary stan–target rozstrzyga DOM prototypu.

| screen / stan / component | Target | Kolumny i szerokość | Kolejność / pozycja | Widoczność / wariant | Scroll / minimum |
|---|---|---|---|---|---|
| gold-overview | mac-wide | Treść max 1216 px (+2×24 margines), 2 kolumny: lewa 420 (360), prawa fluid, odstęp 16 | Lewa: price-summary → signal-status → purchasing-power-summary. Prawa: range-selector → price-chart → purchasing-power-chart | Pełne warianty; panel progu = side-panel 400 px, treść się zwęża | Całość w 900 px bez scrolla (poza source-error); scroll tylko przy niższym oknie |
| gold-overview | iphone-16, pixel-8, iphone-16-pro-max | 1 kolumna, margines 16, odstęp 12, max 560 | pasek → country-selector → price-summary → signal-status → range-selector → price-chart → purchasing-power-summary → purchasing-power-chart | Warianty mobile; panel progu = bottom-sheet | Pasek sticky 56; range-selector sticky pod paskiem; cena + sygnał bez scrolla |
| gold-overview | galaxy-s20 | jak mobile, treść 328 | jak mobile | compact: cena 34, wykresy 180/160, przycisk progu pod tekstem sygnału (100%), trigger kraju bez waluty | jak mobile |
| gold-overview.alert-settings-editing (panel progu) | mac-wide | Panel 388 px, 12 px od prawej krawędzi i od paska (top 76), wysokość według treści, max 100% − 100 px, promień 16; treść 1040 px | nagłówek → opis → threshold-input → podgląd → uwaga lokalna → stopka (Anuluj, Zapisz) po prawej, tuż pod treścią | side-panel, niemodalny; wykres z podglądem markerów widoczny | Bez scrolla w 900 px (Anuluj/Zapisz ok. 586 px); scroll w panelu tylko gdy treść przekroczy max |
| gold-overview.alert-settings-editing (panel progu) | mobile-* | Pełna szerokość, max 85% wysokości, zaokrąglenie 22 | uchwyt → nagłówek → threshold-input → podgląd → uwaga → stopka Anuluj \| Zapisz (1:1) | bottom-sheet, modalny, tło przyciemnione, treść pod spodem inert | Stopka nad safe area; Esc / tło / Anuluj zamyka |
| app-shell (pasek) | wide / mobile | 64 / 56 px, szerokość treści | wide: nazwa · country-selector · [odstęp] · freshness · Odśwież. mobile: nazwa · Odśwież (ikona 44) | mobile: country-selector przeniesiony do treści | Sticky |
| country-selector | wide / mobile / compact | wide 3 × min 132, wys. 44; mobile 100%, wys. 48 | wide: pasek; mobile: pierwszy element treści | segmented / select (lista rozwijana pod przyciskiem, opcje 48) | — |
| range-selector | wide / mobile-* | wide: auto, wys. 34; mobile: 100%, 5 równych kolumn, wys. 44 | Bezpośrednio nad price-chart | default / compact (krótkie etykiety) | Bez scrolla poziomego; mobile sticky top 56 |
| segmented-control (jednostka) | wide / mobile | md 30 / touch 38, min 60 px na segment | Nagłówek price-summary, prawa strona | Widoczny gdy jest cena | — |
| price-summary | wide / mobile / compact | kolumna / 100%; padding 18 / 18; odstęp 10 / 14 | nagłówek → cena → cena pomocnicza → kafle drawdown i maks. 30 dni → świeżość | Cena 46 / 40 / 34 px | Cena nie łamie się |
| signal-status | wszystkie | Szerokość kontenera | Pod price-summary; below-threshold w trakcie wyciszenia: tytuł → bieżący stan → ostatni sygnał i wyciszenie (osobna linia) | compact: przycisk „Próg X%” 100% szer., 44 px | — |
| price-chart | wide / mobile / compact | Obszar 256 / 200 / 180 px; oś Y po prawej 56 / 44 px | Tytuł + meta → legenda (zawija się) → wykres → oś X | Etykiety X: 5 / 3. Tooltip: wide przy kursorze, 1 linia na wpis; mobile przypięty u góry wykresu, wyśrodkowany, max szerokość obszaru, tekst zawija się | touch-action pan-y: przeciąganie poziome = kursor |
| purchasing-power-summary | wide / mobile | kolumna / 100%; padding 16 / 16; odstęp 10 / 12 | wide: lewa kolumna; mobile: nad purchasing-power-chart | Szczegóły: widoczne / za disclosure; wartość 34 / 28 | — |
| purchasing-power-chart | wide / mobile / compact | Obszar 204 / 180 / 160 px | Pod price-chart / pod purchasing-power-summary | Legenda zawija się | jak price-chart |
| toast | wide / mobile | auto (max treść) / 100% − 32 | Dół, wyśrodkowany, 24 px | 4 s (w stanie otwartym przez `state=`: stały) | — |
| data-state-panel | wszystkie | slot: wymiary komponentu (min 180–220); banner: 100% treści | slot: w miejscu komponentu; banner: pod paskiem, nad kolumnami | Akcje zawijają się | — |
| preview-profile | — (narzędzie user_preview) | W dolnym panelu narzędzi (pełna szerokość okna), osobny wiersz kart | Panel na dole okna, pod obszarem z powierzchnią produktu | Widoczny tylko w user_preview; nie renderowany w `mode=capture` | Zmienia tylko target |
| product-work-surface (techniczny) | wszystkie | Równy viewportowi targetu | Ramka ekranu; jedyny panel narzędzi user_preview pod nią; w `mode=capture` jedyny element, lewy górny róg | Zawsze dokładnie jeden; user_preview: 1:1 (bez dopasowania do okna; przewijanie obszaru), promień 0, obrys 1 px; `mode=capture`: 1:1, promień 0, bez cienia, bez widocznego paska przewijania | Treść przewija się wewnątrz; capture = widoczny viewport |

## Elementy zależne od profilu

| element | Target | Kolumny i szerokość | Kolejność / pozycja | Widoczność / wariant | Scroll / minimum |
|---|---|---|---|---|---|
| element.bar-freshness | mac-wide | auto | W pasku przed Odśwież | Widoczny (gold-compact) | — |
| element.bar-freshness | mobile-* | — | — | Ukryty | — |
| element.data-refresh | mac-wide | auto, wys. 36 | Ostatni w pasku | secondary, etykieta „Odśwież” | — |
| element.data-refresh | mobile-* | 44 × 44 | Ostatni w pasku | icon, aria-label „Odśwież dane” | min. 44 × 44 |
| element.alert-settings-open | mac-wide, mobile | auto | W signal-status, obok tekstu | secondary | — |
| element.alert-settings-open | galaxy-s20 | 100% × 44 | W signal-status, pod tekstem | secondary | min. wys. 44 |
| element.pp-details-toggle | mac-wide | — | — | Ukryty (szczegóły zawsze widoczne) | — |
| element.pp-details-toggle | mobile-* | auto | W purchasing-power-summary, pod wartością | Widoczny, quiet | min. wys. 44 |
| element.alert-settings-panel | mac-wide | 388 px, wysokość według treści | Prawa krawędź, 12 px od krawędzi i paska | side-panel, niemodalny | Stopka tuż pod treścią |
| element.alert-settings-panel | mobile-* | 100%, max 85% wysokości | Dół ekranu | bottom-sheet, modalny | Stopka nad safe area |

## Widoczność stanów

V = widoczny · H = ukryty · D = nieaktywny · Z = zastąpiony · P = przeniesiony

| element | loading | refreshing | stale | source-error | unavailable | empty-range | alert-settings-editing | alert-settings-saved |
|---|---|---|---|---|---|---|---|---|

`gold-overview.ready` i `gold-overview.intraday-rebound`: wszystkie elementy V (bez panelu, toastu i data-state-panel); intraday-rebound różni się wyłącznie danymi fixture'u.

| country-selector | D | V | V | V | V | V | V wide · inert mobile | V |
| range-selector | D | V | V | V | D | V | V wide · inert mobile | V |
| element.gold-unit-selector | H | V | V | V | H | V | V wide · inert mobile | V |
| price-summary | Z szkielet | V bez zmian | V wariant stale | V wariant stale | Z data-state-panel | V | V | V |
| freshness-indicator (gold) | V „Pobieranie…” | V „Odświeżanie…” | V stale | V source-error | H | V | V | V |
| signal-status | Z szkielet | V | V + modyfikator stale | V + modyfikator stale | V unknown | V | V (zapisany X) | V nowy X |
| price-chart | Z szkielet | V | V, ostatni punkt pusty | V, ostatni punkt pusty | Z pusty obszar | V | V + podgląd markerów | V przeliczone markery |
| purchasing-power-summary | Z szkielet | V | V | V | H | V bez zmiany % | V | V |
| purchasing-power-chart | Z szkielet | V | V | V | Z pusty obszar | Z data-state-panel | V | V |
| element.data-refresh | D | D | V | V | V | V | V wide · inert mobile | V |
| element.alert-settings-open | H | V | V | V | V | V | V aria-expanded=true | V „Próg {X}” |
| alert-settings-panel | H | H | H | H | H | H | V | H |
| data-state-panel | H | H | H | V banner | V slot (warning) | V slot (info) | — | — |
| toast | H | H | H | H | H | H | H | V |

## Typografia ceny (r1.1; wide zmienione w r2.4)

| Target | price-summary: cena |
|---|---|
| wide (mac-wide) | 46 px / 50 |
| mobile (iphone-16, pixel-8, iphone-16-pro-max) | 40 px / 44 |
| compact (galaxy-s20) | 34 px / 38 |

## Targety i powierzchnia robocza

`element.product-work-surface` — selector `[data-element-id="element.product-work-surface"]`. Techniczna granica obrazu produktu; nie zmienia układu ani wyglądu produktu.

| target_id | wymiary | layout | logical_size | poprzednio (r1.3) |
|---|---|---|---|---|
| mac-wide | 1440×900 (do r2.3: 1440×932) | wide | 1440×900 | mac-wide |
| iphone-16 | 393×852 | mobile | 393×852 | iphone-standard |
| pixel-8 | 412×915 | mobile | 412×915 | android-standard |
| galaxy-s20 | 360×800 | mobile+compact | 360×800 | mobile-compact |
| iphone-16-pro-max | 440×956 | mobile | 440×956 | mobile-large |

## Stany rozwiniętych szczegółów mieszkań (r2.3)

Na targetach telefonicznych szczegóły obliczenia są domyślnie zwinięte za `element.pp-details-toggle`, a `element.housing-freshness` nie jest w DOM. Po rozwinięciu stan przechodzi do wariantu `*-housing-details-expanded`. Układ, dane i wygląd są identyczne z wynikiem kontrolki w r2.2. Na mac-wide szczegóły są zawsze widoczne, więc te stany są niedostępne (`states[].target_ids` w manifeście). `mode=capture` dla mac-wide kończy się błędem `state-unavailable-for-target`.

| state_id | stan bazowy | fixture | dostępny na |
|---|---|---|---|
| gold-overview.ready-housing-details-expanded | gold-overview.ready | default | iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max |
| gold-overview.refreshing-housing-details-expanded | gold-overview.refreshing | default | iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max |
| gold-overview.stale-housing-details-expanded | gold-overview.stale | stale | iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max |
| gold-overview.source-error-housing-details-expanded | gold-overview.source-error | stale | iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max |
| gold-overview.empty-range-housing-details-expanded | gold-overview.empty-range | short-housing-history | iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max |
| gold-overview.intraday-rebound-housing-details-expanded | gold-overview.intraday-rebound | intraday-rebound | iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max |

| element | stany bazowe (telefon) | stany *-housing-details-expanded (telefon) | mac-wide |
|---|---|---|---|
| pp-details-toggle | V (`aria-expanded="false"`) | V (`aria-expanded="true"`) | H |
| housing-freshness | H | V | V w 6 stanach bazowych |
