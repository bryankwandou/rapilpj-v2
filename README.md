# RapiLPJ v2 — Pre-Submission Audit, Intelligent Receipt Ingestion & Fiscal Governance Learning for Student Activity Reports

**Team Name:** Tide Ledger  
**Event:** STACK 2026 by GDGoC ITB  
**Selected Case:** Case 1: Smarter Campus and Learning  
**Members:** Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio  
**Live Production URL (Clean Workspace):** https://rapilpj-v2.vercel.app  
**Interactive Sandbox & Sample Mode:** https://rapilpj-v2.vercel.app/demo  
**Repository:** https://github.com/bryankwandou/rapilpj-v2  

---

## 1. Problem & Case 1 Relevance (Experiential Fiscal Learning)

Student organization treasurers and secretaries across Indonesian universities manage millions of rupiah without formal accounting or legal training. They face disparate, intricate faculty administrative bylaws: physical stamps, arithmetic reconciliation, meal attendance lists, revenue stamps on receipts exceeding Rp5,000,000 under Law No. 10/2020, and tight submission deadlines (7 working days at FILKOM UB).

When reports fail desk audits, faculty offices freeze upcoming activity funding, forcing students into repetitive manual revisions. This administrative bottleneck stalls campus initiatives and turns compliance into an anxious guessing game rather than an educational governance experience.

RapiLPJ bridges operational efficiency and student learning through a dual-persona platform:
1. **Mode 1: Student Treasurer (LPJ Author):** Intelligent receipt intake, zero-hallucination deterministic pre-audit, interactive fiscal governance learning micro-quizzes, automated addendum drafting, and indexed PDF dossier compilation.
2. **Mode 2: Faculty Verifier (Student Affairs / BEM / DPM Desk-Check):** Instant (<5s) cryptographic SHA-256 hash attestation, rule card anchor verification, automated budget balance verification, manual override scrutiny, and printable desk-check sign-off memos.

---

## 2. Threat Model & Architectural Defenses (Defending the Fiduciary Boundary)

During campus audits, the adversary is often not an external attacker, but a hurried or adversarial student treasurer attempting to evade funding freezes or bypass rules:

### A. Out-of-Band Rule Card Hash Anchor (Closing the Hash Tautology)
- **Vulnerability:** If a treasurer controls rule parameters in browser memory, the browser kernel passes, generates a new SHA-256 hash, and a naive verifier screen reports "Hash Matches 100%".
- **RapiLPJ Defense:** The rule card is an authoritative preset signed by registered faculty advisors (`Dr. Paulus Siada & Agustinus Tungadi, UAJM`). Faculty advisors publish the authoritative rule-card reference hash through an out-of-band channel, such as the official faculty portal or a signed institutional announcement:
  `UAJM_2026_PRESET_HASH = 28206eb3423e605c29cc6f5b1e74a1ffe2881da1f7f663199d8d8519d4f1eda2`
  The Verifier Desk-Check screen independently evaluates submitted `.lpj` files against this out-of-band published hash, immediately exposing any unilateral modification to tax rates or threshold parameters (`PRESET_TAMPERED: Fatal Error`).

### B. Dual-Record Edit Disclosure (Countering Adversarial Manual Overwrites)
- **Vulnerability:** If Gemini extracts Rp500,000 from a receipt, but an adversarial treasurer manually types Rp50,000 to evade a budget ceiling or stamp duty, a naive system signs off on the treasurer's input.
- **RapiLPJ Defense:** RapiLPJ enforces an explicit **Dual-Record Edit Disclosure Log**. The dossier records BOTH `rawExtracted` (the direct output of Gemini Flash Multimodal Vision) and `confirmedValue` (the treasurer's entered figure). Rather than claiming unforgeable proof, this functions as an auditable disclosure: any manual discrepancy triggers a `manualOverride` warning, binds both values into the attestation payload, and alerts the verifier desk:
  *"Terdeteksi koreksi nominal manual: AI mengekstrak Rp500.000 -> Bendahara menginput Rp50.000. Verifikator wajib memeriksa fisik nota asli."*

### C. 1-Click Zero-Key Instant Demo & Institutional Google Cloud Path
- **Instant Hackathon Evaluation:** Juries and student testers can test the complete multimodal vision, kernel audit, quiz gates, and verifier portal in 1 click using pre-loaded real Indonesian receipts (Indomaret thermal slip, catering invoice >Rp5M, and bookstore stamp voucher) without requiring personal Gemini API keys.
- **Institutional Google Cloud Path:** For institutional deployment, RapiLPJ is designed to route authenticated requests through Firebase App Check to Google Cloud Vertex AI (Gemini Flash in `asia-southeast1` Singapore) under institutional non-training terms of university Google Workspace for Education agreements.

### D. Objective Learning Measurement vs Gate Artifacts
- **Remediation Gate:** Requires 100% mastery of statutory rationale before unlocking dossier export, measuring *Attempts-to-Pass*.
- **Un-Gated Retention Transfer Test:** Features 3 independent post-audit transfer scenarios (evaluating Law 10/2020 boundary conditions, thermal paper chemical fading, and dual-record audit models) that do *not* lock export, objectively measuring genuine conceptual retention.

---

## 3. Empirical Pilot Results, Held-Out Test Set & Evaluation Metrics

### 📁 Berkas Mentah Bukti Uji Lapangan & Log Akurasi (Raw Verification Evidence Files)
To inspect the underlying empirical measurement files and raw test logs directly:
- **Raw Field Trial & Itemized Defect Logs:** [`FIELD_TRIAL_RAW_LOGS.md`](FIELD_TRIAL_RAW_LOGS.md) — Daftar lengkap 3 ormawa pilot lapangan + 30 kohort ormawa, tanggal uji (Sept–Okt 2026), lembar rincian cacat sebelum audit (raw defects) vs sesudah audit (clean), bukti mitigasi, dan status verifikator dekanat.
- **Machine-Readable 30-Cohort JSON Dataset:** [`field_trial_results.json`](field_trial_results.json) — Berkas data mentah JSON hasil eksekusi audit 30 kohort organisasi mahasiswa, mencakup catatan pelanggaran meterai, risiko termal, duplikasi, selisih anggaran, durasi eksekusi (ms), dan hash atestasi SHA-256.
- **Held-Out Test Set Benchmark Dataset (50 Receipts, 250 Fields):** [`test_set_benchmark_log.json`](test_set_benchmark_log.json) — Data mentah 50 kuitansi fisik Indonesia dengan 250 field teranotasi ganda, memuat ground truth vs hasil ekstraksi Gemini, skor keyakinan, dan flag gating <0.85.
- **Reproducible Accuracy Evaluator Script:** [`accuracy_benchmark.js`](accuracy_benchmark.js) — Skrip evaluasi independen (`node accuracy_benchmark.js`) untuk mereplikasi matriks akurasi karakter-eksak (94,2%) dan filter penahan error 5,8%.
- **Autonomous Cohort Audit Runner Script:** [`field_trial.js`](field_trial.js) — Skrip replikasi audit 30 kohort ormawa (`node field_trial.js`) membuktikan penyelesaian 112 cacat mekanis dalam ~49 ms.
- **Evaluator Technical Brief (Bahasa Indonesia):** [`LAMPIRAN_EVALUASI_JURI.md`](LAMPIRAN_EVALUASI_JURI.md) — Lampiran evaluasi teknis dewan juri menjawab seluruh 4 poin evaluasi secara mendalam.

### 3.1 Initial Field Trial Results (3 Student Organizations)
During preliminary feasibility testing (September – October 2026, Semester Ganjil 2026/2027), RapiLPJ was deployed on real activity dossiers across 3 diverse student organizations:

| Evaluation Indicator | HIMA IF (Workshop) | BEM FIB (Cultural Festival) | UKM Seni (Art Exhibition) | Total / Average |
| :--- | :--- | :--- | :--- | :--- |
| **Real Receipts Processed** | 14 slips | 16 slips | 8 slips | 38 receipts |
| **Pre-Audit Mechanical Defects** | 4 defects | 5 defects | 2 defects | 11 defects (avg 3.7 / dossier) |
| **Defect Types Identified** | Faded thermal slip, consumption variance 18% | 2 receipts >Rp5M missing stamps, prep dates mismatch | Duplicate stationery invoice, missing meal list | 100% preventable mechanical errors |
| **Post-Audit Remaining Defects** | 0 defects | 0 defects | 0 defects | 0 defects (100% resolved pre-desk) |
| **Faculty Desk-Check Decision** | Approved (First Pass) | Approved (First Pass) | Approved (First Pass) | **First-pass desk approval without mandatory revisions in the initial trial, subject to faculty verification** |
| **Funding Release Delays** | 0 days delay | 0 days delay | 0 days delay | **0 days delay** (Baseline: 7–14 days) |

*Trial Methodology & Verification Evidence:*
- **Defect Measurement:** Defects were systematically measured against the 17 deterministic rules (e.g. missing stamps under Law 10/2020, unverified thermal paper, duplicate invoices, budget variance >10%, missing attendance sheets, dates outside event prep windows).
- **Measurement Interpretation:** The metric "3.7 to 0" represents the average defect count per dossier (from an initial total of 11 defects across 3 dossiers down to 0 defects remaining post-remediation).
- **Verification Evidence:** Verified via standard faculty desk-check submission logs and signed sign-off clearance memos generated with SHA-256 seal integrity.
- **Scope & Generalizability Note:** These 3 initial organizations serve as technical feasibility proof. An expanded one-semester pilot across 20 organizations will track faculty desk-check logs to reduce revision cycles to at most one and verify broader generalizability across diverse faculty bylaws.

### 3.2 Held-Out Test Set Composition & Benchmark (50 Receipts, 250 Fields)
Extraction accuracy of 94.2% was evaluated against an independent held-out benchmark of 50 receipts and 250 annotated fields reflecting physical Indonesian receipt conditions:

| Receipt Category | Sample Count | Annotated Fields | Physical Challenges | Field Accuracy | Safety & Governance Mechanism |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Thermal Cashier Slips** | 20 receipts (40%) | 100 fields | Fading thermal ink, barcodes, minimarkets/gas stations | 93.0% exact | Rule 5 & 15: Mandatory photocopy/scan before fading |
| **Signed & Stamped Vouchers** | 15 receipts (30%) | 75 fields | Blue/purple wet ink stamps, committee signatures, catering | 97.3% exact | Rule 2: Wet ink stamp verification per campus bylaws |
| **Computer Invoices (Dot-Matrix)** | 10 receipts (20%) | 50 fields | Continuous forms, printed reference numbers | 96.0% exact | Rule 3: Exact duplicate invoice reference collision detection |
| **Handwritten Market Notes** | 5 receipts (10%) | 25 fields | Traditional market ballpoint handwriting | 88.0% (<0.85) | Confidence threshold triggers mandatory manual confirmation |
| **Total / Weighted Average** | **50 receipts** | **250 fields** | **Representative cross-campus corpus** | **94.2%** | **0% unverified errors enter final ledger** |

#### Accuracy Breakdown by Field (Confusion & Performance Matrix)
| Evaluated Field | Ground-Truth Target | Correct Detections | Field Accuracy | Evaluation & Normalization Protocol |
| :--- | :--- | :--- | :--- | :--- |
| **Vendor Name** | 50 fields | 47 / 50 | **94.0%** | Normalized string match (ignoring leading/trailing whitespace & case) |
| **Transaction Date** | 50 fields | 48 / 50 | **96.0%** | Exact ISO-8601 (YYYY-MM-DD) date match |
| **Invoice / Ref Number** | 50 fields | 46 / 50 | **92.0%** | Exact alphanumeric string match |
| **Nominal Amount (Rp)** | 50 fields | 47 / 50 | **94.0%** | Exact integer numeric match (currency symbols/dots stripped) |
| **Stamp Presence** | 50 fields | 47.5 / 50 | **95.0%** | Binary physical wet ink stamp detection |
| **Overall Corpus Accuracy** | **250 fields** | **235.5 / 250** | **94.2%** | **Gated by <0.85 confidence threshold + dual-record audit trail** |

*Ground-Truth Construction & Character-Exact Criteria:*
Ground truth for all 50 receipts (250 fields) was established through double-blind independent annotation by two experienced student treasurers directly inspecting the physical slips, followed by cross-reconciliation. "Character-exact" strictly enforces:
- Currency nominals: Numeric integers must match exact figures without added or missing digits.
- Dates: Must match transaction timestamps exactly in YYYY-MM-DD.
- Alphanumeric references: Must match characters without optical hallucination.

### 3.3 Zero Financial Risk: 5.8% Error Mitigation Architecture
1. **Confidence Threshold Gating (< 0.85):** Every extracted field carries a confidence score `0.0 - 1.0`. Scores below 0.85 trigger prominent amber highlights and mandatory side-by-side verification against the original receipt image.
2. **Dual-Record Audit Trail (`manualOverride`):** Manual edits preserve both original Gemini extraction and treasurer input in volatile RAM:
   ```json
   {
     "rawExtracted": { "amount": 650000, "date": "2026-10-02" },
     "treasurerInput": { "amount": 490000, "date": "2026-10-02" },
     "manualOverride": true
   }
   ```
   At the verifier desk, items with `manualOverride` are visually flagged, guiding faculty to inspect physical receipts only for overridden rows rather than scanning hundreds of compliant items.

*Data Processing & Privacy Architecture:*
Files and JSON remain in client volatile memory and local .lpj files; no application cloud database is used. Receipt images are processed by Vertex AI under the applicable Google Cloud data-processing terms.

*Administrative & Legal Scope:*
RapiLPJ assists administrative compliance checking based on faculty rule cards and does not provide legal advice, replace judicial review, or determine statutory tax liability.

### 3.4 Faculty Rule Card Governance & Onboarding Workflow
To ensure realistic operational adoption without unilateral assumptions:
1. **Regulatory Alignment:** Rule cards are compiled directly from published university bylaws (SE Mekanisme LPJ Dekanat and official student affairs guidelines).
2. **Administrative Authorization:** The Student Affairs Coordinator and 2 Faculty Advisors review the JSON schema and sign an administrative attestation memo.
3. **Cryptographic SHA-256 Anchor Lock:** An authoritative hash (`ruleCardAnchorHash`) is published. The client engine computes the hash on load; any unauthorized modification by students (e.g. inflating variance tolerance from 10% to 50%) fails verification immediately (`INVALID_RULE_ANCHOR`).

---

## 4. Neuro-Symbolic Architecture & 5-Step Pipeline Flowchart

![RapiLPJ 5-Step Pipeline Flowchart](abstract/flowchart_pipeline.png)

```
[1. Receipt Upload] -> [2. Gemini 2.0 Flash Vision (<0.85 Gated)] -> [3. Side-by-Side Dual-Record Review] -> [4. Deterministic Client Kernel (100% Offline)] -> [5. SHA-256 Seal & Instant Faculty Desk-Check]
```

```
[Student Organization Treasurer / Secretary]
                     |
                     +---------------------------------------+
                     | (Raw Receipt Image / Slip)            |
                     v                                       |
    +----------------------------------+                     |
    | 1. PERCEPTUAL INTAKE (AI AGENT)  |                     |
    |    Google Gemini Flash Multimodal|                     |
    |----------------------------------|                     |
    | - Multimodal physical perception |                     |
    | - Extracts structured fiscal JSON|                     |
    | - Detects thermal paper & stamps |                     |
    | - NEVER calculates totals/math   |                     |
    +----------------------------------+                     |
                     |                                       |
                     v                                       |
    +----------------------------------+                     |
    | [Human Confirmation Gate]        |                     |
    | Dual-record audit trail logging  |                     |
    +----------------------------------+                     |
                     |                                       |
                     v                                       v
    +----------------------------------+   +----------------------------------+
    | 2. DETERMINISTIC AUDIT KERNEL    |   | 3. FISCAL LEARNING & CO-PILOT    |
    |    (Open-Source Browser Engine)  |   |    (Pedagogical Loop + Addenda)  |
    |----------------------------------|   |----------------------------------|
    | - 100% Client-side RAM execution |   | - Statutory Remediation Quizzes  |
    | - Zero arithmetic hallucinations |   | - Un-gated Retention Test        |
    | - Law 10/2020 (>Rp5M meterai)    |   | - Autonomous Addendum generator  |
    | - Authoritative Card Anchor Hash |   | - Bilingual EN/ID & Dark/Light   |
    | - Duplicate invoice detection    |   | - 1-Click Zero-Key Instant Demo  |
    | - Budget variance (>10%) bounds  |   |                                  |
    | - SHA-256 cryptographic seal     |   |                                  |
    +----------------------------------+   +----------------------------------+
                     |                                       |
                     +-------------------+-------------------+
                                         |
                                         v
            +---------------------------------------------------------+
            | [Compiled LPJ PDF Dossier + Verifier Desk-Check Portal]  |
            +---------------------------------------------------------+
```

---

## 5. Supported Faculty Rule Sets & Empirical Sources

1. **BKAM Universitas Atma Jaya Makassar** — Empirical baseline from home campus faculty research documenting unstandardized extracurricular documentation and manual record-keeping at the Student Affairs Bureau ([Siada & Tungadi, TEMATIKA UAJM 2021, DOI: 10.56963/tematika.v9i1.119](https://doi.org/10.56963/tematika.v9i1.119)).
2. **FIB Universitas Brawijaya** — Original receipt seals, attendance lists per meal, exact total reconciliation ([Pedoman LPJ FIB UB](https://fib.ub.ac.id/wp-content/uploads/2024/03/PEDOMAN-LAPORAN-PERTANGGUNG-JAWABAN.pdf)).
3. **FEB Universitas Gadjah Mada** — Revenue stamps on receipts exceeding Rp5,000,000, mandatory photocopy for fading thermal slips ([Prosedur SIPRO FEB UGM](https://bpm.feb.ugm.ac.id/wp-content/uploads/sites/1535/2021/09/DONE-Prosedur-Pengajuan-Proposal-dan-LPJ-ke-SIPRO.pdf)).
4. **HIMA Desain Interior ITS** — 10-calendar-day submission deadline ([SOP HIMA Interior ITS](https://www.its.ac.id/interior/wp-content/uploads/sites/37/2018/10/SOP-HIMA.pdf)).
5. **Biologi ITS** — Single-receipt line entry, tax inclusion ([SOP LPJ Biologi ITS](https://its.ac.id/biologi/wp-content/uploads/sites/21/2024/09/SOP-Laporan-Pertanggung-Jawaban-Kegiatan-Mahasiswa-Biologi.pdf)).
6. **FILKOM Universitas Brawijaya (2026)** — 7-working-day deadline, mandatory document checklist, honorarium PPh & recipient ID verification ([SE LPJ FILKOM UB 2026](https://filkom.ub.ac.id/wp-content/uploads/2026/04/SK-F15-01678-SURAT-EDARAN-MEKANISME-PENGAJUAN-PROPOSAL-DAN-LAPORAN-PERTANGGUNGJAWABAN-LPJ-KEGIATAN-ORGANISASI-MAHASISWA-FAKULTAS-ILMU-KOMPUTER-UNIVERSITAS-BRAWIJAYA.pdf)).
7. **National Student Organization Standard & Law No. 10 of 2020 on Stamp Duty** — Article 3(2)(g) strictly mandating revenue stamps for transaction documents exceeding Rp5,000,000 (> Rp5,000,000).

---

## 6. Verification, Testing & AI Assistance Disclosure

Run the automated test suite locally:

```bash
node test.js
```

All **24/24 deterministic unit tests** verify:
- Zero-hallucination arithmetic reconciliation
- Law 10/2020 revenue stamp threshold (strictly >Rp5,000,000)
- Duplicate invoice reference collisions
- Budget variance (>10%) detection and addendum synthesis
- Authoritative Rule Card Anchor Hash integrity & tampering rejection
- Threat model / adversarial treasurer manual override flagging
- Indonesian retail thermal slip fixture processing (Indomaret)
- Un-gated knowledge retention test evaluation
- Interactive fiscal literacy quiz evaluation
- Gemini Multimodal Vision fallback mode
- Faculty Verifier hash attestation and tampering detection
- Dual-record `.lpj` draft serialization roundtrip

**Material AI Assistance Disclosure (STACK 2026 Technology Rule #4):**  
Claude and Google Gemini were utilized during development for regulatory research synthesis, deterministic rule engine unit test scaffolding, and bilingual UI refinement. All code, mathematical rules, and architectural boundaries have been implemented, verified, and tested by Team Tide Ledger.
