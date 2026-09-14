import { restaurant } from "@/data/restaurant";
import { brandImages } from "@/data/gallery";

export function RestaurantJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: restaurant.description,
    url: restaurant.siteUrl,
    image: `${restaurant.siteUrl}${brandImages.hero.src}`,
    telephone: restaurant.phone,
    email: restaurant.email,
    servesCuisine: restaurant.cuisine,
    acceptsReservations: true,
    hasMenu: `${restaurant.siteUrl}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address.street,
      addressLocality: restaurant.address.city,
      postalCode: restaurant.address.zip,
      addressCountry: "IT",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
