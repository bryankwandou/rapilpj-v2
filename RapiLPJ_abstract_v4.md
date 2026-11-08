# RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports
**Team:** Tide Ledger  
**Case:** Case 1: Smarter Campus and Learning  
**Members:** Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio  

## 1. Problem
Untrained student club officers manage campus activity budgets without accounting training, navigating complex faculty bylaws: physical stamps, balanced ledgers, meal-attendance ratios, revenue stamps over Rp5,000,000 (Law 10/2020), and strict deadlines. FILKOM UB circulars record that incomplete reports delay subsequent event disbursements [6], locking student activities in administrative revision loops instead of fostering experiential fiscal learning.

## 2. Intended Users
Primary users: student club and council (BEM) treasurers and secretaries collaborating on expense tracking and attendance logs across annual leadership transitions. Secondary users: faculty student affairs verifiers (Biro Kemahasiswaan, student auditors) conducting pre-disbursement desk reviews to log audit trails without releasing funds.

## 3. Supporting Observations or Evidence
Siada and Tungadi (2021) document unstandardized activity documentation and manual records at BKAM UAJM [1]. Faculty guidelines diverge: UB mandates physical stamps and balanced ledgers [2]; UGM enforces Rp10,000 stamps above Rp5,000,000 under Law 10/2020 and thermal photocopies [3]; ITS enforces 10-day deadlines [4] and taxes [5]; FILKOM UB notes late submissions freeze funding [6].

## 4. Proposed Solution and Core User Flow
RapiLPJ transforms administrative friction into an experiential fiscal learning loop. (1) Perceive & Confirm: Gemini Flash parses receipts into JSON without arithmetic; treasurers verify fields, logging manual changes in an edit disclosure log for faculty review. (2) Deterministic Kernel: Evaluates rules against an advisor-signed UAJM rule card whose reference hash is published out-of-band by faculty, enabling verifiers to detect unauthorized parameter alterations; missing card rates return 'preset gap'. (3) Gated Fiscal Learning: Infractions trigger interactive statutory learning modules (Law 10/2020, archival durability) that gate export until treasurers solve conceptual quizzes; templates draft variance addenda deterministically. (4) Desk-Check File: Export yields an indexed PDF dossier and SHA-256 hash. Verifiers check hashes against the external card reference, inspect disclosed edits, and record clearance recommendations into .lpj files without releasing funds.

## 5. How It Differs from Existing Alternatives
Generic LLMs hallucinate financial arithmetic, while campus forms merely collect completed files without pedagogical feedback. RapiLPJ maintains an unbreachable division: Gemini handles perceptual intake, humans verify figures, while compliance rules, educational quiz keys, and variance addenda execute deterministically client-side.

## 6. Planned Technologies
Perception & Architecture: Firebase Hosting serves static assets; a Firebase Cloud Function with App Check manages IAM credentials to query Vertex AI Gemini Flash in Singapore (asia-southeast1) under institutional non-training terms, paired with local Indonesian receipt fixtures for zero-setup evaluation. Kernel: client-side JavaScript, locked templates, FileReader, .lpj JSON, and SHA-256, targeting WCAG 2.1 AA accessibility.

## 7. Expected Benefit and Development Plan
The pilot plan evaluates 30 treasurers and 2 UAJM advisors across five metrics: preparation minutes, mechanical defects resolved pre-submission, fields corrected post-Gemini, un-gated retention quiz scores, and verifier review minutes. Semifinal benchmarks single-receipt perception, confirmation, out-of-band card checks, and local desk-reviews; Final Day targets multi-page batching and QR-linked sign-offs.

## Source Acknowledgments
[1] P. Siada & A. L. Tungadi, TEMATIKA J. Penelit. Tek. Inform. Sist. Inf. UAJM, 2021, doi:10.56963/tematika.v9i1.119 (studi sistem informasi portofolio kemahasiswaan BKAM UAJM). [2] Pedoman LPJ, FIB Universitas Brawijaya, fib.ub.ac.id. [3] Prosedur Proposal & LPJ SIPRO, FEB UGM & UU Bea Meterai No. 10/2020. [4] SOP HIMA, Desain Interior ITS, its.ac.id. [5] SOP LPJ Mahasiswa Biologi, ITS, its.ac.id. [6] Surat Edaran Mekanisme LPJ Ormawa, FILKOM UB, 2026.
