import type { RestaurantInfo } from "@/types/content";

export const restaurant: RestaurantInfo = {
  name: "VISTA — Cucina & Cocktail",
  shortName: "VISTA",
  tagline: "Scopri il gusto. Vivilo prima ancora di assaggiarlo.",
  description:
    "Cucina italiana contemporanea e cocktail d'autore in un ambiente elegante e rilassato. Materie prime di stagione, tecnica e un tocco di innovazione.",
  cuisine: "Cucina italiana contemporanea",
  address: {
    street: "Via del Belvedere 12",
    city: "Milano",
    zip: "20121",
    country: "Italia",
  },
  phone: "+39 02 1234 5678",
  email: "info@vista-ristorante.it",
  openingHours: [
    { days: "Lunedì", hours: "Chiuso", closed: true },
    { days: "Martedì – Giovedì", hours: "18:30 – 23:30" },
    { days: "Venerdì – Sabato", hours: "12:00 – 15:00 · 18:30 – 00:30" },
    { days: "Domenica", hours: "12:00 – 15:30 · 18:30 – 23:00" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
  ],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vista-restaurant.netlify.app",
  reservation: {
    minGuests: 1,
    maxGuests: 12,
    timeSlots: [
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
    ],
  },
};
