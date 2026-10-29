/* Language Bridge — printable renderer (spec §25-27)
 * One function turns an activity record into a paper sheet (student pack or
 * answer key). Used by modules/<module>/printables.html and by the activity
 * page when a student-mode view is printed, so both always match.
 * Strings come from I18n (set I18n.uiLang to the sheet language first).
 */
(function (global) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function gradeList(grades) {
    return grades.map(function (g) { return g === 0 ? I18n.t("meta.grade_k") : g; }).join(", ");
  }

  /* opts: { activity, sheet: "student"|"answer", moduleName, manifest, base } */
  function render(opts) {
    var a = opts.activity, manifest = opts.manifest, sheet = opts.sheet || "student";
    var lang = I18n.uiLang;
    function pick(o) { return I18n.pick(o, lang); }
    // lang/dir for text that is not in the sheet language (English practice words, fallback).
    function la(o) { return I18n.langAttr(o, lang) || targetAttr(o); }
    function targetAttr(o) {
      return (lang !== "en" && o && o.en != null && pick(o) === o.en && /[a-z]/i.test(o.en)) ? ' lang="en" dir="ltr"' : "";
    }
    // Item artwork — same render gate as the engine. On the student sheet a
    // picture-match image must not name its answer, so it uses quizAlt.
    function img(it) {
      var asset = it.image && manifest && manifest.assets && manifest.assets[it.image];
      if (!asset || asset.status !== ((manifest._meta && manifest._meta.renderGate) || "available")) return "";
      var alt = (sheet === "student" && a.interactionType === "picture-match" && asset.quizAlt)
        ? pick(asset.quizAlt) : (asset.alt || "");
      return '<img class="p-img" src="' + esc(opts.base + ((manifest._meta && manifest._meta.base) || "assets/img/") + asset.file) +
        '" alt="' + esc(alt) + '">';
    }

    var head =
      '<div class="brandline"><strong>' + esc(I18n.t("site.name")) + ' · ' + esc(pick(opts.moduleName) || a.module) + '</strong>' +
      '<span' + la(a.title) + '>' + esc(pick(a.title)) + '</span></div>';
    var nameBar = '<div class="namebar"><span>' + esc(I18n.t("print.name")) + '</span><span>' + esc(I18n.t("print.date")) + '</span></div>';

    var isSort = a.interactionType === "sort";
    function answerLabel(it) {
      var pool = isSort ? a.categories : it.choices;
      var m = (pool || []).filter(function (c) { return c.id === it.answer; })[0];
      return m ? '<span' + la(m.label) + '>' + esc(pick(m.label)) + '</span>' : esc(it.answer);
    }

    // The numbered list takes its direction from the item content, so markers
    // stay on the page when English items appear on an Arabic sheet.
    var first = a.items[0] || {};
    var listAttr = isSort ? ' lang="' + esc(a.targetLanguage) + '" dir="' + I18n.dir(a.targetLanguage) + '"' : la(first.prompt);
    var body;
    if (sheet === "answer") {
      body = '<h1>' + '<span' + la(a.title) + '>' + esc(pick(a.title)) + '</span> — ' + esc(I18n.t("print.answer_key")) + '</h1>' +
        '<ol class="p-items"' + listAttr + '>' + a.items.map(function (it) {
          var fb = it.feedback[it.answer] || {};
          var lead = it.context || it.prompt;
          return '<li' + la(lead) + '>' + img(it) + '<strong>' + esc(pick(lead)) + '</strong><br>' +
            (it.context ? '<span' + la(it.prompt) + '>' + esc(pick(it.prompt)) + '</span><br>' : '') +
            '<span style="color:#087a4b">✔ ' + answerLabel(it) + '</span><br>' +
            '<em style="font-size:.85em"' + la(fb.why) + '>' + esc(pick(fb.why)) + '</em></li>';
        }).join("") + '</ol>';
    } else if (isSort) {
      body = '<h1' + la(a.title) + '>' + esc(pick(a.title)) + '</h1>' +
        '<p' + la(a.studentDirections) + '>' + esc(pick(a.studentDirections)) + '</p>' + nameBar +
        '<p><strong>' + esc(I18n.t("print.categories")) + ':</strong> ' + a.categories.map(function (c) {
          return '<span' + la(c.label) + '>' + esc(pick(c.label)) + '</span>';
        }).join(" · ") + '</p>' +
        '<ol class="p-items"' + listAttr + '>' + a.items.map(function (it) {
          return '<li lang="' + esc(a.targetLanguage) + '" dir="' + I18n.dir(a.targetLanguage) + '"><strong>' + esc(pick(it.prompt)) + '</strong> &nbsp; ' +
            '<span style="border-bottom:1px solid #999;display:inline-block;min-width:12rem">&nbsp;</span></li>';
        }).join("") + '</ol>';
    } else {
      body = '<h1' + la(a.title) + '>' + esc(pick(a.title)) + '</h1>' +
        '<p' + la(a.studentDirections) + '>' + esc(pick(a.studentDirections)) + '</p>' + nameBar +
        '<ol class="p-items"' + listAttr + '>' + a.items.map(function (it) {
          // Tag the whole item with its content language so English under an
          // Arabic sheet keeps left-to-right order (numbering, punctuation).
          return '<li' + la(it.prompt) + '>' + img(it) + (it.context ? '<strong' + la(it.context) + '>' + esc(pick(it.context)) + '</strong><br>' : '') +
            '<span' + la(it.prompt) + '>' + esc(pick(it.prompt)) + '</span>' +
            '<ol class="p-choices">' + it.choices.map(function (c) {
              return '<li' + la(c.label) + '>' + esc(pick(c.label)) + '</li>';
            }).join("") + '</ol></li>';
        }).join("") + '</ol>';
      // The "use the word in a new sentence" line is the ACE Extend step — only
      // print it for activities that actually have one.
      if (a.ace && a.ace.extend) {
        body += '<p style="margin-top:1.5rem"><strong>' + esc(I18n.t("ace.q_extend")) + '</strong></p>' +
          '<div style="border:1px solid #999;height:3rem;border-radius:6px"></div>';
      }
    }

    var std = (a.standards.elps || []).concat(a.standards.teks || [])
      .map(function (c) { return c.code; }).join(" · ");
    var foot =
      '<div class="foot">' + esc(I18n.t("meta.grade", { g: gradeList(a.grades) })) + ' · ' +
      esc(I18n.t("meta.minutes", { n: a.duration })) + ' · ELPS/TEKS: ' + esc(std) + '<br>' +
      'ACE: ' + esc(I18n.t("ace.articulate")) + ' · ' + esc(I18n.t("ace.connect")) + ' · ' + esc(I18n.t("ace.extend")) +
      ' (' + esc(I18n.t("print.local_framework")) + ') · ' +
      esc(I18n.t("print.generated", { id: a.id, date: a.updated })) + ' · ' + esc(I18n.t("print.license")) + '</div>';

    return '<section class="sheet">' + head + body + foot + '</section>';
  }

  global.Printable = { render: render, gradeList: gradeList };
})(window);
