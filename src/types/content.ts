/**
 * Content model for the restaurant site.
 *
 * Everything the UI renders (restaurant info, categories, menu items,
 * cocktails, gallery) is described by these types and lives in `src/data`.
 * Swapping the fictional VISTA content for a real client's content means
 * editing the data files only – no component changes required.
 */

export type CategoryId =
  | "antipasti"
  | "primi"
  | "secondi"
  | "contorni"
  | "dessert"
  | "cocktail"
  | "vini"
  | "bevande";

export interface MenuCategory {
  id: CategoryId;
  name: string;
  description: string;
  /** Sort order in the digital menu. */
  order: number;
}

export interface ImageAsset {
  /** Public URL (usually `/images/...`). */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional photo credit shown in a future "credits" section. */
  credit?: string;
}

export type Allergen =
  | "glutine"
  | "latticini"
  | "uova"
  | "pesce"
  | "crostacei"
  | "molluschi"
  | "frutta-a-guscio"
  | "soia"
  | "sedano"
  | "senape"
  | "sesamo"
  | "solfiti"
  | "arachidi"
  | "lupini";

export type Tag =
  | "signature"
  | "chef"
  | "vegetariano"
  | "vegano"
  | "senza-glutine"
  | "piccante"
  | "stagionale"
  | "novita"
  | "analcolico";

/**
 * Hooks for the future WebAR / 3D experience (Phase 2+).
 * None of these fields are used to render anything interactive in Phase 1;
 * they only shape the data so that models can be attached later.
 */
export interface ArAssets {
  /** glTF / GLB model for Android (Scene Viewer) and web 3D viewers. */
  model3d?: string;
  /** USDZ model for iOS AR Quick Look. */
  arModel?: string;
  /** Optional poster/thumbnail for the 3D viewer. */
  poster?: string;
  /** Whether the item exposes a 3D/AR experience. Requires `model3d`. */
  arEnabled: boolean;
  /** Display name of the 3D object (defaults to the item name). */
  title?: string;
  /** Short copy shown next to the viewer (defaults to the item description). */
  description?: string;
  /** Approximate real-world footprint in metres, used for surface placement. */
  scale?: { width: number; depth: number; height: number };
}

export interface MenuItem {
  slug: string;
  name: string;
  /** Short one-line description used in cards. */
  description: string;
  /** Longer copy used on the detail page. */
  story?: string;
  price: number;
  currency: "EUR";
  category: CategoryId;
  image: ImageAsset;
  ingredients: string[];
  allergens: Allergen[];
  tags: Tag[];
  /** Highlighted on the homepage. */
  featured?: boolean;
  ar: ArAssets;
}

export interface OpeningHours {
  days: string;
  hours: string;
  closed?: boolean;
}

export interface RestaurantInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  cuisine: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  phone: string;
  email: string;
  openingHours: OpeningHours[];
  social: { label: string; href: string }[];
  /** Absolute canonical site URL for metadata. */
  siteUrl: string;
  reservation: {
    minGuests: number;
    maxGuests: number;
    /** Available time slots for the demo form. */
    timeSlots: string[];
  };
}

export interface GalleryImage extends ImageAsset {
  id: string;
  caption?: string;
}
