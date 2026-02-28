export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
          The system for turning your expertise into income
        </p>
        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
          <span className="gold-gradient-text">Productize Yourself</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
          Turn what you already know into a digital product that earns while you
          sleep. No audience needed. No tech skills required.
        </p>
        <button className="gold-button rounded-sm text-sm md:text-base">
          Get Instant Access
        </button>
      </section>

      {/* ── Logo Bar ── */}
      <section className="border-y border-[var(--color-dark-border)] py-8">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
          As featured working with
        </p>
        <div className="flex items-center justify-center gap-12 opacity-50">
          {/* Logo images will go here */}
          <p className="text-sm text-[var(--color-muted)]">
            [Logo images — drop PNGs into /public/images/logos/]
          </p>
        </div>
      </section>

      {/* ── Vertical Carousel Section ── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-5xl">
            Real People. <span className="gold-gradient-text">Real Results.</span>
          </h2>
          <div className="grid grid-cols-3 gap-4 overflow-hidden rounded-lg" style={{ height: "600px" }}>
            {/* Three columns of vertically scrolling images */}
            <div className="flex flex-col gap-4 text-center text-[var(--color-muted)]">
              [Carousel column 1 — add images to /public/images/carousel/]
            </div>
            <div className="flex flex-col gap-4 text-center text-[var(--color-muted)]">
              [Carousel column 2]
            </div>
            <div className="flex flex-col gap-4 text-center text-[var(--color-muted)]">
              [Carousel column 3]
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof Horizontal Carousel ── */}
      <section className="overflow-hidden border-y border-[var(--color-dark-border)] py-16">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          The <span className="gold-gradient-text">Proof</span> Is In The Results
        </h2>
        <div className="text-center text-[var(--color-muted)]">
          [Horizontal scrolling testimonial screenshots — add to /public/images/social-proof/]
        </div>
      </section>

      {/* ── Meet Ross Section ── */}
      <section className="py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="aspect-[3/4] w-full rounded-lg bg-[var(--color-dark-card)] flex items-center justify-center text-[var(--color-muted)]">
              [ross-about.jpg — add to /public/images/]
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">
              Meet Your Coach
            </p>
            <h2 className="mb-6 text-4xl font-bold">Ross Power</h2>
            <p className="mb-4 text-[var(--color-muted)]">
              I&apos;ve spent 10+ years in corporate consulting at companies like Google,
              Accenture, and Microsoft — and built multiple six-figure digital
              businesses on the side.
            </p>
            <p className="text-[var(--color-muted)]">
              Productize Yourself is the exact system I used to escape the 9-5 and
              build a business around my knowledge. Now I&apos;m handing it to you.
            </p>
          </div>
        </div>
      </section>

      {/* ── Coaching Carousel ── */}
      <section className="overflow-hidden border-y border-[var(--color-dark-border)] py-16">
        <div className="text-center text-[var(--color-muted)]">
          [Coaching photos horizontal carousel — add to /public/images/coaching/]
        </div>
      </section>

      {/* ── What You Get / Bundle Section ── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Everything Inside{" "}
            <span className="gold-gradient-text">Productize Yourself</span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-[var(--color-muted)]">
            A complete system — not just another course. Here&apos;s what you unlock
            the moment you join.
          </p>
          <div className="mx-auto mb-12 flex max-w-md items-center justify-center rounded-lg bg-[var(--color-dark-card)] p-8">
            <p className="text-[var(--color-muted)]">
              [bundle.png — add to /public/images/]
            </p>
          </div>
          <button className="gold-button rounded-sm">
            Get Instant Access
          </button>
        </div>
      </section>

      {/* ── Guarantee Section ── */}
      <section className="border-y border-[var(--color-dark-border)] py-24">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="aspect-square w-full rounded-lg bg-[var(--color-dark-card)] flex items-center justify-center text-[var(--color-muted)]">
              [ross-guarantee.jpg]
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="mb-4 text-3xl font-bold">
              <span className="gold-gradient-text">30-Day Money-Back</span>{" "}
              Guarantee
            </h2>
            <p className="text-[var(--color-muted)]">
              Try the entire programme risk-free. If you don&apos;t feel it was worth
              every penny within 30 days, email me and I&apos;ll refund you in full.
              No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Frequently Asked <span className="gold-gradient-text">Questions</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Do I need a large audience to start?",
                a: "No. The system is designed to work from zero. You'll learn how to validate and sell before you build an audience.",
              },
              {
                q: "How long until I see results?",
                a: "Most students launch their first product within 4-6 weeks. Some have made sales within the first week.",
              },
              {
                q: "What if I don't know what to sell?",
                a: "Module 1 walks you through identifying your unique expertise and turning it into a sellable offer.",
              },
              {
                q: "Is this just another course?",
                a: "No — it's a complete system with templates, frameworks, community access, and coaching calls.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-lg border border-[var(--color-dark-border)] bg-[var(--color-dark-card)] p-6"
              >
                <summary className="cursor-pointer text-lg font-semibold list-none flex items-center justify-between">
                  {faq.q}
                  <span className="ml-4 text-[var(--color-gold)] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[var(--color-muted)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Ready to{" "}
            <span className="gold-gradient-text">Productize Yourself</span>?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[var(--color-muted)]">
            Stop trading time for money. Start building something that works for
            you — even while you sleep.
          </p>
          <button className="gold-button rounded-sm text-lg">
            Get Instant Access Now
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--color-dark-border)] py-8 text-center text-sm text-[var(--color-muted)]">
        <p>&copy; {new Date().getFullYear()} Ross Power. All rights reserved.</p>
      </footer>
    </main>
  );
}
