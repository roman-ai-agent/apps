# Gold Watcher r3.3 — specyfikacja responsywności

Układ wybiera jawny `target_id`. Strona przewija się pionowo w jednym kontenerze, pod stałym nagłówkiem.

## mac-wide 1440×900
- **Nagłówek:** 60 px — marka, „Dane do …” i Odśwież.
- **Siatka:** 2 kolumny `5fr 7fr`, odstęp 16/20 px, margines 20/24 px. Obszary:

  | rząd | lewa kolumna | prawa kolumna |
  | --- | --- | --- |
  | 1 | `intro` | `price` (wyrównany do prawej i do dołu) |
  | 2 | `left`: sygnał → ocena → ostatnie 18 miesięcy | `stc`: wykres stanu z legendą zawsze widoczną |
  | 3–6 | `rest` → `scn` → `hist` → `sec` (na całą szerokość) | |
- **Sygnał:** zaczyna się ok. 180 px od góry anchoru.
- **Wykres stanu:** obszar danych 290 px, oś Y 46 px, pasek kierunku 9 px, osie co kwartał.
- **Tabela sytuacji:** siatka 5 kolumn (Sytuacja, Okres, 3 postacie). Sytuacja jest podana raz na grupę. Wybrany wiersz ma niebieskie tło i lewą krawędź.
- **Wykres wartości i bólu:** 200 + 150 px, jeden nad drugim, wspólna oś lat.
- **Wykres historii:** obszar danych 360 px.
- **Kalkulator:** tabela 5 kolumn. Statystyka: 3 karty w rzędzie. Historia sygnałów: tabela 7 kolumn bez przewijania.

## Telefony: iphone-16 393×852, pixel-8 412×915, galaxy-s20 360×800, iphone-16-pro-max 440×956
- **Nagłówek:** marka, a pod nią „Dane do …”; Odśwież 44 px po prawej.
- **Kolejność:** intro (tytuł 22 px i pierwsze zdanie) → kurs → sygnał → ocena → ostatnie 18 miesięcy → wykres stanu → reszta wstępu → sytuacje → historia → sekcje.
- **Sygnał:** zaczyna się 207–233 px od góry, więc znak i zdanie „co znaczy” są na pierwszym ekranie na każdym telefonie.
- **Ocena:** statusy w jednej kolumnie.
- **Wykres stanu:**
  - obszar danych 230 px, oś Y 40 px, co druga etykieta kwartału;
  - legenda jest sekcją rozwijaną „Co widać na wykresie ostatnich 18 miesięcy”, domyślnie zwiniętą;
  - linia klucza (cena, średnie, dołek, kupno, sprzedaż) jest zawsze widoczna.
- **Tabela sytuacji:** bez poziomego przewijania:
  - nagłówek grupy (sytuacja i opis) w osobnym wierszu;
  - wiersz okresu jest blokiem z trzema kolumnami postaci: wynik 16 px pogrubiony, czas w bólu i dopiski 12 px;
  - przyciski progu paniki mają 44 px.
- **Wykres wartości i bólu:** 170 + 130 px, oś Y 38 px; przy ponad 6 etykietach lat pokazuję co drugą.
- **Wykres historii:** obszar danych 250 px. Zakresy i warstwy mają 44 px; zakres przewija się poziomo, jeśli brakuje miejsca.
- **Kalkulator:** `select` 44 px i przyciski czasu 44 px. Tabela jest listą kart postaci (Wynik ze 100 $, Największy spadek, Czas w bólu, Uwagi).
- **Statystyka:** karty postaci jedna pod drugą; zakresy i ból z etykietą horyzontu 52 px.
- **Historia sygnałów:** tabela 7 kolumn przewija się poziomo **we własnym kontenerze** (min. 640 px); strona się nie przewija.

## Minima
- Tekst co najmniej 11,5 px (osie), treść 13–15 px.
- Cele dotyku na telefonach co najmniej 44 px; nagłówki sekcji rozwijanych 48 px.

## Stany
- **details-expanded:** wszystkie sekcje rozwinięte, w tym „Liczby…” i — na telefonie — legenda wykresu stanu. Kalkulator 2000 / 10 lat pokazuje wykres wartości i bólu. Długość strony to ok. 4,5 ekranu na `mac-wide` i ok. 14 ekranów na `galaxy-s20`.
- **loading / unavailable:** pod wstępem karta `data-state` (560 px na `mac-wide`, cała szerokość na telefonie); bez sygnału i wykresów.
- **stale:** baner `data-state` na całą szerokość nad wstępem. Sygnał zostaje na pierwszym ekranie (335 px na `mac-wide`, 422 px na `galaxy-s20`).
- **refreshing:** dane widoczne; „Odśwież” zajęty, nagłówek „Odświeżanie… · Dane do …”.

## Reguła odstępów wykresów (r3.2)
- **Pole wykresu a tekst:** między polem wykresu (obszar danych z osiami i paskiem kierunku) a każdym sąsiednim tekstem — nagłówkiem, tytułem przypadku, legendą, podpisem lub wskazówką — jest **16 px**. Taki sam odstęp jest między wykresem wartości a wykresem bólu.
- **Wiersze tekstu:** między wierszami tekstu w obrębie jednego bloku jest 4–8 px.
- **Zakres:** `status-chart`, `value-chart`, `pain-chart`, `price-chart`, zakresy i ból w `synthetic-stats`; na wszystkich targetach.

## Legenda `chart-legend`
- **Budowa:** ramka #e2e8f0, tło #f6f8fb (`pain`: #fbf6f4), promień 10 px, odstęp wewnętrzny 10/12 px, krój 12 px.
- **Próbki:** zawijają się w wierszu (odstęp 6/14 px). Objaśnienia stoją pod linią.
- **`status`:** na `mac-wide` objaśnienia 1–3 są zawsze widoczne; na telefonie rozwijane przyciskiem 44 px wewnątrz legendy.

## Wykres bólu
- **Wysokość:** 130 px na `mac-wide`, 110 px na telefonie.
- **Oś:** 0% na dole; nad polem tytuł osi „↑ spadek od szczytu”.

## Skala osi Y (r3.3)
Etykiety i linie siatki osi Y są liczone z tej samej funkcji skali co serie: ten sam zakres z marginesem i ta sama wysokość obszaru rysowania. Kolumna osi ma dokładnie wysokość pola wykresu. Etykieta leży na wysokości swojej wartości z dokładnością do 2 px.
