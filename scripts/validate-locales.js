#!/usr/bin/env node
/* Language Bridge — locale validator (spec §8, §93)
 * English is the source of truth. Every other locale's keys must exist in
 * English (no orphan keys), each entry must carry a valid status, and
 * placeholder tokens like {n} must match English so interpolation is safe.
 * Reports how many strings are production-ready (published) per language.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "data", "locales");
const STATUSES = ["draft", "reviewed", "published"];
const errors = [];
const warnings = [];

function load(lang) {
  try { return JSON.parse(fs.readFileSync(path.join(DIR, lang + ".json"), "utf8")); }
  catch (e) { errors.push(`${lang}.json: ${e.message}`); return null; }
}
function tokens(s) { return (String(s).match(/\{(\w+)\}/g) || []).sort().join(","); }

const en = load("en");
if (!en) { console.error("validate-locales: en.json missing/invalid"); process.exit(1); }
const enKeys = Object.keys(en.strings || {});

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
for (const file of files) {
  const lang = file.replace(/\.json$/, "");
  const bundle = load(lang);
  if (!bundle) continue;
  const strings = bundle.strings || {};
  let published = 0, reviewed = 0, draft = 0;

  Object.keys(strings).forEach((key) => {
    const entry = strings[key];
    if (lang !== "en" && !enKeys.includes(key)) errors.push(`${file}: orphan key "${key}" not in en.json`);
    if (!entry || typeof entry.text !== "string") { errors.push(`${file} ${key}: missing text`); return; }
    if (!STATUSES.includes(entry.status)) errors.push(`${file} ${key}: invalid status "${entry.status}"`);
    if (entry.status === "published") published++;
    else if (entry.status === "reviewed") reviewed++;
    else draft++;
    // Placeholder parity against English source.
    if (en.strings[key] && tokens(en.strings[key].text) !== tokens(entry.text)) {
      errors.push(`${file} ${key}: placeholder mismatch vs en (${tokens(en.strings[key].text)} vs ${tokens(entry.text)})`);
    }
  });

  if (lang === "en") {
    const nonPub = Object.keys(strings).filter((k) => strings[k].status !== "published");
    nonPub.forEach((k) => errors.push(`en.json ${k}: source locale must be published`));
  } else {
    const missing = enKeys.filter((k) => !(k in strings));
    if (missing.length) warnings.push(`${file}: ${missing.length} key(s) fall back to English (not yet translated)`);
  }
  console.log(`  ${lang}: ${published} published, ${reviewed} reviewed, ${draft} draft (of ${enKeys.length} source keys)`);
}

warnings.forEach((w) => console.log("  warn: " + w));
if (errors.length) {
  errors.forEach((e) => console.error("  ERROR: " + e));
  console.error(`\nvalidate-locales: ${errors.length} error(s).`);
  process.exit(1);
}
console.log("validate-locales: OK");
