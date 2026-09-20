export type Media = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const heroMedia: Media = {
  src: "/images/hero.jpg",
  width: 2400,
  height: 1600,
  alt: "The corner of a dark modernist tower against a black sky",
};

export const aboutMedia: Media = {
  src: "/images/about.jpg",
  width: 900,
  height: 1350,
  alt: "Folded concrete planes meeting at a sharp vertical ridge",
};

export const perspectiveMedia: readonly Media[] = [
  {
    src: "/images/perspective-1.jpg",
    width: 800,
    height: 533,
    alt: "A hard-edged roofline cut against an overcast sky",
  },
  {
    src: "/images/perspective-2.jpg",
    width: 800,
    height: 1200,
    alt: "A faceted glass curtain wall reflecting evening light",
  },
  {
    src: "/images/perspective-3.jpg",
    width: 800,
    height: 533,
    alt: "Ribbed black louvres sweeping across a curved surface",
  },
];

export const ctaMedia: Media = {
  src: "/images/cta.jpg",
  width: 2000,
  height: 1333,
  alt: "A softly lit curved form emerging from darkness",
};
