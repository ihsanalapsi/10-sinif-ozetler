# -*- coding: utf-8 -*-
"""Build the physics site (GitHub Pages + artifact + local preview) and the hub page."""
import re, shutil, sys
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
DIST = ROOT / "dist"
TEST = ROOT / "test"
BIO = Path("/home/claude/ozet")

FONTS_LINK = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
              '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap">')
LOCAL_FONTS = """
@font-face { font-family: "Readex Pro"; src: url("file:///home/claude/fonts/ReadexPro[HEXP,wght].ttf"); font-weight: 160 700; }
@font-face { font-family: "JetBrains Mono"; src: url("file:///home/claude/fonts/JetBrainsMono[wght].ttf"); font-weight: 100 800; }
"""


MATH_RUN = re.compile(r"[0-9A-Za-z_\u00C0-\u024FΔ₀-₉+\-−=·×÷/,.()²%|→ ]+")
def _wrap_run(m):
    run = m.group(0)
    if not re.search(r"[0-9Δ=]", run):
        return run
    lead = run[:len(run) - len(run.lstrip())]
    core = run.strip()
    trail = run[len(lead) + len(core):]
    tail = ""
    while core and core[-1] in ".,:":
        tail = core[-1] + tail; core = core[:-1]
    head = ""
    if core.startswith("(") and ")" not in core:
        head, core = "(", core[1:]
    if core.endswith(")") and "(" not in core:
        tail = ")" + tail; core = core[:-1]
    if not core or not re.search(r"[0-9Δ=]", core):
        return run
    return lead + head + '<bdi dir="ltr">' + core + '</bdi>' + tail + trail

def protect_math(html_text):
    """Wrap Latin math runs (numbers with units, formulas) in LTR isolates inside RTL text nodes."""
    parts = re.split(r"(<[^>]+>)", html_text)
    out = []
    for part in parts:
        if part.startswith("<") or not part.strip():
            out.append(part)
        else:
            out.append(MATH_RUN.sub(_wrap_run, part))
    return "\n".join([]) if False else "".join(out)

def body(home_link=False):
    tr = (SRC / "content_tr.html").read_text(encoding="utf-8")
    ar = protect_math((SRC / "content_ar.html").read_text(encoding="utf-8"))
    css = (SRC / "style.css").read_text(encoding="utf-8")
    js = (SRC / "app.js").read_text(encoding="utf-8")
    home = '<a class="home" href="../" aria-label="Ana sayfa / الرئيسية">‹<span class="t"> 10. Sınıf</span></a>' if home_link else ''
    return f"""<style>
{css}
.home {{ font-size: 13px; font-weight: 600; text-decoration: none; color: var(--muted); border: 1px solid var(--line); border-radius: 999px; padding: 4px 10px; background: var(--surface); }}
</style>
<header class="topbar"><div class="in">
  {home}
  <div class="brand"><span class="dot" aria-hidden="true"></span>10. Sınıf Fizik <small>· FİZ.10.1.1 – 10.1.2</small></div>
  <div class="switch" role="group" aria-label="Dil / اللغة">
    <button type="button" data-lang="ar" aria-pressed="true">عربي + تركي</button>
    <button type="button" data-lang="tr" aria-pressed="false">Türkçe</button>
  </div>
  <nav class="secnav" data-lang="ar" dir="rtl"><a href="#ar-s1">1 · السرعة الثابتة</a><a href="#ar-s2">2 · التسارع</a><a href="#ar-s3">3 · اختبري نفسك</a><a href="#ar-s4">4 · القوانين والمصطلحات</a></nav>
  <nav class="secnav" data-lang="tr" hidden><a href="#tr-s1">1 · Sabit hız</a><a href="#tr-s2">2 · İvme</a><a href="#tr-s3">3 · Kendini sına</a><a href="#tr-s4">4 · Formüller ve terimler</a></nav>
</div></header>
<main>
  <div class="lang" id="ar" lang="ar" dir="rtl">
{ar}
  </div>
  <div class="lang" id="tr" lang="tr" dir="ltr" hidden>
{tr}
  </div>
</main>
<script>
{js}
</script>
"""

def full_doc(inner, title, desc, extra_head="", icon_prefix=""):
    return f"""<!doctype html>
<html lang="ar" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#141B2D">
<link rel="icon" type="image/png" href="{icon_prefix}icon.png">
<link rel="apple-touch-icon" href="{icon_prefix}icon.png">
<link rel="manifest" href="{icon_prefix}manifest.webmanifest">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
{FONTS_LINK}
{extra_head}
</head>
<body>
{inner}
</body>
</html>
"""

HUB = """<style>
:root { --bg:#F6F7FA; --surface:#FFFFFF; --ink:#141B2D; --muted:#5A6478; --line:#DCE1EA; --cv:#D9700B; --ca:#A8318F; --good:#1D8556; --grid: rgba(20,27,45,.045);
  --body: "Readex Pro", "Noto Sans Arabic", system-ui, sans-serif; --mono: "JetBrains Mono", Menlo, monospace; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg:#0E1320; --surface:#161D2C; --ink:#E6EBF4; --muted:#9AA5BB; --line:#2A3448; --cv:#F4A04B; --ca:#E27BCF; --good:#4FC88E; --grid: rgba(230,235,244,.05); color-scheme: dark; } }
:root[data-theme="dark"] { --bg:#0E1320; --surface:#161D2C; --ink:#E6EBF4; --muted:#9AA5BB; --line:#2A3448; --cv:#F4A04B; --ca:#E27BCF; --good:#4FC88E; --grid: rgba(230,235,244,.05); color-scheme: dark; }
* { box-sizing: border-box; }
body { margin:0; background: var(--bg); color: var(--ink); font-family: var(--body); line-height: 1.6;
  background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px); background-size: 24px 24px; }
main { max-width: 760px; margin: 0 auto; padding-block: 40px 60px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
.eyebrow { font-family: var(--mono); font-size: 12.5px; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
h1 { font-size: clamp(30px, 6vw, 44px); font-weight: 600; margin: 6px 0 4px; letter-spacing: -.02em; }
.ar { font-size: 19px; color: var(--muted); margin: 0 0 26px; }
.cards { display: grid; gap: 14px; }
a.card { display: grid; grid-template-columns: 64px 1fr; gap: 14px; align-items: center; text-decoration: none; color: inherit; background: var(--surface); border: 1.5px solid var(--line); border-radius: 16px; padding: 16px; }
a.card:hover, a.card:focus-visible { border-color: var(--ink); outline: none; }
.ic { width: 64px; height: 64px; border-radius: 14px; display: grid; place-items: center; background: var(--ink); }
.card h2 { margin: 0; font-size: 20px; font-weight: 600; }
.card .sub { color: var(--muted); font-size: 14.5px; }
.card .code { font-family: var(--mono); font-size: 12px; color: var(--muted); }
.card .rtl { direction: rtl; text-align: right; font-size: 15px; }
.files { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0 0 78px; }
.files a { font-size: 13.5px; color: var(--ink); background: var(--surface); border: 1px solid var(--line); border-radius: 999px; padding: 4px 12px; text-decoration: none; }
.foot { margin-top: 34px; font-size: 13px; color: var(--muted); }
@media (max-width: 480px) { a.card { grid-template-columns: 1fr; } .files { margin-left: 0; } }
</style>
<main>
  <div class="eyebrow">10. Sınıf · Maarif Modeli · Çalışma özetleri</div>
  <h1>10. Sınıf Özetler</h1>
  <p class="ar" dir="rtl">ملخصات الصف العاشر — عربي + تركي</p>
  <div class="cards">
    <a class="card" href="fizik/">
      <span class="ic"><svg width="40" height="20" viewBox="0 0 40 20" aria-hidden="true"><circle cx="4" cy="10" r="4" fill="#F4A04B"/><circle cx="15" cy="10" r="4" fill="#F4A04B"/><circle cx="26" cy="10" r="4" fill="#F4A04B"/><circle cx="37" cy="10" r="3" fill="#F4A04B"/></svg></span>
      <span><span class="code">FİZİK · FİZ.10.1.1 – FİZ.10.1.2 · etkileşimli</span><h2>Sabit Hız ve İvme</h2><span class="sub">Laboratuvarlar, grafikler, çözümlü örnekler ve test</span><div class="rtl">السرعة الثابتة والتسارع — مختبرات تفاعلية واختبار</div></span>
    </a>
    <div>
      <a class="card" href="biyoloji/">
        <span class="ic"><svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><path d="M6 28 C6 12 18 4 30 4 C30 18 22 28 6 28 Z" fill="#4FC88E"/><path d="M6 28 L22 12" stroke="#141B2D" stroke-width="2"/></svg></span>
        <span><span class="code">BİYOLOJİ · BİY.10.1.1 – BİY.10.1.3</span><h2>Canlılarda Enerji ve Fotosentez Deneyleri</h2><span class="sub">ATP, fotosentezde kullanılan ve üretilen maddeler, deneyler</span><div class="rtl">الطاقة في الكائنات الحية وتجارب البناء الضوئي</div></span>
      </a>
      <div class="files"><a href="biyoloji/biyoloji-TR.pdf">PDF · Türkçe</a><a href="biyoloji/biyoloji-AR.pdf" dir="rtl">PDF · عربي + تركي</a></div>
    </div>
  </div>
  <p class="foot">Telefonda veya tablette ana ekrana ekleyerek uygulama gibi açabilirsin. · أضيفي الصفحة إلى الشاشة الرئيسية لتفتح مثل التطبيق.</p>
</main>
"""

MANIFEST = """{
  "name": "10. Sınıf Özetler",
  "short_name": "10. Sınıf",
  "start_url": "./",
  "display": "standalone",
  "background_color": "#F6F7FA",
  "theme_color": "#141B2D",
  "icons": [{ "src": "icon.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }]
}
"""

def make_icon(path):
    from PIL import Image, ImageDraw
    S = 512
    im = Image.new("RGB", (S, S), "#141B2D")
    d = ImageDraw.Draw(im)
    xs = [120, 210, 300, 390]
    for i, x in enumerate(xs):
        r = 34
        d.ellipse([x - r, 200 - r, x + r, 200 + r], fill="#F4A04B")
    for i, k in enumerate([0, 1, 4, 9]):
        x = 120 + k * 30
        r = 28
        d.ellipse([x - r, 330 - r, x + r, 330 + r], fill="#E27BCF")
    im.save(path)

def build_bio():
    src = BIO / "out" / "artifact.html"
    if not src.exists():
        print("no biology artifact, skipping"); return
    s = src.read_text(encoding="utf-8")
    i = s.index('<header class="topbar">')
    head, rest = s[:i], s[i:]
    doc = f"""<!doctype html>
<html lang="ar">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="icon" type="image/png" href="../icon.png">
<link rel="apple-touch-icon" href="../icon.png">
<style>body{{margin:0}} img{{max-width:100%}} [hidden]{{display:none!important}}</style>
{head}
</head>
<body>
{rest}
</body>
</html>
"""
    out = DIST / "biyoloji"
    out.mkdir(parents=True, exist_ok=True)
    (out / "index.html").write_text(doc, encoding="utf-8")
    shutil.copy(BIO / "out" / "tr.pdf", out / "biyoloji-TR.pdf")
    shutil.copy(BIO / "out" / "ar.pdf", out / "biyoloji-AR.pdf")

def main():
    DIST.mkdir(exist_ok=True); (DIST / "fizik").mkdir(exist_ok=True); TEST.mkdir(exist_ok=True)
    title = "Sabit Hız ve İvme · 10. Sınıf Fizik"
    desc = "FİZ.10.1.1 ve FİZ.10.1.2 için etkileşimli çalışma özeti: sabit hızlı hareket, ivme ve hız değişimi. Arapça + Türkçe."
    (DIST / "fizik" / "index.html").write_text(full_doc(body(home_link=True), title, desc, icon_prefix="../"), encoding="utf-8")
    (DIST / "index.html").write_text(full_doc(HUB, "10. Sınıf Özetler", "10. sınıf fizik ve biyoloji çalışma özetleri (Arapça + Türkçe)."), encoding="utf-8")
    (DIST / "manifest.webmanifest").write_text(MANIFEST, encoding="utf-8")
    (DIST / ".nojekyll").write_text("", encoding="utf-8")
    make_icon(DIST / "icon.png")
    build_bio()
    # artifact (no skeleton) and local preview
    (ROOT / "artifact.html").write_text('<title>Sabit Hız ve İvme</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n' + FONTS_LINK + "\n" + body(), encoding="utf-8")
    prev = full_doc(body(home_link=True), title, desc, extra_head="<style>" + LOCAL_FONTS + "</style>", icon_prefix="../")
    prev = prev.replace(FONTS_LINK, "")
    (TEST / "preview.html").write_text(prev, encoding="utf-8")
    print("built", [str(p.relative_to(ROOT)) for p in sorted(DIST.rglob("*")) if p.is_file()])

if __name__ == "__main__":
    main()
