"""Outlines wordmark text from Bricolage Grotesque (OFL) into SVG path data.

Output: design/phase1/wordmark-paths.json, read by build-logo.mjs.
Usage:  python design/phase1/outline-wordmark.py <path-to-BricolageGrotesque[opsz,wdth,wght].ttf>
Needs:  pip install fonttools uharfbuzz   (use a throwaway venv)
Shaping (kerning, ligatures) is done by HarfBuzz at wght 800, opsz 96, wdth 100.
Paths are in a 1000-units-per-em space with y pointing down and the baseline at y=0.
"""
import json, sys, pathlib
import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

font_path = pathlib.Path(sys.argv[1])
blob = hb.Blob.from_file_path(str(font_path))
face = hb.Face(blob)
font = hb.Font(face)
font.set_variations({"wght": 800, "opsz": 96, "wdth": 100})
upem = face.upem
SCALE = 1000 / upem
TRACK = -0.03 * 1000  # -3% of an em, applied after every glyph (matches CSS letter-spacing)

STRINGS = {
    "name": "The Yellow Works",
    "tag1": "Good businesses",
    "tag2": "deserve to be seen.",
}

out = {}
for key, text in STRINGS.items():
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})
    pen = SVGPathPen(None, ntos=lambda v: f"{v:.1f}".rstrip("0").rstrip("."))
    x = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        # flip y so the SVG has y pointing down; shift by glyph offset and running advance
        tp = TransformPen(pen, (SCALE, 0, 0, -SCALE, x + pos.x_offset * SCALE, -pos.y_offset * SCALE))
        font.draw_glyph_with_pen(info.codepoint, tp)
        x += pos.x_advance * SCALE + TRACK
    width = x - TRACK  # no trailing tracking after the last glyph
    out[key] = {"d": pen.getCommands(), "width": round(width, 1)}
    print(key, round(width, 1))

target = pathlib.Path(__file__).with_name("wordmark-paths.json")
target.write_text(json.dumps(out), encoding="utf-8")
print("wrote", target)
