import re, html, fitz

IDENTITY = [
    ("Team name", "Tide Ledger"),
    ("Project title", "RapiLPJ: Pre-Submission Audit for Student Organization Activity Reports"),
    ("Selected case", "Case 1: Smarter Campus and Learning"),
    ("Members", "Vincentius Bryan Kwandou (leader), Valentino Filemon Limer, Putra Purwanugraha Tengbunan, Marvel Harjosetio"),
]

s1 = "Student treasurers file accountability reports (LPJ) before faculty move subsequent proposals. Rules differ by campus: original stamps, one attendance sheet per meal, identical totals, a revenue stamp only when nominal exceeds Rp5,000,000 (Law 10/2020 Art. 3), withholding, and strict deadlines. At FILKOM UB, late or incomplete reports delay proposals. Treasurers lack formal accounting training, spending hours on mechanical rework. Revision rates remain unmeasured; establishing that count is our first validation metric, not an unverified claim."

s2 = "Primary users are treasurers and secretaries of program associations, BEM, and clubs. The faculty desk reviewer reads the output. They are not a second product: RapiLPJ checks a file and does not release money."

s3 = "FIB UB requires stamped originals, one attendance sheet per meal session, and matching totals. FEB UGM requires a Rp10,000 stamp above Rp5,000,000 and a scan when thermal paper fades. An ITS department sets ten days; ITS Biology wants one line per receipt with tax included. A 2021 UAJM study describes unstandardized activity documentation. FILKOM UB’s 2026 circular records repeated withholding and completeness failures."

s4 = "RapiLPJ is a practice run before submission. First, perceive: Gemini Flash on Vertex AI (Singapore) extracts vendor, date, invoice number, nominal, and stamp presence as JSON without arithmetic. Fields sit beside the slip; human changes enter an edit disclosure log. Offline Indonesian fixtures run without API keys. Second, a client-side kernel flags duplicate invoices, out-of-window dates, missing stamps above Rp5,000,000, and variances above 10 percent. Meal caps and PPh 21 use only a rule card signed by two advisors; missing rates return 'preset gap' without inventing figures. Third, export unlocks only when a micro-quiz matches the statutory key—exactly Rp5,000,000 is not dutiable; above is—and a variance addendum is completed via fixed template. Fourth, export yields a dossier with SHA-256 over confirmed ledger, edit log, quiz, addendum, and finding IDs, which verifiers recompute locally."

s5 = "A raw LLM mis-adds. A spreadsheet does not bind a hash, cite the statute, or lock export. Campus portals collect files; they do not pre-audit them."

s6 = "Static bilingual HTML, CSS, and JavaScript on Firebase Hosting, no application database. Open JavaScript kernel, FileReader, a .lpj JSON file, and Web Crypto SHA-256. WCAG 2.1 AA."

s7 = "The semifinal benchmarks single-activity intake: perception, confirmation, signed card, quiz, and desk-check. Final Day adds multi-slip batching and QR re-checks. With 30 treasurers and 2 advisors we evaluate minutes to a clean dossier, mechanical defects resolved, fields corrected post-perception, and quiz retention without on-screen cues. The primary risk is misread thermal slips; human confirmation plus edit logging provides control. Arithmetic never trusts the model."

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
