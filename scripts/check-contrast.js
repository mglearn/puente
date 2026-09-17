#!/usr/bin/env node
/* Language Bridge — WCAG contrast check for the design tokens (spec §29).
 * Zero deps. Reads the real hex values from assets/css/tokens.css so it can't
 * drift from the stylesheet, then checks the text/background pairs the UI uses
 * against WCAG 2.1 AA: 4.5:1 normal text, 3:1 large text / UI components.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const css = fs.readFileSync(path.resolve(__dirname, "../assets/css/tokens.css"), "utf8");
const TOK = {};
css.replace(/--([\w-]+)\s*:\s*(#[0-9a-fA-F]{6})/g, (_, k, v) => { TOK[k] = v; return _; });
const t = (name) => {
  if (!TOK[name]) throw new Error("token not found: --" + name);
  return TOK[name];
};

function lum(hex) {
  const n = hex.replace("#", "");
  const c = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function ratio(a, b) {
  const l1 = lum(a), l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// [name, fg, bg, minimum]  — 3.0 for large text / UI; 4.5 for normal text.
const PAIRS = [
  ["body text on pale panel",      t("body"),       t("pale"),      4.5],
  ["body text on white",           t("body"),       t("white"),     4.5],
  ["navy heading on white",        t("navy"),       t("white"),     4.5],
  ["teal text on white",           t("teal"),       t("white"),     4.5],
  ["ink-soft meta on white",       t("ink-soft"),   t("white"),     4.5],
  ["white on blue button",         t("white"),      t("blue"),      4.5],
  ["white on navy hover",          t("white"),      t("navy-tcea"), 4.5],
  ["navy on gold (pressed)",       t("navy"),       t("gold"),      3.0],
  ["local-tag amber on cream",     "#8a5612",       t("rethink-bg"),4.5],
  ["ok teal border on mint",       t("ok"),         t("ok-bg"),     3.0],
  ["link blue on white",           t("blue"),       t("white"),     4.5]
];

let fails = 0;
for (const [name, fg, bg, min] of PAIRS) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) fails++;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${r.toFixed(2)}:1  (need ${min})  ${name}  [${fg} on ${bg}]`);
}
console.log(fails ? `\ncheck-contrast: ${fails} pair(s) below AA` : "\ncheck-contrast: all pairs meet WCAG AA");
process.exit(fails ? 1 : 0);
