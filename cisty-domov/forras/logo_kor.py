# Round logo on a white disc (profile picture / sticker)
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from logo import text_path, mark, OUT, NAVY, BLUE, WHITE

S = 512
d1, w1 = text_path("čistý", "InterDisplay-SemiBold.otf", 60, 0, 0, -0.02)
d2, w2 = text_path("domov", "InterDisplay-Regular.otf", 60, 0, 0, -0.02)
x0 = (S - (w1 + 14 + w2)) / 2
d1, _ = text_path("čistý", "InterDisplay-SemiBold.otf", 60, x0, 352, -0.02)
d2, _ = text_path("domov", "InterDisplay-Regular.otf", 60, x0 + w1 + 14, 352, -0.02)
_, w3 = text_path("TAKARÍTÁS · UPRATOVANIE", "Inter-Medium.otf", 13, 0, 0, 0.18)
d3, _ = text_path("TAKARÍTÁS · UPRATOVANIE", "Inter-Medium.otf", 13, (S - w3) / 2, 386, 0.18)
body = (f'<circle cx="256" cy="256" r="254" fill="{WHITE}"/>'
        f'<circle cx="256" cy="256" r="236" fill="none" stroke="#DCE9FB" stroke-width="3"/>'
        f'<g transform="translate({256-72},110) scale(1.44)">{mark(BLUE, WHITE)}</g>'
        f'<path d="{d1}" fill="{NAVY}"/><path d="{d2}" fill="{BLUE}"/><path d="{d3}" fill="{NAVY}"/>')
open(os.path.join(OUT, "cisty-domov-logo-kor.svg"), "w").write(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S} {S}" width="{S}" height="{S}">{body}</svg>')
print("ok")
