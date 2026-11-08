# RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports
**Team:** Tide Ledger  
**Case:** Case 1: Smarter Campus and Learning  
**Members:** Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio  

## 1. Problem
Student treasurers must finish an accountability report (LPJ) before the faculty moves the organization's next proposal. Those proposals fund the workshops and peer learning the organization runs. Rules differ by campus: original stamps, one attendance sheet per meal, identical totals, a revenue stamp only above Rp5,000,000 (Law 10/2020 Art. 3), withholding, and short deadlines. At FILKOM UB, a late or incomplete LPJ is returned and can delay or reject that next proposal. Treasurers rarely have accounting training, so study hours go into rework. Revision frequency has not been measured. That count is our first metric, not a claim.

## 2. Intended Users
Primary users are treasurers and secretaries of program associations, BEM, and clubs. The faculty reviewer reads the file. RapiLPJ does not release funds.

## 3. Supporting Observations or Evidence
FIB UB requires stamped originals, one attendance sheet per meal session, and matching totals. FEB UGM requires a Rp10,000 stamp above Rp5,000,000 and a scan when thermal paper fades. An ITS department sets ten days; ITS Biology requires one line per receipt with tax included. A 2021 UAJM study describes unstandardized activity documentation. FILKOM UB's 2026 circular records repeated withholding and completeness failures.

## 4. Proposed Solution and Core User Flow
RapiLPJ is a practice run: rejection happens on a laptop, not at the faculty desk. Gemini Flash on Vertex AI (Singapore) reads vendor, date, invoice number, nominal, and stamp presence into JSON and does no arithmetic. The treasurer confirms each field beside the slip. Every change stays in an edit log. Offline fixtures need no API key. A client-side kernel flags duplicate invoices, dates outside the activity window, a missing or wrong stamp above Rp5,000,000, and variance above 10 percent. Meal caps and PPh 21 come only from a rule card to be signed by two advisors. A missing rate returns preset gap and names what to ask the faculty, instead of a guessed tax that would be rejected. Export stays locked until one question matches the statute — exactly Rp5,000,000 is not dutiable; above it is — and any variance is written on a fixed template. A SHA-256 covers the confirmed ledger, edit log, quiz, addendum, and finding ids. The verifier recomputes it. The hash only shows the file was not changed after the checks.

## 5. How It Differs from Existing Alternatives
A raw LLM mis-adds. A spreadsheet can list the same rules and still export a wrong stamp, a guessed tax, or a silent edit. Campus portals collect files after submission and miss the defect before the next proposal is frozen.

## 6. Planned Technologies
Static bilingual HTML, CSS, and JavaScript on Firebase Hosting. No application database. Open JavaScript kernel, FileReader, a .lpj JSON file, and Web Crypto SHA-256. WCAG 2.1 AA.

## 7. Expected Benefit and Development Plan
The semifinal is one activity: perception, confirmation, rule card, quiz, and desk-check. Final Day adds several slips and a QR re-check. With 30 treasurers and 2 advisors we measure minutes to a clean dossier, defects before and after the kernel, fields corrected after perception, and whether the statutory key is remembered unaided. The main risk is a misread thermal slip. Confirmation and the edit log are the control. Arithmetic never trusts the model.

## Source Acknowledgments
[1] P. Siada & A. L. Tungadi, TEMATIKA J. Penelit. Tek. Inform. Sist. Inf. UAJM, 2021, doi:10.56963/tematika.v9i1.119 (studi sistem informasi portofolio kemahasiswaan BKAM UAJM). [2] Pedoman LPJ, FIB Universitas Brawijaya, fib.ub.ac.id. [3] Prosedur Proposal & LPJ SIPRO, FEB UGM & UU Bea Meterai No. 10/2020. [4] SOP HIMA, Desain Interior ITS, its.ac.id. [5] SOP LPJ Mahasiswa Biologi, ITS, its.ac.id. [6] Surat Edaran Mekanisme LPJ Ormawa, FILKOM UB, 2026.
