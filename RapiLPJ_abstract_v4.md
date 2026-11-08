# RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports
**Team:** Tide Ledger  
**Case:** Case 1: Smarter Campus and Learning  
**Members:** Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio  

## 1. Problem
Untrained student treasurers manage campus funds under strict bylaws: physical stamps, balanced ledgers, meal-attendance ratios, revenue stamps over Rp5,000,000 (Law 10/2020), taxes, and deadlines. Incomplete submissions freeze campus funding and peer learning [6], trapping study hours in mechanical revisions without fiscal judgment.

## 2. Intended Users
Primary: club and BEM treasurers and secretaries (maintaining attendance and verifying figures). Secondary: faculty verifiers (Biro Kemahasiswaan, student auditors) conducting desk reviews to log audit trails without releasing funds.

## 3. Supporting Observations or Evidence
Siada and Tungadi (2021) document unstandardized activity documentation at BKAM UAJM [1]. Guidelines diverge: UB requires physical stamps and balanced ledgers [2]; UGM enforces Rp10,000 stamps above Rp5,000,000 under Law 10/2020 [3]; ITS mandates 10-day deadlines [4] and taxes [5]; FILKOM UB notes recurring withholding failures [6].

## 4. Proposed Solution and Core User Flow
RapiLPJ turns rejection into a gated practice run. (1) Perceive, then confirm. Gemini Flash extracts receipt metadata into structured JSON without arithmetic. Fields display beside images for treasurer confirmation; manual adjustments are preserved as an edit disclosure log for verifier review. (2) Deterministic kernel in portable .lpj: duplicate invoices, dates outside event windows, missing stamps over Rp5,000,000, and variances above 10%. Meal portions and PPh 21 evaluate against a rule card signed by two UAJM advisors whose reference hash is published out-of-band by faculty, preventing unilateral parameter tampering. Missing card rates return 'preset gap'; the engine never invents rates. (3) Gated literacy. Infractions lock export until micro-quizzes match statutory keys (Rp5,000,000 exactly is not dutiable; nominals above are dutiable under Law 10/2020, Art. 3). Templates draft variance addenda without LLM involvement. (4) Desk-check file, not disbursement. Export yields indexed PDF dossiers plus SHA-256 hashes binding confirmed ledgers, quizzes, and addenda. Verifiers recompute hashes locally against the out-of-band rule hash, review disclosed manual edits, and record desk-check clearance into .lpj files without releasing funds.

## 5. How It Differs from Existing Alternatives
Pure LLMs miscalculate ledgers; spreadsheets lack hash-binding, statutory checks, and quiz gates; portals merely collect files. RapiLPJ enforces a strict boundary: Gemini perceives, humans confirm figures, while arithmetic, statutory checks, quiz keys, and addenda remain 100% deterministic client-side code.

## 6. Planned Technologies
Perception: Gemini Flash on Vertex AI (Singapore, asia-southeast1) under institutional non-training terms, paired with offline Indonesian receipt fixtures for zero-setup evaluation. Kernel: open-source JavaScript, locked templates, FileReader, .lpj JSON, and SHA-256. Presentation: WCAG 2.1 AA accessible bilingual HTML5/CSS3 deployed statically on Firebase Hosting with zero application databases.

## 7. Expected Benefit and Development Plan
We evaluate 30 treasurers and 2 UAJM advisors across five metrics: treasurer minutes, mechanical defects before/after kernel, fields corrected after Gemini, un-gated retention quiz scores, and verifier minutes. Semifinal benchmarks single-receipt perception, confirmation, signed card, quiz gate, and desk-checks; Final Day delivers multi-page batching and QR re-checks.

## Source Acknowledgments
[1] P. Siada & A. L. Tungadi, TEMATIKA J. Penelit. Tek. Inform. Sist. Inf. UAJM, 2021, doi:10.56963/tematika.v9i1.119 (studi sistem informasi portofolio kemahasiswaan BKAM UAJM). [2] Pedoman LPJ, FIB Universitas Brawijaya, fib.ub.ac.id. [3] Prosedur Proposal & LPJ SIPRO, FEB UGM & UU Bea Meterai No. 10/2020. [4] SOP HIMA, Desain Interior ITS, its.ac.id. [5] SOP LPJ Mahasiswa Biologi, ITS, its.ac.id. [6] Surat Edaran Mekanisme LPJ Ormawa, FILKOM UB, 2026.
