/* =====================================================================
   cetak.js — menyusun PDF portofolio dari data website (js/data.js dan
   js/i18n.js). Halamannya dicetak ke PDF oleh buat-pdf.cmd, jadi file
   ini nggak perlu diedit: isi PDF selalu ikut data.js.
   Bahasa dipilih lewat alamat: index.html?lang=en (default Indonesia).
   ===================================================================== */
(function () {
  "use strict";

  var D = window.PORTFOLIO || {};
  var I = window.I18N || { id: {}, en: {} };
  var lang = /[?&]lang=en(&|$)/.test(location.search) ? "en" : "id";
  var NS = "http://www.w3.org/2000/svg";
  var DOC = document.getElementById("doc");
  var MM = 96 / 25.4;                                    // 1 mm dalam px CSS
  var PLACEHOLDER = /assets\/img\/project-[a-z]+\.svg$/; // gambar contoh, bukan foto asli: tidak dimasukkan

  // teks khusus PDF; judul section & label lain diambil dari js/i18n.js supaya sama dengan website
  var TX = {
    id: {
      kind: "Portofolio",
      index: "Daftar project",
      num: "Project",
      page: "Hal.",
      video: "Video",
      video_cap: "video, tonton di website",
      other: "Project lainnya",
      web_note: "Video project dan versi interaktif portofolio ini ada di"
    },
    en: {
      kind: "Portfolio",
      index: "Project index",
      num: "Project",
      page: "Page",
      video: "Video",
      video_cap: "video, watch it on the website",
      other: "Other projects",
      web_note: "Project videos and the interactive version of this portfolio are at"
    }
  };

  /* ---------------- helpers (sama seperti main.js) ---------------- */
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function has(a) { return Array.isArray(a) && a.length > 0; }
  function t(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    return v[lang] != null ? v[lang] : (v.id != null ? v.id : (v.en || ""));
  }
  function ui(k) { return (I[lang] && I[lang][k]) || (I.id && I.id[k]) || k; }
  function tx(k) { return TX[lang][k]; }
  function catName(c) { var k = "filter_" + c, v = ui(k); return v === k ? c : v; }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function host(u) { return String(u).replace(/^https?:\/\//, "").replace(/\/$/, ""); }

  function el(tag, props) {
    var n = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v == null || v === false) return;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k === "style") n.style.cssText = v;
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
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7.5"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
    play: '<path d="M8 5.5v13l11-6.5z"/>',
    medal: '<circle cx="12" cy="9" r="6"/><path d="m9 14.5-1.5 7L12 19l4.5 2.5-1.5-7M9.5 9l1.8 1.8 3.2-3.6"/>'
  };
  function icon(name) {
    var s = sv("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", class: "ic" });
    s.innerHTML = ICONS[name] || "";
    return s;
  }

  // [[teks]] di data.js = kata kunci dengan stabilo warna
  function richText(node, text) {
    var n = 0;
    String(text || "").split(/\[\[(.+?)\]\]/).forEach(function (part, i) {
      if (!part) return;
      if (i % 2) node.appendChild(el("mark", { class: "hl hl-" + (n++ % 3), text: part }));
      else node.appendChild(document.createTextNode(part));
    });
    return node;
  }
  // "Mechanical" biru, "Electrical" kuning, seperti judul di hero website
  var TITLE_WORDS = /(mechanical|mekanikal|mekanik|electrical|elektrikal|elektrik)/i;
  function colorTitle(node, text) {
    String(text || "").split(TITLE_WORDS).forEach(function (part, i) {
      if (!part) return;
      node.appendChild(i % 2 ? el("span", { class: /^me/i.test(part) ? "t-mech" : "t-elec", text: part }) : document.createTextNode(part));
    });
    return node;
  }

  /* ================================================================
     FOTO — dimuat dulu semua supaya rasionya diketahui sebelum
     halaman disusun
     ================================================================ */
  var IMG = Object.create(null);         // path di data.js → gambar yang sudah dimuat
  function preload(paths) {
    return Promise.all(paths.map(function (src) {
      return new Promise(function (ok) {
        var im = new Image();
        im.onload = function () { IMG[src] = im; ok(); };
        im.onerror = function () { ok(); };            // file tidak ada: fotonya dilewati
        im.src = "../" + src;
      });
    }));
  }
  function ratio(src) { var im = IMG[src]; return im && im.naturalHeight ? im.naturalWidth / im.naturalHeight : 0.75; }
  function photo(src, focus) {
    return el("img", { src: "../" + src, alt: "", "data-src": src, style: focus ? "object-position:" + focus : null });
  }

  // media project = image (sampul) + gallery. Video diwakili poster-nya (diberi tanda "Video").
  function projectMedia(p) {
    var seen = [];
    return [{ src: p.image, caption: p.imageCaption, focus: p.imageFocus }].concat(p.gallery || []).map(function (g) {
      g = typeof g === "string" ? { src: g } : (g || {});
      return g.video ? { src: g.poster, video: true, caption: g.caption, focus: g.focus } : g;
    }).filter(function (g) {
      if (!g.src || PLACEHOLDER.test(g.src) || seen.indexOf(g.src) >= 0) return false;
      seen.push(g.src);
      return true;
    });
  }

  /* ================================================================
     KERANGKA HALAMAN
     ================================================================ */
  var FOOT = "";
  function newPage(cls) {
    var body = el("div", { class: "pg-body" });
    DOC.appendChild(el("section", { class: "page " + cls },
      el("div", { class: "stripe", "aria-hidden": "true" }, el("i"), el("i"), el("i")),
      body,
      el("footer", { class: "pg-foot" }, el("span", { text: FOOT }), el("span", { class: "pg-num" }))));
    return body;
  }
  // judul section: kata terakhir distabilo warna section-nya, seperti di website
  function secTitle(text, cls) {
    var i = text.lastIndexOf(" ");
    return el("div", { class: cls },
      el("h2", { class: "pg-title" }, text.slice(0, i + 1), el("span", { class: "tw", text: text.slice(i + 1) })),
      el("div", { class: "code-bar", "aria-hidden": "true" }, el("i"), el("i"), el("i")));
  }
  function contactList(cls) {
    var c = D.contact || {}, ul = el("ul", { class: cls });
    function row(ic, text, href) { ul.appendChild(el("li", {}, icon(ic), href ? el("a", { href: href, text: text }) : el("span", { text: text }))); }
    if (c.email) row("mail", c.email, "mailto:" + c.email);
    if (c.whatsapp) row("whatsapp", "+" + String(c.whatsapp).replace(/^\+/, ""), "https://wa.me/" + String(c.whatsapp).replace(/\D/g, ""));
    if (c.linkedin) row("linkedin", c.linkedinName || host(c.linkedin).replace(/^www\./, ""), c.linkedin);
    if (c.website) row("globe", host(c.website), c.website);
    if (c.location) row("pin", t(c.location));
    return ul;
  }

  /* ================================================================
     SAMPUL
     ================================================================ */
  // gelombang sinus 3 fasa: satu siklus = 2 x half, fasa S dan T digeser 120° (sepertiga siklus)
  function wavePath(width, half, amp, y) {
    var d = "M0 " + y + "c" + half * .425 + " " + -amp + " " + half * .575 + " " + -amp + " " + half + " 0";
    for (var x = half, s = 1; x < width + half * 2; x += half, s = -s) d += "s" + half * .575 + " " + s * amp + " " + half + " 0";
    return d;
  }
  function waves() {
    var svg = sv("svg", { class: "cv-waves", viewBox: "0 0 720 100", preserveAspectRatio: "xMidYMid slice", "aria-hidden": "true" });
    sv("path", { class: "axis", d: "M0 50H720" }, svg);
    ["wr", "ws", "wt"].forEach(function (c, i) {
      var g = sv("g", { transform: "translate(" + -i * 60 + " 0)" }, svg);
      var d = wavePath(720, 90, 34, 50);
      sv("path", { class: "glow " + c, d: d }, g);
      sv("path", { class: c, d: d }, g);
    });
    return svg;
  }

  function cover(featured) {
    var p = D.profile || {};
    var words = (p.name || "").split(/\s+/).filter(Boolean);
    var stats = el("dl", { class: "cv-stats" });
    (p.stats || []).forEach(function (s, i) {
      var v = String(s.value == null ? "" : s.value) + (s.suffix || "");
      if (v) stats.appendChild(el("div", { class: "c" + (i % 4) }, el("dt", { text: t(s.label) }), el("dd", { text: v })));
    });
    var mosaic = el("div", { class: "cv-mosaic" }, featured.map(function (f) {
      return el("figure", { class: "cv-tile cat-" + f.p.category },
        el("div", { class: "cv-ph" }, photo(f.m.src, f.m.focus)),
        el("figcaption", {}, el("b", { text: catName(f.p.category) }), t(f.p.title)));
    }));
    DOC.appendChild(el("section", { class: "page pg-cover" },
      el("div", { class: "cv-glow", "aria-hidden": "true" }, el("i"), el("i"), el("i")),
      el("div", { class: "cv-grid", "aria-hidden": "true" }),
      el("div", { class: "cv-inner" },
        el("div", { class: "cv-top" },
          el("span", { class: "brand-tag", text: p.initials || "" }),
          el("span", { class: "cv-kind", text: tx("kind") + " · " + new Date().getFullYear() })),
        el("h1", { class: "cv-name" }, words.map(function (w, i) {
          return el("span", { class: words.length > 1 && i === words.length - 1 ? "hw-last" : null, text: w });
        })),
        colorTitle(el("p", { class: "cv-title" }), t(p.title)),
        el("ul", { class: "cv-roles" }, (p.roles || []).map(function (r, i) { return el("li", { class: "c" + (i % 4), text: t(r) }); })),
        richText(el("p", { class: "cv-lead" }), t(p.tagline)),
        waves(),
        featured.length ? mosaic : null,
        stats.children.length ? stats : null,
        contactList("cv-contact"))));
  }

  /* ================================================================
     TENTANG + KEAHLIAN + DAFTAR PROJECT
     ================================================================ */
  var LEVELS = { advanced: 3, intermediate: 2, basic: 1 };
  var GROUP_TONE = { code: "run", bolt: "volt", gear: "cad", users: "orange" };   // sama dengan warna grup di website
  var TONES = ["run", "volt", "cad", "orange"];
  function meter(n) {
    var m = el("span", { class: "meter", "aria-hidden": "true" });
    for (var i = 1; i <= 3; i++) m.appendChild(el("i", { class: i <= n ? "on" : null }));
    return m;
  }
  // all = semua project sesuai urutan di PDF; nomor halamannya diisi setelah semua halaman jadi
  function aboutPage(all) {
    var p = D.profile || {};
    var b = newPage("pg-about");
    var info = el("dl", { class: "ab-info" });
    [["info_location", p.location], ["info_education", p.education], ["info_status", p.availability]].forEach(function (r) {
      if (t(r[1])) info.appendChild(el("div", {}, el("dt", { text: ui(r[0]) }), el("dd", { text: t(r[1]) })));
    });
    if (has(p.about)) {
      b.appendChild(el("section", { class: "sx" }, secTitle(ui("sec_about"), "sx-about"),
        el("div", { class: "ab-text" }, p.about.map(function (a) { return richText(el("p"), t(a)); })),
        info.children.length ? info : null));
    }
    if (has(D.skills)) {
      b.appendChild(el("section", { class: "sx" },
        el("div", { class: "sx-row" }, secTitle(ui("sec_skills"), "sx-skills"),
          el("p", { class: "legend" }, ["advanced", "intermediate", "basic"].map(function (k) { return el("span", {}, meter(LEVELS[k]), ui("level_" + k)); }))),
        el("div", { class: "sk-grid" }, D.skills.map(function (g, gi) {
          return el("div", { class: "sk-card sk-" + (GROUP_TONE[g.icon] || TONES[gi % 4]) },
            el("div", { class: "sk-head" }, icon(g.icon || "gear"), t(g.group)),
            el("ul", {}, (g.items || []).map(function (it) { return el("li", {}, el("span", { text: t(it.name) }), meter(LEVELS[it.level] || 1)); })));
        }))));
    }
    var cats = [], nums = [];
    all.forEach(function (x) { if (cats.indexOf(x.p.category) < 0) cats.push(x.p.category); });
    var sec = el("section", { class: "sx" }, secTitle(tx("index"), "sx-proj"),
      el("p", { class: "ix-key" }, cats.map(function (c) { return el("span", { class: "cat-" + c, text: catName(c) }); })),
      el("ol", { class: "ix" }, all.map(function (x, i) {
        var n = el("span", { class: "ix-p", text: "00" });
        nums.push({ x: x, n: n });
        return el("li", { class: "cat-" + x.p.category }, el("span", { class: "ix-n", text: pad2(i + 1) }), el("span", { class: "ix-t", text: t(x.p.title) }), n);
      })));
    b.appendChild(sec);
    // project makin banyak dan daftarnya tidak muat lagi: pindah ke halaman sendiri
    if (b.scrollHeight > b.clientHeight + 1 && b.children.length > 1) { b.removeChild(sec); newPage("pg-about").appendChild(sec); }
    return nums;
  }

  /* ================================================================
     HALAMAN PROJECT
     ================================================================ */
  function projectHead(p, n, total, small) {
    return [
      el("div", { class: "pj-top" },
        el("span", { class: "pj-cat", text: catName(p.category) }),
        el("span", { class: "pj-num" }, tx("num") + " ", el("b", { text: pad2(n) }), " / " + pad2(total))),
      el(small ? "h3" : "h2", { class: small ? "oth-title" : "pj-title", text: t(p.title) }),
      t(p.role) ? el("p", { class: "pj-role" }, el("b", { text: ui("modal_role") + ": " }), t(p.role)) : null
    ];
  }
  // ringkasan + masalah di kiri, yang dikerjakan + tools di kanan
  function projectText(p) {
    function block(k, body) { return body ? el("section", { class: "pj-block" }, el("h4", { text: ui(k) }), body) : null; }
    return el("div", { class: "pj-text" },
      el("div", { class: "pj-col" },
        t(p.summary) ? el("p", { class: "pj-sum", text: t(p.summary) }) : null,
        block("modal_problem", t(p.problem) ? el("p", { text: t(p.problem) }) : null),
        block("modal_result", t(p.result) ? el("p", { text: t(p.result) }) : null)),
      el("div", { class: "pj-col" },
        block("modal_work", has(p.work) ? el("ul", { class: "pj-work" }, p.work.map(function (w) { return el("li", { text: t(w) }); })) : null),
        block("modal_tools", has(p.tools) ? el("ul", { class: "chips" }, p.tools.map(function (x) { return el("li", { text: t(x) }); })) : null)));
  }

  function projectPage(p, media, n, total) {
    var b = newPage("pg-project cat-" + p.category);
    b.appendChild(el("header", { class: "pj-head" }, projectHead(p, n, total)));
    b.appendChild(projectText(p));
    var box = el("div", { class: "pj-photos" });
    var caps = el("ol", { class: "pj-caps" });
    media.forEach(function (m, i) {
      var c = t(m.caption);
      if (m.video) c = c ? c + " (" + tx("video_cap") + ")" : tx("video_cap");
      if (c) caps.appendChild(el("li", {}, el("b", { text: pad2(i + 1) }), el("span", { text: c })));
    });
    b.appendChild(box);
    if (caps.children.length) b.appendChild(caps);
    layoutPhotos(box, media);
    return b.parentNode;
  }

  // Foto disusun per baris dengan tinggi sama, jadi tiap foto tampil utuh (tidak dipotong).
  // Semua cara membagi foto (urutannya tetap) ke 1–3 baris dicoba; dipilih yang fotonya paling besar
  // dan tetap muat di sisa halaman, dengan sedikit hukuman untuk baris yang jauh lebih kecil dari baris lain.
  function layoutPhotos(box, media) {
    var W = box.clientWidth - 1, H = box.clientHeight, G = 3 * MM, best = null;
    splits(media.length, 3).forEach(function (sizes) {
      var rows = [], at = 0;
      sizes.forEach(function (c) { rows.push(media.slice(at, at + c)); at += c; });
      var hs = rows.map(function (r) { return (W - (r.length - 1) * G) / ratioSum(r); });
      var s = Math.min(1, (H - (rows.length - 1) * G) / hs.reduce(function (a, h) { return a + h; }, 0));
      var area = rows.reduce(function (a, r, i) { return a + hs[i] * hs[i] * s * s * ratioSum(r); }, 0);
      var score = area * Math.pow(Math.min.apply(null, hs) / Math.max.apply(null, hs), 0.35);
      if (!best || score > best.score) best = { rows: rows, hs: hs, s: s, score: score };
    });
    box.style.flex = "none";                             // keterangan foto langsung di bawahnya, sisa ruang ke bawah
    best.rows.forEach(function (r, ri) {
      var h = best.hs[ri] * best.s;
      box.appendChild(el("div", { class: "ph-row" }, r.map(function (m) {
        var i = media.indexOf(m);
        return el("figure", { class: "ph" + (i ? "" : " first"), style: "width:" + (h * ratio(m.src)).toFixed(2) + "px;height:" + h.toFixed(2) + "px" },
          photo(m.src),
          el("span", { class: "ph-n", text: pad2(i + 1) }),
          m.video ? el("span", { class: "ph-v" }, icon("play"), tx("video")) : null);
      })));
    });
  }
  function ratioSum(r) { return r.reduce(function (a, m) { return a + ratio(m.src); }, 0); }
  // semua cara membagi n foto berurutan ke paling banyak kmax baris, mis. 3 foto: [3], [1,2], [2,1], [1,1,1]
  function splits(n, kmax) {
    var out = [];
    (function rec(left, parts) {
      if (!left) { out.push(parts); return; }
      if (parts.length === kmax) return;
      for (var c = 1; c <= left; c++) rec(left - c, parts.concat(c));
    })(n, []);
    return out;
  }

  /* ================================================================
     HALAMAN AKHIR — blok disusun berurutan; yang tidak muat pindah
     ke halaman berikutnya. Judul section selalu ikut item pertamanya.
     ================================================================ */
  function flow(blocks) {
    var b = newPage("pg-flow");
    blocks.forEach(function (blk) {
      b.appendChild(blk.node);
      if (b.scrollHeight > b.clientHeight + 1 && b.children.length > 1) {
        b.removeChild(blk.node);
        b = newPage("pg-flow");
        b.appendChild(blk.node);
      }
      blk.page = b.parentNode;
    });
  }
  function group(a, b) { return el("div", { class: "sx" }, a, b); }

  function otherCard(p, n, total) {
    return el("article", { class: "oth cat-" + p.category }, projectHead(p, n, total, true), projectText(p));
  }

  var NOW_RE = /sekarang|present|kini|now/i;       // periode yang masih berjalan → titiknya terisi
  function tlItem(x) {
    var type = x.type === "education" ? "education" : "work";
    var raw = x.period || "";
    var live = NOW_RE.test(typeof raw === "string" ? raw : [raw.id, raw.en].join(" "));
    return el("div", { class: "tl-item " + type + (live ? " now" : "") },
      el("span", { class: "tl-node" + (live ? " live" : ""), "aria-hidden": "true" }),
      el("div", { class: "tl-when" }, el("span", { class: "tl-period", text: t(x.period) }), el("span", { class: "tl-type", text: ui("exp_" + type) })),
      el("div", { class: "tl-what" },
        el("h3", { text: t(x.title) }),
        el("p", { class: "tl-org", text: t(x.org) }),
        has(x.points) ? el("ul", { class: "tl-points" }, x.points.map(function (pt) { return el("li", { text: t(pt) }); })) : null));
  }

  function certList() {
    return el("div", { class: "ce-list" }, D.certifications.map(function (c) {
      var by = t(c.issuer), yr = t(c.year);
      var body = [
        el("span", { class: "ce-seal" }, icon("medal")),
        el("div", { class: "ce-body" }, by ? el("span", { class: "ce-by", text: by }) : null, el("h3", { class: "ce-name", text: t(c.name) })),
        yr ? el("span", { class: "ce-year", text: yr }) : null
      ];
      return c.url ? el("a", { class: "ce", href: c.url }, body) : el("div", { class: "ce" }, body);
    }));
  }

  function closing() {
    var c = D.contact || {};
    return el("section", { class: "ct" },
      el("div", { class: "ct-haz", "aria-hidden": "true" }),
      el("div", { class: "ct-in" },
        el("div", {},
          el("h2", { class: "ct-title", text: ui("contact_title") }),
          el("p", { class: "ct-lead", text: ui("contact_lead") }),
          c.website ? el("p", { class: "ct-web" }, tx("web_note") + " ", el("a", { href: c.website, text: host(c.website) })) : null),
        contactList("ct-list")));
  }

  /* ================================================================
     FOTO DIPERKECIL — sesuai ukuran tampilnya di kertas (±200 dpi)
     supaya PDF ringan; sekalian membuang data EXIF (mis. lokasi GPS).
     Kalau browser menolak (halaman dibuka biasa, bukan lewat
     buat-pdf.cmd), foto aslinya tetap dipakai.
     ================================================================ */
  function shrink() {
    var cv = document.createElement("canvas"), ctx = cv.getContext("2d");
    $$("img[data-src]", DOC).forEach(function (img) {
      var src = img.getAttribute("data-src"), im = IMG[src];
      if (!im || !/\.jpe?g$/i.test(src)) return;
      var r = img.getBoundingClientRect();
      var k = Math.min(1, Math.max(r.width / im.naturalWidth, r.height / im.naturalHeight) * 2.1);
      cv.width = Math.round(im.naturalWidth * k);
      cv.height = Math.round(im.naturalHeight * k);
      ctx.drawImage(im, 0, 0, cv.width, cv.height);
      try { img.src = cv.toDataURL("image/jpeg", 0.82); } catch (e) { /* dibuka dari file:// tanpa izin: pakai foto asli */ }
    });
  }

  /* ================================================================
     SUSUN SEMUA HALAMAN
     ================================================================ */
  function build() {
    var p = D.profile || {};
    document.documentElement.lang = lang;
    document.title = tx("kind") + " — " + (p.name || "");
    FOOT = [p.name, tx("kind"), (D.contact || {}).website ? host(D.contact.website) : ""].filter(Boolean).join(" · ");

    // project berfoto dapat halaman sendiri; yang belum punya foto masuk "Project lainnya"
    var shots = [], others = [];
    (D.projects || []).forEach(function (pr) {
      var m = projectMedia(pr).filter(function (g) { return IMG[g.src]; });
      (m.length ? shots : others).push({ p: pr, m: m });
    });
    var all = shots.concat(others);

    cover(shots.slice(0, 4).map(function (x) { return { p: x.p, m: x.m[0] }; }));
    var ix = aboutPage(all);
    shots.forEach(function (x, i) { x.page = projectPage(x.p, x.m, i + 1, all.length); });

    var blocks = [];
    others.forEach(function (x, i) {
      var card = otherCard(x.p, shots.length + i + 1, all.length);
      blocks.push(x.blk = { node: i ? card : group(secTitle(tx("other"), "sx-proj"), card) });
    });
    (D.experience || []).forEach(function (e, i) {
      blocks.push({ node: i ? tlItem(e) : group(secTitle(ui("sec_experience"), "sx-exp"), tlItem(e)) });
    });
    if (has(D.certifications)) blocks.push({ node: group(secTitle(ui("sec_certs"), "sx-cert"), certList()) });
    blocks.push({ node: closing() });
    flow(blocks);
    others.forEach(function (x) { x.page = x.blk.page; });

    var pages = $$(".page", DOC);
    pages.forEach(function (pg, i) {
      var n = pg.querySelector(".pg-num");
      if (n) n.appendChild(el("span", {}, tx("page") + " ", el("b", { text: pad2(i + 1) }), " / " + pad2(pages.length)));
    });
    ix.forEach(function (r) { r.n.textContent = pad2(pages.indexOf(r.x.page) + 1); });

    shrink();
    document.documentElement.setAttribute("data-siap", "1");
  }

  // font harus sudah dimuat sebelum halaman diukur, supaya susunan foto & pindah halaman tepat
  var fonts = document.fonts && document.fonts.load
    ? Promise.all(["400 12px Archivo", "850 12px Archivo", "400 12px 'Martian Mono'", "500 12px 'Martian Mono'", "700 12px 'Martian Mono'"].map(function (f) {
      return document.fonts.load(f).catch(function () {});
    }))
    : Promise.resolve();
  var paths = [];
  (D.projects || []).forEach(function (pr) { projectMedia(pr).forEach(function (g) { if (paths.indexOf(g.src) < 0) paths.push(g.src); }); });

  fonts.then(function () { return preload(paths); }).then(build).catch(function (e) {
    DOC.appendChild(el("pre", { text: "Gagal menyusun PDF: " + (e && e.stack || e) }));
  });
})();
