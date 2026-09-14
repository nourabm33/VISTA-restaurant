import type { GalleryImage, ImageAsset } from "@/types/content";

export const brandImages: Record<"hero" | "about" | "arTeaser", ImageAsset> = {
  hero: {
    src: "/images/brand/hero.webp",
    alt: "Il bancone illuminato del cocktail bar di VISTA",
    width: 1600,
    height: 1200,
    credit: "Unsplash",
  },
  about: {
    src: "/images/brand/about.webp",
    alt: "Un piatto servito al tavolo durante una cena",
    width: 1600,
    height: 1067,
    credit: "Unsplash",
  },
  arTeaser: {
    src: "/images/brand/ar-teaser.webp",
    alt: "Risotto al tartufo visto dall'alto su piatto bianco",
    width: 1200,
    height: 801,
    credit: "Unsplash",
  },
};

export const gallery: GalleryImage[] = [
  {
    id: "sala",
    src: "/images/gallery/sala.webp",
    alt: "La sala principale del ristorante con tavoli in legno",
    width: 1600,
    height: 1067,
    caption: "La sala",
  },
  {
    id: "cucina",
    src: "/images/gallery/cucina.webp",
    alt: "Lo chef impiatta in cucina",
    width: 1280,
    height: 1600,
    caption: "In cucina",
  },
  {
    id: "bar",
    src: "/images/gallery/bar.webp",
    alt: "Il bancone del bar con bottiglie e luci calde",
    width: 1600,
    height: 1200,
    caption: "Il bar",
  },
  {
    id: "pasta-fresca",
    src: "/images/gallery/pasta-fresca.webp",
    alt: "Preparazione della pasta fresca",
    width: 1600,
    height: 1067,
    caption: "Pasta fresca ogni giorno",
  },
  {
    id: "terrazza",
    src: "/images/gallery/terrazza.webp",
    alt: "La terrazza con vista al tramonto",
    width: 1600,
    height: 1200,
    caption: "La terrazza",
  },
  {
    id: "cocktail-trio",
    src: "/images/gallery/cocktail-trio.webp",
    alt: "Tre cocktail colorati sul bancone",
    width: 1600,
    height: 970,
    caption: "Signature cocktail",
  },
  {
    id: "brindisi",
    src: "/images/gallery/brindisi.webp",
    alt: "Brindisi con calici di vino bianco",
    width: 1600,
    height: 1067,
    caption: "Momenti da condividere",
  },
  {
    id: "interni",
    src: "/images/gallery/interni.webp",
    alt: "Gli interni luminosi del ristorante",
    width: 1600,
    height: 1200,
    caption: "Gli interni",
  },
];
