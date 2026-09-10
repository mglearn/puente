# Language Bridge

**Bilingual and ESL activities, printables, and language supports for real classrooms.**

A free, privacy-first, static activity center for Texas K–12 bilingual/ESL educators
and emergent bilingual students — usable by any multilingual classroom.

Planned home: `mglearn.github.io/puente/`

> **Status: specification only.** Nothing is built yet. The full blueprint lives in
> [`docs/BUILD_SPEC.md`](docs/BUILD_SPEC.md) — read it before writing any code.

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

- Code: MIT (see [`LICENSE`](LICENSE))
- Original educational content: CC BY 4.0
- Artwork: project-created assets only, with clear redistribution rights

No copyrighted textbook passages are used as activity content.
