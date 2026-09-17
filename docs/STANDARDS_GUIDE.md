# Standards Guide

Official standards and local frameworks are kept strictly separate (spec §4).

## Official — ELPS & TEKS

- Stored in `data/standards/*.json`, one record per code
  ([schema](../data/schema/standards.schema.json)).
- ELPS: 19 TAC §120.20 (K–3) and §120.21 (grades 4–12), effective 2026–2027.
- TEKS: 19 TAC Chapter 110 (ELAR), Chapter 128 (SLAR — **import + verify, never guess**).
- `summary` is a plain-language paraphrase for teacher display. `verified` is the
  date a human confirmed it against the source text; `null` renders a
  **"source check pending"** badge in the teacher drawer.

## Correlations

An activity links to a standard via a correlation object (spec §22):
`{ code, alignment: direct|supporting, grades, rationale }`. The **rationale must
justify the link in one sentence** — if it can't, don't attach the standard.
`validate-data` enforces that every `code` resolves and every correlation has a
rationale.

## Local frameworks

ACE and CLEAR live in `data/frameworks/*.json` with `type: "local"` and an
`officialDisclaimer`. UDL 3.0 is `type: "external"` (CAST). None may be presented
as a TEA requirement.
