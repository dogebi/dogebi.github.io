// 화면 동작: 제목 리빌, 복사 버튼, 체크리스트, 언어 전환.
'use strict';

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const storage = {
  read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }
};

/* ── 언어 ────────────────────────────────────────────────────────────── */
const DICT = window.__AW_I18N__ || {};
const LANGS = ['ko', 'en', 'zh', 'ja'];
const HTML_LANG = { ko: 'ko', en: 'en', zh: 'zh-Hans', ja: 'ja' };
const LANG_KEY = 'agent-field-guide-lang';
const SNAP = {};

document.querySelectorAll('[data-i18n]').forEach(el => {
  const key = el.getAttribute('data-i18n');
  if (!(key in SNAP)) SNAP[key] = el.textContent;
});

let lang = 'ko';
const t = key => {
  const dict = DICT[lang];
  if (dict && dict[key] != null) return dict[key];
  return SNAP[key] != null ? SNAP[key] : '';
};

const langBtns = [...document.querySelectorAll('.lang-btn')];
const checks = [...document.querySelectorAll('[data-check]')];
const complete = document.getElementById('complete');
const progress = document.getElementById('progress');
const copyButtons = [...document.querySelectorAll('.copy')];

function applyLang(next, persist) {
  lang = LANGS.includes(next) ? next : 'ko';
  document.documentElement.lang = HTML_LANG[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = t(el.getAttribute('data-i18n'));
    if (value) el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const value = t(el.getAttribute('data-i18n-html'));
    if (value) el.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const value = t(el.getAttribute('data-i18n-alt'));
    if (value) el.setAttribute('alt', value);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const value = t(el.getAttribute('data-i18n-aria'));
    if (value) el.setAttribute('aria-label', value);
  });

  const desc = document.querySelector('meta[name="description"]');
  if (desc && t('meta.description')) desc.content = t('meta.description');

  copyButtons.forEach(btn => { btn.textContent = t('ui.copy'); });
  langBtns.forEach(btn => btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang)));
  updateChecklist();
  if (persist) storage.write(LANG_KEY, lang);
}

langBtns.forEach(btn => btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang'), true)));

/* ── 제목 단어 리빌 ─────────────────────────────────────────────────── */
function splitTitle(title) {
  let index = 0;
  for (const node of [...title.childNodes]) {
    if (node.nodeType !== Node.TEXT_NODE) continue;
    const parts = node.textContent.split(/(\s+)/u).map(part => {
      if (!part.trim()) return document.createTextNode(part);
      const mask = document.createElement('span');
      const word = document.createElement('span');
      mask.className = 'word';
      word.style.setProperty('--i', index++);
      word.textContent = part;
      mask.append(word);
      return mask;
    });
    node.replaceWith(...parts);
  }
}
for (const title of document.querySelectorAll('[data-split]')) splitTitle(title);

/* ── 스크롤 등장 · 숫자 세기 ────────────────────────────────────────── */
const counters = [];
if (!reduced.matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver((entries, watcher) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      watcher.unobserve(target);
      if (target.dataset.count === undefined) {
        target.classList.add('visible');
        continue;
      }
      counters.push({ target, total: Number(target.dataset.count), start: null });
    }
  }, { threshold: .15 });
  for (const item of document.querySelectorAll('.reveal,[data-count]')) observer.observe(item);
}

/* ── 코드 복사 ──────────────────────────────────────────────────────── */
for (const code of document.querySelectorAll('pre > code')) {
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.className = 'copy';
  copy.textContent = t('ui.copy');
  copyButtons.push(copy);
  copy.addEventListener('click', async () => {
    let message = t('ui.copied');
    try {
      await navigator.clipboard.writeText(code.textContent);
    } catch {
      const selection = getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      message = t('ui.selected');
    }
    copy.textContent = message;
    setTimeout(() => { copy.textContent = t('ui.copy'); }, 1800);
  });
  code.before(copy);
}

/* ── 첫 연결 체크리스트 ─────────────────────────────────────────────── */
const key = 'agent-field-guide-setup';
const saved = storage.read(key, {});
let celebrated = storage.read(key + '-celebrated', false);

function updateChecklist() {
  const state = Object.fromEntries(checks.map(input => [input.dataset.check, input.checked]));
  const count = Object.values(state).filter(Boolean).length;
  storage.write(key, state);
  complete.disabled = count !== checks.length || celebrated;
  complete.textContent = t(celebrated ? 'check.completeDone' : 'check.complete');
  progress.textContent = t('check.progress')
    .replace('{0}', String(count))
    .replace('{1}', String(checks.length));
}

for (const input of checks) {
  input.checked = saved?.[input.dataset.check] === true;
  input.addEventListener('change', updateChecklist);
}

complete.addEventListener('click', () => {
  if (celebrated || !checks.every(input => input.checked)) return;
  celebrated = true;
  storage.write(key + '-celebrated', true);
  updateChecklist();
  progress.textContent = t('check.doneMessage');
});

/* ── 시작 ───────────────────────────────────────────────────────────── */
let savedLang = null;
try { savedLang = localStorage.getItem(LANG_KEY); } catch { savedLang = null; }
if (savedLang && savedLang.startsWith('"')) {
  try { savedLang = JSON.parse(savedLang); } catch {}
}
const nav = (navigator.language || 'ko').toLowerCase();
const initial = LANGS.includes(savedLang) ? savedLang
  : nav.startsWith('zh') ? 'zh'
  : nav.startsWith('ja') ? 'ja'
  : nav.startsWith('ko') ? 'ko'
  : 'en';

/* 체크 상태를 먼저 그리고, 언어를 적용한 뒤 숫자 애니메이션을 돌린다. */
for (const input of checks) input.checked = saved?.[input.dataset.check] === true;
applyLang(initial, false);

if (counters.length) {
  const count = now => {
    for (const item of counters) {
      item.start ??= now;
      const elapsed = Math.min((now - item.start) / 700, 1);
      item.target.textContent = String(Math.round(item.total * (1 - (1 - elapsed) ** 2)));
    }
    if (counters.some(item => (now - (item.start ?? now)) / 700 < 1)) requestAnimationFrame(count);
  };
  requestAnimationFrame(count);
}
