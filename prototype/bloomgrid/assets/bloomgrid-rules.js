/* Bloomgrid r1-katalog — reguły gry (R-1, R-2). Czyste funkcje, bez DOM, czasu i sieci; oddzielone od widoku (S-1.2).
   Losowanie w prototypie używa ziarna z fixture (deterministyczne). */
(function () {
  'use strict';
  var N = 8;
  var COLORS = ['poppy', 'sun', 'leaf', 'drop', 'berry'];

  function shape(id, rows) {
    var cells = [];
    rows.forEach(function (r, y) { for (var x = 0; x < r.length; x++) if (r[x] === '#') cells.push([y, x]); });
    return { id: id, cells: cells, h: rows.length, w: Math.max.apply(null, rows.map(function (r) { return r.length; })) };
  }

  /* 37 kształtów z R-1.2; każda orientacja jest osobnym kształtem, bez obrotu i odbicia. */
  var SHAPES = [
    shape('single', ['#']),
    shape('line2-h', ['##']), shape('line2-v', ['#', '#']),
    shape('line3-h', ['###']), shape('line3-v', ['#', '#', '#']),
    shape('line4-h', ['####']), shape('line4-v', ['#', '#', '#', '#']),
    shape('line5-h', ['#####']), shape('line5-v', ['#', '#', '#', '#', '#']),
    shape('square2', ['##', '##']), shape('square3', ['###', '###', '###']),
    shape('rect-2x3', ['###', '###']), shape('rect-3x2', ['##', '##', '##']),
    shape('corner3-tl', ['##', '#.']), shape('corner3-tr', ['##', '.#']), shape('corner3-bl', ['#.', '##']), shape('corner3-br', ['.#', '##']),
    shape('l4-a', ['#.', '#.', '##']), shape('l4-b', ['###', '#..']), shape('l4-c', ['##', '.#', '.#']), shape('l4-d', ['..#', '###']),
    shape('j4-a', ['.#', '.#', '##']), shape('j4-b', ['#..', '###']), shape('j4-c', ['##', '#.', '#.']), shape('j4-d', ['###', '..#']),
    shape('t4-down', ['###', '.#.']), shape('t4-up', ['.#.', '###']), shape('t4-right', ['#.', '##', '#.']), shape('t4-left', ['.#', '##', '.#']),
    shape('s4-h', ['.##', '##.']), shape('s4-v', ['#.', '##', '.#']), shape('z4-h', ['##.', '.##']), shape('z4-v', ['.#', '##', '#.']),
    shape('corner5-tl', ['###', '#..', '#..']), shape('corner5-tr', ['###', '..#', '..#']), shape('corner5-bl', ['#..', '#..', '###']), shape('corner5-br', ['..#', '..#', '###'])
  ];
  var BY_ID = {};
  SHAPES.forEach(function (s) { BY_ID[s.id] = s; });

  var CODE = { '.': null, p: 'poppy', s: 'sun', l: 'leaf', d: 'drop', b: 'berry' };
  function parseBoard(rows) {
    var b = []; for (var i = 0; i < N * N; i++) b.push(null);
    (rows || []).forEach(function (r, y) { for (var x = 0; x < N; x++) b[y * N + x] = CODE[r[x] || '.']; });
    return b;
  }

  function canPlace(board, sh, r, c) {
    if (r < 0 || c < 0 || r + sh.h > N || c + sh.w > N) return false;
    return sh.cells.every(function (p) { return board[(r + p[0]) * N + c + p[1]] === null; });
  }
  function fitsAnywhere(board, sh) {
    for (var r = 0; r <= N - sh.h; r++) for (var c = 0; c <= N - sh.w; c++) if (canPlace(board, sh, r, c)) return true;
    return false;
  }

  /* Skutek położenia bez zmiany planszy: zajmowane pola, linie do wyczyszczenia, linie jednego koloru (R-1.4, R-1.6, R-2.4). */
  function analyze(board, sh, color, r, c) {
    if (!canPlace(board, sh, r, c)) return null;
    var next = board.slice();
    var cells = sh.cells.map(function (p) { var i = (r + p[0]) * N + c + p[1]; next[i] = color; return i; });
    var lines = [], x, y;
    for (y = 0; y < N; y++) {
      var row = []; for (x = 0; x < N; x++) row.push(y * N + x);
      if (row.every(function (i) { return next[i] !== null; })) lines.push({ kind: 'row', index: y, cells: row });
    }
    for (x = 0; x < N; x++) {
      var col = []; for (y = 0; y < N; y++) col.push(y * N + x);
      if (col.every(function (i) { return next[i] !== null; })) lines.push({ kind: 'col', index: x, cells: col });
    }
    lines.forEach(function (l) { l.mono = l.cells.every(function (i) { return next[i] === next[l.cells[0]]; }); });
    return { cells: cells, lines: lines, next: next };
  }

  /* Punkty ruchu: R-2.1 (pola), R-2.2 (80·k za linię), R-2.4 (×2 za linię jednego koloru), R-2.3 (seria). */
  function score(cellsPlaced, lines, combo, dry) {
    var k = lines.length, base = 0, mono = 0, comboBonus = 0;
    lines.forEach(function (l) { base += 80 * k; if (l.mono) mono += 80 * k; });
    if (k > 0) { combo += 1; dry = 0; if (combo >= 2) comboBonus = 50 * combo; }
    else { dry += 1; if (dry >= 3) { combo = 0; dry = 0; } }
    return { place: cellsPlaced, lines: base, mono: mono, combo: comboBonus, total: cellsPlaced + base + mono + comboBonus, comboAfter: combo, dryAfter: dry, cleared: k };
  }

  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  /* R-1.3: kształt i kolor losowane równomiernie i niezależnie; bez gwarancji zmieszczenia. */
  function deal(next) {
    return [0, 1, 2].map(function () { return { shape: SHAPES[Math.floor(next() * SHAPES.length)].id, color: COLORS[Math.floor(next() * COLORS.length)] }; });
  }

  function isOver(board, tray) {
    var left = tray.filter(function (p) { return p; });
    return left.length > 0 && !left.some(function (p) { return fitsAnywhere(board, BY_ID[p.shape]); });
  }

  /* Ruch: kładzie klocek ze slotu, czyści linie, liczy punkty, po trzech położeniach dobiera trójkę (R-1.1), sprawdza koniec (R-1.7). */
  function play(state, slot, r, c, next) {
    var p = state.tray[slot];
    if (!p) return null;
    var sh = BY_ID[p.shape], a = analyze(state.board, sh, p.color, r, c);
    if (!a) return null;
    var pts = score(sh.cells.length, a.lines, state.combo, state.dry);
    var board = a.next.slice(), cleared = {};
    a.lines.forEach(function (l) { l.cells.forEach(function (i) { cleared[i] = true; }); });
    Object.keys(cleared).forEach(function (i) { board[i] = null; });
    var tray = state.tray.slice(); tray[slot] = null;
    var dealt = false;
    if (tray.every(function (t) { return !t; })) { tray = deal(next); dealt = true; }
    var s2 = { board: board, tray: tray, score: Math.min(9999999, state.score + pts.total), combo: pts.comboAfter, dry: pts.dryAfter };
    s2.over = isOver(board, tray);
    return { state: s2, move: { cells: a.cells, lines: a.lines, clearedCells: Object.keys(cleared).map(Number), points: pts, dealt: dealt, placedBoard: a.next } };
  }

  /* R-2.5 (Q54): grupowanie cyfr jak Intl.NumberFormat — pl od 10 000 (twarda spacja, „1234”, „12 345”), en przecinek od 1 000 („1,234”).
     Własna funkcja, żeby render capture nie zależał od wersji ICU przeglądarki. */
  function formatNumber(n, locale) {
    var s = String(Math.max(0, Math.floor(n)));
    if (locale === 'pl' && s.length < 5) return s;
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, locale === 'pl' ? ' ' : ',');
  }

  window.BGRules = {
    N: N, COLORS: COLORS, SHAPES: SHAPES, shape: function (id) { return BY_ID[id]; },
    parseBoard: parseBoard, canPlace: canPlace, fitsAnywhere: fitsAnywhere, analyze: analyze,
    score: score, rng: rng, deal: deal, isOver: isOver, play: play, formatNumber: formatNumber
  };
})();
