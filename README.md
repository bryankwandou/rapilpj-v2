# RapiLPJ v2 — Neuro-Symbolic Pre-Submission Audit & PDF Dossier Compiler for Student Activity Reports

**Team Name:** Tide Ledger  
**Event:** STACK 2026 by GDGoC ITB  
**Selected Case:** Case 1: Smarter Campus and Learning  
**Members:** Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio  
**Live Production URL (Clean Workspace):** https://rapilpj-v2.vercel.app  
**Interactive Sandbox & Sample Mode:** https://rapilpj-v2.vercel.app/demo  
**Repository:** https://github.com/bryankwandou/rapilpj-v2  

---

## 1. Problem & Case 1 Relevance

Student organization treasurers and secretaries across Indonesian universities are required to submit an activity accountability report (*Laporan Pertanggungjawaban* / LPJ) before subsequent event funding is disbursed. When reports contain preventable administrative or arithmetic errors, faculty offices reject or delay review. This freezes student project funding, forces committee members to spend hours on mechanical recalculations, and stalls extracurricular student learning and campus initiatives.

RapiLPJ acts as an automated pre-submission gatekeeper and **Audit-Driven LPJ PDF Dossier Compiler**: a neuro-symbolic pipeline that combines a **Zero-Tolerance Deterministic Verification Kernel** with an **On-Demand Fiscal Governance Co-Pilot** and an **Indexed Physical Receipt PDF Constructor**.

---

## 2. Neuro-Symbolic Architecture & STACK 2026 Rule #6 / #7 Transparency Disclosure

RapiLPJ eliminates the trade-off between AI hallucinations in financial math and the rigid manual friction of traditional spreadsheets by enforcing an unbreachable division of labor:

```
[Student Organization Treasurer / Secretary]
             |
             +---------------------------------------+
             |                                       |
             v                                       v
+-----------------------------------+   +-----------------------------------+
| 1. DETERMINISTIC AUDIT KERNEL     |   | 2. FISCAL GOVERNANCE CO-PILOT     |
|    (Open-Source Browser Engine)   |   |    (Template + Optional Gemini)   |
|-----------------------------------|   |-----------------------------------|
| - 100% Browser RAM execution      |   | - Offline Statutory Template      |
| - Zero arithmetic hallucinations  |   |   Engine (Default, 0 API Quota)   |
| - Law No. 10/2020 revenue stamps  |   | - Optional Live Gemini 2.0 Flash  |
| - Duplicate invoice collisions    |   |   API via Client BYOK             |
| - Budget variance (>10%) bounds   |   | - Auto-drafts official Addendums  |
| - Verifiable SHA-256 attestation  |   | - NEVER touches financial math    |
| - Offline .lpj draft container    |   | - Full EN / ID & Dark / Light UI  |
+-----------------------------------+   +-----------------------------------+
             |                                       |
             +-------------------+-------------------+
                                 |
                                 v
   [Compiled Multi-Page LPJ PDF Dossier + Indexed Receipt Appendix]
```

### Explicit Implementation & Simulation Disclosure (STACK 2026 General Rules #6 & #7)
1. **Completed & 100% Live Client-Side Features:**
   - **Deterministic Audit Kernel (`engine.js`):** 100% live in browser memory. Executes 15 statutory and faculty rules, working-day deadline calculations, duplicate invoice detection, budget variance reconciliation, and pure-JS SHA-256 cryptographic attestation.
   - **Offline `.lpj` Draft Export/Import & LocalStorage Crash-Guard:** 100% live. Allows treasurers to save physical `.lpj` draft files to disk and restore sessions across browser cache clears.
   - **Auto-Constructed PDF Dossier with Indexed Receipt Image Appendix:** 100% live. Embeds uploaded receipt images (`FileReader` data URLs) and physical verification badges directly into the printable multi-page PDF report.
   - **Bilingual (`EN / ID`) & Theme (`Light / Dark`) Toggles:** 100% live across both UI and audit engine output.
   - **Governance Co-Pilot (`LPJ.generateAddendumDraft` & `LPJ.callGeminiAdvisory`):** Runs out-of-the-box using the **Offline Deterministic Statutory Template Engine** (0 API quota required), and supports **Live Google Gemini 2.0 Flash API** (`generativelanguage.googleapis.com`) when a user supplies an optional client-side API key (BYOK).
2. **Simulated / Pre-Extracted Sandbox Data (`/demo`) & Final Day Roadmap:**
   - In `/demo`, clicking *"Load 3 Physical Receipt Samples (Pre-Extracted Dataset)"* loads a pre-extracted structured dataset (`LPJ.SAMPLE_GEMINI_RECEIPTS`) paired with 3 synthetic sample receipt images in `samples/` so judges can test the pipeline offline without needing an API key.
   - **Planned for Semifinal & Final Day Build Session:** Automated multi-page PDF OCR batch parsing and QR-verifiable digital advisor counter-signatures.

---

## 3. Supported Faculty Rule Sets & Empirical Sources

1. **BKAM Universitas Atma Jaya Makassar** — Empirical baseline from home campus faculty research ([Siada & Tungadi, TEMATIKA UAJM 2021, DOI: 10.56963/tematika.v9i1.119](https://doi.org/10.56963/tematika.v9i1.119)).
2. **FIB Universitas Brawijaya** — Original receipt seals, attendance lists per consumption session, exact total reconciliation ([Pedoman LPJ FIB UB](https://fib.ub.ac.id/wp-content/uploads/2024/03/PEDOMAN-LAPORAN-PERTANGGUNG-JAWABAN.pdf)).
3. **FEB Universitas Gadjah Mada** — Revenue stamp on receipts $\ge$ Rp5,000,000, scanning fading thermal receipts ([Prosedur SIPRO FEB UGM](https://bpm.feb.ugm.ac.id/wp-content/uploads/sites/1535/2021/09/DONE-Prosedur-Pengajuan-Proposal-dan-LPJ-ke-SIPRO.pdf)).
4. **HIMA Desain Interior ITS** — 10-calendar-day submission deadline ([SOP HIMA Interior ITS](https://www.its.ac.id/interior/wp-content/uploads/sites/37/2018/10/SOP-HIMA.pdf)).
5. **Biologi ITS** — Single-receipt line entry, tax inclusion ([SOP LPJ Biologi ITS](https://its.ac.id/biologi/wp-content/uploads/sites/21/2024/09/SOP-Laporan-Pertanggung-Jawaban-Kegiatan-Mahasiswa-Biologi.pdf)).
6. **FILKOM Universitas Brawijaya (2026)** — 7-working-day deadline, mandatory document checklist, honorarium PPh & recipient ID verification ([SE LPJ FILKOM UB 2026](https://filkom.ub.ac.id/wp-content/uploads/2026/04/SK-F15-01678-SURAT-EDARAN-MEKANISME-PENGAJUAN-PROPOSAL-DAN-LAPORAN-PERTANGGUNGJAWABAN-LPJ-KEGIATAN-ORGANISASI-MAHASISWA-FAKULTAS-ILMU-KOMPUTER-UNIVERSITAS-BRAWIJAYA.pdf)).
7. **National Student Organization Standard & Law No. 10 of 2020 on Stamp Duty** — National statutory baseline.

---

## 4. Verification, Testing & AI Assistance Disclosure

Run the automated test suite locally:

```bash
node test.js
```

All **15/15 deterministic unit tests** verify arithmetic integrity, duplicate detection, variance bounds, SHA-256 cryptographic attestation, `.lpj` draft roundtrip serialization, bilingual English/Indonesian audit messages, and Governance Co-Pilot fallback behavior.

**Material AI Assistance Disclosure (STACK 2026 Technology Rule #4):**  
Claude and Google Gemini were utilized during development for regulatory research synthesis, deterministic rule engine unit test scaffolding, and bilingual UI refinement. All code and mathematical rules have been verified and tested by Team Tide Ledger.
