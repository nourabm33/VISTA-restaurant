import type { MenuCategory } from "@/types/content";

export const categories: MenuCategory[] = [
  {
    id: "antipasti",
    name: "Antipasti",
    description: "Per iniziare: crudi, piccoli piatti e classici rivisitati.",
    order: 1,
  },
  {
    id: "primi",
    name: "Primi",
    description: "Pasta fresca fatta in casa e risotti mantecati al momento.",
    order: 2,
  },
  {
    id: "secondi",
    name: "Secondi",
    description: "Carni alla brace e pesce del giorno, cotture precise.",
    order: 3,
  },
  {
    id: "contorni",
    name: "Contorni",
    description: "Verdure di stagione dal nostro orto di fiducia.",
    order: 4,
  },
  {
    id: "dessert",
    name: "Dessert",
    description: "Il finale dolce, tra tradizione e pasticceria moderna.",
    order: 5,
  },
  {
    id: "cocktail",
    name: "Cocktail",
    description: "Signature drink e grandi classici preparati dai nostri bartender.",
    order: 6,
  },
  {
    id: "vini",
    name: "Vini",
    description: "Una selezione di etichette italiane, al calice o in bottiglia.",
    order: 7,
  },
  {
    id: "bevande",
    name: "Bevande",
    description: "Acque, caffetteria e bibite fatte in casa.",
    order: 8,
  },
];

export const categoryMap = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<MenuCategory["id"], MenuCategory>;
