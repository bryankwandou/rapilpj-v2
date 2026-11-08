import re, html, fitz

IDENTITY = [
    ("Team name", "Tide Ledger"),
    ("Project title", "RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports"),
    ("Selected case", "Case 1: Smarter Campus and Learning"),
    ("Members", "Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio"),
]

SECTIONS = [
    ("1. Problem", "Student treasurers manage campus funds without accounting training under strict faculty bylaws: physical stamps, ledger balance, meal attendance ratios, revenue stamps on receipts exceeding Rp5,000,000 under Law 10/2020, tax deductions, and deadlines. At Brawijaya Computer Science, incomplete reports freeze subsequent event funding and peer learning [6]. Treasurers lose valuable study hours to mechanical corrections, turning accountability into administrative anxiety."),
    ("2. Intended Users", "Primary users: student organization treasurers and secretaries (BEM and clubs) lacking accounting training. Secondary users: faculty student affairs verifiers (Biro Kemahasiswaan and student council auditors) conducting pre-disbursement desk reviews."),
    ("3. Supporting Observations or Evidence", "Faculty research at Universitas Atma Jaya Makassar documented that the Student Affairs Bureau (BKAM) faces unstandardized event portfolios and manual tracking that overburden student organizations [1]. Disparate guidelines compound friction: UB mandates stamped receipts and ledger balances [2]; UGM requires Rp10,000 stamps on receipts exceeding Rp5,000,000 under Law 10/2020 and photocopies for thermal slips [3]; ITS enforces 10-day deadlines [4] and tax inclusion [5]. Student officers consistently struggle with tax deductions [6]."),
    ("4. Proposed Solution and Core User Flow", "RapiLPJ transforms administrative triage into experiential fiscal learning in three steps: (1) Multimodal Intake & Deterministic Pre-Audit: Gemini 2.0 Flash extracts structured fiscal metadata from receipt photos into JSON without arithmetic. A client-side engine audits zero-tolerance rules (duplicate invoices, dates, >Rp5M revenue stamps, attendance ratios, PPh taxes, >10% budget variances) and persists .lpj files. (2) Gated Fiscal Literacy Loop & Statutory Addenda: Infraction export is gated until treasurers pass micro-quizzes on locked statutory rationale (Law 10/2020, archival retention); a deterministic template drafts variance addenda. (3) Faculty Desk-Check Portal: Treasurers export an indexed PDF dossier with a SHA-256 hash. Faculty verifiers load the package into a desk-check screen to verify hash integrity and approve disbursement or issue itemized revision notes in seconds."),
    ("5. How It Differs from Existing Alternatives", "Pure LLMs hallucinate calculations on balance sheets. Spreadsheets lack statutory checks, receipt indexing, and remediation loops. Campus portals merely collect finished files without triage. RapiLPJ enforces a strict neuro-symbolic boundary: Gemini 2.0 Flash is restricted exclusively to visual perception and structured JSON extraction, while financial arithmetic, compliance verification, and addendum drafting are 100% reserved for transparent, deterministic client-side code."),
    ("6. Planned Technologies", "A privacy-preserving client-side stack. Perception Layer: Gemini 2.0 Flash Multimodal API (client BYOK) for receipt extraction into structured JSON. Deterministic Kernel: Open-source JavaScript engine for statutory evaluation, locked addendum templating, FileReader receipt compilation, .lpj persistence, and SHA-256 hashing. Presentation: Accessible HTML5/CSS3 (bilingual EN/ID, light/dark) deployed statically on Vercel CDN without database storage, ensuring financial confidentiality."),
    ("7. Expected Benefit and Development Plan", "Expected benefit: evaluated via three pilot metrics with 30 treasurers and 2 faculty advisors at Universitas Atma Jaya Makassar: preparation time in minutes, mechanical defect counts before vs. after pre-audit, and pre/post fiscal literacy quiz scores. Development plan: Semifinal phase benchmarks single-receipt multimodal perception and the primary UAJM faculty preset; Final Day sprint delivers multi-page document batching and QR-verifiable advisor sign-off. Modular policy toggles mitigate institutional guideline shifts."),
]

SOURCES = "[1] P. Siada & A. L. Tungadi, TEMATIKA J. Penelit. Tek. Inform. Sist. Inf. UAJM, 2021, doi:10.56963/tematika.v9i1.119 (studi sistem informasi portofolio kemahasiswaan BKAM UAJM). [2] Pedoman LPJ, FIB Universitas Brawijaya, fib.ub.ac.id. [3] Prosedur Proposal & LPJ SIPRO, FEB UGM & UU Bea Meterai No. 10/2020. [4] SOP HIMA, Desain Interior ITS, its.ac.id. [5] SOP LPJ Mahasiswa Biologi, ITS, its.ac.id. [6] Surat Edaran Mekanisme LPJ Ormawa, FILKOM UB, 2026. AI disclosure: Claude and Gemini supported research, deterministic engine code, and drafting."

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
h2 { color: #1a73e8; font-size: 10.5px; margin: 4px 0 3px; }
p { margin: 0 0 3.5px; text-align: justify; }
.h { color: #1a73e8; font-weight: bold; }
.src { font-size: 7.5px; color: #444; line-height: 1.24; margin-top: 5px; }
"""

spare, scale = page.insert_htmlbox(box_body, content, css=css, scale_low=0)
print(f"HTML box spare: {spare}, scale: {scale}")
doc.save(OUT, garbage=4, deflate=True)

d = fitz.open(OUT)
print(f"Total pages generated: {len(d)}")
assert len(d) == 1, "Must fit on exactly 1 page!"
d[0].get_pixmap(dpi=110).save(r"E:\Download\rapilpj-v2\abstract\preview.png")
print("Successfully built abstract on official STACK 2026 template!")
