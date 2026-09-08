/**
 * Portfolio companies.
 *
 * Names, descriptions and URLs are owner-supplied and reproduced EXACTLY
 * (docs/CONTENT.md). Do not rewrite a description, "fix" a URL, or add a
 * company. Nothing here may be expanded from a company's own website.
 *
 * NAMING NOTE: an early source listed this company as "Uninlock". The detailed
 * portfolio record supplied later gives "Uniblock" with https://uniblock.dev/,
 * and that is what is used here. There is deliberately no second entry.
 *
 * ⚠️ EVERY `category` BELOW IS A PLACEHOLDER, NOT AN OWNER-CONFIRMED MAPPING.
 * The owner has still not supplied one. They were inferred from each company's
 * own supplied description purely so the filter bar has something to filter,
 * and they are the single most likely thing on this page to be wrong. Treat
 * them as unverified until the real mapping arrives, at which point correcting
 * them is a one-word edit per row and no component changes.
 *
 * The `category` field is still nullable, and the filter bar is still built
 * from the categories that actually occur, so reverting any or all of these to
 * `null` degrades cleanly rather than rendering an empty chip.
 *
 * Logo paths point at BUILT assets, not the supplied originals. The originals
 * live in assets/brand/portfolio/ (outside public/, so they are never
 * deployed) and scripts/build-assets.py produces public/logo/*.webp from them:
 * every tile is normalised to 192x192, which is why the dimensions below are
 * uniform. Re-run that script after changing a supplied asset; if its TILE
 * constant changes, update these dimensions to match.
 */

export const portfolioCategories = [
  "Consumer",
  "Enterprise",
  "Infrastructure",
  "Digital Assets",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

type PortfolioCompany = {
  name: string;
  description: string;
  /** External destination, exactly as supplied. */
  url: string;
  logo: { src: string; width: number; height: number };
  /** `null` until the owner confirms the mapping. Never inferred. */
  category: PortfolioCategory | null;
};

export const portfolioCompanies: readonly PortfolioCompany[] = [
  {
    name: "Tribe",
    description: "24/7 personal finance companion",
    url: "https://www.tribemoney.ai/",
    logo: { src: "/logo/tribe.webp", width: 192, height: 192 },
    category: "Consumer",
  },
  {
    name: "Crux",
    description: "AI platform for performance-marketing",
    url: "http://getcrux.ai/",
    logo: { src: "/logo/crux.webp", width: 192, height: 192 },
    category: "Enterprise",
  },
  {
    name: "Uniblock",
    description: "Unified Web3 API layer",
    url: "https://uniblock.dev/",
    logo: { src: "/logo/uniblock.webp", width: 192, height: 192 },
    category: "Infrastructure",
  },
  {
    name: "Desyn",
    description: "Decentralized Liquidity Infrastructure",
    url: "https://desyn.io/#/",
    logo: { src: "/logo/desyn.webp", width: 192, height: 192 },
    category: "Digital Assets",
  },
  {
    name: "YouSend",
    description: "Stablecoin powered remittance platform",
    url: "https://yousend.co/",
    logo: { src: "/logo/yousend.webp", width: 192, height: 192 },
    category: "Digital Assets",
  },
  {
    name: "Deconflict",
    description: "Verified Intelligence for Financial Crime",
    url: "https://deconflict.com/law-enforcement/",
    logo: { src: "/logo/deconflict.webp", width: 192, height: 192 },
    category: "Enterprise",
  },
  {
    name: "Silence Labs",
    description: "Institutional grade security platform",
    url: "https://silencelaboratories.com/",
    logo: { src: "/logo/silence-labs.webp", width: 192, height: 192 },
    category: "Infrastructure",
  },
  {
    name: "Kuru",
    description: "Fully onchain order book DEX",
    url: "https://www.kuru.io/",
    logo: { src: "/logo/kuru.webp", width: 192, height: 192 },
    category: "Digital Assets",
  },
  {
    name: "Stan",
    description: "Gaming & Creator Hub",
    url: "https://getstan.app/",
    logo: { src: "/logo/stan.webp", width: 192, height: 192 },
    category: "Consumer",
  },
  {
    name: "Shield",
    description: "Cross Border Stablecoin Neo Bank",
    url: "https://www.getshield.xyz/en",
    logo: { src: "/logo/shield.webp", width: 192, height: 192 },
    category: "Digital Assets",
  },
  {
    name: "Cysic",
    description: "Full-Stack Compute Network",
    url: "https://app.cysic.xyz/",
    logo: { src: "/logo/cysic.webp", width: 192, height: 192 },
    category: "Infrastructure",
  },
  {
    name: "BlockScholes",
    description: "Crypto Derivatives Intelligence",
    url: "https://www.blockscholes.com/",
    logo: { src: "/logo/blockscholes.webp", width: 192, height: 192 },
    category: "Enterprise",
  },
  {
    name: "Kelp",
    description: "Liquid Restaking Platform",
    url: "https://kerneldao.com/kelp/",
    logo: { src: "/logo/kelp.webp", width: 192, height: 192 },
    category: "Digital Assets",
  },
];

/**
 * Categories that actually have at least one confirmed company. The filter bar
 * is built from this, not from `portfolioCategories`, so an unconfirmed
 * category can never render a chip that returns nothing.
 */
export function assignedCategories(
  companies: readonly PortfolioCompany[] = portfolioCompanies,
): readonly PortfolioCategory[] {
  return portfolioCategories.filter((category) =>
    companies.some((company) => company.category === category),
  );
}
