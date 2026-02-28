# productizeyourself.ai

Landing page for the **Productize Yourself** programme by Ross Power.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS 4**
- **Glacial Indifference** font (self-hosted)
- **Vercel** deployment

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before Deploying

1. Add your images to `/public/images/` (see `docs/Productize_Yourself_Build_Brief.md` for folder structure)
2. Add Glacial Indifference `.woff2` files to `/public/fonts/`
3. Add your GTM container ID and Meta Pixel ID in `src/app/layout.tsx`
4. Run `npm run build` to verify
5. Push to GitHub and connect to Vercel
