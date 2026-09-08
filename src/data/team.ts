/**
 * The Trove team.
 *
 * Four members are fully supplied. The last two entries are LABELLED
 * PLACEHOLDERS — the name, role and experience read as placeholders on purpose
 * and no real person is implied. Do not fill them in from a web search or an
 * assumption: a similarly named person is not evidence about this team.
 *
 * PORTRAITS ARE CUT OUT ONTO PLAIN WHITE. The owner replaced the original
 * location photographs — each shot against a different daylight background,
 * one of them against a poster — with the subject masked onto one flat white
 * ground, and named each file after the person. Two things follow:
 *
 *   The set is now unified in the ARTWORK, not by CSS. `media-plate` still
 *     desaturates in the component, which over a white ground yields exactly
 *     the monochrome-portrait-on-plain-backdrop look the owner asked for.
 *   The subject sits high in the frame and the aspect ratios still differ
 *     (1.02 / 0.84 / 0.96 / 0.80), so the component anchors the square crop to
 *     the TOP. Centred, the tallest frames lost around a tenth of their height
 *     off the top and clipped hair.
 *
 * Filenames now identify the person, so nothing here depends on inference.
 *
 * The component renders only the fields that exist, so supplying any of them
 * later is a data edit with no layout work:
 *
 *   role        their designation at Trove
 *   experience  the founder/operator credential to lead with — the owner's
 *               stated requirement is to "highlight each of their startup
 *               experience along with the image"
 *   description longer biography, if there is one
 *   image       portrait; add the file under public/team/ and record its
 *               intrinsic size so it reserves space
 *   link        profile or external page
 */
export type TeamMember = {
  name: string;
  role?: string;
  experience?: string;
  description?: string;
  image?: { src: string; width: number; height: number };
  link?: string;
};

export const teamMembers: readonly TeamMember[] = [
  {
    name: "Ashish Singhal",
    role: "Co-founder",
    experience: "CoinSwitch & Lemonn",
    description:
      "A BUIDLer focused on simplicity and user satisfaction, Ashish believes in the transformative power of blockchain-based solutions and their potential to revolutionize India's tech industry.",
    image: { src: "/team/ashish.png", width: 1268, height: 1241 },
  },
  {
    name: "Sagar Vimal Tiwari",
    role: "Co-founder",
    experience: "CoinSwitch & Lemonn",
    description:
      "An alumnus of Jaypee Institute of Information Technology and a product builder at heart, Vimal is focused on implementing strategies to meet CoinSwitch's organizational objectives.",
    image: { src: "/team/vimal.png", width: 1152, height: 1365 },
  },
  {
    name: "Siva Venkataraman",
    role: "Vice President-Finance",
    experience: "CoinSwitch",
    description:
      "An alumnus of the ISB and a CFA charter holder, Siva is currently the Head of Finance at CoinSwitch, leveraging his expertise in business finance, fundraising, and investor relations to drive strategic initiatives.",
    image: { src: "/team/siva.png", width: 1231, height: 1277 },
  },
  {
    name: "Pratyush Shah",
    role: "Investments Lead",
    experience: "CoinSwitch Ventures",
    description:
      "An early-stage investor with a deep interest in emerging technologies, Pratyush leads tech and Web3 investments at CoinSwitch Ventures, backing founders building across sectors shaping the future of the digital economy.",
    image: { src: "/team/pratyush.png", width: 1121, height: 1403 },
  },
  {
    name: "Team Member",
    role: "Role",
    experience: "[Placeholder]",
    description: "Team member biography coming soon.",
  },
  {
    name: "Team Member",
    role: "Role",
    experience: "[Placeholder]",
    description: "Team member biography coming soon.",
  },
];
