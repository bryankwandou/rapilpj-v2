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
2. **Mode 2: Faculty Verifier (Student Affairs / BEM / DPM Desk-Check):** Instant (<5s) cryptographic SHA-256 hash attestation, automated budget balance verification, and printable desk-check sign-off memos.

---

## 2. Realistic Baseline Metrics & Pilot Evaluation Plan

Rather than ungrounded claims of "eliminating rejections", RapiLPJ evaluates impact across three concrete empirical metrics in its pilot with 30 treasurers and 2 faculty advisors at Universitas Atma Jaya Makassar:
1. **Treasurer Preparation Time (Minutes):** Measures the active duration spent by student treasurers compiling, formatting, and reconciling receipts into an auditable dossier before vs. after using RapiLPJ.
2. **Mechanical Defect Count Reduction:** Measures the reduction in itemized bookkeeping defects (unbudgeted items, duplicate invoice collisions, missing revenue stamps on transactions >Rp5,000,000, meal attendance ratios, and PPh tax withholding) resolved prior to desk submission.
3. **Pre/Post Fiscal Governance Literacy Scores:** Measures the verified improvement in treasurer comprehension of statutory university compliance bylaws (Law 10/2020, archival durability, and voted appropriations) evaluated before and after completing the gated remediation micro-quizzes.

---

## 3. Neuro-Symbolic Architecture & STACK 2026 Rule #6 / #7 Transparency Disclosure

RapiLPJ eliminates the trade-off between generative AI hallucinations in arithmetic and the manual friction of spreadsheets through an unbreachable division of labor:

```
[Student Organization Treasurer / Secretary]
                     |
                     +---------------------------------------+
                     | (Raw Receipt Image / Slip)            |
                     v                                       |
    +----------------------------------+                     |
    | 1. INTELLIGENT INTAKE (CORE AI)  |                     |
    |    Google Gemini 2.0 Flash Vision|                     |
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
    | Side-by-side treasurer review    |                     |
    +----------------------------------+                     |
                     |                                       |
                     v                                       v
    +----------------------------------+   +----------------------------------+
    | 2. DETERMINISTIC AUDIT KERNEL    |   | 3. FISCAL LEARNING & CO-PILOT    |
    |    (Open-Source Browser Engine)  |   |    (Pedagogical Loop + Addenda)  |
    |----------------------------------|   |----------------------------------|
    | - 100% Client-side RAM execution |   | - Statutory Micro-Quizzes        |
    | - Zero arithmetic hallucinations |   | - Interactive explain-back cards |
    | - Law 10/2020 (>Rp5M meterai)    |   | - Autonomous Addendum generator  |
    | - 1:1 Attendance & 5% PPh tax    |   | - Bilingual EN/ID & Dark/Light   |
    | - Duplicate invoice detection    |   | - Offline fallback (0 API cost)  |
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

### Explicit Implementation & Simulation Disclosure (STACK 2026 General Rules #6 & #7)
1. **Completed & 100% Live Client-Side Features:**
   - **Deterministic Audit Kernel (`engine.js`):** 100% live in browser memory. Audits 15 statutory and faculty rules, working-day deadlines, duplicate invoices, budget variances, and pure-JS SHA-256 cryptographic attestation.
   - **Interactive Fiscal Governance Learning Loop (`FISCAL_LEARNING_MODULES`):** 100% live. Each infraction opens statutory foundations and remediation micro-quizzes, tracking the treasurer's verified concept mastery.
   - **Intelligent Multimodal Receipt Parser (`parseReceiptWithGemini`):** Integrates Gemini 2.0 Flash Multimodal Vision API directly in browser memory (client BYOK) with mandatory side-by-side human confirmation before committing rows to the deterministic kernel, transmitting receipt images solely to the user-authenticated Gemini API endpoint.
   - **Faculty Desk-Check Verifier Portal (`viewVerifier`):** 100% live. Verifies `.lpj` payload hashes and rulesets in <1s, recommending clearance or flagging itemized discrepancies.
   - **Offline `.lpj` Draft Persistence & Crash-Guard:** 100% live portable state container.
   - **Auto-Constructed PDF Dossier with Indexed Evidence Appendix:** 100% live.
2. **Simulated / Pre-Extracted Sandbox Data (`/demo`):**
   - In `/demo`, sample receipts represent pre-extracted datasets (`LPJ.SAMPLE_GEMINI_RECEIPTS`) paired with physical receipt photos in `samples/` for offline judge evaluation.
3. **Planned for Semifinal & Final Day Build Sessions:**
   - Multi-page document batching and QR-verifiable digital advisor counter-signatures.

---

## 4. Supported Faculty Rule Sets & Empirical Sources

1. **BKAM Universitas Atma Jaya Makassar** — Empirical baseline from home campus faculty research documenting unstandardized extracurricular documentation and manual record-keeping at the Student Affairs Bureau ([Siada & Tungadi, TEMATIKA UAJM 2021, DOI: 10.56963/tematika.v9i1.119](https://doi.org/10.56963/tematika.v9i1.119)).
2. **FIB Universitas Brawijaya** — Original receipt seals, attendance lists per meal, exact total reconciliation ([Pedoman LPJ FIB UB](https://fib.ub.ac.id/wp-content/uploads/2024/03/PEDOMAN-LAPORAN-PERTANGGUNG-JAWABAN.pdf)).
3. **FEB Universitas Gadjah Mada** — Revenue stamps on receipts exceeding Rp5,000,000, mandatory photocopy for fading thermal slips ([Prosedur SIPRO FEB UGM](https://bpm.feb.ugm.ac.id/wp-content/uploads/sites/1535/2021/09/DONE-Prosedur-Pengajuan-Proposal-dan-LPJ-ke-SIPRO.pdf)).
4. **HIMA Desain Interior ITS** — 10-calendar-day submission deadline ([SOP HIMA Interior ITS](https://www.its.ac.id/interior/wp-content/uploads/sites/37/2018/10/SOP-HIMA.pdf)).
5. **Biologi ITS** — Single-receipt line entry, tax inclusion ([SOP LPJ Biologi ITS](https://its.ac.id/biologi/wp-content/uploads/sites/21/2024/09/SOP-Laporan-Pertanggung-Jawaban-Kegiatan-Mahasiswa-Biologi.pdf)).
6. **FILKOM Universitas Brawijaya (2026)** — 7-working-day deadline, mandatory document checklist, honorarium PPh & recipient ID verification ([SE LPJ FILKOM UB 2026](https://filkom.ub.ac.id/wp-content/uploads/2026/04/SK-F15-01678-SURAT-EDARAN-MEKANISME-PENGAJUAN-PROPOSAL-DAN-LAPORAN-PERTANGGUNGJAWABAN-LPJ-KEGIATAN-ORGANISASI-MAHASISWA-FAKULTAS-ILMU-KOMPUTER-UNIVERSITAS-BRAWIJAYA.pdf)).
7. **National Student Organization Standard & Law No. 10 of 2020 on Stamp Duty** — Article 3(2)(g) strictly mandating revenue stamps for transaction documents exceeding Rp5,000,000 (> Rp5,000,000).

---

## 5. Verification, Testing & AI Assistance Disclosure

Run the automated test suite locally:

```bash
node test.js
```

All **19/19 deterministic unit tests** verify:
- Zero-hallucination arithmetic reconciliation
- Law 10/2020 revenue stamp threshold (strictly >Rp5,000,000)
- Duplicate invoice reference collisions
- Budget variance (>10%) detection and addendum synthesis
- Interactive fiscal literacy quiz evaluation
- Gemini Multimodal Vision fallback mode
- Faculty Verifier hash attestation and tampering detection
- Offline `.lpj` draft serialization roundtrip

**Material AI Assistance Disclosure (STACK 2026 Technology Rule #4):**  
Claude and Google Gemini were utilized during development for regulatory research synthesis, deterministic rule engine unit test scaffolding, and bilingual UI refinement. All code, mathematical rules, and architectural boundaries have been implemented, verified, and tested by Team Tide Ledger.
