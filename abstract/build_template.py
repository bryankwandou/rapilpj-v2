import re, html, fitz

IDENTITY = [
    ("Team name", "Tide Ledger"),
    ("Project title", "RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports"),
    ("Selected case", "Case 1: Smarter Campus and Learning"),
    ("Members", "Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio"),
]

s1 = "Untrained student club officers manage campus activity budgets without accounting training, navigating complex faculty bylaws: physical stamps, balanced ledgers, meal-attendance ratios, revenue stamps over Rp5,000,000 (Law 10/2020), and strict deadlines. FILKOM UB circulars record that incomplete reports delay subsequent event disbursements [6], locking student activities in administrative revision loops instead of fostering experiential fiscal learning."

s2 = "Primary users: student club and council (BEM) treasurers and secretaries collaborating on expense tracking and attendance logs across annual leadership transitions. Secondary users: faculty student affairs verifiers (Biro Kemahasiswaan, student auditors) conducting pre-disbursement desk reviews to log audit trails without releasing funds."

s3 = "Siada and Tungadi (2021) document unstandardized activity documentation and manual records at BKAM UAJM [1]. Faculty guidelines diverge: UB mandates physical stamps and balanced ledgers [2]; UGM enforces Rp10,000 stamps above Rp5,000,000 under Law 10/2020 and thermal photocopies [3]; ITS enforces 10-day deadlines [4] and taxes [5]; FILKOM UB notes late submissions freeze funding [6]."

s4 = "RapiLPJ transforms administrative friction into an experiential fiscal learning loop. (1) Perceive & Confirm: Gemini Flash parses receipts into JSON without arithmetic; treasurers verify fields, logging manual changes in an edit disclosure log for faculty review. (2) Deterministic Kernel: Evaluates rules against an advisor-signed UAJM rule card whose reference hash is published out-of-band by faculty, enabling verifiers to detect unauthorized parameter alterations; missing card rates return 'preset gap'. (3) Gated Fiscal Learning: Infractions trigger interactive statutory learning modules (Law 10/2020, archival durability) that gate export until treasurers solve conceptual quizzes; templates draft variance addenda deterministically. (4) Desk-Check File: Export yields an indexed PDF dossier and SHA-256 hash. Verifiers check hashes against the external card reference, inspect disclosed edits, and record clearance recommendations into .lpj files without releasing funds."

s5 = "Generic LLMs hallucinate financial arithmetic, while campus forms merely collect completed files without pedagogical feedback. RapiLPJ maintains an unbreachable division: Gemini handles perceptual intake, humans verify figures, while compliance rules, educational quiz keys, and variance addenda execute deterministically client-side."

s6 = "Perception & Architecture: Firebase Hosting serves static assets; a Firebase Cloud Function with App Check manages IAM credentials to query Vertex AI Gemini Flash in Singapore (asia-southeast1) under institutional non-training terms, paired with local Indonesian receipt fixtures for zero-setup evaluation. Kernel: client-side JavaScript, locked templates, FileReader, .lpj JSON, and SHA-256, targeting WCAG 2.1 AA accessibility."

s7 = "The pilot plan evaluates 30 treasurers and 2 UAJM advisors across five metrics: preparation minutes, mechanical defects resolved pre-submission, fields corrected post-Gemini, un-gated retention quiz scores, and verifier review minutes. Semifinal benchmarks single-receipt perception, confirmation, out-of-band card checks, and local desk-reviews; Final Day targets multi-page batching and QR-linked sign-offs."

SECTIONS = [
    ("1. Problem", s1),
    ("2. Intended Users", s2),
    ("3. Supporting Observations or Evidence", s3),
    ("4. Proposed Solution and Core User Flow", s4),
    ("5. How It Differs from Existing Alternatives", s5),
    ("6. Planned Technologies", s6),
    ("7. Expected Benefit and Development Plan", s7),
]

SOURCES = "[1] P. Siada & A. L. Tungadi, TEMATIKA J. Penelit. Tek. Inform. Sist. Inf. UAJM, 2021, doi:10.56963/tematika.v9i1.119 (studi sistem informasi portofolio kemahasiswaan BKAM UAJM). [2] Pedoman LPJ, FIB Universitas Brawijaya, fib.ub.ac.id. [3] Prosedur Proposal & LPJ SIPRO, FEB UGM & UU Bea Meterai No. 10/2020. [4] SOP HIMA, Desain Interior ITS, its.ac.id. [5] SOP LPJ Mahasiswa Biologi, ITS, its.ac.id. [6] Surat Edaran Mekanisme LPJ Ormawa, FILKOM UB, 2026."

words = sum(len(re.findall(r"\S+", h + " " + b)) for h, b in SECTIONS)
print(f"Total abstract words: {words}")
assert 300 <= words <= 500, f"Word count {words} out of required bounds (300-500)!"

TPL = r"C:\Users\arche\.gemini\antigravity\brain\633f260b-a099-4ad2-841c-8c28fffa117f\.user_uploaded\media_1793977102758_f11c67cf.pdf"
OUT = r"E:\Download\rapilpj-v2\abstract\TideLedger_Abstract_STACK2026.pdf"

doc = fitz.open(TPL)
doc.select([len(doc) - 1])
page = doc[0]

# Redact sample text on template
box = fitz.Rect(66, 82, 529, 790)
page.add_redact_annot(box)
page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE, graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED)

e = html.escape
cell_css = "* { font-family: sans-serif; } body { font-size: 8.8px; color: #202124; } b { font-weight: bold; }"
y, kx, vx, rx = box.y0, box.x0, box.x0 + 118, box.x1

for a, b in IDENTITY:
    h = 30 if len(b) > 85 else 20
    page.draw_rect(fitz.Rect(kx, y, vx, y + h), color=(0.79, 0.81, 0.84), fill=(0.91, 0.94, 1.0), width=0.6)
    page.draw_rect(fitz.Rect(vx, y, rx, y + h), color=(0.79, 0.81, 0.84), fill=(1, 1, 1), width=0.6)
    page.insert_htmlbox(fitz.Rect(kx + 6, y + 4.5, vx - 4, y + h), f"<b>{e(a)}</b>", css=cell_css)
    page.insert_htmlbox(fitz.Rect(vx + 6, y + 4.5, rx - 4, y + h), e(b), css=cell_css)
    y += h

box_body = fitz.Rect(box.x0, y + 6, box.x1, box.y1)
body_html = "".join(f'<p><span class="h">{e(h)}.</span> {e(b)}</p>' for h, b in SECTIONS)

content = f"""
<h2>Abstract</h2>
{body_html}
<p class="src"><span class="h">Source Acknowledgments.</span> {e(SOURCES)}</p>
"""

css = """
* { font-family: sans-serif; }
body { font-size: 8.75px; line-height: 1.32; color: #202124; }
h2 { color: #1a73e8; font-size: 10.5px; margin: 3px 0 2px; }
p { margin: 0 0 3px; text-align: justify; }
.h { color: #1a73e8; font-weight: bold; }
.src { font-size: 7.3px; color: #444; line-height: 1.23; margin-top: 4px; }
"""

spare, scale = page.insert_htmlbox(box_body, content, css=css, scale_low=0)
print(f"HTML box spare: {spare}, scale: {scale}")
doc.save(OUT, garbage=4, deflate=True)

d = fitz.open(OUT)
print(f"Total pages generated: {len(d)}")
assert len(d) == 1, "Must fit on exactly 1 page!"
d[0].get_pixmap(dpi=110).save(r"E:\Download\rapilpj-v2\abstract\preview.png")
print("Successfully built abstract on official STACK 2026 template!")
