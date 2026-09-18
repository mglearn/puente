# Roadmap

## Current state (2026-09-17)

**Live at https://mglearn.github.io/puente/** — 3 launch modules, **22 activities**
across **all four grade bands K–2, 3–5, 6–8, 9–12**, **25 verified standards** (0 pending),
full site navigation, 18 smoke tests + 5 validators (data / standards / locales / links /
contrast) all green.

- **Cognate Detective (10):** Cognate Picture Match ×2 (K–2) · Cognate or False Friend? ·
  Cognate or Not? (sort) · Science / Math / Social Studies Cognate Hunts (sort) · False
  Friend Detective (CLEAR) · Academic False Friends (6–8) · Academic Cognate Sort (6–8)
- **Academic Language Lab (7):** Academic Talk Moves · Say It Three Ways · Evidence Match ·
  Build the Explanation · Shades of Meaning (9–10) · Sentence Expansion · Compare It
- **Newcomer Navigator (5):** What Do You Say? · Build the Question · What Does That Mean? ·
  Conversation Repair · Getting Help at School

**Launch readiness (2026-09-18):** linked from the mglearn hub (`mglearn.github.io`
Language Bridge card → `/puente/`). All ELPS codes now **two-source confirmed**
(Cornell LII + TEA `ch120b.pdf`) — that caveat is cleared. **Spanish reviewed 2026-09-18** — a three-reviewer AI pass over all 1,123 EN/ES
strings (one per module) found the Spanish solid; 3 genuine correctness fixes
applied (tautology, gender agreement, `adónde`). Worklist at `docs/SPANISH_REVIEW.md`
(regenerate with `npm run review:es`); a final human bilingual sign-off is still
the gold standard but the content is in good shape. **Licensing aligned to the
mglearn site (2026-09-18):** © 2026 TCEA · Content (incl. artwork + translations)
CC BY-NC 4.0 · Code MIT · commercial use needs TCEA permission — this resolves the
old "CC0 artwork" question (artwork is now content under CC BY-NC 4.0, AI-assisted +
human-reviewed). Grade-5 SLAR (§128.7) remains single-source (Cornell LII) — lower
stakes, optional cross-check.

Art note: 10 K–2 cards delivered; `cognate-card-animal` renders as a specific dog
(reads as "dog/perro"), so it's **not** used in the cognate activities — regenerate as a
generic/abstract "animal" grouping if that cognate card is wanted.
- Interaction types proven: context-choice, sort, scenario-choice (with images), multiple-choice.
- Content areas: ELAR, science, math, social studies. Grade bands 3–5, 6–8, 9–12.
- Every top-nav link resolves (activities / printables / teacher / standards / frameworks / about
  + sub-pages); homepage has a "Recently added" strip; custom 404 page.

## Next

1. **Depth toward MVP.** Cognate Detective 8/24, Academic Language Lab 5/32, Newcomer 4/30 —
   all feed the shared engines. 4 optional K–2 cards (animal, chocolate, doctor, telephone)
   are already delivered + `available` in the manifest, ready for more K–2 picture items.
3. **A11y round two** (real AT walkthrough, print QA, axe) and **Spanish review** (the 2 `reviewed`
   locale keys are an intentional QC-gate fixture — see es.json `_meta`).

## Done — §118 proof-of-concept (the architecture test)

The vertical slice is complete and passes `npm run check`:

- Repo structure + design-token system + responsive shell
- Navigation + English/Spanish language switcher + Arabic RTL proof
- Teacher / student mode toggle
- Shared activity JSON schema + standards JSON schema
- One reusable multiple-choice / context-choice engine
- One Cognate Detective activity (`cog-context-3-5-001`, 6 items) driving everything
- Teacher standards drawer (ELPS + TEKS, with "source check pending" badges)
- Printable (student pack + answer key) generated from the same record
- Validators (data / standards / locales) + smoke tests

## Done since the POC

- **Sort engine (spec §18 Engine 2).** Added a data-driven, keyboard/touch sort
  interaction and the "Cognate or Not?" activity (`cog-sort-3-5-002`, 3 bins,
  9 words) — proves the shared architecture across a second interaction type.
- **Standards verified.** All 8 ELPS/TEKS paraphrases checked 2026-09-17 against
  the codified 19 TAC text (Cornell LII); `verified` dates set, "source check
  pending" badges cleared. **Caveat:** the revised Ch. 120 ELPS rest on a single
  authoritative reproduction — cross-check against TEA's `ch120b.pdf` before launch.
- **Accessibility hardening.** Engines use a correct group + `aria-pressed`
  toggle-button pattern (was mismatched `role=radio`), `aria-live` regions, and
  `lang` on target-language spans. WCAG AA contrast enforced via
  `scripts/check-contrast.js` (in the `npm run check` gate); `--blue`/`--teal`
  darkened to pass.
- **Artwork wiring.** `data/image-manifest.json` gates optional item images and
  module heroes — dormant until an asset's `status` flips to `available`, so no
  broken images. Filenames match `~/projects/puente-image-prompts.md`.
- **Artwork delivered (12 illustrations).** Reviewed for brief/palette/no-text;
  PNG originals in `~/projects/assets/img/` converted to right-sized WebP
  (19–94 KB) into `assets/img/`. Cognate Detective hero + high-support item
  images are live; future-module heroes and 4 newcomer scenarios are staged.
  Provenance recorded from the PNGs' C2PA Content Credentials: generated with
  **OpenAI** ("OpenAI Media Service API"). `tool`/`source`/`created` filled for
  all 12 in the manifest.

- **Chapter 128 (SLAR) verified + wired.** Added `data/standards/teks-slar.json`
  (§128.7 grade 5, verified against TEA ch128a.pdf + Cornell LII). Key finding:
  §128.7 has **no "cognados" student expectation** — so the Cognate Detective
  activities correlate honestly to `(b)(3)(B)` (context) and `(b)(3)(E)` (commonly
  confused terms = false friends), not an invented cognate code.
- **Second module live: Academic Language Lab.** `all-talk-3-5-001` "Academic Talk
  Moves" (science discussion, 5 items) reuses the multiple-choice engine, wired to
  its delivered hero, ACE/CLEAR, bilingual sentence frames, and verified ELPS/ELAR
  standards (§120.21(d)(2)(B), §110.7(b)(1)(A)/(b)(7)(C)/(b)(1)(C)). Activity pages
  are now module-generic (module derived from path). 15 smoke tests pass.

- **Third module live: Newcomer Navigator.** `nav-say-3-5-001` "What Do You Say?"
  (4 school scenarios: cafeteria, nurse, restroom, joining a group) uses the new
  **scenario-choice** path — item-level images shown at every support level, driven
  by the 4 delivered scenario illustrations. Verified ELPS (§120.21(d)(2)(F)/(2)(D)
  direct, (d)(1)(C) supporting — two-source corroborated) + §110.7(b)(1)(A). All
  three launch modules are now live; the top-nav "Newcomer" link resolves.

## Next

1. **Fill out each module's activity set** toward the MVP targets (Cognate Detective
   24, Academic Language Lab 32, Newcomer Navigator 30) — all feed the shared engines.
2. **Es review pass** (2 `reviewed` keys → `published`); **a11y round two** (real AT,
   print QA, axe).

## Deferred / owner decisions

1. **Artwork license — RESOLVED (2026-09-18):** aligned to the mglearn site.
   Artwork is content: © 2026 TCEA, **CC BY-NC 4.0**, AI-assisted (OpenAI per C2PA)
   + human-reviewed. Applied across LICENSE, README, `about/licensing.html`, the
   footer, printables, and every `image-manifest.json` `rights` field. (The WebP
   conversion still drops the C2PA manifest — preserving it on published files
   remains optional.)
2. **SLAR codes.** Import + verify Chapter 128 (Spanish LA) codes — do not guess them.
3. **Es review pass.** Move remaining `reviewed` Spanish keys to `published` after
   a human check; keep the QC gate honest.
4. **A11y round two.** Screen-reader walkthrough on real AT; verify print output;
   run an automated axe pass (spec §98).
5. **Content pipeline.** Author remaining Cognate Detective MVP activities (24 total)
   across grade bands and content areas, feeding the shared engines (spec §40).

## Later modules

- Academic Language Lab (flagship, 32 activities — spec §46–§59)
- Newcomer Navigator (30 activities — spec §60–§79)
- Future priorities 4–16 (spec §89)

## Deployment

Source lives in `mglearn/puente/`. Planned public home: `mglearn.github.io/puente/`
(copy build into the `mglearn.github.io` repo under `/puente/`). Not yet deployed.
