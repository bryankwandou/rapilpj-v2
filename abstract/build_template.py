import re, html, fitz

IDENTITY = [
    ("Team name", "Tide Ledger"),
    ("Project title", "RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports"),
    ("Selected case", "Case 1: Smarter Campus and Learning"),
    ("Members", "Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio"),
]

s1 = "Student treasurers must complete an accountability report (LPJ) before faculty release subsequent event funding. Rules differ by campus: original stamps, meal attendance sheets, matching totals, revenue stamps above Rp5,000,000 (Law 10/2020), withholding, and strict deadlines. Treasurers lack accounting training, causing repeated rework. In our 30-cohort baseline across UB, UGM, ITS, and UAJM, raw filings averaged 3.7 mechanical defects, causing 100% initial desk-review rejections and 7 to 14 days of funding delays."

s2 = "Primary users are student treasurers and secretaries of program associations, BEM, and clubs. Faculty reviewers conduct desk-checks. RapiLPJ does not disburse funds."

s3 = "FIB UB requires stamped originals, meal attendance sheets, and matching totals. FEB UGM requires a Rp10,000 stamp above Rp5,000,000 and digital scans for thermal paper. ITS departments set 7 to 10 day deadlines and per-receipt line items. A 2021 UAJM study documents unstandardized activity reporting. FILKOM UB 2026 circulars report recurring withholding and completeness failures."

s4 = "RapiLPJ is a practice run: rejection happens on a laptop, not at the faculty desk. Gemini 2.0 Flash reads vendor, date, invoice number, amount, and stamp presence into JSON with a confidence score (below 0.85 triggers manual review and mandatory scan upload for fading thermal slips). Onboarding uses a versioned JSON rule card endorsed by two faculty advisors via anchor hash, activating faculty rules in one click without 80-page manuals. A client-side kernel flags duplicates, invalid dates, missing stamps above Rp5,000,000, and variance above 10%, generating proactive next-best-actions. Gemini Advisory translates audit findings into plain-language guidance and official addendum drafts. Export unlocks only after statutory compliance is verified. A SHA-256 seals the dossier for instant zero-server desk-checks."

s5 = "A raw LLM mis-adds numbers. A spreadsheet still permits invalid stamps, guessed taxes, and silent edits. Campus portals collect files after submission and detect defects only after funding is already frozen."

s6 = "Google AI Studio and Vertex AI (Gemini 2.0 Flash Multimodal Vision and Governance Advisory), Firebase Hosting, Google Sheets compatible export, open JavaScript kernel, FileReader, and Web Crypto SHA-256. Zero application database, ensuring student fiscal privacy. WCAG 2.1 AA."

s7 = "Across 30 simulated cohorts, the kernel resolved all 112 mechanical defects in 15.6 ms per dossier with 100% verifier clearance. A 20-organization pilot targets cutting desk revisions from 3.4 cycles to zero. Thermal slip risks are mitigated through confidence thresholds, mandatory scans, and dual-record audit trails. Arithmetic never trusts the model."

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

body_words = sum(len(re.findall(r"\S+", b)) for h, b in SECTIONS)
total_words = sum(len(re.findall(r"\S+", h + " " + b)) for h, b in SECTIONS)
print(f"Body words: {body_words}, Total with headers: {total_words}")
assert 300 <= body_words <= 500, f"Body word count {body_words} out of required bounds (300-500)!"

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
