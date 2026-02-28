# Productize Yourself — Build Brief for Claude Code

> **Version:** V7 (Feb 2026)
> **Stack:** Next.js 15 + Tailwind CSS 4 + TypeScript
> **Deploy target:** Vercel
> **Domain:** productizeyourself.ai

---

## 1. Tech Stack & Configuration

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, `src/` directory) |
| Styling | Tailwind CSS 4 via `@tailwindcss/postcss` |
| Language | TypeScript (strict) |
| Font | Glacial Indifference (.woff2 self-hosted from `/public/fonts/`) |
| Deploy | Vercel (output: standalone) |
| Analytics | Google Tag Manager + Meta Pixel (injected via `<Script>`) |

---

## 2. Design Tokens

```
Black background:    #000000 / #0A0A0A
Card background:     #111111
Border:              #222222
Muted text:          #888888
Gold primary:        #C8A84E
Gold hover:          #B8983E
Gold gradient:       linear-gradient(135deg, #C8A84E, #E8D48B, #C8A84E)
White:               #FFFFFF
```

**Typography:** Glacial Indifference for all text. Body 400, headings 700.

---

## 3. Image Conventions

All images go in `/public/images/` with the following structure:

```
public/
  images/
    logos/
      logo-google.png
      logo-accenture.png
      logo-microsoft.png
      logo-deloitte.png
      logo-salesforce.png
      logo-ee.png
      logo-haagen-dazs.png
      logo-oracle.png
    carousel/
      carousel-01.jpg  … carousel-18.jpg
    social-proof/
      proof-01.jpg  … proof-12.jpg
    coaching/
      coaching-01.jpg  … coaching-08.jpg
    ross-about.jpg
    ross-guarantee.jpg
    bundle.png
  fonts/
    GlacialIndifference-Regular.woff2
    GlacialIndifference-Bold.woff2
```

### Logo bar
- 8 greyscale PNGs, ~200px wide
- Displayed at 50% opacity in a horizontal row
- Responsive: scroll on mobile, flex-wrap or grid on desktop

### Vertical 3-column carousel (Hero proof section)
- 12–18 photos split across 3 columns
- Each column auto-scrolls vertically (CSS animation)
- Column 1: scroll up | Column 2: scroll down | Column 3: scroll up
- Speed: ~30s per full loop, infinite, pauses on hover
- Container height: ~600px with overflow hidden

### Social proof horizontal carousel
- 12+ screenshot images
- Auto-scroll left, infinite loop
- Pause on hover, draggable on mobile
- Gap: 1rem between cards

### Coaching horizontal carousel
- Same behaviour as social proof carousel
- Photos of Ross training / coaching / presenting

---

## 4. Page Sections (top → bottom)

1. **Hero** — headline, sub-headline, CTA button
2. **Logo bar** — "As featured working with" + 8 logos
3. **Vertical carousel** — "Real People. Real Results." + 3-col scrolling images
4. **Social proof carousel** — horizontal auto-scroll testimonial screenshots
5. **Meet Ross** — portrait + bio text (2-column layout)
6. **Coaching carousel** — horizontal auto-scroll coaching photos
7. **What You Get / Bundle** — programme contents + bundle image + CTA
8. **Guarantee** — 30-day money-back guarantee + photo
9. **FAQ** — accordion (native `<details>` elements)
10. **Final CTA** — closing headline + button
11. **Footer** — copyright

---

## 5. Interactions & Behaviour

| Element | Behaviour |
|---|---|
| CTA buttons | Gold gradient, lift + glow on hover, scroll to checkout or external link |
| Vertical carousel | CSS `@keyframes` translate-Y, 3 columns, alternating directions |
| Horizontal carousels | CSS `@keyframes` translate-X, duplicate children for seamless loop |
| FAQ accordion | `<details>` + `<summary>`, + icon rotates to × on open |
| Smooth scroll | `scroll-behavior: smooth` on `<html>` |
| Gold gradient text | `background-clip: text` utility class `.gold-gradient-text` |

---

## 6. Tracking Setup

### Google Tag Manager
```tsx
// In layout.tsx <head>
<Script id="gtm" strategy="afterInteractive">
  {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');`}
</Script>

// In layout.tsx <body> (top)
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
    height="0" width="0" style="display:none;visibility:hidden" />
</noscript>
```

### Meta Pixel
```tsx
<Script id="meta-pixel" strategy="afterInteractive">
  {`!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');`}
</Script>
```

Replace `GTM-XXXXXXX` and `YOUR_PIXEL_ID` with your real IDs.

---

## 7. Deployment Checklist

- [ ] Drop real images into `/public/images/` subfolders
- [ ] Add Glacial Indifference `.woff2` files to `/public/fonts/`
- [ ] Replace `GTM-XXXXXXX` with real GTM container ID
- [ ] Replace `YOUR_PIXEL_ID` with real Meta Pixel ID
- [ ] Set CTA button links to checkout URL
- [ ] Update FAQ copy if needed
- [ ] Update Meet Ross bio copy if needed
- [ ] Run `npm run build` — confirm zero errors
- [ ] Push to GitHub
- [ ] Connect repo to Vercel → deploy
- [ ] Verify GTM + Pixel firing in browser dev tools
- [ ] Test on mobile (responsive check)

---

## 8. File Structure Reference

```
productizeyourelf.ai/
├── docs/
│   └── Productize_Yourself_Build_Brief.md   ← this file
├── public/
│   ├── fonts/
│   │   ├── GlacialIndifference-Regular.woff2
│   │   └── GlacialIndifference-Bold.woff2
│   └── images/
│       ├── logos/         (8 PNGs)
│       ├── carousel/      (12-18 JPGs)
│       ├── social-proof/  (12+ JPGs)
│       ├── coaching/      (6-8 JPGs)
│       ├── ross-about.jpg
│       ├── ross-guarantee.jpg
│       └── bundle.png
├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```
