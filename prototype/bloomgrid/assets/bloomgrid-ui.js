/* Bloomgrid r1-katalog — wspólny runtime widoku (index.html i catalog.html): komponenty katalogu, przeciąganie, pasek podglądu.
   Reguły gry są w assets/bloomgrid-rules.js (BGRules). Render nie używa sieci, czasu ani losowości; liczniki czasu startują tylko po interakcji. */
(function () {
  'use strict';
  var R = window.BGRules;
  var BG = {};

  function h(tag, attrs) {
    var el = document.createElement(tag);
    var a = attrs || {};
    Object.keys(a).forEach(function (k) {
      var v = a[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'style' && typeof v === 'object') {
        Object.keys(v).forEach(function (sk) { if (sk.indexOf('--') === 0) el.style.setProperty(sk, v[sk]); else el.style[sk] = v[sk]; });
      } else if (k.indexOf('on') === 0 && typeof v === 'function') {
        el.addEventListener(k.slice(2).toLowerCase(), v);
      } else if (k === 'html') {
        el.innerHTML = v;
      } else {
        el.setAttribute(k, v === true ? '' : String(v));
      }
    });
    (function add(list) {
      list.forEach(function (c) {
        if (c === null || c === undefined || c === false) return;
        if (Array.isArray(c)) return add(c);
        el.append(c instanceof Node ? c : document.createTextNode(String(c)));
      });
    })(Array.prototype.slice.call(arguments, 2));
    return el;
  }
  BG.h = h;
  BG.fmt = function (t, v) { return String(t).replace(/\{(\w+)\}/g, function (_, k) { return v[k] === undefined ? '' : v[k]; }); };
  BG.num = function (n, loc) { return R.formatNumber(n, loc); };
  BG.cellsWord = function (n, S) {
    if (n === 1) return S.cells_one;
    var d = n % 10, dd = n % 100;
    return d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? S.cells_few : S.cells_many;
  };
  function merge(a, b) { var r = {}; [a, b].forEach(function (x) { Object.keys(x || {}).forEach(function (k) { r[k] = x[k]; }); }); return r; }
  function ia(o) { return o.interactionId ? { 'data-interaction-id': o.interactionId, 'data-action': o.action, 'data-expected-effect': o.expected } : {}; }

  var ICONS = {
    home: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 11.2 12 4.5l8 6.7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 10v9.5h4.2v-5.3h2.6v5.3h4.2V10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="3.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M3.5 10h17M8 3.5v4M16 3.5v4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="15" r="2" fill="currentColor"/></svg>',
    sprout: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 21v-8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M12 13.5C11.6 9 8.6 6.6 4.5 6.8c.2 4.3 3.3 6.8 7.5 6.7ZM12.2 11.6c.6-4.2 3.6-6.4 7.4-6-.4 4-3.5 6.2-7.4 6Z" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5Z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    resume: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M19 12a7 7 0 1 1-2.1-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M17.8 3.6v4.2h-4.2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6-4.5-4.2 6.1-.7Z" fill="currentColor"/></svg>',
    warn: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 3.5 21.5 20h-19Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 10v4.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.3" r="1.3" fill="currentColor"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M12 2.5c.8 5 2.5 6.7 7.5 7.5-5 .8-6.7 2.5-7.5 7.5-.8-5-2.5-6.7-7.5-7.5 5-.8 6.7-2.5 7.5-7.5Z" fill="currentColor"/></svg>',
    /* r5 (Q143): głośnik włączony / wyciszony; (Q129): klocek się nie mieści — koło z ukośną kreską. */
    'sound-on': '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.6 7.6 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    'sound-off': '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m15.5 9.5 5 5M20.5 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    'no-fit': '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M6 18 18 6" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>'
  };
  BG.icon = function (name, size) {
    var w = h('span', { 'class': 'bg-ic', 'aria-hidden': 'true', html: ICONS[name] });
    w.style.display = 'inline-flex';
    if (size) { w.firstChild.setAttribute('width', size); w.firstChild.setAttribute('height', size); }
    return w;
  };
  /* r3 (Q105): wszystkie obrazy ładowane na starcie, przed gotowością renderu; potem gra działa bez sieci. */
  BG.BACKGROUNDS = ['blossom-wall', 'garden-dusk', 'hedge'];
  BG.HOME_BACKGROUND = 'blossom-wall';
  BG.assets = ['assets/bloomgrid-mark.svg', 'assets/img/home-hero.webp', 'assets/img/board-frame.webp', 'assets/img/cell-empty.webp', 'assets/img/slot.webp', 'assets/img/card.webp',
    'assets/img/btn-primary.webp', 'assets/img/btn-secondary.webp', 'assets/img/btn-danger.webp', 'assets/img/icon-home.webp', 'assets/img/badge-combo.webp', 'assets/img/badge-coin.webp',
    'assets/img/daily-ribbon.webp', 'assets/img/daily-sun-cap.webp', 'assets/img/daily-card.webp']
    .concat(['poppy', 'sun', 'leaf', 'drop', 'berry'].reduce(function (a, c) { return a.concat(['assets/img/tile-' + c + '.webp', 'assets/img/tile-' + c + '-s.webp', 'assets/img/petal-' + c + '.webp']); }, []))
    .concat(BG.BACKGROUNDS.reduce(function (a, b) { return a.concat(['assets/img/bg-' + b + '-phone.webp', 'assets/img/bg-' + b + '-desktop.webp']); }, []));
  /* Tło wyzwania dnia (Q104): wyliczane z daty ciągu (RRRR-MM-DD): numer dnia od 1970-01-01 modulo 3 w kolejności BG.BACKGROUNDS. */
  BG.dailyBackground = function (iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return null;
    return BG.BACKGROUNDS[Math.floor(Date.UTC(+m[1], +m[2] - 1, +m[3]) / 86400000) % BG.BACKGROUNDS.length];
  };
  BG.preload = function () {
    return Promise.all(BG.assets.map(function (src) { var i = new Image(); i.src = src; return i.decode().catch(function () {}); }));
  };

  /* Geometria według targetu (responsive-spec.md). */
  /* Reguła układu (r2, Q65): szerokość okna < 1024 px — układ telefonu w kolumnie do 440 px, wyśrodkowanej;
     od 1024 px — układ mac-wide. Wysokość nie zmienia układu: przy niskim oknie (telefon w poziomie) strona się przewija. */
  BG.WIDE_MIN = 1024;
  BG.PHONE_COL_MAX = 440;
  BG.geometry = function (tg) {
    var wide = tg.width >= BG.WIDE_MIN, pad = wide ? 8 : 6, gap = wide ? 4 : 3;
    var colW = wide ? 1040 : Math.min(tg.width, BG.PHONE_COL_MAX);
    var contentW = wide ? 1040 : colW - 32;
    var cell = wide ? 64 : Math.floor((Math.min(contentW, 420) - 9 * gap - 2 * pad) / 8);
    var boardW = 8 * cell + 9 * gap + 2 * pad;
    var trayW = wide ? 380 : contentW, trayGap = 12, slotW = (trayW - 2 * trayGap) / 3, pg = 2;
    var pc = Math.floor((slotW - 16 - 4 * pg) / 5);
    /* r4: sloty o całkowitej szerokości i na całkowitych pozycjach (szerokość tak dobrana, żeby oba odstępy były równe i całkowite),
       więc trzy sloty rysują się piksel w piksel tak samo: iphone 111 / odstęp 14, mobile-compact 100 / 14, android i mac-wide 118 / 13,
       mobile-large, tablet-narrow i phone-landscape 128 / 12. Pole klocka w trójce bez zmian; klocek 5×5 dalej się mieści. */
    var slotPx = Math.floor(slotW);
    if ((trayW - 3 * slotPx) % 2) slotPx -= 1;
    return { wide: wide, colW: colW, pad: pad, gap: gap, cell: cell, boardW: boardW, pc: pc, pg: pg, slotH: 5 * pc + 4 * pg + 18, trayGap: trayGap, slotPx: slotPx, slotGap: (trayW - 3 * slotPx) / 2, lift: Math.max(44, cell + 8) };
  };

  /* component.board-cell */
  BG.cell = function (o) {
    return h('div', { 'class': 'bg-cell', 'data-component-id': 'component.board-cell', 'data-element-id': o.elementId, 'data-variant': o.color ? 'filled' : 'empty', 'data-color': o.color || null, 'data-preview': o.preview || null, 'data-line': o.line || null, 'data-clearing': o.clearing ? 'true' : null });
  };
  function paintCell(el, s) {
    el.setAttribute('data-variant', s.color ? 'filled' : 'empty');
    var col = s.color || s.previewColor;
    if (col) el.setAttribute('data-color', col); else el.removeAttribute('data-color');
    if (s.preview) el.setAttribute('data-preview', s.preview); else el.removeAttribute('data-preview');
    if (s.line) el.setAttribute('data-line', s.line); else el.removeAttribute('data-line');
    if (s.clearing) el.setAttribute('data-clearing', 'true'); else el.removeAttribute('data-clearing');
  }

  /* component.board */
  BG.board = function (o) {
    var g = o.geo, S = o.S, prefix = o.elementPrefix;
    var grid = h('div', { 'class': 'bg-grid' });
    var badges = h('div', { 'class': 'bg-badges' });
    /* r5: warstwa efektów (płatki, złoty błysk, kopie plakietek) — dekoracja nad polami, bez ID i bez wpływu na układ. */
    var fx = h('div', { 'class': 'bg-fx', 'aria-hidden': 'true' });
    var el = h('div', { 'class': 'bg-board', 'data-component-id': 'component.board', 'data-element-id': o.elementId, role: 'img', style: { '--cell': g.cell + 'px', '--gap': g.gap + 'px', '--pad': g.pad + 'px', width: g.boardW + 'px' } }, grid, badges, fx);
    var cells = [];
    for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) {
      var ce = BG.cell({ elementId: prefix + 'cell-r' + (r + 1) + '-c' + (c + 1) });
      cells.push(ce); grid.append(ce);
    }
    var api = { el: el, grid: grid, cells: cells, fx: fx, geo: g };
    /* Położenie pola i plakietki „×2” w układzie planszy (px od lewego górnego rogu planszy). */
    api.cellBox = function (i) { var pitch = g.cell + g.gap, start = g.pad + g.gap; return { x: start + (i % 8) * pitch, y: start + Math.floor(i / 8) * pitch, s: g.cell }; };
    api.badgePos = function (l) {
      var pitch = g.cell + g.gap, start = g.pad + g.gap;
      return { x: l.kind === 'row' ? g.boardW - start + 1 : start + l.index * pitch + g.cell / 2, y: l.kind === 'row' ? start + l.index * pitch + g.cell / 2 : start - 1 };
    };
    api.render = function (board, view) {
      view = view || {};
      var place = {}, line = {}, clearing = {};
      if (view.preview) {
        view.preview.cells.forEach(function (i) { place[i] = true; });
        view.preview.lines.forEach(function (l) { l.cells.forEach(function (i) { if (line[i] !== 'bonus') line[i] = l.mono ? 'bonus' : 'clear'; }); });
      }
      (view.clearing || []).forEach(function (i) { clearing[i] = true; });
      cells.forEach(function (ce, i) {
        paintCell(ce, { color: place[i] ? null : board[i], previewColor: place[i] ? view.previewColor : null, preview: place[i] ? 'place' : null, line: line[i], clearing: clearing[i] });
      });
      badges.replaceChildren();
      var lines = view.preview ? view.preview.lines : (view.bonusLines || []);
      lines.filter(function (l) { return l.mono; }).forEach(function (l) {
        /* Plakietka nie zasłania żadnego pola (Q59): rząd — od prawej krawędzi ramki na wysokości rzędu;
           kolumna — nad górną krawędzią ramki nad kolumną. Pola zaczynają się pad + gap od krawędzi planszy. */
        var bp = api.badgePos(l);
        badges.append(h('span', { 'class': 'bg-badge is-' + l.kind, style: { left: bp.x + 'px', top: bp.y + 'px' } }, h('span', { 'aria-hidden': 'true' }, S.bonus_badge), h('span', { 'class': 'bg-sr' }, S.bonus_sr)));
      });
      var filled = board.filter(function (x) { return x; }).length;
      el.setAttribute('aria-label', BG.fmt(S.board_sr, { n: filled }));
    };
    return api;
  };

  /* component.piece */
  BG.piece = function (o) {
    var sh = R.shape(o.piece.shape), S = o.S, n = sh.cells.length;
    var on = {}; sh.cells.forEach(function (p) { on[p[0] * 10 + p[1]] = true; });
    var el = h('div', merge({ 'class': 'bg-piece', 'data-component-id': 'component.piece', 'data-element-id': o.elementId, 'data-variant': o.variant || 'tray', 'data-shape': sh.id, 'data-color': o.piece.color, role: 'img', 'aria-roledescription': S.piece_role, 'aria-label': BG.fmt(S.piece_sr, { n: n, cells: BG.cellsWord(n, S), color: S.colors[o.piece.color] }), style: { '--w': sh.w, '--cell': o.cell + 'px', '--gap': o.gap + 'px' } }, ia(o)));
    for (var y = 0; y < sh.h; y++) for (var x = 0; x < sh.w; x++) {
      var c = h('div', { 'class': 'bg-cell' + (on[y * 10 + x] ? '' : ' is-gap'), 'data-variant': on[y * 10 + x] ? 'filled' : 'empty', 'data-color': on[y * 10 + x] ? o.piece.color : null, 'aria-hidden': 'true' });
      el.append(c);
    }
    el._shape = sh;
    return el;
  };

  /* component.piece-tray */
  BG.tray = function (o) {
    var g = o.geo;
    var el = h('div', { 'class': 'bg-tray', 'data-component-id': 'component.piece-tray', 'data-element-id': o.elementId, role: 'group', 'aria-label': o.S.tray_sr, style: { '--slot-h': g.slotH + 'px', '--tray-gap': g.slotGap + 'px', '--slot-w': g.slotPx + 'px' } });
    var slots = [0, 1, 2].map(function () { var s = h('div', { 'class': 'bg-slot' }); el.append(s); return s; });
    return {
      el: el, slots: slots, pieces: [null, null, null],
      render: function (tray, makePiece) {
        var self = this;
        tray.forEach(function (p, i) {
          slots[i].replaceChildren();
          slots[i].setAttribute('data-variant', p ? 'filled' : 'empty');
          if (!p) { slots[i].append(h('span', { 'class': 'bg-sr' }, o.S.slot_empty_sr)); self.pieces[i] = null; return; }
          var pe = makePiece(p, i);
          slots[i].append(pe); self.pieces[i] = pe;
        });
      }
    };
  };

  /* component.score-display */
  BG.scoreDisplay = function (o) {
    var val = h('span', { 'class': 'bg-score-value' });
    var el = h('div', { 'class': 'bg-score', 'data-component-id': 'component.score-display', 'data-element-id': o.elementId, 'data-variant': o.variant || 'score' },
      h('span', { 'class': 'bg-score-label' }, o.label), val);
    var api = { el: el, set: function (n) { val.textContent = BG.num(n, o.loc); } };
    api.set(o.value);
    return api;
  };

  /* component.combo-badge — tylko przy c ≥ 2 (R-2.7) */
  BG.comboBadge = function (o) {
    if (o.c < 2) return null;
    return h('div', { 'class': 'bg-combo', 'data-component-id': 'component.combo-badge', 'data-element-id': o.elementId }, BG.icon('sprout', 20), BG.fmt(o.S.combo, { c: o.c }));
  };

  /* component.move-points — tylko po ruchu z czyszczeniem (R-2.6) */
  BG.movePoints = function (o) {
    var p = o.points, S = o.S, loc = o.loc;
    if (!p || p.cleared < 1) return null;
    var notes = [];
    if (p.combo) notes.push(h('span', { 'class': 'bg-points-note', 'data-note': 'combo' }, BG.icon('sprout', 13), BG.fmt(S.move_combo, { n: BG.num(p.combo, loc) })));
    if (p.mono) notes.push(h('span', { 'class': 'bg-points-note', 'data-note': 'mono' }, BG.icon('sparkle', 12), BG.fmt(S.move_mono, { n: BG.num(p.mono, loc) })));
    return h('div', { 'class': 'bg-points', 'data-component-id': 'component.move-points', 'data-element-id': o.elementId, role: 'status', 'aria-live': 'polite' },
      h('span', { 'class': 'bg-points-total', 'aria-hidden': 'true' }, '+' + BG.num(p.total, loc)),
      h('span', { 'class': 'bg-sr' }, BG.fmt(S.move_points_sr, { n: BG.num(p.total, loc) })),
      notes.length ? h('span', { 'class': 'bg-points-notes' }, notes) : null);
  };

  /* component.icon-button */
  BG.iconButton = function (o) {
    return h('button', merge({ type: 'button', 'class': 'bg-icon-btn', 'data-component-id': 'component.icon-button', 'data-element-id': o.elementId, 'aria-label': o.label, title: o.label, 'data-demo': o.demo, onclick: o.onClick }, ia(o)), BG.icon(o.icon || 'home'));
  };
  /* component.sound-toggle (r5, Q143) — trwały przełącznik: aria-pressed="true" = dźwięk włączony. Prototyp dźwięku nie odtwarza. */
  BG.soundToggle = function (o) {
    var on = o.on !== false;
    var btn = h('button', merge({ type: 'button', 'class': 'bg-sound-btn', 'data-component-id': 'component.sound-toggle', 'data-element-id': o.elementId, 'data-variant': on ? 'on' : 'muted', 'aria-pressed': on ? 'true' : 'false', 'aria-label': o.S.sound, title: o.S.sound, 'data-demo': o.demo }, ia(o)), BG.icon(on ? 'sound-on' : 'sound-off', 22));
    btn.addEventListener('click', function () {
      if (o.inert) return;
      on = !on;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.setAttribute('data-variant', on ? 'on' : 'muted');
      btn.replaceChildren(BG.icon(on ? 'sound-on' : 'sound-off', 22));
      if (o.onChange) o.onChange(on);
    });
    return btn;
  };
  /* component.no-moves-step (r5, Q128–Q131) — krok końca gry: warstwa na całą powierzchnię (stuknięcie, klik albo Esc pokazuje panel od razu)
     z komunikatem nad trójką. Komunikat ustawia layout() nad górną krawędzią trójki. */
  BG.noMovesStep = function (o) {
    var msg = h('div', { 'class': 'bg-nomoves-msg', 'data-element-id': o.elementId + '.message', role: 'status', 'aria-live': 'assertive' }, o.S.no_moves);
    var el = h('div', merge({ 'class': 'bg-nomoves', 'data-component-id': 'component.no-moves-step', 'data-element-id': o.elementId }, ia(o)), msg);
    el._msg = msg;
    return el;
  };
  /* component.praise (r5, Q139) — pochwała po ruchu z 2 albo 3+ liniami; chwilowa (800 ms), bez interakcji. */
  BG.praise = function (o) {
    return h('div', { 'class': 'bg-praise', 'data-component-id': 'component.praise', 'data-element-id': o.elementId, 'data-variant': o.lines >= 3 ? 'three' : 'two', role: 'status', 'aria-live': 'polite' }, o.lines >= 3 ? o.S.praise_3 : o.S.praise_2);
  };
  /* component.mode-label */
  BG.modeLabel = function (o) {
    return h('div', { 'class': 'bg-mode', 'data-component-id': 'component.mode-label', 'data-element-id': o.elementId, 'data-variant': o.variant },
      h('span', {}, o.S.mode_daily),
      o.variant === 'daily' ? h('span', { 'class': 'bg-mode-sub' }, o.S.daily_date) : null);
  };
  /* component.menu-button */
  BG.menuButton = function (o) {
    return h('button', merge({ type: 'button', 'class': 'bg-menu-btn', 'data-component-id': 'component.menu-button', 'data-element-id': o.elementId, 'data-variant': o.variant || 'secondary', 'data-demo': o.demo, onclick: o.onClick }, ia(o)),
      h('span', { 'class': 'bg-menu-btn-ic' }, BG.icon(o.icon, 24)),
      h('span', { 'class': 'bg-menu-btn-text' }, h('span', { 'class': 'bg-menu-btn-label' }, o.label), o.meta ? h('span', { 'class': 'bg-menu-btn-meta' }, o.meta) : null));
  };
  /* component.button */
  BG.button = function (o) {
    return h('button', merge({ type: 'button', 'class': 'bg-btn', 'data-component-id': 'component.button', 'data-element-id': o.elementId, 'data-variant': o.variant || 'primary', 'data-demo': o.demo, onclick: o.onClick }, ia(o)), o.label);
  };
  /* component.wordmark */
  BG.wordmark = function (o) {
    return h('div', { 'class': 'bg-wordmark', 'data-component-id': 'component.wordmark', 'data-element-id': o.elementId, style: o.style || null },
      h('div', { 'class': 'bg-wordmark-row' }, h('img', { src: 'assets/bloomgrid-mark.svg', alt: '', draggable: 'false' }), h('h1', { 'class': 'bg-wordmark-name', style: { margin: 0 } }, o.S.app_name)),
      o.tagline === false ? null : h('span', { 'class': 'bg-wordmark-tag' }, o.S.tagline));
  };
  /* component.dialog — potwierdzenie końca podejścia (R-3.5) */
  BG.dialog = function (o) {
    var S = o.S, tid = o.elementId + '.title', bid = o.elementId + '.body';
    var ip = o.prefix.indexOf('element.') === 0 ? o.prefix.replace('element.', 'interaction.') : null;
    var keep = BG.button({ elementId: o.prefix + 'keep', variant: 'primary', label: S.confirm_keep, interactionId: ip && ip + 'keep', action: 'tap / Escape', expected: 'zamyka dialog; gra trwa bez zmian', onClick: o.onKeep, demo: o.demoKeep });
    var end = BG.button({ elementId: o.prefix + 'end', variant: 'danger', label: S.confirm_end, interactionId: ip && ip + 'end', action: 'tap', expected: 'kończy podejście bez zapisu wyniku do rekordu; navigate screen.home', onClick: o.onEnd });
    var card = h('div', { 'class': 'bg-card' + (o.row ? ' is-row' : ''), 'data-component-id': 'component.dialog', 'data-element-id': o.elementId, role: 'alertdialog', 'aria-modal': 'true', 'aria-labelledby': tid, 'aria-describedby': bid },
      h('h2', { id: tid }, S.confirm_title), h('p', { id: bid }, S.confirm_body), h('div', { 'class': 'bg-actions' }, keep, end));
    card.addEventListener('keydown', function (e) { if (e.key === 'Escape' && o.onKeep) { e.preventDefault(); o.onKeep(); } });
    return o.scrim === false ? card : h('div', { 'class': 'bg-scrim' }, card);
  };
  /* component.game-over-panel — szablon: mode, score, record, newRecord, dailyInfo (until-midnight | new-available) (R-3.4) */
  BG.gameOverPanel = function (o) {
    var S = o.S, loc = o.loc, tid = o.elementId + '.title', p = o.prefix, ip = p.indexOf('element.') === 0 ? p.replace('element.', 'interaction.') : null;
    var newDay = o.mode === 'daily' && o.dailyInfo === 'new-available';
    var again = BG.button({ elementId: p + 'play-again', variant: 'primary', label: S.play_again, interactionId: ip && ip + 'play-again', action: 'tap', expected: o.mode === 'daily' ? 'navigate game.daily-start (nowe podejście, ciąg bieżącej daty)' : 'navigate game.classic-start (nowa gra klasyczna)', onClick: o.onAgain, demo: o.demoAgain });
    var home = BG.button({ elementId: p + 'to-home', variant: 'secondary', label: S.to_home, interactionId: ip && ip + 'to-home', action: 'tap', expected: 'navigate screen.home', onClick: o.onHome });
    /* r5 (Q130): różnica do rekordu sprzed gry (recordBefore) — „Do rekordu zabrakło N”, przy równym wyniku „Rekord wyrównany”;
       przy nowym rekordzie plakietka „Nowy rekord!”; po podejściu innego dnia (R-3.6) bez różnicy. */
    var before = o.recordBefore, gap = null;
    if (!newDay && !o.newRecord && typeof before === 'number' && before > 0) {
      gap = o.score === before ? h('div', { 'class': 'bg-over-gap', 'data-element-id': p + 'record-gap', 'data-variant': 'tied' }, S.record_tied)
        : o.score < before ? h('div', { 'class': 'bg-over-gap', 'data-element-id': p + 'record-gap', 'data-variant': 'gap' }, BG.fmt(S.record_gap, { n: BG.num(before - o.score, loc) })) : null;
    }
    var card = h('div', { 'class': 'bg-card bg-over' + (o.row ? ' is-row' : ''), 'data-component-id': 'component.game-over-panel', 'data-element-id': o.elementId, 'data-variant': o.mode, role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': tid, 'aria-describedby': p + 'reason' },
      /* r5 (Q107): gra klasyczna to tryb domyślny — tytuł bez nazwy trybu; wyzwanie dnia z nazwą. */
      h('h2', { id: tid, 'class': 'bg-over-title' }, o.mode === 'daily' ? S.game_over + ' · ' + S.mode_daily : S.game_over),
      /* r5 (Q130): powód końca — zawsze (także po podejściu innego dnia). */
      h('p', { id: p + 'reason', 'class': 'bg-over-reason', 'data-element-id': p + 'reason' }, BG.icon('no-fit', 16), h('span', {}, S.over_reason)),
      /* R-3.6 (Q44): podejście zakończone innego dnia nie zmienia rekordu — panel nie pokazuje rekordu ani „Nowy rekord!”. */
      o.newRecord && !newDay ? h('span', { 'class': 'bg-newrec', 'data-element-id': p + 'new-record' }, BG.icon('star', 18), S.new_record) : null,
      h('div', { 'class': 'bg-over-score', 'data-element-id': p + 'score' }, BG.num(o.score, loc)),
      newDay ? null : h('div', { 'class': 'bg-over-record', 'data-element-id': p + 'record' }, (o.mode === 'daily' ? S.record_daily : S.record) + ' ' + BG.num(o.record, loc)),
      gap,
      o.mode === 'daily' ? h('div', { 'class': 'bg-daily-info', 'data-element-id': p + 'daily-info', 'data-variant': o.dailyInfo }, BG.icon('calendar', 20), o.dailyInfo === 'new-available' ? S.daily_new_available : S.daily_until_midnight) : null,
      h('div', { 'class': 'bg-actions' }, again, home));
    return o.scrim === false ? card : h('div', { 'class': 'bg-scrim' }, card);
  };

  /* component.alert — komunikaty błędów: save-error (R-4.5), read-error (R-4.6), crash (R-5.3) */
  BG.alert = function (o) {
    var S = o.S, v = o.variant;
    var text = { 'save-error': S.save_error, 'read-error': S.read_error, crash: S.crash }[v];
    var action = null;
    if (v === 'save-error') action = BG.button({ elementId: o.elementId + '.retry', variant: 'secondary', label: S.retry, interactionId: o.interactionId, action: 'tap', expected: 'ponawia zapis gry; po udanym zapisie komunikat znika, po nieudanym zostaje; gra trwa', onClick: o.onAction, demo: o.demo });
    if (v === 'crash') action = BG.button({ elementId: o.elementId + '.restart', variant: 'light', label: S.restart, interactionId: o.interactionId, action: 'tap', expected: 'przeładowuje grę z ostatnim zapisem: ekran startowy (home.resume-available, gdy zapis gry klasycznej istnieje)', onClick: o.onAction, demo: o.demo });
    return h('div', { 'class': 'bg-alert' + (action ? '' : ' is-plain'), 'data-component-id': 'component.alert', 'data-element-id': o.elementId, 'data-variant': v, role: 'alert' },
      h('span', { 'class': 'bg-alert-ic' }, BG.icon('warn', 20)), h('span', { 'class': 'bg-alert-text' }, text), action);
  };

  /* r5 (Q135–Q139): animacje. Czasy i krzywe: responsive-spec.md, sekcja „Ruch”. Każda animacja leży na warstwie efektów
     albo na klasie elementu, którą zdejmuje timer — stan gry jest już końcowy, więc animacje nie blokują gry (Q136).
     reduced = prefers-reduced-motion: wyłącznie zmiana przezroczystości do 150 ms. mode=capture: animacji nie ma. */
  BG.MOTION = { settle: 150, bloom: 450, mono: 600, pop: 250, countUp: 400, deal: 240, dealStep: 80, praise: 800, rain: 1000, dim: 300, step: 1500, fade: 150 };
  BG.fx = {
    reduced: function () { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); },
    /* Klasa animacji na elemencie, zdejmowana po czasie (restart przy powtórzeniu). */
    play: function (el, cls, ms, delay) {
      if (!el) return;
      el.classList.remove(cls); void el.offsetWidth;
      if (delay) el.style.animationDelay = delay + 'ms';
      el.classList.add(cls);
      setTimeout(function () { el.classList.remove(cls); if (delay) el.style.animationDelay = ''; }, ms + (delay || 0) + 30);
    },
    fade: function (el) { BG.fx.play(el, 'fx-fade', BG.MOTION.fade); },
    /* (1) Osadzenie: położone pola lekko sprężynują, 150 ms. */
    settle: function (cells, reduced) { cells.forEach(function (c) { if (reduced) BG.fx.fade(c); else BG.fx.play(c, 'fx-settle', BG.MOTION.settle); }); },
    /* (2) Rozkwit: kopia kafla na warstwie efektów rozchyla się i znika, 3 płatki w kolorze kafla opadają; 450 ms. */
    bloom: function (board, indices, colorOf, reduced, ms) {
      ms = ms || BG.MOTION.bloom;
      indices.forEach(function (i, n) {
        var b = board.cellBox(i), col = colorOf(i);
        var tile = h('div', { 'class': 'bg-cell fx-tile' + (reduced ? ' fx-fadeout' : ' fx-bloom'), 'data-variant': 'filled', 'data-color': col, style: { left: b.x + 'px', top: b.y + 'px', width: b.s + 'px', height: b.s + 'px', '--cell': b.s + 'px', animationDuration: (reduced ? BG.MOTION.fade : ms) + 'ms' } });
        board.fx.append(tile);
        setTimeout(function () { tile.remove(); }, (reduced ? BG.MOTION.fade : ms) + 40);
        if (reduced) return;
        for (var k = 0; k < 3; k++) {
          var a = ((i * 47 + k * 120 + n * 13) % 360) * Math.PI / 180, size = Math.round(b.s * 0.5);
          var pe = h('img', { 'class': 'fx-petal', src: 'assets/img/petal-' + col + '.webp', alt: '', style: { left: (b.x + b.s / 2) + 'px', top: (b.y + b.s / 2) + 'px', width: size + 'px', height: size + 'px', animationDuration: ms + 'ms',
            '--dx': Math.round(Math.cos(a) * b.s * 0.75) + 'px', '--dy': Math.round(Math.sin(a) * b.s * 0.35 + b.s * 0.8) + 'px', '--rot': ((k ? 1 : -1) * (90 + (i * 31) % 120)) + 'deg' } });
          board.fx.append(pe);
          (function (x) { setTimeout(function () { x.remove(); }, ms + 40); })(pe);
        }
      });
    },
    /* (3) Linia jednego koloru: złoty błysk przesuwa się wzdłuż linii, plakietka „×2” podskakuje; 600 ms (jeden błysk na linię). */
    sweep: function (board, line, S, reduced) {
      var g = board.geo, pitch = g.cell + g.gap, start = g.pad + g.gap, len = 8 * g.cell + 7 * g.gap;
      var box = line.kind === 'row' ? { left: start, top: start + line.index * pitch, width: len, height: g.cell } : { left: start + line.index * pitch, top: start, width: g.cell, height: len };
      if (!reduced) {
        var sw = h('div', { 'class': 'fx-sweep is-' + line.kind, style: { left: box.left + 'px', top: box.top + 'px', width: box.width + 'px', height: box.height + 'px', animationDuration: BG.MOTION.mono + 'ms' } });
        board.fx.append(sw); setTimeout(function () { sw.remove(); }, BG.MOTION.mono + 40);
      }
      var bp = board.badgePos(line);
      var bd = h('span', { 'class': 'bg-badge is-' + line.kind + (reduced ? ' fx-fadeout' : ' fx-badge'), style: { left: bp.x + 'px', top: bp.y + 'px', animationDuration: (reduced ? BG.MOTION.fade : BG.MOTION.mono) + 'ms' } }, S.bonus_badge);
      board.fx.append(bd); setTimeout(function () { bd.remove(); }, (reduced ? BG.MOTION.fade : BG.MOTION.mono) + 40);
    },
    /* (4) Plakietka serii wyskakuje, 250 ms. */
    pop: function (el, reduced) { if (reduced) BG.fx.fade(el); else BG.fx.play(el, 'fx-pop', BG.MOTION.pop); },
    /* (6) Wynik dolicza się do nowej wartości (ease-out), najwyżej 400 ms. */
    countUp: function (api, from, to, reduced) {
      if (reduced || from === to) { api.set(to); return; }
      var t0 = null, ms = BG.MOTION.countUp;
      if (api._raf) cancelAnimationFrame(api._raf);
      var step = function (t) {
        if (t0 === null) t0 = t;
        var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
        api.set(Math.round(from + (to - from) * e));
        if (k < 1) api._raf = requestAnimationFrame(step); else api._raf = null;
      };
      api._raf = requestAnimationFrame(step);
    },
    /* (7) Nowa trójka wjeżdża do slotów kolejno: start co 80 ms, każdy wjazd 240 ms. */
    deal: function (pieces, reduced) {
      pieces.forEach(function (pe, i) { if (!pe) return; if (reduced) BG.fx.fade(pe); else BG.fx.play(pe, 'fx-deal', BG.MOTION.deal, i * BG.MOTION.dealStep); });
    },
    /* Pochwała (Q139): nad środkiem planszy, 800 ms; najwyżej jedna na ruch. */
    praise: function (host, el, reduced) {
      host.append(el);
      el.classList.add(reduced ? 'fx-praise-reduced' : 'fx-praise');
      setTimeout(function () { el.remove(); }, BG.MOTION.praise + 40);
    },
    /* (8) Nowy rekord: deszcz płatków na panelu, 1 s. */
    rain: function (card, reduced) {
      if (reduced) return;
      var layer = h('div', { 'class': 'fx-rain', 'aria-hidden': 'true' });
      var cols = ['berry', 'poppy', 'sun', 'drop', 'leaf'];
      for (var i = 0; i < 18; i++) {
        layer.append(h('img', { 'class': 'fx-rain-petal', src: 'assets/img/petal-' + cols[i % 5] + '.webp', alt: '', style: { left: ((i * 53) % 100) + '%', animationDelay: ((i * 37) % 400) + 'ms', animationDuration: (600 - (i * 37) % 400 + 400) + 'ms', '--rot': ((i % 2 ? 1 : -1) * (120 + i * 17 % 160)) + 'deg' } }));
      }
      card.append(layer);
      setTimeout(function () { layer.remove(); }, BG.MOTION.rain + 60);
    }
  };

  /* Rozgrywka na żywo: plansza + trójka + wynik + seria + punkty ruchu, przeciąganie (R-1.4, R-1.5, R-1.8). */
  BG.play = function (o) {
    var g = o.geo, S = o.S, loc = o.loc, st = o.state, next = R.rng(o.seed), surface = o.surface, ids = o.ids;
    var board = o.board, tray = o.tray, scoreApi = o.score, strip = o.strip;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var busy = false, drag = null, pointsTimer = null;
    var comboHost = h('div', { 'class': 'bg-strip-left' }), pointsHost = h('div', { 'class': 'bg-strip-right' });
    strip.replaceChildren(comboHost, pointsHost);

    function expected(i) {
      return 'przeciąganie: klocek w rozmiarze pól planszy (dotyk: nad palcem); nad miejscem, gdzie się mieści, podświetla pola i linie do wyczyszczenia (×2 inaczej); puszczenie tam kładzie klocek, inaczej wraca do slotu ' + (i + 1);
    }
    function makePiece(p, i) {
      var pe = BG.piece({ piece: p, cell: g.pc, gap: g.pg, S: S, elementId: ids.piece + (i + 1), variant: o.interactive ? 'tray' : 'static', interactionId: ids.drag + (i + 1), action: 'drag (dotyk albo mysz)', expected: expected(i) });
      if (o.interactive) pe.addEventListener('pointerdown', function (e) { start(e, i, pe); });
      return pe;
    }
    function paintCombo(bump) {
      var prev = comboHost.firstChild ? st.combo : 0;
      comboHost.replaceChildren();
      var cb = BG.comboBadge({ c: st.combo, S: S, elementId: ids.combo });
      if (cb) { comboHost.append(cb); if (bump) BG.fx.pop(cb, reduced); } /* (4) wzrost licznika */
      return prev;
    }
    var staticGhost = null, staticView = false;
    /* Widok stanu z fixture: zwykła plansza, klatka czyszczenia (frame) albo statyczne przeciąganie (drag). */
    function paintAll() {
      var v = o.view || {};
      if (v.frame) board.render(v.frame.placedBoard, { clearing: v.frame.clearing, bonusLines: v.frame.lines });
      else board.render(st.board, {});
      tray.render(st.tray, makePiece);
      scoreApi.set(st.score);
      paintCombo(false);
      if (v.points) showPoints(v.points, false);
      if (v.drag) staticDrag(v.drag);
      staticView = !!(v.frame || v.drag);
    }
    /* Pierwsza interakcja w user_preview zastępuje statyczną klatkę stanem gry. */
    function clearStatic() {
      if (!staticView) return;
      staticView = false;
      if (staticGhost) { staticGhost.remove(); staticGhost = null; }
      board.render(st.board, {});
      tray.render(st.tray, makePiece);
    }
    /* (5) Punkty ruchu unoszą się i zostają widoczne do następnego położenia (r5; w r4 znikały po 1,4 s). */
    function showPoints(p, live) {
      pointsHost.replaceChildren();
      var mp = BG.movePoints({ points: p, S: S, loc: loc, elementId: ids.points });
      if (!mp) return;
      pointsHost.append(mp);
      if (live) { if (reduced) BG.fx.fade(mp); else BG.fx.play(mp, 'fx-rise', 300); }
    }

    function local(e) {
      var r = surface.getBoundingClientRect(), k = r.width / surface.offsetWidth;
      return { x: (e.clientX - r.left) / k, y: (e.clientY - r.top) / k, k: k, r: r };
    }
    function gridOrigin(L) {
      var gr = board.grid.getBoundingClientRect();
      return { x: (gr.left - L.r.left) / L.k + g.gap, y: (gr.top - L.r.top) / L.k + g.gap };
    }
    function ghostFor(p) {
      return BG.piece({ piece: p, cell: g.cell, gap: g.gap, S: S, elementId: null, variant: 'dragging' });
    }
    function size(sh) { return { w: sh.w * g.cell + (sh.w - 1) * g.gap, h: sh.h * g.cell + (sh.h - 1) * g.gap }; }
    function locate(tl, origin, sh, p) {
      var pitch = g.cell + g.gap;
      var col = Math.round((tl.x - origin.x) / pitch), row = Math.round((tl.y - origin.y) / pitch);
      var a = R.analyze(st.board, sh, p.color, row, col);
      return a ? { row: row, col: col, a: a } : null;
    }
    /* Statyczne przeciąganie (stany capture): klocek narysowany nad polami docelowymi, bez wskaźnika (R-1.8: palec jest pod klockiem). */
    function staticDrag(d) {
      var p = st.tray[d.slot], sh = R.shape(p.shape), a = R.analyze(st.board, sh, p.color, d.row, d.col);
      tray.pieces[d.slot].setAttribute('data-variant', 'lifted');
      board.render(st.board, { preview: a, previewColor: p.color });
      var gh = ghostFor(p); surface.append(gh); staticGhost = gh;
      var pos = function () {
        var sr = surface.getBoundingClientRect(), k = sr.width / surface.offsetWidth, gr = board.grid.getBoundingClientRect();
        var pitch = g.cell + g.gap;
        /* Klocek podąża za palcem bez przyciągania; w klatce stoi 0,3 pola w lewo i w górę od pól docelowych, które pozostają widoczne. */
        gh.style.left = ((gr.left - sr.left) / k + g.gap + (d.col - 0.3) * pitch) + 'px';
        gh.style.top = ((gr.top - sr.top) / k + g.gap + (d.row - 0.3) * pitch) + 'px';
      };
      o.afterLayout = pos;
    }

    function start(e, i, pe) {
      if (busy || drag || e.button > 0 || (o.blocked && o.blocked())) return;
      e.preventDefault();
      clearStatic();
      pe = tray.pieces[i];
      var p = st.tray[i]; if (!p || !pe) return;
      var sh = R.shape(p.shape), L = local(e), sz = size(sh), touch = e.pointerType !== 'mouse';
      var off;
      if (touch) off = { x: sz.w / 2, y: sz.h + g.lift };
      else {
        var pr = pe.getBoundingClientRect(), tpitch = g.pc + g.pg, bpitch = g.cell + g.gap;
        off = { x: ((e.clientX - pr.left) / L.k) / tpitch * bpitch, y: ((e.clientY - pr.top) / L.k) / tpitch * bpitch };
      }
      var gh = ghostFor(p); surface.append(gh);
      try { pe.setPointerCapture(e.pointerId); } catch (_) {}
      pe.setAttribute('data-variant', 'lifted');
      drag = { i: i, p: p, sh: sh, pe: pe, gh: gh, off: off, id: e.pointerId, origin: gridOrigin(L), hit: null };
      move(e);
      pe.addEventListener('pointermove', move);
      pe.addEventListener('pointerup', up);
      pe.addEventListener('pointercancel', cancel);
      pe.addEventListener('lostpointercapture', cancel);
    }
    function move(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var L = local(e), tl = { x: L.x - drag.off.x, y: L.y - drag.off.y };
      drag.gh.style.left = tl.x + 'px'; drag.gh.style.top = tl.y + 'px';
      drag.hit = locate(tl, drag.origin, drag.sh, drag.p);
      board.render(st.board, drag.hit ? { preview: drag.hit.a, previewColor: drag.p.color } : {});
    }
    function end() {
      var d = drag; drag = null;
      d.pe.removeEventListener('pointermove', move);
      d.pe.removeEventListener('pointerup', up);
      d.pe.removeEventListener('pointercancel', cancel);
      d.pe.removeEventListener('lostpointercapture', cancel);
      d.gh.remove();
      return d;
    }
    function cancel(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      var d = end();
      d.pe.setAttribute('data-variant', 'tray');
      board.render(st.board, {});
    }
    function up(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = end();
      if (!d.hit) { d.pe.setAttribute('data-variant', 'tray'); board.render(st.board, {}); return; } /* R-1.5 */
      var res = R.play(st, d.i, d.hit.row, d.hit.col, next);
      commit(res);
    }
    /* r5: stan po ruchu jest od razu końcowy (plansza po czyszczeniu, nowa trójka, wynik), a animacje grają na warstwie efektów (Q136). */
    function commit(res) {
      var mv = res.move, before = st.score, prevCombo = st.combo;
      st = res.state;
      board.render(st.board, {});
      tray.render(st.tray, makePiece);
      var anim = !!o.animate;
      if (anim) {
        var cleared = {}; mv.clearedCells.forEach(function (i) { cleared[i] = true; });
        BG.fx.settle(mv.cells.filter(function (i) { return !cleared[i]; }).map(function (i) { return board.cells[i]; }), reduced);       /* (1) */
        var monoLines = mv.lines.filter(function (l) { return l.mono; });
        if (mv.clearedCells.length) BG.fx.bloom(board, mv.clearedCells, function (i) { return mv.placedBoard[i]; }, reduced, monoLines.length ? BG.MOTION.mono : BG.MOTION.bloom); /* (2) */
        monoLines.forEach(function (l) { BG.fx.sweep(board, l, S, reduced); });                                                   /* (3) */
        if (mv.dealt) BG.fx.deal(tray.pieces, reduced);                                                                          /* (7) */
        if (mv.points.cleared >= 2) BG.fx.praise(board.el, BG.praise({ S: S, lines: mv.points.cleared, elementId: ids.praise || 'element.game.praise' }), reduced);
        BG.fx.countUp(scoreApi, before, st.score, reduced);                                                                      /* (6) */
      } else scoreApi.set(st.score);
      paintCombo(anim && st.combo > prevCombo);
      if (mv.points.cleared > 0) showPoints(mv.points, anim); else pointsHost.replaceChildren();
      if (o.onMove) o.onMove(st);
      /* Koniec gry (Q128): krok końca zaczyna się po animacji ruchu. */
      if (st.over && o.onOver) {
        var wait = !anim ? 0 : reduced ? BG.MOTION.fade : !mv.clearedCells.length ? BG.MOTION.settle : mv.lines.some(function (l) { return l.mono; }) ? BG.MOTION.mono : BG.MOTION.bloom;
        busy = true;
        setTimeout(function () { o.onOver(st, tray); }, wait);
      }
    }
    paintAll();
    return { get state() { return st; }, layout: function () { if (o.afterLayout) o.afterLayout(); } };
  };

  /* Pasek narzędzi podglądu (standard paczki) — narzędzie prototypu poza element.product-work-surface; tylko user_preview i katalog. */
  var NOTES_KEY = 'bloomgrid.prototype.notes';
  function readNotes() { try { return JSON.parse(localStorage.getItem(NOTES_KEY) || '{}') || {}; } catch (_) { return {}; } }
  function writeNotes(n) { try { localStorage.setItem(NOTES_KEY, JSON.stringify(n)); } catch (_) {} }
  BG.previewToolbar = function (o) {
    var states = o.states || null, noteKey = o.noteStateId + '|' + o.targetId;
    var bar = h('div', { 'class': 'pt-bar', 'data-prototype-tool': 'preview-toolbar', role: 'region', 'aria-label': 'Pasek narzędzi podglądu' });
    var row1 = h('div', { 'class': 'pt-row' });
    row1.append(h('a', { 'class': 'pt-link', href: o.catalogHref, 'aria-current': o.catalogCurrent ? 'page' : null }, 'Katalog komponentów'));
    if (o.backHref) row1.append(h('a', { 'class': 'pt-link', href: o.backHref }, 'Prototyp'));
    if (states) {
      var idx = states.map(function (s) { return s.state_id; }).indexOf(o.stateId);
      var groups = {}, order = [];
      states.forEach(function (s) { var k = s.screen_id || ''; if (!groups[k]) { groups[k] = []; order.push(k); } groups[k].push(s); });
      var sel = h('select', { id: 'pt-state', 'class': 'pt-select', onchange: function (e) { o.onState(e.target.value); } },
        order.map(function (k) { return h('optgroup', { label: k }, groups[k].map(function (s) { return h('option', { value: s.state_id, selected: s.state_id === o.stateId }, s.state_id); })); }));
      var go = function (d) { var n = states.length; o.onState(states[(idx + d + n) % n].state_id); };
      row1.append(h('span', { 'class': 'pt-group' },
        h('label', { 'for': 'pt-state', 'class': 'pt-label' }, 'Ekran / stan'), sel,
        h('button', { type: 'button', 'class': 'pt-btn pt-arrow', 'aria-label': 'Poprzedni stan', onclick: function () { go(-1); } }, '‹'),
        h('button', { type: 'button', 'class': 'pt-btn pt-arrow', 'aria-label': 'Następny stan', onclick: function () { go(1); } }, '›'),
        h('span', { 'class': 'pt-count', 'aria-label': 'Stan ' + (idx + 1) + ' z ' + states.length }, (idx + 1) + ' / ' + states.length)));
    }
    var row2 = h('div', { 'class': 'pt-row', role: 'group', 'aria-label': 'Profil podglądu' },
      o.targets.map(function (t) {
        var on = t.target_id === o.targetId;
        return h('button', { type: 'button', 'class': 'pt-btn pt-profile', 'aria-pressed': on ? 'true' : 'false', onclick: function () { if (!on) o.onTarget(t.target_id); } }, t.target_id + ' ' + t.width + '×' + t.height);
      }));
    var ta = h('textarea', { id: 'pt-notes', 'class': 'pt-notes', rows: '1', placeholder: o.noteStateId + ' · ' + o.targetId });
    ta.value = readNotes()[noteKey] || '';
    ta.addEventListener('input', function () { var n = readNotes(); if (ta.value) n[noteKey] = ta.value; else delete n[noteKey]; writeNotes(n); });
    var copyBtn = h('button', { type: 'button', 'class': 'pt-btn', onclick: function () {
      var n = readNotes(), keys = Object.keys(n).sort();
      var text = keys.length ? keys.map(function (k) { var p = k.split('|'); return 'state_id: ' + p[0] + '\ntarget_id: ' + p[1] + '\n' + n[k]; }).join('\n\n') : '(brak uwag)';
      var done = function (ok) { copyBtn.textContent = ok ? 'Skopiowano' : 'Nie skopiowano'; setTimeout(function () { copyBtn.textContent = 'Kopiuj'; }, 1500); };
      var fallback = function () { var t = h('textarea', { style: { position: 'fixed', opacity: '0' } }); t.value = text; document.body.append(t); t.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (_) {} t.remove(); done(ok); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, fallback); else fallback();
    } }, 'Kopiuj');
    var row3 = h('div', { 'class': 'pt-row pt-row-notes' },
      h('label', { 'for': 'pt-notes', 'class': 'pt-label' }, 'Uwagi do tego stanu'), ta,
      h('span', { 'class': 'pt-group' },
        h('button', { type: 'button', 'class': 'pt-btn', onclick: function () { ta.value = ''; var n = readNotes(); delete n[noteKey]; writeNotes(n); ta.focus(); } }, 'Wyczyść'),
        copyBtn));
    bar.append(row1, row2, row3);
    return bar;
  };

  window.BG = BG;
})();
