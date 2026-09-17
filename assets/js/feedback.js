/* Language Bridge — feedback engine (spec §19)
 * Feedback explains WHY. No loud sounds, no red-only, no point deductions.
 * Resolves a chosen answer into a tone + localized explanation drawn from
 * the activity record. Language for the explanation follows the UI language,
 * with the home/support language woven into the content itself.
 */
(function (global) {
  "use strict";

  var Feedback = {
    /* item: an activity item; choiceId: the id the student picked. */
    resolve: function (item, choiceId) {
      var entry = item.feedback && item.feedback[choiceId];
      var isCorrect = choiceId === item.answer;
      var lang = I18n.uiLang;

      return {
        correct: isCorrect,
        tone: isCorrect ? "correct" : "rethink",
        head: I18n.t(isCorrect ? "feedback.correct_head" : "feedback.rethink_head"),
        why: entry ? I18n.pick(entry.why, lang) : "",
        hint: entry && entry.hint ? I18n.pick(entry.hint, lang) : ""
      };
    },

    /* Render the feedback block into `node`. */
    render: function (node, item, choiceId, opts) {
      opts = opts || {};
      var fb = this.resolve(item, choiceId);
      node.className = "feedback " + fb.tone;
      node.setAttribute("data-show", "true");
      node.setAttribute("role", "status");

      var html = '<h3>' + esc(fb.head) + '</h3><p class="why">' + esc(fb.why) + '</p>';
      if (opts.showHint && fb.hint) {
        html += '<p class="hint">💡 ' + esc(fb.hint) + '</p>';
      }
      node.innerHTML = html;
      return fb;
    },

    clear: function (node) {
      node.setAttribute("data-show", "false");
      node.innerHTML = "";
    }
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  global.Feedback = Feedback;
  if (typeof module !== "undefined" && module.exports) module.exports = Feedback;
})(typeof window !== "undefined" ? window : globalThis);
