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
 * CATEGORIES ARE UNASSIGNED. The owner has not supplied the mapping, so every
 * `category` is `null` — never a guess. Filling this in is the only change
 * needed to activate filtering; see `portfolioCategories` below.
 *
 * Logo intrinsic sizes are recorded so images reserve their space without a
 * layout shift. They are the assets' real dimensions, several of which are far
 * larger than needed for a ~56px tile — resizing belongs to the assets phase.
 */

export const portfolioCategories = [
  "Consumer",
  "Enterprise",
  "Infrastructure",
  "Digital Assets",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export type PortfolioCompany = {
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
    logo: { src: "/logo/tribe.jpg", width: 480, height: 480 },
    category: null,
  },
  {
    name: "Crux",
    description: "AI platform for performance-marketing",
    url: "http://getcrux.ai/",
    logo: { src: "/logo/crux.png", width: 400, height: 400 },
    category: null,
  },
  {
    name: "Uniblock",
    description: "Unified Web3 API layer",
    url: "https://uniblock.dev/",
    logo: { src: "/logo/uniblock.jpg", width: 400, height: 400 },
    category: null,
  },
  {
    name: "Desyn",
    description: "Decentralized Liquidity Infrastructure",
    url: "https://desyn.io/#/",
    logo: { src: "/logo/desyn.jpg", width: 1164, height: 1164 },
    category: null,
  },
  {
    name: "YouSend",
    description: "Stablecoin powered remittance platform",
    url: "https://yousend.co/",
    logo: { src: "/logo/yousend.jpg", width: 400, height: 400 },
    category: null,
  },
  {
    name: "Deconflict",
    description: "Verified Intelligence for Financial Crime",
    url: "https://deconflict.com/law-enforcement/",
    logo: { src: "/logo/deconflict.jpg", width: 400, height: 400 },
    category: null,
  },
  {
    name: "Silence Labs",
    description: "Institutional grade security platform",
    url: "https://silencelaboratories.com/",
    logo: { src: "/logo/silence-labs.jpg", width: 400, height: 400 },
    category: null,
  },
  {
    name: "Kuru",
    description: "Fully onchain order book DEX",
    url: "https://www.kuru.io/",
    logo: { src: "/logo/kuru.jpg", width: 1600, height: 1600 },
    category: null,
  },
  {
    name: "Stan",
    description: "Gaming & Creator Hub",
    url: "https://getstan.app/",
    logo: { src: "/logo/stan.jpg", width: 400, height: 400 },
    category: null,
  },
  {
    name: "Shield",
    description: "Cross Border Stablecoin Neo Bank",
    url: "https://www.getshield.xyz/en",
    logo: { src: "/logo/shield.png", width: 240, height: 206 },
    category: null,
  },
  {
    name: "Cysic",
    description: "Full-Stack Compute Network",
    url: "https://app.cysic.xyz/",
    logo: { src: "/logo/cysic.jpg", width: 400, height: 400 },
    category: null,
  },
  {
    name: "BlockScholes",
    description: "Crypto Derivatives Intelligence",
    url: "https://www.blockscholes.com/",
    logo: { src: "/logo/blockscholes.png", width: 400, height: 400 },
    category: null,
  },
  {
    name: "Kelp",
    description: "Liquid Restaking Platform",
    url: "https://kerneldao.com/kelp/",
    logo: { src: "/logo/kelp.jpg", width: 400, height: 400 },
    category: null,
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
