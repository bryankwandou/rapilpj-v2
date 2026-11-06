import re, html, fitz

IDENTITY = [
    ("Team name", "Tide Ledger"),
    ("Project title", "RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports"),
    ("Selected case", "Case 1: Smarter Campus and Learning"),
    ("Members", "Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio"),
]

SECTIONS = [
    ("1. Problem", "Student treasurers must submit an activity accountability report (LPJ) after funded campus events before subsequent funds are disbursed. Faculty guidelines enforce disparate administrative rules: receipt seals, arithmetic balance, attendance ratios, revenue stamps, tax deductions, and deadlines. At Brawijaya Computer Science, incomplete reports halt upcoming proposals and extracurricular peer learning [5]. Treasurers lose valuable study hours to mechanical bookkeeping corrections."),
    ("2. Intended Users", "Treasurers and secretaries of Indonesian student organizations—study program associations, student executive boards (BEM), and clubs at Universitas Atma Jaya Makassar and peer institutions—who manage budgets without accounting training."),
    ("3. Supporting Observations or Evidence", "Faculty research at Universitas Atma Jaya Makassar documented that the Student Affairs Bureau (BKAM) struggles with unstandardized reports and verification delays that threaten compliance [1]. Brawijaya Cultural Studies mandates stamped receipts, attendance lists per meal, and exact ledger balances [2]. UGM Economics enforces Rp10,000 revenue stamps on receipts of Rp5,000,000+ under Law 10/2020 and photocopies for thermal slips [3]. ITS Interior Design enforces a 10-day deadline [4], while ITS Biology requires separate line items and tax inclusion [5]. Student officers consistently struggle with tax classification and budget reconciliations [6]."),
    ("4. Proposed Solution and Core User Flow", "RapiLPJ couples an open-source browser audit engine with an agentic Gemini governance consultant. The user flow has three steps: (1) Deterministic Pre-Audit: A client-side JavaScript engine executes zero-tolerance statutory rules—duplicate invoice collisions, date sanity bounds, revenue stamp thresholds, and budget variances (>10%)—with zero arithmetic hallucinations. (2) Governance Consultation: When infractions occur, the Gemini Co-Pilot explains underlying statutory principles and autonomously synthesizes official Addendum request letters ready for faculty approval. (3) Cryptographic Attestation: The treasurer exports a SHA-256 integrity hash sheet certifying calculation fidelity for physical binder submission."),
    ("5. How It Differs from Existing Alternatives", "Pure LLMs suffer from non-deterministic arithmetic hallucinations when calculating balance sheets. Spreadsheets lack automated statutory compliance checks and relational cross-table validation. Campus portals merely receive completed files without pre-submission triage. RapiLPJ maintains an unbreachable boundary: financial arithmetic runs exclusively via open-source deterministic algorithms in the browser, while Gemini is reserved strictly for statutory advisory and formal addendum drafting."),
    ("6. Planned Technologies", "A privacy-preserving neuro-symbolic stack. Client Engine: HTML5, CSS3, open-source JavaScript algorithms, and Web Crypto SHA-256 executing entirely inside browser memory. Static Hosting: Vercel CDN deployment without remote database storage, guaranteeing complete financial confidentiality. Advisory Layer: Google Gemini 1.5/2.0 API invoked on demand for statutory governance guidance and structured administrative document drafting."),
    ("7. Expected Benefit and Development Plan", "Expected benefit: eliminates arithmetic bookkeeping rejections, accelerates university funding disbursements, and trains student leaders in statutory fiscal governance. Plan: Week 1 field trials with 30 treasurers across Universitas Atma Jaya Makassar; Week 2 faculty guideline rule expansion and addendum template tuning; Week 3 progressive web app offline caching and audit sheet export refinement. Risks of institutional rule changes are mitigated by configurable policy toggles."),
]

SOURCES = "[1] P. Siada & A. L. Tungadi, TEMATIKA J. Penelit. Tek. Inform. Sist. Inf. UAJM, 2021, doi:10.56963/tematika.v9i1.119. [2] Pedoman LPJ, FIB Universitas Brawijaya, fib.ub.ac.id. [3] Prosedur Proposal & LPJ SIPRO, FEB UGM & UU Bea Meterai No. 10/2020. [4] SOP HIMA, Desain Interior ITS, its.ac.id. [5] SOP LPJ Mahasiswa Biologi, ITS, its.ac.id. [6] Surat Edaran Mekanisme LPJ Ormawa, FILKOM UB, 2026. AI disclosure: Claude and Gemini supported research, deterministic engine code, and drafting."

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
body { font-size: 8.85px; line-height: 1.34; color: #202124; }
h2 { color: #1a73e8; font-size: 10.5px; margin: 4px 0 3px; }
p { margin: 0 0 3.7px; text-align: justify; }
.h { color: #1a73e8; font-weight: bold; }
.src { font-size: 7.6px; color: #444; line-height: 1.25; margin-top: 5px; }
"""

spare, scale = page.insert_htmlbox(box_body, content, css=css, scale_low=0)
print(f"HTML box spare: {spare}, scale: {scale}")
doc.save(OUT, garbage=4, deflate=True)

d = fitz.open(OUT)
print(f"Total pages generated: {len(d)}")
assert len(d) == 1, "Must fit on exactly 1 page!"
d[0].get_pixmap(dpi=110).save(r"E:\Download\rapilpj-v2\abstract\preview.png")
print("Successfully built abstract on official STACK 2026 template!")
