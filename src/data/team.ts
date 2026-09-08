/**
 * The Trove team.
 *
 * Four members are fully supplied. The last two entries are LABELLED
 * PLACEHOLDERS — the name, role and experience read as placeholders on purpose
 * and no real person is implied. Do not fill them in from a web search or an
 * assumption: a similarly named person is not evidence about this team.
 *
 * ⚠️ THREE OF THE FOUR PORTRAIT FILENAMES CARRY NO IDENTITY. They arrived as
 * `image.png`, `image (1).png` and `image (2).png` — generic browser-download
 * names — so the person each belongs to is an INFERENCE, not something the
 * filename states. It was made by matching each frame against two independent
 * earlier sources: the previously rendered team grid, and a set of cut-out
 * tiles that had been supplied under real names. The matches are on clothing
 * and eyewear:
 *
 *   image.png            cream linen suit, greenery        Ashish Singhal
 *   image (2).png        navy blazer, green shirt, rimless Sagar Vimal Tiwari
 *   image (1).png        black polo, dark frames, beard    Siva Venkataraman
 *   Pratyush Shah 2.jpg  (named in the file)               Pratyush Shah
 *
 * If any of those is wrong it publishes a real person's face under another
 * person's name, so it is worth an eyeball before this ships. Renaming the
 * files after the person would remove the ambiguity permanently — the paths
 * below are the only references, so it is a four-line change.
 *
 * Paths are reproduced EXACTLY, spaces and parentheses included: the
 * production host serves them literally and a "tidied" path 404s.
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
    image: { src: "/team/image.png", width: 2045, height: 2005 },
  },
  {
    name: "Sagar Vimal Tiwari",
    role: "Co-founder",
    experience: "CoinSwitch & Lemonn",
    description:
      "An alumnus of Jaypee Institute of Information Technology and a product builder at heart, Vimal is focused on implementing strategies to meet CoinSwitch's organizational objectives.",
    image: { src: "/team/image (2).png", width: 1809, height: 2141 },
  },
  {
    name: "Siva Venkataraman",
    role: "Vice President-Finance",
    experience: "CoinSwitch",
    description:
      "An alumnus of the ISB and a CFA charter holder, Siva is currently the Head of Finance at CoinSwitch, leveraging his expertise in business finance, fundraising, and investor relations to drive strategic initiatives.",
    image: { src: "/team/image (1).png", width: 189, height: 196 },
  },
  {
    name: "Pratyush Shah",
    role: "Investments Lead",
    experience: "CoinSwitch Ventures",
    description:
      "An early-stage investor with a deep interest in emerging technologies, Pratyush leads tech and Web3 investments at CoinSwitch Ventures, backing founders building across sectors shaping the future of the digital economy.",
    image: { src: "/team/Pratyush Shah 2.jpg", width: 670, height: 838 },
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
