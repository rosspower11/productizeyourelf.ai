"use client";

import { useRef, useState } from "react";
import {
  PROOF_ROW_ONE,
  PROOF_ROW_TWO,
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

function Quote({ card }: { card: QuoteCard }) {
  return (
    <figure className={`proof-quote proof-${card.tone}`}>
      <blockquote>&ldquo;{card.quote}&rdquo;</blockquote>
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

function Row({
  cards,
  direction,
  speed,
  stopped,
}: {
  cards: ProofCard[];
  direction: "left" | "right";
  speed: number;
  stopped: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="proof-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        className={`proof-track proof-${direction}`}
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

export function ProofWall() {
  const [stopped, setStopped] = useState(false);

  return (
    <div className="proof-wall">
      <Row cards={PROOF_ROW_ONE} direction="left" speed={120} stopped={stopped} />
      <Row cards={PROOF_ROW_TWO} direction="right" speed={135} stopped={stopped} />
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
