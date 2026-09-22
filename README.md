# Expert-hiring pilot

The new product surface at **https://a2acatalog.com**. The domain and GitHub Pages deployment container are reused; the old A2A Catalog application, catalog data, UI, dependencies, documentation and positioning are retired.

**Expert agents** is a temporary descriptive label. No final product name has been selected. **Skillshare** remains the existing router's internal pilot name; do not rename its MCP identifiers or authentication settings as part of a website rebrand.

## Product boundary

- This is a small, static discovery and connection surface. It does not host customer chat or start tasks.
- The customer's conversation stays in Codex or another connected agent harness.
- The existing hosted router handles discovery, expert discussion, exact scope approval, execution, progress, artifacts and applicable billing.
- Reports, accounts and payment return stay at `https://crowdlisten-skills-api.vercel.app/skillshare`.
- CrowdListen remains the system of record for its own findings and dashboard.
- GitHub research is a bounded, operator-funded pilot, currently up to five prospects. No 100-lead promise is made.
- Video generation is not promoted as a production-quality use case.
- The site includes no credentials, analytics trackers, paid task calls or third-party assets.

## Build and preview

Node 22+ is required. There are no package dependencies and no install step.

```sh
npm run build
npm run preview
```

Open `http://localhost:8085`. `scripts/build.mjs` copies only `site/` into `dist/`. GitHub Actions builds and deploys this output to GitHub Pages on a push to `main`. Existing DNS and the Pages custom domain remain unchanged.

## Archive and rollback

The old application was clean at commit `e29b4255387fe52e3aa602a326632fd01ceaa2e8`. A verified copy of all 157 working-tree files and a complete Git history bundle are preserved in the workspace at `../../archive/a2a-catalog-2026-09-22/`.

The `archive/a2a-catalog-2026-09-22` Git tag preserves the same baseline in the remote repository. Old catalog routes now show a retired-page response rather than serving legacy listings. Rollback should restore the baseline as a new reviewed commit; do not force-push or delete history.
