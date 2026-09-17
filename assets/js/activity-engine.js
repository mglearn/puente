/* Language Bridge — activity engine (spec §18 Engine 1: Multiple Choice)
 * Data-driven. One engine renders every multiple-choice / context-choice
 * activity from its JSON record — no per-activity logic. Handles item flow,
 * support levels (§20), explanatory feedback (§19), and the ACE closing (§119).
 */
(function (global) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function pick(o) { return I18n.pick(o, I18n.uiLang); }

  // Optional artwork registry (data/image-manifest.json). An asset renders only
  // when present AND status === "available", so planned art stays dormant — no
  // broken images on the live site. LB_BASE-relative path is prepended.
  var MANIFEST = null, MANIFEST_BASE = "";
  function supportImage(key) {
    if (!key || !MANIFEST || !MANIFEST.assets) return "";
    var a = MANIFEST.assets[key];
    if (!a || a.status !== (MANIFEST._meta && MANIFEST._meta.renderGate || "available")) return "";
    var base = MANIFEST_BASE + ((MANIFEST._meta && MANIFEST._meta.base) || "assets/img/");
    return '<img class="support-img" src="' + esc(base + a.file) + '" alt="' + esc(a.alt || "") + '" ' +
      'loading="lazy" onerror="this.remove()">';
  }

  function Engine(container, activity) {
    this.root = container;
    this.activity = activity;
    this.i = 0;
    this.selected = null;
    this.checked = false;
    this.showHint = false;
    this.phase = "items"; // "items" -> "ace" -> "done"
  }

  Engine.prototype.support = function () {
    return document.body.getAttribute("data-support") || "medium";
  };

  Engine.prototype.item = function () { return this.activity.items[this.i]; };

  Engine.prototype.render = function () {
    if (this.phase === "ace") return this.renderAce();
    if (this.phase === "done") return this.renderDone();
    if (this.activity.interactionType === "sort") return this.renderSort();
    this.renderItem();
  };

  Engine.prototype.renderItem = function () {
    var item = this.item();
    var total = this.activity.items.length;
    var support = this.support();

    // Support notes (spec §20). CSS hides higher tiers at lighter levels,
    // but we only build the notes that this level should ever show.
    var supportHtml = "";
    if (item.support) {
      if (support === "high" && item.support.image) supportHtml += supportImage(item.support.image);
      if (support === "high" && item.support.high) {
        supportHtml += '<div class="support-note high"><span class="home-lang">▸</span> ' +
          esc(pick(item.support.high)) + '</div>';
      }
      if ((support === "high" || support === "medium") && item.support.medium) {
        supportHtml += '<div class="support-note medium">' + esc(pick(item.support.medium)) + '</div>';
      }
    }

    var tLang = esc(this.activity.targetLanguage);
    var contextHtml = item.context
      ? '<p class="prompt"><span class="target" lang="' + tLang + '" data-lang="' + tLang + '">' +
          esc(pick(item.context)) + '</span></p>'
      : "";

    var choicesHtml = item.choices.map(function (c) {
      return '<button class="choice" type="button" aria-pressed="false" ' +
        'data-choice="' + esc(c.id) + '">' + esc(pick(c.label)) + '</button>';
    }).join("");

    this.root.innerHTML =
      '<div class="activity-head">' +
        '<p class="progress" aria-live="polite">' + esc(I18n.t("activity.item_of", { n: this.i + 1, total: total })) + '</p>' +
        contextHtml +
        '<p class="prompt">' + esc(pick(item.prompt)) + '</p>' +
      '</div>' +
      (supportHtml ? '<div class="support">' + supportHtml + '</div>' : "") +
      '<div class="choices" role="group" aria-label="' + esc(pick(item.prompt)) + '">' + choicesHtml + '</div>' +
      '<div class="feedback" data-show="false" aria-live="polite"></div>' +
      '<div class="controls">' +
        '<button class="btn" data-act="check">' + esc(I18n.t("activity.check")) + '</button>' +
        '<button class="btn secondary" data-act="hint" hidden>' + esc(I18n.t("activity.hint")) + '</button>' +
        '<button class="btn secondary" data-act="explain" hidden>' + esc(I18n.t("activity.explain")) + '</button>' +
        '<button class="btn" data-act="next" hidden>' + esc(I18n.t("activity.next")) + '</button>' +
      '</div>';

    this.wireItem();
  };

  Engine.prototype.wireItem = function () {
    var self = this;
    var choiceBtns = this.root.querySelectorAll(".choice");
    choiceBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (self.checked && self.locked) return;
        self.selected = btn.getAttribute("data-choice");
        choiceBtns.forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
      });
    });

    this.root.querySelector('[data-act="check"]').addEventListener("click", function () { self.check(); });
    this.root.querySelector('[data-act="hint"]').addEventListener("click", function () { self.hint(); });
    this.root.querySelector('[data-act="explain"]').addEventListener("click", function () { self.explain(); });
    this.root.querySelector('[data-act="next"]').addEventListener("click", function () { self.next(); });
  };

  Engine.prototype.check = function () {
    if (!this.selected) {
      var fbEmpty = this.root.querySelector(".feedback");
      fbEmpty.className = "feedback rethink";
      fbEmpty.setAttribute("data-show", "true");
      fbEmpty.innerHTML = "<p class=\"why\">" + esc(I18n.t("activity.select_first")) + "</p>";
      return;
    }
    var item = this.item();
    var fb = Feedback.render(this.root.querySelector(".feedback"), item, this.selected, { showHint: this.showHint });
    this.checked = true;

    // Mark the chosen button; on correct, lock and reveal the answer.
    var self = this;
    this.root.querySelectorAll(".choice").forEach(function (b) {
      var id = b.getAttribute("data-choice");
      if (id === self.selected) b.setAttribute("data-state", fb.correct ? "correct" : "rethink");
      if (fb.correct && id === item.answer) b.setAttribute("data-state", "correct");
    });

    var checkBtn = this.root.querySelector('[data-act="check"]');
    var nextBtn = this.root.querySelector('[data-act="next"]');
    var hintBtn = this.root.querySelector('[data-act="hint"]');
    var explainBtn = this.root.querySelector('[data-act="explain"]');

    if (fb.correct) {
      this.locked = true;
      checkBtn.hidden = true;
      hintBtn.hidden = true;
      explainBtn.hidden = true;
      nextBtn.hidden = false;
      nextBtn.textContent = (this.i + 1 < this.activity.items.length)
        ? I18n.t("activity.next") : I18n.t("activity.next");
      nextBtn.focus();
    } else {
      // Keep trying — offer hint + explain, relabel Check as Try again.
      checkBtn.textContent = I18n.t("activity.try_again");
      hintBtn.hidden = false;
      explainBtn.hidden = false;
    }
  };

  Engine.prototype.hint = function () {
    this.showHint = true;
    if (this.selected) Feedback.render(this.root.querySelector(".feedback"), this.item(), this.selected, { showHint: true });
  };

  // Explain reveals the correct answer and its reasoning.
  Engine.prototype.explain = function () {
    var item = this.item();
    Feedback.render(this.root.querySelector(".feedback"), item, item.answer, { showHint: false });
    var self = this;
    this.root.querySelectorAll(".choice").forEach(function (b) {
      if (b.getAttribute("data-choice") === item.answer) b.setAttribute("data-state", "correct");
    });
    this.locked = true;
    this.root.querySelector('[data-act="check"]').hidden = true;
    this.root.querySelector('[data-act="hint"]').hidden = true;
    this.root.querySelector('[data-act="explain"]').hidden = true;
    this.root.querySelector('[data-act="next"]').hidden = false;
  };

  Engine.prototype.next = function () {
    this.selected = null; this.checked = false; this.locked = false; this.showHint = false;
    if (this.i + 1 < this.activity.items.length) {
      this.i++;
      this.renderItem();
    } else {
      this.phase = this.activity.ace && (this.activity.ace.articulate || this.activity.ace.connect || this.activity.ace.extend)
        ? "ace" : "done";
      this.render();
    }
  };

  // ---- Sort engine (spec §18 Engine 2, §39B) ----
  // Data-driven, keyboard- and touch-first (no drag-only). Each word card
  // carries a group of category buttons; Check grades every placement and
  // explains why each correct word belongs where it does.
  Engine.prototype.renderSort = function () {
    var a = this.activity;
    if (!this.placements) this.placements = {};
    if (!this.locked) this.locked = {};
    var support = this.support();

    var legend = '<div class="sort-legend" aria-hidden="true">' + a.categories.map(function (c) {
      return '<span class="chip">' + esc(pick(c.label)) + '</span>';
    }).join("") + '</div>';

    var self = this;
    var cards = a.items.map(function (it) {
      var placed = self.placements[it.id];
      var isLocked = !!self.locked[it.id];

      var supportHtml = "";
      if (it.support) {
        if (support === "high" && it.support.image) supportHtml += supportImage(it.support.image);
        if (support === "high" && it.support.high)
          supportHtml += '<div class="support-note high"><span class="home-lang">▸</span> ' + esc(pick(it.support.high)) + '</div>';
        if ((support === "high" || support === "medium") && it.support.medium)
          supportHtml += '<div class="support-note medium">' + esc(pick(it.support.medium)) + '</div>';
      }

      var bins = a.categories.map(function (c) {
        var on = placed === c.id;
        return '<button class="sort-bin choice" type="button" ' +
          'aria-pressed="' + (on ? "true" : "false") + '" ' +
          (isLocked ? 'disabled ' : '') +
          'data-item="' + esc(it.id) + '" data-cat="' + esc(c.id) + '">' + esc(pick(c.label)) + '</button>';
      }).join("");

      var wLang = esc(a.targetLanguage);
      return '<div class="sort-card" data-card="' + esc(it.id) + '">' +
        '<div class="sort-word prompt" lang="' + wLang + '">' + esc(pick(it.prompt)) + '</div>' +
        (supportHtml ? '<div class="support">' + supportHtml + '</div>' : "") +
        '<div class="sort-bins" role="group" aria-label="' + esc(pick(it.prompt)) + '">' + bins + '</div>' +
        '<div class="sort-fb" data-show="false" aria-live="polite"></div>' +
      '</div>';
    }).join("");

    this.root.innerHTML =
      '<div class="activity-head"><p class="progress" data-role="progress" aria-live="polite"></p></div>' +
      legend +
      '<div class="sort-cards">' + cards + '</div>' +
      '<div class="feedback" data-show="false" data-role="summary" aria-live="polite"></div>' +
      '<div class="controls">' +
        '<button class="btn" data-act="check">' + esc(I18n.t("activity.check")) + '</button>' +
        '<button class="btn" data-act="continue" hidden>' + esc(I18n.t("activity.next")) + '</button>' +
      '</div>';

    this.wireSort();
    this.updateSortProgress();
  };

  Engine.prototype.wireSort = function () {
    var self = this;
    this.root.querySelectorAll(".sort-bin").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-item");
        if (self.locked[id]) return;
        self.placements[id] = btn.getAttribute("data-cat");
        self.root.querySelectorAll('.sort-bin[data-item="' + id + '"]').forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
          b.removeAttribute("data-state"); // clear any prior rethink marking
        });
        // Hide this card's stale feedback until the next Check.
        var card = self.root.querySelector('.sort-card[data-card="' + id + '"]');
        var fbNode = card && card.querySelector(".sort-fb");
        if (fbNode) fbNode.setAttribute("data-show", "false");
        self.updateSortProgress();
      });
    });
    this.root.querySelector('[data-act="check"]').addEventListener("click", function () { self.checkSort(); });
    this.root.querySelector('[data-act="continue"]').addEventListener("click", function () {
      self.phase = (self.activity.ace && (self.activity.ace.articulate || self.activity.ace.connect || self.activity.ace.extend)) ? "ace" : "done";
      self.render();
    });
  };

  Engine.prototype.updateSortProgress = function () {
    var total = this.activity.items.length;
    var placed = Object.keys(this.placements).length;
    var correct = Object.keys(this.locked).length;
    var el = this.root.querySelector('[data-role="progress"]');
    if (el) el.textContent = correct
      ? correct + " / " + total + " ✓"
      : placed + " / " + total;
  };

  Engine.prototype.checkSort = function () {
    var self = this;
    var a = this.activity;
    var placedAll = a.items.every(function (it) { return self.placements[it.id]; });
    var summary = this.root.querySelector('[data-role="summary"]');

    if (!placedAll) {
      summary.className = "feedback rethink";
      summary.setAttribute("data-show", "true");
      summary.innerHTML = '<p class="why">' + esc(I18n.t("activity.select_first")) + '</p>';
      return;
    }

    var wrong = 0;
    a.items.forEach(function (it) {
      if (self.locked[it.id]) return;
      var card = self.root.querySelector('.sort-card[data-card="' + it.id + '"]');
      var fbNode = card.querySelector(".sort-fb");
      var chosen = self.placements[it.id];
      var correct = chosen === it.answer;
      var entry = it.feedback[it.answer] || {};

      // Color the chosen bin.
      card.querySelectorAll(".sort-bin").forEach(function (b) {
        if (b.getAttribute("data-cat") === chosen) b.setAttribute("data-state", correct ? "correct" : "rethink");
      });

      fbNode.setAttribute("data-show", "true");
      if (correct) {
        self.locked[it.id] = true;
        card.querySelectorAll(".sort-bin").forEach(function (b) { b.disabled = true; });
        fbNode.className = "sort-fb feedback correct";
        fbNode.innerHTML = '<p class="why">' + esc(pick(entry.why)) + '</p>';
      } else {
        wrong++;
        fbNode.className = "sort-fb feedback rethink";
        var hint = entry.hint ? '<p class="hint">💡 ' + esc(pick(entry.hint)) + '</p>' : "";
        fbNode.innerHTML = '<p class="why">' + esc(I18n.t("feedback.rethink_head")) + '</p>' + hint;
        // The rethink marking on the chosen bin stays until the student re-places it.
      }
    });

    this.updateSortProgress();

    if (wrong === 0) {
      summary.className = "feedback correct";
      summary.setAttribute("data-show", "true");
      summary.innerHTML = '<p class="why">' + esc(I18n.t("done.head")) + '</p>';
      this.root.querySelector('[data-act="check"]').hidden = true;
      var cont = this.root.querySelector('[data-act="continue"]');
      cont.hidden = false; cont.focus();
    } else {
      summary.setAttribute("data-show", "false");
    }
  };

  // ACE closing reflection (spec §119). Student-facing, ungraded, not stored.
  Engine.prototype.renderAce = function () {
    var a = this.activity.ace || {};
    var steps = "";
    if (a.articulate) steps += aceStep("ace.articulate", "ace.q_articulate", "textarea");
    if (a.connect)    steps += aceStep("ace.connect", "ace.q_connect", "text");
    if (a.extend)     steps += aceStep("ace.extend", "ace.q_extend", "textarea");

    this.root.innerHTML =
      '<div class="ace-close">' +
        '<h2>' + esc(I18n.t("ace.done_head")) + '</h2>' +
        steps +
        '<div class="controls">' +
          '<button class="btn" data-act="finish">' + esc(I18n.t("activity.next")) + '</button>' +
        '</div>' +
      '</div>';
    var self = this;
    this.root.querySelector('[data-act="finish"]').addEventListener("click", function () {
      self.phase = "done"; self.render();
    });

    function aceStep(tagKey, qKey, field) {
      var input = field === "textarea"
        ? '<textarea rows="2"></textarea>'
        : '<input type="text">';
      return '<div class="ace-step">' +
        '<label><span class="ace-tag">' + esc(I18n.t(tagKey).toUpperCase()) + '</span><br>' +
        esc(I18n.t(qKey)) + '</label>' + input + '</div>';
    }
  };

  Engine.prototype.renderDone = function () {
    this.root.innerHTML =
      '<div class="done">' +
        '<h2>' + esc(I18n.t("done.head")) + '</h2>' +
        '<p>' + esc(I18n.t("privacy.note")) + '</p>' +
        '<div class="controls" style="justify-content:center">' +
          '<button class="btn secondary" data-act="again">' + esc(I18n.t("done.again")) + '</button>' +
        '</div>' +
      '</div>';
    var self = this;
    this.root.querySelector('[data-act="again"]').addEventListener("click", function () {
      self.i = 0; self.phase = "items"; self.selected = null;
      self.checked = false; self.locked = false; self.showHint = false;
      self.render();
    });
  };

  var ActivityEngine = {
    // Register the optional artwork manifest (data/image-manifest.json).
    // base is the LB_BASE-relative prefix to the puente root.
    setManifest: function (manifest, base) { MANIFEST = manifest; MANIFEST_BASE = base || ""; return this; },
    mount: function (container, activity) {
      var engine = new Engine(container, activity);
      engine.render();
      // Re-render on UI language change so live content follows the switcher.
      document.addEventListener("lb:langchange", function () { engine.render(); });
      // Re-render on support-level change.
      document.addEventListener("lb:supportchange", function () {
        if (engine.phase === "items") engine.renderItem();
      });
      return engine;
    }
  };

  global.ActivityEngine = ActivityEngine;
})(window);
