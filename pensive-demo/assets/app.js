/* Pensive demo clone — scripted walkthrough driver.
   Every screen (panes, dialogs) is markup captured from the original demo and
   stored in window.PENSIVE_STATE by build.py. This file only assembles panes,
   runs the two progress dialogs and wires the demo's own buttons. */

(function () {
  'use strict';

  var F = window.PENSIVE_STATE;
  var app = document.getElementById('app');
  var overlay = document.getElementById('overlay');

  var SIZE = 500; // px width of the grading column, as in the original
  var state = { right: 'initial', left: 'img' };
  var modalKind = null;
  var timer = null;

  function render() {
    app.innerHTML = F.head + F['r-' + state.right] + F['l-' + state.left] + F.tail;
    var cols = app.querySelectorAll(':scope > .flex.flex-col > .w-full.h-full.overflow-hidden > .flex.flex-row-reverse > div');
    if (cols.length === 2) cols[0].setAttribute('style', 'width: ' + SIZE + 'px;');
    syncTabPanels();
  }

  // The capture keeps both tab panels mounted (they are stacked and scrolled in
  // the app). Show only the panel that belongs to the selected tab.
  function syncTabPanels() {
    var panels = app.querySelectorAll('[role="tabpanel"]');
    if (panels.length < 2) return;
    var wantStudent = state.left === 'student';
    for (var i = 0; i < panels.length; i++) {
      var isStudentSheet = !!panels[i].querySelector('img[alt^="Student work"]');
      panels[i].style.display = isStudentSheet === wantStudent ? '' : 'none';
    }
  }

  function setPanes(right, left) {
    state.right = right;
    state.left = left;
    render();
  }

  function showModal(kind) {
    modalKind = kind;
    overlay.innerHTML = F['m-' + kind];
    return overlay;
  }

  function hideModal() {
    modalKind = null;
    overlay.innerHTML = '';
  }

  // ------------------------------------------------------------------ progress
  // Both progress dialogs are step scripts in the original demo chunk:
  //   transcribe: 20 steps, each 100-200ms, progress = round(t/20*100)
  //   autograde:  0 -> 4000ms -> 33 -> 1000ms -> 67 -> 1000ms -> 100
  // The Continue button stays disabled until the last step.
  function progressModal(kind) {
    var scope = showModal(kind);
    var spans = scope.querySelectorAll('span');
    var label = null;
    for (var i = 0; i < spans.length; i++) {
      if (/^\d+%$/.test(spans[i].textContent.trim())) { label = spans[i]; break; }
    }
    var bar = scope.querySelector('div[style*="width"]');
    var btn = scope.querySelector('button');
    if (btn) { btn.disabled = true; btn.setAttribute('data-disabled', ''); }

    function setPct(pct) {
      if (modalKind !== kind) return false;
      if (label) label.textContent = pct + '%';
      if (bar) bar.style.width = pct + '%';
      return true;
    }
    function finish() {
      if (modalKind !== kind) return;
      if (btn) {
        btn.disabled = false;
        btn.removeAttribute('data-disabled');
        btn.setAttribute('tabindex', '0');
      }
    }
    return { setPct: setPct, finish: finish };
  }

  function sleep(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function runTranscribe() {
    // the original flips to a 500ms "banner" state before the dialog opens
    setTimeout(function () {
      var h = progressModal('transcribing');
      h.setPct(0);
      (async function () {
        for (var t = 1; t <= 20; t++) {
          await sleep(150 + Math.random() * 100 - 50);
          if (!h.setPct(Math.min(Math.round((t / 20) * 100), 100))) return;
        }
        h.finish();
      })();
    }, 500);
  }

  function runAutograde() {
    var h = progressModal('grading');
    h.setPct(0);
    (async function () {
      await sleep(4000);
      if (!h.setPct(33)) return;
      await sleep(1000);
      if (!h.setPct(67)) return;
      await sleep(1000);
      if (!h.setPct(100)) return;
      h.finish();
    })();
  }

  // --------------------------------------------------------------------- steps
  function stepWelcome() {
    setPanes('initial', 'img');
    showModal('welcome');
  }

  function stepBase() {
    hideModal();
    setPanes('base', 'img');
  }

  function stepTranscribed() {
    hideModal();
    setPanes('transcribed', 'answer');
  }

  function stepGraded() {
    hideModal();
    setPanes('graded', 'answer');
    timer = setTimeout(function () { showModal('review'); }, 300);
  }

  function stepReview() {
    hideModal();
    setPanes('review', 'answer');
  }

  // ------------------------------------------------------------------ listeners
  document.addEventListener('click', function (ev) {
    var btn = ev.target.closest ? ev.target.closest('button') : null;
    if (!btn) return;
    var text = btn.textContent.trim();

    if (overlay.contains(btn)) {
      switch (modalKind) {
        case 'welcome':
          if (/^Skip demo$/.test(text)) { showModal('complete'); return; }
          if (/^Start demo$/.test(text)) { showModal('about'); return; }
          break;
        case 'about':
          if (/^Let's begin$/.test(text)) { stepBase(); return; }
          break;
        case 'transcribing':
          if (/^Continue$/.test(text) && !btn.disabled) { stepTranscribed(); return; }
          break;
        case 'grading':
          if (/^Continue$/.test(text) && !btn.disabled) { stepGraded(); return; }
          break;
        case 'review':
          if (/^Continue$/.test(text)) { stepReview(); return; }
          break;
        case 'complete':
          if (/^Restart Demo$/.test(text)) { stepWelcome(); return; }
          if (/^Sign up$/.test(text)) {
            // the live demo pushes the /app/sign_up route
            window.location.href = 'https://www.pensive.com/app/sign_up';
            return;
          }
          break;
      }
      return;
    }

    if (/^Transcribe$/.test(text)) { runTranscribe(); return; }
    if (/^Autograde$/.test(text)) { runAutograde(); return; }
    if (/^Finish review$/.test(text)) {
      // the toast belongs to the review state; the graded pane has none
      setPanes('graded', state.left);
      showModal('complete');
      return;
    }
    if (/^Transcribed answer$/.test(text) && state.left !== 'answer') {
      if (state.right === 'base' || state.right === 'initial') return;
      setPanes(state.right, 'answer');
      return;
    }
    if (/^Student submission$/.test(text) && state.left !== 'student') {
      if (state.right === 'base' || state.right === 'initial') return;
      setPanes(state.right, 'student');
      return;
    }
  });

  stepWelcome();
})();
