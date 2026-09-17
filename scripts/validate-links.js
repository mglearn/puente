#!/usr/bin/env node
/* Language Bridge — internal link/asset validator (spec §16, §96).
 * Zero dependencies. Scans every HTML file for static href/src references and
 * confirms each local target exists on disk, so a broken CSS path, a renamed
 * page, or a dead inter-page link fails the build instead of the user's click.
 *
 * Scope: STATIC references only. Links built at runtime by JS (activity cards,
 * the top-nav shell) aren't in the HTML and are covered by the smoke tests and
 * data validators instead. Absolute deploy paths (/puente/...) and external
 * URLs are reported as skipped, not checked.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const IGNORE_DIRS = new Set(["node_modules", ".git", "downloads"]);
const errors = [];
let checked = 0, skipped = 0, files = 0;

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (IGNORE_DIRS.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function refs(html) {
  // Strip <script> blocks: they contain runtime-built href/src strings that
  // are not static markup (e.g. "../modules/" + id + "/activity.html").
  const markup = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  const out = [];
  const re = /(?:href|src)\s*=\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(markup))) out.push(m[1]);
  return out;
}

for (const file of walk(ROOT, [])) {
  files++;
  const dir = path.dirname(file);
  const html = fs.readFileSync(file, "utf8");
  for (let ref of refs(html)) {
    ref = ref.trim();
    if (!ref) continue;
    // Skip externals, anchors, templates, protocol-relative, absolute deploy paths.
    if (/^(https?:|mailto:|tel:|data:|#|\/|\{|<)/.test(ref)) { skipped++; continue; }
    if (ref.indexOf("{") !== -1) { skipped++; continue; } // template like ?id={id}
    const clean = ref.split("#")[0].split("?")[0];
    if (!clean) { skipped++; continue; }
    let target = path.resolve(dir, clean);
    if (clean.endsWith("/")) target = path.join(target, "index.html");
    checked++;
    if (!fs.existsSync(target)) {
      errors.push(`${path.relative(ROOT, file)} → "${ref}" (missing ${path.relative(ROOT, target)})`);
    }
  }
}

if (errors.length) {
  errors.forEach((e) => console.error("  BROKEN: " + e));
  console.error(`\nvalidate-links: ${errors.length} broken reference(s) in ${files} files.`);
  process.exit(1);
}
console.log(`validate-links: OK — ${checked} local refs resolved across ${files} files (${skipped} external/absolute skipped).`);
