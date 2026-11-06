import re, html, fitz

IDENTITY = [
    ("Team name", "Tide Ledger"),
    ("Project title", "RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports"),
    ("Selected case", "Case 1: Smarter Campus and Learning"),
    ("Members", "Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio"),
]

SECTIONS = [
    ("1. Problem", "Student organization treasurers must submit an accountability report (LPJ) after every funded campus event before subsequent funds are disbursed. Faculty guidelines impose disparate administrative rules covering receipt seals, exact reconciliations, attendance counts, revenue stamps, tax deductions, and deadlines. At Brawijaya's Faculty of Computer Science, incomplete reports are returned, delaying future proposals and halting extracurricular peer learning [5]. Treasurers lose valuable study hours to mechanical bookkeeping corrections."),
    ("2. Intended Users", "Treasurers and secretaries of Indonesian student organizations—such as study program associations, student executive boards (BEM), and clubs at Universitas Atma Jaya Makassar and peer institutions—who manage activity budgets without formal accounting training."),
    ("3. Supporting Observations or Evidence", "We analyzed university guidelines, statutory standards, and empirical findings. At our home institution, Universitas Atma Jaya Makassar, published faculty research documented that the Student Affairs Bureau (BKAM) struggles with unstandardized activity reports and manual verification delays that threaten national reporting compliance [1]. Brawijaya's Faculty of Cultural Studies mandates stamped original receipts, one attendance list per meal session, and exact balance across approval totals, expense tables, and receipts [2]. UGM's Faculty of Economics and Business enforces a Rp10,000 revenue stamp on receipts of Rp5,000,000 or more under Law No. 10 of 2020 and requires scanning thermal receipts [3]. ITS Interior Design enforces a 10-calendar-day deadline [4], while ITS Biology requires separate receipt entries with tax inclusion [5]. Student officers consistently struggle with tax classification and budget reconciliations [6]."),
    ("4. Proposed Solution and Core User Flow", "RapiLPJ is a deterministic client-side web auditor. A treasurer selects their faculty ruleset or statutory guidelines, enters event dates, approved ceiling, and meal sessions, then inputs planned budget and receipt entries with invoice references. RapiLPJ performs automated arithmetic checks: duplicate invoice detection, date boundary validity, revenue stamp thresholds, attendance sheet shortages, and budget variance overruns beyond an allowable percentage. Every discrepancy is flagged in clear language linked directly to official citations. Treasurers can export audit tables as CSV or print a verification summary."),
    ("5. How It Differs from Existing Alternatives", "Campus portals merely receive submitted documents without auditing administrative rules beforehand. Spreadsheets calculate raw arithmetic but do not evaluate faculty-specific statutory regulations. RapiLPJ acts as a pre-submission gatekeeper, validating compliance before official review and citing exact university articles. No comparable public auditing tool exists for Indonesian student organizations."),
    ("6. Planned Technologies", "A static web application in HTML, CSS, and JavaScript. No user accounts or remote servers are required, guaranteeing financial confidentiality. Rules are structured as deterministic logic with source links. AI is intentionally avoided because compliance audits must remain exact, transparent, and reproducible."),
    ("7. Expected Benefit and Development Plan", "Expected benefit: fewer rejected reports, faster funding reimbursement, and more time for academic collaboration. We plan to survey 30 treasurers and test preparation efficiency with 10 student organizations. Plan: week 1 trial runs and local receipt scan verification; week 2 additional faculty presets; week 3 usability refinement. The primary risk is evolving institutional guidelines, mitigated through visible source links and customizable rule toggles."),
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
