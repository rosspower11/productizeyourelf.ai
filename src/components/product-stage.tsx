"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { PistachioMark } from "@/components/pistachio-mark";
import { JOURNEY } from "@/lib/content";

const VIEWS = ["home", "journey", "sessions", "library"] as const;
type View = (typeof VIEWS)[number];

const NAV: { label: string; view?: View; icon: IconName }[] = [
  { label: "Home", view: "home", icon: "grid" },
  { label: "Journey", view: "journey", icon: "layers" },
  { label: "Sessions", view: "sessions", icon: "calendar" },
  { label: "Messages", icon: "chat" },
  { label: "Community", icon: "people" },
  { label: "Library", view: "library", icon: "book" },
];

const TODO = ["Identity excavation", "Your IP map", "Ideal client profile"];

const SESSIONS = [
  { day: "Tue", n: "01", title: "Live with Ross", status: "attending" },
  { day: "Thu", n: "02", title: "Live with Ross", status: "attend" },
  { day: "Tue", n: "03", title: "Live with Ross", status: "attend" },
] as const;

const COLLECTIONS = [
  {
    name: "The prompt library",
    meta: "500+ prompts",
    line: "Every prompt tested in real sessions, with what good looks like",
  },
  {
    name: "Skills from Ross",
    meta: "Growing",
    line: "The skills I've built and use in my own business",
  },
  {
    name: "Your Blueprint",
    meta: "Saved to your Drive",
    line: "Your Productized Business Blueprint, updated as you work",
  },
] as const;

type IconName =
  | "grid"
  | "layers"
  | "calendar"
  | "chat"
  | "people"
  | "book"
  | "check"
  | "video"
  | "folder"
  | "lock";

const PATHS: Record<IconName, string> = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  layers: "M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  chat: "M4 5h16v11H9l-5 4z",
  people:
    "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 19c0-3 3-5 6-5s6 2 6 5M16 5a3 3 0 0 1 0 6M18 14c2 .5 3 2 3 5",
  book: "M5 4h5a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H5zM19 4h-5a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h5z",
  check: "m5 12 5 5 9-10",
  video: "M3 7h12v10H3zM15 10l6-3v10l-6-3",
  folder: "M3 6h6l2 2h10v11H3z",
  lock: "M6 11h12v9H6zM9 11V8a3 3 0 0 1 6 0v3",
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "ui-icon"}
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

export function WorkspaceBrand() {
  return (
    <div className="ws-brand">
      <span className="ws-tile">py</span>
      <span>
        <strong>Productize Yourself</strong>
        <em>ai powered</em>
      </span>
    </div>
  );
}

export function SessionRow({
  day,
  n,
  title,
  status,
}: {
  day: string;
  n: string;
  title: string;
  status: "attending" | "attend";
}) {
  return (
    <div className={`session-row${status === "attend" ? " is-soft" : ""}`}>
      <span className="date-tile">
        <em>{day}</em>
        <b>{n}</b>
        <em>Live</em>
      </span>
      <div className="session-info">
        <span className="kicker">Session · Productize Yourself</span>
        <strong>{title}</strong>
        <span className="host">
          <span className="host-dot">RP</span>
          Hosted by Ross Power
        </span>
      </div>
      {status === "attending" ? (
        <span className="ui-btn ui-btn-line">
          <Icon name="check" />
          Attending
        </span>
      ) : (
        <span className="ui-btn ui-btn-dark">
          <Icon name="calendar" />
          Attend
        </span>
      )}
    </div>
  );
}

export function ProductStage() {
  const [view, setView] = useState<View>("home");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setView((current) => VIEWS[(VIEWS.indexOf(current) + 1) % VIEWS.length]);
    }, 5200);
    return () => window.clearInterval(id);
  }, [paused]);

  function pick(next: View) {
    setView(next);
    setPaused(true);
  }

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[
      event.key
    ];
    if (!step) return;
    event.preventDefault();
    const next =
      VIEWS[(VIEWS.indexOf(view) + step + VIEWS.length) % VIEWS.length];
    pick(next);
    event.currentTarget
      .querySelector<HTMLButtonElement>(`[data-view="${next}"]`)
      ?.focus();
  }

  return (
    <div
      className="app-window"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="app-chrome" aria-hidden="true">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <p>
          <PistachioMark className="chrome-mark" />
          Productize Yourself on pistachio
        </p>
      </div>

      <div className="app-shell">
        <aside className="app-side">
          <WorkspaceBrand />
          <div
            className="side-nav"
            role="tablist"
            aria-label="Workspace views"
            aria-orientation="vertical"
            onKeyDown={onKey}
          >
            {NAV.map((item) =>
              item.view ? (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  data-view={item.view}
                  aria-selected={view === item.view}
                  tabIndex={view === item.view ? 0 : -1}
                  className={view === item.view ? "is-on" : undefined}
                  onClick={() => pick(item.view as View)}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </button>
              ) : (
                <span
                  key={item.label}
                  className="side-static"
                  aria-hidden="true"
                >
                  <Icon name={item.icon} />
                  {item.label}
                </span>
              ),
            )}
          </div>
          <div className="side-user" aria-hidden="true">
            <span className="host-dot">You</span>
            Early-bird member
          </div>
        </aside>

        <div className="app-main">
          {view === "home" ? (
            <div className="pane" key="home">
              <header className="pane-head">
                <p className="pane-title">Home</p>
                <p className="pane-sub">Ready when you are</p>
              </header>
              <section className="ui-card">
                <p className="ui-card-title">
                  <Icon name="calendar" />
                  Next session
                </p>
                <p className="ui-serif">Live with Ross</p>
                <p className="ui-meta">
                  Productize Yourself · Phase 01 | Person
                </p>
                <div className="ui-actions">
                  <span className="ui-btn ui-btn-dark">
                    <Icon name="video" />
                    Join call
                  </span>
                  <span className="ui-btn ui-btn-line">
                    <Icon name="calendar" />
                    Add to calendar
                  </span>
                  <span className="ui-btn ui-btn-dark">
                    <Icon name="check" />
                    Attending
                  </span>
                </div>
              </section>
              <section className="ui-card ui-list">
                <p className="ui-card-title">
                  <Icon name="check" />
                  To do
                </p>
                {TODO.map((item, i) => (
                  <div key={item} className="ui-row">
                    <span className="ring" />
                    Activity 0{i + 1} · {item}
                  </div>
                ))}
                <p className="ui-more">and the rest unlock as you go</p>
              </section>
            </div>
          ) : null}

          {view === "journey" ? (
            <div className="pane" key="journey">
              <header className="pane-head">
                <p className="pane-title">Productize Yourself</p>
                <p className="pane-sub">Early-bird cohort · 2027</p>
              </header>
              <div className="phase-list">
                {JOURNEY.phases.map((phase) => (
                  <div key={phase.n} className={`phase-row is-${phase.state}`}>
                    <Icon name={phase.state === "locked" ? "lock" : "layers"} />
                    <span className="phase-name">
                      {phase.n} | {phase.name}
                    </span>
                    <span className="phase-sub">{phase.sub}</span>
                    <span className={`tag tag-${phase.state}`}>
                      {phase.state === "open"
                        ? "Open"
                        : phase.state === "next"
                          ? "Next"
                          : "Locked"}
                    </span>
                  </div>
                ))}
              </div>
              <section className="ui-card progress-card">
                <div>
                  <p className="ui-serif">Your progress</p>
                  <p className="ui-meta">Keep going, Promise opens next</p>
                </div>
                <div className="bar">
                  <span />
                </div>
              </section>
            </div>
          ) : null}

          {view === "sessions" ? (
            <div className="pane" key="sessions">
              <header className="pane-head">
                <p className="pane-title">Sessions</p>
                <p className="pane-sub">Live with Ross, and every recording</p>
              </header>
              <div className="seg">
                <span className="is-on">Timeline</span>
                <span>Calendar</span>
                <span>Recordings</span>
              </div>
              <div className="session-list">
                {SESSIONS.map((s) => (
                  <SessionRow key={s.n} {...s} />
                ))}
              </div>
            </div>
          ) : null}

          {view === "library" ? (
            <div className="pane" key="library">
              <header className="pane-head">
                <p className="pane-title">Library</p>
                <p className="pane-sub">Resources shared with you</p>
              </header>
              <p className="ui-label">Collections</p>
              <div className="collection-grid">
                {COLLECTIONS.map((c) => (
                  <section key={c.name} className="ui-card collection">
                    <span className="folder">
                      <Icon name="folder" />
                    </span>
                    <div>
                      <p className="collection-name">{c.name}</p>
                      <p className="ui-meta">{c.meta}</p>
                      <p className="collection-line">{c.line}</p>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
