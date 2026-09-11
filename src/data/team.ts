type TeamMember = {
  name: string;
  role?: string;
  experience?: string;
  description?: string;
  image?: { src: string; width: number; height: number };
  link?: string;
};

export const teamMembers: readonly TeamMember[] = [
  {
    name: "Pratyush Shah",
    role: "Investments Lead",
    experience: "CoinSwitch Ventures",
    description:
      "Venture investor with deep experience evaluating, investing in and partnering with emerging technology businesses globally.",
    image: { src: "/team/pratyush.png", width: 1121, height: 1403 },
    link: "https://www.linkedin.com/in/pratyush-shah-8b104029/",
  },
  {
    name: "Balaji Srihari",
    description:
      "Investor and operator with experience across venture capital and Flipkart, one of India's defining homegrown technology companies.",
  },
  {
    name: "Siva Venkataraman",
    role: "Vice President-Finance",
    experience: "CoinSwitch",
    description:
      "Entrepreneur and business leader with two decades of experience across startups, finance, fundraising and strategy.",
    image: { src: "/team/siva.png", width: 1231, height: 1277 },
    link: "https://www.linkedin.com/in/siva1982/",
  },
  {
    name: "Ashish Singhal",
    role: "Co-founder",
    experience: "CoinSwitch & Lemonn",
    description:
      "2x founder with first-hand experience building and scaling category-defining technology businesses.",
    image: { src: "/team/ashish.png", width: 1268, height: 1241 },
    link: "https://www.linkedin.com/in/ashish-singhal-peepalco/",
  },
  {
    name: "Vimal Sagar Tiwari",
    role: "Co-founder",
    experience: "CoinSwitch & Lemonn",
    description:
      "Technologist and 2x founder with deep experience building products and technology platforms for millions of users.",
    image: { src: "/team/vimal.png", width: 1152, height: 1365 },
    link: "https://www.linkedin.com/in/sagarvimal/",
  },
];
