/* Language Bridge — site shell
 * Builds the shared header/nav/footer, wires the language switcher, and
 * boots i18n. Each page sets window.LB_BASE to the relative path back to
 * the puente root ("" at root, "../../" inside a module) before loading.
 */
(function () {
  "use strict";

  var BASE = (typeof window.LB_BASE === "string") ? window.LB_BASE : "";
  // Languages ready to expose in the switcher for this build.
  var ENABLED = ["en", "es", "ar"];

  var NAV = [
    ["nav.activities",  "activities/"],
    ["nav.modules",     "modules/"],
    ["nav.printables",  "printables/"],
    ["nav.newcomer",    "modules/newcomer-navigator/"],
    ["nav.teacher",     "teacher/"],
    ["nav.standards",   "standards/"],
    ["nav.frameworks",  "frameworks/"],
    ["nav.about",       "about/"]
  ];

  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "html") e.innerHTML = attrs[k];
      else e.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (k) { e.appendChild(typeof k === "string" ? document.createTextNode(k) : k); });
    return e;
  }

  function buildHeader(current) {
    var brand = el("a", { class: "brand", href: BASE + "index.html" }, [
      el("span", { class: "mark", "aria-hidden": "true" }),
      el("span", { "data-i18n": "site.name" }, ["Language Bridge"])
    ]);

    var navItems = NAV.map(function (item) {
      var a = el("a", { href: BASE + item[1], "data-i18n": item[0] }, [item[0]]);
      if (current && item[1].indexOf(current) === 0) a.setAttribute("aria-current", "page");
      return el("li", null, [a]);
    });
    var nav = el("ul", { class: "nav", "aria-label": "Primary" }, navItems);

    // Language switcher — present from v1 (spec §8)
    var sel = el("select", { "aria-label": I18n.t("lang.label"), id: "lb-lang" });
    ENABLED.forEach(function (code) {
      var o = el("option", { value: code }, [I18n.locales[code].name]);
      if (code === I18n.uiLang) o.setAttribute("selected", "selected");
      sel.appendChild(o);
    });
    sel.addEventListener("change", function () { I18n.setUiLang(sel.value); });
    var lang = el("div", { class: "lang-switch header-tools" }, [sel]);

    var bar = el("div", { class: "bar" }, [brand, nav, lang]);
    return el("header", { class: "site-header" }, [bar]);
  }

  function buildFooter() {
    return el("footer", { class: "site-footer" }, [
      el("span", { "data-i18n": "privacy.note" }, ["No logins. No accounts. No student data collected."]),
      document.createTextNode(" — "),
      el("a", { href: "https://mglearn.github.io/" }, ["mglearn"]),
      el("div", { style: "margin-top:.5rem;font-size:.85em" }, [
        document.createTextNode("© 2026 TCEA, created by Miguel Guhlin · CC BY-NC 4.0 (content) · MIT (code) · "),
        el("a", { href: BASE + "about/licensing.html" }, ["Licensing"])
      ])
    ]);
  }

  function mount() {
    var header = document.querySelector("[data-shell=header]");
    var footer = document.querySelector("[data-shell=footer]");
    var current = document.body.getAttribute("data-nav") || "";
    if (header) header.replaceWith(buildHeader(current));
    if (footer) footer.replaceWith(buildFooter());
    I18n.apply();
  }

  // Keep the switcher label current after a language change.
  document.addEventListener("lb:langchange", function () {
    var sel = document.getElementById("lb-lang");
    if (sel) sel.setAttribute("aria-label", I18n.t("lang.label"));
  });

  var resolveReady;
  var ready = new Promise(function (res) { resolveReady = res; });

  window.LB = { mount: mount, base: BASE, el: el, ready: ready };

  document.addEventListener("DOMContentLoaded", function () {
    I18n.basePath(BASE).restore();
    I18n.load(ENABLED).then(function () {
      // Reflect restored language on <html> and render the shell.
      I18n.setUiLang(I18n.uiLang);
      mount();
      resolveReady(I18n);
    });
  });
})();
