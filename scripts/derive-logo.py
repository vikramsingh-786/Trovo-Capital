#!/usr/bin/env python3
"""Derive the web logo from the owner-supplied brand file.

The supplied asset (public/logo/logo.jpg) is an opaque JPEG on near-white
paper. Dropped straight onto the site's ivory ground it shows as a white box,
so this keys the paper out to transparency, trims the uneven padding so CSS
controls optical alignment, and scales the result for its largest on-screen
use.

Re-run this whenever a new brand file is supplied. Ideally it becomes
unnecessary: a vector (SVG) logo would beat any raster here.

Requires Pillow (a local tool dependency, deliberately NOT a project one):
    python3 scripts/derive-logo.py
"""

import os
import sys

from PIL import Image

SRC = "public/logo/logo.jpg"
DST = "public/logo/trove-logo.png"

# Luminance thresholds for the white key. Above PAPER a pixel is paper and goes
# fully transparent; at or below INK_FLOOR it is ink and stays fully opaque.
# Between them the alpha ramps, which is what keeps anti-aliased edges smooth.
PAPER, INK_FLOOR = 250.0, 60.0

# ~4.5x the largest rendered height (40px in the header), so the mark stays
# crisp on 3x displays without shipping the full 216px original.
TARGET_HEIGHT = 128


def main() -> int:
    if not os.path.exists(SRC):
        print(f"missing source: {SRC}", file=sys.stderr)
        return 1

    src = Image.open(SRC).convert("RGB")
    width, height = src.size
    pixels = src.load()

    keyed = Image.new("RGBA", (width, height))
    out = keyed.load()
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
            alpha = (PAPER - luminance) / (PAPER - INK_FLOOR)
            alpha = 0.0 if alpha <= 0 else 1.0 if alpha >= 1 else alpha
            if alpha == 0:
                out[x, y] = (0, 0, 0, 0)
            else:
                # Un-composite from white, so partially covered edge pixels
                # recover their true ink colour instead of staying washed out.
                ink = tuple(
                    min(255, max(0, round((c - (1 - alpha) * 255) / alpha)))
                    for c in (r, g, b)
                )
                out[x, y] = (*ink, round(alpha * 255))

    trimmed = keyed.crop(keyed.getbbox())
    tw, th = trimmed.size
    final = trimmed.resize((round(tw * TARGET_HEIGHT / th), TARGET_HEIGHT), Image.LANCZOS)
    final.save(DST, optimize=True)

    print(
        f"{SRC} {width}x{height} -> trimmed {tw}x{th} -> {DST} "
        f"{final.width}x{final.height} ({os.path.getsize(DST)} bytes)"
    )
    print("Update the width/height props in src/components/wordmark.tsx if the aspect changed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
