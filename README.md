# Public API Directory

A clean, static website for browsing and searching free public APIs. No build
step, no API key, no backend — just open the page and it works.

## What it does

- Fetches the full entry list from the free **Public APIs** API
  (`https://api.publicapis.org/entries`, no key required) on load.
- **Live search** — filters by API name and description as you type.
- **Category dropdown** — populated from the data, plus "All categories".
- **Auth filter** — All / None / apiKey / OAuth.
- **HTTPS only** checkbox.
- Results as cards showing the API name (linked), description, category badge,
  Auth, HTTPS (yes/no) and CORS support.
- A live count of matching results (e.g. "142 APIs").
- Loading state while fetching, and a clear error message if the live request
  fails.

## Fallback dataset

The live endpoint `https://api.publicapis.org/entries` was **unreachable at
build time** (tested 2026-11-21: the TLS handshake completes but the server
closes the connection with an empty reply — `curl` reports HTTP 000). The
service has a history of intermittent outages, so the app does not depend on
it: if the live fetch fails for any reason (network error, non-2xx status, or
unexpected payload), the page automatically loads a **built-in curated list of
32 real, well-known free APIs** (JSONPlaceholder, Dog CEO API, Cat Facts, REST
Countries, GitHub API, Open-Meteo, CoinGecko, PokéAPI, NASA Open APIs, and
more) and shows a notice explaining that the results are limited to that list.
When the live service is reachable, it is used as the primary source and the
fallback is never shown.

## How to run

**Option 1 — just open it:**

```
open index.html        # or double-click it in your file manager
```

**Option 2 — serve it statically (recommended, avoids any file:// quirks):**

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

**Option 3 — GitHub Pages:** push this folder to a repository and enable
Pages (Settings → Pages → deploy from branch, root folder). The site is a
single static page with no build step.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, search/filter controls, results container |
| `style.css` | Dark developer-tool theme, responsive layout (mobile media queries) |
| `app.js` | Fetches the API, filters/searches, renders cards, fallback dataset |
| `README.md` | This file |

## Data source

- Primary: [Public APIs](https://api.publicapis.org/) — `GET /entries`,
  returns `{ count, entries: [{ API, Description, Auth, HTTPS, Cors, Link, Category }] }`.
- Fallback: 32 curated entries embedded in `app.js` (`FALLBACK_ENTRIES`), in
  exactly the same shape as the live API, with Auth / HTTPS / CORS values
  taken from each API's public documentation.
