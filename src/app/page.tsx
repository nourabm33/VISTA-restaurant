import type { Metadata } from "next";
import { restaurant } from "@/data/restaurant";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";
import { SignatureCocktails } from "@/components/home/SignatureCocktails";
import { ArTeaser } from "@/components/home/ArTeaser";
import { Gallery } from "@/components/home/Gallery";
import { ReservationCta } from "@/components/home/ReservationCta";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";

export const metadata: Metadata = {
  title: `${restaurant.name} · ${restaurant.address.city}`,
  description: `${restaurant.tagline} ${restaurant.description}`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <RestaurantJsonLd />
      <Hero />
      <Intro />
      <FeaturedDishes />
      <SignatureCocktails />
      <ArTeaser />
      <Gallery />
      <ReservationCta />
    </>
  );
}
