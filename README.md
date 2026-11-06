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

RapiLPJ eliminates the classic trade-off between AI hallucinations in financial math and the rigid manual friction of traditional spreadsheets:

```
[Raw Receipt Photos / Scans]        [Campus Bylaw PDFs (SOP 40+ hal)]
             |                                      |
             v                                      v
+-------------------------------+      +-------------------------------+
| Tier 1: Gemini Vision Agent   |      | Tier 2: Bylaw Compiler Agent  |
| - OCR Handwriting & Thermal   |      | - Long Context PDF Ingestion  |
| - Detect Store Wet Stamp      |      | - Statutory Policy-as-Code    |
| - Detect Rp10.000 Meterai     |      | - Schema: Active Campus Rules |
+-------------------------------+      +-------------------------------+
             |                                      |
             +------------------+-------------------+
                                |
                                v
               +----------------------------------+
               | Tier 3: Deterministic Kernel     |
               | - Zero-Tolerance Arithmetic      |
               | - Duplicate Invoice Hashing      |
               | - Date Sanity Bounds             |
               | - Budget Variance (>10%) Bounds  |
               | - Attendance-to-Meal Matching    |
               +----------------------------------+
                                |
                                v
               +----------------------------------+
               | Tier 4: Governance Co-Pilot      |
               | - Pedagogical Financial Coaching |
               | - Auto-Drafted Addendum Letters  |
               | - Verifiable SHA-256 Attestation |
               +----------------------------------+
```

1. **Tier 1: Multimodal Ingestion Agent (Gemini Flash Multimodal):**
   - Automatically transcribes crumpled thermal receipts, printed tax invoices, and handwritten vendor slips.
   - Visually verifies physical compliance markers: store wet stamps, Rp10.000 revenue seals, and thermal paper tags.
   - Maps line items semantically to approved budget categories in the Budget Plan (RAB), eliminating 100% of manual transcription typing.

2. **Tier 2: Statutory Bylaw-to-Code Compiler Agent (Gemini Long Context):**
   - Ingests unstructured 40-page campus guideline PDFs.
   - Extracts statutory rules (deadlines, allowable variance percentages, mandatory documents, and tax rates) into executable declarative JSON schemas.

3. **Tier 3: Sandboxed Deterministic Verification Kernel:**
   - 100% deterministic, client-side, zero-hallucination arithmetic.
   - Reconciles endorsement totals, expense sums, and receipt tallies.
   - Detects duplicate invoice numbers via hash set lookup.
   - Verifies Law No. 10 of 2020 on Stamp Duty for receipts $\ge$ Rp5.000.000.

4. **Tier 4: Governance & Remediation Co-Pilot (Gemini Pedagogical Agent):**
   - Acts as an educational mentor for student leaders, explaining financial governance rationales.
   - Autonomously drafts official **Surat Permohonan Addendum Pergeseran Anggaran** formatted to university standards when budget variance thresholds are exceeded.
   - Generates an immutable **SHA-256 Cryptographic Attestation Hash** to certify audit integrity for university audit staff.

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

