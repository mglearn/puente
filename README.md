# Language Bridge

**Bilingual and ESL activities, printables, and language supports for real classrooms.**

A free, privacy-first, static activity center for Texas K–12 bilingual/ESL educators
and emergent bilingual students — usable by any multilingual classroom.

Planned home: `mglearn.github.io/puente/`

> **Status: proof-of-concept built.** The §118 vertical slice is working end to end —
> one content record drives the student interactive, the teacher view, the ELPS/TEKS
> drawer, the ACE/CLEAR metadata, and the printable. The full blueprint lives in
> [`docs/BUILD_SPEC.md`](docs/BUILD_SPEC.md); read it before adding modules or activities.

## Run it

```bash
npm run serve      # static server on http://localhost:8731
npm run check      # validators + smoke tests (zero dependencies, just Node)
```

Then open:

- `/` — homepage + Quick Activity Finder (Grade 5 · Vocabulary · Spanish · 5–10 min → the sample activity)
- `/modules/cognate-detective/activity.html` — Teacher view ⇄ Student mode, support-level toggle, language switcher
- `/modules/cognate-detective/printables.html` — the same record as a student pack + answer key

The whole pipeline reads **one** file: [`modules/cognate-detective/data.json`](modules/cognate-detective/data.json).
Nothing about the activity is hard-coded in a page — that is the architecture the POC proves.

### What's wired

| Piece | Where |
|---|---|
| Design tokens + shell CSS | `assets/css/*` |
| i18n (uiLang / supportLang / targetLang, QC gate) | `assets/js/i18n.js`, `data/locales/*` |
| Reusable multiple-choice engine | `assets/js/activity-engine.js` |
| Explanatory feedback | `assets/js/feedback.js` |
| Standards resolver + teacher drawer | `assets/js/standards.js`, `data/standards/*` |
| Activity + standards contracts | `data/schema/*.schema.json` |
| Validators (data / standards / locales) | `scripts/validate-*.js` |
| Smoke tests | `tests/smoke.test.js` |

> **Standards note:** ELPS/TEKS summaries are plain-language paraphrases for teacher
> display. Any correlation with `verified: null` shows a **“source check pending”** badge
> and must be confirmed against 19 TAC Ch. 120 / Ch. 110 before public launch. Spanish
> Chapter 128 (SLAR) codes are intentionally left empty — not guessed.

## Purpose

Language Bridge is an **activity center**, not an online textbook and not a standards
database with a few activities attached. Standards, instructional frameworks, and
teacher support wrap around useful student experiences.

The design question every page must answer:

> What can a teacher use with students in the next 10 minutes?

## Non-negotiables

- No server
- No student accounts
- No unnecessary data collection
- No invented standards
- No module-specific duplicate engines
- Language switcher from first release
- RTL support (Arabic, Urdu)
- English/Spanish reviewed before launch
- Activities first
- Color printables
- Mobile
- Keyboard accessible
- Official standards (ELPS/TEKS) separated from local frameworks (ACE, CLEAR, UDL)

## Development principle

Build one reusable engine. Feed it validated content. Do not copy/paste similar
logic between modules.

## Launch modules

| Module | Implementation order | MVP activities |
|---|---|---|
| Cognate Detective | 1st — proves the architecture | 24 |
| Academic Language Lab | 2nd — the flagship | 32 |
| Newcomer Navigator | 3rd | 30 |

## First development task

Build only the proof-of-concept pipeline described in §118 of the spec:

```
One content record → Student interactive → Teacher view
  → ELPS/TEKS correlations → ACE/CLEAR metadata → Printable
```

Do not build the other 85 activities until that pipeline works cleanly.

## Frameworks: what is official and what is ours

**Official Texas standards** — English Language Proficiency Standards
(19 TAC §120.20 for K–3, §120.21 for grades 4–12, implementation beginning 2026–2027)
and the Texas Essential Knowledge and Skills.

**Local instructional frameworks** — ACE (Articulate, Connect, Extend) and
CLEAR (Claim, Lens, Evidence, Alternatives, Response) are instructional overlays
authored for this project. They are **not** Texas Education Agency requirements and
must always be labeled as such. UDL 3.0 is CAST's framework, applied here as a
design requirement rather than a badge.

Never attach a standard you cannot justify in one sentence.

## Licensing

© 2026 TCEA (Texas Computer Education Association), created by Miguel Guhlin in the
course of his work at TCEA. Two licenses apply (matching the rest of mglearn):

- **Content** — activity text, questions, scenarios, instructional design, **artwork,
  and translations** — is **CC BY-NC 4.0**
  (<https://creativecommons.org/licenses/by-nc/4.0/>).
- **Code** — HTML, CSS, JavaScript — is **MIT** (see [`LICENSE`](LICENSE)).

Commercial use of the content needs separate written permission from TCEA.
**Credit:** _Language Bridge © 2026 TCEA, created by Miguel Guhlin. Licensed CC BY-NC 4.0._

**Provenance:** content, code, artwork, and the multilingual translations are produced
with generative-AI tools and refined under human editorial review. Translations are
machine-assisted and flagged for local educator review before classroom use. The
illustrations were generated with OpenAI (per embedded C2PA) and refined for this
project; see [`data/image-manifest.json`](data/image-manifest.json). No copyrighted
textbook passages are used as activity content. Full details:
[`/about/licensing.html`](about/licensing.html).
