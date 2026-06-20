# iWAN Research Group — website

Bilingual (English / Arabic, RTL) website for the **iWAN Research Group** at
King Saud University. Built as a lightweight static site for GitHub Pages — no
build step, no framework. Publications populate **automatically** from
[OpenAlex](https://openalex.org); GitHub and Hugging Face content load live.

🌿 Aesthetic: restrained scholarly editorial — emerald + manuscript-gold on
warm parchment, fronted by the group's **إيوان** wordmark logo.

## The logo
The site shows `assets/img/iwan-logo.png` everywhere (nav, hero, footer,
favicon). **Drop the official logo artwork in as `assets/img/iwan-logo.png`**
(transparent PNG) and it appears site-wide automatically. Until then, a built-in
`assets/img/iwan-logo.svg` wordmark (إيوان, in gold) is used as a fallback.

## Pages
| Page | What it does |
|------|--------------|
| `index.html` | Home: hero, focus areas, live "recent publications" |
| `publications.html` | Full publication list — searchable, filterable, auto-updated |
| `members.html` | Team roster, rendered from `data/members.json` |
| `resources.html` | Live GitHub repos + Hugging Face models/datasets |

## How publications stay current
1. **Nightly:** `.github/workflows/update-publications.yml` runs
   `scripts/fetch_publications.py`, which queries OpenAlex for every author in
   `data/authors.json`, de-duplicates, and writes `data/publications.json`.
2. **In the browser:** pages read the cached JSON for a fast load. If the cache
   is empty/unavailable, they fetch OpenAlex live as a fallback — so it works
   even before the first Action run.

### Add or change tracked authors
Edit **`data/authors.json`** — add each member's OpenAlex author id:

```json
{ "id": "A5063710079", "name": "Hend S. Al-Khalifa" }
```

Find an id by searching the name at <https://openalex.org>. Pushing a change to
this file triggers a re-fetch automatically.

### Run the fetcher manually
```bash
python scripts/fetch_publications.py
```

## Edit the team
Edit **`data/members.json`**. Each member has `group`
(`lead` / `faculty` / `students` / `alumni`), bilingual name/role/area fields,
an optional `photo` (path under `assets/img/`, otherwise colored initials are
shown), a `color`, and `links` (`scholar`, `openalex`, `github`, `hf`, `x`,
`email`, `web`).

## Deploy on GitHub Pages
1. Create a repo named **`iwan-rg.github.io`** under the `iwan-rg` org (a
   user/org Pages repo serves at the org root).
2. Push these files to the `main` branch.
3. **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**,
   branch `main`, folder `/ (root)`. Save.
4. The site goes live at `https://iwan-rg.github.io`. To use the custom domain
   `iwan.ksu.edu.sa`, add a `CNAME` file and configure DNS.

> The repo is intentionally Jekyll-free (`.nojekyll` is included) so files under
> `assets/` are served verbatim.

## Edit content / translations
All UI strings live in `assets/js/i18n.js` (`en` and `ar` tables). The language
toggle persists the choice and switches the page to RTL for Arabic.

## Tech
Plain HTML/CSS/JS · Fraunces + IBM Plex Sans / IBM Plex Sans Arabic · OpenAlex,
GitHub & Hugging Face public APIs (no keys) · GitHub Actions for the nightly
refresh.
