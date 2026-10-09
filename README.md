# Invincible Marketer — Next.js replica

A faithful recreation of https://class.theinvinciblemarketer.com/s/im/ built
with Next.js App Router, React, TypeScript, and CSS.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. The same page is also available at `/s/im`.

```sh
npm run typecheck
npm run build
npm start
```

`npm run build` exports the Next.js app into `out/`. `npm start` serves that
export through Cloudflare's local Workers runtime at http://localhost:8787.
`npm run preview` builds the export and starts the same preview in one command.

## Deploy to Cloudflare Workers

The app is configured as a static-assets Worker named `leadlify-test` in the
Cloudflare account selected in your dashboard. `wrangler.jsonc` owns the Worker
name, account, routing, and exported asset directory. The React source remains
in this project; Next.js renders it during the build.

```sh
npx wrangler login
npm run deploy
```

The deploy command builds the site, uploads `out/`, and deploys the Worker on
its `workers.dev` address. Keep the same Worker name for subsequent updates.
To create a separate Worker instead, change `name` in `wrangler.jsonc` first.
No custom domain or DNS change is required for the initial deployment.

Validate without publishing:

```sh
npm run deploy:check
```

For a Git-connected Worker in Cloudflare's dashboard, use the repository root
as the root directory, `npm run build` as the build command, and
`npx wrangler deploy` as the deploy command. Commit `package-lock.json` along
with the source and configuration.

Both `/` and `/s/im/` are exported. Cloudflare redirects `/s/im` to `/s/im/`,
serves the local images, CSS, fonts, and JavaScript, and returns the generated
404 page for unknown URLs. This deployment supports the app's current static
pages and browser interactions. Adding server actions, API routes, or
request-time rendering would require a server-capable Workers adapter.

Wrangler authentication is separate from the browser's Cloudflare sign-in.
Keep API tokens in environment variables when using CI; never commit them.

Official reference: [Workers static site configuration](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/).

## Structure

- `src/app/page.tsx` assembles the landing page.
- `src/components/sections/` contains the ten editable React sections.
- `src/components/VideoEmbed.tsx` contains the responsive video player embed.
- `src/app/reference.css` preserves the reference presentation and breakpoints.
- `src/app/globals.css` adds focus states, native FAQ behavior, and reduced motion.
- `public/assets/` contains locally hosted reference images, fonts, and an asset manifest.
- `DESIGN.md` documents the visual identity and runtime token ownership.

FAQs work with native details/summary. CTA and policy links retain the original
site destinations. Wistia, Vimeo, and SoTellUs embeds require an internet
connection and depend on their respective providers. No original analytics,
tracking scripts, or ClickFunnels JavaScript are included.

The source import script in `scripts/import-reference.mjs` was used once to
convert the reference markup to native JSX. It is not required to run or build
the app. Re-running it requires a source snapshot at `.reference/reference.html`.
