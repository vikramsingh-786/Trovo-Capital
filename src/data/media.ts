const UNSPLASH_CDN = "https://images.unsplash.com";

type Media = {
  id: string;
  width: number;
  height: number;
  alt: string;
};

export function unsplash(media: Media, width: number, quality = 68): string {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(width),
    q: String(quality),
  });

  return `${UNSPLASH_CDN}/${media.id}?${params}`;
}

export const heroMedia: Media = {
  id: "photo-1534085897953-27d90056705a",
  width: 1920,
  height: 1280,
  alt: "The corner of a dark modernist tower against a black sky",
};

export const aboutMedia: Media = {
  id: "photo-1518112166137-85f9979a43aa",
  width: 1280,
  height: 1920,
  alt: "Folded concrete planes meeting at a sharp vertical ridge",
};

export const perspectiveMedia: readonly Media[] = [
  {
    id: "photo-1738844153732-a485f0e78382",
    width: 1920,
    height: 1280,
    alt: "A hard-edged roofline cut against an overcast sky",
  },
  {
    id: "photo-1725913496276-47d7147da99f",
    width: 1280,
    height: 1920,
    alt: "A faceted glass curtain wall reflecting evening light",
  },
  {
    id: "photo-1543053976-5fd9336b6de0",
    width: 1920,
    height: 1280,
    alt: "Ribbed black louvres sweeping across a curved surface",
  },
];

export const ctaMedia: Media = {
  id: "photo-1709625862266-014ef072fd93",
  width: 1920,
  height: 1280,
  alt: "A softly lit curved form emerging from darkness",
};
