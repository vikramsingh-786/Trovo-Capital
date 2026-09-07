/**
 * Founder reviews.
 *
 * ⚠️ EVERY ENTRY BELOW IS TEMPORARY DUMMY DATA. Nothing here is real: the
 * names are ordinals, the designations and companies say "Temporary", and the
 * quote is a placeholder instruction rather than a testimonial. No real
 * founder, company, credential or claim has been invented.
 *
 * TO REPLACE: overwrite this array with the approved reviews. Nothing in
 * src/components/founder-reviews.tsx needs to change — including the count,
 * which the grid handles, and `image`/`link`, which render only when present.
 *
 * Real quotes will vary in length; the grid aligns cells to the top so uneven
 * quotes sit correctly rather than stretching.
 */
export type FounderReview = {
  name: string;
  /** Company the founder is speaking as. */
  company: string;
  quote: string;
  /** Designation at that company, e.g. "Co-founder". */
  role?: string;
  /** Portrait; add the file under public/founders/ with its intrinsic size. */
  image?: { src: string; width: number; height: number };
  link?: string;
};

const PLACEHOLDER_QUOTE =
  "Temporary founder testimonial — replace this copy with the approved founder review.";

export const founderReviews: readonly FounderReview[] = [
  {
    name: "Founder One",
    role: "Temporary Founder",
    company: "Temporary Company",
    quote: PLACEHOLDER_QUOTE,
  },
  {
    name: "Founder Two",
    role: "Temporary Founder",
    company: "Temporary Company",
    quote: PLACEHOLDER_QUOTE,
  },
  {
    name: "Founder Three",
    role: "Temporary Founder",
    company: "Temporary Company",
    quote: PLACEHOLDER_QUOTE,
  },
  {
    name: "Founder Four",
    role: "Temporary Founder",
    company: "Temporary Company",
    quote: PLACEHOLDER_QUOTE,
  },
];
