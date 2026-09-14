import type { ArAssets, MenuItem } from "@/types/content";
import { menuItems } from "./menu";

/** Everything the AR viewer needs to render one object. */
export interface ArExperience {
  id: string;
  title: string;
  description: string;
  /** GLB/glTF for Android Scene Viewer, WebXR and the in-browser 3D viewer. */
  modelSrc: string;
  /** USDZ for iOS AR Quick Look (optional). */
  iosSrc?: string;
  poster?: string;
  posterAlt: string;
  /** Approximate real-world footprint in metres. */
  scale?: ArAssets["scale"];
  /** Menu item this object belongs to, if any. */
  menuSlug?: string;
}

/** Copy shared by every AR viewer instance. Centralised so a client can rebrand it in one place. */
export const arMessages = {
  cta: "Prova in AR",
  ctaHint: "Attiva la fotocamera per vedere il piatto sul tuo tavolo",
  loading: "Caricamento del modello 3D…",
  loadingLibrary: "Preparazione del visualizzatore…",
  modelError: "Il modello 3D non è al momento disponibile. Riprova più tardi o torna al menu.",
  arUnavailable: "La modalità AR non è disponibile su questo dispositivo. Puoi comunque esplorare il modello 3D.",
  arInsecure:
    "La realtà aumentata richiede una connessione sicura (HTTPS). Apri il sito da un indirizzo https:// per usare la fotocamera.",
  arFailed:
    "Non è stato possibile avviare la realtà aumentata. Se hai negato l'accesso alla fotocamera, consentilo nelle impostazioni del browser e riprova. Nel frattempo puoi esplorare il modello 3D.",
  arActive: "Realtà aumentata attiva. Muovi lentamente il telefono per inquadrare il tavolo, poi tocca per posizionare il piatto.",
  arPlaced: "Piatto posizionato. Trascina per spostarlo, ruota con due dita e pizzica per ridimensionarlo.",
  exit: "Esci dall'AR e torna al sito con il pulsante Chiudi o Indietro del tuo dispositivo.",
  viewerHelp: "Trascina per ruotare, pizzica o usa la rotellina per lo zoom, due dita per spostare.",
} as const;

export const arSupport = [
  { platform: "Android", detail: "Chrome 81+ con ARCore: apertura in Scene Viewer o WebXR, posizionamento su superficie." },
  { platform: "iPhone / iPad", detail: "Safari su iOS 12+: apertura in AR Quick Look con il modello USDZ." },
  { platform: "Desktop e altri browser", detail: "Visualizzatore 3D interattivo, senza fotocamera." },
] as const;

export function toArExperience(item: MenuItem): ArExperience | null {
  if (!item.ar.arEnabled || !item.ar.model3d) return null;
  return {
    id: item.slug,
    title: item.ar.title ?? item.name,
    description: item.ar.description ?? item.description,
    modelSrc: item.ar.model3d,
    iosSrc: item.ar.arModel,
    poster: item.ar.poster,
    posterAlt: `Anteprima 3D di ${item.ar.title ?? item.name}`,
    scale: item.ar.scale,
    menuSlug: item.slug,
  };
}

export const arExperiences: ArExperience[] = menuItems
  .map(toArExperience)
  .filter((exp): exp is ArExperience => exp !== null);

/** The single Phase 2 demo object. */
export const featuredArExperience: ArExperience | undefined = arExperiences[0];
