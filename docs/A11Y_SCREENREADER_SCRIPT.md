# Screen-reader walkthrough script (a11y round two, spec §98)

The automated half is done (axe, keyboard and print, 2026-10-28; 0 axe violations across 2,196
page/state runs). This script covers the part only a person can do: listen to what the site
actually says. It takes about 45–60 minutes per screen reader.

## Setup

- **NVDA + Chrome or Firefox (Windows).** Use Speech Viewer (NVDA menu, then Tools) so you can
  read back what was spoken. Browse mode is NVDA+Space; next heading is `H`; landmarks are `D`;
  form fields are `F`; the Elements List is NVDA+F7.
- **VoiceOver + Safari (macOS).** Turn it on with Cmd+F5. VO = Ctrl+Option. The Rotor is VO+U
  (headings, landmarks, form controls). Turn on the caption panel so you can see what was spoken.
- Serve locally (`npm run serve`, then open http://localhost:8731/) or use the live site.
- Test in **English** first, then repeat the starred (★) steps in **Español** and **العربية**
  (switch with the Language select in the header).
- Record results in the table at the bottom: Pass, Fail plus what you heard, or Unsure.

## 1. Every page: shell (★)

| Do | Expect to hear |
|---|---|
| Load the page, then press Tab once | "Skip to content, link". Press Enter: focus lands in the main content. |
| Open the landmarks list (NVDA `D` / VO Rotor, Landmarks) | banner, navigation "Primary", main, contentinfo. On activity pages, also region "View and support controls". On printables, region "Print options" and main. |
| Headings list (NVDA `H` / Rotor) | One h1 (the page title), then h2s. No level is skipped. |
| Tab through the header nav | Each link is spoken. On the current section you hear "current page", and only one link says it. |
| Language select | "Language, combo box, English". Change it to Español: the page text switches and the screen reader starts using a Spanish voice (the page's lang changes). |

## 2. Home, Activities, Teacher, Standards, Frameworks, Printables, About, 404

- **Activities page:** Tab into the Activity map. Each cell should say something like
  "Cognate Detective 3 activities, K-2, toggle button, not pressed". Press Space: it becomes
  "pressed", and the polite status "N activities" is announced. The "Show all" button then
  appears in the note below the map.
- **Search** ("Search activities by topic, search edit"): type `cognate`. The result count is
  announced once typing pauses. Filter selects are labeled Module / Grade / Content area / Time.
- **Frameworks / Teacher / Modules:** card titles are now h2, so with the headings list you can
  move straight from card to card.
- **404:** the page has a heading, and its links back to the site are readable.

## 3. Activity pages: teacher mode (★)

Open any `modules/<module>/activity.html?id=…`.

1. In the "View and support controls" region, the buttons are "Teacher, toggle button, pressed"
   and "Student, not pressed". The support buttons More / Some / Independent behave the same way.
2. Press "More support". Nothing should crash, including on a **sort** activity (try
   `cog-sort-3-5-002`).
3. Heading navigation should give: h1 title, then "ELPS" / "TEKS" (h2) inside the open
   "Standards addressed" disclosure.
4. "Standards addressed" and "Answer guidance" should announce as expandable
   ("collapsed"/"expanded"). Enter toggles them.
5. "Copy student link": the button text changes to "✓" for 1.5 s. Listen for whether anything
   is announced. *Expected gap:* probably nothing is (see Owner items).

## 4. Activity pages: student mode, one per interaction type (★)

Use `&mode=student` with:

| Type | Example id |
|---|---|
| multiple-choice | `all-talk-3-5-001` (academic-language-lab) |
| context-choice | `cog-context-3-5-001` (cognate-detective) |
| scenario-choice | `nav-say-3-5-001` (newcomer-navigator) |
| picture-match | `cog-picture-k-2-001` (cognate-detective) |
| sort | `cog-sort-3-5-002` (cognate-detective) |

### Choice types (multiple / context / scenario / picture)

| Step | Expect |
|---|---|
| Read the page in browse mode | Title (h1), directions, "Item 1 of N", the context sentence (spoken in English even when the UI is Spanish or Arabic), then the question. Picture items: the image alt is read, for example "A friendly grey elephant." |
| Tab to the choices | You enter a group named by the question. Each choice is a "toggle button, not pressed". |
| Press Space on a **wrong** choice | It becomes "pressed". |
| Tab to Check, press Enter | A polite announcement: "Look again." plus the reason. Focus stays on the same button, now labeled **"Try again"**. "Show hint" and "Explain" buttons appear after it. They must NOT exist before the first Check. |
| Press "Show hint" | The feedback is announced again with "💡" and the hint. |
| Press "Explain" (optional) | "You've got it." plus the explanation of the correct answer. Focus moves to **Next**. |
| Otherwise pick the right answer and Check | "You've got it." plus the reason. Focus moves to **Next**. |
| Press Next | Focus moves to the new question block. You hear "Item 2 of N" and the new question, not the top of the page. |
| After the last item | Focus moves to the "One more step" heading (the ACE reflection). Each field is announced with its label ("ARTICULATE …", "CONNECT …", "EXTEND …"). Type a word, then press Next. |
| Done screen | Focus moves to the "Nice detective work." heading. Press "Try again": focus returns to "Item 1 of N" and the activity starts fresh. |

### Sort

| Step | Expect |
|---|---|
| Tab through the cards | Each word is a group named by the word ("class"), with three toggle buttons: True cognate / False friend / No look-alike. |
| Place each word with Space | The pressed state is spoken. A polite progress count follows ("3 / 9"). |
| Press Check with a wrong placement | A single announcement: "Look again. 8 / 9 ✓". You should not hear 9 announcements at once. Each card's note ("Look again." plus the hint) can be read by browsing below its buttons. Correct cards become disabled ("unavailable"). |
| Fix the word and press Check | "Nice detective work." Focus moves to Next. Next then goes to the ACE heading (as above). |
| Done screen, then Try again | The sort starts with nothing placed. |

### Arabic (RTL) pass

- The UI chrome reads in Arabic, right to left. Activity content has no Arabic yet, so it falls
  back to English. Those elements carry `lang="en" dir="ltr"`, so you should hear an
  **English voice** for them, and the punctuation should be in the right place (not "?Which word").
- Check that the reading order still matches what you see, and that the Tab order goes
  right to left across the header.

## 5. Printables

Open `modules/<module>/printables.html?id=…`:

- The toolbar region "Print options" has two labeled selects (Language, Sheet) and a Print button.
- Switch Language to Español. The screen reader should switch to a Spanish voice for the sheet.
- On a picture-match activity, each item now has its picture, read with its alt text.

## 6. Zoom, motion, contrast spot checks (spec §98)

- 200% browser zoom on an activity page: nothing is cut off and there is no sideways scroll.
- OS "reduce motion" on: the map's scroll jump is instant.
- Windows High Contrast / forced colors: choice buttons and the pressed state stay
  distinguishable (this is not covered by the automated pass).

## Results

| # | Page / step | NVDA | VoiceOver | Notes |
|---|---|---|---|---|
| 1 | Shell |  |  |  |
| 2 | Activities map + search |  |  |  |
| 3 | Teacher mode |  |  |  |
| 4a | Choice types |  |  |  |
| 4b | Sort |  |  |  |
| 4c | Arabic |  |  |  |
| 5 | Printables |  |  |  |
| 6 | Zoom / motion / forced colors |  |  |  |
