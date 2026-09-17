/* Language Bridge — standards resolver & teacher drawer (spec §21–§23)
 * Loads the official standards stores, resolves an activity's correlation
 * codes into plain-language summaries, and renders the teacher "Standards
 * Addressed" drawer. Official standards (ELPS/TEKS) are kept separate from
 * local frameworks (ACE/CLEAR) and always labeled as official.
 */
(function (global) {
  "use strict";

  var Standards = {
    _stores: {},   // filename -> parsed store
    _index: {},    // code -> standard object
    _base: "",

    basePath: function (p) { this._base = p; return this; },

    load: function (files) {
      var self = this;
      files = files || ["elps", "teks-elar"];
      return Promise.all(files.map(function (name) {
        return fetch(self._base + "data/standards/" + name + ".json")
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (store) {
            if (!store) return;
            self._stores[name] = store;
            (store.standards || []).forEach(function (s) { self._index[s.code] = s; });
          })
          .catch(function () {});
      })).then(function () { return self; });
    },

    get: function (code) { return this._index[code] || null; },

    /* Build the teacher standards drawer for one activity. */
    renderDrawer: function (activity) {
      var s = activity.standards || {};
      var groups = [
        ["std.elps", s.elps],
        ["std.teks", s.teks],
        ["std.slar", s.slar]
      ];
      var body = "";
      var self = this;

      groups.forEach(function (g) {
        var label = I18n.t(g[0]);
        var list = g[1] || [];
        if (!list.length) return;
        body += '<h4 class="tag-official">' + esc(label) + '</h4>';
        body += '<div class="std-list">';
        list.forEach(function (corr) {
          var std = self.get(corr.code) || {};
          var align = I18n.t(corr.alignment === "direct" ? "std.direct" : "std.supporting");
          var unverified = ("verified" in std && !std.verified)
            ? ' <span class="tstatus" title="Paraphrase not yet confirmed against source">· source check pending</span>'
            : '';
          body +=
            '<div class="panel accent" style="margin:.5rem 0">' +
              '<div class="row spread">' +
                '<strong>' + esc(corr.code) + '</strong>' +
                '<span class="chip official">' + esc(align) + '</span>' +
              '</div>' +
              '<p style="margin:.4rem 0 0">' + esc(std.summary || "") + unverified + '</p>' +
              '<p style="margin:.4rem 0 0;font-size:.85rem;color:var(--ink-soft)"><em>' +
                esc(I18n.t("std.rationale")) + ':</em> ' + esc(corr.rationale) + '</p>' +
            '</div>';
        });
        body += '</div>';
      });

      if (!body) body = "<p>—</p>";
      body += '<p style="font-size:.8rem;color:var(--ink-soft)">' +
        esc(I18n.t("std.official")) +
        ' · 19 TAC Ch. 120 (ELPS) / Ch. 110 (TEKS).</p>';
      return body;
    }
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  global.Standards = Standards;
})(window);
