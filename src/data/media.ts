/**
 * Art-direction imagery.
 *
 * ⚠️ PLACEHOLDER PHOTOGRAPHY. Every image below is a stock photograph hotlinked
 * from Unsplash, chosen for tone only. None of it depicts Trove, its offices,
 * its team or its portfolio companies, and none of it is owned or licensed by
 * the project. Replace it with commissioned or licensed art before launch —
 * this file is the only place that has to change.
 *
 * NO PORTRAITS. There are deliberately no photographs of people here. The five
 * supplied team names have no supplied likeness, and putting a stock face
 * against a real person's name would be a fabrication, not a placeholder.
 *
 * WHY REMOTE URLS: `output: "export"` forces `images.unoptimized`, so
 * `next/image` cannot resize or re-encode anything at build time. Serving these
 * from Unsplash's CDN instead hands that job to a CDN that does it well —
 * `auto=format` negotiates AVIF/WebP per browser and `w` is baked per use.
 * The cost is a runtime dependency on a third party; see README.
 *
 * `next.config.ts` must keep `images.unsplash.com` in `images.remotePatterns`
 * for these to survive a switch back to the optimizer.
 */

const UNSPLASH_CDN = "https://images.unsplash.com";

type Media = {
  /** Unsplash photo id, i.e. the `photo-…` path segment. */
  id: string;
  /** Intrinsic aspect ratio used to reserve layout space. */
  width: number;
  height: number;
  /**
   * Describes the picture, not the section it decorates. `next/image` requires
   * the prop and the build fails without it.
   */
  alt: string;
};

/**
 * Builds a CDN URL at an explicit width.
 *
 * `unoptimized` means whatever is asked for here is exactly what ships, so
 * `width` should be the largest CSS size the image is ever displayed at times
 * a DPR of roughly 2 — not the intrinsic size of the original.
 */
export function unsplash(media: Media, width: number, quality = 68): string {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(width),
    q: String(quality),
  });

  return `${UNSPLASH_CDN}/${media.id}?${params}`;
}

/** Wide, near-black architecture. Carries the hero headline. */
export const heroMedia: Media = {
  id: "photo-1534085897953-27d90056705a",
  width: 1920,
  height: 1280,
  alt: "The corner of a dark modernist tower against a black sky",
};

/** Tall concrete. Sits beside the About copy. */
export const aboutMedia: Media = {
  id: "photo-1518112166137-85f9979a43aa",
  width: 1280,
  height: 1920,
  alt: "Folded concrete planes meeting at a sharp vertical ridge",
};

/**
 * One per investment perspective, in the order the perspectives are declared.
 * Tone only — none of these illustrates a claim.
 */
export const perspectiveMedia: readonly Media[] = [
  {
    id: "photo-1738844153732-a485f0e78382",
    width: 1920,
    height: 1280,
    alt: "A hard-edged roofline cut against an overcast sky",
  },
  {
    id: "photo-1725913496276-47d7147da99f",
    width: 1280,
    height: 1920,
    alt: "A faceted glass curtain wall reflecting evening light",
  },
  {
    id: "photo-1543053976-5fd9336b6de0",
    width: 1920,
    height: 1280,
    alt: "Ribbed black louvres sweeping across a curved surface",
  },
];

/** Quiet texture behind the closing call to action. */
export const ctaMedia: Media = {
  id: "photo-1709625862266-014ef072fd93",
  width: 1920,
  height: 1280,
  alt: "A softly lit curved form emerging from darkness",
};
