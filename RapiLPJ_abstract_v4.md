# RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports
**Team:** Tide Ledger  
**Case:** Case 1: Smarter Campus and Learning  
**Members:** Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio  

## 1. Problem
Student treasurers file accountability reports (LPJ) before faculty move subsequent proposals. Rules differ by campus: original stamps, one attendance sheet per meal, identical totals, a revenue stamp only when nominal exceeds Rp5,000,000 (Law 10/2020 Art. 3), withholding, and strict deadlines. At FILKOM UB, late or incomplete reports delay proposals. Treasurers lack formal accounting training, spending hours on mechanical rework. Revision rates remain unmeasured; establishing that count is our first validation metric, not an unverified claim.

## 2. Intended Users
Primary users are treasurers and secretaries of program associations, BEM, and clubs. The faculty desk reviewer reads the output. They are not a second product: RapiLPJ checks a file and does not release money.

## 3. Supporting Observations or Evidence
FIB UB requires stamped originals, one attendance sheet per meal session, and matching totals. FEB UGM requires a Rp10,000 stamp above Rp5,000,000 and a scan when thermal paper fades. An ITS department sets ten days; ITS Biology wants one line per receipt with tax included. A 2021 UAJM study describes unstandardized activity documentation. FILKOM UB’s 2026 circular records repeated withholding and completeness failures.

## 4. Proposed Solution and Core User Flow
RapiLPJ is a practice run before submission. First, perceive: Gemini Flash on Vertex AI (Singapore) extracts vendor, date, invoice number, nominal, and stamp presence as JSON without arithmetic. Fields sit beside the slip; human changes enter an edit disclosure log. Offline Indonesian fixtures run without API keys. Second, a client-side kernel flags duplicate invoices, out-of-window dates, missing stamps above Rp5,000,000, and variances above 10 percent. Meal caps and PPh 21 use only a rule card signed by two advisors; missing rates return 'preset gap' without inventing figures. Third, export unlocks only when a micro-quiz matches the statutory key—exactly Rp5,000,000 is not dutiable; above is—and a variance addendum is completed via fixed template. Fourth, export yields a dossier with SHA-256 over confirmed ledger, edit log, quiz, addendum, and finding IDs, which verifiers recompute locally.

## 5. How It Differs from Existing Alternatives
A raw LLM mis-adds. A spreadsheet does not bind a hash, cite the statute, or lock export. Campus portals collect files; they do not pre-audit them.

## 6. Planned Technologies
Static bilingual HTML, CSS, and JavaScript on Firebase Hosting, no application database. Open JavaScript kernel, FileReader, a .lpj JSON file, and Web Crypto SHA-256. WCAG 2.1 AA.

## 7. Expected Benefit and Development Plan
The semifinal benchmarks single-activity intake: perception, confirmation, signed card, quiz, and desk-check. Final Day adds multi-slip batching and QR re-checks. With 30 treasurers and 2 advisors we evaluate minutes to a clean dossier, mechanical defects resolved, fields corrected post-perception, and quiz retention without on-screen cues. The primary risk is misread thermal slips; human confirmation plus edit logging provides control. Arithmetic never trusts the model.

## Source Acknowledgments
[1] P. Siada & A. L. Tungadi, TEMATIKA J. Penelit. Tek. Inform. Sist. Inf. UAJM, 2021, doi:10.56963/tematika.v9i1.119 (studi sistem informasi portofolio kemahasiswaan BKAM UAJM). [2] Pedoman LPJ, FIB Universitas Brawijaya, fib.ub.ac.id. [3] Prosedur Proposal & LPJ SIPRO, FEB UGM & UU Bea Meterai No. 10/2020. [4] SOP HIMA, Desain Interior ITS, its.ac.id. [5] SOP LPJ Mahasiswa Biologi, ITS, its.ac.id. [6] Surat Edaran Mekanisme LPJ Ormawa, FILKOM UB, 2026.
