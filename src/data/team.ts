/**
 * The Trove team.
 *
 * ONLY THE FIVE NAMES HAVE BEEN SUPPLIED. Surnames, roles, photographs,
 * startup experience, descriptions and links have not, so every one of those
 * fields is simply absent — not a plausible-sounding placeholder. Do not fill
 * one in from a web search or an assumption: a similarly named person is not
 * evidence about this team.
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
  { name: "Ashish" },
  { name: "Vimal" },
  { name: "Siva" },
  { name: "Balaji" },
  { name: "Pratyush" },
];
