"use client";

import { useEffect, useRef, useState } from "react";
import { Highlighted } from "@/components/highlight";
import { HERO } from "@/lib/content";
import {
  PROOF_CARDS,
  type ProofCard,
  type QuoteCard,
  type VideoCard,
} from "@/lib/testimonials";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function Stars({ label }: { label?: string }) {
  return (
    <p className="stars">
      <span className="stars-row" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} viewBox="0 0 20 20">
            <path
              fill="currentColor"
              d="M10 1.4 12.4 6.3l5.4.8-3.9 3.8.9 5.4L10 14.2 5.2 16.3l.9-5.4L2.2 7.1l5.4-.8L10 1.4z"
            />
          </svg>
        ))}
      </span>
      {label ? <span>{label}</span> : <span className="sr-only">5 stars</span>}
    </p>
  );
}

function Quote({ card }: { card: QuoteCard }) {
  return (
    <figure className={`proof-quote proof-${card.tone}`}>
      <Stars />
      <blockquote>
        &ldquo;
        <Highlighted text={card.quote} />
        &rdquo;
      </blockquote>
      <figcaption>
        <span className="proof-avatar" aria-hidden="true">
          {initials(card.name)}
        </span>
        <span>
          <strong>{card.name}</strong>
          {card.role ? <em>{card.role}</em> : null}
        </span>
      </figcaption>
    </figure>
  );
}

function Video({ card, hidden }: { card: VideoCard; hidden: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.muted = false;
      el.controls = true;
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="proof-video">
      <video
        ref={ref}
        src={card.src}
        poster={card.poster}
        preload="none"
        playsInline
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      <div className="proof-video-meta">
        <Stars />
        <p>{card.name}</p>
      </div>
      {!playing ? (
        <button
          type="button"
          className="proof-play"
          onClick={toggle}
          aria-label={`Play ${card.name}'s video story`}
          tabIndex={hidden ? -1 : 0}
        >
          <span>
            <svg viewBox="0 0 256 256" aria-hidden="true">
              <path
                fill="currentColor"
                d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"
              />
            </svg>
          </span>
        </button>
      ) : null}
      <a
        className="proof-link"
        href={card.href}
        target="_blank"
        rel="noreferrer"
        tabIndex={hidden ? -1 : 0}
      >
        Read the case study →
      </a>
    </div>
  );
}

function Column({
  cards,
  speed,
  stopped,
}: {
  cards: ProofCard[];
  speed: number;
  stopped: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="proof-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        className="proof-track"
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: hovered || stopped ? "paused" : "running",
        }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {cards.map((card, i) => (
              <li key={`${copy}-${i}`}>
                {card.kind === "quote" ? (
                  <Quote card={card} />
                ) : (
                  <Video card={card} hidden={copy === 1} />
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function useProofColumns() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const two = window.matchMedia("(min-width: 720px)");
    const three = window.matchMedia("(min-width: 960px)");
    const sync = () => setCount(three.matches ? 3 : two.matches ? 2 : 1);
    sync();
    two.addEventListener("change", sync);
    three.addEventListener("change", sync);
    return () => {
      two.removeEventListener("change", sync);
      three.removeEventListener("change", sync);
    };
  }, []);

  return count;
}

export function ProofWall() {
  const [stopped, setStopped] = useState(false);
  const colCount = useProofColumns();
  const columns = Array.from({ length: colCount }, (_, index) =>
    PROOF_CARDS.filter((_, i) => i % colCount === index),
  );

  return (
    <div className="proof-wall">
      <div className="proof-cols">
        {columns.map((cards, i) => (
          <Column key={i} cards={cards} speed={70 + i * 12} stopped={stopped} />
        ))}
      </div>
      <button
        type="button"
        className="proof-toggle"
        aria-pressed={stopped}
        onClick={() => setStopped((value) => !value)}
      >
        {stopped ? "Play the wall" : "Pause the wall"}
      </button>
    </div>
  );
}

export function ProofTrust() {
  return <Stars label={HERO.trust} />;
}
