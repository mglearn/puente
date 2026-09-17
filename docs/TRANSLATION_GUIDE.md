# Translation Guide

## Three language settings — never collapse them (spec §7)

- **uiLang** — navigation, buttons, directions, teacher text.
- **supportLang** — home-language translation support, bilingual hints, stems.
- **targetLang** — the language students practice (default English). Do not
  auto-translate target-language practice into the support language.

## Quality control (spec §8)

Every string in `data/locales/<lang>.json` carries a status:

- `draft` → `reviewed` → `published`

Only `published` strings appear in production (`I18n.minStatus`). Anything below
the gate falls back to **English**, which is the source locale and always
published. This is why raw machine translation can never surface as if reviewed.

`validate-locales` enforces: no orphan keys (every non-English key must exist in
`en.json`), valid statuses, and placeholder parity (`{n}` tokens must match
English). It reports published/reviewed/draft counts per language.

## Launch priority

Complete + reviewed English and Spanish first. Vietnamese, Arabic, Simplified
Chinese, Urdu, Hindi enable module-by-module as review completes. Arabic and Urdu
require RTL (`dir="rtl"`, handled by `assets/css/rtl.css`).
