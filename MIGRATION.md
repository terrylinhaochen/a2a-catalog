# Migrating a2acatalog.com off Lovable → GitHub Pages

The site is a static Vite SPA. All Supabase calls happen client-side with the
public anon key, so there is no server to migrate — any static host works.
This repo now ships a GitHub Actions workflow
(`.github/workflows/deploy-pages.yml`) that builds and deploys to GitHub Pages
on every push to `main`, plus `public/CNAME` so the custom domain sticks.

## 1. Merge the refresh branch

```bash
git checkout main
git pull origin main
git merge refresh-2026
# review, then:
git push origin main      # NOTE: while Lovable is still connected, this also
                          # triggers a Lovable redeploy — that's fine, the
                          # content refresh is safe to ship there too.
```

## 2. Enable GitHub Pages

1. GitHub → `terrylinhaochen/a2a-catalog` → **Settings → Pages**.
2. Under **Build and deployment**, set **Source = GitHub Actions**.
3. Push to `main` (or run the "Deploy to GitHub Pages" workflow manually from
   the Actions tab). The first run builds and publishes the site.
4. Back in **Settings → Pages**, confirm **Custom domain** shows
   `a2acatalog.com` (it is picked up from `public/CNAME` in the deployed
   artifact; if it doesn't appear automatically, type it in manually).
5. Check **Enforce HTTPS** once the certificate is issued (can take a few
   minutes after DNS propagates).

## 3. GoDaddy DNS change

Currently the domain points at Lovable. In GoDaddy → My Products →
a2acatalog.com → **DNS**:

1. Delete the existing A / CNAME records that point to Lovable
   (`@` A record and/or `www` CNAME to `*.lovable.app` or Lovable's IPs).
2. Add the GitHub Pages records:

   | Type  | Name | Value                   |
   |-------|------|-------------------------|
   | A     | @    | 185.199.108.153         |
   | A     | @    | 185.199.109.153         |
   | A     | @    | 185.199.110.153         |
   | A     | @    | 185.199.111.153         |
   | CNAME | www  | terrylinhaochen.github.io |

3. TTL: default (1 hour) is fine. Propagation is usually minutes, up to 48h.
4. After DNS resolves, re-check "Enforce HTTPS" in the Pages settings.

## 4. SPA routing caveat (already handled)

GitHub Pages is a static file host: a hard refresh on `/agents` or `/about`
would normally return GitHub's 404 page because those files don't exist —
routing is client-side (react-router). The deploy workflow handles this by
copying `dist/index.html` to `dist/404.html`, so unknown paths serve the app
shell and react-router takes over. Trade-off: deep links return HTTP 404
status (with correct content). Search engines index fine via the canonical
URLs + sitemap, but if you ever care about strict 200s on deep links, move to
Cloudflare Pages (native SPA fallback with 200s) — the same `dist/` output
deploys there unchanged.

## 5. Decommission Lovable

Once a2acatalog.com serves from GitHub Pages (check
`dig a2acatalog.com +short` returns the 185.199.x.x IPs):

1. In Lovable, remove the custom domain from the project (so it can't fight
   over the cert), then pause/delete the Lovable deployment.
2. Optional cleanup later: remove `lovable-tagger` from `package.json` /
   `vite.config.ts` and the `/lovable-uploads/` favicon paths. Not required —
   the tagger only runs in dev mode.

## Rollback

DNS is the only switch. Point the records back at Lovable and the old hosting
takes over again; nothing in the repo needs to be reverted.
