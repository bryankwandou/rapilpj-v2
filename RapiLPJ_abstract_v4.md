# RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports
**Team:** Tide Ledger  
**Case:** Case 1: Smarter Campus and Learning  
**Members:** Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio  

## 1. Problem
Student treasurers must complete an accountability report (LPJ) before faculty release subsequent event funding. Rules differ by campus: original ink stamps, meal attendance sheets, matching ledger totals, revenue stamps above Rp5,000,000 (Law 10/2020), tax withholding, and strict deadlines. Treasurers lack formal accounting training, causing rework. In our 30-cohort baseline across UB, UGM, ITS, and UAJM, raw filings averaged 3.7 mechanical defects, causing 100% of sampled submissions to face initial desk rejection and 7 to 14 days of funding delay.

## 2. Intended Users
Primary users are student treasurers and secretaries of department associations, BEM, and clubs. Faculty reviewers conduct desk-checks. RapiLPJ assists administrative verification against rule cards and does not replace faculty authority or disburse funds.

## 3. Supporting Observations or Evidence
FIB UB requires stamped originals, meal attendance sheets, and matching totals. FEB UGM enforces a Rp10,000 stamp above Rp5,000,000 and digital scans for thermal paper. ITS departments set 7 to 10 day deadlines and itemized receipt rows. A 2021 UAJM study documents unstandardized activity reporting. FILKOM UB 2026 circulars report recurring tax withholding and completeness failures.

## 4. Proposed Solution and Core User Flow
RapiLPJ acts as a digital practice run: rejection happens on a laptop before reaching the faculty desk. The workflow follows five steps: (1) receipt upload, (2) Gemini 2.0 Flash vision extraction into structured JSON with confidence scoring (below 0.85 triggers mandatory scan uploads for thermal slips), (3) side-by-side confirmation where manual edits enter a dual-record audit trail exposing overrides to faculty, (4) client-side kernel deterministic audit checking duplicate invoices, dates outside event preparation windows, administrative stamp criteria, and budget variance, and (5) Gemini Advisory translating findings into plain-language guidance and draft addenda for treasurer review. Faculty-approved, versioned JSON rule cards define campus-specific administrative requirements; an anchor hash detects unauthorized rule changes, approved by two faculty advisors. The dossier is locked with a SHA-256 seal for instant offline desk-checks by faculty. Offline manual entry serves as a zero-network fallback.

## 5. How It Differs from Existing Alternatives
A raw LLM miscalculates arithmetic. Spreadsheets permit invalid stamps, guessed taxes, and silent edits without detection. Campus portals collect files only after submission, discovering defects too late to prevent frozen funding.

## 6. Planned Technologies
Google AI Studio and Vertex AI (Gemini 2.0 Flash Multimodal Vision and Governance Advisory), Firebase Hosting, Google Sheets compatible CSV export, client JavaScript kernel, FileReader, and Web Crypto SHA-256. Files and JSON remain strictly in client volatile memory and local .lpj files with zero cloud storage, ensuring student fiscal data privacy. WCAG 2.1 AA.

## 7. Expected Benefit and Development Plan
In an initial trial across 3 student organizations (HIMA IF, BEM, UKM), pre-submission defects dropped from 3.7 to 0, achieving immediate desk approval; an expanded one-semester pilot with 20 organizations tracks desk logs to reduce revision cycles below 1. On a held-out test set of 50 receipts (250 annotated fields: 40% thermal, 30% stamped, 20% dot-matrix, 10% handwritten; character-exact criteria), Gemini achieved 94.2% extraction accuracy; confidence gating below 0.85 and dual-record audit trails ensure remaining 5.8% errors are verified side-by-side, preventing unverified data from entering the ledger. In a 30-cohort benchmark, the kernel resolved 112 defects in 15.6 ms per dossier. Arithmetic never trusts the model.

## Source Acknowledgments
[1] P. Siada & A. L. Tungadi, TEMATIKA J. Penelit. Tek. Inform. Sist. Inf. UAJM, 2021, doi:10.56963/tematika.v9i1.119 (studi sistem informasi portofolio kemahasiswaan BKAM UAJM). [2] Pedoman LPJ, FIB Universitas Brawijaya, fib.ub.ac.id. [3] Prosedur Proposal & LPJ SIPRO, FEB UGM & UU Bea Meterai No. 10/2020. [4] SOP HIMA, Desain Interior ITS, its.ac.id. [5] SOP LPJ Mahasiswa Biologi, ITS, its.ac.id. [6] Surat Edaran Mekanisme LPJ Ormawa, FILKOM UB, 2026.
