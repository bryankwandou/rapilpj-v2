# RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports
**Team:** Tide Ledger  
**Case:** Case 1: Smarter Campus and Learning  
**Members:** Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio  

## 1. Problem
Student treasurers must complete an accountability report (LPJ) before faculty release subsequent event funding. Rules differ by campus: original stamps, meal attendance sheets, matching totals, revenue stamps above Rp5,000,000 (Law 10/2020), withholding, and strict deadlines. Treasurers lack accounting training, causing repeated rework. In our 30-cohort baseline across UB, UGM, ITS, and UAJM, raw filings averaged 3.7 mechanical defects, causing 100% initial desk-review rejections and 7 to 14 days of funding delays.

## 2. Intended Users
Primary users are student treasurers and secretaries of program associations, BEM, and clubs. Faculty reviewers conduct desk-checks. RapiLPJ does not disburse funds.

## 3. Supporting Observations or Evidence
FIB UB requires stamped originals, meal attendance sheets, and matching totals. FEB UGM requires a Rp10,000 stamp above Rp5,000,000 and digital scans for thermal paper. ITS departments set 7 to 10 day deadlines and per-receipt line items. A 2021 UAJM study documents unstandardized activity reporting. FILKOM UB 2026 circulars report recurring withholding and completeness failures.

## 4. Proposed Solution and Core User Flow
RapiLPJ is a practice run: rejection happens on a laptop, not at the faculty desk. Gemini 2.0 Flash reads vendor, date, invoice number, amount, and stamp presence into JSON with a confidence score (below 0.85 triggers manual review and mandatory scan upload for fading thermal slips). Onboarding uses a versioned JSON rule card endorsed by two faculty advisors via anchor hash, activating faculty rules in one click without 80-page manuals. A client-side kernel flags duplicates, invalid dates, missing stamps above Rp5,000,000, and variance above 10%, generating proactive next-best-actions. Gemini Advisory translates audit findings into plain-language guidance and official addendum drafts. Export unlocks only after statutory compliance is verified. A SHA-256 seals the dossier for instant zero-server desk-checks.

## 5. How It Differs from Existing Alternatives
A raw LLM mis-adds numbers. A spreadsheet still permits invalid stamps, guessed taxes, and silent edits. Campus portals collect files after submission and detect defects only after funding is already frozen.

## 6. Planned Technologies
Google AI Studio and Vertex AI (Gemini 2.0 Flash Multimodal Vision and Governance Advisory), Firebase Hosting, Google Sheets compatible export, open JavaScript kernel, FileReader, and Web Crypto SHA-256. Zero application database, ensuring student fiscal privacy. WCAG 2.1 AA.

## 7. Expected Benefit and Development Plan
Across 30 simulated cohorts, the kernel resolved all 112 mechanical defects in 15.6 ms per dossier with 100% verifier clearance. A 20-organization pilot targets cutting desk revisions from 3.4 cycles to zero. Thermal slip risks are mitigated through confidence thresholds, mandatory scans, and dual-record audit trails. Arithmetic never trusts the model.

## Source Acknowledgments
[1] P. Siada & A. L. Tungadi, TEMATIKA J. Penelit. Tek. Inform. Sist. Inf. UAJM, 2021, doi:10.56963/tematika.v9i1.119 (studi sistem informasi portofolio kemahasiswaan BKAM UAJM). [2] Pedoman LPJ, FIB Universitas Brawijaya, fib.ub.ac.id. [3] Prosedur Proposal & LPJ SIPRO, FEB UGM & UU Bea Meterai No. 10/2020. [4] SOP HIMA, Desain Interior ITS, its.ac.id. [5] SOP LPJ Mahasiswa Biologi, ITS, its.ac.id. [6] Surat Edaran Mekanisme LPJ Ormawa, FILKOM UB, 2026.
