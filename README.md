# Benable Creator Prototype v1

iOS-style creator mobile prototype. The Campaigns tab plays a celebratory
envelope-open animation revealing the polaroid thank-you a brand sent.

Standalone with seeded mock data; storage shape is intentionally
byte-compatible with the brand prototype (`benable.creatorActions.v3`) so a
later iteration can read real brand-sent thank-yous.

## Dev
npm install && npm run dev

## Deploy
Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
