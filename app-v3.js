(function () {
  "use strict";

  var units = window.PY_CURRICULUM || [];
  if (!units.length) return;

  var storageKey = "py-step-state-v3";
  var oldV2 = {};
  try { oldV2 = JSON.parse(localStorage.getItem("py-step-adaptive-v2") || "{}"); } catch (e) {}

  function newUnitState(unit) {
    return {
      queue: unit.starter.slice(),
      pos: 0,
      solved: [],
      attempts: {},
      wrong: {},
      challengeSolved: [],
      challengeDrafts: {},
      challengeIndex: 0
    };
  }

  var base = { version: 3, activeUnit: 0, xp: oldV2.xp || 0, streak: oldV2.streak || 1, units: {} };
  units.forEach(function (unit) { base.units[unit.id] = newUnitState(unit); });

  var state;
  try { state = Object.assign({}, base, JSON.parse(localStorage.getItem(storageKey) || "{}")); }
  catch (e) { state = Object.assign({}, base); }
  if (state.version !== 3 || !state.units) state = Object.assign({}, base);

  units.forEach(function (unit) {
    var fresh = newUnitState(unit);
    state.units[unit.id] = Object.assign(fresh, state.units[unit.id] || {});
    if (!Array.isArray(state.units[unit.id].queue)) state.units[unit.id].queue = unit.starter.slice();
    if (!Array.isArray(state.units[unit.id].solved)) state.units[unit.id].solved = [];
    if (!Array.isArray(state.units[unit.id].challengeSolved)) state.units[unit.id].challengeSolved = [];
    if (!state.units[unit.id].challengeDrafts || typeof state.units[unit.id].challengeDrafts !== "object") state.units[unit.id].challengeDrafts = {};
  });

  if (!localStorage.getItem(storageKey) && oldV2.version === 2) {
    var first = state.units[units[0].id];
    first.queue = Array.isArray(oldV2.queue) ? oldV2.queue.slice() : first.queue;
    first.pos = Number(oldV2.pos) || 0;
    first.solved = Array.isArray(oldV2.solved) ? oldV2.solved.slice() : [];
    first.attempts = oldV2.attempts || {};
    first.wrong = oldV2.wrong || {};
    if (oldV2.challenge) first.challengeSolved = [units[0].challenges[0].id];
  }

  var activeIndex = Math.max(0, Math.min(Number(state.activeUnit) || 0, units.length - 1));
  var selected = [];
  var checked = false;

  function el(selector) { return document.querySelector(selector); }
  function els(selector) { return Array.from(document.querySelectorAll(selector)); }
  function safe(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
  }
  function save() {
    state.activeUnit = activeIndex;
    localStorage.setItem(storageKey, JSON.stringify(state));
    updateStats();
  }
  function toast(message) {
    var node = el("#toast");
    node.textContent = message;
    node.classList.add("show");
    setTimeout(function () { node.classList.remove("show"); }, 1900);
  }
  function unit() { return units[activeIndex]; }
  function unitState() { return state.units[unit().id]; }
  function questionMap() {
    var map = {};
    unit().questions.forEach(function (question) { map[question.id] = question; });
    return map;
  }
  function currentQuestion() {
    var us = unitState();
    return questionMap()[us.queue[us.pos]] || unit().questions[0];
  }
  function switchTab(id) {
    els(".tab,.tab-panel").forEach(function (node) { node.classList.remove("active"); });
    var tab = el('[data-tab="' + id + '"]');
    if (tab) tab.classList.add("active");
    var panel = el("#" + id);
    if (panel) panel.classList.add("active");
  }

  function installStyles() {
    var style = document.createElement("style");
    style.textContent = [
      ".challenge-switcher{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:0 0 20px}",
      ".challenge-select{border:1.5px solid var(--line);background:#fff;color:var(--ink);border-radius:12px;padding:11px 10px;text-align:left;font-weight:800;line-height:1.4}",
      ".challenge-select small{display:block;color:var(--muted);font-weight:500;margin-top:3px}",
      ".challenge-select.active{border-color:var(--orange);background:#fff7f2}",
      ".challenge-select.done{box-shadow:inset 0 -3px 0 var(--green)}",
      ".challenge-progress{margin:-8px 0 16px;color:var(--muted);font-size:12px}",
      ".editor::placeholder{color:#91a0ad}",
      ".stage-go{font-size:10px;color:#aab9c7}",
      "@media(max-width:700px){.challenge-switcher{grid-template-columns:1fr}.challenge-select small{display:inline;margin-left:6px}}"
    ].join("");
    document.head.appendChild(style);
  }

  function renderNavigation() {
    els(".stage").forEach(function (button, index) {
      var data = units[index];
      if (!data) return;
      button.dataset.stage = index;
      button.classList.toggle("active", index === activeIndex);
      var number = button.querySelector(".stage-no");
      var name = button.querySelector(".stage-name");
      if (number) number.textContent = String(index + 1).padStart(2, "0");
      if (name) name.innerHTML = safe(data.title) + "<small>" + safe(data.navSubtitle) + "</small>";
      var marker = button.lastElementChild;
      if (marker) {
        marker.className = "stage-go";
        marker.textContent = index === activeIndex ? "当前" : "进入";
      }
      button.onclick = function () { loadUnit(index); };
    });
  }

  function renderHeading() {
    var data = unit();
    var crumb = el(".crumb");
    if (crumb) crumb.innerHTML = "课程 / <b>" + safe(data.title) + "</b>";
    el(".eyebrow").textContent = data.eyebrow;
    el(".heading h1").textContent = data.title;
    el(".lead").textContent = data.lead;
    var count = el(".lesson-count b");
    if (count) count.textContent = String(activeIndex + 1).padStart(2, "0") + "/" + String(units.length).padStart(2, "0");
    var countLabel = el(".lesson-count small");
    if (countLabel) countLabel.textContent = "课程单元";
  }

  function renderLearn() {
    var data = unit();
    var panel = el("#learn");
    panel.innerHTML =
      "<h2>" + safe(data.learnTitle) + "</h2>" +
      '<p class="copy">' + safe(data.learnCopy) + "</p>" +
      '<div class="code">' + safe(data.example).replace(/\n/g, "<br>").replace(/  /g, "&nbsp;&nbsp;") + "</div>" +
      '<div class="tip"><i>💡</i><div><b>学习提示</b><br>' + safe(data.tip) + "</div></div>" +
      '<div class="actions"><span></span><button class="btn primary" id="startPractice">开始练习</button></div>';
    el("#startPractice").onclick = function () { switchTab("practice"); renderQuestion(); };
  }

  function renderPracticeShell() {
    el("#practice").innerHTML =
      '<div class="qtop"><span class="qtype" id="qType"></span><span class="qindex" id="qIndex"></span></div>' +
      '<div class="adaptive-note" id="adaptiveNote"></div>' +
      '<div id="questionBox"></div><div class="feedback" id="feedback"></div>' +
      '<div class="actions"><button class="btn secondary" id="prevBtn">上一题</button><button class="btn primary" id="checkBtn">检查答案</button><button class="btn primary" id="nextBtn" style="display:none">下一题</button></div>';
    el("#checkBtn").onclick = checkAnswer;
    el("#prevBtn").onclick = function () {
      var us = unitState();
      if (us.pos > 0) { us.pos--; save(); renderQuestion(); }
    };
    el("#nextBtn").onclick = function () {
      var us = unitState();
      if (us.pos < us.queue.length - 1) { us.pos++; save(); renderQuestion(); }
      else { switchTab("challenge"); renderChallenge(); }
    };
  }

  function answerText(question) {
    var answer = Array.isArray(question.answer) ? question.answer : [question.answer];
    if (question.kind === "input") return String(question.answer);
    return answer.map(function (index) { return String.fromCharCode(65 + index) + ". " + question.options[index]; }).join("、");
  }
  function userAnswerText(question) {
    if (question.kind === "input") return (el("#answerInput").value || "").trim();
    return selected.map(function (index) { return String.fromCharCode(65 + index) + ". " + question.options[index]; }).join("、");
  }
  function pendingReview() {
    var us = unitState();
    return us.queue.slice(us.pos + 1).filter(function (id) { return (us.attempts[id] || 0) > 0; }).length;
  }

  function renderQuestion() {
    var question = currentQuestion();
    var us = unitState();
    var html = "<h2>" + safe(question.title) + "</h2>";
    checked = false;
    selected = [];
    if (question.code) html += "<pre>" + safe(question.code) + "</pre>";
    if (question.kind === "choice" || question.kind === "multi") {
      html += '<div class="choices">' + question.options.map(function (option, index) {
        return '<button class="choice" data-i="' + index + '"><span class="letter">' + String.fromCharCode(65 + index) + "</span><span>" + safe(option) + "</span></button>";
      }).join("") + "</div>";
    } else {
      html += '<input class="answer" id="answerInput" autocomplete="off" placeholder="在这里输入答案">';
    }
    el("#questionBox").innerHTML = html;
    el("#qType").textContent = question.type + " · " + question.skill;
    el("#qIndex").textContent = (us.pos + 1) + " / " + us.queue.length + (us.attempts[question.id] ? " · 再练一次" : "");
    el("#adaptiveNote").innerHTML = (us.attempts[question.id] ? "<b>强化练习</b> 这道题来自错题记录。" : "<b>提示：</b>" + safe(question.hint || "先独立思考，再提交答案。"));
    el("#feedback").className = "feedback";
    el("#feedback").innerHTML = "";
    el("#checkBtn").style.display = "inline-block";
    el("#nextBtn").style.display = "none";
    el("#nextBtn").textContent = us.pos >= us.queue.length - 1 ? "进入综合挑战" : "下一题";
    el("#prevBtn").disabled = us.pos === 0;
    els(".choice").forEach(function (button) {
      button.onclick = function () {
        if (checked) return;
        var index = Number(button.dataset.i);
        if (question.kind === "choice") {
          selected = [index];
          els(".choice").forEach(function (node) { node.classList.toggle("selected", node === button); });
        } else {
          if (selected.indexOf(index) > -1) selected = selected.filter(function (item) { return item !== index; });
          else selected.push(index);
          button.classList.toggle("selected");
        }
      };
    });
    if (el("#answerInput")) el("#answerInput").onkeydown = function (event) { if (event.key === "Enter") checkAnswer(); };
    updateStats();
  }

  function scheduleReview(question) {
    var us = unitState();
    var future = us.queue.slice(us.pos + 1);
    var candidates = unit().questions.filter(function (item) {
      return item.skill === question.skill && item.id !== question.id && future.indexOf(item.id) === -1 && us.solved.indexOf(item.id) === -1;
    });
    if (candidates.length) {
      var variant = candidates[((us.wrong[question.skill] || 1) - 1) % candidates.length];
      us.queue.splice(Math.min(us.pos + 2, us.queue.length), 0, variant.id);
    }
    if (us.queue.slice(us.pos + 1).indexOf(question.id) === -1) us.queue.splice(Math.min(us.pos + 4, us.queue.length), 0, question.id);
  }

  function mistakeNote(question) {
    if (question.kind === "input") return "你填写的是“" + safe(userAnswerText(question)) + "”。请结合提示逐步检查。";
    var answers = Array.isArray(question.answer) ? question.answer : [question.answer];
    var wrongSelected = selected.filter(function (index) { return answers.indexOf(index) === -1; });
    if (question.optionNotes && wrongSelected.length) {
      return wrongSelected.map(function (index) { return "<b>" + String.fromCharCode(65 + index) + "：</b>" + safe(question.optionNotes[index]); }).join("<br>");
    }
    if (question.kind === "multi") return "多选题要选中全部正确项，同时不能多选错误项。";
    return "把题干规则与每个选项逐一核对。";
  }

  function checkAnswer() {
    var question = currentQuestion();
    var us = unitState();
    var input = el("#answerInput");
    var ok = false;
    if (question.kind === "choice") ok = selected[0] === question.answer;
    else if (question.kind === "multi") ok = selected.slice().sort().join(",") === question.answer.slice().sort().join(",");
    else ok = (input.value || "").trim().replace(/\s+/g, " ") === String(question.answer);
    if ((question.kind === "choice" || question.kind === "multi") && !selected.length) { toast("先选择答案吧"); return; }
    if (question.kind === "input" && !input.value.trim()) { toast("先写下答案吧"); return; }
    checked = true;
    if (question.kind !== "input") {
      els(".choice").forEach(function (button) {
        var index = Number(button.dataset.i);
        var answers = Array.isArray(question.answer) ? question.answer : [question.answer];
        if (answers.indexOf(index) > -1) button.classList.add("correct");
        else if (selected.indexOf(index) > -1) button.classList.add("wrong");
      });
    }
    var feedback = el("#feedback");
    if (ok) {
      var first = us.solved.indexOf(question.id) === -1;
      if (first) { us.solved.push(question.id); state.xp += 20; }
      feedback.className = "feedback show good";
      feedback.innerHTML = '<div class="feedback-title">' + (us.attempts[question.id] ? "这次答对了，已经掌握！" : "答对了！") + (first ? " +20 XP" : "") + '</div><div class="explain-row"><b>讲解：</b>' + safe(question.explain) + "</div>";
    } else {
      us.attempts[question.id] = (us.attempts[question.id] || 0) + 1;
      us.wrong[question.skill] = (us.wrong[question.skill] || 0) + 1;
      scheduleReview(question);
      feedback.className = "feedback show bad";
      feedback.innerHTML = '<div class="feedback-title">这次没答对，先把思路弄清楚</div><div class="answer-key"><b>正确答案：</b>' + safe(answerText(question)) + '</div><div class="explain-row"><b>讲解：</b>' + safe(question.explain) + '</div><div class="mistake-row"><b>针对你的答案：</b><br>' + mistakeNote(question) + '</div><div class="retry-note">已加入同知识点变式题；原题也会在稍后再次出现。</div>';
    }
    save();
    el("#checkBtn").style.display = "none";
    el("#nextBtn").style.display = "inline-block";
    el("#nextBtn").textContent = us.pos >= us.queue.length - 1 ? "进入综合挑战" : "下一题";
  }

  function renderChallengeShell() {
    var challenges = unit().challenges;
    el("#challenge").innerHTML =
      '<div class="qtop"><span class="qtype">开放式编程</span><span class="qindex" id="challengeProgress"></span></div>' +
      '<div class="challenge-switcher">' + challenges.map(function (challenge, index) {
        return '<button class="challenge-select" data-challenge="' + index + '">挑战 ' + (index + 1) + '<small>' + safe(challenge.title) + "</small></button>";
      }).join("") + "</div>" +
      '<h2 id="challengeTitle"></h2><p class="copy" id="challengeDescription"></p>' +
      '<div class="adaptive-note" id="challengePrompt"><b>编程提示</b> 请先独立拆解任务。需要帮助时再展开分步提示；提示不会提供成品代码。</div>' +
      '<textarea class="editor" id="challengeCode" spellcheck="false" placeholder="请从空白开始编写你的程序……"></textarea>' +
      '<div class="feedback" id="challengeHint"></div><div class="feedback" id="challengeFeedback"></div>' +
      '<div class="actions"><button class="btn secondary" id="showExample">查看分步提示</button><button class="btn primary" id="checkChallenge">提交作品</button></div>';
    els(".challenge-select").forEach(function (button) {
      button.onclick = function () { selectChallenge(Number(button.dataset.challenge)); };
    });
    el("#showExample").onclick = showChallengeHint;
    el("#checkChallenge").onclick = checkChallenge;
    el("#challengeCode").oninput = function () {
      var us = unitState();
      var challenge = unit().challenges[us.challengeIndex];
      us.challengeDrafts[challenge.id] = this.value;
      localStorage.setItem(storageKey, JSON.stringify(state));
    };
  }

  function selectChallenge(index) {
    var us = unitState();
    var current = unit().challenges[us.challengeIndex];
    if (el("#challengeCode") && current) us.challengeDrafts[current.id] = el("#challengeCode").value;
    us.challengeIndex = Math.max(0, Math.min(index, unit().challenges.length - 1));
    save();
    renderChallenge();
  }

  function renderChallenge() {
    if (!el("#challengeTitle")) renderChallengeShell();
    var us = unitState();
    var challenges = unit().challenges;
    us.challengeIndex = Math.max(0, Math.min(Number(us.challengeIndex) || 0, challenges.length - 1));
    var challenge = challenges[us.challengeIndex];
    el("#challengeTitle").textContent = challenge.title;
    el("#challengeDescription").textContent = challenge.prompt;
    el("#challengeCode").value = us.challengeDrafts[challenge.id] || "";
    el("#challengeHint").className = "feedback";
    el("#challengeHint").innerHTML = "";
    el("#challengeFeedback").className = "feedback";
    el("#challengeFeedback").innerHTML = "";
    el("#challengeProgress").textContent = "挑战 " + (us.challengeIndex + 1) + " / " + challenges.length + " · 已完成 " + us.challengeSolved.length + " / " + challenges.length;
    els(".challenge-select").forEach(function (button, index) {
      button.classList.toggle("active", index === us.challengeIndex);
      button.classList.toggle("done", us.challengeSolved.indexOf(challenges[index].id) > -1);
    });
  }

  function showChallengeHint() {
    var us = unitState();
    var challenge = unit().challenges[us.challengeIndex];
    var hint = el("#challengeHint");
    hint.className = "feedback show good";
    hint.innerHTML = "<b>分步提示（不是答案）</b><br>" + challenge.hints.map(function (item, index) { return (index + 1) + "．" + safe(item); }).join("<br>");
    toast("提示已展开，编辑区内容不会被改动");
  }

  function checkChallenge() {
    var us = unitState();
    var challenge = unit().challenges[us.challengeIndex];
    var code = el("#challengeCode").value;
    if (!code.trim()) { toast("请先写下你的程序"); return; }
    us.challengeDrafts[challenge.id] = code;
    var missing = challenge.checks.filter(function (check) {
      try { return !(new RegExp(check.pattern, "m")).test(code); }
      catch (e) { return true; }
    }).map(function (check) { return check.label; });
    var feedback = el("#challengeFeedback");
    var reference = (window.PY_CHALLENGE_FEEDBACK || {})[challenge.id] || {};
    if (!missing.length) {
      var first = us.challengeSolved.indexOf(challenge.id) === -1;
      if (first) { us.challengeSolved.push(challenge.id); state.xp += 50; }
      feedback.className = "feedback show good";
      feedback.innerHTML = "<b>结构检查通过！" + (first ? " +50 XP" : "") + "</b><br>下面是一份完整、可运行的参考答案。请先对照自己的写法理解差异，再用不同数据重新测试。" +
        (reference.solution ? "<pre>" + safe(reference.solution) + "</pre>" : "");
      toast("挑战完成");
    } else {
      feedback.className = "feedback show bad";
      feedback.innerHTML = "<b>这次还没有通过</b><br>需要检查：" + missing.map(safe).join("、") + "。<br><b>可以按照下面的程序结构继续完成：</b>" +
        (reference.structure ? "<pre>" + safe(reference.structure) + "</pre>" : "");
    }
    save();
    renderChallengeStatusOnly();
  }

  function renderChallengeStatusOnly() {
    var us = unitState();
    var challenges = unit().challenges;
    el("#challengeProgress").textContent = "挑战 " + (us.challengeIndex + 1) + " / " + challenges.length + " · 已完成 " + us.challengeSolved.length + " / " + challenges.length;
    els(".challenge-select").forEach(function (button, index) {
      button.classList.toggle("done", us.challengeSolved.indexOf(challenges[index].id) > -1);
    });
  }

  function updateStats() {
    var data = unit();
    var us = unitState();
    var solvedCore = data.starter.filter(function (id) { return us.solved.indexOf(id) > -1; }).length;
    var percent = Math.round(solvedCore / data.starter.length * 100);
    el("#xp").textContent = state.xp + " XP";
    el("#streak").textContent = (state.streak || 1) + " 天";
    el("#scoreText").textContent = solvedCore + " / " + data.starter.length + " · 待强化 " + pendingReview();
    el("#ring").style.setProperty("--p", percent);
    el("#ringPercent").textContent = percent + "%";
    el("#sidePercent").textContent = percent + "%";
    el("#sideBar").style.width = percent + "%";
    el("#masterTitle").textContent = percent === 100 ? "基础目标达成" : percent >= 60 ? "渐入佳境" : percent > 0 ? "正在进步" : "刚刚开始";
    el("#masterCopy").textContent = "本单元综合挑战已完成 " + us.challengeSolved.length + " / " + data.challenges.length + "；所有单元均可随时进入。";
    var labels = els(".side-label");
    if (labels.length > 1) labels[1].textContent = "本单元进度";
    var skills = el(".skills");
    if (skills) skills.innerHTML = data.skills.map(function (skill, index) { return '<div class="skill"><i>' + (index + 1) + '</i><span>' + safe(skill) + '</span><small>核心</small></div>'; }).join("");
    var skillsCount = el(".mini-head span");
    if (skillsCount) {}
  }

  function loadUnit(index) {
    activeIndex = Math.max(0, Math.min(index, units.length - 1));
    state.activeUnit = activeIndex;
    renderNavigation();
    renderHeading();
    renderLearn();
    renderPracticeShell();
    renderQuestion();
    renderChallengeShell();
    renderChallenge();
    switchTab("learn");
    save();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  installStyles();
  els(".tab").forEach(function (button) { button.onclick = function () { switchTab(button.dataset.tab); }; });
  el("#dailyBtn").onclick = function () {
    var day = new Date().toDateString();
    if (localStorage.getItem("py-step-daily-v3") !== day) {
      localStorage.setItem("py-step-daily-v3", day);
      state.xp += 10;
      save();
      toast("今日打卡成功，+10 XP");
    } else toast("今天已经打过卡啦");
  };
  el("#menuBtn").onclick = function () { el("#sidebar").classList.toggle("open"); };
  loadUnit(activeIndex);
})();

