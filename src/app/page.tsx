"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ── Constants ── */
const CTA_URL = "https://productizeyourself.ai/start";

/* ── Reveal on scroll ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Label ── */
function Label({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: light ? "rgba(255,255,255,0.35)" : "var(--color-muted)",
        marginBottom: 20,
      }}
    >
      {children}
    </p>
  );
}

/* ── CTA Button ── */
function ApplyButton({ inverted, size = "large" }: { inverted?: boolean; size?: "large" | "small" }) {
  const pad = size === "large" ? "18px 48px" : "14px 32px";
  return (
    <div>
      <a
        href={CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="apply-btn"
        style={{
          display: "inline-block",
          padding: pad,
          background: inverted ? "var(--color-white)" : "var(--color-accent)",
          color: inverted ? "var(--color-charcoal)" : "var(--color-white)",
          borderRadius: 8,
          fontSize: size === "large" ? 14 : 13,
          fontWeight: 700,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          textDecoration: "none",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        APPLY NOW
      </a>
    </div>
  );
}

/* ── Layout wrappers ── */
function Section({
  dark,
  children,
  style = {},
  id,
}: {
  dark?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}) {
  return (
    <section
      id={id}
      style={{
        background: dark ? "var(--color-charcoal)" : "var(--color-surface)",
        padding: "clamp(80px,12vw,160px) 24px",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function Narrow({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: 720, margin: "0 auto", ...style }}>{children}</div>;
}
function Wide({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: 1140, margin: "0 auto", ...style }}>{children}</div>;
}
function HeroW({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: 1000, margin: "0 auto", ...style }}>{children}</div>;
}

/* ── Text marquee banner ── */
function TextBanner({ dark, text = "PRODUCTIZE YOURSELF" }: { dark?: boolean; text?: string }) {
  const color = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  return (
    <div style={{ background: dark ? "var(--color-charcoal)" : "var(--color-surface)", padding: "40px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", whiteSpace: "nowrap", animation: "marquee 20s linear infinite" }}>
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 800,
              color,
              letterSpacing: "-0.02em",
              paddingRight: 80,
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Logo carousel ── */
function LogoCarousel() {
  const logos = [
    { name: "Google", file: "logo-google.png" },
    { name: "Accenture", file: "logo-accenture.png" },
    { name: "Microsoft", file: "logo-microsoft.png" },
    { name: "Deloitte", file: "logo-deloitte.png" },
    { name: "KPMG", file: "logo-kpmg.png" },
    { name: "Oracle", file: "logo-oracle.png" },
  ];
  const all = [...logos, ...logos, ...logos];
  return (
    <div style={{ background: "var(--color-white)", padding: "44px 24px", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <p style={{ textAlign: "center", fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 32 }}>
        Join post-corporate professionals from
      </p>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(to right, #FFFFFF, transparent)", zIndex: 2 }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(to left, #FFFFFF, transparent)", zIndex: 2 }} />
        <div style={{ display: "flex", alignItems: "center", animation: "marquee 35s linear infinite", width: "max-content" }}>
          {all.map((logo, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 32px", flexShrink: 0 }}>
              <Image
                src={`/images/logos/${logo.file}`}
                alt={logo.name}
                width={100}
                height={28}
                style={{ height: 28, width: "auto", opacity: 0.45, filter: "grayscale(100%)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Vertical photo column (educator carousel) ── */
function PhotoColVertical({ dir = "up", speed = 30, images }: { dir?: "up" | "down"; speed?: number; images: string[] }) {
  const doubled = [...images, ...images];
  return (
    <div style={{ overflow: "hidden", height: "100%", flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, animation: `scroll-${dir} ${speed}s linear infinite` }}>
        {doubled.map((src, i) => (
          <div key={i} style={{ width: "100%", aspectRatio: "3/4", borderRadius: 10, overflow: "hidden", flexShrink: 0, position: "relative" }}>
            <Image src={src} alt="Educator carousel" fill style={{ objectFit: "cover" }} sizes="33vw" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Horizontal image row ── */
function HorizontalImageRow({
  direction = "left",
  speed = 40,
  images,
  height = 220,
}: {
  direction?: "left" | "right";
  speed?: number;
  images: string[];
  height?: number;
}) {
  const doubled = [...images, ...images];
  const animName = direction === "left" ? "marquee" : "marquee-reverse";
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div style={{ display: "flex", gap: 10, animation: `${animName} ${speed}s linear infinite`, width: "max-content" }}>
        {doubled.map((src, i) => (
          <div key={i} style={{ height, aspectRatio: "4/3", borderRadius: 10, overflow: "hidden", flexShrink: 0, position: "relative" }}>
            <Image src={src} alt="Social proof" fill style={{ objectFit: "cover" }} sizes="300px" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 6P Phase accordion ── */
function Phase({
  number,
  name,
  subtitle,
  children,
  isOpen,
  onClick,
}: {
  number: string;
  name: string;
  subtitle: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  useEffect(() => {
    if (ref.current) setH(ref.current.scrollHeight);
  }, [isOpen]);
  return (
    <div
      style={{
        background: isOpen ? "var(--color-card)" : "transparent",
        borderRadius: 16,
        marginBottom: 4,
        overflow: "hidden",
        border: isOpen ? "none" : "1px solid var(--color-border-dark)",
        transition: "background 0.3s ease",
      }}
    >
      <div onClick={onClick} style={{ padding: "32px 36px", display: "flex", alignItems: "center", gap: 28, cursor: "pointer", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <span style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.02em", color: isOpen ? "var(--color-accent)" : "rgba(255,255,255,0.12)", minWidth: 72, lineHeight: 1, transition: "color 0.3s ease" }}>{number}</span>
          <span style={{ fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--color-white)", lineHeight: 1 }}>{name}</span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginLeft: 4 }}>{subtitle}</span>
        </div>
        <span style={{ fontSize: 24, color: "rgba(255,255,255,0.3)", fontWeight: 300, transform: isOpen ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s ease", flexShrink: 0 }}>+</span>
      </div>
      <div style={{ maxHeight: isOpen ? h + 40 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
        <div ref={ref} style={{ padding: "0 36px 36px 136px" }}>{children}</div>
      </div>
    </div>
  );
}

/* ── FAQ Item ── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  useEffect(() => {
    if (ref.current) setH(ref.current.scrollHeight);
  }, [open]);
  return (
    <div style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "28px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
        <p style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text)", lineHeight: 1.5, flex: 1 }}>{q}</p>
        <span style={{ fontSize: 18, color: "var(--color-muted)", flexShrink: 0, fontWeight: 300, transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s ease" }}>+</span>
      </div>
      <div style={{ maxHeight: open ? h : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div ref={ref} style={{ paddingBottom: 28 }}>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--color-text-body)" }}>{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════ */
export default function LandingPage() {
  const [openPhase, setOpenPhase] = useState(0);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Image arrays ── */
  const carouselImages = [
    "/images/educator-carousel/1.jpg",
    "/images/educator-carousel/2.jpg",
    "/images/educator-carousel/4.jpg",
    "/images/educator-carousel/5.jpg",
    "/images/educator-carousel/8.jpg",
    "/images/educator-carousel/9.jpg",
    "/images/educator-carousel/11.jpg",
    "/images/educator-carousel/12.jpg",
    "/images/educator-carousel/13.jpg",
    "/images/educator-carousel/15.jpg",
    "/images/educator-carousel/16.jpg",
    "/images/educator-carousel/17.jpg",
    "/images/educator-carousel/18.jpg",
    "/images/educator-carousel/20.jpg",
  ];

  const col1 = carouselImages.slice(0, 5);
  const col2 = carouselImages.slice(5, 10);
  const col3 = carouselImages.slice(10, 14);

  const proofImages = Array.from({ length: 26 }, (_, i) => `/images/social-proof/proof-${String(i + 1).padStart(2, "0")}.png`);
  const proofRow1 = proofImages.slice(0, 13);
  const proofRow2 = proofImages.slice(13);

  const phases = [
    { n: "01", name: "Person", sub: "Identity & IP", body: "Before you build anything, you need absolute clarity on who you are professionally, what makes your perspective unique, and who needs what you offer. We excavate the expertise you\u2019ve been sitting on \u2014 frameworks you forgot you built, insights you take for granted, an entire IP library hiding in your career.", gets: ["Identity excavation & positioning", "Complete IP map", "Ideal client profile", "Future self design"], ai: "Claude surfaces patterns across your career you\u2019d never spot yourself, maps your IP at scale, and generates your ideal client profile from real market language." },
    { n: "02", name: "Proof", sub: "Market validation", body: "Before you invest weeks building, we validate demand. Competitor analysis, pricing benchmarks, demand signals. You\u2019ll know exactly what the market pays for, where the gaps are, and how you stack up.", gets: ["Competitor matrix", "ICP validation research", "Market intelligence brief", "Must-have problem identification"], ai: "AI analyses your competitive landscape in hours and identifies positioning gaps a human researcher would take weeks to find." },
    { n: "03", name: "Promise", sub: "Signature offer", body: "The centrepiece. We synthesise your IP, market intelligence, and ideal client profile into a signature offer so clear that strangers say \u2018that\u2019s exactly what I need.\u2019 Named. Priced. Packaged. With a curriculum, delivery model, and professional prospectus.", gets: ["Named signature offer", "Value-based pricing strategy", "Curriculum & delivery design", "Professional prospectus"], ai: "Claude stress-tests your offer against competitors, generates prospectus copy, and models pricing scenarios so you price with confidence." },
    { n: "04", name: "Profile", sub: "Content & visibility", body: "An AI-powered content engine that takes your IP and turns it into authority-building content across every channel. One hour of input produces a week of content. You stay visible without it becoming a second job.", gets: ["Content engine (100+ prompts)", "Publishing system & workflow", "Digital presence alignment", "Keynote/talk structure"], ai: "Your IP feeds the engine; Claude produces LinkedIn posts, newsletters, Reels scripts \u2014 all in your voice, from your expertise." },
    { n: "05", name: "Pipeline", sub: "Client acquisition", body: "The business machine. Infrastructure that turns strangers into leads, leads into calls, calls into clients. CRM, landing page, email sequences, advertising, sales playbook \u2014 built, connected, running.", gets: ["CRM setup & pipeline", "Landing page", "Email automation", "Meta ads & paid acquisition", "Video sales letter", "Sales playbook"], ai: "AI writes email sequences, generates ad variations, builds landing page copy, and refines sales scripts \u2014 calibrated to your ideal client." },
    { n: "06", name: "Partner", sub: "Scale & ecosystems", body: "Strategic partnerships that multiply reach, revenue, and impact without hiring. Frameworks, scorecards, pitches, and agreements that let you evaluate and execute partnerships with confidence.", gets: ["Gap map", "Partner profile builder", "Fit scorecard", "Partnership pitch", "Agreement outlines"], ai: "Claude identifies potential partners, generates pitch documents, and models partnership scenarios for objective evaluation." },
  ];

  return (
    <div>
      {/* ── STICKY BOTTOM BAR ── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: "rgba(15,15,15,0.95)",
          backdropFilter: "blur(16px)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          transform: showNav ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.4s ease",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5 }}>
          See if you&apos;re right to productize yourself
        </span>
        <a
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "12px 28px",
            background: "var(--color-accent)",
            color: "var(--color-white)",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          APPLY NOW
        </a>
      </div>

      {/* ── HERO ── */}
      <Section dark style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 60, paddingBottom: 60 }}>
        <HeroW style={{ textAlign: "center" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 36 }}>
              <div style={{ display: "flex" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: "#333", border: "2px solid #1A1A1A", marginLeft: i > 1 ? -10 : 0 }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                Trusted by <strong style={{ color: "rgba(255,255,255,0.8)" }}>300+</strong> post-corporate professionals
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 style={{ fontSize: "clamp(40px, 7.5vw, 84px)", fontWeight: 900, lineHeight: 1.02, color: "var(--color-white)", letterSpacing: "-0.04em", marginBottom: 24 }}>
              Build Your<br />
              <span style={{ background: "linear-gradient(135deg, var(--color-accent), #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Productized
              </span>
              <br />Consulting Business
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 12px" }}>
              Turn who you are into what you do, create, and sell.
            </p>
            <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 48px" }}>
              16 weeks. AI-native. 30+ operational assets built with you.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <ApplyButton />
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 16, letterSpacing: 0.5 }}>
              Free consultation. See if you qualify.
            </p>
          </Reveal>
        </HeroW>
      </Section>

      {/* ── LOGO CAROUSEL ── */}
      <LogoCarousel />

      <TextBanner dark text="PRODUCTIZE YOURSELF" />

      {/* ── TRUST BAR ── */}
      <div style={{ background: "var(--color-charcoal)", padding: "56px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <Wide>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, textAlign: "center" }}>
              {[
                ["300+", "Post-Corporate Pros Trained"],
                ["30+", "Assets Built Per Client"],
                ["100+", "AI Prompts Included"],
                ["10+", "Years Product Strategy"],
              ].map(([num, label], i) => (
                <div key={i}>
                  <p style={{ fontSize: 36, fontWeight: 900, color: "var(--color-white)", letterSpacing: "-0.02em" }}>{num}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 8, letterSpacing: 2, textTransform: "uppercase" }}>{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Wide>
      </div>

      {/* ── THE PROBLEM ── */}
      <Section dark={false} style={{ paddingBottom: 60 }}>
        <Narrow>
          <Reveal>
            <Label>THE PROBLEM</Label>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.08, color: "var(--color-text)", letterSpacing: "-0.03em", marginBottom: 36 }}>
              You have the expertise. You don&apos;t have the infrastructure.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            {[
              "You spent years becoming genuinely excellent at what you do. Strategy. Operations. People. Product. The kind of good that got you promoted and trusted with the work that mattered.",
              "Then you left. And you stepped out of a structure doing enormous heavy lifting \u2014 marketing, sales, operations, IT, finance, admin. All handled. You never had to think about it.",
              "Now you\u2019re running five departments alone. Doing custom work for clients who dictate the scope and negotiate your rate down. It doesn\u2019t feel like the business you imagined. It feels like you replaced your boss with several.",
            ].map((t, i) => (
              <p key={i} style={{ fontSize: 17, lineHeight: 1.85, color: "var(--color-text-body)", marginBottom: 20 }}>{t}</p>
            ))}
            <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--color-text-body)" }}>
              We call this <strong style={{ color: "var(--color-text)", fontWeight: 700 }}>Structure Shock.</strong> It&apos;s the single biggest reason talented professionals earn a fraction of their worth after corporate. The good news &mdash; it&apos;s completely fixable. And with AI, faster than ever.
            </p>
          </Reveal>
        </Narrow>
      </Section>

      <TextBanner dark={false} text="CONFIDENCE COMES FROM DOING" />

      {/* ── ROSS STORY ── */}
      <Section dark style={{ paddingTop: 80 }}>
        <Narrow>
          <Reveal>
            <Label light>THE STORY</Label>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, lineHeight: 1.1, color: "var(--color-white)", letterSpacing: "-0.03em", marginBottom: 36 }}>
              I left Accenture at 26. It took me years to build what I&apos;m about to show you.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            {[
              "I was 26 when I walked away from a career that, on paper, was working. Accenture. Good salary. Global clients. Fast-tracked. But I could see the road ahead \u2014 and it looked like a slow march toward regret.",
              "I was confused. Lost. Out on my own after a stable, fast-track route to success. I could see people around me \u2014 some younger \u2014 figuring their careers out. And for me, I saw a road to regret and boredom. I wanted more than I could see before me, but nothing made sense.",
              "For years, I tried everything. Coaches who gave me a Canva logo for $5K. Courses I never finished. I spent over $100K on business education. Some brilliant. A lot of it expensive lessons in what doesn\u2019t work.",
              "But slowly, the pattern emerged. The professionals making it had three things: a clear offer that sold itself, a content engine that built trust automatically, and a pipeline that turned strangers into clients. The ones stuck had all the raw material but no system.",
            ].map((t, i) => (
              <p key={i} style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(255,255,255,0.75)", marginBottom: 20 }}>{t}</p>
            ))}
          </Reveal>
          <Reveal delay={200}>
            <div style={{ borderLeft: "2px solid rgba(255,255,255,0.12)", paddingLeft: 28, margin: "40px 0" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 16, letterSpacing: 2, textTransform: "uppercase" }}>Sound familiar?</p>
              {[
                "You\u2019re doing custom work where clients feel more like managers than partners",
                "Every project requires your time \u2014 no leverage, no scalability, no predictable revenue",
                "You have half-finished ideas and a LinkedIn that gets likes but not clients",
                "You watch people with less experience making it work \u2014 and wonder what they figured out",
              ].map((t, i) => (
                <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>
                  <span style={{ color: "rgba(255,255,255,0.2)", marginRight: 12 }}>--</span>{t}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(255,255,255,0.75)", marginBottom: 20 }}>
              <strong style={{ color: "var(--color-white)" }}>I built that system.</strong> It&apos;s called Productize Yourself. The 6P Framework compresses everything I spent five years and $100K learning into 16 weeks. With AI as your co-founder at every step.
            </p>
            <div style={{ marginTop: 40 }}><ApplyButton /></div>
          </Reveal>
        </Narrow>
      </Section>

      {/* ── VERTICAL PHOTO CAROUSEL ── */}
      <div style={{ background: "var(--color-charcoal)", padding: "0 24px", overflow: "hidden" }}>
        <Wide>
          <div style={{ display: "flex", gap: 8, height: 480 }}>
            <PhotoColVertical dir="up" speed={35} images={col1} />
            <PhotoColVertical dir="down" speed={28} images={col2} />
            <PhotoColVertical dir="up" speed={32} images={col3} />
          </div>
        </Wide>
      </div>

      <TextBanner dark text="PRODUCTIZE YOURSELF" />

      {/* ── 6P FRAMEWORK ── */}
      <Section dark>
        <Wide>
          <Reveal>
            <Label light>THE FRAMEWORK</Label>
            <h2 style={{ fontSize: "clamp(32px, 5.5vw, 60px)", fontWeight: 900, lineHeight: 1.08, color: "var(--color-white)", letterSpacing: "-0.03em", marginBottom: 20 }}>
              Six phases. One system.<br />Your productized consulting business.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", marginBottom: 56, maxWidth: 680 }}>
              Built on startup acceleration principles. Adapted for individuals with decades of expertise. Each phase produces real deliverables. Each de-risks the next. Every step powered by AI.
            </p>
          </Reveal>
          <Reveal delay={100}>
            {phases.map((p, i) => (
              <Phase key={i} number={p.n} name={p.name} subtitle={p.sub} isOpen={openPhase === i} onClick={() => setOpenPhase(openPhase === i ? -1 : i)}>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", marginBottom: 24 }}>{p.body}</p>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>Deliverables</p>
                {p.gets.map((g, j) => (
                  <p key={j} style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 6, paddingLeft: 16 }}>
                    <span style={{ color: "rgba(255,255,255,0.15)", marginRight: 8 }}>-</span>{g}
                  </p>
                ))}
                <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(37,99,235,0.06)", borderRadius: 8, borderLeft: "2px solid var(--color-accent)" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-accent)", marginBottom: 6, letterSpacing: 1.5, textTransform: "uppercase" }}>AI at work</p>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.55)" }}>{p.ai}</p>
                </div>
              </Phase>
            ))}
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 48, flexWrap: "wrap" }}>
              {phases.map((p, i) => (
                <span key={i} style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: 1.5, textTransform: "uppercase" }}>
                  {p.n} {p.name}{i < 5 ? <span style={{ margin: "0 8px", opacity: 0.3 }}>&gt;</span> : ""}
                </span>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: 16, color: "rgba(255,255,255,0.35)", marginTop: 32, fontStyle: "italic" }}>
              Turn who you are into what you do, create, and sell.
            </p>
            <div style={{ textAlign: "center", marginTop: 40 }}><ApplyButton /></div>
          </Reveal>
        </Wide>
      </Section>

      {/* ── WHAT YOU GET ── */}
      <Section dark={false}>
        <Wide>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <Label>WHAT YOU GET</Label>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.08, color: "var(--color-text)", letterSpacing: "-0.03em" }}>
                Built in 16 weeks. Yours forever.
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              ["01", "Signature Offer", "A productized consulting offer \u2014 named, priced, and packaged \u2014 that attracts the right clients without chasing. Designed so strangers say, \u2018I need that.\u2019"],
              ["02", "AI Fluency", "100+ structured prompts woven into every part of your business. Content, leads, deliverables. AI becomes how you work \u2014 top 0.01% of AI users worldwide."],
              ["03", "Client Pipeline", "CRM, landing page, email automation, video sales letter, and a complete sales playbook. All built, connected, running. Leads while you sleep."],
              ["04", "Content Engine", "AI-powered publishing that turns your IP into posts, newsletters, and Reels. 3x per week, in your voice, without a marketing team."],
              ["05", "Paid Acquisition", "Meta ads strategy, AI-powered creative production, audience targeting, and campaign optimisation. Advanced techniques that scale your reach profitably."],
              ["06", "Growth Network", "Build alongside post-corporate professionals from Google, Accenture, Deloitte, Microsoft, and beyond. People who are in it right now."],
            ].map(([num, title, desc], i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ background: "var(--color-white)", padding: 36, borderRadius: 12, position: "relative", height: "100%", border: "1px solid var(--color-border)" }}>
                  <span style={{ fontSize: 72, fontWeight: 900, color: "#F0F0F0", position: "absolute", top: 12, right: 20, lineHeight: 1, pointerEvents: "none" }}>{num}</span>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 12, position: "relative" }}>{title}</p>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--color-text-body)", position: "relative" }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wide>
      </Section>

      {/* ── BUNDLE IMAGE ── */}
      <div style={{ background: "var(--color-charcoal)", padding: "80px 24px" }}>
        <Wide>
          <Reveal>
            <div style={{ width: "100%", aspectRatio: "16/7", borderRadius: 16, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Image src="/images/assets/bundle.png" alt="Productize Yourself programme bundle" fill style={{ objectFit: "contain" }} sizes="1140px" />
            </div>
          </Reveal>
        </Wide>
      </div>

      {/* ── BEFORE / AFTER ── */}
      <Section dark>
        <Wide>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <Label light>THE TRANSFORMATION</Label>
              <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, lineHeight: 1.08, color: "var(--color-white)", letterSpacing: "-0.03em" }}>Before vs. After</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, borderRadius: 16, overflow: "hidden" }}>
              <div style={{ background: "var(--color-card)", padding: "40px 36px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 28 }}>Before</p>
                {[
                  "Vague offer, custom every time",
                  "Clients find you through referrals and luck",
                  "Post on LinkedIn when you remember",
                  "Awkward sales conversations, no playbook",
                  "Clients feel more like managers",
                  "\"I've played with ChatGPT a few times\"",
                  "\"I'm figuring it out\"",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                    <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 13, marginTop: 2, flexShrink: 0 }}>x</span>
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.4)" }}>{t}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: "#111827", padding: "40px 36px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 28 }}>After 16 Weeks</p>
                {[
                  "Named signature offer strangers understand instantly",
                  "Landing page, email nurture, and ads generating leads weekly",
                  "AI engine publishing 3x per week in your voice",
                  "Sales playbook with scripts and closing frameworks",
                  "You control the dynamic, the scope, and the price",
                  "AI woven into how you create, sell, and deliver",
                  "\"I have a system and it's working\"",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--color-accent)", fontSize: 12, marginTop: 3, flexShrink: 0 }}>&gt;</span>
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Wide>
      </Section>

      <TextBanner dark text="PRODUCTIZE YOURSELF" />

      {/* ── 8 REASONS ── */}
      <Section dark={false}>
        <Narrow>
          <Reveal>
            <Label>WHY US</Label>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, lineHeight: 1.08, color: "var(--color-text)", letterSpacing: "-0.03em", marginBottom: 48 }}>
              8 reasons post-corporate pros choose to build with us
            </h2>
          </Reveal>
          {[
            ["No more custom work that puts you back in a \u2018job.\u2019", "When every client dictates the terms, you\u2019ve replaced your boss with several. A productized offer puts you back in control."],
            ["No more invisible expertise.", "An AI content engine turns your IP into authority-building content \u2014 consistently, in your voice \u2014 without becoming your full-time job."],
            ["No more random tactics.", "The 6P Framework is sequential. Each phase tells you what to build, in what order, and why."],
            ["No more paying for advice that produces nothing.", "You walk away with 30+ operational assets. Infrastructure, not inspiration."],
            ["No more being behind on AI.", "AI becomes part of how your business runs \u2014 permanently. That fluency compounds every month."],
            ["No more feast-or-famine.", "A pipeline means leads come in every week \u2014 not just when someone remembers your name."],
            ["No more imposter syndrome about selling.", "Scripts, objection handling, closing frameworks \u2014 for people brilliant at delivery but uncomfortable with self-promotion."],
            ["No more watching less experienced people win.", "You have the expertise. They have a system. After this, you\u2019ll have both."],
          ].map(([title, body], i) => (
            <Reveal key={i} delay={i * 50}>
              <div style={{ display: "flex", gap: 24, marginBottom: 40 }}>
                <span style={{ fontSize: 56, fontWeight: 900, color: "#E8E8E8", minWidth: 56, lineHeight: 1, textAlign: "right" }}>{i + 1}</span>
                <div style={{ paddingTop: 6 }}>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text)", marginBottom: 6 }}>{title}</p>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--color-text-body)" }}>{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </Narrow>
      </Section>

      {/* ── SOCIAL PROOF CAROUSEL ── */}
      <Section dark style={{ paddingBottom: 40 }}>
        <Wide>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Label light>RESULTS</Label>
              <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, lineHeight: 1.08, color: "var(--color-white)", letterSpacing: "-0.03em" }}>
                What happens when the system works
              </h2>
            </div>
          </Reveal>
        </Wide>
      </Section>
      <div style={{ background: "var(--color-charcoal)", paddingBottom: 80, overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <HorizontalImageRow direction="left" speed={45} images={proofRow1} height={240} />
          <HorizontalImageRow direction="right" speed={50} images={proofRow2} height={240} />
        </div>
      </div>

      {/* ── FOR / NOT FOR ── */}
      <Section dark={false}>
        <Wide>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, borderRadius: 16, overflow: "hidden" }}>
              <div style={{ background: "var(--color-charcoal)", padding: "56px 44px" }}>
                <p style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, color: "var(--color-white)", marginBottom: 36, letterSpacing: "-0.02em" }}>This is for you if...</p>
                {[
                  "You have 5+ years of professional experience worth packaging",
                  "You\u2019ve left corporate or you\u2019re about to",
                  "You\u2019re doing custom work that feels like another job",
                  "You\u2019re earning below your potential and you know it",
                  "You\u2019re ready to build \u2014 not explore, learn, or plan",
                  "You want AI to be a genuine competitive advantage",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--color-accent)", fontSize: 16, marginTop: 1, flexShrink: 0 }}>&gt;</span>
                    <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.75)" }}>{t}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: "#111111", padding: "56px 44px" }}>
                <p style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, color: "rgba(255,255,255,0.35)", marginBottom: 36, letterSpacing: "-0.02em" }}>This isn&apos;t for you if...</p>
                {[
                  "You\u2019re looking for a get-rich-quick scheme",
                  "You don\u2019t have real expertise or professional experience",
                  "You want someone to do the work for you",
                  "You\u2019re not willing to commit 5-10 hours per week",
                  "You think AI is a fad or a shortcut",
                  "You\u2019d rather keep planning than start building",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
                    <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 13, marginTop: 2, flexShrink: 0 }}>x</span>
                    <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.35)" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Wide>
      </Section>

      {/* ── ABOUT ROSS ── */}
      <Section dark>
        <Wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "center" }}>
            <Reveal>
              <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 12, overflow: "hidden", position: "relative" }}>
                <Image src="/images/assets/ross-headshot.jpg" alt="Ross Power" fill style={{ objectFit: "cover" }} sizes="400px" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Label light>YOUR GUIDE</Label>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 1.1, color: "var(--color-white)", letterSpacing: "-0.03em", marginBottom: 28 }}>Meet Ross</h2>
              {[
                "Ex-Accenture product strategist. 10+ years in product strategy and acceleration. Built across the UK, Lisbon, US, Dubai, and Bali.",
                "I built Productize Yourself because it didn\u2019t exist when I needed it. After leaving corporate at 26, I was confused, lost, and spent years assembling pieces from coaches, courses, and expensive mistakes until the pattern became clear.",
                "Today, I run AI Powered from Bali \u2014 an education and events company teaching hundreds of people how to bring AI into their business and transform their lives for the new era. Workshops, accelerator programmes, corporate training, and this: a system that turns what you know into a business that works.",
                "I\u2019ve trained 300+ post-corporate professionals, delivered AI workshops to standing-room audiences across Bali, Dubai, and Singapore, and built a consulting business that runs from wherever I choose to be. The thing I care about most? Being genuine about what this takes \u2014 and showing you it\u2019s possible.",
              ].map((t, i) => (
                <p key={i} style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>{t}</p>
              ))}
              <p style={{ fontSize: 22, fontStyle: "italic", color: "rgba(255,255,255,0.3)", marginTop: 36, fontWeight: 300 }}>
                &ldquo;Confidence comes from doing.&rdquo;
              </p>
            </Reveal>
          </div>
        </Wide>
      </Section>

      {/* ── EDUCATOR CAROUSEL ── */}
      <div style={{ background: "var(--color-charcoal)", padding: "20px 0 80px", overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <HorizontalImageRow direction="left" speed={38} images={carouselImages.slice(0, 7)} height={200} />
          <HorizontalImageRow direction="right" speed={42} images={carouselImages.slice(7)} height={200} />
        </div>
      </div>

      {/* ── GUARANTEE ── */}
      <Section dark={false}>
        <Wide>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 64, alignItems: "center" }}>
              <div>
                <Label>MY PROMISE</Label>
                <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 1.1, color: "var(--color-text)", letterSpacing: "-0.03em", marginBottom: 28 }}>
                  Every deliverable built. Or we keep going.
                </h2>
                {[
                  "I know what it feels like to invest in something and walk away with nothing tangible. That\u2019s why the guarantee is simple.",
                  "We build 30+ operational assets with you. If any aren\u2019t finished by programme end, we keep building at no additional cost until everything is complete and launched.",
                  "I\u2019d rather over-deliver than over-promise. That\u2019s the only way I know how to do this.",
                ].map((t, i) => (
                  <p key={i} style={{ fontSize: 17, lineHeight: 1.85, color: "var(--color-text-body)", marginBottom: 16 }}>{t}</p>
                ))}
              </div>
              <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 12, overflow: "hidden", position: "relative" }}>
                <Image src="/images/assets/ross-headshot.jpg" alt="Ross Power guarantee" fill style={{ objectFit: "cover" }} sizes="400px" />
              </div>
            </div>
          </Reveal>
        </Wide>
      </Section>

      {/* ── FAQ ── */}
      <Section dark={false} style={{ paddingTop: 40 }}>
        <Narrow>
          <Reveal>
            <Label>FAQ</Label>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, lineHeight: 1.08, color: "var(--color-text)", letterSpacing: "-0.03em", marginBottom: 40 }}>Common questions</h2>
          </Reveal>
          <Reveal delay={100}>
            {[
              ["What does the programme cost?", "We have several options at different levels. We\u2019ll work out what\u2019s right on the call. Every option is designed so your first client covers the investment within 90 days."],
              ["How quickly will I see results?", "Signature offer designed and launched in the first four weeks. Pipeline live by week ten. First paying client targeted within 90 days."],
              ["How is this different from coaching or courses?", "Coaches give advice. Courses give information. We build infrastructure \u2014 with you. 30+ operational assets. AI-native. Tangible deliverables every phase."],
              ["I\u2019ve paid for coaching before and got nothing.", "The difference is structural: we build 30+ finished assets with you. If your last coach gave you a Canva logo, this is the opposite."],
              ["I don\u2019t know how to use AI.", "Every prompt is pre-built and guided. If you can have a conversation, you can use this. By the end, AI fluency will be one of the most valuable skills you keep."],
              ["Can one person really build this in 16 weeks?", "That\u2019s what AI makes possible. 300+ post-corporate pros have used this methodology. The bottleneck was infrastructure \u2014 not capability."],
              ["What happens after I apply?", "You\u2019ll book a free consultation where we map the framework to your experience. We\u2019ll explore whether the programme is the right fit. Zero pressure."],
            ].map(([q, a], i) => (
              <FAQItem key={i} q={q} a={a} />
            ))}
          </Reveal>
        </Narrow>
      </Section>

      {/* ── URGENCY / NOTE FROM ROSS ── */}
      <Section dark>
        <Narrow style={{ textAlign: "center" }}>
          <Reveal>
            <Label light>A NOTE FROM ROSS</Label>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 900, lineHeight: 1.08, color: "var(--color-white)", letterSpacing: "-0.03em", marginBottom: 32 }}>
              The cost of waiting isn&apos;t zero.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            {[
              "\u201CI wish I\u2019d started six months earlier.\u201D That\u2019s the most common thing people tell me after their first client lands.",
              "AI has changed the maths. One person with the right system can build what used to require a team. But that window won\u2019t stay open forever.",
              "You\u2019ve already done the hardest part. You left. The gap between where you are and where you want to be isn\u2019t more courage \u2014 it\u2019s infrastructure. And infrastructure is buildable. In 16 weeks.",
            ].map((t, i) => (
              <p key={i} style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(255,255,255,0.55)", marginBottom: 20, textAlign: "left" }}>{t}</p>
            ))}
            <div style={{ marginTop: 40 }}><ApplyButton /></div>
          </Reveal>
        </Narrow>
      </Section>

      {/* ── FINAL CTA ── */}
      <Section dark={false} style={{ textAlign: "center", padding: "clamp(100px,14vw,180px) 24px" }}>
        <HeroW>
          <Reveal>
            <h2 style={{ fontSize: "clamp(36px, 6.5vw, 76px)", fontWeight: 900, lineHeight: 1.05, color: "var(--color-text)", letterSpacing: "-0.04em", marginBottom: 20 }}>
              Ready to productize yourself?
            </h2>
            <p style={{ fontSize: 18, color: "var(--color-text-body)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 12px" }}>
              Turn who you are into what you do, create, and sell.
            </p>
            <p style={{ fontSize: 16, color: "var(--color-muted)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 48px" }}>
              Apply for a free consultation. We&apos;ll map the 6P Framework to your expertise and see if the programme is right for you.
            </p>
            <ApplyButton />
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 16 }}>Free consultation. No commitment.</p>
          </Reveal>
        </HeroW>
      </Section>

      {/* ── FOOTER ── */}
      <div style={{ background: "var(--color-charcoal)", padding: "48px 24px 80px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.25)" }}>
          productize <em style={{ fontStyle: "italic" }}>yourself</em>
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.12)", marginTop: 12, letterSpacing: 0.5 }}>
          2026 Productize Yourself. An AI Powered program from Ross Power. All rights reserved.
        </p>
      </div>
      <div style={{ height: 60 }} />
    </div>
  );
}
