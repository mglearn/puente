/* Language Bridge — i18n engine (spec §7, §8)
 *
 * Three independent language settings — never collapse them into one:
 *   uiLang      : navigation, buttons, directions, teacher text
 *   supportLang : home-language translation support / bilingual hints
 *   targetLang  : the language students are practicing (default "en")
 *
 * Translation quality control: every string carries a status
 * (draft | reviewed | published). In production only `published`
 * strings are shown; anything below the gate falls back to English,
 * which is the source locale and always published. This prevents raw
 * machine translation from ever appearing as if reviewed.
 */
(function (global) {
  "use strict";

  var LOCALES = {
    en: { name: "English",  dir: "ltr" },
    es: { name: "Español",  dir: "ltr" },
    ar: { name: "العربية",  dir: "rtl" },
    vi: { name: "Tiếng Việt", dir: "ltr" },
    "zh-Hans": { name: "简体中文", dir: "ltr" },
    ur: { name: "اردو",     dir: "rtl" },
    hi: { name: "हिन्दी",    dir: "ltr" }
  };

  var STATUS_RANK = { draft: 0, reviewed: 1, published: 2 };

  var I18n = {
    uiLang: "en",
    supportLang: "es",
    targetLang: "en",
    // Production gate. Lower to "reviewed" only in a preview/staging build.
    minStatus: "published",
    _bundles: {},   // lang -> { strings: {...} }
    _base: "",      // path prefix to /data

    locales: LOCALES,

    basePath: function (p) { this._base = p; return this; },

    /* Load one or more locale bundles. English is always required. */
    load: function (langs) {
      var self = this;
      langs = langs || ["en"];
      if (langs.indexOf("en") === -1) langs.unshift("en");
      return Promise.all(langs.map(function (lang) {
        return fetch(self._base + "data/locales/" + lang + ".json")
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (json) { if (json) self._bundles[lang] = json; })
          .catch(function () { /* missing locale is non-fatal; English covers it */ });
      })).then(function () { return self; });
    },

    _lookup: function (lang, key) {
      var b = this._bundles[lang];
      if (!b || !b.strings) return null;
      var entry = b.strings[key];
      if (!entry) return null;
      if (STATUS_RANK[entry.status] < STATUS_RANK[this.minStatus]) return null;
      return entry.text;
    },

    /* Translate a UI key with {placeholder} interpolation.
     * Falls back gracefully: requested UI lang -> English -> the key itself. */
    t: function (key, vars) {
      var text = this._lookup(this.uiLang, key);
      if (text == null) text = this._lookup("en", key);
      if (text == null) text = key;
      if (vars) {
        text = text.replace(/\{(\w+)\}/g, function (m, name) {
          return (name in vars) ? vars[name] : m;
        });
      }
      return text;
    },

    /* Pick the best available string from a per-language content object,
     * e.g. a title { en: "...", es: "..." }. Used for activity content,
     * honoring the requested language then English. */
    pick: function (obj, lang) {
      if (!obj) return "";
      lang = lang || this.uiLang;
      if (obj[lang] != null) return obj[lang];
      if (obj.en != null) return obj.en;
      // last resort: first available value
      for (var k in obj) if (obj.hasOwnProperty(k)) return obj[k];
      return "";
    },

    dir: function (lang) {
      lang = lang || this.uiLang;
      return (LOCALES[lang] && LOCALES[lang].dir) || "ltr";
    },

    /* Set the UI language, update <html lang/dir>, translate the DOM,
     * persist the choice, and notify listeners. */
    setUiLang: function (lang) {
      if (!LOCALES[lang]) return;
      this.uiLang = lang;
      var html = document.documentElement;
      html.setAttribute("lang", lang);
      html.setAttribute("dir", this.dir(lang));
      try { localStorage.setItem("lb.uiLang", lang); } catch (e) {}
      this.apply();
      document.dispatchEvent(new CustomEvent("lb:langchange", { detail: { uiLang: lang } }));
    },

    setSupportLang: function (lang) {
      this.supportLang = lang;
      try { localStorage.setItem("lb.supportLang", lang); } catch (e) {}
      document.dispatchEvent(new CustomEvent("lb:supportchange", { detail: { supportLang: lang } }));
    },

    /* Translate every element carrying a data-i18n / data-i18n-attr binding. */
    apply: function (root) {
      root = root || document;
      var self = this;
      root.querySelectorAll("[data-i18n]").forEach(function (el) {
        el.textContent = self.t(el.getAttribute("data-i18n"));
      });
      // data-i18n-attr="placeholder:some.key;aria-label:other.key"
      root.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
        el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
          var bits = pair.split(":");
          if (bits.length === 2) el.setAttribute(bits[0].trim(), self.t(bits[1].trim()));
        });
      });
    },

    /* Restore persisted preferences (call before load/apply). */
    restore: function () {
      try {
        var u = localStorage.getItem("lb.uiLang");
        var s = localStorage.getItem("lb.supportLang");
        if (u && LOCALES[u]) this.uiLang = u;
        if (s && LOCALES[s]) this.supportLang = s;
      } catch (e) {}
      return this;
    }
  };

  global.I18n = I18n;
  if (typeof module !== "undefined" && module.exports) module.exports = I18n;
})(typeof window !== "undefined" ? window : globalThis);
