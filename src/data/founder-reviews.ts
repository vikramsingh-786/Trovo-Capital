/**
 * Founder reviews.
 *
 * SUPPLIED BY THE OWNER AND REPRODUCED VERBATIM. The names, designations,
 * companies, credential lines and quotes below are real. Do not reword a quote,
 * tighten it, fix its punctuation, or "improve" a credential line — if one
 * needs shortening the owner has said that is a later, explicit decision.
 *
 * ⚠️ KEVIN CALLAHAN'S QUOTE HAS NOT BEEN SUPPLIED. The owner sent a row of
 * placeholder characters for it and said Uniblock would provide the real text
 * after this draft, so `quote` is `null` and the component renders a labelled
 * "awaiting quote" state. DO NOT write a stand-in testimonial here, not even a
 * plausible one — an invented founder quote is a claim the project cannot
 * substantiate. Replacing it is a one-line edit.
 *
 * Portraits are the ORIGINALS as supplied, straight out of public/founders/,
 * and their intrinsic sizes are recorded below so each reserves the right box.
 * They are neither uniform nor web-weight: 2400x3000, 400x400 and 944x1120, at
 * 1255 KB, 28 KB and 262 KB. `images.unoptimized` is forced by static export,
 * so whatever is here ships byte-for-byte to the browser. Normalising these the
 * way scripts/build-assets.py already normalises the portfolio tiles is a
 * pending task, not something that has been done.
 *
 * Real quotes vary a lot in length; the grid aligns cells to the top so uneven
 * quotes sit correctly rather than stretching to match.
 */
type FounderReview = {
  name: string;
  /** Company the founder is speaking as. */
  company: string;
  /**
   * `null` while the founder has still to supply it. The component renders a
   * labelled placeholder for that case — never invent the text.
   */
  quote: string | null;
  /** Designation at that company, e.g. "Founder". */
  role?: string;
  /**
   * The credential line to lead with, exactly as supplied. Not parsed or
   * split — it is one line of prose whose order the owner chose.
   */
  credentials?: string;
  /** Portrait under public/founders/, with its intrinsic size. */
  image?: { src: string; width: number; height: number };
  link?: string;
};

export const founderReviews: readonly FounderReview[] = [
  {
    name: "Mudassar Malik",
    role: "Founder",
    company: "Deconflict",
    credentials: "22 years US Secret Service, MIT, Harvard University",
    quote:
      "Really enjoyed working with the team from the start. The diligence process was thoughtful and straightforward, and since investing they've stayed engaged and helpful without getting in the way. We're happy to have them on the cap table.",
    image: {
      src: "/founders/Mudassar Malik.jpg",
      width: 944,
      height: 1120,
    },
  },
  {
    name: "Adeoye Ojo",
    role: "Founder",
    company: "YouSend",
    credentials: "2x founder, Jumia, Oxford University",
    quote:
      "We've greatly enjoyed working with the team. They ask hard questions, but the team is always willing to help in the ways that matter: the right introductions, product-minded feedback, and growth strategies that actually work in emerging markets. It's easy to tell these are investors with operator-level experience, and that's rare to find.",
    image: {
      src: "/founders/Adeoye Ojo.JPEG",
      width: 2400,
      height: 3000,
    },
  },
  {
    name: "Kevin Callahan",
    role: "Founder",
    company: "Uniblock",
    credentials: "Headed global expansion for Twitter and Coinbase",
    // Not yet supplied — see the warning at the top of this file.
    quote: null,
    image: {
      src: "/founders/Kevin Callahan.jpg",
      width: 400,
      height: 400,
    },
  },
];
