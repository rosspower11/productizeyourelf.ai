import Image from "next/image";
import { PistachioMark, PoweredByPistachio } from "@/components/pistachio-mark";
import { Icon, ProductStage, SessionRow } from "@/components/product-stage";
import { StructuredData } from "@/components/structured-data";
import { Highlighted } from "@/components/highlight";
import { ProofTrust, ProofWall } from "@/components/proof-wall";
import { WaitlistForm } from "@/components/waitlist-form";
import {
  APPLICATION,
  BONUSES,
  FAQ,
  FINAL,
  GOALS,
  HERO,
  INCLUSIONS,
  JOURNEY,
  LETTER,
  LIVE,
  NAVAL,
  OFFER,
  STATS,
  WHO,
  WORKSPACE,
} from "@/lib/content";
import { CLAUDE_LOGO_DARK, ROSS_PHOTO } from "@/lib/site";

function Tick() {
  return (
    <svg className="tick" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m6 12.5 4 4 8-9" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function ProductizeLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`mask-logo py-logo ${className}`}
      role="img"
      aria-label="Productize Yourself"
    />
  );
}

function SectionHead({
  label,
  heading,
  id,
  center = false,
}: {
  label: string;
  heading: string;
  id: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "section-head is-center" : "section-head"}>
      <p className="eyebrow">{label}</p>
      <h2 id={id}>
        <Highlighted text={heading} />
      </h2>
    </div>
  );
}

function TileVisual({ kind }: { kind: (typeof WORKSPACE.tiles)[number]["key"] }) {
  if (kind === "journey") {
    return (
      <div className="tile-ui">
        {JOURNEY.phases.slice(0, 4).map((phase) => (
          <div key={phase.n} className={`phase-row is-${phase.state}`}>
            <Icon name={phase.state === "locked" ? "lock" : "layers"} />
            <span className="phase-name">
              {phase.n} | {phase.name}
            </span>
            <span className={`tag tag-${phase.state}`}>
              {phase.state === "open" ? "Open" : phase.state === "next" ? "Next" : "Locked"}
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "sessions") {
    return (
      <div className="tile-ui session-list">
        <SessionRow day="Tue" n="01" title="Live with Ross" status="attending" />
        <SessionRow day="Thu" n="02" title="Live with Ross" status="attend" />
      </div>
    );
  }
  if (kind === "library") {
    return (
      <div className="tile-ui collection-grid is-two">
        <div className="ui-card collection">
          <span className="folder">
            <Icon name="folder" />
          </span>
          <div>
            <p className="collection-name">The prompt library</p>
            <p className="ui-meta">500+ prompts</p>
          </div>
        </div>
        <div className="ui-card collection">
          <span className="folder">
            <Icon name="folder" />
          </span>
          <div>
            <p className="collection-name">Skills from Ross</p>
            <p className="ui-meta">Growing</p>
          </div>
        </div>
        <div className="ui-card collection collection-wide">
          <span className="folder">
            <Icon name="book" />
          </span>
          <div>
            <p className="collection-name">Your Productized Business Blueprint</p>
            <p className="collection-line">Updated every time you say &ldquo;save this&rdquo;, and kept in your own Drive</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="tile-ui reflect">
      <div className="ui-card">
        <p className="ui-label">Your reflection · Person</p>
        <p className="reflect-text">
          Seeing my IP mapped out made me realise I already have a method.
        </p>
      </div>
      <div className="reply">
        <span className="host-dot">RP</span>
        <p>That's the moment it clicks. Now we give it a name.</p>
      </div>
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <>
      <header className="site-nav">
        <a className="brand-lockup" href="#top" aria-label="Productize Yourself with Claude">
          <ProductizeLogo />
          <span className="times" aria-hidden="true">
            ×
          </span>
          <Image
            src={CLAUDE_LOGO_DARK}
            alt=""
            width={130}
            height={52}
            className="claude-mark"
            priority
          />
        </a>
        <div className="nav-right">
          <a className="nav-pistachio" href="#workspace">
            <PoweredByPistachio size="sm" />
          </a>
          <a className="btn btn-primary btn-nav" href="#waitlist">
            {APPLICATION.button}
          </a>
        </div>
      </header>

      <StructuredData />
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <a className="hero-chip" href="#waitlist">
                {OFFER.chip}
                <Arrow />
              </a>
              <h1 id="hero-title">
                {HERO.headline.map((word, i) => (
                  <span key={word} className="word" style={{ animationDelay: `${i * 60}ms` }}>
                    {word}{" "}
                  </span>
                ))}
              </h1>
              <p className="hero-sub">
                <Highlighted text={HERO.subheading} />
              </p>
              <a className="btn btn-primary btn-lg" href="#waitlist">
                {HERO.button}
              </a>
              <ProofTrust />
              <p className="hero-small">{HERO.small}</p>
            </div>

            <div className="hero-visual">
              <div className="hv-field" aria-hidden="true" />
              <div className="hv-photo" aria-hidden="true">
                <Image
                  src="/images/educator-carousel/16.jpg"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 960px) 100vw, 640px"
                  style={{ objectFit: "cover", objectPosition: "50% 40%" }}
                />
              </div>
              <ProductStage />
              <div className="hv-call" aria-hidden="true">
                <div className="hv-call-tile">
                  <Image
                    src="/images/educator-carousel/13.jpg"
                    alt=""
                    fill
                    sizes="168px"
                    style={{ objectFit: "cover", objectPosition: "50% 40%" }}
                  />
                </div>
                <div className="hv-call-tile">
                  <Image
                    src="/images/educator-carousel/9.jpg"
                    alt=""
                    fill
                    sizes="168px"
                    style={{ objectFit: "cover", objectPosition: "60% 40%" }}
                  />
                </div>
                <div className="hv-call-bar">
                  <span />
                  <span />
                  <span className="end" />
                </div>
              </div>
              <span className="live-chip hv-live" aria-hidden="true">
                <i />
                Live with Ross
              </span>
            </div>
          </div>
        </section>

        <section className="wrap stats" aria-label="In numbers">
          {STATS.map((stat) => (
            <div key={stat.num} className="stat">
              <p className="num">{stat.num}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="section" aria-labelledby="goals-title">
          <div className="wrap">
            <SectionHead label={GOALS.label} heading={GOALS.heading} id="goals-title" center />
            <div className="goals">
              {GOALS.paths.map((path) => (
                <article key={path.to} className="goal">
                  <p className="goal-range">
                    {path.from} → {path.to}
                  </p>
                  <p className="goal-unit">{path.unit}</p>
                  <p>
                    <Highlighted text={path.body} />
                  </p>
                </article>
              ))}
            </div>
            <p className="small-note is-center">
              <Highlighted text={GOALS.beyond} />
            </p>
          </div>
        </section>

        <section className="section" id="journey" aria-labelledby="journey-title">
          <div className="wrap">
            <SectionHead label={JOURNEY.label} heading={JOURNEY.heading} id="journey-title" center />
            <ol className="journey">
              {JOURNEY.phases.map((phase) => (
                <li key={phase.n} className={`phase is-${phase.state}`}>
                  <div className="phase-top">
                    <span className="phase-n">{phase.n}</span>
                    {phase.state === "locked" ? (
                      <Icon name="lock" className="phase-lock" />
                    ) : (
                      <span className={`tag tag-${phase.state}`}>
                        {phase.state === "open" ? "Preview" : "Next"}
                      </span>
                    )}
                  </div>
                  <h3>{phase.name}</h3>
                  <p className="phase-sub-lg">{phase.sub}</p>
                  {phase.activities.length ? (
                    <ul className="phase-acts">
                      {phase.activities.map((a) => (
                        <li key={a}>
                          <span className="ring" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="phase-blur" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                  )}
                </li>
              ))}
            </ol>
            <p className="small-note is-center">{JOURNEY.small}</p>
          </div>
        </section>

        <section className="wrap band" id="workspace" aria-labelledby="workspace-title">
          <div className="band-head">
            <p className="band-kicker">
              <PistachioMark className="band-mark" />
              {WORKSPACE.label}
            </p>
            <h2 id="workspace-title">{WORKSPACE.heading}</h2>
            <p className="lead">
              <Highlighted text={WORKSPACE.body} />
            </p>
          </div>
          <ul className="inclusions">
            {INCLUSIONS.items.map((item) => (
              <li key={item.name}>
                <p>{item.name}</p>
                <span>{item.line}</span>
              </li>
            ))}
          </ul>
          <ul className="bento">
            {WORKSPACE.tiles.map((tile) => (
              <li key={tile.key} className={`tile tile-${tile.key}`}>
                <TileVisual kind={tile.key} />
                <h3>{tile.title}</h3>
                <p>{tile.line}</p>
              </li>
            ))}
          </ul>
          <a className="band-link" href="https://heypistachio.ai/" target="_blank" rel="noreferrer">
            See Pistachio at heypistachio.ai
          </a>
        </section>

        <section className="section" aria-labelledby="live-title">
          <div className="wrap live-grid">
            <div className="collage">
              <div className="collage-main">
                <Image
                  src="/images/educator-carousel/1.jpg"
                  alt="Ross Power teaching a live Productize Yourself session on building from who you are"
                  fill
                  sizes="(max-width: 960px) 100vw, 560px"
                  style={{ objectFit: "cover", objectPosition: "40% 50%" }}
                />
              </div>
              <div className="collage-side">
                <Image
                  src="/images/educator-carousel/17.jpg"
                  alt="Ross Power talking with founders at an AI Powered event in Bali"
                  fill
                  sizes="240px"
                  style={{ objectFit: "cover", objectPosition: "50% 40%" }}
                />
              </div>
              <span className="live-chip" aria-hidden="true">
                <i />
                2 live calls a week
              </span>
              <div className="collage-card" aria-hidden="true">
                <div className="session-list">
                  <SessionRow day="Tue" n="01" title="Live with Ross" status="attending" />
                  <SessionRow day="Thu" n="02" title="Live with Ross" status="attend" />
                </div>
              </div>
            </div>
            <div>
              <SectionHead label={LIVE.label} heading={LIVE.heading} id="live-title" />
              <p className="lead">
                <Highlighted text={LIVE.body} />
              </p>
              <ul className="checklist">
                {LIVE.points.map((point) => (
                  <li key={point}>
                    <Tick />
                    <Highlighted text={point} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="naval" aria-labelledby="naval-title">
          <figure className="wrap naval-quote">
            <p className="eyebrow">{NAVAL.leadIn}</p>
            <blockquote>
              <p id="naval-title">{NAVAL.quote}</p>
            </blockquote>
            <figcaption>
              <span className="attribution">{NAVAL.attribution}</span>
              <span className="support">
                <Highlighted text={NAVAL.support} />
              </span>
            </figcaption>
          </figure>
        </section>

        <section className="section" aria-labelledby="who-title">
          <div className="wrap who-grid">
            <SectionHead label={WHO.label} heading={WHO.heading} id="who-title" />
            <div>
              <ul className="checklist">
                {WHO.list.map((item) => (
                  <li key={item}>
                    <Tick />
                    <Highlighted text={item} />
                  </li>
                ))}
              </ul>
              <p className="small-note">
                <Highlighted text={WHO.upgrade.before} />
                <a href={WHO.upgrade.href} target="_blank" rel="noreferrer">
                  {WHO.upgrade.link}
                </a>
                {WHO.upgrade.after}
              </p>
            </div>
          </div>
        </section>

        <section className="section section-tint proof-section" aria-labelledby="proof-title">
          <div className="wrap">
            <div className="section-head is-center">
              <p className="eyebrow">Proof wall</p>
              <h2 id="proof-title">In their own words, from the people who did the work</h2>
              <ProofTrust />
            </div>
          </div>
          <ProofWall />
        </section>

        <section className="section" aria-labelledby="bonus-title">
          <div className="wrap">
            <SectionHead label={BONUSES.label} heading={BONUSES.heading} id="bonus-title" />
            <ul className="bonus-grid">
              {BONUSES.cards.map((card) => (
                <li key={card.name} className="bonus">
                  <h3>{card.name}</h3>
                  <p>{card.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section-tint" aria-labelledby="letter-title">
          <div className="wrap letter-grid">
            <div className="letter-photo">
              <Image
                src={ROSS_PHOTO}
                alt="Ross Power teaching a room of founders"
                fill
                sizes="(max-width: 900px) 100vw, 420px"
              />
            </div>
            <article className="letter">
              <p className="eyebrow">{LETTER.label}</p>
              <h2 id="letter-title">{LETTER.heading}</h2>
              {LETTER.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>
                  <Highlighted text={p} />
                </p>
              ))}
              <p className="signature">{LETTER.signOff}</p>
              <p className="small-note">{LETTER.small}</p>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="faq-title">
          <div className="wrap-narrow">
            <div className="section-head">
              <p className="eyebrow">Questions</p>
              <h2 id="faq-title">A few answers before you apply</h2>
            </div>
            <div className="faq">
              {FAQ.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="waitlist" className="final" aria-labelledby="final-title">
          <span className="numeral numeral-final" aria-hidden="true">
            2027
          </span>
          <div className="wrap final-grid">
            <div className="final-copy">
              <p className="eyebrow">{FINAL.label}</p>
              <h2 id="final-title" className="final-headline">
                {FINAL.headline}
              </h2>
              <p className="lead">
                <Highlighted text={FINAL.subheading} />
              </p>
              <div className="offer-card">
                <p className="offer-title">{OFFER.headline}</p>
                <ul className="checklist">
                  {OFFER.perks.map((perk) => (
                    <li key={perk}>
                      <Tick />
                      <Highlighted text={perk} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="final-pistachio">
                <PoweredByPistachio size="md" />
              </div>
            </div>
            <div className="final-form">
              <WaitlistForm />
              <p className="final-closer">{FINAL.closer}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span className="mask-logo aip-logo" role="img" aria-label="AI Powered" />
        <p>An AI Powered programme from Ross Power</p>
        <PoweredByPistachio size="md" />
        <ProductizeLogo className="footer-py" />
      </footer>
    </>
  );
}
