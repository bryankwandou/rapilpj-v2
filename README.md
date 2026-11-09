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

## 3. Automated Simulation Benchmark, Vision Ingestion & Field Pilot Roadmap

### 3.1 30-Cohort Synthetic Stress-Test Benchmark (Automated Defect Resolution)
To evaluate the deterministic kernel across the diversity of campus administrative regulations prior to live campus deployment, an automated synthetic stress-test benchmark was constructed comprising 30 distinct student organization profiles (BEM, Department Associations/HMD, and UKM) across 4 campus regulatory frameworks (UB, UGM, ITS, UAJM):

| Benchmark Metric | Measurement / Result | Specification & Significance |
| :--- | :--- | :--- |
| **Synthesized Test Cohorts** | 30 student organization dossiers | Mapped to official campus bylaws (FILKOM UB, FEB UGM, ITS, UAJM) |
| **Injected Mechanical Defects** | 112 rule violations | Modeled on common empirical rejection causes documented in literature |
| **Defect Detection Rate** | 100% (112 / 112 detected) | Deterministic evaluation across 17 audit rules |
| **Automated Remediation Rate** | 100% (112 / 112 resolved) | Guided quizzes, addendum synthesis, and ledger reconciliation |
| **Total Batch Benchmark Time** | ~49 ms total execution time | Average **1.63 ms per dossier** across all 30 cohorts |
| **Single-Dossier Pre-Audit Pass** | ~15.6 ms execution time | Real-time browser responsiveness with zero user-perceptible delay |
| **Cryptographic Seal Validity** | 100% (30 / 30 valid SHA-256 hashes) | Tamper-evident attestation matching out-of-band rule card anchors |

*Breakdown of Injected Failure Modes Resolved in Benchmark:*
- **Statutory Stamp Violations (Law 10/2020):** 13 cases of transactions >Rp5,000,000 caught and gated for mandatory revenue stamps.
- **Thermal Paper Degradation Risks:** 15 cases of unverified thermal cashier slips gated for mandatory digital scan / photocopy attachment before fading.
- **Duplicate Invoice / Voucher Collisions:** 20 cases of twin invoice reference collisions intercepted.
- **Submission Deadline Violations:** 12 cases of dates outside preparation windows caught based on campus-specific calendar bylaws.
- **Budget Variance Ceilings (>10%):** 9 overbudget line items intercepted and routed through automated Addendum drafting.
- **Meal Attendance Discrepancies:** 7 cases of unaligned consumption ratios reconciled with presensi sheets.
- **Administrative Checklist Gaps:** 11 cases of missing organizational decrees (SK) or event photos flagged.
- **Adversarial Edit Disclosure:** 8 manual override attempts captured in dual-record audit trails.

*Replication:* Run `node field_trial.js` locally to execute the benchmark and generate the execution record at [`field_trial_results.json`](field_trial_results.json).

### 3.2 Multimodal Receipt Ingestion & Human-in-the-Loop Risk Mitigation
For perceptual receipt intake, Gemini 2.0 Flash Multimodal Vision extracts structured receipt properties (vendor name, transaction date, invoice reference, total amount, and wet ink stamp presence).

Because optical and multimodal language models are probabilistic, RapiLPJ enforces a **Zero-Trust Aritmetika & Human-in-the-Loop Architecture** to prevent extraction errors from affecting financial reports:
1. **Confidence Threshold Gating (< 0.85):** Every extracted field carries a model confidence score (`0.0 - 1.0`). Any field with a confidence score below 0.85 or optical ambiguity is visually bordered and routed to a mandatory side-by-side confirmation interface against the original receipt image before the figure can enter the ledger.
2. **Dual-Record Audit Trail (`manualOverride`):** If a treasurer modifies an extracted field, the system preserves both the original vision extraction and the manual entry:
   ```json
   {
     "rawExtracted": { "amount": 650000, "date": "2026-10-02" },
     "treasurerInput": { "amount": 490000, "date": "2026-10-02" },
     "manualOverride": true
   }
   ```
   At the verifier desk, rows tagged with `manualOverride` are surfaced for physical receipt inspection, allowing faculty to inspect physical receipts only for overridden rows rather than scanning hundreds of compliant items.
3. **Deterministic Arithmetic Isolation:** The vision model is never trusted to perform mathematical operations, calculate totals, compute tax withholdings, or evaluate budget variances. All arithmetic is executed by the deterministic JavaScript engine.
4. **Data Processing & Privacy Architecture:** Files and JSON remain in client volatile memory and local `.lpj` files; no application cloud database is used. Receipt images are processed by Vertex AI under institutional Google Cloud data-processing terms.

### 3.3 Planned One-Semester Field Pilot Roadmap (20 Student Organizations)
Following the prototype development phase, a structured one-semester field pilot is planned across 20 active student organizations to measure real-world administrative impact:
- **Pilot Universe:** 20 student organizations across diverse faculties (Department Student Associations, Faculty BEMs, and University Activity Units / UKMs).
- **Measurement Protocol:** Faculty desk-check submission logs and revision tracking sheets will be monitored to evaluate whether pre-submission self-auditing reduces average revision cycles from the baseline 3.4 cycles down to at most one cycle.
- **Faculty Rule Card Governance:** Rule cards are compiled from official faculty circulars (e.g. SE Dekanat and official guidelines), authorized by student affairs coordinators, and anchored with an out-of-band SHA-256 hash.
- **Administrative Scope:** RapiLPJ assists administrative compliance checking and does not provide legal advice, replace judicial review, or determine statutory tax liability.

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
