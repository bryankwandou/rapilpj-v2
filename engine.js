/* RapiLPJ v2: Deterministic Accountability Report (LPJ) Rule Engine
 * 100% Client-Side, Zero AI, Pure Deterministic Verification.
 * Complies with Indonesian Faculty LPJ Guidelines and Law No. 10 of 2020 on Stamp Duty.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LPJ = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const RULES = {
    stamp: {
      text: 'Nota asli belanja barang harus bercap atau berstempel basah toko.',
      textEn: 'Original expense receipts must have an official store stamp/seal.',
      src: 'fibub'
    },
    totalsMatch: {
      text: 'Nominal di lembar pengesahan, tabel realisasi, dan total jumlahan nota harus identik.',
      textEn: 'Approval sheet total, expense table sum, and receipt total must match exactly.',
      src: 'fibub'
    },
    attendance: {
      text: 'Jumlah lembar daftar hadir bermeterai/bertanda tangan harus memenuhi jumlah sesi konsumsi.',
      textEn: 'Attendance sheets must match or exceed the number of meal sessions.',
      src: 'fibub'
    },
    materai: {
      text: 'Setiap kuitansi/nota bernilai Rp5.000.000 atau lebih wajib dibubuhi meterai Rp10.000.',
      textEn: 'Receipts of Rp5,000,000 or more require an official Rp10,000 revenue stamp (meterai).',
      src: 'ugmfeb'
    },
    thermal: {
      text: 'Struk berbahan kertas termal (minimarket/SPBU) wajib segera difotokopi atau dipindai digital.',
      textEn: 'Thermal fading receipts must be photocopied or digitally scanned to avoid fading.',
      src: 'ugmfeb'
    },
    deadline10: {
      text: 'Laporan pertanggungjawaban diserahkan maksimal 10 hari kalender setelah kegiatan.',
      textEn: 'Report must be submitted within a maximum of 10 calendar days after the event.',
      src: 'itshima'
    },
    perNote: {
      text: 'Setiap nota dicatat dalam satu baris tersendiri (dilarang menggabung beberapa nota dalam satu baris).',
      textEn: 'Each receipt must be listed in a separate line item (no batch-bundling multiple receipts).',
      src: 'itsbio'
    },
    pph: {
      text: 'Nominal pada kuitansi/honorarium harus mencantumkan potongan atau perhitungan PPh yang sah.',
      textEn: 'Receipt amounts must state legitimate tax (PPh) inclusion or deduction.',
      src: 'itsbio'
    },
    deadline7work: {
      text: 'LPJ diserahkan maksimal 7 hari kerja setelah kegiatan. Keterlambatan berakibat penundaan pencairan ormawa berikutnya.',
      textEn: 'Report must be submitted within 7 working days. Late submission results in project funding holds.',
      src: 'filkom'
    },
    filkomDocs: {
      text: 'LPJ wajib melampirkan laporan pelaksanaan, keuangan rinci, dokumentasi foto, dan surat tugas/SK.',
      textEn: 'Report must attach implementation narrative, detailed accounts, photos, and assignment decree.',
      src: 'filkom'
    },
    serviceTax: {
      text: 'Pengeluaran jasa/narasumber/sewa wajib melampirkan identitas penerima (KTP/NPWP) dan bukti potong PPh.',
      textEn: 'Service, speaker, or rental expenses require recipient ID (KTP/NPWP) and PPh deduction proof.',
      src: 'filkom'
    },
    duplicateInvoice: {
      text: 'Ditemukan nomor nota / invoice yang terduplikasi pada daftar pengeluaran.',
      textEn: 'Duplicate receipt / invoice reference number detected across expense rows.',
      src: 'national'
    },
    dateSanity: {
      text: 'Tanggal nota berada di luar rentang wajar (melewati tanggal penyerahan atau sebelum masa persiapan).',
      textEn: 'Receipt date is out of allowable timeline bounds (after submission date or pre-preparation window).',
      src: 'national'
    },
    budgetVariance: {
      text: 'Realisasi anggaran pada suatu pos melebihi anggaran rencana di atas ambang toleransi tanpa addendum.',
      textEn: 'Realized expenditure on a line item exceeds planned budget by more than the allowed tolerance threshold.',
      src: 'national'
    },
    unplannedPost: {
      text: 'Terdapat nota pengeluaran dengan pos belanja yang tidak terdaftar di Rencana Anggaran Biaya (RAB).',
      textEn: 'Receipt recorded under an expense category not listed in the approved budget plan.',
      src: 'national'
    }
  };

  const SOURCES = {
    fibub: {
      name: 'Pedoman LPJ FIB Universitas Brawijaya',
      url: 'https://fib.ub.ac.id/wp-content/uploads/2024/03/PEDOMAN-LAPORAN-PERTANGGUNG-JAWABAN.pdf'
    },
    ugmfeb: {
      name: 'Prosedur Proposal dan LPJ ke SIPRO, FEB UGM & UU Bea Meterai No. 10/2020',
      url: 'https://bpm.feb.ugm.ac.id/wp-content/uploads/sites/1535/2021/09/DONE-Prosedur-Pengajuan-Proposal-dan-LPJ-ke-SIPRO.pdf'
    },
    itshima: {
      name: 'SOP HIMA, Departemen Desain Interior ITS',
      url: 'https://www.its.ac.id/interior/wp-content/uploads/sites/37/2018/10/SOP-HIMA.pdf'
    },
    filkom: {
      name: 'Surat Edaran Mekanisme Proposal dan LPJ Ormawa, FILKOM UB (2026)',
      url: 'https://filkom.ub.ac.id/wp-content/uploads/2026/04/SK-F15-01678-SURAT-EDARAN-MEKANISME-PENGAJUAN-PROPOSAL-DAN-LAPORAN-PERTANGGUNGJAWABAN-LPJ-KEGIATAN-ORGANISASI-MAHASISWA-FAKULTAS-ILMU-KOMPUTER-UNIVERSITAS-BRAWIJAYA.pdf'
    },
    itsbio: {
      name: 'SOP LPJ Kegiatan Mahasiswa, Biologi ITS',
      url: 'https://its.ac.id/biologi/wp-content/uploads/sites/21/2024/09/SOP-Laporan-Pertanggung-Jawaban-Kegiatan-Mahasiswa-Biologi.pdf'
    },
    national: {
      name: 'Standar Akuntabilitas Keuangan Ormawa & UU No. 10 Tahun 2020',
      url: 'https://peraturan.bpk.go.id/Details/149827/uu-no-10-tahun-2020'
    },
    uajm: {
      name: 'BKAM Universitas Atma Jaya Makassar & Jurnal Tematika UAJM',
      url: 'https://doi.org/10.56963/tematika.v9i1.119'
    }
  };

  const PRESETS = {
    uajm: ['totalsMatch', 'stamp', 'attendance', 'materai', 'thermal', 'filkomDocs', 'duplicateInvoice', 'dateSanity', 'budgetVariance'],
    fibub: ['stamp', 'totalsMatch', 'attendance', 'duplicateInvoice', 'dateSanity'],
    ugmfeb: ['materai', 'thermal', 'duplicateInvoice', 'dateSanity'],
    itshima: ['deadline10', 'duplicateInvoice', 'dateSanity'],
    itsbio: ['perNote', 'pph', 'stamp', 'duplicateInvoice', 'dateSanity'],
    filkom: ['deadline7work', 'filkomDocs', 'serviceTax', 'duplicateInvoice', 'budgetVariance', 'dateSanity'],
    standard: ['totalsMatch', 'materai', 'thermal', 'stamp', 'perNote', 'duplicateInvoice', 'dateSanity', 'budgetVariance', 'unplannedPost'],
    all: Object.keys(RULES)
  };

  function daysBetween(a, b) {
    if (!a || !b) return 0;
    return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
  }

  /* Business days (Monday to Friday) */
  function workDays(startDate, endDate) {
    if (!startDate || !endDate) return 0;
    let count = 0;
    const cur = new Date(startDate + 'T00:00:00Z');
    const end = new Date(endDate + 'T00:00:00Z');
    while (cur < end) {
      cur.setUTCDate(cur.getUTCDate() + 1);
      const day = cur.getUTCDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
    }
    return count;
  }

  function fmt(n) {
    return Math.round(+n || 0).toLocaleString('id-ID');
  }

  /* Check function: audits data deterministically against selected preset */
  function check(lpj, preset) {
    const customList = Array.isArray(lpj && lpj.customRules)
      ? lpj.customRules.filter((k) => RULES[k])
      : null;
    const activePreset = preset === 'custom' && customList
      ? customList
      : (PRESETS[preset] || PRESETS.all);
    const on = new Set(activePreset);

    const issues = [];
    const add = (rule, msg, row, severity = 'error') => {
      issues.push({
        rule,
        msg,
        row,
        severity,
        source: SOURCES[RULES[rule] ? RULES[rule].src : 'national']
      });
    };

    const notes = Array.isArray(lpj.notes) ? lpj.notes : [];
    const budgetList = Array.isArray(lpj.budget) ? lpj.budget : [];
    const budgetMap = new Map();
    budgetList.forEach((b) => {
      if (b.item) budgetMap.set(b.item.trim().toLowerCase(), +b.planned || 0);
    });

    const spent = notes.reduce((s, n) => s + (+n.amount || 0), 0);
    const seenInvoices = new Map();

    notes.forEach((n, i) => {
      const idxLabel = 'Nota #' + (n.no || i + 1) + (n.item ? ' (' + n.item + ')' : '');
      const amt = +n.amount || 0;

      // Duplicate invoice / reference check
      if (on.has('duplicateInvoice') && n.refNo && n.refNo.trim()) {
        const ref = n.refNo.trim().toUpperCase();
        if (seenInvoices.has(ref)) {
          add(
            'duplicateInvoice',
            `${idxLabel}: Nomor referensi "${ref}" kembar dengan Nota #${seenInvoices.get(ref) + 1}.`,
            i
          );
        } else {
          seenInvoices.set(ref, i);
        }
      }

      // Physical stamp check
      if (on.has('stamp') && !n.stamp) {
        add('stamp', `${idxLabel} belum memiliki cap atau stempel basah toko.`, i);
      }

      // Revenue stamp (meterai) check for amounts >= Rp5,000,000
      if (on.has('materai') && amt >= 5000000 && !n.materai) {
        add('materai', `${idxLabel} bernilai Rp${fmt(amt)} (>= Rp5.000.000) tetapi belum dibubuhi meterai Rp10.000.`, i);
      }

      // Thermal fading receipt check
      if (on.has('thermal') && n.thermal && !n.scanned) {
        add('thermal', `${idxLabel} berbahan struk termal mudah pudar dan belum dipindai/difotokopi.`, i);
      }

      // Single receipt entry
      if (on.has('perNote') && n.combined) {
        add('perNote', `${idxLabel} menggabungkan beberapa nota belanja dalam satu baris pembukuan.`, i);
      }

      // Tax inclusion
      if (on.has('pph') && n.pphIncluded === false) {
        add('pph', `${idxLabel} belum memuat perhitungan atau bukti potong PPh.`, i);
      }

      // Service / honorarium compliance
      if (on.has('serviceTax') && n.service) {
        if (n.pphIncluded === false || !n.recipientId) {
          add(
            'serviceTax',
            `${idxLabel} merupakan pengeluaran jasa/honorarium tetapi ${
              n.pphIncluded === false ? 'belum memperhitungkan PPh' : 'belum melampirkan identitas penerima (KTP/NPWP)'
            }.`,
            i
          );
        }
      }

      // Unplanned post check
      if (on.has('unplannedPost') && n.item && n.item.trim()) {
        const itemKey = n.item.trim().toLowerCase();
        if (budgetMap.size > 0 && !budgetMap.has(itemKey)) {
          add('unplannedPost', `${idxLabel}: Pos "${n.item}" tidak ditemukan dalam Rencana Anggaran Biaya (RAB).`, i, 'warning');
        }
      }

      // Date sanity check
      if (on.has('dateSanity') && n.date) {
        if (lpj.submitDate && n.date > lpj.submitDate) {
          add('dateSanity', `${idxLabel}: Tanggal nota (${n.date}) mendahului tanggal pengumpulan laporan (${lpj.submitDate}).`, i);
        }
        if (lpj.eventDate) {
          const dBefore = daysBetween(n.date, lpj.eventDate);
          if (dBefore > 30) {
            add('dateSanity', `${idxLabel}: Tanggal nota (${n.date}) berjarak ${dBefore} hari sebelum kegiatan (melewati batas persiapan 30 hari).`, i, 'warning');
          }
        }
      }
    });

    // Totals reconciliation
    if (on.has('totalsMatch') && lpj.approvedTotal != null) {
      const diff = Math.abs(+lpj.approvedTotal - spent);
      if (diff > 0) {
        add(
          'totalsMatch',
          `Nominal lembar pengesahan (Rp${fmt(lpj.approvedTotal)}) berbeda dengan total realisasi nota (Rp${fmt(spent)}). Selisih: Rp${fmt(diff)}.`
        );
      }
    }

    // Meal sessions vs attendance sheets
    if (on.has('attendance') && lpj.consumptionSessions > 0) {
      const sheets = +lpj.attendanceSheets || 0;
      if (sheets < lpj.consumptionSessions) {
        add(
          'attendance',
          `Terdapat ${lpj.consumptionSessions} sesi konsumsi, namun baru dilampirkan ${sheets} lembar daftar hadir (kurang ${lpj.consumptionSessions - sheets} lembar).`
        );
      }
    }

    // Deadlines
    const calDays = daysBetween(lpj.eventDate, lpj.submitDate);
    if (on.has('deadline10') && lpj.eventDate && lpj.submitDate) {
      if (calDays > 10) {
        add('deadline10', `Diserahkan ${calDays} hari kalender setelah kegiatan (melebihi batas toleransi 10 hari).`);
      }
    }

    const bDays = workDays(lpj.eventDate, lpj.submitDate);
    if (on.has('deadline7work') && lpj.eventDate && lpj.submitDate) {
      if (bDays > 7) {
        add('deadline7work', `Diserahkan ${bDays} hari kerja setelah kegiatan (melebihi batas toleransi 7 hari kerja).`);
      }
    }

    // Required documentation checklist
    if (on.has('filkomDocs')) {
      const docs = lpj.docs || {};
      const missing = [
        ['report', 'Laporan pelaksanaan kegiatan'],
        ['finance', 'Laporan pertanggungjawaban keuangan rinci'],
        ['photos', 'Dokumentasi foto kegiatan'],
        ['assignment', 'Surat tugas kepanitiaan atau SK ormawa']
      ]
        .filter(([key]) => !docs[key])
        .map(([, label]) => label);

      if (missing.length > 0) {
        add('filkomDocs', `Berkas administrasi belum lengkap: ${missing.join(', ')}.`);
      }
    }

    // Budget variance calculations
    const varianceTolerance = +(lpj.varianceTolerancePercent ?? 10) / 100;
    const budgetComparison = budgetList.map((b) => {
      const itemName = (b.item || '').trim();
      const itemKey = itemName.toLowerCase();
      const real = notes
        .filter((n) => (n.item || '').trim().toLowerCase() === itemKey)
        .reduce((sum, n) => sum + (+n.amount || 0), 0);
      const planned = +b.planned || 0;
      const diff = real - planned;
      const pctOver = planned > 0 ? (real - planned) / planned : (real > 0 ? 1 : 0);

      if (on.has('budgetVariance') && planned > 0 && pctOver > varianceTolerance) {
        add(
          'budgetVariance',
          `Pos "${itemName}" overbudget ${Math.round(pctOver * 100)}% (Rencana Rp${fmt(planned)}, Realisasi Rp${fmt(real)}), melebihi ambang toleransi pergeseran ${Math.round(varianceTolerance * 100)}%.`
        );
      }

      return {
        item: itemName,
        planned,
        real,
        diff,
        pctOver: Math.round(pctOver * 100)
      };
    });

    const plannedTotal = budgetComparison.reduce((s, b) => s + b.planned, 0);

    return {
      issues,
      spent,
      planned: plannedTotal,
      budget: budgetComparison,
      calendarDays: calDays,
      businessDays: bDays,
      rules: [...on].map((k) => ({
        key: k,
        ...RULES[k],
        source: SOURCES[RULES[k].src]
      }))
    };
  }

  function csv(res) {
    const rows = [
      ['Pos Anggaran', 'Rencana (Rp)', 'Realisasi (Rp)', 'Selisih (Rp)', 'Persentase Varian (%)']
    ].concat(
      res.budget.map((b) => [b.item, b.planned, b.real, b.diff, b.pctOver + '%']),
      [['Total', res.planned, res.spent, res.spent - res.planned, '']]
    );
    return (
      '\uFEFF' +
      rows
        .map((r) =>
          r
            .map((v) => (/[",;\n]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : v))
            .join(',')
        )
        .join('\r\n')
    );
  }

  /* Portable pure JavaScript SHA-256 implementation */
  function sha256(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    let i, j;
    let result = '';
    const words = [];
    const asciiBitLength = (ascii || '').length * 8;
    const hash = [];
    const k = [];
    let primeCounter = 0;
    const isComposite = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        if (primeCounter < 8) hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    ascii += '\x80';
    while (ascii.length % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii.length; i++) {
      j = ascii.charCodeAt(i);
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words.length] = (asciiBitLength / maxWord) | 0;
    words[words.length] = asciiBitLength | 0;
    for (j = 0; j < words.length; ) {
      const w = words.slice(j, (j += 16));
      const oldHash = hash.slice(0);
      for (i = 0; i < 64; i++) {
        const w15 = w[i - 15],
          w2 = w[i - 2];
        const a = hash[0],
          e = hash[4];
        const temp1 =
          hash[7] +
          (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
          ((e & hash[5]) ^ (~e & hash[6])) +
          k[i] +
          (w[i] =
            i < 16
              ? w[i] | 0
              : (w[i - 16] +
                  (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                  w[i - 7] +
                  (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
                0);
        const temp2 =
          (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
          ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash[7] = hash[6];
        hash[6] = hash[5];
        hash[5] = hash[4];
        hash[4] = (hash[3] + temp1) | 0;
        hash[3] = hash[2];
        hash[2] = hash[1];
        hash[1] = hash[0];
        hash[0] = (temp1 + temp2) | 0;
      }
      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }
    for (i = 0; i < 8; i++) {
      for (j = 3; j >= 0; j--) {
        const b = (hash[i] >> (j * 8)) & 255;
        result += (b < 16 ? '0' : '') + b.toString(16);
      }
    }
    return result;
  }

  /* Cryptographic Attestation Hash of audited records */
  function computeAttestationHash(lpj, res) {
    const canonicalPayload = [
      lpj.eventDate || '',
      lpj.submitDate || '',
      lpj.approvedTotal || 0,
      res.planned || 0,
      res.spent || 0,
      res.issues.length,
      (lpj.notes || [])
        .map((n) => [n.refNo || '', n.date || '', n.item || '', n.amount || 0].join(':'))
        .sort()
        .join('|')
    ].join('##');
    return sha256(canonicalPayload);
  }

  /* Autonomous Governance Co-Pilot: Generates official addendum draft for variances */
  function generateAddendumDraft(lpj, res, facultyName = 'Biro Kemahasiswaan (BKAM)') {
    const overBudgetItems = res.budget.filter(
      (b) => b.pctOver > (lpj.varianceTolerancePercent || 10)
    );
    const dateStr = lpj.submitDate || new Date().toISOString().split('T')[0];

    let itemsTable = overBudgetItems
      .map(
        (b, idx) =>
          `${idx + 1}. Pos: ${b.item} | Rencana: Rp${fmt(b.planned)} | Realisasi: Rp${fmt(
            b.real
          )} | Selisih: +Rp${fmt(b.diff)} (+${b.pctOver}%)`
      )
      .join('\n');

    if (!itemsTable) {
      itemsTable = 'Tidak ada pos anggaran yang melampaui batas toleransi varians.';
    }

    return `SURAT PERMOHONAN ADDENDUM PERGESERAN ANGGARAN KEGIATAN
Nomor: 042/PAN-PEL/ADDENDUM/${dateStr.replace(/-/g, '')}
Lampiran: 1 (satu) berkas rekapitulasi audit RapiLPJ
Perihal: Permohonan Persetujuan Pergeseran Anggaran Biaya Realisasi Kegiatan

Kepada Yth.
Kepala ${facultyName}
di Tempat

Dengan hormat,
Sehubungan dengan telah terlaksananya kegiatan kemahasiswaan pada tanggal ${lpj.eventDate || '-'}, bersama surat ini kami panitia pelaksana menyampaikan permohonan persetujuan atas pergeseran/realisasi anggaran belanja yang melampaui batas toleransi rencana awal sebagai berikut:

${itemsTable}

Alasan Pergeseran:
Kebutuhan mendesak di lapangan saat pelaksanaan kegiatan demi kelancaran operasional dan keselamatan peserta, dengan tetap menjaga keseimbangan total pagu dana yang telah disahkan.

Demikian surat permohonan addendum ini kami ajukan sebagai kelengkapan administratif Laporan Pertanggungjawaban (LPJ). Atas perhatian dan persetujuan Bapak/Ibu, kami ucapkan terima kasih.

Makassar, ${dateStr}
Hormat kami,

Ketua Panitia Pelaksana                     Bendahara Kegiatan


(__________________________)                (__________________________)
NIM:                                        NIM:

Mengetahui,
Dosen Pembina / Pendamping Kemahasiswaan


(__________________________)
NIDN:`;
  }

  /* Sample multimodal perception datasets representing realistic Indonesian student receipts */
  const SAMPLE_GEMINI_RECEIPTS = [
    {
      refNo: 'SPBU-74921',
      date: '2026-10-01',
      merchant: 'SPBU Pertamina 74.902.11',
      item: 'Transportasi & Bahan Bakar',
      amount: 250000,
      stamp: true,
      thermal: true,
      scanned: true,
      materai: false,
      combined: false,
      pphIncluded: true,
      service: false,
      confidence: 0.98,
      sampleFile: 'sample_01_struk_termal_spbu.png',
      notesVision: 'Struk termal terdeteksi, teks tajam, nomor pompa dan liter terverifikasi.'
    },
    {
      refNo: 'KTR-8812',
      date: '2026-10-02',
      merchant: 'CV Berkah Rasa Catering',
      item: 'Konsumsi',
      amount: 5250000,
      stamp: true,
      thermal: false,
      scanned: true,
      materai: true,
      combined: false,
      pphIncluded: true,
      service: false,
      confidence: 0.96,
      sampleFile: 'sample_02_kuitansi_katering_meterai.png',
      notesVision: 'Faktur katering resmi, stempel basah ungu, meterai Rp10.000 terverifikasi pada nominal >= 5jt.'
    },
    {
      refNo: 'ATK-0924',
      date: '2026-10-02',
      merchant: 'Toko Buku & Percetakan Sentosa',
      item: 'Banner & Publikasi',
      amount: 600000,
      stamp: true,
      thermal: false,
      scanned: true,
      materai: false,
      combined: false,
      pphIncluded: true,
      service: false,
      confidence: 0.94,
      sampleFile: 'sample_03_nota_atk_stempel.png',
      notesVision: 'Nota kontan kertas NCR rangkap, cap basah lunas toko terdeteksi di pojok kanan bawah.'
    }
  ];

  function exportDraft(data) {
    return JSON.stringify({
      app: 'RapiLPJ',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      payload: data
    }, null, 2);
  }

  function parseDraft(raw) {
    if (!raw) throw new Error('Berkas draf kosong');
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (parsed.app && parsed.app !== 'RapiLPJ' && !parsed.budget && !parsed.notes) {
      throw new Error('Format berkas draf tidak dikenali (bukan draf RapiLPJ)');
    }
    return parsed.payload || parsed;
  }

  return {
    RULES,
    SOURCES,
    PRESETS,
    check,
    csv,
    fmt,
    workDays,
    daysBetween,
    sha256,
    computeAttestationHash,
    generateAddendumDraft,
    SAMPLE_GEMINI_RECEIPTS,
    exportDraft,
    parseDraft
  };
});

