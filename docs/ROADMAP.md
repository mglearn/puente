# Roadmap

## Current state (2026-10-11)

**Live at https://mglearn.github.io/puente/** — 3 launch modules, **39 activities**,
**25 verified standards** (0 pending), full site navigation, 18 smoke tests + 5 validators
(data / standards / locales / links / contrast) all green.
**All three modules now cover every grade band K–2 · 3–5 · 6–8 · 9–12.**

**Artwork complete (2026-10-11).** The full artwork batch (47 new images, generated from
`~/projects/archive/puente-artwork-prompts.md`, converted to WebP, registered in the manifest) is
in and the PNG masters cleaned up. This closed the last two K–2 gaps with two new
picture-match activities — **Classroom Action Words** (`all-actions-k-2-012`, 10 action
cards) for Academic Language Lab and **Cognate Picture Match: Everyday Words**
(`cog-picture-k-2-014`, 9 everyday-cognate cards; the `animal` card was regenerated as a
generic animal) for Cognate Detective — plus a 2nd Newcomer K–2 **Around My School**
(`nav-school-k-2-011`, 10 school-place cards). Enrichment: 9 newcomer scenario images wired
as per-item images on *Following Classroom Directions* & *Telling How You Feel*, and 9
concept scaffolds as high-support images on *Root Detective* & *Cognates You Hear in
Science*.

**Activity map + topic search (2026-10-11).** `activities/` now opens with an ELE-Activity-
Bank-style **Activity map**: a module × grade-band grid (3×4) where each cell shows its
activity count with gold intensity (dashed = none yet, so the K–2 gaps show honestly).
Click a cell to filter; a topic **search box + Try chips** search inside every activity
string (titles, goals, directions, item prompts, choices, target words), accent-insensitive
and language-aware. Composes with the existing dropdowns; `?q=` is shareable. Navy/gold,
styled to Puente tokens.

**Content build-out to 36 (2026-10-11).** +10 text-only activities (no new art) saturating
the 25 verified codes — including the two previously-unused codes (ELPS §120.21(d)(1)(B)
listening via a 6–8 science-listening activity; TEKS §110.7(b)(3)(A) via a 3–5 glossary
activity). Cognate Detective 15 · Academic Language Lab 11 · Newcomer Navigator 10. New:
Root Detective (3–5), Cognates You Hear in Science (6–8), Cognate/False Friend/Neither
(9–12 sort), Using a Glossary (3–5); Academic Talk Moves MS (6–8), Formal or Informal?
(9–12), Plan Your Presentation (3–5); Following Classroom Directions (3–5), Telling How You
Feel (3–5), School Offices and Forms (9–12). Speaking/register activities honestly carry
`teks: []` (ELPS is the on-target ELL standard) rather than a forced TEKS correlation.

- **Cognate Detective (11):** Cognate Picture Match ×2 (K–2) · Cognate or False Friend? ·
  Cognate or Not? (sort) · Science / Math / Social Studies Cognate Hunts (sort) · False
  Friend Detective (CLEAR) · Academic False Friends (6–8) · Academic Cognate Sort (6–8) ·
  **Academic False Friends II (9–12)**
- **Academic Language Lab (8):** Academic Talk Moves · Say It Three Ways · Evidence Match ·
  Build the Explanation · Shades of Meaning (9–10) · Sentence Expansion · Compare It ·
  **Say It the Academic Way (6–8)**
- **Newcomer Navigator (7):** What Do You Say? · Build the Question · What Does That Mean? ·
  Conversation Repair · Getting Help at School · **Navigating Middle School (6–8)** ·
  **Navigating High School (9–12)**

### Grade-band coverage

| Module | K–2 | 3–5 | 6–8 | 9–12 |
|---|---|---|---|---|
| Cognate Detective | ✅ | ✅ | ✅ | ✅ |
| Academic Language Lab | ✅ | ✅ | ✅ | ✅ |
| Newcomer Navigator | ✅ | ✅ | ✅ | ✅ |

**Full 4×3 grade-band matrix complete (2026-10-11)** — every module reaches every band,
via vocabulary/picture-match at K–2 (honest K–3 reading ELPS §120.20(d)(3)(C) + K–2
illustration TEKS §110.2/3/4(b)(3)(B)).

**2026-10-11 — secondary-band build-out (4 activities, every module now reaches 9–12):**

- **Navigating Middle School** (`nav-navigate-6-8-006`, context-choice, 6 items) — first
  6–8 Newcomer activity: changing classes, make-up work, advisory, group projects,
  permission slips. Meaning-from-context on *tardy*/*advisory*.
- **Academic False Friends II** (`cog-falsefriend-9-12-009`, context-choice, 6 items) — the
  9–12 Cognate Detective cap: high-frequency academic false friends (actually, assist,
  lecture, career, realize, sensible) resolved from sentence evidence; CLEAR routine on.
- **Say It the Academic Way** (`all-academic-6-8-008`, multiple-choice, 5 items) — the 6–8
  Academic Language Lab entry: restate a casual sentence in precise content-area language
  across science, math, social studies, ELAR, and data.
- **Navigating High School** (`nav-highschool-9-12-007`, context-choice, 6 items) — the 9–12
  Newcomer activity: credits/transcripts/syllabus from context + formal register with a
  counselor, teacher, and principal.

All correlate **only to the 25 already-verified standard codes** (no new/invented codes):
ELPS §120.21 speaking/listening/reading (4–12 range) and TEKS vocabulary-in-context
(§110.22/23/24(b)(2)(B) for 6–8, §110.36/37(c)(2)(B) for 9–10). EN + ES throughout; every
choice teaches *why*. `npm run check` green (26 activities, 18 smoke tests, 5 validators).

### K–2 gap — RESOLVED (2026-10-11)

Previously open because both modules are speaking/listening-centered while the only verified
K–3 ELPS code is reading (§120.20(d)(3)(C)). Resolved **honestly, not by stretching
standards**: each new K–2 entry is a **vocabulary picture-match** (name the pictured
word), which maps correctly to the K–3 reading ELPS + the K–2 illustration TEKS
(§110.2/3/4(b)(3)(B)) — the same honest basis as the original cognate K–2 cards. The
artwork that unblocked it is now in. (A still-open, lower-priority item: a verified K–3
*speaking/listening* ELPS code would allow a talk/navigation-style K–2 activity, not just
vocabulary — that remains a future standards-verification task.)

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

1. **Depth toward MVP.** Cognate Detective 16/24, Academic Language Lab 12/32, Newcomer 11/30 —
   all feed the shared engines. Full 4×3 grade-band matrix is complete; the current 25
   verified codes are now well-saturated (both previously-unused codes are covered). Going
   further toward the MVP targets will need **new verified standards** (more 6–8/9–12
   listening/speaking/writing TEKS, SLAR beyond grade 5, and K–3 speaking/listening ELPS) —
   a standards-verification research pass against TEA Ch. 110/120/128, flagged for human
   sign-off.
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
  broken images. Filenames matched `~/projects/puente-image-prompts.md` (that prompt file is no longer retained).
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
