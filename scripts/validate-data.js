#!/usr/bin/env node
/* Language Bridge — activity data validator (spec §95, §103)
 * Zero dependencies. Enforces the invariants the shared engine relies on:
 * every item is answerable, every choice teaches (has feedback), every
 * standard correlation resolves to a real code and states its rationale.
 * Exits non-zero on any error so CI / pre-commit can gate it.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); }
  catch (e) { err(`Cannot parse ${p}: ${e.message}`); return null; }
}

// Build the set of known official standard codes from the standards stores.
function loadStandardCodes() {
  const codes = new Set();
  const dir = path.join(ROOT, "data", "standards");
  if (!fs.existsSync(dir)) return codes;
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const store = readJson(path.join(dir, f));
    (store && store.standards || []).forEach((s) => codes.add(s.code));
  }
  return codes;
}

function hasEn(obj, where) {
  if (!obj || typeof obj !== "object" || typeof obj.en !== "string" || !obj.en.trim()) {
    err(`${where}: missing required English ("en") text`);
    return false;
  }
  return true;
}

function validateActivity(act, file, codes) {
  const at = `${file} [${act.id || "?"}]`;
  const required = ["id", "module", "title", "grades", "gradeBand", "duration",
    "interactionType", "targetLanguage", "supportedHomeLanguages", "items",
    "ace", "clear", "udl", "strategies", "standards", "status"];
  required.forEach((k) => { if (!(k in act)) err(`${at}: missing field "${k}"`); });

  if (!/^[a-z0-9-]+$/.test(act.id || "")) err(`${at}: id must be kebab-case`);
  hasEn(act.title, `${at} title`);
  hasEn(act.studentGoal, `${at} studentGoal`);

  // Interaction shape: sort uses activity-level categories; choice types use per-item choices.
  const isSort = act.interactionType === "sort";
  let categoryIds = [];
  if (isSort) {
    if (!Array.isArray(act.categories) || act.categories.length < 2) {
      err(`${at}: sort activity needs >=2 categories`);
    } else {
      categoryIds = act.categories.map((c) => c.id);
      act.categories.forEach((c) => hasEn(c.label, `${at} category ${c.id}`));
      if (new Set(categoryIds).size !== categoryIds.length) err(`${at}: duplicate category ids`);
    }
  }

  // Items
  if (!Array.isArray(act.items) || !act.items.length) {
    err(`${at}: needs at least one item`);
  } else act.items.forEach((it, i) => {
    const iat = `${at} item#${i + 1}(${it.id || "?"})`;
    hasEn(it.prompt, `${iat} prompt`);

    if (isSort) {
      // answer is a category id; feedback for the correct category must explain WHY it belongs (§19).
      if (!categoryIds.includes(it.answer)) err(`${iat}: answer "${it.answer}" is not a category id`);
      const fb = it.feedback && it.feedback[it.answer];
      if (!fb) err(`${iat}: no feedback for correct category "${it.answer}"`);
      else hasEn(fb.why, `${iat} feedback[${it.answer}].why`);
    } else {
      if (!Array.isArray(it.choices) || it.choices.length < 2) err(`${iat}: needs >=2 choices`);
      const ids = (it.choices || []).map((c) => c.id);
      (it.choices || []).forEach((c) => hasEn(c.label, `${iat} choice ${c.id}`));
      if (!ids.includes(it.answer)) err(`${iat}: answer "${it.answer}" is not a choice id`);
      if (new Set(ids).size !== ids.length) err(`${iat}: duplicate choice ids`);

      // Feedback must teach WHY for the correct answer AND every distractor (§19).
      ids.forEach((cid) => {
        const fb = it.feedback && it.feedback[cid];
        if (!fb) return err(`${iat}: no feedback for choice "${cid}" (every choice must explain why)`);
        hasEn(fb.why, `${iat} feedback[${cid}].why`);
      });
      const correctFb = it.feedback && it.feedback[it.answer];
      if (correctFb && correctFb.correct !== true) warn(`${iat}: feedback[${it.answer}].correct should be true`);
    }
  });

  // Standards correlations resolve + justify (§22).
  const std = act.standards || {};
  ["elps", "teks", "slar"].forEach((k) => {
    (std[k] || []).forEach((corr) => {
      if (!codes.has(corr.code)) err(`${at}: standard "${corr.code}" not found in any standards store`);
      if (!corr.rationale || corr.rationale.length < 12) err(`${at}: "${corr.code}" needs a one-sentence rationale`);
      if (!["direct", "supporting"].includes(corr.alignment)) err(`${at}: "${corr.code}" alignment must be direct|supporting`);
    });
  });
  if (!std.elps || !std.teks) err(`${at}: standards must include elps and teks arrays`);
}

// ---- run ----
const codes = loadStandardCodes();
const dataFiles = [];
const modulesDir = path.join(ROOT, "modules");
if (fs.existsSync(modulesDir)) {
  for (const m of fs.readdirSync(modulesDir)) {
    const p = path.join(modulesDir, m, "data.json");
    if (fs.existsSync(p)) dataFiles.push(p);
  }
}

let count = 0;
dataFiles.forEach((p) => {
  const store = readJson(p);
  if (!store) return;
  const acts = store.activities || [store];
  acts.forEach((a) => { validateActivity(a, path.relative(ROOT, p), codes); count++; });
});

warnings.forEach((w) => console.log("  warn: " + w));
if (errors.length) {
  errors.forEach((e) => console.error("  ERROR: " + e));
  console.error(`\nvalidate-data: ${errors.length} error(s) across ${count} activit(y/ies).`);
  process.exit(1);
}
console.log(`validate-data: OK — ${count} activit(y/ies), ${warnings.length} warning(s), ${codes.size} known standard codes.`);
