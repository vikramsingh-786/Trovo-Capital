/**
 * Press coverage of portfolio companies.
 *
 * HEADLINES ARE REPRODUCED VERBATIM as published. Both publications block
 * automated fetching (HTTP 403), so the titles below were recovered from the
 * search index rather than the pages themselves — they are the real page
 * titles, but if a publication later revises a headline this file is the only
 * place to correct it. Do not shorten, retitle or "tidy" one to fit the layout.
 *
 * ⚠️ NO PUBLICATION DATES. The reference design the owner pointed at shows a
 * date under each headline, and these are deliberately absent: the 403 meant
 * neither date could be read off the article, and a date on a press card is a
 * factual claim about a publication, not a layout detail. Sibling coverage
 * suggests roughly April 2026 for the Uniblock round and June 2026 for the
 * YouSend launch, but that is an inference about OTHER articles and is not
 * good enough to print. `date` is optional and the component renders it only
 * when present, so supplying the two real dates is a one-line edit each.
 *
 * The visual for each card is the PORTFOLIO COMPANY'S OWN LOGO, already built
 * into public/logo/ for the portfolio section, rather than the publication's
 * article thumbnail. Two reasons: the article images belong to the
 * publications and hotlinking them is a licensing question nobody has
 * answered, and `next.config.ts` only allow-lists images.unsplash.com, so a
 * remote thumbnail would break the moment the image optimizer is turned back
 * on. Reusing the logo also ties this section to the portfolio, which is the
 * point — this is coverage OF the portfolio.
 */
export type PressItem = {
  /** Headline exactly as published. */
  title: string;
  /** Publication name, as it styles itself. */
  publication: string;
  url: string;
  /** The portfolio company the coverage is about. Must match src/data/portfolio.ts. */
  company: string;
  /** That company's logo tile, shared with the portfolio section. */
  logo: { src: string; width: number; height: number };
  /** Omitted until confirmed. NEVER guess a publication date. */
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
