# RapiLPJ v2 — Pre-Submission Audit for Student Organization Activity Reports

**Team Name:** Tide Ledger  
**Event:** STACK 2026 by GDGoC ITB  
**Selected Case:** Case 1: Smarter Campus and Learning  
**Members:** Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio  
**Live Production URL:** https://rapilpj.vercel.app  
**Repository:** https://github.com/bryankwandou/rapilpj

---

## 1. Problem & Case 1 Relevance

Student organization treasurers and secretaries across Indonesian universities are required to submit an activity accountability report (*Laporan Pertanggungjawaban* / LPJ) before subsequent event funding is disbursed. When reports contain preventable administrative or arithmetic errors, faculty offices reject or delay review. This freezes student project funding, forces committee members to spend hours on mechanical recalculations, and stalls extracurricular student learning and inter-campus collaborations.

RapiLPJ acts as an automated pre-submission gatekeeper: a zero-latency, client-side web auditor that enforces faculty administrative rules and statutory compliance before submission.

---

## 2. Core Features (Version 2)

- **Deterministic Machine Arithmetic:**
  - Automated reconciliation between Endorsement Sheet Total (*Lembar Pengesahan*), Budget Plan (*RAB*), and Realized Receipts.
  - Duplicate Invoice/Reference Number Collision Detection.
  - Date sanity boundary checks (receipt dates exceeding submission timeline or preparation window).
  - Over-budget shifting tolerance checker (flags line items exceeding allowable % threshold without an addendum).
  - Unplanned category detection (receipts logged outside approved RAB lines).
  - Revenue stamp (*Meterai* Rp10.000) statutory requirement verification for receipts $\ge$ Rp5.000.000 (Law No. 10 of 2020).
  - Thermal receipt fading checks with local in-browser photo/scan verification.
  - Meal session count vs attendance sheet count mismatch calculation.
  - Working days calculation (e.g. FILKOM UB 7-working-day deadline) vs calendar days (ITS 10-day deadline).
- **Zero Privacy Leakage:** 100% runs in the browser. Zero server uploads, zero database storage, zero tracking.
- **Bilingual Support (ID / EN):** One-click toggle between Bahasa Indonesia (for student treasurers) and English (for competition pitch & jury inspection).
- **Export & Print:** Instant CSV audit sheet export and printable clean review summary.

---

## 3. Supported Faculty Rule Sets & Standards

1. **FIB Universitas Brawijaya** — Original receipt seals, attendance lists per consumption session, exact total reconciliation ([Pedoman LPJ FIB UB](https://fib.ub.ac.id/wp-content/uploads/2024/03/PEDOMAN-LAPORAN-PERTANGGUNG-JAWABAN.pdf)).
2. **FEB Universitas Gadjah Mada** — Revenue stamp on receipts $\ge$ Rp5.000.000, scanning fading thermal receipts ([Prosedur SIPRO FEB UGM](https://bpm.feb.ugm.ac.id/wp-content/uploads/sites/1535/2021/09/DONE-Prosedur-Pengajuan-Proposal-dan-LPJ-ke-SIPRO.pdf)).
3. **HIMA Desain Interior ITS** — 10-calendar-day submission deadline ([SOP HIMA Interior ITS](https://www.its.ac.id/interior/wp-content/uploads/sites/37/2018/10/SOP-HIMA.pdf)).
4. **Biologi ITS** — Single-receipt line entry, tax inclusion ([SOP LPJ Biologi ITS](https://its.ac.id/biologi/wp-content/uploads/sites/21/2024/09/SOP-Laporan-Pertanggung-Jawaban-Kegiatan-Mahasiswa-Biologi.pdf)).
5. **FILKOM Universitas Brawijaya (2026)** — 7-working-day deadline, mandatory document checklist, honorarium PPh & recipient ID verification ([SE LPJ FILKOM UB 2026](https://filkom.ub.ac.id/wp-content/uploads/2026/04/SK-F15-01678-SURAT-EDARAN-MEKANISME-PENGAJUAN-PROPOSAL-DAN-LAPORAN-PERTANGGUNGJAWABAN-LPJ-KEGIATAN-ORGANISASI-MAHASISWA-FAKULTAS-ILMU-KOMPUTER-UNIVERSITAS-BRAWIJAYA.pdf)).
6. **Standar Nasional Ormawa & UU Bea Meterai No. 10 Tahun 2020** — National statutory baseline.
7. **Custom Ruleset** — Fully configurable toggles.

---

## 4. Verification & Testing

Run unit tests locally:

```bash
node test.js
```
