# Roadmap

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

## Next — before adding the other 85 activities

1. **SLAR codes.** Import + verify Chapter 128 (Spanish LA) codes — do not guess them.
2. **Es review pass.** Move remaining `reviewed` Spanish keys to `published` after
   a human check; keep the QC gate honest.
3. **Accessibility audit.** Keyboard-only pass, screen-reader labels on the engines,
   contrast check (spec §29, §98).
4. **Content pipeline.** Author remaining Cognate Detective MVP activities (24 total)
   feeding the shared engines (spec §40).

## Later modules

- Academic Language Lab (flagship, 32 activities — spec §46–§59)
- Newcomer Navigator (30 activities — spec §60–§79)
- Future priorities 4–16 (spec §89)

## Deployment

Source lives in `mglearn/puente/`. Planned public home: `mglearn.github.io/puente/`
(copy build into the `mglearn.github.io` repo under `/puente/`). Not yet deployed.
