"use client";

import { useEffect, useRef } from "react";
import { WAITLIST_FORM_EMBED } from "@/lib/site";

const EMBED_SCRIPT = "https://workspace.aipowered.xyz/embed.js";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function WaitlistForm() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) {
      const script = document.createElement("script");
      script.src = EMBED_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }

    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          window.dataLayer = window.dataLayer ?? [];
          window.dataLayer.push({ event: "waitlist_view" });
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className="waitlist-embed-wrap">
      <iframe
        src={WAITLIST_FORM_EMBED}
        title="Productize Yourself with AI 2027"
        loading="lazy"
        className="waitlist-embed"
      />
    </div>
  );
}
