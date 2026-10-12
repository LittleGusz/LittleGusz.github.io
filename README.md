# Website Portofolio — Electrical & Mechanical Engineer

Website satu halaman, HTML/CSS/JS murni. Nggak perlu install apa pun, nggak perlu build.

## Cara buka
Dobel-klik `index.html`. Jalan langsung di browser, tanpa server.

### Dibuka dari flashdisk / tanpa internet
Semua yang dipakai website ada di folder ini: halaman, tampilan, data, font, foto, video, dan CV. Tidak ada yang diambil
dari internet, jadi website tampil lengkap walau laptopnya offline.
- Di laptop/PC lain (Windows, Mac, Linux): colok flashdisk, buka folder ini, dobel-klik `index.html`.
- Kalau mau dicopy ke tempat lain, yang wajib ikut: `index.html`, `css/`, `js/`, `assets/` (±86 MB). Susunan foldernya jangan diubah.
- Yang tetap butuh internet cuma link keluar (LinkedIn) dan kirim email.
- Di HP/tablet, membuka website langsung dari flashdisk umumnya tidak bisa (browser HP tidak memuat folder website lokal).
  Di HP, buka versi online-nya: https://littlegusz.github.io/ (lihat bagian "Website online" di bawah).

## Cara isi data asli
**Cukup edit satu file: `js/data.js`.** HTML, CSS, dan logic nggak perlu disentuh.

1. Buka `js/data.js` pakai VS Code / Notepad.
2. Ganti semua yang bertanda `CONTOH`, `EXAMPLE`, `[Isi: ...]`, `[Fill: ...]`, dan `20XX`.
3. Tiap teks ditulis dua bahasa:
   ```js
   title: { id: "Panel Kontrol Konveyor", en: "Conveyor Control Panel" }
   ```
   Kalau sama di dua bahasa, cukup string biasa: `"SolidWorks"`.
4. Simpan, refresh browser.

### Foto & gambar
- Foto profil → taruh di `assets/img/` (mis. `profile.jpg`), lalu isi `photo: "assets/img/profile.jpg"`.
- Gambar project → taruh di `assets/img/projects/`, lalu isi `image` dan `gallery` di tiap project.
  Ukuran ideal gambar kartu: rasio 16:10, lebar ±1200px, format `.jpg`/`.webp` biar ringan.
- Kalau satu project punya 2 gambar atau lebih (`image` + `gallery`), otomatis jadi slider:
  - Di kartu project, fotonya geser sendiri tiap 4 detik (berhenti saat kartunya di-hover atau di luar layar).
    Garis di bawah foto jadi indikator, dan badge di pojok menunjukkan posisi foto, mis. `2 / 4`.
    Lamanya diatur lewat `--slide-time` di `css/style.css` bagian `:root`.
  - Di detail project, fotonya bisa digeser pakai jari/mouse, tombol panah, tombol ← → di keyboard, atau klik thumbnail.
- Keterangan per foto (opsional): isi `imageCaption` untuk foto sampul, dan tulis item `gallery` sebagai
  `{ src: "...", caption: { id: "...", en: "..." } }`. Keterangannya muncul di bawah foto pada detail project
  dan di kartu project yang besar. Foto tanpa keterangan cukup ditulis path-nya saja.
- Foto portrait boleh dipakai:
  - Di detail project, fotonya tampil utuh di atas versi buramnya sendiri, dan bingkainya otomatis lebih tinggi
    (berlaku untuk semua foto di project itu supaya bingkainya tidak berubah-ubah saat digeser).
  - Di kartu project, fotonya dipotong melebar dan diambil bagian tengahnya. Kalau bagian pentingnya kepotong,
    isi `imageFocus` (foto sampul) atau `focus` di item `gallery` dengan `"top"`, `"bottom"`, `"center"`,
    atau posisi seperti `"50% 20%"`.
- Video project: tulis sebagai item `gallery`
  `{ video: "assets/img/projects/nama-project/demo.mp4", poster: "assets/img/projects/nama-project/demo.jpg", caption: { id: "...", en: "..." } }`.
  - Videonya jadi salah satu slide di detail project, dengan tombol putar. Video berhenti sendiri saat slide digeser atau
    detail project ditutup. Di kartu project cuma muncul badge "Video" (kartu hanya memutar foto).
  - `poster` = gambar diam sebelum video diputar. Opsional, tapi disarankan supaya thumbnail-nya tidak kosong.
  - Pakai MP4 dengan codec H.264 supaya bisa diputar di semua browser. Video dari HP sebaiknya dikompres dulu
    (mis. 720p, di bawah ±20 MB per video) supaya halaman tidak berat; GitHub juga menolak file di atas 100 MB.
  - Video portrait boleh; bingkainya otomatis lebih tinggi seperti foto portrait.

### CV
Taruh PDF di `assets/cv/`, lalu isi `cv: "assets/cv/NamaFile.pdf"`. Kalau `cv: ""`, tombol Download CV otomatis hilang.

### Menyembunyikan section
Kosongkan array-nya, mis. `certifications: []` → section Sertifikasi + link navbar-nya hilang sendiri.
Kontak yang dikosongkan (`""`) juga disembunyikan.

### Level skill
`"advanced"` (3 LED), `"intermediate"` (2 LED), `"basic"` (1 LED).
Warna kartu grup skill ikut ikonnya: `code` hijau, `bolt` kuning, `gear` biru, `users` oranye.

### Pita berjalan
Isi pita kuning dan biru di bawah hero ada di `ticker` (`front` dan `back`).
Kalau `front: []`, isinya otomatis diambil dari daftar skill. Kalau `back: []`, pita biru disembunyikan.

### Stabilo kata kunci
Di teks `about` dan `tagline`, bungkus kata kunci dengan `[[...]]`, mis. `"bidang [[otomasi industri]]"`.
Warnanya bergantian kuning, biru, hijau dan tersapu masuk waktu paragrafnya muncul.

### Angka "dikocok"
Angka di `stats` (nameplate di section Tentang) dan tahun sertifikasi diacak dulu sebelum berhenti di nilai aslinya, seperti pengumuman harga HP baru.
Cukup isi angkanya di `data.js`; animasinya otomatis.

## Ganti warna
Buka `css/style.css`, bagian paling atas (`:root`). Warnanya diambil dari kabel 3 fasa dan sinyal panel listrik:
- `--stop` merah (fasa R): tombol/lampu STOP, sertifikasi
- `--volt` kuning (fasa S): electrical, tombol utama, blok kontak
- `--cad` biru (fasa T): mechanical / CAD
- `--run` hijau: lampu RUN, PLC, pengalaman kerja
- `--orange`: pendidikan, soft skill
- `--ink` navy baja: warna dasar halaman
- `--steel` abu terang: latar section Tentang
- `--blueprint` biru tua: latar section Project

## Panel kontrol di hero
Pintu panel di bagian atas bisa dipencet pengunjung:
- **START** (tahan lalu lepas): motor M1 nyala dan tetap jalan lewat kontak self-holding, ladder diagram ikut "dialiri arus", kipas motor berputar.
- **STOP**: motor langsung mati dan kipasnya direm sampai berhenti (±0,6 detik).
- Saat halaman dibuka ada lamp test singkat, lalu panel menyalakan motor sendiri sekali.
- Tombol bisa dipakai lewat keyboard (Tab lalu Spasi/Enter).

Pemilih bahasa ID/EN di navbar berbentuk selector switch; klik ID, EN, atau knop-nya.

## Animasi
- Hero: nama naik per kata, pintu panel mengayun masuk, gelombang sinus 3 fasa (R-S-T) berjalan di bawahnya, peran bergantian dengan efek gulung.
- Saat di-scroll: judul, kartu, dan LED skill muncul berurutan; kabel timeline dialiri arus; progress bar 3 warna di navbar.
- Hover: kartu project naik dengan garis putus-putus berjalan di tepinya; tombol dan baris kontak ikut bereaksi.

Semua animasi otomatis mati kalau pengunjung mengaktifkan *reduce motion*.

## Website online
Alamat: **https://littlegusz.github.io/** (GitHub Pages, gratis).
Isinya diambil dari repo `LittleGusz/LittleGusz.github.io` di GitHub, branch `main`. Repo dan website-nya public: semua yang
di-upload bisa dilihat siapa saja.

### Meng-update website online
Mengubah file di folder ini TIDAK otomatis mengubah website online. Setelah ada perubahan, kirim ke GitHub dari folder ini
(butuh Git, sudah terpasang di laptop yang dipakai men-setting):
```
git add -A
git commit -m "tulis singkat apa yang diubah"
git push
```
Tunggu ±1 menit, lalu refresh website-nya (Ctrl+F5 kalau tampilannya masih yang lama).

- Folder berawalan `_` (`_file-asli/`, cadangan versi lama) tidak ikut ter-upload; daftarnya ada di file `.gitignore`.
- Batas GitHub: satu file maksimal 100 MB, dan total website sebaiknya di bawah 1 GB. Video tetap dikompres dulu.
- Gambar pratinjau saat link dibagikan (WhatsApp/LinkedIn) adalah `assets/img/og-preview.jpg`, diatur lewat meta `og:image`
  di `index.html`. Kalau alamat website berubah, ganti URL di meta `og:url` dan `og:image`.

## Struktur
```
index.html            kerangka halaman + meta SEO/Open Graph
css/style.css         tema, layout, responsive, animasi
css/fonts.css         daftar font (file font-nya di assets/fonts/, bukan dari internet)
js/data.js            ← SATU-SATUNYA file yang perlu diedit
js/i18n.js            teks UI (navbar, judul section, tombol) ID & EN
js/main.js            render data + interaksi + animasi
assets/img/           favicon, placeholder foto & project
assets/img/projects/  foto & video project, satu subfolder per project
assets/fonts/         file font Archivo & Martian Mono + teks lisensinya (OFL)
assets/cv/            file CV (PDF)
.gitignore            daftar yang tidak ikut di-upload ke GitHub (folder berawalan _)
.nojekyll             file kosong; penanda supaya GitHub Pages menyajikan folder ini apa adanya
_file-asli/           foto & video asli dari HP, per project, sebelum dipotong/dikompres untuk web. Tidak dipakai website dan
                      JANGAN ikut di-upload: ukurannya besar (±360 MB) dan fotonya masih menyimpan lokasi GPS tempat foto diambil
_versi-sebelum-redesign/  cadangan kode sebelum redesign "Panel Hidup"
_versi-lama/          cadangan versi yang lebih lama
```
