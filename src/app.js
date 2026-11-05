(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* text used inside the interactive parts                              */
  /* ------------------------------------------------------------------ */
  var T = {
    tr: {
      play: '▶ Başlat', pause: 'Durdur', resume: '▶ Devam', again: '▶ Tekrar', reset: 'Sıfırla', step: '+1 s',
      cv: {
        title: 'Sabit hız laboratuvarı', tag: 'FİZ.10.1.1 · a–b–c',
        hint: 'Hızı ve başlangıç yerini seç, sonra ▶ Başlat’a bas. Araba her saniye yola bir nokta bırakır. Noktalar arası mesafe hep aynı mı? Tabloya da bak.',
        v: 'Hız v', x0: 'Başlangıç konumu x₀', xt: 'Konum–zaman (x–t) grafiği', vt: 'Hız–zaman (v–t) grafiği', col: 'Δx (son 1 s)',
        wait: 'Gözlem: tablo dolsun, en az 3 saniye izle.',
        obs: function (d) { return 'Gözlem: her saniye <b class="m">Δx = ' + d + ' m</b>. Her saniye aynı mesafe → <b>hız sabit</b>.'; },
        rest: 'Gözlem: araba hiç kıpırdamıyor → <b>v = 0</b>, duruyor. x–t grafiği yatay bir çizgi.',
        model: 'Kural (genelleme)'
      },
      acc: {
        title: 'İvme laboratuvarı', tag: 'FİZ.10.1.2 · a–b',
        hint: 'İlk hızı ve ivmeyi seç, sonra ▶ Başlat’a bas. Turuncu ok hızı, mor ok ivmeyi gösterir. Her saniye hız ne kadar değişiyor? Tabloya bak.',
        v0: 'İlk hız v₀', a: 'İvme a', vt: 'Hız–zaman (v–t) grafiği', at: 'İvme–zaman (a–t) grafiği', col: 'Δv (son 1 s)',
        wait: 'Gözlem: tablo dolsun, en az 3 saniye izle.',
        obs: function (d) { return 'Gözlem: hız her saniye <b class="m">' + d + ' m/s</b> değişiyor. Bu sayı ivmenin ta kendisi!'; },
        zero: 'Gözlem: hız hiç değişmiyor → <b>a = 0</b>, yani sabit hızlı hareket.',
        model: 'Kural (genelleme)',
        st: { up: 'Hızlanıyor · v ve a aynı yönde', down: 'Yavaşlıyor · v ve a zıt yönde', flat: 'Sabit hız · a = 0', stop: 'Anlık durdu · yön değiştirecek', rest: 'Durgun · v = 0, a = 0' }
      },
      slope: 'eğim', area: 'alan',
      dv: { title: 'Hız değişimi ve ivme hesaplayıcı', vi: 'İlk hız v<sub>ilk</sub>', vs: 'Son hız v<sub>son</sub>', dt: 'Süre Δt', turn: 'Yön değişti! Sürat aynı kalsa bile hız değişti.' },
      kmh: { title: 'Birim çevirici', l: 'Hız (km/h)' },
      quiz: { score: 'Puan', done: 'Cevaplanan', reset: 'Baştan', ok: 'Doğru!', no: 'Yanlış.', right: 'Doğru cevap: ' }
    },
    ar: {
      play: '▶ تشغيل', pause: 'إيقاف', resume: '▶ متابعة', again: '▶ من جديد', reset: 'إعادة', step: '+1 s',
      cv: {
        title: 'مختبر السرعة الثابتة', tag: 'FİZ.10.1.1 · a–b–c',
        hint: 'اختاري السرعة وموضع البداية ثم اضغطي ▶ تشغيل. السيارة تترك أثرًا (نقطة) على الطريق كل ثانية. انظري إلى المسافات بين النقاط وإلى الجدول: هل الإزاحة متساوية في أزمنة متساوية؟',
        v: 'السرعة v', x0: 'موضع البداية x₀', xt: 'منحنى الموضع–الزمن (konum–zaman)', vt: 'منحنى السرعة–الزمن (hız–zaman)', col: 'Δx / 1 s',
        wait: 'الملاحظة: انتظري حتى يمتلئ الجدول، 3 ثوانٍ على الأقل.',
        obs: function (d) { return 'الملاحظة: في كل <bdi>1 s</bdi> تكون <b class="m">Δx = ' + d + ' m</b>. إزاحات متساوية في أزمنة متساوية ← <b>السرعة ثابتة</b>.'; },
        rest: 'الملاحظة: السيارة لا تتحرك ← <b>v = 0</b>، الجسم ساكن، ومنحنى x–t خط أفقي.',
        model: 'التعميم (النموذج الرياضي)'
      },
      acc: {
        title: 'مختبر التسارع', tag: 'FİZ.10.1.2 · a–b',
        hint: 'اختاري السرعة الابتدائية والتسارع ثم اضغطي ▶ تشغيل. السهم البرتقالي يمثل السرعة والبنفسجي يمثل التسارع. كم تتغير السرعة في كل ثانية؟ قارني الجدول بميل منحنى v–t.',
        v0: 'السرعة الابتدائية v₀', a: 'التسارع a', vt: 'منحنى السرعة–الزمن (hız–zaman)', at: 'منحنى التسارع–الزمن (ivme–zaman)', col: 'Δv / 1 s',
        wait: 'الملاحظة: انتظري حتى يمتلئ الجدول، 3 ثوانٍ على الأقل.',
        obs: function (d) { return 'الملاحظة: السرعة تتغير بمقدار <b class="m">' + d + ' m/s</b> في كل <bdi>1 s</bdi>. هذا التغير الثابت هو التسارع نفسه.'; },
        zero: 'الملاحظة: السرعة لا تتغير ← <b>a = 0</b>، هذه حركة بسرعة ثابتة.',
        model: 'التعميم (النموذج الرياضي)',
        st: { up: 'تتزايد السرعة <bdi>(hızlanıyor)</bdi>: <bdi>v</bdi> و <bdi>a</bdi> بالاتجاه نفسه', down: 'تتناقص السرعة <bdi>(yavaşlıyor)</bdi>: <bdi>v</bdi> و <bdi>a</bdi> متعاكسان', flat: 'سرعة ثابتة: <bdi>a = 0</bdi>', stop: 'توقفت لحظيًا وستعكس اتجاهها', rest: 'ساكن: <bdi>v = 0</bdi> و <bdi>a = 0</bdi>' }
      },
      slope: 'الميل', area: 'المساحة',
      dv: { title: 'حاسبة تغيّر السرعة والتسارع', vi: 'السرعة الابتدائية v<sub>ilk</sub>', vs: 'السرعة النهائية v<sub>son</sub>', dt: 'المدة Δt', turn: 'تغيّر الاتجاه! Δv ليست الفرق بين مقداري السرعتين.' },
      kmh: { title: 'محوّل الوحدات', l: 'السرعة (km/h)' },
      quiz: { score: 'النتيجة', done: 'تمت الإجابة', reset: 'من جديد', ok: 'صحيح!', no: 'خطأ.', right: 'الجواب الصحيح: ' }
    }
  };

  /* ------------------------------------------------------------------ */
  /* helpers                                                             */
  /* ------------------------------------------------------------------ */
  function fmt(n, d) {
    if (d === undefined) d = 1;
    var s = (Math.round(n * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
    if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
    if (s === '-0') s = '0';
    return s.replace('.', ',').replace('-', '−');
  }
  function sg(n, d) { return (n > 0 ? '+' : '') + fmt(n, d); }
  function par(n, d) { return n < 0 ? '(' + fmt(n, d) + ')' : fmt(n, d); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
  var colCache = null;
  function C() {
    if (colCache) return colCache;
    var s = getComputedStyle(document.documentElement);
    var g = function (n) { return s.getPropertyValue(n).trim(); };
    colCache = { ink: g('--ink'), muted: g('--muted'), line: g('--line'), soft: g('--soft'), surface: g('--surface'),
      cx: g('--cx'), cv: g('--cv'), ca: g('--ca'), good: g('--good'), bad: g('--bad') };
    return colCache;
  }
  function alpha(hex, a) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }
  var MONO = '"JetBrains Mono", Menlo, Consolas, monospace';
  function prep(cv) {
    var r = cv.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return null;
    var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    var W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
    if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.direction = 'ltr';
    ctx.clearRect(0, 0, r.width, r.height);
    return { ctx: ctx, w: r.width, h: r.height };
  }
  function niceStep(range, target) {
    var raw = range / target, mag = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / mag;
    return (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * mag;
  }
  function arrow(ctx, x1, y, x2, color, lw, head) {
    head = head || 8; lw = lw || 3;
    if (Math.abs(x2 - x1) < 1) return;
    var d = x2 > x1 ? 1 : -1;
    var hx = Math.abs(x2 - x1) < head + 2 ? x1 : x2 - d * head;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(hx, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y); ctx.lineTo(x2 - d * head, y - head * 0.62); ctx.lineTo(x2 - d * head, y + head * 0.62); ctx.closePath(); ctx.fill();
  }
  function text(ctx, s, x, y, o) {
    o = o || {};
    ctx.font = (o.weight || 500) + ' ' + (o.size || 11) + 'px ' + (o.font || MONO);
    ctx.fillStyle = o.color || C().muted; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'alphabetic';
    if (o.halo) { ctx.lineWidth = 4; ctx.strokeStyle = C().surface; ctx.lineJoin = 'round'; ctx.strokeText(s, x, y); }
    ctx.fillText(s, x, y);
  }

  /* ------------------------------------------------------------------ */
  /* generic graph                                                       */
  /* o = { tmax, tstep, ymin, ymax, ystep, ylab, color, segs:[[t0,y0,t1,y1]] | f(t),       */
  /*       tNow, area, tri:{t1,t2,label}, labels:[{t,y,s,color,align}], dot }               */
  /* ------------------------------------------------------------------ */
  function plot(cv, o) {
    var P = prep(cv); if (!P) return;
    var ctx = P.ctx, w = P.w, h = P.h, c = C();
    var m = { l: 44, r: 34, t: 24, b: 24 };
    var tmin = 0, tmax = o.tmax;
    var X = function (t) { return m.l + (t - tmin) / (tmax - tmin) * (w - m.l - m.r); };
    var Y = function (y) { return m.t + (o.ymax - y) / (o.ymax - o.ymin) * (h - m.t - m.b); };
    var ts = o.tstep || niceStep(tmax, w < 340 ? 4 : 6), ys = o.ystep || niceStep(o.ymax - o.ymin, 5);
    ctx.lineWidth = 1; ctx.strokeStyle = c.line;
    for (var t = 0; t <= tmax + 1e-9; t += ts) { ctx.beginPath(); ctx.moveTo(X(t) + .5, m.t); ctx.lineTo(X(t) + .5, h - m.b); ctx.stroke(); }
    for (var y = Math.ceil(o.ymin / ys) * ys; y <= o.ymax + 1e-9; y += ys) { ctx.beginPath(); ctx.moveTo(m.l, Math.round(Y(y)) + .5); ctx.lineTo(w - m.r, Math.round(Y(y)) + .5); ctx.stroke(); }
    // axes
    var y0 = Y(Math.max(o.ymin, Math.min(o.ymax, 0)));
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(m.l, h - m.b + 2); ctx.lineTo(m.l, m.t - 10); ctx.stroke();
    arrow(ctx, m.l, y0, w - m.r + 14, c.ink, 1.4, 6);
    ctx.beginPath(); ctx.moveTo(m.l, m.t - 14); ctx.lineTo(m.l - 4, m.t - 7); ctx.lineTo(m.l + 4, m.t - 7); ctx.closePath(); ctx.fillStyle = c.ink; ctx.fill();
    text(ctx, o.ylab, m.l + 8, m.t - 9, { color: c.ink, weight: 600, size: 11.5 });
    text(ctx, 't (s)', w - m.r + 14, y0 - 7, { color: c.ink, weight: 600, size: 11.5, align: 'right' });
    for (t = 0; t <= tmax + 1e-9; t += ts) if (t > 0) text(ctx, fmt(t, 1), X(t), h - m.b + 15, { align: 'center' });
    for (y = Math.ceil(o.ymin / ys) * ys; y <= o.ymax + 1e-9; y += ys) text(ctx, fmt(y, 1), m.l - 6, Y(y) + 4, { align: 'right' });
    var col = o.color;
    var tEnd = (o.tNow === undefined) ? tmax : Math.min(o.tNow, tmax);
    // build polyline points
    var pts = [];
    if (o.segs) {
      o.segs.forEach(function (s) {
        if (s[0] > tEnd) return;
        var t1 = Math.min(s[2], tEnd), y1 = s[1] + (s[3] - s[1]) * ((t1 - s[0]) / ((s[2] - s[0]) || 1));
        pts.push([s[0], s[1], t1, y1]);
      });
    } else if (o.f) {
      var N = 160, prev = null;
      for (var i = 0; i <= N; i++) { var tt = tEnd * i / N, yy = o.f(tt); if (prev) pts.push([prev[0], prev[1], tt, yy]); prev = [tt, yy]; }
    }
    if (o.area && pts.length) {
      ctx.fillStyle = alpha(col, 0.18);
      pts.forEach(function (p) {
        ctx.beginPath(); ctx.moveTo(X(p[0]), Y(0)); ctx.lineTo(X(p[0]), Y(p[1])); ctx.lineTo(X(p[2]), Y(p[3])); ctx.lineTo(X(p[2]), Y(0)); ctx.closePath(); ctx.fill();
      });
    }
    ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    pts.forEach(function (p, k) {
      ctx.beginPath(); ctx.moveTo(X(p[0]), Y(p[1])); ctx.lineTo(X(p[2]), Y(p[3])); ctx.stroke();
    });
    if (o.tri && tEnd >= o.tri.t2 - 1e-9) {
      var fy = o.f || function (tq) { var r = 0; o.segs.forEach(function (s) { if (tq >= s[0] && tq <= s[2]) r = s[1] + (s[3] - s[1]) * (tq - s[0]) / ((s[2] - s[0]) || 1); }); return r; };
      var a1 = fy(o.tri.t1), a2 = fy(o.tri.t2);
      ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5; ctx.strokeStyle = c.ink;
      ctx.beginPath(); ctx.moveTo(X(o.tri.t1), Y(a1)); ctx.lineTo(X(o.tri.t2), Y(a1)); ctx.lineTo(X(o.tri.t2), Y(a2)); ctx.stroke(); ctx.setLineDash([]);
      if (o.tri.dt) text(ctx, o.tri.dt, (X(o.tri.t1) + X(o.tri.t2)) / 2, Y(a1) + (a2 >= a1 ? 14 : -6), { align: 'center', color: c.ink, halo: true });
      if (o.tri.dy) text(ctx, o.tri.dy, X(o.tri.t2) + 5, (Y(a1) + Y(a2)) / 2 + 4, { align: 'left', color: c.ink, halo: true });
    }
    if (o.labels) o.labels.forEach(function (L) {
      text(ctx, L.s, X(L.t) + (L.dx || 0), Y(L.y) + (L.dy || 0), { align: L.align || 'center', color: L.color || c.ink, weight: 600, size: L.size || 12, halo: true });
    });
    if (o.dots) o.dots.forEach(function (d) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(X(d[0]), Y(d[1]), 3.5, 0, Math.PI * 2); ctx.fill(); });
    if (o.tNow !== undefined && pts.length) {
      var last = pts[pts.length - 1];
      ctx.fillStyle = c.surface; ctx.strokeStyle = col; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(X(last[2]), Y(last[3]), 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    return { X: X, Y: Y };
  }

  /* ------------------------------------------------------------------ */
  /* track (number line + car)                                           */
  /* ------------------------------------------------------------------ */
  function drawCar(ctx, x, road, dir, c) {
    ctx.save(); ctx.translate(x, road); ctx.scale(dir < 0 ? -1 : 1, 1);
    ctx.fillStyle = c.ink;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-20, -19, 40, 12, 4) : ctx.rect(-20, -19, 40, 12); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-11, -19); ctx.lineTo(-6, -28); ctx.lineTo(8, -28); ctx.lineTo(14, -19); ctx.closePath(); ctx.fill();
    ctx.fillStyle = c.surface;
    ctx.beginPath(); ctx.moveTo(-5, -26); ctx.lineTo(0, -26); ctx.lineTo(0, -20); ctx.lineTo(-8.5, -20); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(2, -26); ctx.lineTo(7.5, -26); ctx.lineTo(11, -20); ctx.lineTo(2, -20); ctx.closePath(); ctx.fill();
    ctx.fillStyle = c.cv; ctx.fillRect(16, -16, 4, 3);
    ctx.fillStyle = c.ink; ctx.strokeStyle = c.surface; ctx.lineWidth = 2;
    [-11, 11].forEach(function (wx) { ctx.beginPath(); ctx.arc(wx, -5, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); });
    ctx.restore();
  }
  function track(cv, o) {
    // o = {xmin,xmax, x, dir, strobe:[x...], v, a, vScale, aScale}
    var P = prep(cv); if (!P) return;
    var ctx = P.ctx, w = P.w, h = P.h, c = C();
    var pad = 26, X = function (x) { return pad + (x - o.xmin) / (o.xmax - o.xmin) * (w - 2 * pad); };
    var road = h - 58, ruler = h - 22;
    // road
    ctx.fillStyle = c.soft; ctx.fillRect(0, road, w, 14);
    ctx.strokeStyle = c.muted; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, road + .5); ctx.lineTo(w, road + .5); ctx.stroke();
    // ruler
    var st = niceStep(o.xmax - o.xmin, w < 420 ? 5 : 10), lblEvery = (X(st) - X(0) < 30) ? 2 : 1;
    ctx.strokeStyle = c.muted; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad - 10, ruler); ctx.lineTo(w - pad + 10, ruler); ctx.stroke();
    var k = 0;
    for (var x = Math.ceil(o.xmin / st) * st; x <= o.xmax + 1e-9; x += st, k++) {
      var big = Math.abs(x) < 1e-9;
      ctx.strokeStyle = big ? c.ink : c.muted; ctx.lineWidth = big ? 2 : 1;
      ctx.beginPath(); ctx.moveTo(X(x), ruler - (big ? 7 : 4)); ctx.lineTo(X(x), ruler + (big ? 7 : 4)); ctx.stroke();
      if (big || (Math.round(x / st) % lblEvery === 0)) text(ctx, fmt(x, 0), X(x), ruler + 16, { align: 'center', color: big ? c.ink : c.muted, weight: big ? 700 : 500 });
    }
    text(ctx, 'x (m)', w - 4, ruler - 8, { align: 'right', color: c.muted, size: 10.5 });
    text(ctx, '+', w - 8, ruler + 16, { align: 'right', color: c.ink, weight: 700, size: 12 });
    text(ctx, '−', 8, ruler + 16, { align: 'left', color: c.ink, weight: 700, size: 12 });
    // strobe dots
    var placed = [[], []];
    (o.strobe || []).forEach(function (sx, i) {
      var px = X(sx);
      ctx.fillStyle = o.dotColor || c.cv; ctx.beginPath(); ctx.arc(px, road + 7, 4, 0, Math.PI * 2); ctx.fill();
      for (var r = 0; r < 2; r++) {
        var free = placed[r].every(function (q) { return Math.abs(q - px) >= 15; });
        if (free) { text(ctx, String(i), px, r === 0 ? road + 27 : road - 3, { align: 'center', size: 10, color: c.muted, halo: r === 1 }); placed[r].push(px); break; }
      }
    });
    // car
    var cx = X(o.x);
    drawCar(ctx, cx, road, o.dir, c);
    // arrows
    if (o.v !== undefined && Math.abs(o.v) > 1e-6) {
      var lenV = Math.max(-0.42 * w, Math.min(0.42 * w, o.v * o.vScale));
      arrow(ctx, cx, road - 38, cx + lenV, c.cv, 3.2, 9);
      text(ctx, 'v', cx + lenV + (lenV > 0 ? 6 : -6), road - 34, { align: lenV > 0 ? 'left' : 'right', color: c.cv, weight: 700, size: 13 });
    }
    if (o.a !== undefined && Math.abs(o.a) > 1e-6) {
      var lenA = o.a * o.aScale;
      arrow(ctx, cx, road - 56, cx + lenA, c.ca, 3.2, 9);
      text(ctx, 'a', cx + lenA + (lenA > 0 ? 6 : -6), road - 52, { align: lenA > 0 ? 'left' : 'right', color: c.ca, weight: 700, size: 13 });
    }
  }

  /* ------------------------------------------------------------------ */
  /* animation helper                                                    */
  /* ------------------------------------------------------------------ */
  var RATE = 1.25; // simulated seconds per real second
  var allSims = [];
  function Runner(sim) {
    var last = null;
    function frame(ts) {
      if (!sim.running) { last = null; return; }
      if (last === null) last = ts;
      var dt = Math.min(0.1, (ts - last) / 1000); last = ts;
      sim.advance(dt * RATE);
      sim.draw();
      if (sim.running) requestAnimationFrame(frame); else last = null;
    }
    return function () { requestAnimationFrame(frame); };
  }
  function slider(cls, label, min, max, step, val, unit, nosign) {
    var id = 's' + Math.random().toString(36).slice(2, 8);
    var d = el('div', 'sl ' + cls);
    d.innerHTML = '<label for="' + id + '"><span>' + label + '</span><output></output></label><input id="' + id + '" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '">';
    var inp = d.querySelector('input'), out = d.querySelector('output');
    var upd = function () { out.textContent = (nosign ? fmt(+inp.value, 1) : sg(+inp.value, 1)) + ' ' + unit; };
    inp.addEventListener('input', upd); upd();
    return { el: d, input: inp, get: function () { return +inp.value; } };
  }

  /* ------------------------------------------------------------------ */
  /* SIM 1 — constant velocity                                           */
  /* ------------------------------------------------------------------ */
  function SimCV(root, lang) {
    var L = T[lang], S = L.cv, self = this;
    root.innerHTML = '';
    var head = el('div', 'sh', '<h4>' + S.title + '</h4><span class="tag">' + S.tag + '</span>');
    var hint = el('p', 'hint', S.hint);
    var trk = el('canvas', 'track'); trk.setAttribute('aria-hidden', 'true');
    var ctrl = el('div', 'ctrl');
    var sv = slider('v', S.v, -10, 10, 1, 5, 'm/s'), sx = slider('x', S.x0, -40, 40, 5, -20, 'm');
    ctrl.appendChild(sv.el); ctrl.appendChild(sx.el);
    var btns = el('div', 'btns');
    var bPlay = el('button', 'btn primary', L.play), bStep = el('button', 'btn', L.step), bReset = el('button', 'btn', L.reset), clock = el('span', 'clock');
    [bPlay, bStep, bReset].forEach(function (b) { b.type = 'button'; btns.appendChild(b); }); bStep.dir = 'ltr'; btns.appendChild(clock);
    var graphs = el('div', 'graphs');
    var g1 = el('div', '', '<h5>' + S.xt + '</h5>'), c1 = el('canvas'), n1 = el('div', 'gnote');
    var g2 = el('div', '', '<h5>' + S.vt + '</h5>'), c2 = el('canvas'), n2 = el('div', 'gnote');
    g1.appendChild(n1); g1.appendChild(c1); g2.appendChild(n2); g2.appendChild(c2); graphs.appendChild(g1); graphs.appendChild(g2);
    var data = el('div', 'data');
    var tbl = el('div', 'tbl', '<table><thead><tr><th>t (s)</th><th>x (m)</th><th>' + S.col + '</th></tr></thead><tbody></tbody></table>');
    var gen = el('div', 'gen');
    data.appendChild(tbl); data.appendChild(gen);
    [head, hint, trk, ctrl, btns, graphs, data].forEach(function (e) { root.appendChild(e); });
    var tbody = tbl.querySelector('tbody');

    var XR = 100;
    this.running = false;
    this.reset = function () {
      self.running = false; self.t = 0; self.v = sv.get(); self.x0 = sx.get();
      var T1 = 10;
      if (self.v > 0) T1 = Math.min(10, (XR - self.x0) / self.v);
      if (self.v < 0) T1 = Math.min(10, (-XR - self.x0) / self.v);
      self.T = T1; self.rows = [];
      var lo = Math.min(0, self.x0, self.x(T1)), hi = Math.max(0, self.x0, self.x(T1));
      if (hi - lo < 20) { hi = Math.max(hi, lo + 20); }
      var st = niceStep(hi - lo, 4);
      self.ymin = Math.floor(lo / st) * st; self.ymax = Math.ceil(hi / st) * st; self.ystep = st;
      if (self.ymax - hi < st * 0.25) self.ymax += st;
      if (lo - self.ymin < st * 0.25 && lo < 0) self.ymin -= st;
      tbody.innerHTML = ''; self.addRow(0);
      bPlay.textContent = L.play; bStep.disabled = false;
      self.draw();
    };
    this.x = function (t) { return self.x0 + self.v * t; };
    this.addRow = function (s) {
      var x = self.x(s), prev = self.rows.length ? self.rows[self.rows.length - 1] : null;
      self.rows.push(x);
      var tr = el('tr', '', '<td>' + s + '</td><td>' + fmt(x, 1) + '</td><td class="d">' + (prev === null ? '—' : sg(x - prev, 1)) + '</td>');
      tbody.appendChild(tr);
      tbl.scrollTop = tbl.scrollHeight;
    };
    this.advance = function (dt) {
      var nt = Math.min(self.T, self.t + dt);
      for (var s = Math.floor(self.t) + 1; s <= Math.floor(nt + 1e-9); s++) self.addRow(s);
      self.t = nt;
      if (self.t >= self.T - 1e-9) { self.running = false; bPlay.textContent = L.again; bStep.disabled = true; }
    };
    var run = Runner(this);
    bPlay.addEventListener('click', function () {
      if (self.running) { self.running = false; bPlay.textContent = L.resume; return; }
      if (self.t >= self.T - 1e-9) self.reset();
      pauseAll(self); self.running = true; bPlay.textContent = L.pause; run();
    });
    bStep.addEventListener('click', function () {
      self.running = false;
      var target = Math.min(self.T, Math.floor(self.t + 1e-9) + 1);
      self.advance(target - self.t); if (self.t < self.T - 1e-9) bPlay.textContent = self.t > 0 ? L.resume : L.play; self.draw();
    });
    bReset.addEventListener('click', function () { self.reset(); });
    sv.input.addEventListener('input', function () { self.reset(); });
    sx.input.addEventListener('input', function () { self.reset(); });

    this.draw = function () {
      var c = C(), t = self.t, v = self.v, x0 = self.x0;
      clock.textContent = 't = ' + fmt(t, 1) + ' s   x = ' + fmt(self.x(t), 1) + ' m';
      track(trk, { xmin: -XR, xmax: XR, x: self.x(t), dir: v < 0 ? -1 : 1, strobe: self.rows, v: v, vScale: 6 });
      plot(c1, { tmax: 10, tstep: w2(c1) < 340 ? 2 : 1, ymin: self.ymin, ymax: self.ymax, ystep: self.ystep, ylab: 'x (m)', color: c.cx, f: self.x, tNow: t,
        tri: v !== 0 ? { t1: 2, t2: 4, dt: 'Δt = 2 s', dy: 'Δx = ' + sg(2 * v, 1) + ' m' } : null });
      plot(c2, { tmax: 10, tstep: w2(c2) < 340 ? 2 : 1, ymin: -12, ymax: 12, ystep: 4, ylab: 'v (m/s)', color: c.cv, f: function () { return v; }, tNow: t, area: true });
      n1.innerHTML = '<span>' + L.slope + ':</span> <span class="m">v = Δx / Δt = ' + sg(v, 1) + ' m/s</span>';
      n2.innerHTML = '<span>' + L.area + ':</span> <span class="m">Δx = v·t = ' + par(v, 1) + '·' + fmt(t, 1) + ' = ' + sg(v * t, 1) + ' m</span>';
      // generalisation panel
      var n = self.rows.length - 1, html = '';
      if (v === 0 && n >= 2) html += '<div class="obs">' + S.rest + '</div>';
      else if (n >= 3) html += '<div class="obs">' + S.obs(sg(self.rows[n] - self.rows[n - 1], 1)) + '</div>';
      else html += '<div class="obs">' + S.wait + '</div>';
      html += '<div><b>' + S.model + '</b></div>';
      html += '<div class="eq">v = Δx / Δt = ' + sg(v, 1) + ' m / 1 s = ' + sg(v, 1) + ' m/s</div>';
      html += '<div class="eq">x = x₀ + v·t = ' + fmt(x0, 1) + ' + ' + par(v, 1) + '·t</div>';
      html += '<div class="eq">t = ' + fmt(t, 1) + ' s → x = ' + fmt(x0, 1) + ' + ' + par(v, 1) + '·' + fmt(t, 1) + ' = ' + fmt(self.x(t), 1) + ' m</div>';
      gen.innerHTML = html;
    };
    this.pause = function () { if (self.running) { self.running = false; bPlay.textContent = L.resume; } };
    this.reset();
    allSims.push(this);
  }
  function w2(cv) { return cv.getBoundingClientRect().width; }

  /* ------------------------------------------------------------------ */
  /* SIM 2 — acceleration                                                */
  /* ------------------------------------------------------------------ */
  function SimACC(root, lang) {
    var L = T[lang], S = L.acc, self = this;
    root.innerHTML = '';
    var head = el('div', 'sh', '<h4>' + S.title + '</h4><span class="tag">' + S.tag + '</span>');
    var hint = el('p', 'hint', S.hint);
    var trk = el('canvas', 'track'); trk.style.height = '170px'; trk.setAttribute('aria-hidden', 'true');
    var ctrl = el('div', 'ctrl');
    var sv = slider('v', S.v0, -10, 10, 1, 2, 'm/s'), sa = slider('a', S.a, -4, 4, 0.5, 3, 'm/s²');
    ctrl.appendChild(sv.el); ctrl.appendChild(sa.el);
    var btns = el('div', 'btns');
    var bPlay = el('button', 'btn primary', L.play), bStep = el('button', 'btn', L.step), bReset = el('button', 'btn', L.reset), status = el('span', 'status'), clock = el('span', 'clock');
    [bPlay, bStep, bReset].forEach(function (b) { b.type = 'button'; btns.appendChild(b); }); bStep.dir = 'ltr'; btns.appendChild(status); btns.appendChild(clock);
    var graphs = el('div', 'graphs');
    var g1 = el('div', '', '<h5>' + S.vt + '</h5>'), c1 = el('canvas'), n1 = el('div', 'gnote');
    var g2 = el('div', '', '<h5>' + S.at + '</h5>'), c2 = el('canvas'), n2 = el('div', 'gnote');
    g1.appendChild(n1); g1.appendChild(c1); g2.appendChild(n2); g2.appendChild(c2); graphs.appendChild(g1); graphs.appendChild(g2);
    var data = el('div', 'data acc');
    var tbl = el('div', 'tbl', '<table><thead><tr><th>t (s)</th><th>v (m/s)</th><th>' + S.col + '</th></tr></thead><tbody></tbody></table>');
    var gen = el('div', 'gen');
    data.appendChild(tbl); data.appendChild(gen);
    [head, hint, trk, ctrl, btns, graphs, data].forEach(function (e) { root.appendChild(e); });
    var tbody = tbl.querySelector('tbody');
    var TT = 8;
    this.running = false;
    this.v = function (t) { return self.v0 + self.a * t; };
    this.x = function (t) { return self.v0 * t + 0.5 * self.a * t * t; };
    this.reset = function () {
      self.running = false; self.t = 0; self.v0 = sv.get(); self.a = sa.get(); self.T = TT;
      var lo = 0, hi = 0;
      for (var i = 0; i <= 80; i++) { var xx = self.x(TT * i / 80); lo = Math.min(lo, xx); hi = Math.max(hi, xx); }
      if (hi - lo < 20) { var mid = (hi + lo) / 2; lo = mid - 10; hi = mid + 10; }
      var padd = (hi - lo) * 0.08; self.xmin = lo - padd; self.xmax = hi + padd;
      var vlo = Math.min(0, self.v(0), self.v(TT)), vhi = Math.max(0, self.v(0), self.v(TT));
      var vs = niceStep(Math.max(8, vhi - vlo), 4);
      self.vmin = Math.min(-vs, Math.floor(vlo / vs) * vs); self.vmax = Math.max(vs, Math.ceil(vhi / vs) * vs);
      if (self.vmax - self.vmin < 3 * vs) { if (vhi > -vlo) self.vmax += vs; else self.vmin -= vs; }
      self.vstep = vs;
      self.strobe = []; self.vrows = [];
      tbody.innerHTML = ''; self.addRow(0);
      bPlay.textContent = L.play; bStep.disabled = false;
      self.draw();
    };
    this.addRow = function (s) {
      var v = self.v(s), prev = self.vrows.length ? self.vrows[self.vrows.length - 1] : null;
      self.vrows.push(v); self.strobe.push(self.x(s));
      tbody.appendChild(el('tr', '', '<td>' + s + '</td><td>' + fmt(v, 1) + '</td><td class="d">' + (prev === null ? '—' : sg(v - prev, 1)) + '</td>'));
      tbl.scrollTop = tbl.scrollHeight;
    };
    this.advance = function (dt) {
      var nt = Math.min(self.T, self.t + dt);
      for (var s = Math.floor(self.t) + 1; s <= Math.floor(nt + 1e-9); s++) self.addRow(s);
      self.t = nt;
      if (self.t >= self.T - 1e-9) { self.running = false; bPlay.textContent = L.again; bStep.disabled = true; }
    };
    var run = Runner(this);
    bPlay.addEventListener('click', function () {
      if (self.running) { self.running = false; bPlay.textContent = L.resume; return; }
      if (self.t >= self.T - 1e-9) self.reset();
      pauseAll(self); self.running = true; bPlay.textContent = L.pause; run();
    });
    bStep.addEventListener('click', function () {
      self.running = false;
      var target = Math.min(self.T, Math.floor(self.t + 1e-9) + 1);
      self.advance(target - self.t); if (self.t < self.T - 1e-9) bPlay.textContent = self.t > 0 ? L.resume : L.play; self.draw();
    });
    bReset.addEventListener('click', function () { self.reset(); });
    sv.input.addEventListener('input', function () { self.reset(); });
    sa.input.addEventListener('input', function () { self.reset(); });

    this.state = function (t) {
      var v = self.v(t), a = self.a, eps = 1e-6;
      if (Math.abs(a) < eps) return Math.abs(v) < eps ? 'rest' : 'flat';
      if (Math.abs(v) < 0.05) return 'stop';
      return (v > 0) === (a > 0) ? 'up' : 'down';
    };
    this.draw = function () {
      var c = C(), t = self.t, v = self.v(t), a = self.a;
      clock.textContent = 't = ' + fmt(t, 1) + ' s   v = ' + fmt(v, 1) + ' m/s';
      var st = self.state(t);
      status.className = 'status ' + (st === 'up' ? 'up' : st === 'down' ? 'down' : 'flat');
      status.innerHTML = S.st[st];
      var tw = w2(trk) || 600;
      var vScale = Math.min(6, 0.4 * tw / Math.max(10, Math.abs(self.v(0)), Math.abs(self.v(TT))));
      track(trk, { xmin: self.xmin, xmax: self.xmax, x: self.x(t), dir: Math.abs(v) < 1e-6 ? (a < 0 ? -1 : 1) : (v < 0 ? -1 : 1), strobe: self.strobe, dotColor: c.ca, v: v, vScale: vScale, a: a, aScale: 14 });
      var narrow = w2(c1) < 340;
      plot(c1, { tmax: TT, tstep: narrow ? 2 : 1, ymin: self.vmin, ymax: self.vmax, ystep: self.vstep, ylab: 'v (m/s)', color: c.cv, f: self.v, tNow: t,
        tri: a !== 0 ? { t1: 1, t2: 4, dt: 'Δt = 3 s', dy: 'Δv = ' + sg(3 * a, 1) } : null });
      plot(c2, { tmax: TT, tstep: narrow ? 2 : 1, ymin: -5, ymax: 5, ystep: narrow ? 2.5 : 1, ylab: 'a (m/s²)', color: c.ca, f: function () { return a; }, tNow: t, area: true });
      n1.innerHTML = '<span>' + L.slope + ':</span> <span class="m">a = Δv / Δt = ' + sg(a, 1) + ' m/s²</span>';
      n2.innerHTML = '<span>' + L.area + ':</span> <span class="m">Δv = a·t = ' + par(a, 1) + '·' + fmt(t, 1) + ' = ' + sg(a * t, 1) + ' m/s</span>';
      var n = self.vrows.length - 1, html = '';
      if (a === 0 && n >= 2) html += '<div class="obs">' + S.zero + '</div>';
      else if (n >= 3) html += '<div class="obs">' + S.obs(sg(self.vrows[n] - self.vrows[n - 1], 1)) + '</div>';
      else html += '<div class="obs">' + S.wait + '</div>';
      html += '<div><b>' + S.model + '</b></div>';
      html += '<div class="eq">a = Δv / Δt = ' + sg(a, 1) + ' m/s ÷ 1 s = ' + sg(a, 1) + ' m/s²</div>';
      html += '<div class="eq">v = v₀ + a·t = ' + fmt(self.v0, 1) + ' + ' + par(a, 1) + '·t</div>';
      html += '<div class="eq">t = ' + fmt(t, 1) + ' s → v = ' + fmt(self.v0, 1) + ' + ' + par(a, 1) + '·' + fmt(t, 1) + ' = ' + fmt(v, 1) + ' m/s</div>';
      gen.innerHTML = html;
    };
    this.pause = function () { if (self.running) { self.running = false; bPlay.textContent = L.resume; } };
    this.reset();
    allSims.push(this);
  }
  function pauseAll(except) { allSims.forEach(function (s) { if (s !== except && s.pause) s.pause(); }); }

  /* ------------------------------------------------------------------ */
  /* Δv widget                                                           */
  /* ------------------------------------------------------------------ */
  function DV(root, lang) {
    var S = T[lang].dv;
    root.innerHTML = '<h4>' + S.title + '</h4>';
    var ctrl = el('div', 'ctrl');
    var si = slider('v', S.vi, -20, 20, 1, 10, 'm/s'), ss = slider('v', S.vs, -20, 20, 1, -10, 'm/s'), sd = slider('a', S.dt, 1, 10, 1, 4, 's', true);
    sd.el.querySelector('output').classList.add('m');
    [si, ss, sd].forEach(function (s) { ctrl.appendChild(s.el); });
    var cv = el('canvas'), out = el('div', 'out'), warn = el('div', 'warnline');
    root.appendChild(ctrl); root.appendChild(cv); root.appendChild(out); root.appendChild(warn);
    function draw() {
      var vi = si.get(), vs = ss.get(), dt = sd.get(), dv = vs - vi, a = dv / dt, c = C();
      var P = prep(cv);
      if (P) {
        var ctx = P.ctx, w = P.w, h = P.h, pad = 30;
        var X = function (v) { return pad + (v + 42) / 84 * (w - 2 * pad); };
        // axis
        ctx.strokeStyle = c.line; ctx.lineWidth = 1;
        for (var v = -40; v <= 40; v += 10) { ctx.beginPath(); ctx.moveTo(X(v), 8); ctx.lineTo(X(v), h - 22); ctx.stroke(); text(ctx, fmt(v, 0), X(v), h - 6, { align: 'center', color: v === 0 ? c.ink : c.muted, weight: v === 0 ? 700 : 500 }); }
        ctx.strokeStyle = c.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(0), 8); ctx.lineTo(X(0), h - 22); ctx.stroke();
        var rows = [[X(0), X(vi), c.cv, 'v_ilk', 30], [X(0), X(vs), c.cv, 'v_son', 66], [X(vi), X(vs), c.ca, 'Δv', 104]];
        rows.forEach(function (r) {
          if (Math.abs(r[1] - r[0]) < 1) { ctx.fillStyle = r[2]; ctx.beginPath(); ctx.arc(r[0], r[4], 4, 0, 7); ctx.fill(); }
          else arrow(ctx, r[0], r[4], r[1], r[2], 4, 10);
          text(ctx, r[3], r[1] + (r[1] >= r[0] ? 8 : -8), r[4] + 4, { align: r[1] >= r[0] ? 'left' : 'right', color: r[2], weight: 700, size: 12.5, halo: true });
        });
        ctx.setLineDash([3, 3]); ctx.strokeStyle = c.muted; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(X(vi), 30); ctx.lineTo(X(vi), 104); ctx.moveTo(X(vs), 66); ctx.lineTo(X(vs), 104); ctx.stroke(); ctx.setLineDash([]);
      }
      out.innerHTML = 'Δv = v<sub>son</sub> − v<sub>ilk</sub> = ' + par(vs, 0) + ' − ' + par(vi, 0) + ' = <b style="color:var(--ca)">' + sg(dv, 0) + ' m/s</b><br>a = Δv / Δt = ' + sg(dv, 0) + ' / ' + dt + ' = <b style="color:var(--ca)">' + sg(a, 2) + ' m/s²</b>';
      warn.textContent = (vi * vs < 0) ? S.turn : '';
    }
    [si, ss, sd].forEach(function (s) { s.input.addEventListener('input', draw); });
    root._draw = draw; draw();
  }

  /* ------------------------------------------------------------------ */
  /* km/h ↔ m/s                                                          */
  /* ------------------------------------------------------------------ */
  function KMH(root, lang) {
    var S = T[lang].kmh;
    root.innerHTML = '<h4>' + S.title + '</h4>';
    var s = slider('v', S.l, 0, 144, 3.6, 72, 'km/h');
    s.el.querySelector('output').textContent = '';
    var out = el('div', 'out');
    root.appendChild(s.el); root.appendChild(out);
    function upd() { var k = s.get(); s.el.querySelector('output').textContent = fmt(k, 1) + ' km/h'; out.innerHTML = fmt(k, 1) + ' km/h ÷ 3,6 = <b style="color:var(--cv)">' + fmt(k / 3.6, 1) + ' m/s</b> &nbsp;·&nbsp; ' + fmt(k / 3.6, 1) + ' m/s × 3,6 = ' + fmt(k, 1) + ' km/h'; }
    s.input.addEventListener('input', upd); upd();
  }

  /* ------------------------------------------------------------------ */
  /* static figures                                                      */
  /* ------------------------------------------------------------------ */
  var FIGS = {
    walk: function (cv) {
      var P = prep(cv); if (!P) return;
      var ctx = P.ctx, w = P.w, h = P.h, c = C(), pad = 28;
      var X = function (x) { return pad + (x + 2) / 12 * (w - 2 * pad); };
      var ax = h - 26;
      ctx.strokeStyle = c.muted; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(pad - 10, ax); ctx.lineTo(w - pad + 10, ax); ctx.stroke();
      for (var x = -2; x <= 10; x++) { ctx.beginPath(); ctx.moveTo(X(x), ax - (x === 0 ? 7 : 4)); ctx.lineTo(X(x), ax + (x === 0 ? 7 : 4)); ctx.strokeStyle = x === 0 ? c.ink : c.muted; ctx.lineWidth = x === 0 ? 2 : 1; ctx.stroke(); if (x % 2 === 0 || x === 3) text(ctx, fmt(x, 0), X(x), ax + 18, { align: 'center', color: x === 0 || x === 3 ? c.ink : c.muted, weight: x === 0 || x === 3 ? 700 : 500 }); }
      text(ctx, 'x (m)', w - 4, ax - 8, { align: 'right', size: 10.5 });
      arrow(ctx, X(0), 22, X(8), c.ink, 3, 9); text(ctx, '+8 m', (X(0) + X(8)) / 2, 15, { align: 'center', color: c.ink, weight: 600, size: 12 });
      arrow(ctx, X(8), 50, X(3), c.ink, 3, 9); text(ctx, '−5 m', (X(8) + X(3)) / 2, 43, { align: 'center', color: c.ink, weight: 600, size: 12 });
      arrow(ctx, X(0), 82, X(3), c.cx, 4, 10); text(ctx, 'Δx = +3 m', X(3) + 10, 86, { align: 'left', color: c.cx, weight: 700, size: 12.5 });
      ctx.setLineDash([3, 3]); ctx.strokeStyle = c.muted; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(8), 22); ctx.lineTo(X(8), 50); ctx.moveTo(X(3), 50); ctx.lineTo(X(3), ax); ctx.moveTo(X(0), 22); ctx.lineTo(X(0), ax); ctx.stroke(); ctx.setLineDash([]);
    },
    xt4: function (cv) {
      var c = C();
      plot(cv, { tmax: 8, tstep: 1, ymin: -20, ymax: 40, ystep: 10, ylab: 'x (m)', color: c.cx,
        segs: [[0, 0, 8, 40]],
        labels: [{ t: 8, y: 40, dx: 7, dy: 5, align: 'left', s: 'A', color: c.cx, size: 13 }] });
      var P = cv.getContext('2d'), r = cv.getBoundingClientRect();
      if (r.width < 4) return;
      // extra lines drawn over the same axes
      var m = { l: 44, r: 34, t: 24, b: 24 }, w = r.width, h = r.height;
      var X = function (t) { return m.l + t / 8 * (w - m.l - m.r); }, Y = function (y) { return m.t + (40 - y) / 60 * (h - m.t - m.b); };
      var lines = [[0, 0, 8, 16, c.cv, 'B: v = +2 m/s', 0], [0, 20, 8, 20, c.muted, 'C: v = 0', 0], [0, 30, 8, -10, c.ca, 'D: v = −5 m/s', 0]];
      P.lineWidth = 2.6; P.lineCap = 'round';
      lines.forEach(function (L) { P.strokeStyle = L[4]; P.beginPath(); P.moveTo(X(L[0]), Y(L[1])); P.lineTo(X(L[2]), Y(L[3])); P.stroke(); });
      text(P, 'B', X(8) + 7, Y(16) + 5, { align: 'left', color: c.cv, weight: 700, size: 13, halo: true });
      text(P, 'C', X(8) + 7, Y(20) + 5, { align: 'left', color: c.muted, weight: 700, size: 13, halo: true });
      text(P, 'D', X(8) + 7, Y(-10) + 5, { align: 'left', color: c.ca, weight: 700, size: 13, halo: true });
    },
    vtarea: function (cv) {
      var c = C();
      plot(cv, { tmax: 9, tstep: 1, ymin: -6, ymax: 8, ystep: 2, ylab: 'v (m/s)', color: c.cv, area: true,
        segs: [[0, 6, 4, 6], [4, -3, 8, -3]],
        labels: [{ t: 2, y: 3, dy: 4, s: '+24 m', color: c.ink, size: 13 }, { t: 6, y: -1.5, dy: 4, s: '−12 m', color: c.ink, size: 13 }] });
      var P = cv.getContext('2d'), r = cv.getBoundingClientRect(); if (r.width < 4) return;
      var m = { l: 44, r: 34, t: 24, b: 24 }, w = r.width, h = r.height;
      var X = function (t) { return m.l + t / 9 * (w - m.l - m.r); }, Y = function (y) { return m.t + (8 - y) / 14 * (h - m.t - m.b); };
      P.setLineDash([3, 3]); P.strokeStyle = c.cv; P.lineWidth = 1.5; P.beginPath(); P.moveTo(X(4), Y(6)); P.lineTo(X(4), Y(-3)); P.stroke(); P.setLineDash([]);
    },
    vtslope: function (cv) {
      var c = C();
      plot(cv, { tmax: 5, tstep: 1, ymin: 0, ymax: 20, ystep: 4, ylab: 'v (m/s)', color: c.cv, segs: [[0, 4, 4, 16]],
        tri: { t1: 0, t2: 4, dt: 'Δt = 4 s', dy: 'Δv = 12 m/s' }, dots: [[0, 4], [4, 16]],
        labels: [{ t: 0.15, y: 18, dy: 0, align: 'left', s: 'a = 12 / 4 = 3 m/s²', color: c.ca }] });
    },
    atarea: function (cv) {
      var c = C();
      plot(cv, { tmax: 5, tstep: 1, ymin: 0, ymax: 4, ystep: 1, ylab: 'a (m/s²)', color: c.ca, segs: [[0, 3, 4, 3]], area: true,
        labels: [{ t: 2, y: 1.5, dy: 4, s: 'Δv = 3·4 = 12 m/s', color: c.ink, size: 12.5 }] });
    }
  };

  /* ------------------------------------------------------------------ */
  /* quiz                                                                */
  /* ------------------------------------------------------------------ */
  var G = {
    q2: { tmax: 6, tstep: 1, ymin: 0, ymax: 50, ystep: 10, ylab: 'x (m)', k: 'cx', segs: [[0, 10, 5, 40]], dots: [[0, 10], [5, 40]] },
    q3: { tmax: 7, tstep: 1, ymin: -6, ymax: 2, ystep: 2, ylab: 'v (m/s)', k: 'cv', segs: [[0, -4, 6, -4]], area: true },
    q6: { tmax: 6, tstep: 1, ymin: 0, ymax: 30, ystep: 10, ylab: 'x (m)', k: 'cx', segs: [[0, 20, 6, 20]] },
    q12: { tmax: 6, tstep: 1, ymin: 0, ymax: 3, ystep: 1, ylab: 'a (m/s²)', k: 'ca', segs: [[0, 2, 5, 2]], area: true }
  };
  var QUIZ = {
    tr: [
      { c: 'FİZ.10.1.1', q: 'Düz bir yolda giden bir araç her 2 saniyede 30 m yer değiştiriyor. Bu hareket için hangisi doğrudur?', o: ['Hızı 15 m/s olan sabit hızlı hareket', 'Hızı 60 m/s olan sabit hızlı hareket', 'İvmesi 15 m/s² olan hızlanan hareket', 'Hızı her saniye azalan hareket'], a: 0, e: 'Eşit zamanlarda eşit yer değiştirme → sabit hız. v = Δx/Δt = 30 / 2 = 15 m/s; ivme sıfırdır.' },
      { c: 'FİZ.10.1.1', g: 'q2', q: 'Konum–zaman grafiği verilen cismin hızı kaç m/s’dir?', o: ['8', '6', '2', '10'], a: 1, e: 'Eğim = Δx/Δt = (40 − 10) / (5 − 0) = 30 / 5 = 6 m/s. Hız, konumun kendisinden değil konumdaki değişimden bulunur.' },
      { c: 'FİZ.10.1.1', g: 'q3', q: 'Hız–zaman grafiği verilen cismin 0–6 s arasındaki yer değiştirmesi kaç m’dir?', o: ['+24', '−24', '−4', '0'], a: 1, e: 'Alan = v·Δt = (−4)·6 = −24 m. Alan zaman ekseninin altında olduğu için yer değiştirme (−) yöndedir; alınan yol ise 24 m’dir.' },
      { c: 'FİZ.10.1.1', q: 'Ali evinin önünden (x = 0) doğuya 300 m yürüyor, sonra aynı yoldan 100 m geri dönüyor. Doğu (+) ise alınan yol ve yer değiştirme nedir?', o: ['Yol 400 m, Δx = +200 m', 'Yol 200 m, Δx = +400 m', 'Yol 400 m, Δx = +400 m', 'Yol 200 m, Δx = −100 m'], a: 0, e: 'Alınan yol, izlenen yolun toplam uzunluğudur: 300 + 100 = 400 m. Yer değiştirme = son konum − ilk konum = 200 − 0 = +200 m.' },
      { c: 'FİZ.10.1.1', q: '72 km/h kaç m/s’dir?', o: ['7,2', '20', '259,2', '36'], a: 1, e: 'km/h’ten m/s’ye geçmek için 3,6’ya bölünür: 72 ÷ 3,6 = 20 m/s.' },
      { c: 'FİZ.10.1.1', g: 'q6', q: 'Konum–zaman grafiği verilen cisim için hangisi doğrudur?', o: ['20 m/s hızla gidiyor', 'Durgundur (v = 0)', 'Sabit ivmeyle hızlanıyor', '20 m yer değiştirmiştir'], a: 1, e: 'Konum zamanla değişmiyor, grafiğin eğimi sıfır → hız sıfır. Cisim 20 m konumunda duruyor.' },
      { c: 'FİZ.10.1.1', q: 'A aracı x = 0’dan +10 m/s ile, B aracı aynı anda x = 120 m’den −5 m/s ile hareket ediyor. Kaçıncı saniyede karşılaşırlar?', o: ['6', '8', '12', '24'], a: 1, e: 'x_A = 10t ve x_B = 120 − 5t. Karşılaşmada konumlar eşit: 10t = 120 − 5t → 15t = 120 → t = 8 s (x = 80 m’de).' },
      { c: 'FİZ.10.1.2', q: 'Bir araç 4 s içinde hızını düzgün olarak 6 m/s’den 18 m/s’ye çıkarıyor. İvmesi kaç m/s²’dir?', o: ['3', '4,5', '12', '1,5'], a: 0, e: 'a = Δv/Δt = (18 − 6) / 4 = 12 / 4 = 3 m/s². Hız her saniye 3 m/s artıyor.' },
      { c: 'FİZ.10.1.2', q: '+10 m/s hızla giden bir araç 4 s sonra ters yönde −10 m/s hızla gidiyor. Ortalama ivmesi kaç m/s²’dir?', o: ['0', '−5', '+5', '−2,5'], a: 1, e: 'Δv = v_son − v_ilk = (−10) − (+10) = −20 m/s, a = −20 / 4 = −5 m/s². Sürat aynı (10 m/s) kalsa da yön değiştiği için hız değişti; ivme sıfır değildir.' },
      { c: 'FİZ.10.1.2', q: 'Bir cismin hızı v = −8 m/s, ivmesi a = −2 m/s². Hangisi doğrudur?', o: ['Yavaşlıyor, çünkü ivme negatif', 'Hızlanıyor, çünkü v ve a aynı yönde', 'Sabit hızla gidiyor', 'Hemen duracak'], a: 1, e: 'İvmenin işareti tek başına karar vermez. v ve a ikisi de (−) → aynı yönde → cisim (−) yönde hızlanıyor.' },
      { c: 'FİZ.10.1.2', q: 'Bir aracın hızı t = 0, 1, 2, 3 s’de sırasıyla 20, 16, 12, 8 m/s ölçülüyor. Örüntü sürerse ivme ve t = 5 s’deki hız nedir?', o: ['a = −4 m/s², v = 0', 'a = +4 m/s², v = 0', 'a = −4 m/s², v = 4 m/s', 'a = −8 m/s², v = −20 m/s'], a: 0, e: 'Her saniye Δv = −4 m/s → a = −4 m/s² (sabit). v = v₀ + a·t = 20 + (−4)·5 = 0: araç 5. saniyede durur.' },
      { c: 'FİZ.10.1.2', g: 'q12', q: 'İvme–zaman grafiği verilen cismin t = 0’daki hızı 3 m/s’dir. t = 5 s’deki hızı kaç m/s’dir?', o: ['10', '13', '2', '7'], a: 1, e: 'a–t grafiğinin altındaki alan hız değişimidir: Δv = 2·5 = 10 m/s. v = 3 + 10 = 13 m/s.' }
    ],
    ar: [
      { c: 'FİZ.10.1.1', q: 'سيارة على طريق مستقيم تُزاح 30 m كل 2 s. أيّ العبارات صحيحة؟', o: ['حركة بسرعة ثابتة مقدارها 15 m/s', 'حركة بسرعة ثابتة مقدارها 60 m/s', 'حركة متسارعة بتسارع 15 m/s²', 'حركة تتناقص سرعتها كل ثانية'], a: 0, e: 'إزاحات متساوية في أزمنة متساوية ← سرعة ثابتة. v = Δx/Δt = 30 ÷ 2 = 15 m/s، والتسارع صفر.' },
      { c: 'FİZ.10.1.1', g: 'q2', q: 'ما سرعة الجسم الذي يمثّله منحنى الموضع–الزمن (konum–zaman) التالي بوحدة m/s؟', o: ['8', '6', '2', '10'], a: 1, e: 'الميل = Δx/Δt = (40 − 10) ÷ (5 − 0) = 30 ÷ 5 = 6 m/s. السرعة تُحسب من تغيّر الموضع لا من الموضع نفسه.' },
      { c: 'FİZ.10.1.1', g: 'q3', q: 'ما إزاحة الجسم بين 0 و 6 s حسب منحنى السرعة–الزمن (hız–zaman)؟ (بالمتر)', o: ['+24', '−24', '−4', '0'], a: 1, e: 'المساحة = v·Δt = (−4)·6 = −24 m. المساحة تحت محور الزمن، فالإزاحة بالاتجاه السالب؛ أما المسافة المقطوعة (alınan yol) فهي 24 m.' },
      { c: 'FİZ.10.1.1', q: 'يمشي علي من أمام بيته (x = 0) نحو الشرق 300 m ثم يرجع على الطريق نفسه 100 m. إذا كان الشرق (+) فما المسافة المقطوعة والإزاحة؟', o: ['المسافة 400 m، Δx = +200 m', 'المسافة 200 m، Δx = +400 m', 'المسافة 400 m، Δx = +400 m', 'المسافة 200 m، Δx = −100 m'], a: 0, e: 'المسافة المقطوعة = طول المسار كله: 300 + 100 = 400 m. الإزاحة = الموضع النهائي − الابتدائي = 200 − 0 = +200 m.' },
      { c: 'FİZ.10.1.1', q: 'كم تساوي 72 km/h بوحدة m/s؟', o: ['7,2', '20', '259,2', '36'], a: 1, e: 'للتحويل من km/h إلى m/s نقسم على 3,6: 72 ÷ 3,6 = 20 m/s.' },
      { c: 'FİZ.10.1.1', g: 'q6', q: 'ماذا يمكن القول عن الجسم الذي يمثّله منحنى الموضع–الزمن التالي؟', o: ['يتحرك بسرعة 20 m/s', 'ساكن (v = 0)', 'يتسارع بتسارع ثابت', 'أُزيح 20 m'], a: 1, e: 'الموضع لا يتغير مع الزمن، والميل صفر ← السرعة صفر. الجسم واقف عند الموضع 20 m.' },
      { c: 'FİZ.10.1.1', q: 'تنطلق السيارة A من x = 0 بسرعة +10 m/s، وفي اللحظة نفسها تنطلق B من x = 120 m بسرعة −5 m/s. بعد كم ثانية تلتقيان؟', o: ['6', '8', '12', '24'], a: 1, e: 'x_A = 10t و x_B = 120 − 5t. عند الالتقاء يتساوى الموضعان: 10t = 120 − 5t ← 15t = 120 ← t = 8 s (عند x = 80 m).' },
      { c: 'FİZ.10.1.2', q: 'سيارة تزيد سرعتها بانتظام من 6 m/s إلى 18 m/s خلال 4 s. كم تسارعها بوحدة m/s²؟', o: ['3', '4,5', '12', '1,5'], a: 0, e: 'a = Δv/Δt = (18 − 6) ÷ 4 = 12 ÷ 4 = 3 m/s². أي أن السرعة تزيد 3 m/s كل ثانية.' },
      { c: 'FİZ.10.1.2', q: 'سيارة سرعتها +10 m/s، وبعد 4 s أصبحت تسير بالاتجاه المعاكس بسرعة −10 m/s. كم متوسط تسارعها بوحدة m/s²؟', o: ['0', '−5', '+5', '−2,5'], a: 1, e: 'Δv = v_son − v_ilk = (−10) − (+10) = −20 m/s، و a = −20 ÷ 4 = −5 m/s². مقدار السرعة بقي 10 m/s لكن الاتجاه تغيّر، فالسرعة تغيّرت والتسارع ليس صفرًا.' },
      { c: 'FİZ.10.1.2', q: 'جسم سرعته v = −8 m/s وتسارعه a = −2 m/s². أيّ العبارات صحيحة؟', o: ['تتناقص سرعته لأن التسارع سالب', 'تتزايد سرعته لأن v و a بالاتجاه نفسه', 'يتحرك بسرعة ثابتة', 'سيتوقف فورًا'], a: 1, e: 'إشارة التسارع وحدها لا تكفي. v و a كلاهما (−) ← بالاتجاه نفسه ← الجسم يتسارع (hızlanıyor) بالاتجاه السالب.' },
      { c: 'FİZ.10.1.2', q: 'قيست سرعة سيارة عند t = 0, 1, 2, 3 s فكانت 20, 16, 12, 8 m/s. إذا استمر النمط، فما التسارع والسرعة عند t = 5 s؟', o: ['a = −4 m/s²، v = 0', 'a = +4 m/s²، v = 0', 'a = −4 m/s²، v = 4 m/s', 'a = −8 m/s²، v = −20 m/s'], a: 0, e: 'في كل ثانية Δv = −4 m/s ← a = −4 m/s² (ثابت). v = v₀ + a·t = 20 + (−4)·5 = 0: السيارة تتوقف عند الثانية 5.' },
      { c: 'FİZ.10.1.2', g: 'q12', q: 'سرعة جسم عند t = 0 هي 3 m/s، ومنحنى التسارع–الزمن له كما في الشكل. كم سرعته عند t = 5 s بوحدة m/s؟', o: ['10', '13', '2', '7'], a: 1, e: 'المساحة تحت منحنى a–t تساوي تغيّر السرعة: Δv = 2·5 = 10 m/s، إذن v = 3 + 10 = 13 m/s.' }
    ]
  };

  var MATH_RUN = /[0-9A-Za-z_\u00C0-\u024FΔ₀-₉+\-−=·×÷\/,.()²%|→ ]+/g;
  function protect(str) {
    return str.replace(MATH_RUN, function (run) {
      if (!/[0-9Δ=]/.test(run)) return run;
      var lead = run.match(/^\s*/)[0], trail = run.match(/\s*$/)[0], core = run.trim(), head = '', tail = '';
      while (core && '.,:'.indexOf(core.charAt(core.length - 1)) >= 0) { tail = core.charAt(core.length - 1) + tail; core = core.slice(0, -1); }
      if (core.charAt(0) === '(' && core.indexOf(')') < 0) { head = '('; core = core.slice(1); }
      if (core.charAt(core.length - 1) === ')' && core.indexOf('(') < 0) { tail = ')' + tail; core = core.slice(0, -1); }
      if (!core || !/[0-9Δ=]/.test(core)) return run;
      return lead + head + '<bdi dir="ltr">' + core + '</bdi>' + tail + trail;
    });
  }
  var quizCanvases = [];
  function Quiz(root, lang) {
    var L = T[lang].quiz, Q = QUIZ[lang], P = lang === 'ar' ? protect : function (x) { return x; };
    root.innerHTML = '';
    var correct = 0, answered = 0;
    var score = el('div', 'score');
    var sTxt = el('span'); var sBtn = el('button', '', L.reset); sBtn.type = 'button';
    score.appendChild(sTxt); score.appendChild(sBtn);
    function upd() { sTxt.innerHTML = L.score + ': <bdi dir="ltr">' + correct + ' / ' + Q.length + '</bdi>' + (answered < Q.length ? ' · ' + L.done + ': <bdi dir="ltr">' + answered + '</bdi>' : ''); }
    Q.forEach(function (q, i) {
      var card = el('div', 'qcard');
      card.appendChild(el('div', 'qh', '<span class="qn">' + (i + 1) + '</span><span class="qt">' + P(q.q) + '</span><span class="qc">' + q.c + '</span>'));
      if (q.g) { var cv = el('canvas'); card.appendChild(cv); quizCanvases.push([cv, q.g]); }
      var opts = el('div', 'opts'), why = el('div', 'why'); why.hidden = true;
      q.o.forEach(function (o, k) {
        var b = el('button', '', '<b dir="ltr">' + 'ABCD'[k] + ')</b><span>' + P(o) + '</span>'); b.type = 'button';
        b.addEventListener('click', function () {
          var bs = opts.querySelectorAll('button');
          bs.forEach(function (x) { x.disabled = true; });
          bs[q.a].classList.add('ok');
          if (k !== q.a) b.classList.add('no'); else correct++;
          answered++;
          why.innerHTML = (k === q.a ? '<b class="ok">' + L.ok + '</b> ' : '<b class="no">' + L.no + '</b> ' + L.right + '<bdi dir="ltr">' + 'ABCD'[q.a] + '</bdi>. ') + P(q.e);
          why.hidden = false; upd();
        });
        opts.appendChild(b);
      });
      card.appendChild(opts); card.appendChild(why);
      root.appendChild(card);
    });
    root.appendChild(score);
    sBtn.addEventListener('click', function () { Quiz(root, lang); drawAll(); });
    upd();
  }
  function drawQuizGraphs() {
    quizCanvases.forEach(function (p) {
      var g = G[p[1]], c = C();
      plot(p[0], { tmax: g.tmax, tstep: g.tstep, ymin: g.ymin, ymax: g.ymax, ystep: g.ystep, ylab: g.ylab, color: c[g.k], segs: g.segs, area: g.area, dots: g.dots });
    });
  }

  /* ------------------------------------------------------------------ */
  /* hero strobe strip                                                   */
  /* ------------------------------------------------------------------ */
  function hero(root) {
    var make = function (xs, color, label) {
      var s = '<svg viewBox="0 0 560 44" role="img" aria-label="' + label + '"><line x1="8" y1="22" x2="552" y2="22" stroke="var(--line)" stroke-width="2"/>';
      var lastL = -99;
      xs.forEach(function (x, i) {
        var lbl = (x - lastL >= 14) ? '<text x="' + x + '" y="42" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" fill="var(--muted)">' + i + '</text>' : '';
        if (lbl) lastL = x;
        s += '<g class="d" style="animation-delay:' + (i * 0.11).toFixed(2) + 's"><circle cx="' + x + '" cy="22" r="6.5" fill="' + color + '"/>' + lbl + '</g>';
      });
      return s + '</svg>';
    };
    var a = [], b = [];
    for (var i = 0; i <= 9; i++) { a.push(24 + i * 56); b.push(24 + i * i * 6.4); }
    var rows = root.querySelectorAll('.row svg-slot');
    if (rows[0]) rows[0].outerHTML = make(a, 'var(--cv)', 'v');
    rows = root.querySelectorAll('.row svg-slot');
    if (rows[0]) rows[0].outerHTML = make(b, 'var(--ca)', 'a');
  }

  /* ------------------------------------------------------------------ */
  /* boot                                                                */
  /* ------------------------------------------------------------------ */
  function drawAll() {
    colCache = null;
    document.querySelectorAll('.lang:not([hidden]) [data-fig]').forEach(function (f) { var cv = f.querySelector('canvas'); if (cv && FIGS[f.dataset.fig]) FIGS[f.dataset.fig](cv); });
    allSims.forEach(function (s) { s.draw(); });
    document.querySelectorAll('[data-mini="dv"]').forEach(function (r) { if (r._draw) r._draw(); });
    drawQuizGraphs();
  }
  function init() {
    document.querySelectorAll('.lang').forEach(function (L) {
      var lang = L.id;
      L.querySelectorAll('[data-sim="cv"]').forEach(function (r) { new SimCV(r, lang); });
      L.querySelectorAll('[data-sim="acc"]').forEach(function (r) { new SimACC(r, lang); });
      L.querySelectorAll('[data-mini="dv"]').forEach(function (r) { DV(r, lang); });
      L.querySelectorAll('[data-mini="kmh"]').forEach(function (r) { KMH(r, lang); });
      L.querySelectorAll('[data-quiz]').forEach(function (r) { Quiz(r, lang); });
      L.querySelectorAll('.strobe').forEach(hero);
    });
    // language switch + hash routing (#ar, #tr, #ar-s1 …)
    var langs = document.querySelectorAll('.lang'), navs = document.querySelectorAll('.secnav'), btns = document.querySelectorAll('.switch button');
    function show(lang, target) {
      pauseAll(null);
      langs.forEach(function (e) { e.hidden = e.id !== lang; });
      navs.forEach(function (e) { e.hidden = e.dataset.lang !== lang; });
      btns.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false'); });
      document.documentElement.lang = lang;
      document.title = lang === 'ar' ? 'السرعة الثابتة والتسارع · فيزياء 10' : 'Sabit Hız ve İvme · 10. Sınıf Fizik';
      try { localStorage.setItem('fizik10-lang', lang); } catch (e) {}
      requestAnimationFrame(function () {
        drawAll();
        if (target) { var t = document.getElementById(target); if (t) t.scrollIntoView({ block: 'start' }); }
      });
    }
    function fromHash() {
      var h = location.hash.replace(/^#/, ''), m = h.match(/^(tr|ar)(?:-[a-z0-9-]+)?$/);
      if (m) { show(m[1], h.indexOf('-') > 0 ? h : null); return true; }
      return false;
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () { var l = b.dataset.lang; if (location.hash === '#' + l) show(l); else location.hash = l; window.scrollTo(0, 0); });
    });
    window.addEventListener('hashchange', fromHash);
    if (!fromHash()) { var l = 'ar'; try { l = localStorage.getItem('fizik10-lang') || 'ar'; } catch (e) {} show(l); }
    // redraw on resize / theme change
    var rt = null;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 120); });
    if (window.matchMedia) { var mq = window.matchMedia('(prefers-color-scheme: dark)'); (mq.addEventListener ? mq.addEventListener('change', drawAll) : mq.addListener(drawAll)); }
    new MutationObserver(drawAll).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawAll);
    document.addEventListener('visibilitychange', function () { if (document.hidden) pauseAll(null); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
