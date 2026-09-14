import type { Allergen, Tag } from "@/types/content";

export const allergenLabels: Record<Allergen, string> = {
  glutine: "Glutine",
  latticini: "Latticini",
  uova: "Uova",
  pesce: "Pesce",
  crostacei: "Crostacei",
  molluschi: "Molluschi",
  "frutta-a-guscio": "Frutta a guscio",
  soia: "Soia",
  sedano: "Sedano",
  senape: "Senape",
  sesamo: "Sesamo",
  solfiti: "Solfiti",
  arachidi: "Arachidi",
  lupini: "Lupini",
};

export const tagLabels: Record<Tag, string> = {
  signature: "Signature",
  chef: "Scelta dello chef",
  vegetariano: "Vegetariano",
  vegano: "Vegano",
  "senza-glutine": "Senza glutine",
  piccante: "Piccante",
  stagionale: "Di stagione",
  novita: "Novità",
  analcolico: "Analcolico disponibile",
};
