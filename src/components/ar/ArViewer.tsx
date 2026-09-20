"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ModelViewerElement } from "@google/model-viewer";
import { arMessages, type ArExperience } from "@/data/ar";
import { Button } from "@/components/ui/Button";
import { withBasePath } from "@/lib/base-path";

type LibraryStatus = "loading" | "ready" | "failed";
type ModelStatus = "loading" | "loaded" | "error";
type ArCapability = "unknown" | "available" | "unavailable" | "insecure";
type ArSession = "idle" | "starting" | "session-started" | "object-placed" | "failed";

interface ArViewerProps {
  experience: ArExperience;
  /** `hero` is the tall /ar layout, `compact` fits inside a menu detail page. */
  variant?: "hero" | "compact";
  className?: string;
}

const AR_MODES = "webxr scene-viewer quick-look";

export function ArViewer({ experience, variant = "hero", className = "" }: ArViewerProps) {
  const viewerRef = useRef<ModelViewerElement>(null);
  const [library, setLibrary] = useState<LibraryStatus>("loading");
  const [model, setModel] = useState<ModelStatus>("loading");
  const [capability, setCapability] = useState<ArCapability>("unknown");
  const [session, setSession] = useState<ArSession>("idle");
  const [attempt, setAttempt] = useState(0);

  // Listeners are attached before the library is imported: the element upgrades
  // (and starts fetching) as soon as the module registers it.
  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    let cancelled = false;

    const onLoad = () => {
      setModel("loaded");
      if (!window.isSecureContext) setCapability("insecure");
      else setCapability(el.canActivateAR ? "available" : "unavailable");
    };
    const onError = () => setModel("error");
    const onArStatus = (event: Event) => {
      const { status } = (event as CustomEvent<{ status: ArSession | "not-presenting" }>).detail;
      setSession(status === "not-presenting" ? "idle" : status);
    };

    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);
    el.addEventListener("ar-status", onArStatus);

    import("@google/model-viewer")
      .then(() => {
        if (cancelled) return;
        setLibrary("ready");
        if (el.loaded) onLoad();
      })
      .catch(() => !cancelled && setLibrary("failed"));

    return () => {
      cancelled = true;
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onError);
      el.removeEventListener("ar-status", onArStatus);
    };
  }, [attempt]);

  const startAr = useCallback(async () => {
    const el = viewerRef.current;
    if (!el || capability !== "available") return;
    setSession("starting");
    try {
      await el.activateAR();
    } catch {
      setSession("failed");
    }
  }, [capability]);

  const retry = () => {
    setModel("loading");
    setAttempt((n) => n + 1);
  };

  const busy = library === "loading" || model === "loading";
  const failed = library === "failed" || model === "error";
  const hero = variant === "hero";

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <div
        className={`relative overflow-hidden rounded-3xl border border-charcoal-900/10 bg-[radial-gradient(ellipse_at_center,#ffffff_0%,#f7f2ea_55%,#ede5d8_100%)] ${
          hero ? "aspect-square sm:aspect-[4/3] lg:aspect-[16/10]" : "aspect-square sm:aspect-[4/3]"
        }`}
      >
        {library !== "failed" && (
          <model-viewer
            key={attempt}
            ref={viewerRef}
            src={withBasePath(attempt === 0 ? experience.modelSrc : `${experience.modelSrc}?retry=${attempt}`)}
            ios-src={experience.iosSrc && withBasePath(experience.iosSrc)}
            poster={experience.poster && withBasePath(experience.poster)}
            alt={experience.posterAlt}
            ar
            ar-modes={AR_MODES}
            ar-scale="auto"
            ar-placement="floor"
            camera-controls
            touch-action="pan-y"
            camera-orbit="30deg 65deg 0.55m"
            min-camera-orbit="auto 20deg 0.3m"
            max-camera-orbit="auto 88deg 1.2m"
            field-of-view="28deg"
            shadow-intensity="1"
            shadow-softness="0.8"
            exposure="1.05"
            environment-image="neutral"
            loading="eager"
            reveal="auto"
            interaction-prompt="none"
            tabIndex={0}
            aria-label={`Modello 3D interattivo: ${experience.title}. ${arMessages.viewerHelp}`}
            className="block h-full w-full bg-transparent outline-none [--poster-color:transparent] focus-visible:ring-2 focus-visible:ring-bronze-500"
          >
            {/* model-viewer's default AR button is replaced by ours below the viewer. */}
            <div slot="ar-button" hidden />
            <div slot="progress-bar" hidden />
          </model-viewer>
        )}

        {busy && !failed && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ivory-100/85 backdrop-blur-sm"
          >
            <span
              aria-hidden="true"
              className="h-10 w-10 animate-spin rounded-full border-2 border-charcoal-900/15 border-t-bronze-500 motion-reduce:animate-none"
            />
            <p className="text-sm text-charcoal-600">
              {library === "loading" ? arMessages.loadingLibrary : arMessages.loading}
            </p>
          </div>
        )}

        {failed && (
          <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ivory-100 p-6 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-danger-100 text-danger-600">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M12 8v5M12 16.5v.5M4.6 19h14.8a1 1 0 0 0 .87-1.5l-7.4-12.8a1 1 0 0 0-1.74 0L3.73 17.5A1 1 0 0 0 4.6 19Z" />
              </svg>
            </span>
            <p className="max-w-sm text-sm leading-relaxed text-charcoal-700">{arMessages.modelError}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {model === "error" && (
                <Button variant="secondary" onClick={retry}>
                  Riprova
                </Button>
              )}
              <Link href="/menu" className="inline-flex min-h-11 items-center px-4 text-sm text-bronze-600 underline-offset-4 hover:underline">
                Torna al menu
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            size={hero ? "lg" : "md"}
            onClick={startAr}
            disabled={capability !== "available" || session === "starting"}
            aria-describedby={`${experience.id}-ar-hint`}
            className="sm:min-w-48"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
              <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
            </svg>
            {session === "starting" ? "Avvio della fotocamera…" : arMessages.cta}
          </Button>
          <p id={`${experience.id}-ar-hint`} className="text-sm text-charcoal-500">
            {capability === "available" ? `${arMessages.ctaHint}. ${arMessages.exit}` : arMessages.viewerHelp}
          </p>
        </div>

        <p role="status" aria-live="polite" className="min-h-5 text-sm leading-relaxed text-charcoal-700">
          {statusMessage({ capability, session, model })}
        </p>
      </div>
    </div>
  );
}

function statusMessage({
  capability,
  session,
  model,
}: {
  capability: ArCapability;
  session: ArSession;
  model: ModelStatus;
}): string {
  if (session === "failed") return arMessages.arFailed;
  if (session === "session-started") return arMessages.arActive;
  if (session === "object-placed") return arMessages.arPlaced;
  if (model !== "loaded") return "";
  if (capability === "insecure") return arMessages.arInsecure;
  if (capability === "unavailable") return arMessages.arUnavailable;
  return "";
}
