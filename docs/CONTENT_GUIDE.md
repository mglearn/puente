# Content Guide

Every activity is **one JSON record** validated against
[`data/schema/activity.schema.json`](../data/schema/activity.schema.json). The
engine renders it — you never write per-activity JavaScript.

## Authoring checklist

1. **id** — kebab-case, e.g. `cog-context-3-5-001` (`<module-abbr>-<type>-<band>-<seq>`).
2. **title / studentGoal / directions** — always include `en`; add `es` (and more)
   as reviewed. `en` is the required fallback.
3. **items** — each needs `prompt`, ≥2 `choices`, a valid `answer`, and **feedback
   for every choice** (correct and every distractor). Feedback explains *why*
   (spec §19) — never just "Incorrect."
4. **support** — optional `high` / `medium` home-language scaffolds per item (§20).
5. **ace / clear / udl / strategies** — instructional metadata; ACE/CLEAR are local
   frameworks and are labeled as such in the UI.
6. **standards** — only correlations you can justify in one sentence (`rationale`).
   Each `code` must exist in a `data/standards/*.json` store, or `validate-data`
   fails. Leave SLAR empty until Chapter 128 codes are verified.
7. **status** — `draft` → `reviewed` → `published`.

Run `npm run check` before committing. The gate blocks unanswerable items,
choices without feedback, and dangling standard codes.

## Content quality (spec §92)

Accurate, context-rich, clear, culturally respectful. Verify every cognate pair
linguistically before publishing. No copyrighted textbook passages as content.
