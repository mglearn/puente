# LANGUAGE BRIDGE
## Bilingual / ESL Resource Center
### Detailed Build Specification for Codex / Claude Code

Version: 0.1
Status: Development blueprint
Primary audience: Texas K–12 bilingual/ESL educators and emergent bilingual students
Secondary audience: Content-area teachers, instructional coaches, families, U.S. multilingual programs, and international English-language educators
Delivery: Static, privacy-first website suitable for GitHub Pages or Cloudflare Pages
Runtime: Browser only
Accounts: None
Student data collection: None

---

# 1. PROJECT NORTH STAR

Build a free, modular Bilingual/ESL Resource Center that teachers and students return to because it consistently gives them something useful to DO.

The site should combine:

- Interactive student activities
- Classroom-ready color printables
- Language supports
- Home-language connections
- Texas ELPS correlations
- Texas Essential Knowledge and Skills correlations
- Spanish Language Arts and Reading TEKS correlations where appropriate
- UDL 3.0 design principles
- ACE: Articulate, Connect, Extend
- CLEAR: Claim, Lens, Evidence, Alternatives, Response
- Research-informed instructional strategies
- Content-area connections
- Teacher guidance
- Student-facing practice
- No-login privacy
- Mobile access
- Printable/offline access
- International adaptability

The site's main design question is:

> What can a teacher use with students in the next 10 minutes?

Do not build an online textbook.

Do not build a standards database with a few activities attached.

Build an ACTIVITY CENTER with standards, instructional frameworks, and teacher support wrapped around useful student experiences.

---

# 2. WORKING PRODUCT NAME

Preferred working name:

# Language Bridge

Subtitle:

Bilingual and ESL Activities for Real Classrooms

Optional Texas-facing subtitle:

Language Bridge: Activities, Printables, and Supports for Emergent Bilingual Learners

Possible tagline:

Learn it. Connect it. Use it.

Do not spend development time on branding before functionality works.

The site name must be configurable in:

/data/site.json

---

# 3. CORE PRODUCT PRINCIPLES

## 3.1 Activity First

Every module must contain actual student activities.

A module cannot launch with only:

- Explanations
- Standards
- Teacher articles
- Vocabulary lists
- Framework descriptions

Every module must answer:

> What does the student actually do?

---

## 3.2 Teacher Ready

A teacher should be able to:

1. Open the site
2. Select a need
3. Select grade/course
4. Select language/support level
5. Open an activity
6. Project it, share it, or print it

Target: useful resource reachable within three clicks from the homepage.

---

## 3.3 Student Friendly

Student activities should:

- Use minimal instructions
- Show one clear task at a time
- Provide visual support
- Give useful feedback
- Avoid unnecessary timers
- Avoid unnecessary scores
- Work on Chromebooks, laptops, tablets, and phones
- Allow keyboard navigation
- Avoid requiring accounts
- Avoid collecting names
- Avoid collecting student IDs
- Avoid saving responses to a server

---

## 3.4 Home Language as an Asset

The architecture must assume that a student's existing language knowledge is useful.

Do not treat translation as remediation.

Where appropriate:

- Compare languages
- Allow first thinking in the home language
- Provide bilingual sentence stems
- Connect new English words to known language
- Invite students to explain patterns across languages
- Identify where direct translation does NOT work
- Include cultural/contextual differences where necessary

---

## 3.5 Texas First, Globally Useful

The learning activity itself should usually be portable.

Texas-specific information should appear primarily in:

- Teacher standards panels
- TEKS correlations
- ELPS correlations
- Texas classroom examples
- Optional Texas content packs

A teacher outside Texas should still be able to use the activity.

Design the standards architecture so that future adapters can add:

- WIDA
- CEFR
- Other U.S. state standards
- Country-specific language frameworks

Do NOT hard-code Texas standards into activity instructions visible to students.

---

# 4. OFFICIAL REQUIREMENTS VS. LOCAL FRAMEWORKS

Every standards/framework panel must distinguish these categories.

## OFFICIAL TEXAS STANDARDS

### ELPS

Use the English Language Proficiency Standards adopted in 2024:

- 19 TAC §120.20: Kindergarten–Grade 3
- 19 TAC §120.21: Grades 4–12

These began classroom implementation in 2026–2027.

The standards address:

- Listening
- Speaking
- Reading
- Writing
- Academic and social registers
- Content-area language
- Cognates
- Word analysis
- Context
- Figurative language
- Language structures
- Linguistic accommodations
- Connections between primary language and English

### TEKS

Use the currently effective Texas Essential Knowledge and Skills.

Primary chapters expected in this project:

- Chapter 110: English Language Arts and Reading
- Chapter 128: Spanish Language Arts and Reading / ESL
- Chapter 111: Mathematics
- Chapter 112: Science
- Chapter 113: Social Studies

Do not invent TEKS codes.

Do not infer a TEKS correlation merely because an activity happens to contain vocabulary from that subject.

Every TEKS correlation requires:

1. Exact TEKS code
2. Grade/course
3. Short description
4. Why the activity addresses it
5. Alignment strength
6. Source
7. Last verification date

Alignment strength must use:

- `direct`
- `supporting`

Do not use the phrase "TEKS aligned" unless the activity actually addresses the expectation.

---

## LOCAL INSTRUCTIONAL FRAMEWORKS

The following are instructional overlays, NOT TEA requirements:

### ACE

A — ARTICULATE
Explain the idea in your own words.

For multilingual learners, articulation may begin in the home language.

C — CONNECT
Connect the idea to:

- Prior knowledge
- Another word
- Another language
- Another concept
- A personal experience
- Content-area knowledge

Explain WHY the connection works.

E — EXTEND
Use the idea in:

- A new sentence
- A new text
- A new subject
- A new conversation
- A novel problem
- A new context

ACE should often function as the closing reflection for activities.

Do not force all three ACE stages into every two-minute activity.

---

### CLEAR

C — Claim
State an answer, interpretation, or choice.

L — Lens
Identify the language rule, context clue, concept, pattern, or perspective being used.

E — Evidence
Identify words, images, context, data, or clues supporting the claim.

A — Alternatives
Consider another possible meaning, translation, explanation, or response.

R — Response
Give the final response in context.

CLEAR is especially useful for:

- Cognate verification
- False cognates
- Context clues
- Translation choices
- Inference
- Academic explanations
- Argumentation
- Evaluating multiple meanings

Do not force CLEAR onto simple recognition practice.

---

# 5. UDL 3.0 AS A DESIGN REQUIREMENT

Use CAST UDL Guidelines 3.0 as the design framework.

Do not create a decorative "UDL badge."

Each activity should contain actual UDL design choices.

Store UDL tags in activity data.

Example:

"udl": [
  "engagement.choice",
  "engagement.relevance",
  "representation.language_support",
  "representation.multiple_media",
  "representation.prior_knowledge",
  "action_expression.multiple_response_modes",
  "action_expression.graduated_support"
]

## UDL: ENGAGEMENT

Activities should use appropriate combinations of:

- Student choice
- Relevant contexts
- Short achievable challenges
- Collaboration
- Individual practice
- Cultural and linguistic relevance
- Optional challenge levels
- Clear goals
- Useful feedback

Avoid gamification that exists only to create points.

---

## UDL: REPRESENTATION

Use combinations of:

- Words
- Images
- Audio
- Examples
- Non-examples
- Context sentences
- Diagrams
- Word parts
- Home-language equivalents
- Highlighted patterns
- Graphic organizers
- Content-area examples

Generated images must never be the only way essential information is communicated.

---

## UDL: ACTION AND EXPRESSION

Allow appropriate alternatives such as:

- Select
- Sort
- Speak
- Write
- Draw
- Match
- Explain
- Record locally
- Point
- Drag
- Type
- Discuss with a partner

Do not make typing the only way students can demonstrate understanding.

---

# 6. HATTIE / VISIBLE LEARNING STRATEGY LAYER

Instructional strategy information is TEACHER-FACING metadata.

It is not a ranking system for students.

Maintain:

/data/research/visible-learning.json

Initial strategy records may include:

- Corrective feedback
- Jigsaw method
- Teacher clarity
- Outlining and organizing
- Vocabulary programs
- Concept mapping
- Retrieval practice
- Elaboration and organization
- Advance organizers
- Strategy monitoring

Each record must include:

{
  "id": "retrieval-practice",
  "name": "Retrieval Practice",
  "effectSize": 0.51,
  "sourceVersion": "Visible Learning MetaX 1.4",
  "verified": "2026-09",
  "useWhen": [
    "recalling previously learned vocabulary",
    "brief low-stakes review"
  ],
  "cautions": [
    "Do not choose a strategy solely because of effect size.",
    "Match strategy to learning goal, learners, context, and implementation demands."
  ]
}

IMPORTANT:

Effect sizes can change as the database changes.

Therefore:

- Never embed an effect-size number permanently in normal page prose
- Read numbers from the research JSON registry
- Display "Last verified" when shown
- Keep strategy recommendations contextual
- Do not claim an effect size guarantees a particular amount of learning

---

# 7. THREE DIFFERENT LANGUAGE SETTINGS

Do NOT treat "language" as a single variable.

Use three concepts.

## 7.1 UI LANGUAGE

The language used for:

- Navigation
- Buttons
- Directions
- Teacher explanations

Variable:

uiLang

---

## 7.2 SUPPORT / HOME LANGUAGE

The language used for:

- Translation support
- Bilingual hints
- Sentence stems
- Vocabulary comparisons

Variable:

supportLang

---

## 7.3 TARGET LANGUAGE

The language students are practicing.

Variable:

targetLang

Default:

English

This distinction is important.

Example:

A student may have:

uiLang = "es"
supportLang = "es"
targetLang = "en"

Do not automatically translate target-language practice into the support language.

---

# 8. LANGUAGE SWITCHER

The language switcher must exist from version 1.

Architecture must support at least:

- English: en
- Spanish: es
- Vietnamese: vi
- Arabic: ar
- Simplified Chinese: zh-Hans
- Urdu: ur
- Hindi: hi

RTL support is REQUIRED for:

- Arabic
- Urdu

Use:

<html lang="">
<html dir="">

and update both when the UI language changes.

## Translation quality control

Every translation entry must have a status:

- draft
- reviewed
- published

Only `published` translations appear in production.

Example:

{
  "key": "activity.check_answer",
  "translations": {
    "en": {
      "text": "Check answer",
      "status": "published"
    },
    "es": {
      "text": "Revisar respuesta",
      "status": "reviewed"
    }
  }
}

The architecture should support all target languages immediately.

Launch content should prioritize complete, reviewed:

1. English
2. Spanish

Additional languages can be enabled module-by-module as review is completed.

Never publish raw machine translation as if it were fully reviewed.

---

# 9. REGIONAL / INTERNATIONAL ARCHITECTURE

Add:

region

Initial values:

- us
- global

Future:

- uk
- canada
- mexico
- custom

This matters most for Newcomer Navigator.

Example:

US:
cafeteria

Other regions may use:
canteen
dining hall
lunch hall

Store regional terms in localization data rather than hard-coding them in activities.

---

# 10. GRADE ORGANIZATION

Student/teacher browsing bands:

- K–2
- 3–5
- 6–8
- 9–12

However:

ELPS standards bands are:

- K–3
- 4–12

Therefore DO NOT assign one ELPS record blindly to a 3–5 activity.

For a Grade 3–5 activity:

Grade 3 correlations may reference:

§120.20

Grades 4–5 correlations may reference:

§120.21

Store exact grades internally.

Example:

"grades": [3,4,5]

and attach standards by applicable grades.

---

# 11. USER MODES

Provide two obvious modes.

## TEACHER MODE

Shows:

- Learning objective
- Estimated time
- Grade/course
- Language function
- Materials
- Teacher directions
- Student directions
- Support options
- ELPS
- TEKS
- Spanish TEKS where applicable
- UDL supports
- ACE connection
- CLEAR connection
- Suggested instructional strategies
- Printable resources
- Answer guidance
- Share student link
- Project/fullscreen button

---

## STUDENT MODE

Shows only:

- Activity title
- Short directions
- Task
- Supports
- Check / Try Again / Show Hint
- Optional ACE closing
- Next activity

No standards clutter.

No research metadata.

No teacher notes.

A student-mode URL should be shareable.

Example conceptual pattern:

/activity/?id=cog-context-3-5-01&mode=student&support=medium

No student identifier may appear in the URL.

---

# 12. MAIN SITE INFORMATION ARCHITECTURE

Homepage:

/
index.html

Primary navigation:

1. Activities
2. Modules
3. Printables
4. Newcomer
5. Teacher Tools
6. Standards
7. Frameworks
8. About

Language switcher remains visible in top navigation.

---

# 13. HOMEPAGE

Homepage objective:

Get teachers into something useful immediately.

## HERO

Headline:

Language Bridge

Subhead:

Bilingual and ESL activities, printables, and language supports for real classrooms.

Primary buttons:

- Find an Activity
- Browse Printables

Secondary:

- I'm New Here

---

## QUICK ACTIVITY FINDER

Title:

What do you need today?

Filters:

Grade:
- K–2
- 3–5
- 6–8
- 9–12

Need:
- Vocabulary
- Academic language
- Speaking
- Reading
- Writing
- Listening
- Newcomer support
- Content language
- Critical thinking

Time:
- 5 minutes
- 10–15 minutes
- 20–30 minutes
- Full lesson / station

Format:
- Interactive
- Partner
- Small group
- Printable
- Projector
- Independent

Subject:
- Any
- ELAR
- Math
- Science
- Social Studies
- CTE

Button:

SHOW ME ACTIVITIES

---

# 14. HOMEPAGE RETURN-VISIT FEATURES

Engagement should come from usefulness rather than gimmicks.

Build:

## Today's Quick Pick

Select one activity deterministically from the library based on the local date.

No server required.

Allow:

"Give me another"

---

## Five-Minute Mix

Random activity selector filtered by:

- Grade
- Language skill
- Subject

---

## Recently Added

Driven by:

createdDate
updatedDate

---

## Saved Activities

Use localStorage only.

No account.

Allow teacher to bookmark an activity on that device.

---

## Recently Used

Store last 10 activity IDs locally.

---

## Continue Exploring

Recommend two or three related activities.

Example:

Completed:
Cognate or Not?

Suggested next:

- False Friend Detective
- Cognates in Science
- Use It in Context

---

# 15. OPTIONAL PWA SUPPORT

Make the site installable.

Include:

manifest.webmanifest

service-worker.js

Cache:

- Core shell
- CSS
- JS
- Locale files
- Recently used activities
- Small essential icons

Do NOT pre-cache hundreds of large PDFs and image files.

Cache those when accessed.

Provide an offline message explaining what is currently available offline.

---

# 16. REPOSITORY STRUCTURE

Recommended:

/
  index.html
  README.md
  LICENSE
  manifest.webmanifest
  service-worker.js

  /activities/
    index.html

  /modules/
    index.html

    /cognate-detective/
      index.html
      activity.html
      data.json
      teacher-guide.html
      printables.html

    /academic-language-lab/
      index.html
      activity.html
      data.json
      teacher-guide.html
      printables.html

    /newcomer-navigator/
      index.html
      activity.html
      data.json
      teacher-guide.html
      printables.html

  /printables/
    index.html

  /teacher/
    index.html

  /standards/
    index.html

  /frameworks/
    index.html
    ace.html
    clear.html
    udl.html
    instructional-strategies.html

  /about/
    index.html
    privacy.html
    accessibility.html
    licensing.html

  /assets/
    /css/
      tokens.css
      base.css
      layout.css
      components.css
      activities.css
      print.css
      rtl.css

    /js/
      app.js
      i18n.js
      storage.js
      filters.js
      activity-engine.js
      feedback.js
      standards.js
      recommendations.js
      printables.js
      accessibility.js

    /icons/
      *.svg

    /art/
      /main/
      /cognates/
      /academic-language/
      /newcomer/

  /data/
    site.json

    /locales/
      en.json
      es.json
      vi.json
      ar.json
      zh-Hans.json
      ur.json
      hi.json

    /standards/
      elps.json
      teks-elar.json
      teks-slar.json
      teks-math.json
      teks-science.json
      teks-social-studies.json

    /research/
      visible-learning.json

    /frameworks/
      ace.json
      clear.json
      udl.json

    /featured/
      featured.json

  /downloads/
    /cognate-detective/
    /academic-language-lab/
    /newcomer-navigator/

  /scripts/
    validate-data.js
    validate-standards.js
    validate-locales.js
    validate-links.js
    generate-printables.js
    generate-index.js

  /tests/
    activity-engine.test.js
    standards.test.js
    locales.test.js
    accessibility.test.js
    smoke.test.js

  /docs/
    CONTENT_GUIDE.md
    STANDARDS_GUIDE.md
    TRANSLATION_GUIDE.md
    IMAGE_PROMPTS.md
    QA_CHECKLIST.md
    ROADMAP.md

---

# 17. SHARED ACTIVITY DATA MODEL

Activities must be data-driven.

Do not create separate JavaScript logic for every activity.

Example:

{
  "id": "cog-context-3-5-001",
  "module": "cognate-detective",
  "title": {
    "en": "Cognate or False Friend?",
    "es": "¿Cognado o falso amigo?"
  },

  "grades": [3,4,5],
  "gradeBand": "3-5",

  "subjects": [
    "elar"
  ],

  "duration": 8,

  "interactionType": "context-choice",

  "targetLanguage": "en",
  "supportedHomeLanguages": [
    "es"
  ],

  "languagePair": "en-es",

  "studentGoal": {
    "en": "Use spelling, meaning, and context to decide whether two words are true cognates."
  },

  "materials": [],

  "items": [],

  "feedback": {},

  "ace": {
    "articulate": true,
    "connect": true,
    "extend": true
  },

  "clear": {
    "enabled": true,
    "emphasis": [
      "claim",
      "evidence",
      "alternatives"
    ]
  },

  "udl": [
    "representation.language-support",
    "representation.context",
    "action-expression.multiple-response-modes",
    "engagement.relevance"
  ],

  "strategies": [
    "vocabulary-programs",
    "corrective-feedback",
    "retrieval-practice"
  ],

  "standards": {
    "elps": [],
    "teks": [],
    "slar": []
  },

  "printables": [],

  "created": "2026-09-10",
  "updated": "2026-09-10",

  "status": "draft"
}

---

# 18. REUSABLE ACTIVITY ENGINES

Build these ONCE.

Modules feed them data.

Priority engines:

## Engine 1: Multiple Choice

Use for:

- Meaning selection
- Best response
- Context interpretation
- Translation comparison

---

## Engine 2: Sort

Examples:

- Cognate / False Friend / Not Related
- Formal / Informal
- Claim / Evidence
- Classroom / Cafeteria / Library language

Keyboard-accessible alternative is required.

Do NOT make drag-and-drop the only interaction.

---

## Engine 3: Match

Examples:

- Word → image
- English → home-language equivalent
- Sentence → purpose
- Phrase → school situation

---

## Engine 4: Context Detective

Show:

- Sentence
- Highlighted word
- Optional image

Ask student to infer meaning.

---

## Engine 5: Sentence Builder

Students assemble:

- Word
- Phrase
- Clause
- Complete sentence

Support both:

- Clicking
- Keyboard controls

---

## Engine 6: Scenario Choice

Show a realistic situation.

Student chooses:

- What to say
- What to ask
- What a phrase means
- Which response fits the setting

---

## Engine 7: Sequence

Examples:

- School procedure
- Explanation sequence
- Narrative sequence
- Academic process

---

## Engine 8: Reveal / Retrieval

Question first.

Student responds mentally/orally/written.

Then:

Reveal Answer

Use for low-stakes retrieval.

---

## Engine 9: Open Response

Never send the response anywhere.

Provide:

- Text box
- Optional sentence stems
- Copy button
- Clear button

Do not save content unless user explicitly clicks:

Save on this device

Prefer not to store student open responses at all in MVP.

---

## Engine 10: Oral Rehearsal

Prompt student to:

- Think
- Say
- Compare
- Try again

Browser audio recording may be added later.

Do not make microphone permission necessary for core activity use.

---

# 19. FEEDBACK ENGINE

Feedback should explain WHY.

Bad:

Incorrect.

Better:

Look again at the sentence. "Actually" describes what really happened. Spanish "actualmente" usually means "currently," so these words look related but do not have the same meaning.

Feedback model:

{
  "correct": "...",
  "why": "...",
  "hint": "...",
  "next": "..."
}

Buttons:

- Check
- Try Again
- Hint
- Explain
- Next

Avoid:

- Loud error sounds
- Red-only feedback
- Punitive point deductions

---

# 20. SUPPORT LEVELS

Teacher mode may select:

## HIGH SUPPORT

Provide:

- Home-language support
- Image
- Word bank
- Short sentence stem
- Reduced choices
- Read-aloud option where available

## MEDIUM SUPPORT

Provide:

- English context
- Optional translation
- Optional hint
- Sentence starter

## LIGHT SUPPORT

Provide:

- Target-language prompt
- Minimal hint
- More independent response

Map these internally to instructional scaffolding.

Do not label students publicly as:

- Low
- Weak
- Poor
- Limited

Teacher standards data may still reference official ELPS proficiency descriptors.

---

# 21. STANDARDS DATA MODEL

Example:

{
  "code": "§120.21(d)(3)(C)",
  "framework": "Texas ELPS",
  "gradeRange": "4-12",
  "domain": "reading",
  "summary": "Use contextual factors, word analysis, roots, affixes, and cognates to comprehend content-area vocabulary.",
  "sourceStatus": "official",
  "effective": "2026-2027",
  "verified": "2026-09-10",
  "source": "Texas Education Agency / 19 TAC Chapter 120"
}

---

# 22. ACTIVITY-TO-STANDARD RELATIONSHIP

Example:

{
  "code": "§120.21(d)(3)(C)",
  "alignment": "direct",
  "grades": [4,5],
  "rationale": "Students use cognates and context to determine content-area vocabulary meaning."
}

Every correlation must answer:

WHY DOES THIS ACTIVITY ADDRESS THIS STANDARD?

If that cannot be explained in one sentence:

Do not attach the standard.

---

# 23. STANDARDS USER INTERFACE

Teacher page should show:

## Standards Addressed

### ELPS

Code
Plain-language summary
Direct / Supporting

### TEKS

Grade
Subject
Code
Plain-language summary
Direct / Supporting

Button:

VIEW FULL CORRELATION

Do not place the complete standards list on the student activity.

---

# 24. STANDARDS SEARCH

Allow teachers to search:

- ELPS code
- TEKS code
- Grade
- Subject
- Language domain
- Skill

Example:

Search:
6.2C

Return activities tagged with that exact expectation.

---

# 25. PRINTABLE SYSTEM

Every major module should ship with color printables.

Primary sizes:

- US Letter: 8.5 × 11
- A4

Required printable categories:

1. Student activity
2. Activity cards
3. Teacher guide
4. Student organizer
5. ACE reflection
6. CLEAR organizer when appropriate
7. Vocabulary/reference card
8. Answer guidance
9. Standards correlation
10. Full module packet

Optional:

Low-ink version

---

# 26. PRINTABLE FILE NAMING

Use predictable naming.

Examples:

cognate-detective_3-5_en-es_context-cards_letter.pdf

cognate-detective_3-5_en-es_context-cards_a4.pdf

academic-language_6-8_en_explain-mat_letter.pdf

newcomer_secondary_es_help-phrases_letter.pdf

Avoid:

final.pdf
new.pdf
version2.pdf

---

# 27. PRINTABLE PRODUCTION

Author printables as HTML/CSS first.

Advantages:

- Same source text as site
- Easier translation
- Easier accessibility
- Easier correction
- Less duplicate content

Create print-specific HTML.

Generate PDFs at build time using headless Chromium / Playwright.

Commit generated PDFs to:

/downloads/

Teachers should also be able to use:

Print This Resource

from the HTML version.

All printables must:

- Print in color cleanly
- Have readable fonts
- Avoid clipped text
- Include sufficient margins
- Use icons plus words
- Not depend on color alone
- Include source/module name
- Include language
- Avoid unnecessary URLs
- Include QR only if intentionally generated

---

# 28. PRINTABLE MODULE PACK

Every module should eventually have:

## QUICK START

1–2 pages

Contains:

- What this module teaches
- Who it is for
- Three ways to use it
- Recommended starting activity
- Language supports

## STUDENT PACK

Activities without teacher answers.

## ACTIVITY CARD PACK

Cut-apart color cards.

## TEACHER PACK

Directions, answers, differentiation.

## STANDARDS PACK

ELPS and TEKS correlations.

## ACE + CLEAR PACK

Reusable reflection/response organizers.

---

# 29. ACCESSIBILITY REQUIREMENTS

Target WCAG 2.2 AA where practical.

Minimum:

- Full keyboard navigation
- Visible focus
- Semantic headings
- Proper labels
- Alt text
- 4.5:1 body-text contrast
- No color-only meaning
- Touch targets large enough for students
- Zoom support
- Responsive layout
- Reduced-motion support
- RTL support
- Print readability
- Screen-reader status messages after answer checks

Drag-and-drop activities MUST also provide:

- Click-to-select
or
- Keyboard movement

---

# 30. PRIVACY REQUIREMENTS

Default:

Collect nothing.

Do not request:

- Student name
- Email
- ID number
- School
- Grade record
- Birthdate
- Location
- Account
- Camera
- Microphone

Microphone may someday be optional for local pronunciation/oral work, but core functions cannot depend on it.

localStorage may contain:

- Language preference
- Teacher/student mode preference
- Saved activity IDs
- Recently viewed activity IDs
- Optional completed activity IDs

Never store student open-response text by default.

Document exactly what localStorage contains.

---

# 31. OPTIONAL ANALYTICS ADAPTER

Create an analytics interface but leave it disabled by default.

Allowed future events:

- module_opened
- activity_started
- activity_completed
- printable_downloaded
- language_changed
- favorite_saved
- quick_pick_opened

Never send:

- Typed answers
- Student names
- Open responses
- Home language tied to a persistent personal identifier
- Unique tracking profiles

Analytics must be replaceable/removable without changing activity logic.

---

# 32. VISUAL DESIGN

General:

- White / warm white backgrounds
- Deep navy
- Bright blue
- Teal
- Warm gold
- Pale blue panels
- High contrast
- Rounded cards
- Clear icons
- Generous spacing
- Friendly without appearing elementary-only

Suggested palette:

Deep navy:
#082759

TCEA navy:
#0A3476

Bright blue:
#147AD6

Gold:
#FCB040

Teal:
#1B8A8F

Pale blue:
#EEF4FC

White:
#FFFFFF

Body:
#172033

Do not make each module look like a separate website.

Give each module one secondary accent.

---

# 33. GENERATED IMAGE RULE

Instructional text must NEVER depend on image-generation text rendering.

Use generated images only for:

- Hero scenes
- Scenario illustrations
- Objects
- Classroom settings
- Visual context

Render:

- Titles
- Vocabulary
- Labels
- Directions
- Captions
- Answers

with HTML/CSS/SVG.

Use deterministic SVG icons whenever an icon will do.

Do not generate decorative images simply because space exists.

---

# 34. GENERAL IMAGE PROMPT STANDARD

Use this base prompt when custom illustrations are required:

"Clean educational vector illustration for a bilingual K–12 learning resource. White or pale-blue background. Deep navy, bright blue, teal, and warm gold accents. Friendly modern classroom style. Clear shapes, strong silhouettes, generous white space, and simple visual storytelling. Diverse students and educators represented respectfully. All people fully clothed in ordinary school-appropriate clothing. No logos. No watermarks. No text, letters, labels, captions, or numbers inside the generated image. Avoid distorted hands, distorted faces, clutter, and decorative AI circuitry. Professional, classroom-appropriate, accessible visual style."

All essential text will be overlaid separately using HTML/CSS.

---

# 35. MAIN SITE HERO IMAGE PROMPT

"Create a clean educational vector illustration for a multilingual learning resource center. Show a diverse small group of students and a teacher collaborating around a table with books, a tablet, visual cards, a simple science diagram, a graph, and speech-bubble shapes without any words. Include subtle visual symbols suggesting multiple languages and global connection, such as paired speech bubbles and a simple globe. Do not use flags as the main representation of language. Deep navy, bright blue, teal, warm gold, white, and pale blue. All figures fully clothed and classroom-appropriate. No text, letters, logos, numbers, or watermarks. Wide composition with open space on the left for website headline text."

---

# 36. LAUNCH MODULES

The first three modules are:

1. Academic Language Lab
2. Newcomer Navigator
3. Cognate Detective

Teacher-value priority:

1. Academic Language Lab
2. Newcomer Navigator
3. Cognate Detective

Recommended IMPLEMENTATION order:

1. Cognate Detective
2. Academic Language Lab
3. Newcomer Navigator

Reason:

Cognate Detective is bounded enough to prove:

- Activity engine
- i18n
- Grade filtering
- Standards tagging
- ACE
- CLEAR
- Printables
- Feedback
- Teacher/student modes

before building the larger Academic Language Lab.

---

# MODULE 1
# COGNATE DETECTIVE

URL:

/modules/cognate-detective/

Tagline:

Spot the connection. Check the meaning. Use the word.

---

# 37. COGNATE DETECTIVE PURPOSE

Students learn to use cross-language knowledge intelligently rather than assuming similar-looking words always mean the same thing.

Primary launch language pair:

English ↔ Spanish

Do NOT create a fake "cognate translation" by translating this dataset into Vietnamese, Arabic, Chinese, Urdu, or Hindi.

The UI may be translated into those languages.

The cognate LANGUAGE PAIR is separate data.

Future pairs may include:

- English ↔ French
- English ↔ Portuguese

Only create pairs supported by linguistically accurate datasets.

---

# 38. COGNATE DETECTIVE LEARNING PATH

Level 1:
NOTICE

Students notice similar-looking words.

Level 2:
COMPARE

Students compare spelling, sound, and meaning.

Level 3:
VERIFY

Students use context to confirm whether meanings match.

Level 4:
WATCH OUT

Students identify false friends.

Level 5:
TRANSFER

Students use cognates strategically in content-area reading.

---

# 39. COGNATE DETECTIVE ACTIVITY TYPES

Create at least six reusable activity families.

## A. Picture Match

Students match a target-language word to:

- Image
- Meaning
- Related home-language word

Best:
K–2 / 3–5

---

## B. Cognate or Not?

Sort:

- True cognate
- False cognate
- Not related

---

## C. False Friend Detective

Show a short contextual situation.

Students determine why the obvious translation is wrong.

Use CLEAR:

Claim:
What does the word mean here?

Lens:
Which language clue are you using?

Evidence:
What in the sentence proves it?

Alternatives:
What tempting translation does NOT fit?

Response:
Give the best meaning.

---

## D. Context Clue Hunt

Provide short academic texts.

Students identify:

- Cognate
- Context clue
- Likely meaning
- Evidence

---

## E. Content Cognate Hunt

Collections:

- Science
- Mathematics
- Social Studies
- ELAR

Example categories:

Science:
organism
energy
temperature
prediction
observation

Do not publish examples until each word pair is linguistically verified.

---

## F. Cognate Builder

Students receive one root/base concept.

They explore related words.

Then use one in a sentence.

ACE:

ARTICULATE:
What does this word mean in your own words?

CONNECT:
How is it related to a word you know in another language?

EXTEND:
Use it in a new content-area sentence.

---

# 40. COGNATE DETECTIVE MVP CONTENT

Target:

24 interactive activities

Suggested distribution:

K–2:
4

3–5:
8

6–8:
8

9–12:
4

Initial printable sets:

- 24 Cognate Picture Cards
- 36 Cognate / False Friend Sort Cards
- Science Cognate Hunt
- Math Cognate Hunt
- Social Studies Cognate Hunt
- Cognate Detective Recording Sheet
- CLEAR Cognate Investigator Sheet
- ACE Word Reflection
- Teacher Quick Guide
- Answer Guide
- Standards Correlation

---

# 41. COGNATE DETECTIVE ELPS CORRELATIONS

Candidate/direct correlations to validate and store activity-by-activity:

## K–3

§120.20(d)(3)(C)

Use:
High-frequency words, cognates, and content-area vocabulary to comprehend classroom materials.

Also consider as activity warrants:

§120.20(d)(1)(B)
§120.20(d)(2)(B)
§120.20(d)(3)(F)
§120.20(d)(3)(G)

## Grades 4–12

Strong candidates:

§120.21(d)(1)(B)

Contextual factors / word analysis including cognates, Greek and Latin prefixes, suffixes, and roots in listening.

§120.21(d)(2)(A)

Pronunciation including cognates.

§120.21(d)(2)(B)

Use content-area vocabulary orally.

§120.21(d)(3)(B)

Identify syllable patterns, cognates, affixes, roots, and base words.

§120.21(d)(3)(C)

Use context, roots, affixes, and cognates to comprehend content-area vocabulary.

Do not automatically attach all codes to every activity.

---

# 42. COGNATE DETECTIVE TEKS STARTING POINTS

Validate against authoritative current sources before publishing.

Representative English Language Arts TEKS:

Grade 3:

§110.5(b)(3)(A–D)

Vocabulary and contextual meaning.

Grade 4:

§110.6(b)(3)(A–C)

Vocabulary, context, affixes, roots.

Grade 5:

§110.7(b)(3)(A–C)

Vocabulary, context, affixes, roots.

Grade 6:

§110.22(b)(2)(A–C)

Vocabulary, context, Greek/Latin roots.

Grade 7:

§110.23(b)(2)(A–C)

Vocabulary/context/roots.

Grade 8:

§110.24(b)(2)(A–C)

Vocabulary/context/roots.

Also load relevant Chapter 128 Spanish Language Arts standards.

DO NOT GUESS Chapter 128 codes.

Import and verify them before attaching them.

---

# 43. COGNATE DETECTIVE HATTIE-INFORMED STRATEGIES

Recommended where instructionally appropriate:

Vocabulary programs

Retrieval practice

Corrective feedback

Teacher clarity

Concept mapping

Jigsaw

Possible Jigsaw activity:

Four expert teams investigate:

- Science cognates
- Mathematics cognates
- Social studies cognates
- False cognates

Students return to mixed groups and teach one another.

ACE closes the activity.

---

# 44. COGNATE DETECTIVE UDL

Representation:

- Word
- Image
- Audio where available
- Context
- Home-language comparison
- Highlighted word parts

Action/expression:

- Sort
- Choose
- Speak
- Explain
- Write
- Draw connection

Engagement:

- Subject choice
- Short challenges
- Detective theme
- Immediate feedback
- Student-generated examples

---

# 45. COGNATE DETECTIVE HERO PROMPT

"Clean educational vector illustration for a classroom vocabulary detective activity. A large magnifying glass examines two paired vocabulary cards represented with abstract blank shapes, showing a visual connection between them. Include a student investigator with a notebook, several word-card shapes, a subtle science beaker, book, calculator, and globe suggesting cross-curricular vocabulary. Deep navy, bright blue, teal, warm gold, white, and pale blue. Friendly but appropriate for grades three through twelve. Student fully clothed in school-appropriate clothing. No text, letters, numbers, logos, or watermarks. Leave clear space for webpage heading."

---

# MODULE 2
# ACADEMIC LANGUAGE LAB

URL:

/modules/academic-language-lab/

Tagline:

Say it. Explain it. Support it. Use it.

This should become the flagship module.

---

# 46. ACADEMIC LANGUAGE LAB PURPOSE

Give multilingual learners repeated opportunities to practice the language needed to THINK and PARTICIPATE in academic content.

Do not reduce academic language to vocabulary lists.

Organize primarily around LANGUAGE FUNCTIONS.

---

# 47. CORE LANGUAGE FUNCTIONS

Build around:

1. Describe
2. Narrate
3. Explain
4. Compare
5. Justify
6. Discuss
7. Respond
8. Summarize
9. Elaborate
10. Evaluate

Student UI may simplify wording by grade.

Example:

K–2:
Tell What You Notice

Older students:
Describe

---

# 48. ACADEMIC LANGUAGE CONTENT AREAS

Every language function should eventually have activities in:

- ELAR
- Mathematics
- Science
- Social Studies
- CTE / applied subjects

Do not create separate interaction engines for each subject.

Content is data.

---

# 49. ACADEMIC LANGUAGE LAB ACTIVITY FAMILIES

## A. Say It Three Ways

Students see an idea.

They practice:

- Everyday language
- Classroom language
- Academic language

Teach register without saying everyday language is "bad."

---

## B. Build the Explanation

Sequence:

Observation
Because
Evidence
Conclusion

---

## C. Sentence Expansion

Begin:

Plants grow.

Expand:

The plants grew faster.

Expand:

The plants exposed to more light grew faster.

Expand:

The plants exposed to more light grew faster because...

---

## D. Explain the Visual

Use:

- Graph
- Diagram
- Timeline
- Map
- Illustration
- Data table

Student describes and explains.

---

## E. Evidence Match

Match:

Claim
Evidence
Reasoning

CLEAR can extend this.

---

## F. Academic Talk Moves

Examples:

I agree with ___ because...

I want to add...

My evidence is...

Can you explain...

Another possibility is...

I see it differently because...

Provide support-language explanations where needed.

---

## G. Compare It

Students use:

Both...
However...
Unlike...
Similarly...
One difference...

Adapt by proficiency/support level.

---

## H. Explain It to Someone Else

Pair activity.

Student A receives information.

Student B receives a task.

Student A must explain rather than show the answer.

---

## I. Repair the Response

Show a weak response.

Students improve:

- Vocabulary
- Detail
- Evidence
- Sentence connections
- Register

---

## J. CLEAR Response Builder

Students construct:

Claim
Lens
Evidence
Alternatives
Response

Use primarily in:

- Grades 6–8
- Grades 9–12

Create simplified versions for younger learners.

---

# 50. ACADEMIC LANGUAGE ACE INTEGRATION

ACE should be deeply integrated here.

ARTICULATE:

Explain the idea using your own words.

Home language may be used first where appropriate.

CONNECT:

Connect the concept to:

- Prior knowledge
- Another representation
- Another subject
- Personal experience
- Evidence

EXTEND:

Use the same language function in a new task.

Example:

Learn to explain cause/effect in science.

Extend:

Use the same explanation structure in social studies.

This makes LANGUAGE transfer visible.

---

# 51. ACADEMIC LANGUAGE SUPPORT LADDER

Each prompt should optionally expose three levels.

HIGH:

The ___ happened because ___.

MEDIUM:

___ happened because ___, which caused ___.

LIGHT:

Explain the relationship and support it with evidence.

Do not call these:

easy
medium
hard

Use:

More Support
Some Support
Independent

---

# 52. ACADEMIC LANGUAGE LAB MVP

Target:

32 interactive activities

Minimum distribution:

Describe:
4

Explain:
6

Compare:
4

Justify:
6

Discuss:
4

Respond:
4

Summarize:
2

Evaluate:
2

Ensure all four grade bands appear.

---

# 53. ACADEMIC LANGUAGE PRINTABLES

Required:

- Academic Talk Moves Cards
- Describe Sentence Mat
- Explain Sentence Mat
- Compare/Contrast Mat
- Justify with Evidence Mat
- Discussion Cards
- Academic Register Sort
- Transition Word Cards
- Sentence Expansion Ladder
- Explain a Visual Organizer
- ACE Academic Language Exit Ticket
- CLEAR Academic Response Organizer
- Student Self-Check
- Teacher Quick Guide
- Standards Correlation

Create color versions in:

- Letter
- A4

---

# 54. ACADEMIC LANGUAGE ELPS CORRELATIONS

## K–3

Strong candidates:

§120.20(d)(2)(B)

Speak using content-area vocabulary.

§120.20(d)(2)(C)

Use varied grammatical structures, sentence lengths/types, and connecting words.

§120.20(d)(2)(D)

Use appropriate register.

§120.20(d)(2)(E)

Narrate, describe, explain, or persuade orally.

§120.20(d)(2)(F)

Restate, ask questions, and respond.

§120.20(d)(3)(F)

Use visual/contextual/linguistic supports to comprehend content.

§120.20(d)(3)(G)

Demonstrate comprehension by connecting, retelling, or responding.

§120.20(d)(4)(C–F)

Write using content vocabulary and varied structures to narrate, describe, explain, respond, or persuade.

---

## Grades 4–12

Strong candidates:

§120.21(d)(2)(B–F)

Content vocabulary, grammatical structures, register, academic discourse, response.

§120.21(d)(3)(F–G)

Use supports and demonstrate reading comprehension.

§120.21(d)(4)(C–F)

Content vocabulary, sentence structures, conventions, and writing for academic purposes.

Attach exact codes only when the task actually elicits the behavior.

---

# 55. ACADEMIC LANGUAGE TEKS SYSTEM

Academic Language Lab is cross-curricular.

Therefore:

Do NOT place one generic TEKS list on every activity.

Each content activity must have:

LANGUAGE STANDARD

plus

CONTENT STANDARD

Example conceptual record:

Activity:
Explain Why Shadows Change

Language:
ELPS speaking/explanation

Content:
Science TEKS for the exact grade/concept

Activity:
Explain a Fraction Comparison

Language:
ELPS explanation/justification

Content:
Mathematics TEKS addressing fraction comparison

The content editor must verify the exact TEKS code.

---

# 56. GENERIC ELAR TEKS CORRELATIONS

Representative correlations may include:

Oral language

Vocabulary

Comprehension

Response

Composition

Discussion

Example Grade 6 areas:

§110.22(b)(1)

Oral language / discussion.

§110.22(b)(5)

Comprehension.

§110.22(b)(6)

Response.

§110.22(b)(10–11)

Composition.

Use exact subcodes after reviewing the activity.

Repeat this process by grade.

---

# 57. ACADEMIC LANGUAGE HATTIE-INFORMED STRATEGIES

Excellent candidates:

Teacher clarity

Corrective feedback

Jigsaw

Concept mapping

Outlining and organizing

Elaboration and organization

Retrieval practice

Example:

EXPLAIN activity

Teacher clarity:
Show the learning goal and one successful model.

Concept mapping:
Students organize relationships first.

ACE:
Student explains in own words.

Corrective feedback:
Feedback addresses the explanation rather than the student.

Extend:
Student uses the explanation structure in another context.

---

# 58. ACADEMIC LANGUAGE UDL

This module should model UDL exceptionally well.

Representation:

- Models
- Non-examples
- Visuals
- Vocabulary support
- Sentence structures
- Audio
- Home-language explanation
- Graphic organizers

Engagement:

- Topic choice
- Subject choice
- Partner practice
- Personally meaningful examples

Action/expression:

Allow:

- Oral explanation
- Typed explanation
- Written printable
- Diagram + labels
- Concept map
- Partner discussion

---

# 59. ACADEMIC LANGUAGE HERO PROMPT

"Clean educational vector illustration showing multilingual students engaged in academic discussion around a table. Place simple text-free content visuals on the table and board: a graph, a science beaker, a book, a map, and a geometric diagram. Students gesture toward evidence and connect ideas using blank speech-bubble shapes and subtle connecting lines. Deep navy, bright blue, teal, warm gold, white, and pale blue. Modern middle-school-to-high-school educational style that also works for elementary teachers. All figures fully clothed and classroom appropriate. No text, letters, numbers, logos, or watermarks. Leave generous blank space for webpage title."

---

# MODULE 3
# NEWCOMER NAVIGATOR

URL:

/modules/newcomer-navigator/

Tagline:

Understand school. Ask for help. Join in.

---

# 60. NEWCOMER NAVIGATOR PURPOSE

Help newly arrived multilingual students participate in school routines while developing English.

This is not a generic phrasebook.

It should teach language through REAL SCHOOL SITUATIONS.

Create two main experience tracks:

Elementary

Secondary

---

# 61. NEWCOMER NAVIGATOR SCENARIO COLLECTIONS

Launch collections:

1. Entering the Classroom
2. Understanding Directions
3. Asking for Help
4. Working With a Partner
5. Using a Schedule
6. Lunch / Cafeteria
7. Library
8. Technology / Chromebook
9. Finding a Place
10. Transportation / Dismissal
11. Talking With a Teacher
12. When You Don't Understand
13. School Supplies
14. Joining a Group
15. Everyday School Questions

Optional later:

- Counselor
- Nurse
- School office
- Extracurricular activities

Health-related scenarios should teach how to seek an appropriate adult, not diagnose or provide medical treatment.

---

# 62. NEWCOMER ACTIVITY FAMILY A
## What Do You Say?

Scenario:

You do not understand the directions.

Choices:

A.
I don't know.

B.
Could you say that again, please?

C.
Give me.

Student chooses the strongest response.

Then practice saying it.

---

# 63. NEWCOMER ACTIVITY FAMILY B
## What Does That Mean?

Example:

"Turn it in."

Show visual choices:

- Submit your work
- Turn around
- Open the door

Focus on school-specific meanings.

---

# 64. NEWCOMER ACTIVITY FAMILY C
## Follow the Directions

Examples:

- Circle
- Underline
- Compare
- Explain
- Highlight
- Turn in
- Open to
- Work with a partner

Use images plus language.

---

# 65. NEWCOMER ACTIVITY FAMILY D
## School Situation Match

Match phrase to:

- Classroom
- Library
- Cafeteria
- Hallway
- Bus
- Office

---

# 66. NEWCOMER ACTIVITY FAMILY E
## Build the Question

Students assemble:

Could
you
help
me
please?

Advance to:

Could you explain what I need to do?

---

# 67. NEWCOMER ACTIVITY FAMILY F
## Conversation Repair

Teach:

Could you repeat that?

Could you speak more slowly?

What does ___ mean?

Can you show me?

Do you mean ___?

I understand the first part, but not ___.

This should eventually connect to a separate Conversation Repair module.

---

# 68. NEWCOMER ACTIVITY FAMILY G
## Picture Walk

Show a school scene.

Student identifies:

- Location
- People
- Objects
- Likely action
- Useful phrase

---

# 69. NEWCOMER ACTIVITY FAMILY H
## Role Play

Provide:

Situation
Role A
Role B
Helpful phrases

Students practice orally.

No technology required.

---

# 70. NEWCOMER NAVIGATOR ACE

ARTICULATE:

What does the phrase mean?

CONNECT:

When would you need this at school?

EXTEND:

Use the phrase in a different school situation.

Example:

Phrase:

"Could you explain that again?"

Extend from:

Math class

to:

Science lab.

---

# 71. NEWCOMER NAVIGATOR CLEAR

Use selectively.

Example:

Student sees:

"Work with your table group."

CLEAR:

Claim:
What should you do?

Lens:
What classroom meaning does "group" have here?

Evidence:
What part of the direction tells you?

Alternatives:
Does "table" mean a data table here?

Response:
Explain what you should do next.

This prepares students for polysemous school vocabulary.

---

# 72. NEWCOMER NAVIGATOR MVP

Target:

30 interactive activities.

Elementary:

15

Secondary:

15

Include at least:

- 5 listening-oriented
- 5 speaking-oriented
- 5 reading-oriented
- 5 scenario-choice
- 5 partner activities
- 5 mixed/retrieval activities

One activity may count in multiple categories.

---

# 73. NEWCOMER PRINTABLES

Required:

- School Picture Dictionary
- Classroom Direction Cards
- Ask-for-Help Cards
- Conversation Repair Card
- Student Desk Reference
- Partner Talk Card
- School Places Cards
- Schedule Decoder
- Common Teacher Directions
- School Supplies Picture Cards
- First Week Language Sheet
- Elementary Newcomer Pack
- Secondary Newcomer Pack
- Teacher Newcomer Quick Start
- Family School Language Guide
- ACE Reflection
- Standards Correlation

Create bilingual editions:

English / Spanish first.

Architecture supports additional languages.

---

# 74. NEWCOMER ELPS CORRELATIONS

## K–3

Strong candidates:

§120.20(d)(1)(C)

Follow oral directions.

§120.20(d)(1)(E)

Demonstrate listening comprehension and ask for clarification.

§120.20(d)(1)(F)

Derive meaning from auditory multimedia.

§120.20(d)(2)(D)

Use appropriate register.

§120.20(d)(2)(F)

Restate, ask questions, and respond.

§120.20(d)(3)(F)

Use visual/contextual/linguistic support.

§120.20(d)(3)(G)

Demonstrate comprehension.

§120.20(d)(4)(F)

Write to communicate for a purpose.

---

## Grades 4–12

Strong candidates:

§120.21(d)(1)(C)

Respond accurately to directions, instructions, and requests.

§120.21(d)(1)(E)

Demonstrate listening comprehension, restate, paraphrase, summarize, or ask for clarification.

§120.21(d)(1)(F)

Derive meaning from auditory multimedia.

§120.21(d)(2)(D)

Use appropriate register.

§120.21(d)(2)(F)

Restate, ask questions, or respond.

§120.21(d)(3)(F–G)

Use supports and demonstrate comprehension.

§120.21(d)(4)(F)

Write for purpose and audience.

---

# 75. NEWCOMER TEKS STARTING POINTS

Use ELAR oral-language expectations when the activity directly practices them.

Representative examples:

Grade 3:

§110.5(b)(1)(A–E)

Listening, oral directions, speaking, collaboration, social communication.

Grade 4:

§110.6(b)(1)(A–D)

Listening, directions, speaking, collaboration.

Grade 5:

Verify §110.7(b)(1) subcodes.

Grade 6:

§110.22(b)(1)(A–D)

Listening, oral instructions, presentation, student discussion.

Grades 7–8:

Use corresponding current oral-language expectations after verification.

Do not attach a content-area TEKS merely because a school scenario occurs in that class.

---

# 76. NEWCOMER HATTIE-INFORMED STRATEGIES

Best fits:

Teacher clarity

Corrective feedback

Retrieval practice

Advance organizers

Vocabulary programs

Student-centered teaching

Examples:

Teacher clarity:
Display one instruction at a time with visual.

Advance organizer:
Preview the school schedule before students navigate it.

Retrieval:
Quick "What would you say?" review.

Corrective feedback:
Explain how a phrase changes meaning or register.

---

# 77. NEWCOMER UDL

Representation:

- Picture
- Spoken model
- Written phrase
- Home-language support
- Gesture
- Realistic context

Action/expression:

- Point
- Match
- Choose
- Speak
- Role-play
- Write
- Draw

Engagement:

- Immediate school relevance
- Choice of scenario
- Elementary/secondary mode
- Student success without public scoring

---

# 78. NEWCOMER HERO IMAGE PROMPT

"Clean educational vector illustration of a newly arrived student confidently navigating a welcoming school environment. Show a student holding simple visual cue cards while a friendly teacher points toward several recognizable school spaces represented visually: classroom doorway, library books, cafeteria tray, and hallway direction symbols. Include one peer offering help. Diverse people, all fully clothed in normal school-appropriate clothing. Warm, respectful, reassuring rather than childish. Deep navy, bright blue, teal, warm gold, white, and pale blue. No flags as shortcuts for identity. No text, letters, numbers, logos, or watermarks. Leave blank space for webpage title."

---

# 79. NEWCOMER SCENARIO IMAGE TEMPLATE

Use this for individual scenario art:

"Create one simple educational vector scene showing [SPECIFIC SCHOOL SITUATION]. Show only the visual context needed to understand the situation. Students and adults must be fully clothed in ordinary school-appropriate clothing and represented respectfully. Avoid stereotypes. Use deep navy, bright blue, teal, warm gold, white, and pale blue. Clean shapes, minimal background clutter, high visual clarity. No text, letters, signs containing words, numbers, logos, or watermarks. Any required labels will be added separately in HTML."

Examples:

- Student raising a hand to ask a teacher for clarification
- Two students working together at a table
- Student returning a paper to a teacher
- Student selecting lunch in a cafeteria
- Student asking a librarian for help finding a book
- Student looking at a visual school schedule
- Student carrying a Chromebook to a desk
- Student asking another student where a classroom is

---

# 80. MAIN MODULE PAGE TEMPLATE

Every module page should share the same structure.

## Hero

Module name
One-sentence description
Start Activity button
Printables button

## Choose Your Activity

Filters:

Grade
Time
Subject
Language
Skill
Format

## Recommended Starting Point

One activity.

## Student Activities

Cards.

## Printables

Preview cards.

## For Teachers

- How to use
- Differentiation
- Standards
- UDL
- ACE
- CLEAR
- Instructional strategies

## Related Modules

Two or three recommendations.

---

# 81. ACTIVITY CARD DESIGN

Each activity card should show:

Title

One-sentence purpose

Chips:

Grade
Time
Skill
Format

Buttons:

START
TEACHER VIEW

Optional:

SAVE

Do not place standards codes directly on every browse card.

---

# 82. ACTIVITY PAGE FLOW

Student activity:

1. Goal
2. Example if needed
3. Activity
4. Feedback
5. ACE or short reflection
6. Next challenge

Teacher mode adds a right-side or collapsible panel.

---

# 83. TEACHER QUICK GUIDE FOR EVERY ACTIVITY

Store:

Time

Materials

Grouping:

- Individual
- Pair
- Group
- Whole class

Before:

What students need first.

During:

Teacher moves.

After:

What evidence to listen/look for.

Support:

High
Some
Independent

ACE:

Suggested question.

CLEAR:

Suggested use if appropriate.

Standards:

Exact correlations.

---

# 84. TEACHER ACTIVITY LAUNCH OPTIONS

Buttons:

PROJECT

STUDENT LINK

PRINT

SAVE

COPY LINK

START OVER

Optional later:

CREATE QR

If QR generation is implemented, do it client-side and do not send URLs to a third-party QR API.

---

# 85. FRAMEWORKS HUB

Create:

/frameworks/

Sections:

## ACE

Explain:

Articulate
Connect
Extend

Provide:

- Teacher prompts
- Student stems
- Printable
- Examples

---

## CLEAR

Explain:

Claim
Lens
Evidence
Alternatives
Response

Provide:

- Simple version
- Full version
- Printable
- Sample language activity

---

## UDL

Do not reproduce the entire CAST site.

Show:

How Language Bridge applies:

- Engagement
- Representation
- Action and Expression

---

## Instructional Strategies

Provide short teacher explanations of:

- Vocabulary programs
- Retrieval practice
- Corrective feedback
- Jigsaw
- Concept mapping
- Teacher clarity
- Organizing

Read effect size values from the data registry.

---

# 86. PRINTABLES HUB

URL:

/printables/

Filters:

Module

Grade

Language

Subject

Resource type

Format:

- Letter
- A4

Categories:

- Activity Cards
- Student Mats
- Teacher Guides
- Vocabulary
- Speaking
- Reading
- Writing
- Newcomer
- ACE
- CLEAR

Each printable shows:

Preview
Description
Grade
Language
Pages
Color
Download

---

# 87. STANDARDS HUB

URL:

/standards/

Opening message:

Language Bridge activities use Texas standards as an instructional correlation layer. ACE, CLEAR, UDL, and research-informed strategies are instructional frameworks and are not Texas Education Agency requirements.

Tabs:

ELPS

ELAR TEKS

Spanish Language Arts TEKS

Math TEKS

Science TEKS

Social Studies TEKS

Search standards.

Click a standard to see matching activities.

---

# 88. CONTENT-AREA EXPANSION MODEL

Academic language and vocabulary become far more useful when connected to actual content.

After core launch, create CONTENT PACKS.

Example:

/content/science/

/content/math/

/content/social-studies/

/content/elar/

Each content pack does NOT become a separate product.

It feeds existing modules.

Example:

SCIENCE PACK

Adds:

Cognate Detective:
science cognates

Academic Language Lab:
explain observations
compare models
justify claims

Newcomer:
science classroom directions

Future:
Science Language Decoder

---

# 89. FUTURE MODULE PRIORITY

After the launch three:

## PRIORITY 4
READ BETWEEN THE LINES

Focus:

- Inference
- Implied meaning
- Tone
- Humor
- Indirect requests
- Context

Strong fit:

CLEAR
ELAR TEKS
ELPS context expectations

---

## PRIORITY 5
SCHOOL ENGLISH IN THE WILD

Students decode:

- Assignment directions
- Rubrics
- Teacher comments
- Announcements
- Menus
- Schedules
- Library notices
- Forms

Use authentic-looking but original materials.

Do not reproduce copyrighted district materials without permission.

---

## PRIORITY 6
WORD PARTS ACROSS LANGUAGES

Focus:

- Prefixes
- Suffixes
- Roots
- Morphology
- Word families

Connect to:

- Science
- Math
- Social Studies

---

## PRIORITY 7
MATH LANGUAGE DECODER

Focus:

- Difference
- Product
- At least
- Less than
- Rate
- Mean
- Increase
- Decrease
- Equivalent
- Compare

Use actual mathematical contexts.

---

## PRIORITY 8
SCIENCE LANGUAGE DECODER

Focus on everyday vs. disciplinary meanings:

- Force
- Matter
- Work
- Energy
- Cell
- Model
- Theory
- Solution
- Power

---

## PRIORITY 9
PHRASAL VERB PUZZLE LAB

Examples:

- Turn in
- Figure out
- Look up
- Break down
- Point out
- Set up

---

## PRIORITY 10
TONE AND REGISTER LAB

Focus:

- Friend
- Teacher
- Principal
- Email
- Presentation
- Formal writing
- Academic conversation

---

## PRIORITY 11
CONVERSATION REPAIR KIT

Focus:

- Clarifying
- Repeating
- Paraphrasing
- Confirming
- Asking for examples

---

## PRIORITY 12
WORDS WITH MANY LIVES

Polysemous words:

- Mean
- Table
- State
- Power
- Point
- Current
- Solution

Cross-content value is extremely high.

---

## PRIORITY 13
TRANSLATION DETECTIVE

Compare possible translations.

Ask:

Which preserves the meaning best?

Why?

Strong CLEAR fit.

---

## PRIORITY 14
LISTENING DETECTIVE

Requires expanded audio library.

---

## PRIORITY 15
STORY SEQUENCE STUDIO

Narration and retelling.

---

## PRIORITY 16
BILINGUAL WRITING STUDIO

Allow home-language planning followed by target-language composition.

---

# 90. RETURN-VISIT CONTENT STRATEGY

The site should feel alive without needing a database.

Use metadata.

Each activity has:

created
updated
featured
seasonal
subjects
skills

Homepage can generate:

Today's Quick Pick

Recently Added

Try Something Different

Because You Opened...

Five-Minute Activity

Printable of the Week

All done locally from the content library.

---

# 91. CONTENT RELEASE MODEL

Avoid publishing 100 weak activities at launch.

Better:

Launch:

Site shell

Cognate Detective:
24 polished activities

Academic Language Lab:
32 polished activities

Newcomer Navigator:
30 polished activities

Then publish small releases.

Example cadence:

Release:
Science language pack

Release:
Math language pack

Release:
Five newcomer scenarios

Release:
New false-friend set

Release:
Read Between the Lines module

The homepage reads release metadata automatically.

---

# 92. CONTENT QUALITY RULES

Every activity must pass:

## Accuracy

Is the language accurate?

Is the translation accurate?

Is the content accurate?

## Context

Would a real student encounter this?

## Clarity

Could a student understand the task quickly?

## Language

Is vocabulary appropriate for grade and support level?

## Cultural respect

Does the scenario avoid stereotypes?

## Standards

Does the activity actually address each attached standard?

## Feedback

Does feedback explain why?

## UDL

Are meaningful supports available?

## Accessibility

Can students complete it without mouse-only controls?

## Privacy

Does it avoid collecting personal information?

---

# 93. TRANSLATION QA

Create:

/docs/TRANSLATION_GUIDE.md

Rules:

- Translate meaning, not syntax
- Preserve target-language practice
- Do not translate proper nouns unnecessarily
- Avoid literal idiom translation
- Flag regional vocabulary
- Review school terminology
- Verify false cognates separately
- Verify cognates separately
- Never generate one cognate dataset by translating another
- Use Unicode-safe text
- Test line wrapping
- Test RTL

Create a translation audit script that finds:

- Missing keys
- Draft strings
- Duplicate keys
- English strings accidentally left in published locale data

---

# 94. STANDARDS QA

Create:

npm run validate:standards

Validator checks:

- Every code exists in standards registry
- Grade applies to standard
- Source exists
- Verified date exists
- Alignment rationale exists
- `direct` or `supporting` is present
- No unknown standard ID

Do not allow build to pass when an activity references a nonexistent standard.

---

# 95. CONTENT QA

Create:

npm run validate:content

Check:

- Unique activity IDs
- Required title
- Required directions
- Grade
- Module
- Interaction type
- Correct-answer data where needed
- Feedback
- Accessibility label
- Standards entries
- Language availability
- Status
- No broken printable references

---

# 96. LINK QA

Create:

npm run validate:links

Check internal:

- Modules
- Activities
- Downloads
- Frameworks
- Teacher links
- Navigation
- Images

No broken paths.

---

# 97. BROWSER TESTS

Use Playwright.

Test:

Desktop

Chromebook-sized viewport

Tablet

Phone

RTL language

Keyboard-only

Required smoke tests:

- Language switch works
- Preference persists
- Student activity launches
- Check answer works
- Hint works
- Next activity works
- Teacher view works
- Print link works
- Saved activity works
- No console errors
- Service worker does not break navigation

---

# 98. ACCESSIBILITY TESTING

Use automated tests plus manual inspection.

Minimum manual tests:

1. Navigate entire activity with Tab
2. Check visible focus
3. Complete sort without drag
4. Run screen-reader labels check
5. Zoom to 200%
6. Test RTL
7. Test reduced motion
8. Test grayscale print
9. Test phone portrait mode

---

# 99. PRINTABLE QA

Every PDF must be visually inspected.

Check:

- Correct page size
- Correct language
- No clipped text
- No tiny type
- No empty last page
- No broken images
- Color works
- Grayscale remains understandable
- Page numbers when packet is multi-page
- Answer key separated clearly
- Standards references correct

---

# 100. PRIVACY PAGE

Explain plainly:

Language Bridge:

- Does not require accounts
- Does not collect student names
- Does not save student answers to a server
- Does not sell data
- Does not require advertising cookies
- Uses browser storage only for preferences/favorites if enabled

List every localStorage key.

If analytics are later added:

Update this page BEFORE deployment.

---

# 101. LICENSING

Recommended:

Code:
MIT

Original educational content:
CC BY 4.0

Generated/custom artwork:
Use only assets with clear redistribution rights.

Include attribution guidance.

Do not include copyrighted textbook passages as activity content.

Create original instructional passages.

---

# 102. DEVELOPMENT MILESTONES

## MILESTONE 0
FOUNDATION

Build:

- Repository
- Design tokens
- Navigation
- Responsive shell
- Language engine
- RTL support
- Teacher/student mode
- Data schemas
- Standards registries
- Framework registries
- Privacy page
- Accessibility page
- Tests

DO NOT build dozens of activities yet.

Acceptance:

- English/Spanish interface works
- RTL proof works
- One sample activity renders from JSON
- Standards panel renders from IDs
- No server required

---

## MILESTONE 1
SHARED ACTIVITY ENGINE

Build:

- Multiple choice
- Match
- Sort
- Context choice
- Sentence builder
- Scenario choice
- Sequence
- Reveal/retrieval
- Open response
- ACE reflection

Acceptance:

Every interaction runs using JSON data only.

Do not write module-specific JavaScript.

---

## MILESTONE 2
PRINTABLE ENGINE

Build:

- Printable templates
- Letter print CSS
- A4 print CSS
- PDF generation script
- Download manifest
- Preview cards

Acceptance:

Generate one complete sample packet from data.

---

## MILESTONE 3
COGNATE DETECTIVE

Build complete module.

Requirements:

- English/Spanish reviewed
- 24 activities
- Color printable set
- Teacher guide
- ACE
- CLEAR
- ELPS
- TEKS
- UDL
- Strategy metadata
- Hero visual

Use this module to repair the underlying architecture before proceeding.

---

## MILESTONE 4
ACADEMIC LANGUAGE LAB

Build flagship module.

Requirements:

- 32 initial activities
- Four grade bands
- Multiple language functions
- At least four content areas represented
- Support-level variations
- Academic talk cards
- ACE transfer tasks
- CLEAR builder
- Full printable set
- Standards

---

## MILESTONE 5
NEWCOMER NAVIGATOR

Build:

- Elementary path
- Secondary path
- 30 activities
- School scenario art
- English/Spanish
- Support architecture for other languages
- Printable survival/support pack
- Teacher newcomer quick start
- Family reference
- Standards

---

## MILESTONE 6
RESOURCE CENTER HOME

Now populate:

- Quick Activity Finder
- Today's Quick Pick
- Five-Minute Mix
- Recently Added
- Saved Activities
- Recently Used
- Related Activities
- Printables hub
- Standards search

Do this after the modules have enough real content to make recommendations meaningful.

---

## MILESTONE 7
PWA / OFFLINE

Add:

- Manifest
- Service worker
- Offline shell
- On-demand resource caching

Test on actual phone and Chromebook.

---

## MILESTONE 8
LAUNCH QA

Run:

npm test

npm run validate:content

npm run validate:standards

npm run validate:locales

npm run validate:links

npm run build:printables

Run Playwright tests.

Perform manual accessibility check.

Inspect all PDFs.

Then deploy.

---

# 103. DEFINITION OF DONE FOR AN ACTIVITY

An activity is NOT complete until it has:

- Unique ID
- Title
- Student goal
- Grade(s)
- Duration
- Interaction type
- Complete content
- Answer logic if applicable
- Explanatory feedback
- Support options
- Language metadata
- UDL tags
- ACE integration decision
- CLEAR integration decision
- ELPS correlation
- TEKS correlation where applicable
- Strategy metadata
- Teacher directions
- Student directions
- Accessibility check
- Mobile check
- Translation status
- Related activity links
- Printable reference if appropriate

---

# 104. DEFINITION OF DONE FOR A MODULE

A module is NOT complete until it includes:

- Module landing page
- Hero
- Student activities
- Teacher guide
- Printables
- Answer guidance
- Standards correlation
- UDL explanation
- ACE connection
- CLEAR connection where relevant
- Strategy recommendations
- Multiple grade bands
- English
- Spanish
- Translation-ready structure
- Related modules
- Accessibility review
- Mobile review
- Print review

---

# 105. DESIGN FOR REPEAT USE

Do not try to manufacture return visits with:

- Login streaks
- Badges
- Leaderboards
- Artificial scarcity
- Daily email requirements

Instead create repeat value through:

- Many short usable activities
- Strong filters
- Saved activities
- Recently used activities
- New content
- Quick picks
- Printable packs
- Related challenges
- Content-area versions
- Grade-band versions
- Language support
- Student projection mode
- Teacher-ready standards

The reason to return should be:

> "I need something useful for tomorrow."

---

# 106. MAIN PRODUCT LOOP

Teacher:

FIND
↓
PREVIEW
↓
USE
↓
SAVE
↓
RETURN

Student:

NOTICE
↓
TRY
↓
GET FEEDBACK
↓
EXPLAIN
↓
TRANSFER

ACE supports the second loop:

ARTICULATE
↓
CONNECT
↓
EXTEND

CLEAR supports reasoning inside appropriate activities:

CLAIM
↓
LENS
↓
EVIDENCE
↓
ALTERNATIVES
↓
RESPONSE

---

# 107. CONTENT DEVELOPMENT TEMPLATE

Create this Markdown template:

/docs/ACTIVITY_TEMPLATE.md

# Activity Name

Module:

Grade:

Subject:

Duration:

Language function:

## Student Goal

## Student Directions

## Activity Content

## Correct Response

## Feedback

## More Support

## Some Support

## Independent

## ACE

Articulate:

Connect:

Extend:

## CLEAR

Use:
Yes / No

Claim:

Lens:

Evidence:

Alternatives:

Response:

## UDL

Engagement:

Representation:

Action/Expression:

## Instructional Strategies

## ELPS

Code:
Alignment:
Rationale:

## TEKS

Code:
Alignment:
Rationale:

## Spanish TEKS

Code:
Alignment:
Rationale:

## Printable

## Accessibility

## Translation Notes

## Image Needed?

Yes / No

If yes:

Prompt:

Alt text:

---

# 108. IMAGE ASSET MANIFEST

Every image must have a record.

Example:

{
  "id": "newcomer-ask-help-01",
  "path": "/assets/art/newcomer/ask-help-01.webp",
  "purpose": "Scenario visual",
  "alt": "A student raises a hand while a teacher stands nearby ready to help.",
  "decorative": false,
  "module": "newcomer-navigator",
  "promptFile": "/docs/IMAGE_PROMPTS.md",
  "rights": "project-created"
}

Never leave accessibility metadata scattered through HTML only.

---

# 109. PERFORMANCE TARGETS

Keep site lightweight.

Prefer:

SVG:
icons and simple diagrams

WebP:
generated illustration

Avoid:

large PNG files when not necessary.

Lazy-load noncritical images.

Initial homepage should not load every module's artwork.

Do not load all language packs at startup.

Load selected locale.

Do not load every PDF.

---

# 110. CONTENT SEARCH INDEX

Generate a lightweight client-side search index.

Fields:

Activity title

Module

Grade

Subject

Language skill

Keywords

ELPS

TEKS

Format

Duration

Example searches:

cognates science grade 5

speaking newcomer

6.2C

explain evidence

five minute vocabulary

No external search service.

---

# 111. FUTURE TEACHER TOOL
## BUILD A PRINTABLE PACK

Phase 2 feature.

Teacher selects:

Grade

Module

Number of activities

Language

Support level

Output:

Printable packet

Potential selections:

3 Cognate activities
1 ACE exit ticket
1 CLEAR organizer
1 answer guide

Generate locally or at build time from existing components.

Do not create a second content database.

---

# 112. FUTURE TEACHER TOOL
## ACTIVITY PLAYLIST

Teacher saves:

Activity A
Activity B
Activity C

Generate shareable state in URL/hash.

No account.

No names.

Example uses:

- Station rotation
- Intervention group
- Friday review
- Newcomer first-week sequence

---

# 113. FUTURE STANDARDS ADAPTERS

Design interface now.

Do not build all adapters during MVP.

Future:

Texas:
ELPS + TEKS

U.S.:
WIDA

International:
CEFR

Each adapter maps a standard/framework to ACTIVITY IDs.

Do not rewrite activities solely to fit another framework.

---

# 114. REQUIRED SOURCE CONTROL

Create:

/docs/SOURCES.md

Authoritative source categories:

## Texas ELPS

Texas Education Agency
19 TAC Chapter 120
§120.20
§120.21

Status:
Official/current for 2026–2027 implementation.

## English Language Arts TEKS

Texas Education Agency
19 TAC Chapter 110

## Spanish Language Arts / ESL TEKS

Texas Education Agency
19 TAC Chapter 128

## Mathematics

19 TAC Chapter 111

## Science

19 TAC Chapter 112

## Social Studies

19 TAC Chapter 113

## UDL

CAST Universal Design for Learning Guidelines 3.0

## Instructional Strategy Metadata

Visible Learning MetaX
Store version/date used.

## Local Frameworks

ACE Framework:
Articulate
Connect
Extend

CLEAR Framework:
Claim
Lens
Evidence
Alternatives
Response

Label ACE and CLEAR clearly as local instructional frameworks.

---

# 115. STANDARDS VERSIONING

Each standards record needs:

effectiveDate
verifiedDate
sourceVersion
status

Example statuses:

current
future
retired
draft

Never silently replace old standards data.

Future standards changes should be auditable.

Important:

Texas standards and required-reading rules can change.

Therefore standards data must remain independent of activity code.

---

# 116. README FOR CODING AGENTS

Create root README with:

## Purpose

Language Bridge is a privacy-first, static bilingual/ESL activity center.

## Non-negotiables

- No server
- No student accounts
- No unnecessary data collection
- No invented standards
- No module-specific duplicate engines
- Language switcher from first release
- RTL support
- English/Spanish reviewed before launch
- Activities first
- Color printables
- Mobile
- Keyboard accessible
- Official standards separated from local frameworks

## Development principle

Build one reusable engine.

Feed it validated content.

Do not copy/paste similar logic between modules.

---

# 117. FINAL MVP DELIVERABLE

The first public release should contain:

MAIN SITE

ACTIVITY FINDER

PRINTABLES HUB

STANDARDS HUB

FRAMEWORKS HUB

TEACHER/STUDENT MODES

LANGUAGE SWITCHER

PWA BASICS

PLUS:

## Cognate Detective

24 interactive activities

## Academic Language Lab

32 interactive activities

## Newcomer Navigator

30 interactive activities

TOTAL INITIAL ACTIVITIES:

Approximately 86 polished activities

Do not treat 86 as a rigid quota.

Quality wins over count.

---

# 118. FIRST DEVELOPMENT TASK FOR CODEX / CLAUDE CODE

Start by creating ONLY:

1. Repository/file structure
2. Design-token system
3. Responsive site shell
4. Navigation
5. English/Spanish language switcher
6. RTL proof-of-concept
7. Teacher/student mode toggle
8. Shared activity JSON schema
9. Standards JSON schema
10. One multiple-choice activity engine
11. One Cognate Detective sample activity
12. Teacher standards drawer
13. One printable generated from the same content
14. Automated validators
15. README

Do not build the other 85 activities yet.

The proof-of-concept must demonstrate:

One content record
↓
Student interactive
↓
Teacher view
↓
ELPS/TEKS correlations
↓
ACE/CLEAR metadata
↓
Printable

If that entire pipeline works cleanly, proceed to the remaining interaction engines.

---

# 119. FIRST PROOF-OF-CONCEPT USER STORY

Teacher:

"I teach Grade 5 bilingual students and need a quick vocabulary activity."

Teacher selects:

Grade 5
Vocabulary
Spanish support
5–10 minutes

Result:

Cognate Detective:
Cognate or False Friend?

Teacher sees:

8 minutes
Grade 5
English ↔ Spanish
Interactive
Printable available

Teacher clicks:

Teacher View

Teacher sees:

Objective
Directions
Support options
ACE
CLEAR
ELPS
TEKS
Instructional strategies
Print

Teacher clicks:

Student Mode

Student completes activity.

Student receives explanatory feedback.

Student finishes:

ARTICULATE:
What does the word mean?

CONNECT:
What word in Spanish helped you?

EXTEND:
Use the English word in a new sentence.

This is the MVP architecture test.

---

# 120. PRODUCT TEST

Before calling Language Bridge successful, ask:

Can a teacher find something useful quickly?

Can a student understand what to do?

Can the student interact rather than merely read?

Does home-language knowledge help?

Does feedback teach?

Can the teacher print it?

Can the teacher see why the activity connects to ELPS?

Can the teacher see which TEKS are actually addressed?

Can the student articulate understanding?

Can the student connect the new language to prior knowledge?

Can the student use the language somewhere new?

Can a teacher outside Texas hide the Texas-specific layer and still use the activity?

Can the site work without an account?

Can the site work on a Chromebook?

Can the resource work on paper when technology is unavailable?

If the answer to those questions is yes, continue expanding the library.

If the answer is no, improve the shared architecture before adding another module.
