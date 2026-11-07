/* RapiLPJ v2: Neuro-Symbolic Accountability Report (LPJ) Rule Engine
 * 1. Deterministic Audit Kernel: 100% Client-Side, Zero Arithmetic Hallucination.
 * 2. Governance Co-Pilot Layer: Offline Deterministic Statutory Template + Optional Live Gemini 2.0 Flash API (BYOK).
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
    const add = (rule, msg, msgEn, row, severity = 'error') => {
      issues.push({
        rule,
        msg,
        msgEn: msgEn || msg,
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
      const idxLabelEn = 'Receipt #' + (n.no || i + 1) + (n.item ? ' (' + n.item + ')' : '');
      const amt = +n.amount || 0;

      // Duplicate invoice / reference check
      if (on.has('duplicateInvoice') && n.refNo && n.refNo.trim()) {
        const ref = n.refNo.trim().toUpperCase();
        if (seenInvoices.has(ref)) {
          add(
            'duplicateInvoice',
            `${idxLabel}: Nomor referensi "${ref}" kembar dengan Nota #${seenInvoices.get(ref) + 1}.`,
            `${idxLabelEn}: Reference number "${ref}" is a duplicate of Receipt #${seenInvoices.get(ref) + 1}.`,
            i
          );
        } else {
          seenInvoices.set(ref, i);
        }
      }

      // Physical stamp check
      if (on.has('stamp') && !n.stamp) {
        add(
          'stamp',
          `${idxLabel} belum memiliki cap atau stempel basah toko.`,
          `${idxLabelEn} is missing an official wet store stamp/seal.`,
          i
        );
      }

      // Revenue stamp (meterai) check for amounts >= Rp5,000,000
      if (on.has('materai') && amt >= 5000000 && !n.materai) {
        add(
          'materai',
          `${idxLabel} bernilai Rp${fmt(amt)} (>= Rp5.000.000) tetapi belum dibubuhi meterai Rp10.000.`,
          `${idxLabelEn} amounts to Rp${fmt(amt)} (>= Rp5,000,000) but lacks an official Rp10,000 revenue stamp (meterai).`,
          i
        );
      }

      // Thermal fading receipt check
      if (on.has('thermal') && n.thermal && !n.scanned) {
        add(
          'thermal',
          `${idxLabel} berbahan struk termal mudah pudar dan belum dipindai/difotokopi.`,
          `${idxLabelEn} is printed on fading thermal paper and has not been digitally scanned or photocopied.`,
          i
        );
      }

      // Single receipt entry
      if (on.has('perNote') && n.combined) {
        add(
          'perNote',
          `${idxLabel} menggabungkan beberapa nota belanja dalam satu baris pembukuan.`,
          `${idxLabelEn} bundles multiple physical receipts into a single ledger row.`,
          i
        );
      }

      // Tax inclusion
      if (on.has('pph') && n.pphIncluded === false) {
        add(
          'pph',
          `${idxLabel} belum memuat perhitungan atau bukti potong PPh.`,
          `${idxLabelEn} is missing income tax (PPh) calculation or withholding proof.`,
          i
        );
      }

      // Service / honorarium compliance
      if (on.has('serviceTax') && n.service) {
        if (n.pphIncluded === false || !n.recipientId) {
          add(
            'serviceTax',
            `${idxLabel} merupakan pengeluaran jasa/honorarium tetapi ${n.pphIncluded === false ? 'belum memperhitungkan PPh' : 'belum melampirkan identitas penerima (KTP/NPWP)'
            }.`,
            `${idxLabelEn} is a service/honorarium expense but ${n.pphIncluded === false ? 'lacks PPh tax withholding' : 'is missing recipient ID (KTP/NPWP)'
            }.`,
            i
          );
        }
      }

      // Unplanned post check
      if (on.has('unplannedPost') && n.item && n.item.trim()) {
        const itemKey = n.item.trim().toLowerCase();
        if (budgetMap.size > 0 && !budgetMap.has(itemKey)) {
          add(
            'unplannedPost',
            `${idxLabel}: Pos "${n.item}" tidak ditemukan dalam Rencana Anggaran Biaya (RAB).`,
            `${idxLabelEn}: Expense category "${n.item}" is not listed in the approved Budget Plan (RAB).`,
            i,
            'warning'
          );
        }
      }

      // Date sanity check
      if (on.has('dateSanity') && n.date) {
        if (lpj.submitDate && n.date > lpj.submitDate) {
          add(
            'dateSanity',
            `${idxLabel}: Tanggal nota (${n.date}) mendahului tanggal pengumpulan laporan (${lpj.submitDate}).`,
            `${idxLabelEn}: Receipt date (${n.date}) is later than the report submission date (${lpj.submitDate}).`,
            i
          );
        }
        if (lpj.eventDate) {
          const dBefore = daysBetween(n.date, lpj.eventDate);
          if (dBefore > 30) {
            add(
              'dateSanity',
              `${idxLabel}: Tanggal nota (${n.date}) berjarak ${dBefore} hari sebelum kegiatan (melewati batas persiapan 30 hari).`,
              `${idxLabelEn}: Receipt date (${n.date}) is ${dBefore} days prior to the event (exceeds 30-day preparation window).`,
              i,
              'warning'
            );
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
          `Nominal lembar pengesahan (Rp${fmt(lpj.approvedTotal)}) berbeda dengan total realisasi nota (Rp${fmt(spent)}). Selisih: Rp${fmt(diff)}.`,
          `Endorsement sheet total (Rp${fmt(lpj.approvedTotal)}) does not match realized receipt total (Rp${fmt(spent)}). Variance: Rp${fmt(diff)}.`
        );
      }
    }

    // Meal sessions vs attendance sheets
    if (on.has('attendance') && lpj.consumptionSessions > 0) {
      const sheets = +lpj.attendanceSheets || 0;
      if (sheets < lpj.consumptionSessions) {
        add(
          'attendance',
          `Terdapat ${lpj.consumptionSessions} sesi konsumsi, namun baru dilampirkan ${sheets} lembar daftar hadir (kurang ${lpj.consumptionSessions - sheets} lembar).`,
          `There are ${lpj.consumptionSessions} meal sessions, but only ${sheets} attendance sheet(s) are attached (missing ${lpj.consumptionSessions - sheets} sheet(s)).`
        );
      }
    }

    // Deadlines
    const calDays = daysBetween(lpj.eventDate, lpj.submitDate);
    if (on.has('deadline10') && lpj.eventDate && lpj.submitDate) {
      if (calDays > 10) {
        add(
          'deadline10',
          `Diserahkan ${calDays} hari kalender setelah kegiatan (melebihi batas toleransi 10 hari).`,
          `Submitted ${calDays} calendar days after the event (exceeds the 10-calendar-day limit).`
        );
      }
    }

    const bDays = workDays(lpj.eventDate, lpj.submitDate);
    if (on.has('deadline7work') && lpj.eventDate && lpj.submitDate) {
      if (bDays > 7) {
        add(
          'deadline7work',
          `Diserahkan ${bDays} hari kerja setelah kegiatan (melebihi batas toleransi 7 hari kerja).`,
          `Submitted ${bDays} working days after the event (exceeds the 7-working-day limit).`
        );
      }
    }

    // Required documentation checklist
    if (on.has('filkomDocs')) {
      const docs = lpj.docs || {};
      const missingPairs = [
        ['report', 'Laporan pelaksanaan kegiatan', 'Activity implementation narrative'],
        ['finance', 'Laporan pertanggungjawaban keuangan rinci', 'Detailed financial accountability statement'],
        ['photos', 'Dokumentasi foto kegiatan', 'Activity photo documentation'],
        ['assignment', 'Surat tugas kepanitiaan atau SK ormawa', 'Committee assignment decree (SK)']
      ].filter(([key]) => !docs[key]);

      if (missingPairs.length > 0) {
        const missingId = missingPairs.map(([, idLbl]) => idLbl).join(', ');
        const missingEn = missingPairs.map(([, , enLbl]) => enLbl).join(', ');
        add(
          'filkomDocs',
          `Berkas administrasi belum lengkap: ${missingId}.`,
          `Mandatory supporting documents incomplete: ${missingEn}.`
        );
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
          `Pos "${itemName}" overbudget ${Math.round(pctOver * 100)}% (Rencana Rp${fmt(planned)}, Realisasi Rp${fmt(real)}), melebihi ambang toleransi pergeseran ${Math.round(varianceTolerance * 100)}%.`,
          `Category "${itemName}" is over budget by ${Math.round(pctOver * 100)}% (Planned Rp${fmt(planned)}, Actual Rp${fmt(real)}), exceeding the ${Math.round(varianceTolerance * 100)}% variance tolerance.`
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

  function csv(res, lang = 'id') {
    const header = lang === 'en'
      ? ['Budget Category', 'Planned (Rp)', 'Actual (Rp)', 'Variance (Rp)', 'Variance (%)']
      : ['Pos Anggaran', 'Rencana (Rp)', 'Realisasi (Rp)', 'Selisih (Rp)', 'Persentase Varian (%)'];
    const rows = [header].concat(
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
    for (j = 0; j < words.length;) {
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

  /* Deterministic Statutory Template Engine: Generates official addendum draft for variances (100% Offline) */
  function generateAddendumDraft(lpj, res, facultyName = 'Biro Kemahasiswaan (BKAM)', lang = 'id') {
    const overBudgetItems = res.budget.filter(
      (b) => b.pctOver > (lpj.varianceTolerancePercent || 10)
    );
    const dateStr = lpj.submitDate || new Date().toISOString().split('T')[0];

    if (lang === 'en') {
      let itemsTableEn = overBudgetItems
        .map(
          (b, idx) =>
            `${idx + 1}. Category: ${b.item} | Planned: Rp${fmt(b.planned)} | Actual: Rp${fmt(
              b.real
            )} | Variance: +Rp${fmt(b.diff)} (+${b.pctOver}%)`
        )
        .join('\n');

      if (!itemsTableEn) {
        itemsTableEn = 'No budget categories exceeded the allowed variance tolerance threshold.';
      }

      return `SURAT PERMOHONAN ADDENDUM PERGESERAN ANGGARAN KEGIATAN
(OFFICIAL BUDGET VARIANCE ADDENDUM REQUEST LETTER)
Reference No: 042/PAN-PEL/ADDENDUM/${dateStr.replace(/-/g, '')}
Attachment  : 1 (one) RapiLPJ Pre-Submission Audit Dossier
Subject     : Request for Approval of Realized Activity Budget Reallocation

To:
Head of ${facultyName}
In Place

Dear Sir/Madam,
Following the completion of our student organization activity held on ${lpj.eventDate || '-'}, the Organizing Committee respectfully submits this formal request for approval regarding realized budget reallocations that exceeded initial line-item tolerance bounds:

${itemsTableEn}

Justification for Reallocation:
Urgent operational adjustments in the field were required to ensure participant safety and event continuity, while maintaining strict compliance with the total approved endorsement ceiling.

We submit this official addendum request as an integral part of our Activity Accountability Report (LPJ). Thank you for your review and approval.

Makassar, ${dateStr}
Respectfully yours,

Committee Chairperson                       Activity Treasurer


(__________________________)                (__________________________)
Student ID (NIM):                           Student ID (NIM):

Acknowledged by,
Faculty Advisor / Student Affairs Supervisor


(__________________________)
NIDN:`;
    }

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

  /* Optional Live Gemini 2.0 Flash Governance Co-Pilot (BYOK Client-Side Direct Fetch) */
  async function callGeminiAdvisory(apiKey, lpj, res, facultyName = 'Biro Kemahasiswaan (BKAM)', lang = 'id') {
    if (!apiKey || !apiKey.trim()) {
      return {
        mode: 'deterministic_template',
        text: generateAddendumDraft(lpj, res, facultyName, lang)
      };
    }
    const baseDraft = generateAddendumDraft(lpj, res, facultyName, lang);
    const issueSummary = res.issues.map((i, idx) => `${idx + 1}. [${i.rule}] ${lang === 'en' ? i.msgEn : i.msg}`).join('\n') || 'None';
    const prompt = lang === 'en'
      ? `You are the RapiLPJ Fiscal Governance Co-Pilot for Indonesian university student organizations.
Do NOT recalculate any numbers; trust the deterministic kernel numbers below 100%.
Faculty Preset: ${facultyName}
Planned Total: Rp${fmt(res.planned)} | Actual Spent: Rp${fmt(res.spent)}
Detected Compliance Issues:
${issueSummary}

Provide:
1. BRIEF GOVERNANCE REMEDIATION GUIDE (bullet points explaining the legal/university rationale for each detected issue and exact corrective steps for the student treasurer).
2. OFFICIAL ADDENDUM LETTER (keep and refine the following formal letter structure):

${baseDraft}`
      : `Anda adalah Asisten Tata Kelola Keuangan Ormawa RapiLPJ.
JANGAN menghitung ulang angka; gunakan hasil kernel deterministik berikut 100%.
Aturan Kampus: ${facultyName}
Total Rencana: Rp${fmt(res.planned)} | Total Realisasi: Rp${fmt(res.spent)}
Temuan Audit Deterministik:
${issueSummary}

Berikan:
1. PANDUAN REMEDIASI TATA KELOLA SINGKAT (poin-poin penjelasan dasar hukum/pedoman kampus atas setiap temuan beserta langkah perbaikan konkret bagi bendahara mahasiswa).
2. SURAT PERMOHONAN ADDENDUM RESMI (pertahankan dan sempurnakan naskah surat dinas berikut):

${baseDraft}`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1200 }
      })
    });
    if (!response.ok) {
      throw new Error(`Gemini API HTTP ${response.status}`);
    }
    const json = await response.json();
    const outText = json &&
      json.candidates &&
      json.candidates[0] &&
      json.candidates[0].content &&
      json.candidates[0].content.parts &&
      json.candidates[0].content.parts[0] &&
      json.candidates[0].content.parts[0].text;
    if (!outText) {
      throw new Error('Empty response from Gemini API');
    }
    return {
      mode: 'live_gemini_api',
      text: outText.trim()
    };
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
      notesVision: 'Struk termal terdeteksi, teks tajam, nomor pompa dan liter terverifikasi.',
      notesVisionEn: 'Thermal paper slip detected, sharp print, pump number and liter volume verified.'
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
      notesVision: 'Faktur katering resmi, stempel basah ungu, meterai Rp10.000 terverifikasi pada nominal >= 5jt.',
      notesVisionEn: 'Official catering invoice, purple wet stamp, Rp10,000 revenue seal verified for amount >= 5M.'
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
      notesVision: 'Nota kontan kertas NCR rangkap, cap basah lunas toko terdeteksi di pojok kanan bawah.',
      notesVisionEn: 'Carbonless NCR cash receipt, store paid wet seal detected at bottom-right corner.'
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
    if (!raw) throw new Error('Berkas draf kosong / Empty draft file');
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
    callGeminiAdvisory,
    SAMPLE_GEMINI_RECEIPTS,
    exportDraft,
    parseDraft
  };
});
