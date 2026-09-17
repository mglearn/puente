#!/usr/bin/env node
/* Language Bridge — smoke tests (spec §16 /tests)
 * Exercises the pure engine logic (i18n fallback + feedback resolution)
 * against the real locale and activity data, with no browser. Run: node tests/smoke.test.js
 */
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

const I18n = require(path.join(ROOT, "assets/js/i18n.js"));
const Feedback = require(path.join(ROOT, "assets/js/feedback.js"));

let passed = 0;
function test(name, fn) { fn(); passed++; console.log("  ✓ " + name); }

// Inject bundles the way I18n.load would.
I18n._bundles.en = readJson("data/locales/en.json");
I18n._bundles.es = readJson("data/locales/es.json");
const store = readJson("modules/cognate-detective/data.json");
const activity = store.activities[0];

// --- i18n: three-language separation + QC fallback ---
test("published Spanish string is used", () => {
  I18n.uiLang = "es"; I18n.minStatus = "published";
  assert.strictEqual(I18n.t("activity.check"), "Revisar");
});

test("non-published Spanish string falls back to English", () => {
  I18n.uiLang = "es"; I18n.minStatus = "published";
  // activity.student_link is 'reviewed' in es → must fall back to en source
  assert.strictEqual(I18n.t("activity.student_link"), "Copy student link");
});

test("lowering the gate to reviewed surfaces the reviewed translation", () => {
  I18n.uiLang = "es"; I18n.minStatus = "reviewed";
  assert.strictEqual(I18n.t("activity.student_link"), "Copiar enlace para estudiantes");
  I18n.minStatus = "published";
});

test("interpolation fills placeholders", () => {
  I18n.uiLang = "en";
  assert.strictEqual(I18n.t("activity.item_of", { n: 1, total: 6 }), "Item 1 of 6");
});

test("pick() prefers requested language then English", () => {
  assert.strictEqual(I18n.pick(activity.title, "es"), "¿Cognado o falso amigo?");
  assert.strictEqual(I18n.pick(activity.title, "vi"), "Cognate or False Friend?"); // fallback
});

// --- feedback: explains WHY, marks correctness ---
test("correct choice resolves to correct tone", () => {
  I18n.uiLang = "en";
  const item = activity.items[0]; // answer = "b"
  const fb = Feedback.resolve(item, "b");
  assert.strictEqual(fb.correct, true);
  assert.strictEqual(fb.tone, "correct");
  assert.ok(fb.why.length > 20, "why should explain");
});

test("wrong choice gives rethink tone + hint, never empty", () => {
  const item = activity.items[0];
  const fb = Feedback.resolve(item, "a");
  assert.strictEqual(fb.correct, false);
  assert.strictEqual(fb.tone, "rethink");
  assert.ok(fb.why.includes("false friends") || fb.why.length > 20);
  assert.ok(fb.hint.length > 0, "wrong answers offer a hint");
});

test("feedback follows UI language", () => {
  I18n.uiLang = "es";
  const fb = Feedback.resolve(activity.items[0], "b");
  assert.ok(/falsos amigos/.test(fb.why), "Spanish feedback used");
  I18n.uiLang = "en";
});

// --- data integrity the engine relies on ---
test("every item is answerable and every choice teaches", () => {
  activity.items.forEach((it) => {
    const ids = it.choices.map((c) => c.id);
    assert.ok(ids.includes(it.answer), it.id + " answer resolves");
    ids.forEach((cid) => assert.ok(it.feedback[cid] && it.feedback[cid].why, it.id + " feedback " + cid));
  });
});

// --- sort activity (Engine 2) ---
const sort = store.activities.find((a) => a.interactionType === "sort");

test("sort activity has categories and every item lands in a real bin", () => {
  I18n.uiLang = "en";
  assert.ok(sort, "a sort activity exists");
  const catIds = sort.categories.map((c) => c.id);
  assert.ok(catIds.length >= 2, "at least two bins");
  sort.items.forEach((it) => {
    assert.ok(catIds.includes(it.answer), it.id + " answer is a category id");
    const fb = it.feedback[it.answer];
    assert.ok(fb && fb.why && fb.why.en.length > 15, it.id + " explains why it belongs");
  });
});

test("sort feedback resolves through the same feedback engine", () => {
  const first = sort.items[0]; // class -> true
  const fb = Feedback.resolve(first, first.answer);
  assert.strictEqual(fb.correct, true);
  assert.ok(/cognate/i.test(fb.why));
});

test("sort covers all three relationships", () => {
  const answers = new Set(sort.items.map((it) => it.answer));
  ["true", "false", "none"].forEach((k) => assert.ok(answers.has(k), "bin used: " + k));
});

// --- second module: Academic Language Lab (reuses the MC engine) ---
const allStore = readJson("modules/academic-language-lab/data.json");
const talk = allStore.activities[0];

test("Academic Language Lab flagship is well-formed and MC-driven", () => {
  assert.strictEqual(talk.module, "academic-language-lab");
  assert.strictEqual(talk.interactionType, "multiple-choice");
  assert.ok(talk.items.length >= 5, "at least five talk-move items");
  talk.items.forEach((it) => {
    const ids = it.choices.map((c) => c.id);
    assert.ok(ids.includes(it.answer), it.id + " answerable");
    ids.forEach((cid) => assert.ok(it.feedback[cid] && it.feedback[cid].why && it.feedback[cid].why.en, it.id + " feedback " + cid));
  });
});

test("every correlated standard resolves to a known store code", () => {
  // Build the union of codes across all standards stores.
  const codes = new Set();
  ["elps", "teks-elar", "teks-slar"].forEach((f) => {
    readJson("data/standards/" + f + ".json").standards.forEach((s) => codes.add(s.code));
  });
  [talk, activity, sort].forEach((a) => {
    ["elps", "teks", "slar"].forEach((k) => {
      (a.standards[k] || []).forEach((c) => {
        assert.ok(codes.has(c.code), a.id + " → " + c.code + " must exist in a store");
      });
    });
  });
});

test("Cognate Detective activities now carry verified SLAR correlations", () => {
  assert.ok(activity.standards.slar.length >= 1, "cog-context has SLAR");
  assert.ok(sort.standards.slar.some((c) => c.code === "§128.7(b)(3)(E)"), "sort maps false friends to commonly-confused-terms code");
});

console.log(`\nsmoke.test: ${passed} passed`);
