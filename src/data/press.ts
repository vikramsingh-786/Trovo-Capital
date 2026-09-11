export type PressItem = {
  title: string;
  publication: string;
  url: string;
  company: string;
  logo: { src: string; width: number; height: number };
  date?: string;
};

export const pressItems: readonly PressItem[] = [
  {
    title:
      "Stablecoin remittance app goes live in UK after $1m in transactions during silent beta",
    publication: "Sifted",
    url: "https://sifted.eu/articles/stablecoin-remittance-app-live-in-uk-brnd",
    company: "YouSend",
    logo: { src: "/logo/yousend.webp", width: 192, height: 192 },
  },
  {
    title: "Uniblock raises $5.2M to simplify the future of blockchain development",
    publication: "TheStreet",
    url: "https://www.thestreet.com/crypto/markets/uniblock-raises-5-2m-to-simplify-the-future-of-blockchain-development",
    company: "Uniblock",
    logo: { src: "/logo/uniblock.webp", width: 192, height: 192 },
  },
];
