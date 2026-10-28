# Roadmap

## Current state (2026-10-28)

**Live at https://mglearn.github.io/puente/** (deployed from this repo via GitHub Pages) —
3 launch modules, **39 activities** (Cognate Detective 16 · Academic Language Lab 12 ·
Newcomer Navigator 11), every module in every grade band K–2 · 3–5 · 6–8 · 9–12,
**63 verified standards** (all two-source, 0 pending). `npm run check` green: 5 validators
(data / standards / locales / links / contrast) + 18 smoke tests.

**2026-10-28 — standards research pass.** +38 codes, each checked word for word against
TEA's chapter PDFs and Cornell LII: ELPS §120.20 K–3 listening/speaking (9), more ELPS
§120.21 4–12 (9), ELAR K–2 oral language, 6–8 roots/register, English I–II Latin phrases
and register (15), SLAR grade 6 §128.21 (4), and ELDA §128.36(c)(3)(C) for newcomer high
schoolers (course standard — only for students enrolled in ELDA; shown under its own
"English as a Second Language (Ch. 128)" heading). Grade-5 SLAR §128.7 is now two-source
(one summary corrected). **Finding:** Ch. 128 has no Spanish Language Arts beyond grade 6 —
§128.22–23 are ELLA and §128.34–36 are ESOL/ELDA (English courses). Usage notes in the
store: §110.36/.37(c)(2)(C) only for Latin-origin phrases; false friends map to "commonly
confused terms" (§128.7(b)(3)(E), §128.21(b)(3)(D)).

**2026-10-28 — accessibility round two (automated).** axe (WCAG 2.1 A/AA + best practice)
over every page and all 39 activities in EN/ES/AR, teacher/student, 390/1280px: 6 rules →
**0 violations**. Keyboard: fixed buttons visible before Check, focus lost after
Next/Try again/Explain, noisy sort announcements, faint focus rings, a crash on sort "More
support". Print (390 PDFs): picture/scenario packs now include images, correct module
names, Spanish packs fully Spanish, no blank pages. Human screen-reader walkthrough
script: `docs/A11Y_SCREENREADER_SCRIPT.md`.

## Next

1. **Content build-out toward the MVP** (Cognate Detective 16/24 · Academic Language Lab
   12/32 · Newcomer Navigator 11/30) using the new codes. Activity ideas they unlock:
   - **Newcomer Navigator** — K–2: follow-the-directions school map (§120.20(d)(1)(C);
     §110.2/3/4(b)(1)(B)); say hello / introduce yourself / ask for what you need
     (§110.2/3(b)(1)(E), §120.20(d)(2)(F)); principal or friend? register
     (§120.20(d)(2)(D)); retell what the nurse said (§120.20(d)(1)(E)). 3–5:
     picture-supported notices — menu, bus schedule (§120.21(d)(3)(F)). 6–12: ask the
     office for clarification / paraphrase the announcement (§120.21(d)(1)(E), (2)(F));
     9–12 ELDA: give name, address, age, directions (§128.36(c)(3)(C)).
   - **Academic Language Lab** — K–2: best sentence to describe/explain
     (§120.20(d)(2)(E)); multiple-meaning words heard in context (§120.20(d)(1)(D)). 3–5+:
     sentence-frame and transition-word builders (§120.21(d)(2)(C), (4)(D)). 6–8: text
     message → email to a teacher (§110.22–24(b)(6)(H), §120.21(d)(2)(D)); justify or
     evaluate with frames (§120.21(d)(2)(E), (4)(F)). 9–12: register in academic responses
     (§110.36/37(c)(5)(H)); idioms and figurative language (§120.21(d)(3)(D), (1)(D)).
   - **Cognate Detective** — 6–8: Greek/Latin root families with Spanish bridges
     (§110.22–24(b)(2)(C), §128.21(b)(3)(C)); 6: Spanish context-clue detective
     (§128.21(b)(3)(B)); 4–12: say-the-cognate pronunciation contrasts (§120.21(d)(2)(A));
     9–10: Latin phrases in English (§110.36/37(c)(2)(C)).
2. **Screen-reader walkthrough** on real AT (NVDA + VoiceOver) — owner, following
   `docs/A11Y_SCREENREADER_SCRIPT.md`.
3. **A11y/i18n follow-ups found in round two** (not yet done):
   hard-coded English in the activities index, printables and some `aria-label`s (needs
   locale keys); printables have no Arabic option and always start in English; the
   "Use the English word in a new sentence" line prints on every non-sort sheet;
   picture-match image alt text names the answer; `es` picture-match labels are English
   words without an English `lang` tag; teacher-page print shows "Answer guidance"
   collapsed and student-mode print shows only the current item; "Copy student link" has
   no screen-reader announcement or clipboard fallback; activity-map cells use an invalid
   `font:` shorthand. Teal was darkened (#147F84 → #12777C) for contrast — worth a look.

## History — state on 2026-10-11

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

## Deferred / owner decisions

1. **Artwork license — RESOLVED (2026-09-18):** aligned to the mglearn site.
   Artwork is content: © 2026 TCEA, **CC BY-NC 4.0**, AI-assisted (OpenAI per C2PA)
   + human-reviewed. Applied across LICENSE, README, `about/licensing.html`, the
   footer, printables, and every `image-manifest.json` `rights` field. (The WebP
   conversion still drops the C2PA manifest — preserving it on published files
   remains optional.)
2. **SLAR codes — RESOLVED (2026-10-28):** grades 5 and 6 verified (two-source); Ch. 128 has
   no SLAR beyond grade 6. ELDA §128.36(c)(3)(C) added for newcomer high schoolers.
3. **Es review pass.** Move remaining `reviewed` Spanish keys to `published` after
   a human check; keep the QC gate honest.
4. **A11y round two — automated part DONE (2026-10-28):** axe 0 violations, print verified.
   Real-AT walkthrough remains (see Next #2).
5. **Content pipeline.** See Next #1.

## Later modules

- Future priorities 4–16 (spec §89) — none started. (Academic Language Lab and Newcomer
  Navigator are live; see Next #1 for their MVP targets.)

## Deployment

Source and site are this repo (`mglearn/puente`), published by GitHub Pages at
https://mglearn.github.io/puente/ and linked from the mglearn hub (Language Bridge card).
Push to `main` deploys.
