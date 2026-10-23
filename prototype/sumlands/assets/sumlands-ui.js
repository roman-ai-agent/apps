/* Sumlands r1 — wspólny runtime prototypu (index.html i catalog.html). Bez sieci, czasu w capture i losowości. */
(function () {
  'use strict';
  var SL = {};
  var NS = 'http://www.w3.org/2000/svg';

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
    var kids = Array.prototype.slice.call(arguments, 2);
    (function add(list) {
      list.forEach(function (c) {
        if (c === null || c === undefined || c === false) return;
        if (Array.isArray(c)) return add(c);
        el.append(c instanceof Node ? c : document.createTextNode(String(c)));
      });
    })(kids);
    return el;
  }
  function s(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    return el;
  }
  SL.h = h; SL.s = s;
  SL.fmt = function (t, v) { return String(t).replace(/\{(\w+)\}/g, function (_, k) { return v[k] === undefined ? '' : v[k]; }); };

  var SPEECH = {
    pl: { '+': ' plus ', '−': ' minus ', '×': ' razy ', ':': ' podzielić przez ', '÷': ' podzielić przez ', '²': ' do kwadratu', '³': ' do sześcianu' },
    en: { '+': ' plus ', '−': ' minus ', '×': ' times ', ':': ' divided by ', '÷': ' divided by ', '²': ' squared', '³': ' cubed' }
  };
  SL.speak = function (label, loc) {
    var m = SPEECH[loc] || SPEECH.en;
    return label.replace(/[+−×:÷²³]/g, function (c) { return m[c]; }).replace(/\s+/g, ' ').trim();
  };

  var ICONS = {
    back: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><polyline points="15 5 8 12 15 19" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    next: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><polyline points="9 5 16 12 9 19" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    lock: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5" fill="currentColor"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><polyline points="5 12.5 10 17 19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  SL.icon = function (name, size) {
    var w = h('span', { 'class': 'sl-ic', 'aria-hidden': 'true', html: ICONS[name] });
    if (size) { w.firstChild.setAttribute('width', size); w.firstChild.setAttribute('height', size); }
    return w;
  };
  function ia(o) {
    return o.interactionId ? { 'data-interaction-id': o.interactionId, 'data-action': o.action, 'data-expected-effect': o.expected } : {};
  }
  function merge(a, b) { var r = {}; [a, b].forEach(function (x) { Object.keys(x).forEach(function (k) { r[k] = x[k]; }); }); return r; }

  /* component.back-button */
  SL.backButton = function (o) {
    return h('button', merge({ type: 'button', 'class': 'sl-icon-btn', 'data-component-id': 'component.back-button', 'data-element-id': o.elementId, 'aria-label': o.label, title: o.label, 'data-demo': o.demo, onclick: o.onClick }, ia(o)), SL.icon('back'));
  };
  /* component.primary-button */
  SL.primaryButton = function (o) {
    return h('button', merge({ type: 'button', 'class': 'sl-primary', 'data-component-id': 'component.primary-button', 'data-element-id': o.elementId, 'data-demo': o.demo, onclick: o.onClick }, ia(o)), o.label);
  };
  /* component.target-number */
  SL.target = function (o) {
    var v = o.variant || 'to-hit';
    return h('li', { 'class': 'sl-target', 'data-component-id': 'component.target-number', 'data-element-id': o.elementId, 'data-variant': v, 'aria-label': SL.fmt(v === 'hit' ? o.strings.target_hit : o.strings.target_to_hit, { n: o.value }) },
      h('span', { 'class': 'sl-target-num', 'aria-hidden': 'true' }, String(o.value)),
      h('span', { 'class': 'sl-target-check', 'aria-hidden': 'true' }, SL.icon('check', 16)));
  };
  SL.setTarget = function (el, variant, value, S) {
    el.setAttribute('data-variant', variant);
    el.setAttribute('aria-label', SL.fmt(variant === 'hit' ? S.target_hit : S.target_to_hit, { n: value }));
  };
  /* component.path-result */
  SL.pathResult = function (o) {
    var el = h('div', { 'class': 'sl-result', 'data-component-id': 'component.path-result', 'data-element-id': o.elementId, role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' });
    SL.setResult(el, o.variant || 'pending', o.sum, o.strings);
    return el;
  };
  SL.setResult = function (el, variant, sum, S) {
    el.setAttribute('data-variant', variant);
    el.replaceChildren();
    if (variant === 'pending') {
      el.append(h('span', { 'aria-hidden': 'true' }, '?'), h('span', { 'class': 'sl-sr' }, S.result_pending_sr));
    } else if (variant === 'too-short') {
      el.append(h('span', {}, S.too_short));
    } else {
      el.append(h('span', {}, SL.fmt(S.result_value, { n: sum })));
      if (variant === 'hit') el.append(SL.icon('check', 30), h('span', { 'class': 'sl-sr' }, ', ' + S.result_hit_sr));
      else el.append(h('span', { 'class': 'sl-sr' }, ', ' + S.result_miss_sr));
    }
  };
  /* component.operation-tile */
  SL.tile = function (op, o) {
    var el = h('div', { 'class': 'sl-tile', 'data-component-id': 'component.operation-tile', 'data-element-id': o.elementId, 'data-variant': o.variant || 'default', 'data-demo': o.demo, role: 'img', 'aria-label': SL.speak(op.label, o.loc), style: { left: o.x + 'px', top: o.y + 'px' } },
      h('span', { 'aria-hidden': 'true' }, op.label));
    if (o.revealed) SL.revealTile(el, op, o.revealed, o);
    return el;
  };
  SL.revealTile = function (el, op, kind, o) {
    var pill = el.querySelector('.sl-tile-result');
    if (!kind) {
      if (pill) pill.remove();
      el.setAttribute('aria-label', SL.speak(op.label, o.loc));
      return;
    }
    if (!pill) { pill = h('span', { 'class': 'sl-tile-result', 'aria-hidden': 'true' }); el.append(pill); }
    pill.textContent = String(op.result);
    pill.setAttribute('data-kind', kind);
    el.setAttribute('aria-label', SL.speak(op.label, o.loc) + ', ' + SL.fmt(o.strings.tile_result_sr, { n: op.result }));
  };
  SL.geom = function (S) {
    var R = S * 0.3734, d = Math.round(S * 0.2532), fs = Math.max(24, Math.round(d * 0.3)), centers = [];
    for (var i = 0; i < 7; i++) {
      var a = -Math.PI / 2 + i * 2 * Math.PI / 7;
      centers.push({ x: S / 2 + R * Math.cos(a), y: S / 2 + R * Math.sin(a) });
    }
    return { S: S, R: R, d: d, fs: fs, centers: centers };
  };
  /* component.operation-wheel */
  SL.createWheel = function (o) {
    var g = SL.geom(o.size), ops = o.ops, prefix = o.elementPrefix || '';
    var st = { path: [], tail: null, revealed: false, inactive: false, drawing: false };
    Object.keys(o.initial || {}).forEach(function (k) { st[k] = o.initial[k]; });
    var root = h('div', merge({ 'class': 'sl-wheel', 'data-component-id': 'component.operation-wheel', 'data-element-id': o.elementId, role: 'group', 'aria-label': o.strings.wheel_label, style: { width: g.S + 'px', height: g.S + 'px', '--d': g.d + 'px', '--fs': g.fs + 'px' } }, o.interactive ? ia(o) : {}));
    root.append(h('div', { 'class': 'sl-wheel-ring', 'aria-hidden': 'true', style: { left: (g.S / 2 - g.R) + 'px', top: (g.S / 2 - g.R) + 'px', width: 2 * g.R + 'px', height: 2 * g.R + 'px' } }));
    var svg = s('svg', { 'class': 'sl-wheel-lines', width: g.S, height: g.S, viewBox: '0 0 ' + g.S + ' ' + g.S, 'aria-hidden': 'true', 'data-element-id': prefix + 'path-line' });
    var poly = s('polyline', { 'class': 'sl-path-line' });
    var tail = s('line', { 'class': 'sl-path-line sl-path-tail' });
    svg.append(poly, tail);
    root.append(svg);
    var layer = h('div', { 'class': 'sl-tiles' });
    root.append(layer);
    var tiles = [];
    function build() {
      layer.replaceChildren();
      tiles = ops.map(function (op, i) { return SL.tile(op, { elementId: prefix + 'tile-' + (i + 1), loc: o.loc, strings: o.strings, x: g.centers[i].x, y: g.centers[i].y }); });
      tiles.forEach(function (t) { layer.append(t); });
    }
    function paint() {
      root.classList.toggle('is-drawing', !!st.drawing);
      root.setAttribute('data-variant', st.inactive ? 'inactive' : st.revealed ? 'revealed-' + st.revealed : st.path.length ? 'drawing' : 'idle');
      tiles.forEach(function (t, i) {
        var inPath = st.path.indexOf(i) >= 0;
        t.setAttribute('data-variant', inPath ? 'in-path' : st.inactive ? 'inactive' : 'default');
        SL.revealTile(t, ops[i], st.revealed && inPath ? st.revealed : false, o);
      });
      var pts = st.path.map(function (i) { return g.centers[i]; });
      poly.setAttribute('points', pts.map(function (p) { return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' '));
      poly.setAttribute('data-kind', st.revealed || 'drawing');
      if (st.tail && pts.length) {
        var p = pts[pts.length - 1];
        tail.setAttribute('x1', p.x.toFixed(1)); tail.setAttribute('y1', p.y.toFixed(1));
        tail.setAttribute('x2', st.tail.x.toFixed(1)); tail.setAttribute('y2', st.tail.y.toFixed(1));
        tail.style.display = '';
      } else tail.style.display = 'none';
    }
    function local(e) {
      var r = root.getBoundingClientRect(), k = g.S / r.width;
      return { x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k };
    }
    function tileAt(p, frac) {
      var lim = (g.d / 2) * frac;
      for (var i = 0; i < 7; i++) { var c = g.centers[i]; if (Math.hypot(p.x - c.x, p.y - c.y) <= lim) return i; }
      return -1;
    }
    var pid = null;
    function cancel() {
      if (!st.drawing) return;
      st.drawing = false; st.path = []; st.tail = null; pid = null;
      paint();
      if (o.onCancel) o.onCancel();
    }
    if (o.interactive) {
      root.addEventListener('pointerdown', function (e) {
        if (st.inactive || st.drawing) return;
        var p = local(e), i = tileAt(p, 1);
        if (i < 0) return;
        e.preventDefault();
        try { root.setPointerCapture(e.pointerId); } catch (_) {}
        pid = e.pointerId; st.drawing = true; st.revealed = false; st.path = [i]; st.tail = p;
        if (o.onStart) o.onStart();
        paint();
      });
      root.addEventListener('pointermove', function (e) {
        if (!st.drawing || e.pointerId !== pid) return;
        if (e.clientX < 0 || e.clientY < 0 || e.clientX > window.innerWidth || e.clientY > window.innerHeight) { cancel(); return; }
        var p = local(e); st.tail = p;
        var i = tileAt(p, 0.7);
        if (i >= 0) {
          var n = st.path.length;
          if (n >= 2 && i === st.path[n - 2]) st.path.pop();
          else if (st.path.indexOf(i) < 0) st.path.push(i);
        }
        paint();
      });
      root.addEventListener('pointerup', function (e) {
        if (!st.drawing || e.pointerId !== pid) return;
        st.drawing = false; st.tail = null; pid = null;
        var path = st.path.slice();
        paint();
        if (o.onRelease) o.onRelease(path);
      });
      root.addEventListener('pointercancel', cancel);
      window.addEventListener('blur', cancel);
      document.documentElement.addEventListener('mouseleave', cancel);
    }
    build(); paint();
    return {
      el: root,
      state: st,
      set: function (p) { Object.keys(p).forEach(function (k) { st[k] = p[k]; }); paint(); },
      swap: function (newOps, ms, done) {
        root.classList.add('is-swapping');
        setTimeout(function () {
          ops = newOps; st.path = []; st.revealed = false;
          root.classList.remove('is-swapping'); root.classList.add('is-entering');
          build(); paint();
          void root.offsetWidth;
          root.classList.remove('is-entering');
          setTimeout(function () { if (done) done(); }, ms);
        }, ms);
      }
    };
  };
  /* component.level-button */
  SL.levelButton = function (o) {
    var S = o.strings, status = { completed: S.level_status_done, available: S.level_status_open, locked: S.level_status_locked }[o.variant];
    return h('button', merge({ type: 'button', 'class': 'sl-level-btn' + (o.wide ? ' is-wide' : ''), 'data-component-id': 'component.level-button', 'data-element-id': o.elementId, 'data-variant': o.variant, 'data-demo': o.demo, 'aria-label': SL.fmt(S.level_button_sr, { n: o.n, status: status }), 'aria-disabled': o.variant === 'locked' ? 'true' : null, onclick: o.onClick }, ia(o)),
      h('span', { 'aria-hidden': 'true' }, String(o.n)),
      o.variant === 'completed' ? h('span', { 'class': 'sl-badge sl-badge-hit' }, SL.icon('check', 14)) : null,
      o.variant === 'locked' ? h('span', { 'class': 'sl-badge sl-badge-lock' }, SL.icon('lock', 13)) : null);
  };
  /* component.land-card */
  SL.landCard = function (o) {
    var S = o.strings, L = o.land, status = { available: S.land_status_open, locked: S.land_status_locked, completed: S.land_status_done }[o.variant];
    return h('button', merge({ type: 'button', 'class': 'sl-land-card' + (o.layout === 'row' ? ' is-row' : ''), 'data-component-id': 'component.land-card', 'data-element-id': o.elementId, 'data-variant': o.variant, 'data-demo': o.demo, 'aria-label': SL.fmt(S.land_card_sr, { name: L.name, status: status }), 'aria-disabled': o.variant === 'locked' ? 'true' : null, onclick: o.onClick }, ia(o)),
      h('span', { 'class': 'sl-land-img' }, h('img', { src: L.entry_image, alt: '', draggable: 'false' }), o.variant === 'locked' ? h('span', { 'class': 'sl-land-lock' }, SL.icon('lock', 30)) : null),
      h('span', { 'class': 'sl-land-body' },
        h('span', { 'class': 'sl-land-name' }, L.name),
        h('span', { 'class': 'sl-land-topic' }, L.topic),
        h('span', { 'class': 'sl-land-status', 'data-kind': o.variant },
          o.variant === 'completed' ? SL.icon('check', 15) : o.variant === 'locked' ? SL.icon('lock', 13) : null,
          status,
          o.variant === 'available' ? SL.icon('next', 15) : null)));
  };

  /* Reguły gry — oddzielone od widoku (S-1.2). Lista działań zależy tylko od zbioru niezbitych liczb (R-2.7). */
  SL.rules = {
    key: function (rem) { return rem.slice().sort(function (a, b) { return a - b; }).join(','); },
    wheelFor: function (level, rem) { return level.wheels[SL.rules.key(rem)]; },
    evaluate: function (ops, path, rem) {
      if (path.length < 2) return { kind: 'too-short' };
      var sum = path.reduce(function (a, i) { return a + ops[i].result; }, 0);
      return { kind: rem.indexOf(sum) >= 0 ? 'hit' : 'miss', sum: sum };
    }
  };

  /* Pasek narzędzi podglądu (standard paczki). Narzędzie prototypu: poza element.product-work-surface, tylko w user_preview i w katalogu. */
  var NOTES_KEY = 'sumlands.prototype.notes';
  function readNotes() { try { return JSON.parse(localStorage.getItem(NOTES_KEY) || '{}') || {}; } catch (_) { return {}; } }
  function writeNotes(n) { try { localStorage.setItem(NOTES_KEY, JSON.stringify(n)); } catch (_) {} }
  SL.previewToolbar = function (o) {
    var states = o.states || null, targets = o.targets, noteKey = o.noteStateId + '|' + o.targetId;
    var bar = h('div', { 'class': 'pt-bar', 'data-prototype-tool': 'preview-toolbar', role: 'region', 'aria-label': 'Pasek narzędzi podglądu' });
    var row1 = h('div', { 'class': 'pt-row' });
    row1.append(o.catalogCurrent
      ? h('a', { 'class': 'pt-link', href: o.catalogHref, 'aria-current': 'page' }, 'Katalog komponentów')
      : h('a', { 'class': 'pt-link', href: o.catalogHref }, 'Katalog komponentów'));
    if (o.backHref) row1.append(h('a', { 'class': 'pt-link', href: o.backHref }, 'Prototyp'));
    if (states) {
      var idx = states.map(function (s) { return s.state_id; }).indexOf(o.stateId);
      var groups = {}, order = [];
      states.forEach(function (s) { var g = s.screen_id || ''; if (!groups[g]) { groups[g] = []; order.push(g); } groups[g].push(s); });
      var sel = h('select', { id: 'pt-state', 'class': 'pt-select', onchange: function (e) { o.onState(e.target.value); } },
        order.map(function (g) { return h('optgroup', { label: g }, groups[g].map(function (s) { return h('option', { value: s.state_id, selected: s.state_id === o.stateId }, s.state_id); })); }));
      var go = function (d) { var n = states.length; o.onState(states[(idx + d + n) % n].state_id); };
      row1.append(h('span', { 'class': 'pt-group' },
        h('label', { 'for': 'pt-state', 'class': 'pt-label' }, 'Ekran / stan'), sel,
        h('button', { type: 'button', 'class': 'pt-btn pt-arrow', 'aria-label': 'Poprzedni stan', onclick: function () { go(-1); } }, '‹'),
        h('button', { type: 'button', 'class': 'pt-btn pt-arrow', 'aria-label': 'Następny stan', onclick: function () { go(1); } }, '›'),
        h('span', { 'class': 'pt-count', 'aria-label': 'Stan ' + (idx + 1) + ' z ' + states.length }, (idx + 1) + ' / ' + states.length)));
    }
    var row2 = h('div', { 'class': 'pt-row', role: 'group', 'aria-label': 'Profil podglądu' },
      targets.map(function (t) {
        var on = t.target_id === o.targetId;
        return h('button', { type: 'button', 'class': 'pt-btn pt-profile', 'aria-pressed': on ? 'true' : 'false', onclick: function () { if (!on) o.onTarget(t.target_id); } }, t.target_id + ' ' + t.width + '×' + t.height);
      }));
    var notes = readNotes();
    var ta = h('textarea', { id: 'pt-notes', 'class': 'pt-notes', rows: '1', placeholder: o.noteStateId + ' · ' + o.targetId });
    ta.value = notes[noteKey] || '';
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

  window.SL = SL;
})();
