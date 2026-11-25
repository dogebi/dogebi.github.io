// 제목 리빌과 체크리스트 등 가이드의 화면 동작을 연결합니다.
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

for (const title of document.querySelectorAll('[data-split]')) {
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
      const total = Number(target.dataset.count);
      let start;
      const count = now => {
        start ??= now;
        const elapsed = Math.min((now - start) / 2000, 1);
        target.textContent = String(Math.round(total * (1 - (1 - elapsed) ** 2)));
        if (elapsed < 1) requestAnimationFrame(count);
      };
      requestAnimationFrame(count);
    }
  }, { threshold: .15 });
  for (const item of document.querySelectorAll('.reveal,[data-count]')) observer.observe(item);
}

const marquee = document.querySelector('.marquee');
const pause = document.createElement('button');
pause.type = 'button';
pause.className = 'pause';
pause.textContent = '도구 목록 애니메이션 일시정지';
pause.setAttribute('aria-pressed', 'false');
pause.hidden = reduced.matches;
reduced.addEventListener('change', () => { pause.hidden = reduced.matches; });
pause.addEventListener('click', () => {
  const paused = marquee.toggleAttribute('data-paused');
  pause.setAttribute('aria-pressed', String(paused));
  pause.textContent = paused ? '도구 목록 애니메이션 재생' : '도구 목록 애니메이션 일시정지';
});
marquee.after(pause);

for (const code of document.querySelectorAll('pre > code')) {
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.className = 'copy';
  copy.textContent = '복사';
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent);
      copy.textContent = '복사됨';
    } catch {
      const selection = getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      copy.textContent = '선택됨';
    }
  });
  code.before(copy);
}

if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  for (const button of document.querySelectorAll('.magnetic')) {
    button.addEventListener('pointermove', event => {
      if (reduced.matches || button.disabled) return;
      const rect = button.getBoundingClientRect();
      const dx = (event.clientX - rect.left - rect.width / 2) * .09;
      const dy = (event.clientY - rect.top - rect.height / 2) * .17;
      button.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  }
}

const checks = [...document.querySelectorAll('[data-check]')];
const complete = document.getElementById('complete');
const progress = document.getElementById('progress');
const key = 'agent-field-guide-setup';
const saved = storage.read(key, {});
let celebrated = storage.read(key + '-celebrated', false);

function updateChecklist() {
  const state = Object.fromEntries(checks.map(input => [input.dataset.check, input.checked]));
  const count = Object.values(state).filter(Boolean).length;
  storage.write(key, state);
  complete.disabled = count !== checks.length || celebrated;
  complete.textContent = celebrated ? '첫 연결 완료됨' : '첫 연결 완료';
  progress.textContent = count + ' / ' + checks.length + ' 항목 확인';
}
for (const input of checks) {
  input.checked = saved?.[input.dataset.check] === true;
  input.addEventListener('change', updateChecklist);
}
complete.addEventListener('click', () => {
  if (celebrated || !checks.every(input => input.checked)) return;
  const { left, top, width } = complete.getBoundingClientRect();
  celebrated = true;
  storage.write(key + '-celebrated', true);
  updateChecklist();
  progress.textContent = '첫 연결을 완료했습니다.';
  if (reduced.matches) return;
  const colors = ['#ffe28a','#d1bcff','#91dfd0','#ff9eb4'];
  for (let i = 0; i < 28; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.setAttribute('aria-hidden','true');
    piece.style.left = left + width / 2 + 'px';
    piece.style.top = top + 'px';
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty('--x', (Math.random() * 270 - 135) + 'px');
    piece.style.setProperty('--y', (Math.random() * 125 - 100) + 'px');
    piece.style.setProperty('--r', (Math.random() * 560 - 280) + 'deg');
    document.body.append(piece);
    setTimeout(() => piece.remove(), 800);
  }
});
updateChecklist();
