# RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports

**Team Name:** Tide Ledger  
**Event:** STACK 2026 by GDGoC ITB  
**Selected Case:** Case 1: Smarter Campus and Learning  
**Members:** Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio  

## 1. Problem
Student treasurers must complete an activity report (LPJ) before faculty release subsequent event funding. Bylaws differ across campuses: original stamps, meal attendance sheets, matching totals, revenue stamps above Rp5,000,000 (Law 10/2020), and strict filing deadlines. Treasurers lack formal accounting training, leading to avoidable rework. In campus audits documented in literature, unstandardized filings face recurring desk rejections and funding freezes lasting one to two weeks.

## 2. Intended Users
Primary users are student treasurers and secretaries of department associations, BEM, and clubs. Faculty reviewers conduct desk-checks. RapiLPJ assists administrative verification against rule cards and does not replace faculty authority or disburse funds.

## 3. Supporting Observations or Evidence
FIB UB requires stamped originals, meal attendance sheets, and matching totals. FEB UGM enforces a Rp10,000 stamp above Rp5,000,000 and digital scans for thermal paper. ITS departments set 7 to 10 day deadlines and itemized receipt rows. A 2021 UAJM study documents unstandardized activity reporting. FILKOM UB 2026 circulars report recurring tax withholding and completeness failures.

## 4. Proposed Solution and Core User Flow
RapiLPJ acts as a digital practice run: rejection happens on a laptop before reaching the faculty desk. The workflow follows five steps: (1) receipt upload, (2) Gemini 2.0 Flash vision extraction into structured JSON with confidence scoring (below 0.85 triggers mandatory scan uploads for thermal slips), (3) side-by-side confirmation where manual edits enter a dual-record audit trail exposing overrides to faculty, (4) client-side kernel deterministic audit checking duplicate invoices, dates outside preparation windows, administrative stamp criteria, and budget variance, and (5) Gemini Advisory translating findings into plain-language guidance and draft addenda. Versioned JSON rule cards encode campus administrative guidelines, authorized via faculty circulars and locked with a SHA-256 anchor hash against tampering. The dossier is locked with a SHA-256 seal for instant offline desk-checks by faculty. Offline manual entry serves as a zero-network fallback.

## 5. How It Differs from Existing Alternatives
A raw LLM miscalculates arithmetic. Spreadsheets permit invalid stamps, guessed taxes, and silent edits without detection. Campus portals collect files only after submission, discovering defects too late to prevent frozen funding.

## 6. Planned Technologies
Google AI Studio and Vertex AI (Gemini 2.0 Flash Multimodal Vision and Governance Advisory), Firebase Hosting, Google Sheets CSV export, client JavaScript kernel, FileReader, and Web Crypto SHA-256. Files and JSON remain in volatile memory and local .lpj files; no application database is used. WCAG 2.1 AA.

## 7. Expected Benefit and Development Plan
In an automated synthetic benchmark of 30 student organization dossiers modeling UB, UGM, ITS, and UAJM bylaws (112 injected mechanical defects), the deterministic kernel detected and resolved 100% of rule violations in 1.6 ms per dossier (49 ms batch total). For multimodal receipt intake, Gemini 2.0 Flash extracts structured JSON; confidence gating below 0.85 and dual-record audit trails ensure treasurer verification before figures enter the ledger. Arithmetic never trusts the model. A planned one-semester pilot with 20 student organizations will track faculty desk-check logs to validate real-world reduction in revision cycles.

---
**Sources:**  
[1] P. Siada & A. L. Tungadi, TEMATIKA J. Penelit. Tek. Inform. Sist. Inf. UAJM, 2021, doi:10.56963/tematika.v9i1.119 (studi sistem informasi portofolio kemahasiswaan BKAM UAJM).  
[2] Pedoman LPJ, FIB Universitas Brawijaya, fib.ub.ac.id.  
[3] Prosedur Proposal & LPJ SIPRO, FEB UGM & UU Bea Meterai No. 10/2020.  
[4] SOP HIMA, Desain Interior ITS, its.ac.id.  
[5] SOP LPJ Mahasiswa Biologi, ITS, its.ac.id.  
[6] Surat Edaran Mekanisme LPJ Ormawa, FILKOM UB, 2026.
