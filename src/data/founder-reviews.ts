type FounderReview = {
  name: string;
  company: string;
  country?: string;
  quote: string | null;
  role?: string;
  credentials?: string;
  image?: { src: string; width: number; height: number };
  link?: string;
};

export const founderReviews: readonly FounderReview[] = [
  {
    name: "Kevin Callahan",
    role: "Founder",
    company: "Uniblock",
    country: "Canada",
    credentials: "Formerly headed global expansion for Twitter and Coinbase",
    quote:
      "What stands out is the conviction they bring to the partnership. They take the time to understand where we’re trying to go, stay aligned with the long-term vision, and back us through the decisions and inflection points that matter. As a founder, having investors who think beyond the next milestone and genuinely share the journey is incredibly valuable.",
    image: {
      src: "/founders/Kevin Callahan.webp",
      width: 400,
      height: 400,
    },
  },
  {
    name: "Mudassar Malik",
    role: "Founder",
    company: "Deconflict",
    country: "USA",
    credentials: "22 years US Secret Service, MIT, Harvard University",
    quote:
      "Really enjoyed working with the team from the start. The diligence process was thoughtful and straightforward, and since investing they've stayed engaged and helpful without getting in the way. We're happy to have them on the cap table.",
    image: {
      src: "/founders/Mudassar Malik.webp",
      width: 759,
      height: 900,
    },
  },
  {
    name: "Adeoye Ojo",
    role: "Founder",
    company: "YouSend",
    country: "UK",
    credentials: "2x founder, Jumia, Oxford University",
    quote:
      "We've greatly enjoyed working with the team. They ask hard questions, but the team is always willing to help in the ways that matter: the right introductions, product-minded feedback, and growth strategies that actually work in emerging markets. It's easy to tell these are investors with operator-level experience, and that's rare to find.",
    image: {
      src: "/founders/Adeoye Ojo.webp",
      width: 720,
      height: 900,
    },
  },
];
