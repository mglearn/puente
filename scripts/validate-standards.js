#!/usr/bin/env node
/* Language Bridge — standards store validator (spec §94)
 * Checks required fields, unique codes, and flags paraphrases not yet
 * confirmed against the source text (verified: null). Verification is a
 * warning, not an error — the site can ship with "source check pending"
 * badges, but never with a malformed record.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "data", "standards");
const errors = [];
const warnings = [];

const REQUIRED = ["code", "framework", "domain", "summary", "sourceStatus", "source"];
const DOMAINS = ["listening", "speaking", "reading", "writing", "vocabulary", "language"];

if (!fs.existsSync(DIR)) { console.log("validate-standards: no standards dir, skipping."); process.exit(0); }

const seen = new Map();
let total = 0, unverified = 0;

for (const f of fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))) {
  let store;
  try { store = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")); }
  catch (e) { errors.push(`${f}: parse error ${e.message}`); continue; }

  (store.standards || []).forEach((s) => {
    total++;
    REQUIRED.forEach((k) => { if (!s[k]) errors.push(`${f} ${s.code || "?"}: missing "${k}"`); });
    if (s.domain && !DOMAINS.includes(s.domain)) errors.push(`${f} ${s.code}: unknown domain "${s.domain}"`);
    if (s.summary && s.summary.length < 12) errors.push(`${f} ${s.code}: summary too short to be plain-language`);
    if (s.code) {
      if (seen.has(s.code)) errors.push(`${f} ${s.code}: duplicate code (also in ${seen.get(s.code)})`);
      else seen.set(s.code, f);
    }
    if ("verified" in s && !s.verified) { unverified++; warnings.push(`${f} ${s.code}: paraphrase not yet verified against source`); }
  });
}

warnings.forEach((w) => console.log("  warn: " + w));
if (errors.length) {
  errors.forEach((e) => console.error("  ERROR: " + e));
  console.error(`\nvalidate-standards: ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`validate-standards: OK — ${total} standards, ${seen.size} unique codes, ${unverified} pending source check.`);
