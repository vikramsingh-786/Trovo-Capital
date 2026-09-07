#!/usr/bin/env python3
"""Build the deployed image assets from the owner-supplied originals.

The originals live in `assets/brand/`, OUTSIDE `public/`, so they are never
deployed — `next build` copies `public/` verbatim and Next has no exclude
option. This script is the only thing that writes `public/logo/`.

Run it whenever a supplied asset changes:

    python3 scripts/build-assets.py

Requires Pillow, a local tool dependency and deliberately NOT a project one.

WHY WEBP. Static export forces `images.unoptimized`, so the browser receives
exactly the bytes we ship and format is the only lever we have. Measured on
this set: resizing while keeping the original formats gives 376 KB -> 70.6 KB,
but re-encoding actually makes three of the PNGs *larger* (crux 1.8 -> 4.8 KB)
and leaves Shield's alpha PNG at 21 KB. WebP gives 376 KB -> ~23 KB, keeps
alpha, and is supported everywhere this site targets.

An SVG of the Trove mark would beat any raster here and would remove the
white-keying step entirely. Worth asking the owner for one.
"""

import os
import sys

from PIL import Image

BRAND = "assets/brand"
OUT = "public/logo"

# --- Trove wordmark -------------------------------------------------------
# The supplied file is an opaque JPEG on near-white paper; dropped onto the
# site's ivory ground it would show as a white box. Key the paper out, trim the
# uneven padding so CSS controls optical alignment, and scale for the largest
# rendered height (40px in the header, so 128px covers 3x displays).
WORDMARK_SRC = f"{BRAND}/logo.jpg"
WORDMARK_OUT = f"{OUT}/trove-logo.webp"
WORDMARK_HEIGHT = 128
PAPER, INK_FLOOR = 250.0, 60.0  # luminance thresholds for the white key

# --- Portfolio tiles ------------------------------------------------------
# Rendered in a fixed square tile at 48px (mobile) / 56px (md), so 192px covers
# 3.4x. Every tile is padded to a square so the data model stays uniform; the
# padding is transparent, which renders identically to letterboxing inside the
# tile but keeps one set of dimensions for all thirteen.
TILE = 192
TILE_QUALITY = 82

# --- Favicon ---------------------------------------------------------------
# Derived from the icon half of the supplied lockup, not drawn. The boundary is
# measured, not guessed: the lockup has a run of fully transparent columns
# between the mark and the wordmark, and the crop is taken there. The mark is
# dark ink on transparency, which would vanish against a dark browser tab
# strip, so it is composited onto the site's own page ground.
FAVICON_OUT = "src/app/icon.png"
FAVICON_SIZE = 256
FAVICON_PAD = 0.14
FAVICON_GROUND = (251, 249, 245, 255)  # --color-ivory-50

PORTFOLIO_SLUGS = [
    "tribe", "crux", "uniblock", "desyn", "yousend", "deconflict",
    "silence-labs", "kuru", "stan", "shield", "cysic", "blockscholes", "kelp",
]


def build_wordmark() -> tuple[int, int, int]:
    src = Image.open(WORDMARK_SRC).convert("RGB")
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
                # Un-composite from white so partially covered edge pixels
                # recover their true ink colour instead of staying washed out.
                ink = tuple(
                    min(255, max(0, round((c - (1 - alpha) * 255) / alpha)))
                    for c in (r, g, b)
                )
                out[x, y] = (*ink, round(alpha * 255))

    trimmed = keyed.crop(keyed.getbbox())
    tw, th = trimmed.size
    final = trimmed.resize(
        (round(tw * WORDMARK_HEIGHT / th), WORDMARK_HEIGHT), Image.LANCZOS
    )
    # Lossless: this is the primary brand mark, and lossy artefacts on line art
    # are not worth the ~9 KB. The tiles below are a different case.
    final.save(WORDMARK_OUT, "WEBP", lossless=True, method=6)
    return final.width, final.height, os.path.getsize(WORDMARK_OUT)


def build_favicon() -> tuple[int, int, int]:
    """Crop the mark out of the built wordmark and set it on the page ground."""
    lockup = Image.open(WORDMARK_OUT).convert("RGBA")
    width, height = lockup.size
    pixels = lockup.load()

    coverage = [
        sum(1 for y in range(height) if pixels[x, y][3] > 20) for x in range(width)
    ]

    # First run of >=4 empty columns after the mark separates it from the type.
    boundary, run_start = None, None
    for x, column in enumerate(coverage):
        if column == 0:
            if run_start is None:
                run_start = x
            elif x - run_start >= 3:
                boundary = run_start
                break
        else:
            run_start = None
    if boundary is None or boundary < 8:
        raise SystemExit(
            "could not find a transparent gap between the mark and the wordmark; "
            "crop the favicon by hand rather than guessing"
        )

    mark = lockup.crop((0, 0, boundary, height))
    mark = mark.crop(mark.getbbox())

    inner = round(FAVICON_SIZE * (1 - 2 * FAVICON_PAD))
    scale = inner / max(mark.size)
    mark = mark.resize(
        (max(1, round(mark.width * scale)), max(1, round(mark.height * scale))),
        Image.LANCZOS,
    )

    canvas = Image.new("RGBA", (FAVICON_SIZE, FAVICON_SIZE), FAVICON_GROUND)
    canvas.alpha_composite(
        mark, ((FAVICON_SIZE - mark.width) // 2, (FAVICON_SIZE - mark.height) // 2)
    )
    canvas.save(FAVICON_OUT, "PNG", optimize=True)
    return boundary, FAVICON_SIZE, os.path.getsize(FAVICON_OUT)


def build_tile(slug: str) -> tuple[str, int, int, int, int]:
    matches = [
        f for f in os.listdir(f"{BRAND}/portfolio")
        if os.path.splitext(f)[0] == slug
    ]
    if len(matches) != 1:
        raise SystemExit(f"expected exactly one source for {slug!r}, found {matches}")

    src_path = f"{BRAND}/portfolio/{matches[0]}"
    src_bytes = os.path.getsize(src_path)
    opened = Image.open(src_path)

    # Fail loudly rather than silently producing a wrong tile. Pillow's
    # CMYK->RGB conversion shifts colour on Adobe-exported JPEGs, and
    # Image.open on an animated source quietly takes frame 0.
    if opened.mode == "CMYK":
        raise SystemExit(f"{slug}: CMYK source — ask for an sRGB export")
    if getattr(opened, "is_animated", False):
        raise SystemExit(f"{slug}: animated source — ask for a still export")

    image = opened.convert("RGBA")
    width, height = image.size

    # Every supplied logo so far is between 1:1 and 1.17:1, so padding to a
    # square is invisible. A strongly non-square mark (a 4:1 wordmark, say)
    # would be scaled to fit 192px on its long axis and end up unreadable in a
    # 56px tile, so stop and let a person decide how to frame it.
    aspect = max(width, height) / min(width, height)
    if aspect > 1.5:
        raise SystemExit(
            f"{slug}: source is {width}x{height} ({aspect:.1f}:1). Squaring it "
            f"would render the mark too small in the tile — decide the framing "
            f"before building."
        )

    scale = TILE / max(width, height)
    resized = image.resize(
        (max(1, round(width * scale)), max(1, round(height * scale))), Image.LANCZOS
    )
    square = Image.new("RGBA", (TILE, TILE), (0, 0, 0, 0))
    square.paste(
        resized, ((TILE - resized.width) // 2, (TILE - resized.height) // 2)
    )

    out_path = f"{OUT}/{slug}.webp"
    square.save(out_path, "WEBP", quality=TILE_QUALITY, method=6)
    return matches[0], width, height, src_bytes, os.path.getsize(out_path)


def main() -> int:
    if not os.path.isdir(BRAND):
        print(f"missing {BRAND}/ — nothing to build from", file=sys.stderr)
        return 1
    os.makedirs(OUT, exist_ok=True)

    w, h, size = build_wordmark()
    print(f"wordmark  {WORDMARK_OUT}  {w}x{h}  {size / 1024:.1f} KB (lossless)")

    boundary, fav, fav_bytes = build_favicon()
    print(
        f"favicon   {FAVICON_OUT}  {fav}x{fav}  {fav_bytes / 1024:.1f} KB "
        f"(mark cropped at the transparent gap, column {boundary})"
    )

    print(f"\ntiles     {TILE}x{TILE} WebP q{TILE_QUALITY}")
    print(f"  {'slug':14} {'source':22} {'source px':11} {'src KB':>7} {'out KB':>7}")
    src_total = out_total = 0
    for slug in PORTFOLIO_SLUGS:
        name, sw, sh, sb, ob = build_tile(slug)
        src_total += sb
        out_total += ob
        print(f"  {slug:14} {name:22} {f'{sw}x{sh}':11} {sb / 1024:7.1f} {ob / 1024:7.1f}")
    print(f"  {'TOTAL':14} {'':22} {'':11} {src_total / 1024:7.1f} {out_total / 1024:7.1f}")
    print(f"\n  {100 * (1 - out_total / src_total):.1f}% smaller than the supplied originals")
    print(f"  every tile is {TILE}x{TILE}: keep src/data/portfolio.ts in step if TILE changes")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
