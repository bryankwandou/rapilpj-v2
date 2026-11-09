# RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports
**Team:** Tide Ledger  
**Case:** Case 1: Smarter Campus and Learning  
**Members:** Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio  

## 1. Problem
Student treasurers must complete an accountability report (LPJ) before faculty release subsequent event funding. Rules differ by campus: original ink stamps, meal attendance sheets, matching ledger totals, revenue stamps above Rp5,000,000 (Law 10/2020), tax withholding, and strict deadlines. Treasurers lack formal accounting training, causing rework. In our 30-cohort baseline across UB, UGM, ITS, and UAJM, raw filings averaged 3.7 mechanical defects, causing 100% of sampled submissions to face initial desk-review rejection or mandatory revisions and 7 to 14 days of funding delay.

## 2. Intended Users
Primary users are student treasurers and secretaries of department associations, BEM, and clubs. Faculty reviewers conduct desk-checks. RapiLPJ assists administrative verification and does not replace faculty authority or disburse funds.

## 3. Supporting Observations or Evidence
FIB UB requires stamped originals, meal attendance sheets, and matching totals. FEB UGM enforces a Rp10,000 stamp above Rp5,000,000 and digital scans for thermal paper. ITS departments set 7 to 10 day deadlines and itemized receipt rows. A 2021 UAJM study documents unstandardized activity reporting. FILKOM UB 2026 circulars report recurring tax withholding and completeness failures.

## 4. Proposed Solution and Core User Flow
RapiLPJ acts as a digital practice run: rejection happens on a laptop before reaching the faculty desk. The workflow follows five steps: (1) receipt upload, (2) Gemini 2.0 Flash vision extraction into structured JSON with a confidence score (below 0.85 alerts treasurers and triggers mandatory scan uploads for thermal slips), (3) side-by-side treasurer confirmation where manual changes enter a dual-record audit trail exposing overrides to reviewers, (4) client-side kernel deterministic audit checking duplicate invoices, receipt dates outside event preparation windows, rule-defined statutory stamps, and budget variance, and (5) Gemini Advisory translating findings into plain-language guidance and draft addenda for treasurer review. Faculty-approved, versioned JSON rule cards define campus-specific administrative requirements; an anchor hash detects unauthorized rule changes, while student affairs and two faculty advisors approve each version. The validated dossier is locked with a SHA-256 seal, enabling instant offline desk-checks by faculty without server round-trips. Offline manual data entry serves as a zero-network fallback.

## 5. How It Differs from Existing Alternatives
A raw LLM miscalculates arithmetic. Spreadsheets permit invalid stamps, guessed taxes, and silent edits without detection. Campus portals collect files only after submission, discovering defects too late to prevent frozen funding.

## 6. Planned Technologies
Google AI Studio and Vertex AI (Gemini 2.0 Flash Multimodal Vision and Governance Advisory), Firebase Hosting, Google Sheets compatible CSV export, client JavaScript kernel, FileReader, and Web Crypto SHA-256. Files and JSON remain strictly in client volatile memory and local .lpj files with zero cloud storage, ensuring student fiscal data privacy. WCAG 2.1 AA.

## 7. Expected Benefit and Development Plan
In a 30-cohort synthetic simulation benchmark, the kernel resolved all 112 mechanical defects (13 missing stamps, 15 thermal slips, 20 duplicate invoices) in 15.6 ms per dossier, with Gemini achieving 94.2% field-level extraction accuracy across a held-out test set of annotated receipt fields; lower-confidence fields trigger mandatory treasurer confirmation. A one-semester pilot across 20 active student organizations, tracked through faculty desk-check submission logs, targets reducing revision cycles from a baseline of 3.4 to at most 1 cycle, thereby reducing funding delays caused by preventable mechanical LPJ defects. Arithmetic never trusts the model.

## Source Acknowledgments
[1] P. Siada & A. L. Tungadi, TEMATIKA J. Penelit. Tek. Inform. Sist. Inf. UAJM, 2021, doi:10.56963/tematika.v9i1.119 (studi sistem informasi portofolio kemahasiswaan BKAM UAJM). [2] Pedoman LPJ, FIB Universitas Brawijaya, fib.ub.ac.id. [3] Prosedur Proposal & LPJ SIPRO, FEB UGM & UU Bea Meterai No. 10/2020. [4] SOP HIMA, Desain Interior ITS, its.ac.id. [5] SOP LPJ Mahasiswa Biologi, ITS, its.ac.id. [6] Surat Edaran Mekanisme LPJ Ormawa, FILKOM UB, 2026.
