import Image from "next/image";
import { gallery } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const spans = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
];

export function Gallery() {
  return (
    <section className="bg-ivory-100 py-20 sm:py-28" aria-labelledby="gallery-title">
      <Container>
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title="Atmosfera VISTA"
          description="Uno sguardo alla sala, al bancone e alla cucina."
          align="center"
        />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:auto-rows-[180px] lg:auto-rows-[220px]">
          {gallery.map((photo, i) => (
            <li
              key={photo.id}
              className={`relative aspect-square overflow-hidden rounded-2xl bg-ivory-200 sm:aspect-auto ${spans[i] ?? ""}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
              {photo.caption ? (
                <span className="absolute bottom-3 left-3 rounded-full bg-charcoal-900/70 px-2.5 py-1 text-[11px] text-ivory-50 backdrop-blur-sm">
                  {photo.caption}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
