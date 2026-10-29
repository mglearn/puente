# Review notes: MVP content build-out (2026-10-29)

On 2026-10-29, 47 activities were added, bringing Cognate Detective to 24, Academic Language Lab to 32 and Newcomer
Navigator to 30. All of them are `reviewed`, pass `npm run check`, and pass axe and the print checks.
They are AI-drafted. A bilingual educator should check the items below while working through
[`SPANISH_REVIEW.md`](SPANISH_REVIEW.md).

## Spanish word choices (regional register)

The register is Mexican/Texas Spanish throughout. If a more neutral register is wanted, change these:

- **Mexican/Texas words:**
  - resbaladilla (slide)
  - banquetas (sidewalks)
  - jalar (pull)
  - foco (light bulb)
  - plátano (banana)
  - lonchera (lunch box)
  - almuerzo en bolsa (sack lunch)
  - polvoso (dusty), in `cog-academic-9-12-021`
  - bocina portátil (portable speaker), in `cog-roots-6-8-017`
- **Words to check in context:**
  - "Prohibido correr" and "No entre" (`nav-signs-3-5-021`)
  - "preparatoria", "consejero" and "salón"
  - "se alternan: un día sí y otro no" (A/B days)
- **Gendered phrasing:** "¿A la directora o a un amigo?" (`nav-register-k-2-014`)
- **Loose idiom equivalents** in `all-idioms-9-12-029`:
  - quemarse las pestañas (hit the books)
  - volver a empezar desde cero (back to square one)
  - estar indeciso (on the fence)
  - abarcar más de lo que se puede (bite off more than you can chew)
- **Terms to check** in `all-clues-6-8-025`:
  - "afluente / río tributario" for tributary
  - the high-support text says every word has a cognate, which is weak for tributary, since "afluente" is the more common Spanish word
- **Pronunciation respellings** in `cog-stress-3-5-016`:
  - KUH-ler / KA-ler (color)
  - eye-DEE-uh / ai-DI-a (idea)
  - CHOK-lit (chocolate)
  - jo-TEL (hotel)

## Standards calls

- **`cog-context-6-8-019` (Spanish context-clue detective):**
  - It is SLAR-only: §128.21(b)(3)(B), with no ELPS and no ELAR TEKS.
  - It is the first record with `targetLanguage: "es"`.
- **`cog-roots-6-8-017`:** the §128.21(b)(3)(C) link (supporting) rests on the Spanish root families.
- **ELDA code:** `nav-aboutme-9-12-029` and `nav-campus-9-12-030` use §128.36(c)(3)(C). The teacher drawer now shows it under its own "English as a Second Language (Ch. 128)" heading.
- **Speaking codes on receptive tasks:** these speaking codes are attached to sorts or choice tasks, and depend on the teacher directions having students say the answers aloud:
  - `nav-register-k-2-014`: §120.20(d)(2)(D)
  - `all-content-6-8-026`: §120.21(d)(2)(B) direct
  - `all-email-6-8-023`: §120.21(d)(2)(D) supporting. This is a speaking-register code on a writing task.
- **Weaker fit:** `nav-signs-3-5-021` uses (d)(3)(F) "content-area texts" for school signs.
- **No grade 3–4 ELAR TEKS** are in the store, so 3–5 activities link TEKS for grade 5 only.

## Content to look at

- **`nav-drills-6-8-025`** (fire, lockdown and shelter-in-place drills): check the lockdown item (dr3) and adapt it to the district's protocol.
- **`nav-aboutme-9-12-029`:**
  - It includes privacy guidance: no immigration status, and addresses go only to staff.
  - The double-surname advice in ab2 is opinionated.
- **`nav-portal-9-12-028`:** it says "70 is passing in most Texas districts" and uses the codes M = Missing and EX = Exempt.
- **Facts:**
  - `all-justify-6-8-024`: the Apollo 15 hammer-and-feather drop, and Texas towns along rivers
  - `all-cer-9-12-030`: invented class data, flagged in its teacher directions
  - `all-summary-3-5-019` r5: uses a stick insect, avoiding the chameleon myth
- **Etymology simplifications:**
  - educate = "lead out"
  - asterisk = "little star"
  - Spanish *argumento* "usually" means plot

## Answer-length rebalance (done)

The correct choice used to be the longest one about 70% of the time. Distractors in 257 items were rewritten to fix that;
now the correct choice is the longest in 26% of items and the shortest in 13%. Changed labels and their feedback (en + es) are part of
the Spanish review. Two things to look at:
- K–2 picture-match distractors were swapped for short, concrete, non-cognate words (umbrella, rainbow, spoon…).
- `cog-context-3-5-001` labels now read "True cognate — meaning matches" / "False friend — meaning differs" (equal length).
