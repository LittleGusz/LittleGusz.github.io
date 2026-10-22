/* =====================================================================
   main.js — render konten dari PORTFOLIO, interaksi panel kontrol,
   dan semua animasi. Isi data cukup di js/data.js; file ini nggak perlu
   diubah.
   ===================================================================== */
(function () {
  "use strict";

  var D = window.PORTFOLIO || {};
  var I = window.I18N || { id: {}, en: {} };
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS = "http://www.w3.org/2000/svg";

  /* ---------------- helpers ---------------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function has(a) { return Array.isArray(a) && a.length > 0; }
  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }

  var lang = (function () {
    var s = store("pf-lang");
    if (s === "id" || s === "en") return s;
    var n = (navigator.language || "id").toLowerCase();
    return n.indexOf("id") === 0 || n.indexOf("in") === 0 ? "id" : "en";
  })();

  function t(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    return v[lang] != null ? v[lang] : (v.id != null ? v.id : (v.en || ""));
  }
  function ui(k) { return (I[lang] && I[lang][k]) || (I.id && I.id[k]) || k; }
  function catName(c) { var k = "filter_" + c, v = ui(k); return v === k ? c : v; }

  // pembuat elemen — teks selalu lewat textContent
  function el(tag, props) {
    var n = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v == null || v === false) return;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k === "style") n.style.cssText = v;
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      [].concat(arguments[i]).forEach(function (c) {
        if (c == null || c === false) return;
        n.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
      });
    }
    return n;
  }
  function sv(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(n);
    return n;
  }

  var ICONS = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3 7 9 6 9-6"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10.5V17M7.5 7v.01M11.5 17v-6.5M11.5 13a3 3 0 0 1 6 0v4"/>',
    whatsapp: '<path d="M4 20l1.3-4A8 8 0 1 1 8.5 19z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    out: '<path d="M7 17 17 7M8 7h9v9"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7.5"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
    cross: '<circle cx="12" cy="12" r="5"/><path d="M12 2v6M12 16v6M2 12h6M16 12h6"/>',
    images: '<rect x="3" y="6" width="14" height="12" rx="1.5"/><path d="M7 3h12a2 2 0 0 1 2 2v10M3 15l4-4 4 4 2-2 4 4"/>',
    pause: '<path d="M9 6v12M15 6v12"/>',
    play: '<path d="M8 5.5v13l11-6.5z"/>',
    medal: '<circle cx="12" cy="9" r="6"/><path d="m9 14.5-1.5 7L12 19l4.5 2.5-1.5-7M9.5 9l1.8 1.8 3.2-3.6"/>'
  };
  function icon(name, cls) {
    var s = document.createElementNS(NS, "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("class", "ic" + (cls ? " " + cls : ""));
    s.innerHTML = ICONS[name] || "";
    return s;
  }

  /* ================================================================
     REVEAL SAAT SCROLL — elemen bertanda data-rv muncul (fade + naik)
     waktu masuk layar. Mati otomatis kalau pengunjung pakai reduce motion.
     ================================================================ */
  var ARMED = !REDUCE && "IntersectionObserver" in window;
  var revealed = {};
  var io = ARMED ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      // Muncul kalau 10% elemennya sudah terlihat. Elemen yang sangat tinggi (daftar project di HP)
      // tidak akan pernah terlihat 10% sekaligus, jadi untuk itu cukup 140px yang sudah masuk layar.
      if (!e.isIntersecting || (e.intersectionRatio < 0.095 && e.intersectionRect.height < 140)) return;
      var n = e.target, key = n.getAttribute("data-rv");
      io.unobserve(n);
      n.classList.add("in");
      if (revealed[key]) return;
      revealed[key] = true;
      onReveal(key, n);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: [0, 0.005, 0.01, 0.02, 0.04, 0.06, 0.08, 0.1] }) : null;

  function reveal(node, key) {
    if (key) node.setAttribute("data-rv", key);
    if (!ARMED || revealed[node.getAttribute("data-rv")]) node.classList.add("in");
    else io.observe(node);
    return node;
  }
  function unobserveIn(box) { if (io) $$("[data-rv]", box).forEach(function (n) { io.unobserve(n); }); }

  function onReveal(key, node) {
    if (key === "about-plate") $$(".scr", node).forEach(function (n, i) { scramble(n, i * 160); });
    else if (key.indexOf("cert-card-") === 0) $$(".scr", node).forEach(function (n) { scramble(n, 0); });
  }

  /* ================================================================
     ANGKA "DIKOCOK" — seperti pengumuman harga waktu peluncuran HP:
     digit diacak cepat, lalu dikunci satu per satu dari kiri ke kanan.
     ================================================================ */
  function isDigit(c) { return c >= "0" && c <= "9"; }
  function scramble(node, delay) {
    var target = node.getAttribute("data-value") || node.textContent;
    var chars = target.split("");
    var digits = chars.filter(isDigit).length;
    if (!digits || REDUCE) return;
    var LOCK = 900, STEP = 170, TICK = 55;
    var t0 = performance.now() + (delay || 0), last = 0;
    node.classList.remove("landed");
    node.classList.add("rolling");
    function frame(now) {
      if (now - last >= TICK) {
        last = now;
        var age = now - t0, di = 0;
        node.textContent = chars.map(function (c) {
          if (!isDigit(c)) return c;
          var lock = LOCK + STEP * di++;
          return age >= lock ? c : String(Math.floor(Math.random() * 10));
        }).join("");
        if (age >= LOCK + STEP * (digits - 1)) {
          node.textContent = target;
          node.classList.remove("rolling");
          node.classList.add("landed");
          return;
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // [[teks]] di data.js = kata kunci dengan stabilo warna (kuning, biru, hijau bergantian)
  function richText(node, text) {
    var n = 0;
    String(text || "").split(/\[\[(.+?)\]\]/).forEach(function (part, i) {
      if (!part) return;
      if (i % 2) {
        node.appendChild(el("mark", { class: "hl hl-" + (n % 3), style: "transition-delay:" + (0.35 + n * 0.25).toFixed(2) + "s", text: part }));
        n++;
      } else node.appendChild(document.createTextNode(part));
    });
    return node;
  }

  /* ================================================================
     TEKS UI STATIS + SELECTOR BAHASA
     ================================================================ */
  function applyStaticI18n() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(function (n) {
      if (n.classList.contains("sec-title")) accentLast(n, ui(n.dataset.i18n));
      else n.textContent = ui(n.dataset.i18n);
    });
    $$("[data-i18n-aria]").forEach(function (n) { n.setAttribute("aria-label", ui(n.dataset.i18nAria)); });
    $$(".selector button[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    $("#selector").dataset.pos = lang;
  }
  // kata terakhir judul section diberi warna section-nya, seperti nama di hero (judul satu kata: seluruhnya)
  function accentLast(node, text) {
    var i = text.lastIndexOf(" ");
    node.textContent = text.slice(0, i + 1);
    node.appendChild(el("span", { class: "tw", text: text.slice(i + 1) }));
  }

  /* ================================================================
     HERO
     ================================================================ */
  function renderHero() {
    var p = D.profile || {};
    var name = p.name || "Your Name";
    var initials = p.initials || name.split(/\s+/).map(function (w) { return w[0]; }).join("").slice(0, 3);
    renderName(name);
    $("#brand-tag").textContent = initials;
    $("#brand-name").textContent = name;
    colorTitle($("#hero-title"), t(p.title));
    var lead = $("#hero-tagline"); lead.textContent = "";
    richText(lead, t(p.tagline));
    document.title = name + " — " + t(p.title);

    var av = t(p.availability);
    $("#hero-chip-text").textContent = av;
    $("#hero-chip").hidden = !av;

    renderRoles(p.roles || []);

    // tombol download di hero & kontak; file portofolio boleh beda per bahasa
    var files = { cv: t(p.cv), portfolio: t(p.portfolio) };
    $$("[data-dl]").forEach(function (a) {
      var f = files[a.dataset.dl];
      a.hidden = !f;
      if (f) a.setAttribute("href", f);
    });
    $("#contact-dl").hidden = !files.cv && !files.portfolio;
  }

  // nama dipecah per kata supaya bisa naik bergantian; kata terakhir kuning
  function renderName(name) {
    var h = $("#hero-name");
    if (h.getAttribute("data-name") === name) return;      // nama sama: jangan ulang animasi saat ganti bahasa
    h.setAttribute("data-name", name);
    h.setAttribute("aria-label", name);
    h.textContent = "";
    var words = name.split(/\s+/).filter(Boolean);
    words.forEach(function (w, i) {
      var last = words.length > 1 && i === words.length - 1;
      h.appendChild(el("span", { class: "hm", "aria-hidden": "true" },
        el("span", { class: "hw" + (last ? " hw-last" : ""), style: "animation-delay:" + (0.12 + i * 0.1).toFixed(2) + "s", text: w })));
    });
  }

  // "Mechanical" biru, "Electrical" kuning — ikut warna kategori project
  var TITLE_WORDS = /(mechanical|mekanikal|mekanik|electrical|elektrikal|elektrik)/i;
  function colorTitle(node, text) {
    node.textContent = "";
    String(text || "").split(TITLE_WORDS).forEach(function (part, i) {
      if (!part) return;
      if (i % 2) node.appendChild(el("span", { class: /^me/i.test(part) ? "t-mech" : "t-elec", text: part }));
      else node.appendChild(document.createTextNode(part));
    });
  }

  // peran bergantian dengan efek gulung; reduce motion = daftar statis
  var roll = { n: 0, i: 0, timer: 0, back: 0 };
  function renderRoles(roles) {
    var box = $("#hero-role"), track = $("#roller-track");
    clearInterval(roll.timer); clearTimeout(roll.back);
    track.textContent = "";
    var list = roles.map(t).filter(Boolean);
    box.hidden = !list.length;
    if (!list.length) return;
    var still = REDUCE || list.length < 2;
    box.classList.toggle("static", still);
    list.forEach(function (r, i) {
      track.appendChild(el("span", { class: "roll-item c" + (i % 4) }, r,
        i < list.length - 1 ? el("span", { class: "sr-only", text: ", " }) : null));
    });
    roll.n = list.length; roll.i = 0;
    setRoll(0, false);
    if (still) return;
    track.appendChild(el("span", { class: "roll-item c0", "aria-hidden": "true", text: list[0] }));   // duplikat untuk loop mulus
    roll.timer = setInterval(function () {
      roll.i += 1;
      setRoll(roll.i, true);
      if (roll.i >= roll.n) roll.back = setTimeout(function () { roll.i = 0; setRoll(0, false); }, 700);
    }, 3000);
  }
  function setRoll(i, animate) {
    var track = $("#roller-track");
    track.classList.toggle("no-anim", !animate);
    track.style.transform = "translateY(" + (-1.35 * i) + "em)";
    if (!animate) void track.offsetHeight;                 // paksa reflow supaya lompatan balik tidak teranimasi
    $("#role-led").className = "role-led c" + ((i % roll.n) % 4);
  }

  /* ================================================================
     PITA BERJALAN (tools & kata kunci)
     ================================================================ */
  function renderTicker() {
    var tk = D.ticker || {};
    var front = has(tk.front) ? tk.front : (D.skills || [])
      .filter(function (g) { return g.icon !== "users"; })
      .reduce(function (a, g) { return a.concat((g.items || []).map(function (it) { return it.name; })); }, []);
    front = front.map(t).filter(Boolean);
    var back = (tk.back || []).map(t).filter(Boolean);
    fillTrack($("#tk-front"), front, "bolt", false);
    fillTrack($("#tk-back"), back, "cross", true);
    $("#tk-back-band").hidden = !back.length;
    $("#ticker").hidden = !front.length && !back.length;
  }
  function fillTrack(track, words, ic, decorOnly) {
    track.textContent = "";
    if (!words.length) return;
    if (!decorOnly) track.appendChild(el("span", { class: "sr-only", text: words.join(", ") }));
    // satu set harus lebih lebar dari layar supaya loop-nya mulus
    var set = words.slice();
    while (set.join("").length * 13 + set.length * 70 < 2600) set = set.concat(words);
    for (var half = 0; half < 2; half++) {
      var g = el("div", { class: "tk-set", "aria-hidden": "true" });
      set.forEach(function (w) { g.appendChild(el("span", { class: "tk-item" }, w, icon(ic))); });
      track.appendChild(g);
    }
  }

  /* ================================================================
     PANEL KONTROL (elemen utama)
     ================================================================ */
  var P = { start: false, stop: false, m1: false, auto: false, touched: false };
  var ladder = null;

  function buildLadder() {
    var host = $("#ladder");
    var svg = sv("svg", { viewBox: "0 0 360 200", class: "ladder" });
    var gB = sv("g", {}, svg), gF = sv("g", {}, svg), gP = sv("g", {}, svg);
    var always = function () { return true; }, never = function () { return false; };
    var startOn = function (s) { return s.start || s.auto; };
    var node = function (s) { return s.start || s.auto || s.m1; }, m1 = function (s) { return s.m1; };
    var segs = [
      { d: "M24 22 V182", live: always, rail: true },
      { d: "M336 22 V182", live: never, rail: true },
      { d: "M24 56 H92", live: always },
      { d: "M112 56 H182", live: node },
      { d: "M202 56 H279", live: m1 },
      { d: "M301 56 H336", live: never },
      { d: "M52 56 V106 H92", live: always },
      { d: "M112 106 H142 V56", live: node },
      { d: "M24 152 H92", live: always },
      { d: "M112 152 H279", live: m1 },
      { d: "M301 152 H336", live: never }
    ];
    segs.forEach(function (s) {
      sv("path", { d: s.d, class: "w" + (s.rail ? " rail" : "") }, gB);
      s.f = sv("path", { d: s.d, class: "f" }, gF);
    });
    function contact(x, y, label, nc, on) {
      var g = sv("g", { class: "part" }, gP);
      sv("rect", { x: x + 2, y: y - 9, width: 16, height: 18, class: "fill" }, g);
      sv("path", { d: "M" + x + " " + (y - 11) + "V" + (y + 11) + "M" + (x + 20) + " " + (y - 11) + "V" + (y + 11), class: "sym" }, g);
      if (nc) sv("path", { d: "M" + (x - 2) + " " + (y + 11) + "L" + (x + 22) + " " + (y - 11), class: "sym" }, g);
      sv("text", { x: x + 10, y: y - 17, class: "lbl" }, g).textContent = label;
      return { g: g, on: on };
    }
    function coil(cx, y, label, on) {
      var g = sv("g", { class: "part" }, gP);
      sv("circle", { cx: cx, cy: y, r: 9, class: "fill coil" }, g);
      sv("path", { d: "M" + (cx - 5) + " " + (y - 11) + "Q" + (cx - 13) + " " + y + " " + (cx - 5) + " " + (y + 11) +
        "M" + (cx + 5) + " " + (y - 11) + "Q" + (cx + 13) + " " + y + " " + (cx + 5) + " " + (y + 11), class: "sym" }, g);
      sv("text", { x: cx, y: y - 17, class: "lbl" }, g).textContent = label;
      return { g: g, on: on };
    }
    var parts = [
      contact(92, 56, "START", false, startOn),
      contact(182, 56, "STOP", true, function (s) { return !s.stop; }),
      coil(290, 56, "M1", m1),
      contact(92, 106, "M1", false, m1),
      contact(92, 152, "M1", false, m1),
      coil(290, 152, "RUN", m1)
    ];
    host.textContent = "";
    host.appendChild(svg);
    ladder = { segs: segs, parts: parts };
  }

  function updatePanel() {
    P.m1 = (P.start || P.m1) && !P.stop;          // logika self-holding
    if (ladder) {
      ladder.segs.forEach(function (s) { s.f.classList.toggle("on", !!s.live(P)); });
      ladder.parts.forEach(function (p) { p.g.classList.toggle("on", !!p.on(P)); });
    }
    lamp("run", P.m1);
    lamp("stop", !P.m1);
    $("#hmi-state").textContent = P.m1 ? "RUN" : "STOP";
    $("#panel").classList.toggle("running", P.m1);
    $("#pb-start").classList.toggle("down", P.start || P.auto);
    $("#pb-stop").classList.toggle("down", P.stop);
    fan.target = P.m1 ? 840 : 0;
    fan.kick();
  }
  function lamp(name, on) { var l = $('.lamp[data-lamp="' + name + '"]'); if (l) l.classList.toggle("on", !!on); }

  // tombol momentary: aktif selama ditekan
  function bindPB(btn, key) {
    function press() { if (P[key]) return; P[key] = true; P.touched = true; updatePanel(); }
    function release() { if (!P[key]) return; P[key] = false; updatePanel(); }
    btn.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      if (btn.setPointerCapture) try { btn.setPointerCapture(e.pointerId); } catch (x) {}
      press();
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (ev) { btn.addEventListener(ev, release); });
    btn.addEventListener("keydown", function (e) {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); press(); }
    });
    btn.addEventListener("keyup", function (e) { if (e.key === " " || e.key === "Enter") release(); });
    btn.addEventListener("blur", release);
    btn.addEventListener("click", function (e) { e.preventDefault(); });
  }

  // kipas motor: spin-up halus, lalu DIREM begitu M1 mati (tidak dibiarkan muter sendiri)
  var fan = {
    angle: 0, speed: 0, target: 0, running: false, last: 0,
    rotor: null,
    kick: function () {
      if (REDUCE || fan.running || !fan.rotor) return;
      if (fan.target === 0 && fan.speed === 0) return;
      fan.running = true; fan.last = performance.now();
      requestAnimationFrame(fan.step);
    },
    step: function (now) {
      var dt = Math.min((now - fan.last) / 1000, 0.05); fan.last = now;
      if (fan.target > fan.speed) fan.speed += (fan.target - fan.speed) * Math.min(2.2 * dt, 1);
      else fan.speed = Math.max(fan.target, fan.speed - 1500 * dt);      // rem: dari 840°/s berhenti ±0,6 detik
      fan.angle = (fan.angle + fan.speed * dt) % 360;
      fan.rotor.setAttribute("transform", "rotate(" + fan.angle.toFixed(2) + " 50 50)");
      if (fan.speed <= 0 && fan.target === 0) { fan.speed = 0; fan.running = false; return; }
      requestAnimationFrame(fan.step);
    }
  };

  function initPanel() {
    buildLadder();
    fan.rotor = document.getElementById("fan-rotor");
    bindPB($("#pb-start"), "start");
    bindPB($("#pb-stop"), "stop");
    lamp("power", false);
    updatePanel();

    if (REDUCE) { lamp("power", true); P.m1 = true; updatePanel(); return; }

    // urutan nyala: lamp test → POWER → START otomatis sekali
    var panel = $("#panel");
    setTimeout(function () { panel.classList.add("lamp-test"); }, 350);
    setTimeout(function () { panel.classList.remove("lamp-test"); lamp("power", true); }, 1150);
    setTimeout(function () {
      if (P.touched) return;
      // pulsa START otomatis: M1 mengunci sendiri, input START tidak ikut tertahan
      P.auto = true;
      if (!P.stop) P.m1 = true;
      updatePanel();
      setTimeout(function () { P.auto = false; updatePanel(); }, 380);
    }, 1700);
  }

  /* ================================================================
     ABOUT + RATING PLATE
     ================================================================ */
  function renderAbout() {
    var p = D.profile || {};
    var img = $("#about-photo");
    img.src = p.photo || "assets/img/profile-placeholder.svg";
    img.alt = (p.name || "") + ", " + t(p.title);

    var box = $("#about-paras"); box.textContent = "";
    (p.about || []).forEach(function (para) { box.appendChild(richText(el("p"), t(para))); });

    $("#rp-name").textContent = p.name || "";
    $("#rp-type").textContent = t(p.title);
    var g = $("#rp-grid"); g.textContent = "";
    // angka statistik: besar & berwarna, "dikocok" saat pelat pertama kali muncul
    (p.stats || []).forEach(function (s, i) {
      var val = String(s.value == null ? "" : s.value) + (s.suffix || "");
      if (!val) return;
      g.appendChild(el("div", { class: "rp-cell rp-stat c" + (i % 4) },
        el("dt", { text: t(s.label) }),
        el("dd", { class: "rp-num" },
          el("span", { class: "sr-only", text: val }),
          el("span", { class: "scr", "aria-hidden": "true", "data-value": val, text: val }))));
    });
    function cell(label, value, cls) {
      if (!value) return;
      g.appendChild(el("div", { class: "rp-cell" + (cls ? " " + cls : "") }, el("dt", { text: label }), el("dd", { text: value })));
    }
    cell(ui("info_location"), t(p.location));
    cell(ui("info_education"), t(p.education));
    cell(ui("info_status"), t(p.availability), "rp-status");
    $("#rating-plate").hidden = !g.children.length;
    toggleSection("about", has(p.about) || g.children.length > 0);
  }

  /* ================================================================
     SKILLS
     ================================================================ */
  var LEVELS = { advanced: 3, intermediate: 2, basic: 1 };
  var GROUP_TONE = { code: "run", bolt: "volt", gear: "cad", users: "orange" };   // warna grup ikut ikonnya
  var TONES = ["run", "volt", "cad", "orange"];
  function meter(n, delay) {
    var m = el("span", { class: "meter", "aria-hidden": "true" });
    for (var i = 1; i <= 3; i++) {
      m.appendChild(el("i", { class: i <= n ? "on" : "", style: delay != null ? "transition-delay:" + (delay + i * 120) + "ms" : null }));
    }
    return m;
  }
  function renderSkills() {
    var lg = $("#level-legend"); lg.textContent = "";
    ["advanced", "intermediate", "basic"].forEach(function (k) { lg.appendChild(el("span", { class: "lv" }, meter(LEVELS[k]), ui("level_" + k))); });

    var grid = $("#skills-grid"); grid.textContent = "";
    (D.skills || []).forEach(function (g, gi) {
      var tone = GROUP_TONE[g.icon] || TONES[gi % 4];
      var list = el("ul", { class: "skill-list" });
      (g.items || []).forEach(function (it, ii) {
        var lv = it.level || "basic";
        // LED menyala berurutan saat section muncul
        list.appendChild(el("li", {},
          el("span", { class: "skill-name" }, t(it.name), el("span", { class: "sr-only", text: ", " + ui("level_" + lv) })),
          meter(LEVELS[lv] || 1, 300 + gi * 110 + ii * 70)));
      });
      grid.appendChild(el("div", { class: "rv-c", style: "transition-delay:" + gi * 110 + "ms" },
        el("section", { class: "skill-card spot sk-" + tone },
          el("div", { class: "skill-head" }, el("span", { class: "skill-ic" }, icon(g.icon || "gear")), el("h3", { text: t(g.group) })),
          list)));
    });
    toggleSection("skills", has(D.skills));
  }

  /* ================================================================
     PROJECTS
     ================================================================ */
  var filter = "all";
  function renderProjects() {
    var projects = D.projects || [];
    var cats = ["all"];
    projects.forEach(function (p) { if (cats.indexOf(p.category) < 0) cats.push(p.category); });

    var f = $("#filters"); f.textContent = "";
    cats.forEach(function (c) {
      var n = c === "all" ? projects.length : projects.filter(function (p) { return p.category === c; }).length;
      f.appendChild(el("button", {
        type: "button", class: "filter cat-" + c, "data-filter": c, "aria-pressed": String(c === filter),
        onclick: function () { setFilter(c); }
      }, el("span", { class: "f-dot", "aria-hidden": "true" }), catName(c), el("span", { class: "n", text: String(n) })));
    });

    var grid = $("#projects-grid"); grid.textContent = "";
    if (cardIO) cardIO.disconnect();
    slideOrder = 0;
    projects.forEach(function (p) {
      var tags = el("ul", { class: "tags" });
      (p.tools || []).forEach(function (x) { tags.appendChild(el("li", { text: t(x) })); });
      grid.appendChild(el("article", { class: "card cat-" + p.category, "data-cat": p.category },
        cardShot(p),
        el("div", { class: "card-body" },
          el("div", { class: "card-meta" },
            el("span", { class: "card-cat", text: catName(p.category) }),
            t(p.year) ? el("span", { class: "card-year", text: t(p.year) }) : null,
            el("span", { class: "go", "aria-hidden": "true" }, icon("out"))),
          el("h3", {}, el("button", { type: "button", class: "card-link", onclick: function (e) { openModal(p, e.currentTarget); } }, t(p.title))),
          el("p", { class: "card-role", text: t(p.role) }),
          el("p", { class: "card-sum", text: t(p.summary) }),
          tags)));
    });
    toggleSection("projects", projects.length > 0);
    applyFilter(false);
  }
  function setFilter(c) {
    if (c === filter) return;
    filter = c;
    $$(".filter").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.filter === c)); });
    applyFilter(true);
  }
  function applyFilter(animate) {
    var shown = 0;
    $$(".card").forEach(function (c) {
      var show = filter === "all" || c.dataset.cat === filter;
      c.hidden = !show;
      c.classList.remove("featured", "enter");
      if (show) {
        if (shown === 0) c.classList.add("featured");
        if (animate && !REDUCE) { void c.offsetWidth; c.style.setProperty("--i", shown); c.classList.add("enter"); }
        shown++;
      }
    });
    var e = $("#projects-empty");
    e.textContent = ui("proj_empty");
    e.hidden = shown > 0;
  }

  /* ----------------------------------------------------------------
     FOTO KARTU — project dengan 2 foto atau lebih geser otomatis.
     Jamnya adalah animasi CSS di garis indikator (.card-segs b.on):
     tiap animasinya selesai, fotonya pindah. Jadi jeda saat hover,
     kartu di luar layar, atau modal terbuka cukup lewat CSS
     (animation-play-state). Reduce motion = foto pertama saja.
     ---------------------------------------------------------------- */
  var cardIO = !REDUCE && "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      e.target.classList.toggle("paused", !e.isIntersecting);
      if (e.isIntersecting) loadSlides(e.target);
    });
  }, { threshold: 0.2 }) : null;
  // foto ke-2 dst. baru dimuat saat kartunya masuk layar
  function loadSlides(shot) {
    $$("img[data-src]", shot).forEach(function (im) { im.src = im.getAttribute("data-src"); im.removeAttribute("data-src"); });
  }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  var slideOrder = 0;      // urutan kartu yang punya slider, untuk menggeser waktu mulainya

  function cardShot(p) {
    var media = projectImages(p);
    var all = media.filter(function (g) { return !g.video; });      // kartu hanya memutar foto; video cukup ditandai badge
    var nVid = media.length - all.length;
    if (!all.length) all = [{ src: "assets/img/project-electrical.svg" }];
    var auto = all.length > 1 && !REDUCE;
    var imgs = auto ? all : all.slice(0, 1), n = imgs.length, cur = 0;
    var slides = imgs.map(function (g, i) {
      var im = el("img", i ? { "data-src": g.src, alt: "", style: focusCss(g) } : { src: g.src, alt: "", loading: "lazy", style: focusCss(g) });
      whenSized(im, g.src, function () {});              // rasionya dicatat dari sekarang, supaya detail project langsung tahu kalau fotonya portrait
      return el("div", { class: "card-slide" + (i ? "" : " cur") }, im);
    });
    var countN = el("span", { text: auto ? "1 / " + n : String(all.length) });
    var capN = el("span", { class: "card-cap-n" }), capT = el("span");
    var cap = el("p", { class: "card-cap", "aria-hidden": "true" }, capN, capT);
    var shot = el("div", { class: "card-img" + (auto ? " multi paused" : "") }, slides,
      nVid || all.length > 1 ? el("div", { class: "card-chips", "aria-hidden": "true" },
        nVid ? el("span", { class: "card-vid" }, icon("play"), "Video") : null,
        all.length > 1 ? el("span", { class: "card-count" }, icon("images"), countN) : null) : null,
      cap);
    function paint() {
      var c = t(imgs[cur].caption);
      capN.textContent = pad2(cur + 1); capN.hidden = n < 2;
      capT.textContent = c; cap.hidden = !c;
      if (auto) countN.textContent = (cur + 1) + " / " + n;
    }
    paint();
    if (!auto) return shot;

    var segs = el("div", { class: "card-segs", "aria-hidden": "true" });
    var fills = imgs.map(function () { var b = el("b"); segs.appendChild(el("i", {}, b)); return b; });
    shot.appendChild(segs);
    shot.appendChild(el("span", { class: "card-pause", "aria-hidden": "true" }, icon("pause"), ui("slide_paused")));
    function mark() { fills.forEach(function (b, k) { b.className = k < cur ? "done" : (k === cur ? "on" : ""); }); }
    fills[0].style.animationDelay = (slideOrder++ % 4 * 0.5).toFixed(1) + "s";   // putaran pertama digeser per kartu supaya tidak ganti foto serempak
    mark();
    segs.addEventListener("animationend", function () {
      fills[0].style.animationDelay = "";
      var next = (cur + 1) % n, old = slides[cur];
      if (!$("img", slides[next]).complete) {                               // foto berikutnya belum selesai dimuat: ulangi hitungan
        fills[cur].className = ""; void fills[cur].offsetWidth; fills[cur].className = "on";
        return;
      }
      old.classList.remove("cur"); old.classList.add("out");
      slides[next].classList.remove("out"); slides[next].classList.add("cur");
      setTimeout(function () { old.classList.remove("out"); }, 750);        // setelah keluar, kembali antre di kanan
      cur = next;
      mark(); paint();
    });
    if (cardIO) cardIO.observe(shot); else { shot.classList.remove("paused"); loadSlides(shot); }
    return shot;
  }

  /* ================================================================
     MODAL
     ================================================================ */
  var lastFocus = null, openProject = null;
  function openModal(p, from) {
    openProject = p; lastFocus = from || document.activeElement;
    fillModal(p);
    var m = $("#modal");
    m.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(function () { m.classList.add("open"); });
    setTimeout(function () { $(".modal-close", m).focus(); }, 30);
  }
  function fillModal(p) {
    var box = $("#modal-content"); box.textContent = "";
    var imgs = projectImages(p);
    var track = el("div", { class: "m-track" });
    var shot = el("div", { class: "m-shot cat-" + p.category }, track);
    var mains = imgs.map(function (g, i) {
      var s = mediaSlide(g, imgs.length > 1 ? t(p.title) + " (" + (i + 1) + "/" + imgs.length + ")" : t(p.title));
      track.appendChild(s.node);
      return s.main;
    });
    // ada foto portrait / hampir persegi: bingkainya dibuat lebih tinggi dan semua foto tampil utuh
    // (tidak dipotong) di atas versi buramnya sendiri
    function setTall() {
      if (shot.classList.contains("has-tall")) return;
      shot.classList.add("has-tall");
      $$(".m-slide", track).forEach(function (s, k) {
        var bg = imgs[k].video ? imgs[k].poster : imgs[k].src;
        if (bg) s.insertBefore(el("img", { class: "m-blur", src: bg, alt: "", "aria-hidden": "true", draggable: "false" }), s.firstChild);
      });
    }
    mains.forEach(function (im, i) { whenSized(im, imgs[i].video || imgs[i].src, function (r) { if (isTall(r)) setTall(); }); });
    // nomor + keterangan foto di bawah gambar; nomornya cuma muncul kalau fotonya lebih dari satu
    var capN = el("span", { class: "m-cap-n" }), capT = el("span");
    var cap = el("p", { class: "m-cap", "aria-live": "polite" }, capN, capT);
    var media = el("div", { class: "m-media cat-" + p.category }, shot, cap);
    function setCap(i) {
      var c = imgs[i] ? t(imgs[i].caption) : "";
      capN.textContent = pad2(i + 1) + " / " + pad2(imgs.length);
      capN.hidden = imgs.length < 2;
      capT.textContent = c;
      cap.hidden = imgs.length < 2 && !c;
    }
    setCap(0);
    slider = imgs.length > 1 ? makeSlider(shot, track, imgs, media, setCap) : null;
    var tags = el("ul", { class: "tags" });
    (p.tools || []).forEach(function (x) { tags.appendChild(el("li", { text: t(x) })); });
    var work = el("ul", { class: "m-work" });
    (p.work || []).forEach(function (w) { work.appendChild(el("li", { text: t(w) })); });
    function block(k, body) { return body ? el("section", { class: "m-block" }, el("h4", { text: ui(k) }), body) : null; }

    box.appendChild(media);
    box.appendChild(el("div", { class: "m-body cat-" + p.category },
      el("div", { class: "m-head" },
        el("p", { class: "card-meta" }, el("span", { class: "card-cat", text: catName(p.category) }), t(p.year) ? el("span", { class: "card-year", text: t(p.year) }) : null),
        el("h3", { id: "modal-title", text: t(p.title) }),
        el("p", { class: "m-role" }, el("span", { text: ui("modal_role") + ": " }), t(p.role))),
      block("modal_problem", p.problem ? el("p", { text: t(p.problem) }) : null),
      block("modal_work", has(p.work) ? work : null),
      block("modal_result", p.result ? el("p", { text: t(p.result) }) : null),
      block("modal_tools", has(p.tools) ? tags : null)));
  }
  // rasio foto (lebar : tinggi), dicatat begitu fotonya selesai dimuat. Dipakai untuk mengenali foto
  // portrait / hampir persegi, yang di detail project ditampilkan utuh, bukan dipotong.
  var RATIO = Object.create(null);
  function whenSized(node, src, fn) {
    var vid = node.tagName === "VIDEO";
    function done() {
      var w = vid ? node.videoWidth : node.naturalWidth, h = vid ? node.videoHeight : node.naturalHeight;
      if (!w || !h) return;
      RATIO[src] = w / h;
      fn(RATIO[src]);
    }
    if (RATIO[src]) fn(RATIO[src]);
    else if (vid ? node.readyState >= 1 : (node.complete && node.naturalWidth)) done();
    else node.addEventListener(vid ? "loadedmetadata" : "load", done);
  }
  function isTall(r) { return r < 1.15; }
  // focus dari data.js = bagian foto yang dipertahankan saat fotonya dipotong (kartu & thumbnail)
  function focusCss(g) { return g.focus ? "object-position:" + g.focus : null; }

  // media project = image (sampul) + gallery. Item gallery boleh path foto saja,
  // { src, caption, focus }, atau video: { video, poster, caption }
  function projectImages(p) {
    var seen = [];
    return [{ src: p.image, caption: p.imageCaption, focus: p.imageFocus }].concat(p.gallery || []).map(function (g) {
      return typeof g === "string" ? { src: g } : (g || {});
    }).filter(function (g) {
      var key = g.video || g.src;
      if (!key || seen.indexOf(key) >= 0) return false;
      seen.push(key);
      return true;
    });
  }

  // satu slide di detail project: foto, atau video. Video tampil sebagai gambar diam + tombol putar;
  // kontrol bawaan browser baru muncul setelah diputar, supaya sebelum itu slide-nya tetap bisa digeser seperti foto
  function mediaSlide(g, label) {
    if (!g.video) {
      var im = el("img", { class: "m-img", src: g.src, draggable: "false", alt: label });
      return { main: im, node: el("div", { class: "m-slide" }, im) };
    }
    // tanpa poster, #t=0.001 membuat frame pertama tetap tampil di iPhone
    var v = el("video", { class: "m-img", src: g.poster ? g.video : g.video + "#t=0.001", poster: g.poster, preload: "metadata", playsinline: true, "aria-label": label });
    var play = el("button", { type: "button", class: "m-play", "aria-label": ui("video_play"), onclick: function () {
      node.classList.add("playing"); v.controls = true;
      var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
    } }, icon("play"));
    var node = el("div", { class: "m-slide is-video" }, v, play);
    // format tidak didukung browser atau filenya tidak ketemu: tombol putar diganti pesan
    v.addEventListener("error", function () {
      if (play.parentNode) node.replaceChild(el("p", { class: "m-vid-err", text: ui("video_error") }), play);
    });
    return { main: v, node: node };
  }
  // video berhenti dan kembali ke tampilan awal (gambar diam + tombol putar)
  function stopVideo(slide) {
    var v = $("video", slide);
    if (!v) return;
    v.pause(); v.controls = false;
    slide.classList.remove("playing");
  }

  // slider foto project (2 gambar atau lebih): tombol panah, geser jari/mouse, keyboard, thumbnail
  var slider = null;
  function makeSlider(shot, track, imgs, media, onChange) {
    var n = imgs.length, cur = 0;
    var prev = el("button", { type: "button", class: "m-nav m-prev", "aria-label": ui("slide_prev"), onclick: function () { go(cur - 1); } }, icon("arrow"));
    var next = el("button", { type: "button", class: "m-nav m-next", "aria-label": ui("slide_next"), onclick: function () { go(cur + 1); } }, icon("arrow"));
    // garis indikator di bawah foto: satu ruas per foto, menyala sampai foto yang sedang tampil
    var segs = el("div", { class: "m-segs", "aria-hidden": "true" });
    var sg = imgs.map(function () { return segs.appendChild(el("i")); });
    shot.classList.add("multi");
    shot.appendChild(prev); shot.appendChild(next); shot.appendChild(segs);
    var th = el("div", { class: "thumbs", role: "group", "aria-label": ui("modal_gallery") });
    var tb = imgs.map(function (g, i) {
      var pic = g.video ? g.poster : g.src;
      return th.appendChild(el("button", { type: "button", class: g.video ? "is-video" : null, "aria-label": (g.video ? "Video" : ui("modal_gallery")) + " " + (i + 1), onclick: function () { go(i); } },
        pic ? el("img", { src: pic, alt: "", style: focusCss(g) }) : null,
        g.video ? icon("play") : null));
    });
    media.appendChild(th);
    var slides = $$(".m-slide", track);

    function go(i, instant) {
      cur = Math.max(0, Math.min(n - 1, i));
      track.classList.toggle("dragging", !!instant);
      track.style.transform = "translateX(" + (-100 * cur) + "%)";
      prev.disabled = cur === 0;
      next.disabled = cur === n - 1;
      sg.forEach(function (s, k) { s.classList.toggle("on", k <= cur); });
      tb.forEach(function (b, k) { b.setAttribute("aria-pressed", String(k === cur)); });
      slides.forEach(function (s, k) {                    // video di slide lain berhenti; tombol putarnya tidak ikut urutan Tab
        if (k !== cur) stopVideo(s);
        var b = $(".m-play", s);
        if (b) b.tabIndex = k === cur ? 0 : -1;
      });
      onChange(cur);
    }

    var x0 = null, dx = 0, w = 1;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.target.closest(".m-play, .m-slide.playing")) return;      // tombol putar & video yang sedang diputar tidak ikut menggeser slider
      x0 = e.clientX; dx = 0; w = shot.clientWidth || 1;
      track.classList.add("dragging");
      try { track.setPointerCapture(e.pointerId); } catch (x) {}
    });
    track.addEventListener("pointermove", function (e) {
      if (x0 == null) return;
      dx = e.clientX - x0;
      var edge = (cur === 0 && dx > 0) || (cur === n - 1 && dx < 0);      // di ujung galeri geserannya ditahan
      track.style.transform = "translateX(calc(" + (-100 * cur) + "% + " + (edge ? dx * 0.3 : dx) + "px))";
    });
    function end() {
      if (x0 == null) return;
      x0 = null;
      track.classList.remove("dragging");
      go(Math.abs(dx) > w * 0.18 ? cur + (dx < 0 ? 1 : -1) : cur);   // geser lebih dari ±18% lebar = pindah slide
    }
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);

    go(0, true);
    return { step: function (d) { go(cur + d); } };
  }

  function closeModal() {
    var m = $("#modal");
    if (m.hidden) return;
    m.classList.remove("open");
    document.body.classList.remove("no-scroll");
    $$(".m-slide", m).forEach(function (s) { stopVideo(s); });      // video tidak boleh terus bersuara setelah modal ditutup
    openProject = null;
    setTimeout(function () { m.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }, REDUCE ? 0 : 260);
  }
  function bindModal() {
    var m = $("#modal");
    m.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closeModal(); });
    document.addEventListener("keydown", function (e) {
      if (m.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
      // saat fokus ada di video, panah kiri/kanan dibiarkan untuk maju-mundur videonya
      if (slider && (e.key === "ArrowLeft" || e.key === "ArrowRight") && e.target.tagName !== "VIDEO") { e.preventDefault(); slider.step(e.key === "ArrowLeft" ? -1 : 1); return; }
      if (e.key !== "Tab") return;
      var f = $$("button, a[href]", $(".modal-dialog", m)).filter(function (n) { return n.offsetParent !== null && !n.disabled; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ================================================================
     EXPERIENCE / CERTS / CONTACT / FOOTER
     ================================================================ */
  var NOW_RE = /sekarang|present|kini|now/i;       // periode yang masih berjalan → titiknya berdenyut
  function renderExperience() {
    var ol = $("#timeline");
    unobserveIn(ol); ol.textContent = "";
    (D.experience || []).forEach(function (x, i) {
      var type = x.type === "education" ? "education" : "work";
      var raw = x.period || "";
      var live = NOW_RE.test(typeof raw === "string" ? raw : [raw.id, raw.en].join(" "));
      var pts = el("ul", { class: "tl-points" });
      (x.points || []).forEach(function (p) { pts.appendChild(el("li", { text: t(p) })); });
      ol.appendChild(reveal(el("li", { class: "tl-item rv " + type + (live ? " now" : "") },
        el("span", { class: "tl-node" + (live ? " live" : ""), "aria-hidden": "true" }),
        el("div", { class: "tl-when" }, el("span", { class: "tl-period", text: t(x.period) }), el("span", { class: "tl-type", text: ui("exp_" + type) })),
        el("div", { class: "tl-what" },
          el("h3", { text: t(x.title) }),
          el("p", { class: "tl-org", text: t(x.org) }),
          has(x.points) ? pts : null)), "exp-" + i));
    });
    toggleSection("experience", has(D.experience));
  }

  // stempel bulat dengan teks berputar
  function sealRing(text, i) {
    var id = "seal-path-" + i;
    var svg = sv("svg", { viewBox: "0 0 120 120" });
    sv("path", { id: id, d: "M60 60m-47 0a47 47 0 1 1 94 0a47 47 0 1 1-94 0", fill: "none" }, sv("defs", {}, svg));
    var tp = sv("textPath", { href: "#" + id, textLength: "292", lengthAdjust: "spacing" }, sv("text", { class: "seal-text" }, svg));
    tp.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + id);
    tp.textContent = text;
    var ring = el("div", { class: "seal-ring" });
    ring.appendChild(svg);
    return el("div", { class: "seal", "aria-hidden": "true" }, ring, el("div", { class: "seal-core" }, icon("medal")));
  }
  function renderCerts() {
    var ul = $("#certs-grid");
    unobserveIn(ul); ul.textContent = "";
    (D.certifications || []).forEach(function (c, i) {
      var name = t(c.name), by = t(c.issuer), yr = t(c.year);
      var ring = [by, name, yr].filter(Boolean).join(" · ");
      if (ring.length > 30) ring = [by, yr].filter(Boolean).join(" · ") || name.slice(0, 28);
      ring = (ring + " · ").toUpperCase();
      if (ring.length < 16) ring += ring;
      var body = [
        sealRing(ring, i),
        el("div", { class: "cert-body" }, by ? el("span", { class: "cert-by", text: by }) : null, el("h3", { class: "cert-name", text: name })),
        yr ? el("span", { class: "cert-year" }, el("span", { class: "sr-only", text: yr }), el("span", { class: "scr", "aria-hidden": "true", "data-value": yr, text: yr })) : null,
        c.url ? icon("out") : null
      ];
      var card = c.url
        ? el("a", { class: "cert spot", href: c.url, target: "_blank", rel: "noopener", title: ui("cert_view") }, body)
        : el("div", { class: "cert spot" }, body);
      ul.appendChild(reveal(el("li", { class: "rv" }, card), "cert-card-" + i));
    });
    toggleSection("certifications", has(D.certifications));
  }

  function toast(msg) {
    var n = $("#toast"); n.textContent = msg; n.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(function () { n.classList.remove("show"); }, 2000);
  }
  function copyText(txt) {
    var ok = function () { toast(ui("copied")); };
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(txt).then(ok, function () { fallback(); }); return; }
    fallback();
    function fallback() {
      var ta = el("textarea", { style: "position:fixed;opacity:0" }); ta.value = txt;
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      ta.remove(); ok();
    }
  }
  function renderContact() {
    var c = D.contact || {};
    var ul = $("#contact-list"); ul.textContent = "";
    function row(key, ic, value, href, extra) {
      var ext = href && href.indexOf("http") === 0;
      var main = el(href ? "a" : "div", { class: "c-row", href: href, target: ext ? "_blank" : null, rel: ext ? "noopener" : null },
        icon(ic, "c-ic"), el("span", { class: "c-label", text: ui(key) }), el("span", { class: "c-value", text: value }), href ? icon("out", "c-go") : null);
      ul.appendChild(el("li", {}, main, extra || null));
    }
    if (c.email) row("contact_email", "mail", c.email, "mailto:" + c.email,
      el("button", { type: "button", class: "c-copy", "aria-label": ui("copy"), title: ui("copy"), onclick: function () { copyText(c.email); } }, icon("copy")));
    if (c.whatsapp) row("contact_whatsapp", "whatsapp", "+" + String(c.whatsapp).replace(/^\+/, ""), "https://wa.me/" + String(c.whatsapp).replace(/\D/g, ""));
    if (c.linkedin) row("contact_linkedin", "linkedin", c.linkedinName || c.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), c.linkedin);
    if (c.location) row("contact_location", "pin", t(c.location), null);
    var st = $("#contact-status"), av = t((D.profile || {}).availability);
    st.textContent = av; st.hidden = !av;
    toggleSection("contact", ul.children.length > 0);
  }
  function renderFooter() {
    $("#footer-copy").textContent = "© " + new Date().getFullYear() + " " + ((D.profile || {}).name || "");
  }

  function toggleSection(id, show) {
    var s = document.getElementById(id);
    if (s) s.hidden = !show;
    $$('.nav-links a[data-section="' + id + '"]').forEach(function (a) { a.hidden = !show; });
  }

  /* ================================================================
     NAV
     ================================================================ */
  function bindNav() {
    var nav = $("#nav"), burger = $("#burger"), links = $("#nav-links");
    function setOpen(o) { nav.classList.toggle("open", o); burger.setAttribute("aria-expanded", String(o)); }
    burger.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { setOpen(false); burger.focus(); } });

    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          $$(".nav-links a").forEach(function (a) {
            var on = a.dataset.section === e.target.id;
            a.classList.toggle("active", on);
            if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      $$("main section[id]").forEach(function (s) { spy.observe(s); });
    }

    // progress bar: CSS scroll-timeline kalau browser mendukung, selain itu lewat JS
    var cssProgress = window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()");
    if (!cssProgress && !REDUCE) {
      var bar = $("#progress"), ticking = false;
      var paint = function () {
        ticking = false;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var pct = max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0;
        bar.style.clipPath = "inset(0 " + (100 - pct).toFixed(2) + "% 0 0)";
      };
      window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }, { passive: true });
      window.addEventListener("resize", paint);
      paint();
    }

    function setLang(l) {
      if (l === lang) return;
      lang = l; store("pf-lang", lang);
      renderAll();
      if (openProject) fillModal(openProject);
    }
    $$(".selector button[data-lang]").forEach(function (b) { b.addEventListener("click", function () { setLang(b.dataset.lang); }); });
    $("#knob").addEventListener("click", function () { setLang(lang === "id" ? "en" : "id"); });
  }

  /* ================================================================
     SOROTAN WARNA — grid hero menyala di sekitar kursor, kartu (.spot)
     diberi cahaya warna kartunya di titik kursor. Hanya untuk mouse/
     trackpad; mati saat reduce motion.
     ================================================================ */
  function bindGlow() {
    if (REDUCE || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var hero = $("#home"), spot = $("#hero-spot"), x = 0, y = 0, raf = 0;
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      x = e.clientX - r.left; y = e.clientY - r.top;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        spot.style.setProperty("--mx", x + "px");
        spot.style.setProperty("--my", y + "px");
        spot.classList.add("on");
      });
    });
    hero.addEventListener("pointerleave", function () { spot.classList.remove("on"); });

    document.addEventListener("pointermove", function (e) {
      var c = e.target.closest && e.target.closest(".spot");
      if (!c) return;
      var r = c.getBoundingClientRect();
      c.style.setProperty("--px", (e.clientX - r.left) + "px");
      c.style.setProperty("--py", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* ================================================================
     INIT
     ================================================================ */
  function renderAll() {
    applyStaticI18n();
    renderHero();
    renderTicker();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    renderCerts();
    renderContact();
    renderFooter();
  }

  document.documentElement.classList.add("js");
  if (ARMED) document.documentElement.classList.add("rv-on");
  renderAll();
  $$("[data-rv]").forEach(function (n) { reveal(n); });
  bindNav();
  bindModal();
  bindGlow();
  initPanel();
})();
