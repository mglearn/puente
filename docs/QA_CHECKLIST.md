# QA Checklist

Run `npm run check` first — it must pass (validators + smoke tests).

## Per activity (spec §103)

- [ ] `npm run check` green
- [ ] Every item answerable; every choice (correct + distractors) has *why* feedback
- [ ] Support levels behave: High shows home-language clue, Light shows prompt only
- [ ] Teacher view shows objective, directions, supports, standards, ACE/CLEAR, answers
- [ ] Standards drawer: codes resolve, alignment shown, unverified codes badged
- [ ] Student mode URL is shareable and contains **no** student identifier
- [ ] Printable renders student pack + answer key from the same record
- [ ] English + Spanish read correctly; switching UI language re-renders live
- [ ] Keyboard-only: choices, controls, drawers all reachable; visible focus
- [ ] Works on a narrow (Chromebook) viewport
- [ ] Works on paper (print preview)

## Privacy (spec §30)

- [ ] No accounts, no student data collected, no third-party trackers
- [ ] Nothing student-entered (ACE reflections) is stored or transmitted

## Standards integrity

- [ ] No invented standards; every correlation justified in one sentence
- [ ] SLAR (Chapter 128) codes verified before attaching — never guessed
