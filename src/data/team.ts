type TeamMember = {
  name: string;
  role?: string;
  image?: { src: string; width: number; height: number };
  link?: string;
};

export const teamMembers: readonly TeamMember[] = [
  {
    name: "Pratyush Shah",
    role: "Head of Investments",
    image: { src: "/team/pratyush.png", width: 1121, height: 1403 },
    link: "https://www.linkedin.com/in/pratyush-shah-8b104029/",
  },
  {
    name: "Prathamesh Bhaskar",
    role: "Investment Associate",
    image: { src: "/team/prathamesh.png", width: 1122, height: 1402 },
    link: "https://www.linkedin.com/in/prathaamesh-bhaskar/",
  },
  {
    name: "Balaji Srihari",
    role: "Advisor",
    image: { src: "/team/balaji.webp", width: 559, height: 527 },
    link: "https://www.linkedin.com/in/balajisrihari/",
  },
  {
    name: "Siva Venkataraman",
    role: "Advisor",
    image: { src: "/team/siva.png", width: 1231, height: 1277 },
    link: "https://www.linkedin.com/in/siva1982/",
  },
  {
    name: "Ashish Singhal",
    role: "Advisor",
    image: { src: "/team/ashish.png", width: 1268, height: 1241 },
    link: "https://www.linkedin.com/in/ashish-singhal-peepalco/",
  },
  {
    name: "Vimal Sagar Tiwari",
    role: "Advisor",
    image: { src: "/team/vimal.png", width: 1152, height: 1365 },
    link: "https://www.linkedin.com/in/sagarvimal/",
  },
];
