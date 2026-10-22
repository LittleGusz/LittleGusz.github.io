/* =====================================================================
   DATA PORTOFOLIO — SATU-SATUNYA FILE YANG PERLU DIEDIT
   ---------------------------------------------------------------------
   • Teks dua bahasa ditulis begini:  { id: "Teks Indonesia", en: "English text" }
     Kalau cuma satu bahasa, boleh tulis string biasa: "SolidWorks"
   • Semua yang bertanda CONTOH / [Isi: ...] adalah placeholder. Ganti
     dengan data asli sebelum website dipublikasikan.
   • Section yang datanya dikosongkan ( [] ) otomatis disembunyikan,
     termasuk link-nya di navbar.
   • Gambar: taruh di assets/img/ atau assets/img/projects/, lalu tulis
     path-nya, mis. "assets/img/projects/panel-konveyor.jpg"
   • Di teks "about" dan "tagline", bungkus kata kunci dengan [[...]]
     supaya diberi stabilo warna, mis. "bidang [[otomasi industri]]".
   ===================================================================== */

window.PORTFOLIO = {

  /* ---------- PROFIL ---------- */
  profile: {
    name: "Muhamad Agus Firdaus",
    initials: "MAF",                      // tampil di logo navbar
    title: { id: "Mechanical & Electrical Engineer", en: "Mechanical & Electrical Engineer" },

    // Teks yang diketik bergantian di hero
    roles: [
      { id: "PLC Programmer", en: "PLC Programmer" },
      { id: "Perancang Sistem Otomasi", en: "Automation System Designer" },
      { id: "Desainer Mekanik SolidWorks", en: "SolidWorks Mechanical Designer" }
    ],

    tagline: {
      id: "Merancang sistem kontrol dari nol — dari logika PLC, wiring panel, sampai desain mekanik yang siap diproduksi.",
      en: "Designing control systems from scratch — from PLC logic and panel wiring to production-ready mechanical design."
    },

    photo: "assets/img/profile-placeholder.svg",
    cv: "assets/cv/CV-Muhamad-Agus-Firdaus.pdf",   // kosong "" = tombol CV disembunyikan
    // PDF portofolio, dibuat otomatis dari isi file ini: dobel-klik pdf-portofolio/buat-pdf.cmd.
    // Boleh satu file untuk dua bahasa (string biasa), atau beda per bahasa seperti di bawah.
    // Kosong "" = tombol Download Portofolio disembunyikan
    portfolio: {
      id: "assets/portfolio/Portofolio-Muhamad-Agus-Firdaus.pdf",
      en: "assets/portfolio/Portfolio-Muhamad-Agus-Firdaus-EN.pdf"
    },

    availability: { id: "Terbuka untuk project & pekerjaan", en: "Open to projects & roles" },
    location: { id: "Bekasi, Jawa Barat", en: "Bekasi, West Java" },
    education: { id: "Teknik Mekatronika — SMK YPPT Garut", en: "Mechatronics Engineering — SMK YPPT Garut" },

    about: [
      {
        id: "Saya Mechanical & Electrical Engineer dengan pengalaman lebih dari 1 tahun di bidang [[otomasi industri]]: perakitan panel kontrol, wiring mesin, pemrograman dan modifikasi [[PLC (Omron & Mitsubishi)]], serta setup [[robot kolaboratif]].",
        en: "I'm a Mechanical & Electrical Engineer with more than a year of experience in [[industrial automation]]: control panel assembly, machine wiring, [[PLC programming]] and modification (Omron & Mitsubishi), and [[collaborative robot]] setup."
      },
      {
        id: "Saya terbiasa mengerjakan project mesin custom untuk klien di industri manufaktur. Lulusan Teknik Mekatronika yang ingin terus berkembang sebagai Automation Engineer.",
        en: "I regularly work on custom machine projects for clients in the manufacturing industry. A Mechatronics Engineering graduate looking to keep growing as an Automation Engineer."
      }
    ],

    // Angka ringkas di hero. Ganti dengan angka asli.
    stats: [
      { value: 1, suffix: "+", label: { id: "Tahun pengalaman otomasi industri", en: "Years in industrial automation" } },
      { value: 11, suffix: "", label: { id: "Project otomasi & mekanik yang dikerjakan", en: "Automation & mechanical projects delivered" } },
      { value: 2, suffix: "",  label: { id: "Platform PLC: Omron & Mitsubishi", en: "PLC platforms: Omron & Mitsubishi" } }
    ]
  },

  /* ---------- KONTAK (kosongkan "" untuk menyembunyikan) ---------- */
  contact: {
    email: "muhamadagusfirdaus32@gmail.com",
    linkedin: "https://www.linkedin.com/in/muhamad-agus-firdaus-9563562b6",
    linkedinName: "Muhamad Agus Firdaus", // teks yang tampil; kosong "" = tampilkan URL-nya
    whatsapp: "",                         // format internasional tanpa + dan tanpa spasi, mis. "628xxxxxxxxxx"
    location: { id: "Bekasi, Jawa Barat, Indonesia", en: "Bekasi, West Java, Indonesia" },
    website: "https://littlegusz.github.io/" // alamat website ini; ditulis di PDF portofolio (video project ada di sini)
  },

  /* ---------- PITA BERJALAN (di bawah hero) ----------
     front: pita kuning, biasanya tools/software
     back : pita biru, kata kunci bidang kerja
     Kosongkan front: [] untuk otomatis ambil dari daftar skill;
     kosongkan back: [] untuk menyembunyikan pita biru.                 */
  ticker: {
    front: [
      "CX-Programmer", "GX Works", "CX-Designer",
      { id: "Panel Kontrol", en: "Control Panels" },
      { id: "Wiring Mesin", en: "Machine Wiring" },
      "See Electrical", "SolidWorks", "AutoCAD",
      { id: "Pneumatik", en: "Pneumatics" },
      "Cobot Rokae xMate CR12"
    ],
    back: [
      { id: "Otomasi Industri", en: "Industrial Automation" },
      { id: "Pemrograman PLC", en: "PLC Programming" },
      { id: "Desain Mekanik", en: "Mechanical Design" },
      "Poka-Yoke",
      "Troubleshooting",
      "Safety Fence"
    ]
  },

  /* ---------- SKILL ----------
     level: "advanced" | "intermediate" | "basic"
     icon : "bolt" | "gear" | "code" | "users"                        */
  skills: [
    {
      icon: "code",
      group: { id: "PLC & HMI", en: "PLC & HMI" },
      items: [
        { name: "Omron · CX-Programmer", level: "advanced" },
        { name: "Omron · CX-Designer", level: "intermediate" },
        { name: "Mitsubishi · GX Works", level: "intermediate" }
      ]
    },
    {
      icon: "bolt",
      group: { id: "Electrical", en: "Electrical" },
      items: [
        { name: { id: "Perakitan panel kontrol", en: "Control panel assembly" }, level: "advanced" },
        { name: { id: "Wiring mesin", en: "Machine wiring" }, level: "advanced" },
        { name: "See Electrical", level: "intermediate" }
      ]
    },
    {
      icon: "gear",
      group: { id: "Mekanik, CAD & Robotik", en: "Mechanical, CAD & Robotics" },
      items: [
        { name: "SolidWorks", level: "intermediate" },
        { name: "AutoCAD", level: "intermediate" },
        { name: { id: "Pneumatik", en: "Pneumatics" }, level: "intermediate" },
        { name: "Cobot Rokae xMate CR12", level: "intermediate" }
      ]
    },
    {
      icon: "users",
      group: { id: "Soft Skill & Lainnya", en: "Soft Skills & Other" },
      items: [
        { name: { id: "Disiplin", en: "Disciplined" }, level: "advanced" },
        { name: { id: "Teliti", en: "Detail-oriented" }, level: "advanced" },
        { name: { id: "Analitis", en: "Analytical" }, level: "advanced" },
        { name: { id: "Manajemen waktu", en: "Time management" }, level: "advanced" },
        { name: "Microsoft Office", level: "intermediate" }
      ]
    }
  ],

  /* ---------- PROJECT ----------
     Urutan  : project paling atas di daftar ini tampil sebagai kartu besar. Untuk mengganti
               kartu besarnya, pindahkan blok { ... } project yang diinginkan ke urutan pertama.
     category: "electrical" | "mechanical"
     image   : foto sampul (foto pertama).  imageCaption: keterangannya (opsional)
     gallery : foto tambahan. Total 2 foto atau lebih → otomatis jadi slider:
               di kartu fotonya geser sendiri, di detail project bisa digeser.
               Tiap foto boleh ditulis path-nya saja, atau { src, caption }
               kalau mau pakai keterangan, mis.
               imageCaption: { id: "Mesin sebelum diubah", en: "The machine before the retrofit" },
               gallery: [
                 "assets/img/projects/torque-2.jpg",
                 { src: "assets/img/projects/torque-3.jpg",
                   caption: { id: "Panel kontrol setelah dirakit", en: "Control panel after assembly" } }
               ]
     Foto portrait boleh. Di detail project fotonya tampil utuh (bingkainya otomatis
               lebih tinggi). Di kartu fotonya dipotong melebar, diambil bagian tengahnya.
               Kalau bagian pentingnya kepotong, pilih bagian yang ditampilkan dengan
               imageFocus (foto sampul) atau focus (foto di gallery). Isinya "top",
               "bottom", "center", atau posisi seperti "50% 20%", mis.
               imageFocus: "top",
               gallery: [{ src: "assets/img/projects/torque-2.jpg", focus: "bottom" }]
     Video   : tulis sebagai item gallery { video, poster, caption }. Pakai file MP4 (H.264).
               poster = gambar diam yang tampil sebelum videonya diputar (opsional, tapi
               disarankan). Videonya diputar di detail project; di kartu cuma muncul
               badge "Video". Video portrait juga boleh, mis.
               gallery: [
                 { video: "assets/img/projects/torque-check/demo.mp4",
                   poster: "assets/img/projects/torque-check/demo.jpg",
                   caption: { id: "Mesin saat berjalan otomatis", en: "The machine running in automatic mode" } }
               ]                                                                                   */
  projects: [
    {
      category: "electrical",
      title: { id: "Sistem Kontrol Mesin Torque Check", en: "Torque Check Machine Control System" },
      role: { id: "PLC Programmer & Panel Builder", en: "PLC Programmer & Panel Builder" },
      year: "",
      summary: {
        id: "Mengubah mesin torque check yang sebelumnya manual menjadi otomatis untuk klien manufaktur.",
        en: "Converted a previously manual torque check machine to automatic operation for a manufacturing client."
      },
      tools: ["PLC", { id: "Panel Kontrol", en: "Control Panel" }, "Counter Omron H7CC"],
      image: "assets/img/projects/torque-check/mesin.jpg",
      imageFocus: "top",
      imageCaption: {
        id: "Mesin torque check dengan panel kontrol barunya: tiga lampu status, counter Omron H7CC, dan buzzer.",
        en: "The torque check machine with its new control panel: three status lamps, an Omron H7CC counter and a buzzer."
      },
      problem: { id: "Proses torque check sebelumnya masih dijalankan secara manual.", en: "The torque check process was previously run manually." },
      work: [
        { id: "Memilih komponen sistem kontrol", en: "Selected the control system components" },
        { id: "Merakit panel kontrol", en: "Assembled the control panel" },
        { id: "Membuat program PLC", en: "Wrote the PLC program" }
      ],
      gallery: [
        {
          src: "assets/img/projects/torque-check/meja-kerja.jpg",
          focus: "65% 50%",
          caption: {
            id: "Meja kerja: part di atas jig, dua tombol hijau, tombol emergency, dan kotak torque wrench.",
            en: "Work table: the part on its jig, two green push buttons, an emergency stop and the torque wrench box."
          }
        },
        {
          src: "assets/img/projects/torque-check/panel-indikator.jpg",
          focus: "50% 25%",
          caption: {
            id: "Panel indikator: lampu hijau, kuning, dan merah, counter Omron H7CC, serta buzzer.",
            en: "Indicator panel: green, yellow and red lamps, an Omron H7CC counter and a buzzer."
          }
        },
        {
          src: "assets/img/projects/torque-check/isi-panel.jpg",
          focus: "50% 90%",
          caption: {
            id: "Isi panel saat dirakit: MCB, power supply, lima relay, dan terminal.",
            en: "Inside the panel during assembly: MCBs, power supply, five relays and terminals."
          }
        },
        {
          src: "assets/img/projects/torque-check/instalasi.jpg",
          focus: "50% 40%",
          caption: {
            id: "Proses instalasi: penarikan kabel ke kotak tombol di depan mesin.",
            en: "Installation in progress: running the wiring to the button boxes at the front of the machine."
          }
        },
        {
          video: "assets/img/projects/torque-check/uji-jalan.mp4",
          poster: "assets/img/projects/torque-check/uji-jalan.jpg",
          caption: {
            id: "Satu siklus setelah sistem terpasang: part dipasang di jig, diproses, lalu torsinya dicek dengan torque wrench yang tersambung ke panel.",
            en: "One full cycle after installation: the part is loaded on the jig, processed, then its torque is checked with the torque wrench wired to the panel."
          }
        }
      ]
    },
    {
      category: "electrical",
      title: { id: "Sistem Kontrol Mesin Baritori Camshaft", en: "Camshaft Deburring (Baritori) Machine Control System" },
      role: { id: "PLC Programmer & Panel Builder", en: "PLC Programmer & Panel Builder" },
      year: "",
      summary: {
        id: "Sistem kontrol mesin baritori (deburring) camshaft untuk klien manufaktur: PLC Omron CP2E, panel operator, dan vision sensor yang memeriksa mata bor.",
        en: "Control system for a camshaft deburring (baritori) machine for a manufacturing client: Omron CP2E PLC, operator panel and a vision sensor that checks the drill bits."
      },
      tools: ["PLC Omron CP2E", { id: "Panel Kontrol", en: "Control Panel" }, "Vision Sensor Keyence IV2"],
      image: "assets/img/projects/baritori-camshaft/mesin.jpg",
      imageCaption: {
        id: "Unit baritori: motor dengan empat mata bor, silinder pneumatik, dan vision sensor yang mengawasi mata bor dari atas.",
        en: "The deburring unit: a motor driving four drill bits, pneumatic cylinders, and a vision sensor watching the bits from above."
      },
      work: [
        { id: "Memilih komponen sistem kontrol", en: "Selected the control system components" },
        { id: "Merakit panel kontrol: PLC Omron CP2E, power supply, relay, dan terminal berlabel", en: "Assembled the control panel: Omron CP2E PLC, power supply, relays and labelled terminals" },
        { id: "Membuat program PLC: mode manual/auto, home position, dan alarm", en: "Wrote the PLC program: manual/auto modes, home position and alarms" },
        { id: "Menyetel vision sensor Keyence IV2 untuk memeriksa mata bor", en: "Set up the Keyence IV2 vision sensor to check the drill bits" }
      ],
      gallery: [
        {
          src: "assets/img/projects/baritori-camshaft/panel-plc.jpg",
          focus: "50% 30%",
          caption: {
            id: "Isi panel kontrol: PLC Omron CP2E, power supply Omron S8VK 24 VDC, MCB, relay, dan terminal dengan label kabel.",
            en: "Inside the control panel: Omron CP2E PLC, Omron S8VK 24 VDC power supply, MCBs, relays and terminals with labelled wiring."
          }
        },
        {
          src: "assets/img/projects/baritori-camshaft/vision-sensor.jpg",
          focus: "85% 50%",
          caption: {
            id: "Setting vision sensor Keyence IV2: empat area periksa di mata bor, semuanya terbaca OK.",
            en: "Keyence IV2 vision sensor setup: four inspection windows on the drill bits, all reading OK."
          }
        },
        {
          video: "assets/img/projects/baritori-camshaft/uji-jalan.mp4",
          poster: "assets/img/projects/baritori-camshaft/uji-jalan.jpg",
          caption: {
            id: "Uji jalan di workshop: panel operator dengan lampu motor dan silinder, mode manual/auto, tombol home position, dan tower lamp. Camshaft sudah terpasang di V-block.",
            en: "Workshop test run: the operator panel with motor and cylinder lamps, manual/auto mode, home position button and tower lamp. A camshaft is loaded on the V-blocks."
          }
        }
      ]
    },
    {
      category: "electrical",
      title: { id: "Cek OK / NG dengan Kamera", en: "OK / NG Check with Camera" },
      role: { id: "Panel Builder & Wiring", en: "Panel Builder & Wiring" },
      year: "",
      summary: {
        id: "Kotak indikator OK/NG untuk mesin balance: kamera membaca hasil ukur di layar mesin, lalu lampu dan counter menunjukkan part OK atau NG.",
        en: "An OK/NG indicator box for balancing machines: a camera reads the result on the machine's screen, and lamps and counters show whether the part is OK or NG."
      },
      tools: ["Vision Sensor", { id: "Panel Kontrol", en: "Control Panel" }, "Counter Omron H7EC"],
      image: "assets/img/projects/cek-ok-ng-kamera/mesin-balance-2.jpg",
      imageFocus: "50% 40%",
      imageCaption: {
        id: "Kotak indikator terpasang di mesin balance no. 2: lampu power, lampu OK dan NG dengan counter masing-masing, serta buzzer.",
        en: "The indicator box installed on balancing machine no. 2: power lamp, OK and NG lamps each with its own counter, and a buzzer."
      },
      work: [
        { id: "Merakit kotak indikator: lampu power, lampu OK dan NG, dua counter Omron H7EC, dan buzzer", en: "Built the indicator box: power lamp, OK and NG lamps, two Omron H7EC counters and a buzzer" },
        { id: "Memasang kamera menghadap layar hasil ukur mesin balance", en: "Mounted the camera facing the balancing machine's result screen" },
        { id: "Menghubungkan keluaran kamera ke lampu dan counter OK/NG", en: "Wired the camera output to the OK/NG lamps and counters" },
        { id: "Memasang unit yang sama di mesin balance no. 1 dan no. 2", en: "Installed the same unit on balancing machines no. 1 and no. 2" }
      ],
      gallery: [
        {
          src: "assets/img/projects/cek-ok-ng-kamera/kamera-layar.jpg",
          focus: "50% 27%",
          caption: {
            id: "Kamera diarahkan ke layar hasil ukur mesin balance.",
            en: "The camera aimed at the balancing machine's result screen."
          }
        },
        {
          src: "assets/img/projects/cek-ok-ng-kamera/mesin-balance-1.jpg",
          focus: "50% 40%",
          caption: {
            id: "Unit yang sama di mesin balance no. 1.",
            en: "The same unit on balancing machine no. 1."
          }
        },
        {
          video: "assets/img/projects/cek-ok-ng-kamera/uji-jalan.mp4",
          poster: "assets/img/projects/cek-ok-ng-kamera/uji-jalan.jpg",
          caption: {
            id: "Uji jalan: lampu OK dan NG menyala bergantian, lalu terlihat layar mesin balance yang dibaca kamera.",
            en: "Test run: the OK and NG lamps light in turn, followed by the balancing machine screen the camera reads."
          }
        }
      ]
    },
    {
      category: "electrical",
      title: { id: "Cover Otomatis Rak Part", en: "Automatic Parts Rack Cover" },
      role: { id: "Perancang Sistem Otomasi", en: "Automation System Designer" },
      year: "",
      summary: {
        id: "Cover rak part yang hanya terbuka sesuai tipe engine yang terbaca, supaya operator tidak salah ambil part.",
        en: "A parts rack cover that only opens for the detected engine type, so operators can't pick the wrong part."
      },
      tools: ["PLC Omron CP2E", "CX-Programmer", { id: "Pneumatik", en: "Pneumatics" }, "Poka-Yoke"],
      image: "assets/img/projects/cover-rak-part/panel-plc.jpg",
      imageFocus: "50% 12%",
      imageCaption: {
        id: "Panel kontrol cover rak: PLC Omron CP2E, relay, dan terminal. Di bawahnya, solenoid valve yang menggerakkan cover.",
        en: "The rack cover's control panel: Omron CP2E PLC, relays and terminals. Below it, the solenoid valves that actuate the covers."
      },
      problem: {
        id: "Operator berisiko salah mengambil part untuk tipe engine yang berbeda (A atau B).",
        en: "Operators risked picking the part for the wrong engine type (A or B)."
      },
      work: [
        { id: "Membuat cover otomatis di rak part", en: "Built an automatic cover on the parts rack" },
        { id: "Menghubungkan cover ke sensor mesin existing", en: "Connected the cover to the existing machine sensor" },
        { id: "Cover hanya terbuka sesuai tipe engine yang terbaca (A atau B)", en: "The cover only opens for the engine type that is read (A or B)" },
        { id: "Memprogram PLC Omron CP2E dan mengecek urutannya online lewat CX-Programmer", en: "Programmed the Omron CP2E PLC and checked the sequence online in CX-Programmer" }
      ],
      gallery: [
        {
          src: "assets/img/projects/cover-rak-part/program-ladder.jpg",
          caption: {
            id: "Program ladder dipantau online dari CX-Programmer saat commissioning.",
            en: "The ladder program monitored online in CX-Programmer during commissioning."
          }
        }
      ]
    },
    {
      category: "electrical",
      title: { id: "Modify Mesin Press Bearing", en: "Bearing Press Machine Modification" },
      role: { id: "PLC Programmer & Wiring", en: "PLC Programmer & Wiring" },
      year: "",
      summary: {
        id: "Memodifikasi program PLC Mitsubishi dan wiring panel pada mesin press bearing 5 silinder milik klien manufaktur.",
        en: "Modified the Mitsubishi PLC program and panel wiring on a manufacturing client's 5-cylinder bearing press machine."
      },
      tools: ["PLC Mitsubishi FX3G", "GX Works", "Wiring"],
      image: "assets/img/projects/modify-press-bearing/panel-operator.jpg",
      imageFocus: "50% 38%",
      imageCaption: {
        id: "Panel operator: lampu status, pilihan mode manual/auto dan kiri/kanan, serta tombol naik-turun untuk 5 silinder.",
        en: "Operator panel: status lamps, manual/auto and left/right mode selectors, and up/down controls for 5 cylinders."
      },
      problem: {
        id: "Mesin press bearing milik klien perlu diubah cara kerjanya. Perubahannya harus dikerjakan di PLC dan panel yang sudah terpasang, tanpa mengganti mesinnya.",
        en: "The client's bearing press machine needed to work differently. The change had to be made on the PLC and panel already installed, without replacing the machine."
      },
      work: [
        { id: "Mempelajari program dan wiring existing mesin sebelum diubah", en: "Studied the machine's existing program and wiring before changing anything" },
        { id: "Memodifikasi program PLC Mitsubishi FX3G-60M dengan GX Works", en: "Modified the Mitsubishi FX3G-60M PLC program in GX Works" },
        { id: "Menyesuaikan wiring panel: I/O PLC, relay, dan panel operator", en: "Reworked the panel wiring: PLC I/O, relays and the operator panel" },
        { id: "Menguji siklus press langsung di mesin sampai urutannya berjalan benar", en: "Tested the press cycle on the machine until the sequence ran correctly" }
      ],
      gallery: [
        {
          src: "assets/img/projects/modify-press-bearing/panel-plc.jpg",
          focus: "top",
          caption: {
            id: "Isi panel kontrol: PLC Mitsubishi FX3G-60M, deretan relay, kontaktor, dan terminal.",
            en: "Inside the control panel: Mitsubishi FX3G-60M PLC, relay bank, contactor and terminals."
          }
        },
        {
          video: "assets/img/projects/modify-press-bearing/uji-jalan.mp4",
          poster: "assets/img/projects/modify-press-bearing/uji-jalan.jpg",
          caption: {
            id: "Uji jalan setelah modifikasi: siklus press dijalankan dengan dua tangan dari kotak tombol di depan mesin.",
            en: "Test run after the modification: the press cycle is started with both hands from the button box at the front of the machine."
          }
        }
      ]
    },
    {
      category: "electrical",
      title: { id: "Setup Cobot Rokae xMate CR12", en: "Rokae xMate CR12 Cobot Setup" },
      role: { id: "Setup & Troubleshooting", en: "Setup & Troubleshooting" },
      year: "",
      summary: {
        id: "Setup sel cobot Rokae xMate CR12 dengan gripper pneumatik, sensor, dan roller conveyor: dari uji I/O di workshop sampai pemasangan di lokasi.",
        en: "Set up a Rokae xMate CR12 cobot cell with a pneumatic gripper, sensors and roller conveyors, from I/O testing in the workshop to installation on site."
      },
      tools: ["Cobot Rokae xMate CR12", { id: "Pneumatik", en: "Pneumatics" }, { id: "Sensor", en: "Sensors" }, "Conveyor"],
      image: "assets/img/projects/cobot-rokae/sel-cobot.jpg",
      imageFocus: "50% 35%",
      imageCaption: {
        id: "Sel cobot setelah terpasang: cobot Rokae, dua meja station, teach pendant, dan roller conveyor.",
        en: "The cobot cell after installation: Rokae cobot, two station tables, teach pendant and roller conveyor."
      },
      work: [
        { id: "Menguji sinyal input sensor dan output solenoid valve dari teach pendant", en: "Tested sensor inputs and solenoid valve outputs from the teach pendant" },
        { id: "Mengetes gerakan cobot dengan gripper pneumatik", en: "Tested the cobot's motion with the pneumatic gripper" },
        { id: "Mengetes roller conveyor sebelum dipasang", en: "Tested the roller conveyors before installation" },
        { id: "Memasang dan menguji ulang seluruh unit di lokasi", en: "Installed and re-tested the whole cell on site" }
      ],
      gallery: [
        {
          src: "assets/img/projects/cobot-rokae/instalasi.jpg",
          focus: "50% 35%",
          caption: {
            id: "Proses instalasi di lokasi: cobot di atas dudukannya, dengan roller conveyor di depan dan belakangnya.",
            en: "Installation on site: the cobot on its base, with roller conveyors in front of and behind it."
          }
        },
        {
          video: "assets/img/projects/cobot-rokae/gerak-gripper.mp4",
          poster: "assets/img/projects/cobot-rokae/gerak-gripper.jpg",
          caption: {
            id: "Uji gerak di workshop: cobot dengan gripper pneumatik bergerak ke arah benda uji di meja station.",
            en: "Motion test in the workshop: the cobot and its pneumatic gripper move toward a test object on the station table."
          }
        },
        {
          video: "assets/img/projects/cobot-rokae/uji-sensor.mp4",
          poster: "assets/img/projects/cobot-rokae/uji-sensor.jpg",
          caption: {
            id: "Uji input: benda uji diletakkan di depan sensor station, statusnya dipantau di teach pendant.",
            en: "Input test: a test object is placed in front of the station sensor while its status is watched on the teach pendant."
          }
        },
        {
          video: "assets/img/projects/cobot-rokae/uji-output.mp4",
          poster: "assets/img/projects/cobot-rokae/uji-output.jpg",
          caption: {
            id: "Uji output: sinyal DO dinyalakan dari teach pendant, lampu solenoid valve ikut menyala.",
            en: "Output test: DO signals are switched on from the teach pendant and the solenoid valve LEDs light up."
          }
        },
        {
          video: "assets/img/projects/cobot-rokae/uji-conveyor.mp4",
          poster: "assets/img/projects/cobot-rokae/uji-conveyor.jpg",
          caption: {
            id: "Uji roller conveyor di workshop.",
            en: "Roller conveyor test in the workshop."
          }
        },
        {
          video: "assets/img/projects/cobot-rokae/uji-di-lokasi.mp4",
          poster: "assets/img/projects/cobot-rokae/uji-di-lokasi.jpg",
          caption: {
            id: "Uji jalan setelah terpasang di lokasi: kardus berjalan di roller conveyor di samping cobot.",
            en: "Test run after installation on site: a carton travels along the roller conveyor beside the cobot."
          }
        }
      ]
    },
    {
      category: "electrical",
      title: { id: "Repair Conveyor", en: "Conveyor Repair" },
      role: { id: "Troubleshooting & Perbaikan", en: "Troubleshooting & Repair" },
      year: "",
      summary: {
        id: "Perbaikan conveyor belt di lini produksi klien sampai kembali berjalan normal, termasuk pengecekan panel kontrolnya (PLC Mitsubishi FX5U dan inverter).",
        en: "Repaired a belt conveyor on a client's production line and got it running normally again, including checks on its control panel (Mitsubishi FX5U PLC and inverter)."
      },
      tools: ["PLC Mitsubishi FX5U", "Inverter", "Troubleshooting"],
      image: "assets/img/projects/repair-conveyor/panel-plc.jpg",
      imageFocus: "50% 27%",
      imageCaption: {
        id: "Panel kontrol conveyor: PLC Mitsubishi FX5U-32M, inverter, relay, dan power supply.",
        en: "The conveyor's control panel: Mitsubishi FX5U-32M PLC, inverter, relays and power supply."
      },
      work: [
        { id: "Mengecek panel kontrol conveyor: PLC Mitsubishi FX5U, inverter, dan relay", en: "Checked the conveyor's control panel: Mitsubishi FX5U PLC, inverter and relays" },
        { id: "Memperbaiki conveyor sampai belt kembali berjalan", en: "Repaired the conveyor until the belt ran again" },
        { id: "Menguji jalan belt dengan benda uji setelah perbaikan", en: "Test-ran the belt with a test object after the repair" }
      ],
      gallery: [
        {
          video: "assets/img/projects/repair-conveyor/uji-belt.mp4",
          poster: "assets/img/projects/repair-conveyor/uji-belt.jpg",
          caption: {
            id: "Uji jalan belt: dicek dari sisi roller ujung, lalu dijalankan dengan benda uji di atasnya.",
            en: "Belt test run: checked at the end roller, then run with a test object on it."
          }
        },
        {
          video: "assets/img/projects/repair-conveyor/belt-jalan.mp4",
          poster: "assets/img/projects/repair-conveyor/belt-jalan.jpg",
          caption: {
            id: "Belt kembali berjalan di lini produksi.",
            en: "The belt running again on the production line."
          }
        }
      ]
    },
    {
      category: "electrical",
      title: { id: "Modifikasi Conveyor", en: "Conveyor Modification" },
      role: { id: "Elektrik", en: "Electrical" },
      year: "",
      summary: {
        id: "Modifikasi conveyor pallet di lini produksi klien: unitnya didesain 3D dulu, lalu dipasang dan diuji jalan di lokasi.",
        en: "Modified a pallet conveyor on a client's production line: the unit was designed in 3D first, then installed and test-run on site."
      },
      tools: ["SolidWorks", { id: "Desain Mekanik", en: "Mechanical Design" }, "Conveyor"],
      image: "assets/img/projects/modif-conveyor/desain-3d.jpg",
      imageFocus: "50% 40%",
      imageCaption: {
        id: "Desain 3D unit conveyor: rangka aluminium profile, motor dengan gearbox, sprocket, dan bearing.",
        en: "3D design of the conveyor unit: aluminium profile frame, geared motor, sprockets and bearings."
      },
      work: [
        { id: "Mendesain 3D unit conveyor: rangka aluminium profile, motor dengan gearbox, sprocket, dan bearing", en: "Designed the conveyor unit in 3D: aluminium profile frame, geared motor, sprockets and bearings" },
        { id: "Memasang hasil modifikasi di lini produksi", en: "Installed the modification on the production line" },
        { id: "Menguji jalan conveyor dengan pallet", en: "Test-ran the conveyor with pallets" }
      ],
      gallery: [
        {
          video: "assets/img/projects/modif-conveyor/conveyor-terpasang.mp4",
          poster: "assets/img/projects/modif-conveyor/conveyor-terpasang.jpg",
          caption: {
            id: "Conveyor pallet di lini produksi, dilihat dari ujung ke ujung.",
            en: "The pallet conveyor on the production line, seen from end to end."
          }
        },
        {
          video: "assets/img/projects/modif-conveyor/pallet-berjalan.mp4",
          poster: "assets/img/projects/modif-conveyor/pallet-berjalan.jpg",
          caption: {
            id: "Pallet berputar di ujung conveyor saat lini berjalan.",
            en: "Pallets turning over at the end of the conveyor while the line is running."
          }
        }
      ]
    },
    // Belum ada foto, jadi ditaruh di bawah supaya kartu besar (project paling atas) memakai foto asli.
    // Kalau fotonya sudah ada, boleh dipindah lagi ke urutan pertama.
    {
      category: "electrical",
      title: { id: "Sistem Kontrol Mesin Cutting / Measuring Plate", en: "Plate Cutting / Measuring Machine Control System" },
      role: { id: "PLC Programmer & Panel Builder", en: "PLC Programmer & Panel Builder" },
      year: "",
      summary: {
        id: "Sistem kontrol untuk mesin cutting / measuring plate untuk klien manufaktur.",
        en: "Control system for a plate cutting / measuring machine for a manufacturing client."
      },
      tools: ["PLC", { id: "Panel Kontrol", en: "Control Panel" }],
      image: "assets/img/project-electrical.svg",        // belum ada dokumentasi: taruh fotonya di assets/img/projects/cutting-plate/
      work: [
        { id: "Memilih komponen sistem kontrol", en: "Selected the control system components" },
        { id: "Merakit panel kontrol", en: "Assembled the control panel" },
        { id: "Membuat program PLC", en: "Wrote the PLC program" }
      ],
      gallery: []
    },
    {
      category: "mechanical",
      title: { id: "Safety Fence Mesin", en: "Machine Safety Fence" },
      role: { id: "Mekanik", en: "Mechanical" },
      year: "",
      summary: {
        id: "Pembuatan dan pemasangan safety fence di sekeliling mesin press dan jalur coil di pabrik klien.",
        en: "Built and installed safety fencing around a press machine and its coil line at a client's plant."
      },
      tools: ["Safety Fence"],
      image: "assets/img/projects/safety-fence-mesin/pagar-uncoiler.jpg",
      imageFocus: "50% 70%",
      imageCaption: {
        id: "Fence berpintu di area uncoiler: coil tetap terlihat dari balik kawat mesh.",
        en: "Gated fence at the uncoiler: the coil stays visible through the wire mesh."
      },
      work: [
        { id: "Membuat safety fence rangka besi dengan kawat mesh untuk area mesin press dan jalur coil", en: "Built steel-frame safety fencing with wire mesh for the press and coil line area" },
        { id: "Membuat pintu akses dengan grendel di titik yang perlu dibuka", en: "Made access doors with latches where entry is needed" },
        { id: "Memasang fence di lokasi dan mengangkurnya ke lantai", en: "Installed the fence on site and anchored it to the floor" }
      ],
      gallery: [
        {
          src: "assets/img/projects/safety-fence-mesin/pintu-belakang-press.jpg",
          caption: {
            id: "Pintu dua daun di sisi belakang mesin press. Rangkanya dibentuk mengikuti unit di bawahnya.",
            en: "Double doors at the rear of the press. The frame is shaped around the units beneath it."
          }
        },
        {
          src: "assets/img/projects/safety-fence-mesin/pagar-jalur-coil.jpg",
          caption: {
            id: "Fence berpintu di sekeliling unit jalur coil, di sebelah mesin press.",
            en: "Gated fencing around the coil line unit, next to the press."
          }
        },
        {
          src: "assets/img/projects/safety-fence-mesin/pagar-unit-pendingin.jpg",
          caption: {
            id: "Pagar pembatas di sekeliling kabinet dan unit pendingin.",
            en: "Guard rail around the cabinet and cooling unit."
          }
        },
        {
          src: "assets/img/projects/safety-fence-mesin/tampak-samping.jpg",
          caption: {
            id: "Tampak samping: fence di area uncoiler, dengan mesin press di belakangnya.",
            en: "Side view: the fence at the uncoiler area, with the press behind it."
          }
        }
      ]
    },
    {
      category: "mechanical",
      title: { id: "Safety Fence 6 Lane Produksi", en: "Safety Fence for 6 Production Lanes" },
      role: { id: "Mekanik", en: "Mechanical" },
      year: "",
      summary: {
        id: "Pembuatan safety fence untuk 6 lane produksi di pabrik klien.",
        en: "Built safety fencing for 6 production lanes at a client's plant."
      },
      tools: ["Safety Fence"],
      image: "assets/img/projects/safety-fence-6-lane/pagar-sudut.jpg",
      imageFocus: "bottom",
      imageCaption: {
        id: "Fence di salah satu lane: rangka kuning dengan kawat mesh hitam mengelilingi area mesin.",
        en: "Fencing on one of the lanes: yellow frame with black wire mesh around the machine area."
      },
      work: [
        { id: "Membuat safety fence untuk 6 lane produksi", en: "Built the safety fence for 6 production lanes" },
        { id: "Membuat pintu akses dengan grendel dan pegangan", en: "Made access doors with latches and handles" },
        { id: "Memasang fence di sekeliling mesin di tiap lane", en: "Installed the fencing around the machines in each lane" }
      ],
      gallery: [
        {
          src: "assets/img/projects/safety-fence-6-lane/pagar-slitter.jpg",
          focus: "50% 70%",
          caption: {
            id: "Fence di sepanjang mesin slitter.",
            en: "Fencing along the slitter machine."
          }
        },
        {
          src: "assets/img/projects/safety-fence-6-lane/pagar-jalur-jalan.jpg",
          focus: "50% 75%",
          caption: {
            id: "Fence dengan pintu di sisi jalur jalan.",
            en: "Fencing with a door along the walkway."
          }
        },
        {
          src: "assets/img/projects/safety-fence-6-lane/pagar-area-coil.jpg",
          focus: "bottom",
          caption: {
            id: "Fence mengelilingi area coil di salah satu lane.",
            en: "Fencing around the coil area of one lane."
          }
        },
        {
          video: "assets/img/projects/safety-fence-6-lane/keliling-1.mp4",
          poster: "assets/img/projects/safety-fence-6-lane/keliling-1.jpg",
          caption: {
            id: "Keliling fence yang sudah terpasang: pintu, grendel, dan pegangannya dicoba satu per satu.",
            en: "Walkaround of the installed fencing: doors, latches and handles are tried one by one."
          }
        },
        {
          video: "assets/img/projects/safety-fence-6-lane/keliling-2.mp4",
          poster: "assets/img/projects/safety-fence-6-lane/keliling-2.jpg",
          caption: {
            id: "Keliling di lane lain: fence dan pintu akses di sekitar mesin.",
            en: "Walkaround of another lane: fencing and access doors around the machines."
          }
        }
      ]
    }

    /* DISIMPAN SEMENTARA — project sekolah, belum ditampilkan lagi. Untuk memunculkannya,
       pindahkan blok di bawah ini ke dalam daftar di atas (jangan lupa koma antar project).
    {
      category: "electrical",
      title: { id: "MPS Sorting (Project Sekolah)", en: "MPS Sorting (School Project)" },
      role: { id: "Wiring, Pneumatik & PLC Programmer", en: "Wiring, Pneumatics & PLC Programmer" },
      year: "",
      summary: {
        id: "Project MPS Sorting di SMK YPPT Garut: wiring, pneumatik, dan program PLC Omron.",
        en: "MPS Sorting project at SMK YPPT Garut: wiring, pneumatics and Omron PLC programming."
      },
      tools: ["PLC Omron", { id: "Pneumatik", en: "Pneumatics" }, "Wiring"],
      image: "assets/img/project-electrical.svg",
      work: [
        { id: "Wiring", en: "Wiring" },
        { id: "Sistem pneumatik", en: "Pneumatic system" },
        { id: "Program PLC Omron", en: "Omron PLC program" }
      ],
      gallery: []
    }
    */
  ],

  /* ---------- PENGALAMAN & PENDIDIKAN ----------
     type: "work" | "education"   (urutkan dari yang terbaru)          */
  experience: [
    {
      type: "work",
      title: { id: "Mechanical & Electrical Engineer", en: "Mechanical & Electrical Engineer" },
      org: "PT Shimatek Shoji Indonesia",
      period: { id: "Sep 2025 — Sekarang", en: "Sep 2025 — Present" },
      points: [
        {
          id: "Membuat sistem kontrol mesin torque check yang sebelumnya manual menjadi otomatis (pilih komponen, rakit panel, program PLC)",
          en: "Built the control system that converted a manual torque check machine to automatic (component selection, panel assembly, PLC programming)"
        },
        {
          id: "Membuat sistem kontrol mesin baritori camshaft (pilih komponen, rakit panel, program PLC)",
          en: "Built the control system for a camshaft deburring (baritori) machine (component selection, panel assembly, PLC programming)"
        },
        {
          id: "Membuat sistem kontrol mesin cutting / measuring plate (pilih komponen, rakit panel, program PLC)",
          en: "Built the control system for a plate cutting / measuring machine (component selection, panel assembly, PLC programming)"
        },
        {
          id: "Membuat cover otomatis di rak part yang terhubung ke sensor mesin existing: cover hanya terbuka sesuai tipe engine yang terbaca (A atau B), supaya operator tidak salah ambil part",
          en: "Built an automatic parts rack cover linked to the existing machine sensor: it only opens for the engine type that is read (A or B), so operators can't pick the wrong part"
        },
        {
          id: "Modifikasi program dan wiring mesin customer menggunakan PLC Mitsubishi (GX Works)",
          en: "Modified customer machine programs and wiring using Mitsubishi PLCs (GX Works)"
        },
        {
          id: "Setup dan troubleshooting cobot Rokae xMate CR12",
          en: "Set up and troubleshot the Rokae xMate CR12 cobot"
        },
        { id: "Membuat shutter", en: "Built a shutter" },
        {
          id: "Membuat safety fence untuk 6 lane produksi",
          en: "Built safety fencing for 6 production lanes"
        }
      ]
    },
    {
      type: "work",
      title: { id: "Operator Produksi — Spot Welding (Vokasi)", en: "Production Operator — Spot Welding (Vocational Program)" },
      org: "PT Toyota Motor Manufacturing Indonesia (TMMIN)",
      period: "Jan 2025 — Jul 2025",
      points: [
        {
          id: "Mengoperasikan mesin spot welding di lini produksi sesuai SOP, target output, dan standar kualitas",
          en: "Operated spot welding machines on the production line according to SOPs, output targets and quality standards"
        },
        { id: "Menerapkan 5S dan K3 di area kerja", en: "Applied 5S and workplace safety (K3) in the work area" }
      ]
    },
    {
      type: "work",
      title: { id: "Mekanik (Praktik Kerja Lapangan)", en: "Mechanic (Industrial Internship)" },
      org: "PT Bahari Prima Manunggal",
      period: "Sep 2022 — Sep 2023",
      points: [
        {
          id: "Troubleshooting mesin bandsaw K800FT serta mengganti komponen yang rusak",
          en: "Troubleshot the K800FT bandsaw machine and replaced damaged components"
        },
        {
          id: "Merakit dan memasang panel control box baru untuk mesin fillet ikan Baader 600 dan mesin pendingin Bitzer",
          en: "Assembled and installed new control box panels for the Baader 600 fish fillet machine and the Bitzer refrigeration unit"
        }
      ]
    },
    {
      type: "education",
      title: { id: "Teknik Mekatronika", en: "Mechatronics Engineering" },
      org: "SMK YPPT Garut",
      period: "2020 — 2024",
      points: [
        {
          id: "Project sekolah — MPS Sorting: wiring, pneumatik, dan program PLC Omron",
          en: "School project — MPS Sorting: wiring, pneumatics and Omron PLC programming"
        }
      ]
    }
  ],

  /* ---------- SERTIFIKASI (kosongkan [] untuk menyembunyikan section) ---------- */
  certifications: [
    { name: { id: "Welding Spot", en: "Welding Spot" }, issuer: "BNSP", year: "2026", url: "" },
  ]
};
