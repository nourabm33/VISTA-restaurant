export interface NavLink {
  href: "/" | "/menu" | "/cocktails" | "/ar" | "/prenotazione";
  label: string;
}

export const mainNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/cocktails", label: "Cocktail" },
  { href: "/ar", label: "Esperienza AR" },
];

export const reservationLink: NavLink = { href: "/prenotazione", label: "Prenota un Tavolo" };
