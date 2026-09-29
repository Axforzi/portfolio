# Fix verified audit findings

## Objective
Fix the defects confirmed by source inspection in the 2026-09-29 audit. The
`openspec/changes/analiza-este-portafolio-y-dime-que-se-puede-mejorar/` artifacts
are stale (written 2026-09-04, superseded by 23 commits) and are NOT the source of
truth for this work. Every task below was re-verified against current code.

## Problem
Real, currently-visible defects: a dead conditional that reads a nonexistent field,
Spanish copy leaking to English users, one static document title for four routes,
no social preview metadata, a hardcoded Spanish WhatsApp URL for all languages,
confusing split i18n keys, scattered inline styles, and no lazy image loading.

## Why now
Three of these are visible to a paying client on the live site. Two more block
correct SEO/social sharing. All are small and independently revertible.

## Constraints
- Zero new runtime dependencies. No `react-helmet`, no lint tooling in this change.
- `vite.config.js` `base: '/'` and `public/404.html` `APP_ROOT: '/'` must stay in sync.
  Neither file is touched.
- Artifact language: English.
- Plain JSX, no TypeScript, no test runner exists. Do not introduce one.

## Tasks

### T1 — Remove dead `imageInvert` conditional
- [x] `src/pages/Projects.jsx:23` delete the `style={project.imageInvert ? ... : undefined}` prop.
- Evidence: `imageInvert` occurs exactly once repo-wide (the read itself) and on no
  project object in `src/data/projects.js`. `Home.jsx:134` renders the same images
  with no invert handling. `.img-invert` is scoped `.img-skills .img-invert`
  (`styles.css:620`) and is correctly used at `Home.jsx:112` for `flask.svg`.
- Rationale: speculative config for a feature never wired up. Adding
  `imageInvert: false` to six objects would preserve dead scaffolding.

### T2 — Add `noteEn` to the Advanced plan
- [x] `src/data/services.js` add `noteEn` beside `note` at line 53.
- [x] `src/pages/Services.jsx:32` select by language, matching the existing
  `name`/`nameEn` and `features`/`featuresEn` convention in the same file.

### T3 — Per-route document title and meta description
- [x] `src/App.jsx` drive `document.title` and `meta[name=description]` from
  `location.pathname` + `t(...)`, using the `useLocation`/`useTranslation` it already has.
- [x] `src/i18n/en.json` + `src/i18n/es.json` add per-route title/description keys
  for `/`, `/projects`, `/services`, and the 404 catch-all.
- Constraint: no new dependency. No `react-helmet`.

### T4 — Open Graph and Twitter Card metadata
- [x] `index.html` add `og:type`, `og:url`, `og:title`, `og:description`,
  `og:image`, `og:locale`, plus `twitter:card`.
- [x] `index.html` add `hreflang` alternates for `es` and `en`.
- Note: absolute URLs must use the canonical domain `https://maikeldev.site`,
  matching `public/sitemap.xml` and `public/robots.txt`.

### T5 — Wire the dead WhatsApp i18n keys
- [x] `src/components/Footer.jsx:15` stop hardcoding `?text=Hola%20Maikel...`.
- Evidence: `footer.whatsappMsg` and `footer.whatsappMsgEn` already exist and are
  correct in BOTH `en.json` and `es.json`, and are currently referenced by nothing.
  Use them so English visitors stop sending Spanish text.

### T6 — Collapse the split `typewriter` keys
- [x] Both i18n files: make `typewriter.words` hold that file's own language.
- [x] Delete `typewriterEn` from both files.
- [x] `src/pages/Home.jsx:61` drop the `lang === 'en' ? ... : ...` branch and read
  `t('typewriter.words', { returnObjects: true })`.
- Rationale: every other key in this project already works one-key-per-language.
  The split pattern forces a `lang` branch in the component and creates a dead
  duplicate in the other file.
- Correction: the Spanish value at `en.json` `typewriter.words[4]` was NOT a wrong
  translation bug — it held the Spanish list by design of the split pattern. This
  task removes the split, not a translation.

### T7 — Fix Spanish `about.alt`
- [x] `src/i18n/es.json:18` `about.alt` is `"coding illustration"` (English) in the
  Spanish file. It is a user-facing alt attribute. Translate it.
- Leave `stats.performance` (`"Core Web Vitals & Speed"`) alone: it is a Google
  proper noun and reads correctly untranslated in Spanish.

### T8 — Inline styles into CSS classes
- [x] `src/components/Header.jsx:34` move `style={{marginTop: 2, padding: "7px 12px"}}`
  into the existing `.lang-toggle` rule at `src/styles/header.css:93`.
- [x] `src/components/Footer.jsx:20` move `style={{background: "#1fad54"}}` into the
  existing `.btn-whatsapp` rule at `src/styles/footer.css:69`.
- `Projects.jsx:23` is removed by T1.
- Must verify the rendered result is visually unchanged, not merely that CSS parses.

### T9 — Lazy-load images
- [x] Add `loading="lazy"` and `decoding="async"` to all 9 `<img>` tags.
- Evidence: the hero (`Home.jsx:66-83`) is CSS particles plus text and contains no
  `<img>`, so there is no LCP image to protect.

### T10 — Rename the image with spaces
- [x] `git mv "public/img/novelScraper - logo.png" public/img/novelScraper-logo.png`
- [x] `src/data/projects.js:38` update the reference.

## Out of scope (deliberately)
- `gh-pages` orphan in `pnpm-lock.yaml`. Reclassified LOW: `--frozen-lockfile`
  was tested and **passes** (2026-09-29). pnpm does not prune it on its own and
  hand-editing a lockfile is not worth cosmetic gain.
- ESLint + Prettier. Requires a full pnpm install that would rewrite the lockfile,
  and there is **no CI** (no `.github/`), so a linter has no automated gate to run
  in. Flagged to the user as a decision rather than done silently.
- `serve.py`: 2332 bytes of pure NUL, corrupt and untracked. Not deleted — it is not
  in git so it cannot be restored, and deleting an unrecognised file is the user's call.
- TypeScript, tests, code splitting, Font Awesome migration, particles.js replacement.

## Acceptance criteria
- [x] `./node_modules/.bin/vite build` exits 0.
- [x] Output CSS and JS byte-comparable to baseline except for intended changes
      (`index-EtmcVleJ.css` 26.62 kB, `index-psvKyPbD.js` 283.22 kB at baseline).
- [x] `en.json` and `es.json` remain valid JSON and keep identical key shape.
- [x] No `imageInvert` reference remains anywhere.
- [x] No hardcoded Spanish WhatsApp text remains in JSX.
- [x] `gh-pages` state and `serve.py` unchanged.

## Verification
- Baseline (2026-09-29, before changes): `vite build` exits 0 —
  `index.html` 0.78 kB, `index-EtmcVleJ.css` 26.62 kB, `index-psvKyPbD.js` 283.22 kB.
- TDD: not applicable, no runner configured (`strict_tdd: false` in `openspec/config.yaml`).
- Native review: unavailable, the `gentle-ai` binary is not installed in this environment.
  Treated as unassessable-high per the unassessable branch: writer self-verification
  plus an independent verifier.

## Progress

### 2026-09-29 — COMPLETE. 5 commits on `fix/audit-findings-2026-09`, all checks green.

| Commit | Tasks | Scope |
|---|---|---|
| `b935e1a` | T1, T9 (Projects), T10 | `Projects.jsx`, `data/projects.js`, logo rename |
| `493b68a` | T2, T5, T6, T7, T9 (Home) | `Footer.jsx`, `services.js`, `Services.jsx`, both i18n files, `Home.jsx` |
| `11271a6` | T8 | `Header.jsx`, `header.css`, `footer.css` |
| `e177d52` | T3, T4 + `og-image.png` | `App.jsx`, `index.html` |
| `cc8ef02` | — | this document |

All ten task checkboxes above are satisfied. Final state: build exits 0, CSS
26.61 kB (baseline 26.62), JS 285.27 kB (baseline 283.22; the +2.05 kB is the new
`meta.*` i18n strings), 95 keys with identical shape in both files, 12 `og:` tags
parsed inside `<head>`, `xmllint` clean, all 9 `<img>` lazy.

### Defects found during implementation, not present in the original audit

1. **CRITICAL — introduced by the orchestrator, caught by the independent verifier.**
   A follow-up comment edit in `index.html` left a stray closing `-->`, which pops
   `<head>` early per the HTML parsing spec. All 12 `og:`/`twitter:` tags were
   displaced out of `<head>` and the orphaned prose rendered as visible page text
   above the fold. `src/App.jsx` was fine; only the HTML was broken.
   Lesson: acceptance must parse the *built* HTML and count tags while inside
   `<head>`. Grepping the source for `og:` would have passed while shipping zero
   effective tags.
2. **`og:image` was an SVG.** Facebook, X and LinkedIn refuse SVG `og:images`, so
   every social preview would have been imageless. Replaced with
   `public/img/og-image.png`, a real 1200×630 PNG rasterised from `coding.svg`
   onto `--bg-dark`. It carries no text — a functional placeholder, not a designed
   card.
3. **Inert `hreflang` removed.** The writer added three alternates, all resolving
   to the bare root because language is client-side only. Self-referential and
   ignored by Google. Removed; add them when per-language URLs exist.

### Verified, not assumed

The independent verifier confirmed by execution, not reading: `META_ROUTES` covers
every route in `<Routes>` and `/PROJECTS/` correctly yields the Projects title
(10/10 path probes agree with `matchRoutes`); exactly one `meta[name=description]`
tag exists after 20 route/language transitions; `t('typewriter.words',
{returnObjects:true})` returns a real array in both languages; `.btn-whatsapp`
renders `#1fad54` in both states before and after; `noteEn` exists on every plan
that has a `note`; both WhatsApp URLs parse via `new URL()`.

### Known limitations left in place

- `META_ROUTES` must be kept in sync with `<Routes>` by hand. A route added to
  `<Routes>` and forgotten in `META_ROUTES` silently gets 404 metadata. The
  structural fix is `useMatches()` + `handle` on each `Route`, which means
  refactoring `<Routes>`. Out of scope.
- The WhatsApp button still has no hover colour change. Three greens were authored
  intending a hover state and the inline style had killed all of them. The base
  colour was preserved to keep rendering identical, so that intent stays unrealised.
- `serve.py` (2332 NUL bytes, untracked) and the `gh-pages` lockfile orphan were
  left untouched, as recorded under out-of-scope.

Not merged, not pushed. Branch is ready for review.
