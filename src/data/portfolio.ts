export const portfolioCategories = [
  "Enterprise & Infrastructure",
  "Consumer",
  "Digital Assets",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

type PortfolioCompany = {
  name: string;
  description: string;
  url: string;
  logo: { src: string; width: number; height: number };
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
    category: "Enterprise & Infrastructure",
  },
  {
    name: "Uniblock",
    description: "Unified Web3 API layer",
    url: "https://uniblock.dev/",
    logo: { src: "/logo/uniblock.webp", width: 192, height: 192 },
    category: "Enterprise & Infrastructure",
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
    category: "Consumer",
  },
  {
    name: "Deconflict",
    description: "Verified Intelligence for Financial Crime",
    url: "https://deconflict.com/law-enforcement/",
    logo: { src: "/logo/deconflict.webp", width: 192, height: 192 },
    category: "Enterprise & Infrastructure",
  },
  {
    name: "Silence Labs",
    description: "Institutional grade security platform",
    url: "https://silencelaboratories.com/",
    logo: { src: "/logo/silence-labs.webp", width: 192, height: 192 },
    category: "Enterprise & Infrastructure",
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
    category: "Enterprise & Infrastructure",
  },
  {
    name: "Cysic",
    description: "Full-Stack Compute Network",
    url: "https://app.cysic.xyz/",
    logo: { src: "/logo/cysic.webp", width: 192, height: 192 },
    category: "Enterprise & Infrastructure",
  },
  {
    name: "BlockScholes",
    description: "Crypto Derivatives Intelligence",
    url: "https://www.blockscholes.com/",
    logo: { src: "/logo/blockscholes.webp", width: 192, height: 192 },
    category: "Digital Assets",
  },
  {
    name: "Kelp",
    description: "Liquid Restaking Platform",
    url: "https://kerneldao.com/kelp/",
    logo: { src: "/logo/kelp.webp", width: 192, height: 192 },
    category: "Digital Assets",
  },
];

export function assignedCategories(
  companies: readonly PortfolioCompany[] = portfolioCompanies,
): readonly PortfolioCategory[] {
  return portfolioCategories.filter((category) =>
    companies.some((company) => company.category === category),
  );
}
