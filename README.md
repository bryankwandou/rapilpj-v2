# RapiLPJ v2 — Neuro-Symbolic Pre-Submission Audit for Student Activity Reports

**Team Name:** Tide Ledger  
**Event:** STACK 2026 by GDGoC ITB  
**Selected Case:** Case 1: Smarter Campus and Learning  
**Members:** Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio  
**Live Production URL (Clean):** https://rapilpj-v2.vercel.app  
**Interactive Demo & Sample Mode:** https://rapilpj-v2.vercel.app/demo  
**Repository:** https://github.com/bryankwandou/rapilpj-v2  

---

## 1. Problem & Case 1 Relevance

Student organization treasurers and secretaries across Indonesian universities are required to submit an activity accountability report (*Laporan Pertanggungjawaban* / LPJ) before subsequent event funding is disbursed. When reports contain preventable administrative or arithmetic errors, faculty offices reject or delay review. This freezes student project funding, forces committee members to spend hours on mechanical recalculations, and stalls extracurricular student learning and campus initiatives.

RapiLPJ acts as an automated pre-submission gatekeeper: a neuro-symbolic audit pipeline that couples the multimodal perceptual agility of **Agentic Gemini** with a **Zero-Tolerance Deterministic Verification Kernel**.

---

## 2. Neuro-Symbolic Agentic Architecture

RapiLPJ eliminates the classic trade-off between AI hallucinations in financial math and the rigid manual friction of traditional spreadsheets by establishing an unbreachable division of labor:

```
[Pengurus Ormawa / Bendahara]
             |
             +---------------------------------------+
             |                                       |
             v                                       v
+-----------------------------------+   +-----------------------------------+
| 1. DETERMINISTIC AUDIT KERNEL     |   | 2. AI GOVERNANCE CO-PILOT         |
|    (Open-Source Browser Engine)   |   |    (Agentic Gemini Consultant)    |
|-----------------------------------|   |-----------------------------------|
| - 100% Browser RAM execution      |   | - Mentors students on BPK rules   |
| - Zero arithmetic hallucinations  |   | - Explains why infractions occur  |
| - Law No. 10/2020 revenue stamps  |   | - Auto-drafts official Addendums  |
| - Duplicate invoice collisions    |   | - PPh tax compliance advice       |
| - Budget variance (>10%) bounds   |   | - NEVER touches financial math    |
| - Verifiable SHA-256 attestation  |   | - Invoked strictly on-demand      |
+-----------------------------------+   +-----------------------------------+
             |                                       |
             v                                       v
[Hasil Audit & Segel Hash SHA-256]      [Draf Surat Addendum Siap Cetak]
```

1. **Client-Side Open-Source Execution Kernel:**
   - 100% deterministic mathematical execution running in client JavaScript memory.
   - Reconciles endorsement totals, budget plan items (RAB), and actual expenses without server latency.
   - Detects duplicate invoice numbers through SHA-256 / hash map indexing.
   - Verifies statutory rules: Law No. 10 of 2020 on Stamp Duty ($\ge$ Rp5.000.000), thermal fading receipt warnings, and attendance-to-meal session matching.

2. **Agentic Gemini Governance Consultant (Advisory Layer):**
   - Serves as an interactive mentor in fiscal governance and university bylaws.
   - When budget variances or document shortages occur, Gemini analyzes the statutory root cause (BPK and university standards) and autonomously drafts the formal **Surat Permohonan Addendum Pergeseran Anggaran** ready for committee and faculty advisor signatures.
   - **Crucial Rule:** The AI Agent never computes financial arithmetic; it operates strictly as a governance advisor and document synthesizer.

3. **Guaranteed Client Privacy (Zero-Storage Architecture):**
   - Deployed as a static frontend on Vercel CDN without any backend database (no MySQL, MongoDB, Firebase, or external database storage).
   - Financial data remains strictly in the user's browser memory (*runtime RAM*). Zero tracking, zero data retention.

---

## 3. Supported Faculty Rule Sets & Standards

1. **BKAM Universitas Atma Jaya Makassar** — Empirical baseline from home campus faculty research ([Siada & Tungadi, TEMATIKA UAJM 2021, DOI: 10.56963/tematika.v9i1.119](https://doi.org/10.56963/tematika.v9i1.119)).
2. **FIB Universitas Brawijaya** — Original receipt seals, attendance lists per consumption session, exact total reconciliation ([Pedoman LPJ FIB UB](https://fib.ub.ac.id/wp-content/uploads/2024/03/PEDOMAN-LAPORAN-PERTANGGUNG-JAWABAN.pdf)).
3. **FEB Universitas Gadjah Mada** — Revenue stamp on receipts $\ge$ Rp5.000.000, scanning fading thermal receipts ([Prosedur SIPRO FEB UGM](https://bpm.feb.ugm.ac.id/wp-content/uploads/sites/1535/2021/09/DONE-Prosedur-Pengajuan-Proposal-dan-LPJ-ke-SIPRO.pdf)).
4. **HIMA Desain Interior ITS** — 10-calendar-day submission deadline ([SOP HIMA Interior ITS](https://www.its.ac.id/interior/wp-content/uploads/sites/37/2018/10/SOP-HIMA.pdf)).
5. **Biologi ITS** — Single-receipt line entry, tax inclusion ([SOP LPJ Biologi ITS](https://its.ac.id/biologi/wp-content/uploads/sites/21/2024/09/SOP-Laporan-Pertanggung-Jawaban-Kegiatan-Mahasiswa-Biologi.pdf)).
6. **FILKOM Universitas Brawijaya (2026)** — 7-working-day deadline, mandatory document checklist, honorarium PPh & recipient ID verification ([SE LPJ FILKOM UB 2026](https://filkom.ub.ac.id/wp-content/uploads/2026/04/SK-F15-01678-SURAT-EDARAN-MEKANISME-PENGAJUAN-PROPOSAL-DAN-LAPORAN-PERTANGGUNGJAWABAN-LPJ-KEGIATAN-ORGANISASI-MAHASISWA-FAKULTAS-ILMU-KOMPUTER-UNIVERSITAS-BRAWIJAYA.pdf)).
7. **Standar Nasional Ormawa & UU Bea Meterai No. 10 Tahun 2020** — National statutory baseline.

---

## 4. Verification & Testing

Run unit tests locally:

```bash
node test.js
```

All 12 deterministic unit tests verify arithmetic integrity, duplicate detection, variance bounds, and SHA-256 cryptographic attestation.

