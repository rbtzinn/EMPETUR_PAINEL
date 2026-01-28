# Looker Studio Embed (React + Vite)

This is a tiny React app that embeds your Looker Studio report in a responsive iframe.

## Prereqs
- Node.js 18+

## Run locally
```bash
npm install
npm run dev
```

## Deploy
- Push this folder to GitHub and import into Vercel (Framework preset: Vite).
- Or build and deploy anywhere static hosting is supported:
```bash
npm run build
```

## Notes
- In Looker Studio, enable embedding: File → Embed report → Enable embedding.
- Make sure the report sharing settings allow viewers to access it (Public or Anyone with the link).
