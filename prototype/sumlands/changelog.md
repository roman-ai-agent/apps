# Changelog

## r1

- Rewizja bazowa: `r1-katalog` (zaakceptowana 2026-10-23)
- Rewizja docelowa: `r1`
- Migracje ID: brak (`id_migrations: []`)

### Poprawki z SUM-DESIGNER-ANSWERS-002

1. Kontrola przed przekazaniem: raport w `README.md` opisuje tę wersję. Sumy kontrolne policzono po kontroli.
2. Fixture poziomu 4 (R-1.7, R-2.3): ułożono od nowa wszystkie 7 list. Każda pozwala zbić 1 albo 2 z pozostałych liczb wyłącznie ścieżką z 2 działań:

| Niezbite | Lista | Ścieżki z 2 działań |
|---|---|---|
| 11, 14, 17 | 11+4, 20−7, 3+3, 17−10, 7+1, 15−2, 3+2 | 11 = 6+5; 14 = 6+8 |
| 14, 17 | 12−9, 6+1, 11−1, 5+4, 17−5, 4+2, 15−2 | 17 = 7+10 |
| 11, 17 | 7+6, 19−4, 3+2, 4−3, 7+3, 13−5, 4+3 | 11 = 1+10; 17 = 10+7 |
| 11, 14 | 13−7, 2+1, 13−3, 3+1, 14−5, 3+3, 17−4 | 14 = 10+4 |
| 11 | 18−9, 9+3, 17−12, 3+1, 13−3, 5−4, 9−6 | 11 = 1+10 |
| 14 | 4+2, 9−2, 2+1, 17−4, 8+2, 15−13, 7+1 | 14 = 6+8 |
| 17 | 13−3, 14−13, 7−5, 7+1, 15−5, 2+1, 16−7 | 17 = 8+9 |

   Pozostałe płytki nie tworzą ścieżek do pozostałych liczb. Żadna ścieżka z 3 lub więcej działań nie daje liczby celu.
3. Opis grafik zastępczych: tła poziomów mają opis w 5 krótkich wierszach w środku strefy bezpiecznej (x 697–1303 z 2000). Obrazki wejścia mają opis w środkowych 640 px. Usunięto metadane z plików SVG.
4. Pasek narzędzi podglądu według standardu zastępuje selektor `preview-profile` w `index.html`. Katalog ma ten sam pasek bez wyboru stanu.

### Dodane ID

Ekrany: `screen.land-map`, `screen.land`

Stany: `land-map.first-run`, `land-map.first-run.en`, `land-map.two-lands-open`, `land-map.all-complete`, `land.valley-in-progress`, `level.start.en`, `level.drawing`, `level.miss`, `level.hit`, `level.complete`

Elementy (`screen.land-map`): `element.land-map.app-name`, `element.land-map.title`, `element.land-map.coming-soon`, `element.land-map.lands`, `element.land-map.land-1`…`element.land-map.land-3`

Elementy (`screen.land`): `element.land.back`, `element.land.title`, `element.land.topic`, `element.land.image`, `element.land.levels`, `element.land.level-1`…`element.land.level-10`

Interakcje: `interaction.land-map.open-land-1`…`interaction.land-map.open-land-3`, `interaction.land.back`, `interaction.land.open-level-1`…`interaction.land.open-level-10`

Narzędzia prototypu (poza powierzchnią): `data-prototype-tool="preview-toolbar"`, `data-prototype-tool="preview-toast"`

### Usunięte narzędzia prototypu

`data-prototype-tool="preview-profile"`. To nie było publiczne ID produktu, więc nie wymaga migracji.

## r1-katalog

- Rewizja bazowa: brak
- Rewizja docelowa: `r1-katalog`
- Dodane: 8 komponentów, `screen.level`, `level.start`, fixture `default` i `english`, 5 targetów, elementy i interakcje `screen.level`.
