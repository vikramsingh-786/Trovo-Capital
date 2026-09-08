/**
 * The three investment perspectives.
 *
 * Copy is owner-supplied and reproduced exactly (docs/CONTENT.md) — including
 * the em dash and the typographic apostrophes. Do not rewrite, shorten,
 * paraphrase or extend it, and do not add a fourth entry without approval.
 *
 * `marker` is a typographic device, not a claim: it numbers the perspectives
 * so they read as one sequence rather than three unrelated statements.
 */
type Perspective = {
  marker: string;
  title: string;
  description: string;
};

export const perspectives: readonly Perspective[] = [
  {
    marker: "01",
    title: "Understanding that runs deep",
    description:
      "Our roots are in building and scaling technology businesses — bringing an operator’s understanding of products, markets and the challenges of growth to how we invest.",
  },
  {
    marker: "02",
    title: "A network built to compound",
    description:
      "Our global network of founders, operators and investors creates meaningful access to expertise, strategic relationships and capital.",
  },
  {
    marker: "03",
    title: "Built for the scaling journey",
    description:
      "We partner with companies at pivotal stages of growth, bringing an operator’s perspective to go-to-market, new markets, and the decisions that shape scale.",
  },
] as const;
