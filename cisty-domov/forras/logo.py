import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

OUT = "/home/user/Manhattan-studio/cisty-domov/logo"
os.makedirs(OUT, exist_ok=True)
F = "/usr/share/fonts/opentype/inter/"
NAVY, BLUE, WHITE = "#0B2D5B", "#1B63D6", "#FFFFFF"

fonts = {}
def font(name):
    if name not in fonts:
        fonts[name] = TTFont(F + name)
    return fonts[name]

def text_path(s, fname, size, x, y, tracking=0.0):
    """Outline text; returns (path_d, advance_width). tracking in em."""
    f = font(fname); cmap = f.getBestCmap(); gs = f.getGlyphSet()
    upm = f["head"].unitsPerEm; sc = size / upm
    ds, cx = [], x
    for ch in s:
        g = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[g].draw(TransformPen(pen, (sc, 0, 0, -sc, cx, y)))
        ds.append(pen.getCommands())
        cx += gs[g].width * sc + tracking * size
    return " ".join(ds), cx - x - tracking * size

def mark(color, inner):
    # rounded house + four-point sparkle cut out of it
    return f'''<path d="M50 10 L90 43 L90 90 L10 90 L10 43 Z" fill="{color}" stroke="{color}" stroke-width="10" stroke-linejoin="round"/>
<path d="M50 42 C51.8 56 55 59.6 69 61.5 C55 63.4 51.8 67 50 81 C48.2 67 45 63.4 31 61.5 C45 59.6 48.2 56 50 42 Z" fill="{inner}"/>'''

def svg(w, h, body, bg=None):
    b = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">{b}{body}</svg>'

def horizontal(c1, c2, c3, mark_c, mark_in, bg=None):
    d1, w1 = text_path("čistý", "InterDisplay-SemiBold.otf", 64, 132, 74, -0.02)
    d2, w2 = text_path("domov", "InterDisplay-Regular.otf", 64, 132 + w1 + 16, 74, -0.02)
    d3, w3 = text_path("TAKARÍTÁS · UPRATOVANIE", "Inter-Medium.otf", 14.5, 134, 106, 0.18)
    W = int(132 + max(w1 + 16 + w2, w3) + 10)
    body = (f'<g transform="translate(0,6) scale(1.08)">{mark(mark_c, mark_in)}</g>'
            f'<path d="{d1}" fill="{c1}"/><path d="{d2}" fill="{c2}"/><path d="{d3}" fill="{c3}"/>')
    return svg(W, 120, body, bg)

def stacked(c1, c2, c3, mark_c, mark_in, bg=None):
    W = 420
    d1, w1 = text_path("čistý", "InterDisplay-SemiBold.otf", 64, 0, 0, -0.02)
    d2, w2 = text_path("domov", "InterDisplay-Regular.otf", 64, 0, 0, -0.02)
    tw = w1 + 16 + w2; x0 = (W - tw) / 2
    d1, _ = text_path("čistý", "InterDisplay-SemiBold.otf", 64, x0, 232, -0.02)
    d2, _ = text_path("domov", "InterDisplay-Regular.otf", 64, x0 + w1 + 16, 232, -0.02)
    _, w3 = text_path("TAKARÍTÁS · UPRATOVANIE", "Inter-Medium.otf", 14.5, 0, 0, 0.18)
    d3, _ = text_path("TAKARÍTÁS · UPRATOVANIE", "Inter-Medium.otf", 14.5, (W - w3) / 2, 266, 0.18)
    body = (f'<g transform="translate({W/2-65},20) scale(1.3)">{mark(mark_c, mark_in)}</g>'
            f'<path d="{d1}" fill="{c1}"/><path d="{d2}" fill="{c2}"/><path d="{d3}" fill="{c3}"/>')
    return svg(W, 290, body, bg)

files = {
    "cisty-domov-logo.svg": horizontal(NAVY, BLUE, NAVY, BLUE, WHITE),
    "cisty-domov-logo-feher.svg": horizontal(WHITE, "#BFD7FA", "#BFD7FA", WHITE, BLUE),
    "cisty-domov-logo-allo.svg": stacked(NAVY, BLUE, NAVY, BLUE, WHITE),
    "cisty-domov-logo-allo-feher.svg": stacked(WHITE, "#BFD7FA", "#BFD7FA", WHITE, BLUE),
    "cisty-domov-ikon.svg": svg(100, 100, f'<g transform="translate(5,3) scale(.9)">{mark(BLUE, WHITE)}</g>'),
    "cisty-domov-ikon-kek-hatter.svg": svg(512, 512, f'<g transform="translate(106,96) scale(3)">{mark(WHITE, BLUE)}</g>', BLUE),
}
for n, s in files.items():
    open(os.path.join(OUT, n), "w").write(s)
print("ok")
