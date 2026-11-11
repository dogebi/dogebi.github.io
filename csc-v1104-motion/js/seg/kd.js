/* seg/kd.js — 02 課題：重、繁、危，最后都压在人身上 */
window.SEG = window.SEG || {};
window.SEG.kd = (ctx, K, TX, H, win) => {
  const { tl, cue, scene, onFrame, W, H: SH, gsap, HS, node, D, S, E, w, rand } = H;

  // ── S07 · kd01 kd02 — 重：托盘里的纸堆长过桌面 ──────────────────────────
  const s07 = node(`<section class="scene" id="s-kd-01">
    <div class="cam">
      <div class="kd-kick kicker" style="position:absolute;left:104px;top:210px">第一个字</div>
      <div class="kd-zi stencil red" style="position:absolute;left:88px;top:250px;font-size:300px">重</div>
      <div class="kd-sub head" style="position:absolute;left:430px;top:300px;width:760px;font-size:64px">
        量翻一倍，<span class="hl">人就得翻一倍</span>
      </div>
      <div class="kd-note sub" style="position:absolute;left:436px;top:440px;width:720px;font-size:36px">
        业务还在持续增长，人力的投入是线性的 —— 这条路已经到瓶颈
      </div>
      <div class="kd-tray" style="position:absolute;right:150px;bottom:120px;width:520px;height:420px"></div>
    </div>
  </section>`);
  const tray = s07.querySelector('.kd-tray');
  const sheets = [];
  for (let i = 0; i < 11; i++) {
    const sh = document.createElement('div');
    sh.className = 'paper';
    sh.style.cssText = `left:${18 + (i % 3) * 6}px;bottom:${12 + i * 22}px;width:470px;height:${150 + (i % 4) * 16}px;padding:16px 20px;transform:rotate(${(i % 5) - 2}deg)`;
    sh.innerHTML = `<div class="p-meta">工单 · ${41000 + i * 7}</div>
      <div class="p-line" style="font-size:21px">${['设备变更 · 窗口申请', '线路故障 · 专线丢包', '安全审核 · 变更记录', '邮件收发异常 · O365', '监控告警 · 线路中断'][i % 5]}</div>`;
    tray.appendChild(sh);
    sheets.push(sh);
  }
  gsap.set(sheets, { autoAlpha: 0, y: 40 });
  const trayEl = document.createElement('div');
  trayEl.style.cssText = 'position:absolute;left:0;right:0;bottom:0;height:74px;background:linear-gradient(180deg,#1A2334,#0A0F19);box-shadow:0 26px 50px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.18)';
  tray.appendChild(trayEl);

  tl.from(s07.querySelector('.kd-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'kd01')
    .from(s07.querySelector('.kd-sub'), { autoAlpha: 0, y: 26, duration: 0.8, ease: 'expo.out' }, 'kd02')
    .from(s07.querySelector('.kd-note'), { autoAlpha: 0, y: 20, duration: 0.7 }, 'kd02+=0.7')
    .to(sheets, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.16, ease: 'power2.out' }, 'kd02+=0.2');

  tl.fromTo(HS, { pan: -20, zoom: 1.06, light: 0.85, drop: 45 },
    { pan: -60, zoom: 1.13, light: 0.7, drop: 55, duration: 8, ease: 'sine.inOut' }, S('kd01'));
  scene(s07, win.a, S('kd03') + 0.4);
  tl.to(s07, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('kd03') - 0.2);

  // ── S08 · kd03 kd04 — 繁：线槽里的线缠成一片 ────────────────────────────
  const s08 = node(`<section class="scene" id="s-kd-02">
    <div class="cam">
      <svg class="kd-wires" width="1920" height="1080" style="position:absolute;left:0;top:0"></svg>
      <div class="kd2-kick kicker" style="position:absolute;left:104px;top:196px">第二个字</div>
      <div class="kd-zi stencil" style="position:absolute;left:88px;top:232px;font-size:250px">繁</div>
      <div class="kd2-lead head" style="position:absolute;left:104px;bottom:210px;width:900px;font-size:54px">
        申报千变万化，日志源太多<br><span class="hl-blue">格式不统一，接口也不一样</span>
      </div>
    </div>
  </section>`);
  const wireSvg = s08.querySelector('.kd-wires');
  const rw = rand(4242);
  const wireG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  wireSvg.appendChild(wireG);
  for (let i = 0; i < 46; i++) {
    const y0 = 120 + rw() * 800;
    const x0 = 900 + rw() * 200;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const c1x = 1100 + rw() * 500, c1y = y0 + (rw() - 0.5) * 500;
    const c2x = 1450 + rw() * 380, c2y = y0 + (rw() - 0.5) * 620;
    path.setAttribute('d', `M${x0.toFixed(0)} ${y0.toFixed(0)} C ${c1x.toFixed(0)} ${c1y.toFixed(0)}, ${c2x.toFixed(0)} ${c2y.toFixed(0)}, 1960 ${(y0 + (rw() - 0.5) * 260).toFixed(0)}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', i % 7 === 0 ? 'rgba(255,120,100,.45)' : `rgba(120,150,200,${(0.18 + rw() * 0.22).toFixed(2)})`);
    path.setAttribute('stroke-width', (1 + rw() * 2.4).toFixed(1));
    wireG.appendChild(path);
  }
  const tags = [];
  [['日志源不一致', 1120, 300], ['格式不统一', 1420, 470], ['接口差异大', 1240, 690], ['技术栈升级', 1580, 800]].forEach(([t, x, y]) => {
    const p = D.plate(t, '', `left:${x}px;top:${y}px;font-size:23px`);
    s08.querySelector('.cam').appendChild(p);
    tags.push(p);
  });
  gsap.set(tags, { autoAlpha: 0, y: 14 });
  gsap.set(wireG, { autoAlpha: 0 });
  tl.from(s08.querySelector('.kd2-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'kd03')
    .to(wireG, { autoAlpha: 1, duration: 1.6, ease: 'power2.out' }, 'kd03+=0.1')
    .from(s08.querySelector('.kd2-lead'), { autoAlpha: 0, y: 24, duration: 0.8 }, 'kd03+=0.5')
    .to(tags, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.5, ease: 'power2.out' }, 'kd04+=0.1');

  tl.fromTo(HS, { pan: 40, zoom: 1.0, light: 0.8 }, { pan: -90, zoom: 1.07, light: 0.72, duration: 9, ease: 'sine.inOut' }, S('kd03'));
  scene(s08, S('kd03') - 0.4, S('kd05') + 0.4);
  tl.to(s08, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('kd05') - 0.2);

  // ── S09 · kd05 kd06 kd07 — 危：警示灯扫过全厅，MTTR 表针在走 ────────────
  const s09 = node(`<section class="scene" id="s-kd-03">
    <div class="cam">
      <div class="kd3-kick kicker" style="position:absolute;left:104px;top:196px">第三个字</div>
      <div class="kd-zi stencil red" style="position:absolute;left:88px;top:232px;font-size:250px">危</div>
      <div class="kd3-a sub" style="position:absolute;left:104px;top:560px;width:640px;font-size:40px;color:#E4EAF6">
        人不好培养，能上手的人<br>又忙到稼动率见底
      </div>
      <div class="kd3-b sub" style="position:absolute;left:104px;top:700px;width:680px;font-size:40px;color:#E4EAF6">
        MTTR 的要求在提高 ——<br>从发现到恢复的平均时长
      </div>
      <div class="kd3-c sub" style="position:absolute;left:104px;top:850px;width:720px;font-size:40px;color:#FFB7AC">
        告警积压 → 研判周期长 → 响应滞后
      </div>
      <div class="kd-mttr" style="position:absolute;right:170px;top:300px;width:460px;height:460px"></div>
    </div>
  </section>`);
  const dial = s09.querySelector('.kd-mttr');
  dial.innerHTML = `<svg width="460" height="460" viewBox="0 0 460 460">
    <circle cx="230" cy="230" r="196" fill="rgba(9,14,24,.72)" stroke="rgba(160,190,240,.18)" stroke-width="1.5"/>
    <circle cx="230" cy="230" r="160" fill="none" stroke="rgba(255,77,61,.30)" stroke-width="10"
            stroke-dasharray="502 502" stroke-linecap="round" transform="rotate(135 230 230)"/>
    ${Array.from({ length: 13 }, (_, i) => {
      const a = (-135 + i * 22.5) * Math.PI / 180;
      const x1 = 230 + Math.cos(a) * 176, y1 = 230 + Math.sin(a) * 176;
      const x2 = 230 + Math.cos(a) * 158, y2 = 230 + Math.sin(a) * 158;
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(190,210,240,.45)" stroke-width="2"/>`;
    }).join('')}
    <g class="needle">
      <line x1="230" y1="230" x2="230" y2="96" stroke="#FF6A55" stroke-width="4" stroke-linecap="round"/>
    </g>
    <circle cx="230" cy="230" r="9" fill="#FF6A55"/>
    <text x="230" y="322" text-anchor="middle" fill="#EAF1FF" font-size="40" font-weight="900"
          font-family="Noto Sans SC, Pretendard, sans-serif">MTTR</text>
  </svg>`;
  const needle = dial.querySelector('.needle');
  gsap.set(needle, { rotation: -135, svgOrigin: '230 230' });
  gsap.set([s09.querySelector('.kd3-a'), s09.querySelector('.kd3-b'), s09.querySelector('.kd3-c')], { autoAlpha: 0, y: 20 });

  tl.from(s09.querySelector('.kd3-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'kd05')
    .to(s09.querySelector('.kd3-a'), { autoAlpha: 1, y: 0, duration: 0.8 }, 'kd05+=0.15')
    .to(s09.querySelector('.kd3-b'), { autoAlpha: 1, y: 0, duration: 0.7 }, 'kd06+=0.2')
    .to(needle, { rotation: 96, duration: 9, ease: 'power1.inOut' }, 'kd06+=0.3')
    .to(s09.querySelector('.kd3-c'), { autoAlpha: 1, y: 0, duration: 0.7 }, 'kd07+=0.1');

  tl.fromTo(HS, { red: 0.05, light: 0.85, pan: 0, zoom: 1 },
    { red: 0.95, light: 0.6, pan: -40, zoom: 1.05, duration: 6, ease: 'sine.inOut' }, S('kd05'));
  scene(s09, S('kd05') - 0.4, S('kd08') + 0.4);
  tl.to(s09, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('kd08') - 0.2);

  // ── S10 · kd08 — 人：灯只照亮一双手 ─────────────────────────────────────
  const s10 = node(`<section class="scene" id="s-kd-04">
    <div class="cam">
      <div class="kd4-kick kicker" style="position:absolute;right:104px;top:220px;text-align:right">三个字，落在同一样东西上</div>
      <div class="kd4-zi stencil amber" style="position:absolute;right:120px;top:262px;font-size:300px">人</div>
      <svg width="760" height="620" style="position:absolute;left:180px;bottom:90px" viewBox="0 0 760 620">
        <ellipse cx="380" cy="600" rx="300" ry="34" fill="rgba(0,0,0,.55)"/>
        <path d="M250 600 C 250 430, 300 360, 380 352 C 470 360, 520 430, 520 600 Z" fill="#070B13"/>
        <circle cx="380" cy="286" r="74" fill="#070B13"/>
        <path d="M330 268 a 52 52 0 0 1 100 0" fill="none" stroke="rgba(255,196,120,.55)" stroke-width="3"/>
        <path d="M452 330 C 528 360, 560 430, 566 470" fill="none" stroke="rgba(255,196,120,.30)" stroke-width="3"/>
      </svg>
      <div class="kd4-note sub" style="position:absolute;left:196px;bottom:72px;width:420px;font-size:34px;color:#D8DFEC">
        人力已经在极限上跑
      </div>
    </div>
  </section>`);
  gsap.set(s10.querySelector('.kd4-note'), { autoAlpha: 0, y: 14 });
  tl.from(s10.querySelector('.kd4-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'kd08')
    .from(s10.querySelector('.kd4-zi'), { autoAlpha: 0, scale: 0.94, duration: 1.1, ease: 'expo.out', transformOrigin: '50% 50%' }, 'kd08+=0.1')
    .to(s10.querySelector('.kd4-note'), { autoAlpha: 1, y: 0, duration: 0.7 }, 'kd08+=0.8');
  tl.fromTo(HS, { red: 0.9, light: 0.55, warm: 0.1, zoom: 1.05 },
    { red: 0.12, light: 0.55, warm: 0.85, zoom: 1.0, duration: 4.5, ease: 'sine.inOut' }, S('kd08'));
  scene(s10, S('kd08') - 0.4, S('kd09') + 0.4);
  tl.to(s10, { autoAlpha: 0, duration: 0.5 }, S('kd09') - 0.15);

  // ── S11 · kd09 — 分工：一根丝分成两股 ──────────────────────────────────
  const s11 = node(`<section class="scene" id="s-kd-05">
    <div class="cam">
      <svg width="1920" height="1080" style="position:absolute;left:0;top:0" viewBox="0 0 1920 1080">
        <path id="kd5-p1" d="M300 540 C 760 540, 960 300, 1480 292" fill="none" stroke="rgba(255,192,105,.55)" stroke-width="2.4"/>
        <path id="kd5-p2" d="M300 540 C 760 540, 960 780, 1480 788" fill="none" stroke="rgba(46,107,255,.75)" stroke-width="2.4"/>
        <circle id="kd5-d1" cx="300" cy="540" r="7" fill="#FFD79A"/>
        <circle id="kd5-d2" cx="300" cy="540" r="7" fill="#9FB8FF"/>
      </svg>
      <div class="kd5-note head" style="position:absolute;left:1500px;top:236px;width:380px;font-size:44px;color:#F4E4C8">人 · 判断</div>
      <div class="kd5-note2 head" style="position:absolute;left:1500px;top:736px;width:380px;font-size:44px;color:#CBD8F2">AI · 执行</div>
      <div class="kd5-kick kicker" style="position:absolute;left:104px;top:220px">我们不选“再加人”</div>
      <div class="kd5-line head" style="position:absolute;left:104px;top:264px;width:760px;font-size:72px">
        人做判断，<br><span class="hl-blue">AI 做执行</span>
      </div>
    </div>
  </section>`);
  ['#kd5-p1', '#kd5-p2'].forEach((p) => gsap.set(s11.querySelector(p), { drawSVG: '0%' }));
  gsap.set([s11.querySelector('#kd5-d1'), s11.querySelector('#kd5-d2')], { autoAlpha: 0 });
  gsap.set([s11.querySelector('.kd5-note'), s11.querySelector('.kd5-note2')], { autoAlpha: 0, x: -20 });
  tl.from(s11.querySelector('.kd5-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'kd09')
    .from(s11.querySelector('.kd5-line'), { autoAlpha: 0, y: 24, duration: 0.8, ease: 'expo.out' }, 'kd09+=0.1')
    .to('#kd5-p1', { drawSVG: '100%', duration: 1.2, ease: 'power2.inOut' }, 'kd09+=0.5')
    .to('#kd5-p2', { drawSVG: '100%', duration: 1.2, ease: 'power2.inOut' }, 'kd09+=0.7')
    .to(s11.querySelector('.kd5-note'), { autoAlpha: 1, x: 0, duration: 0.6 }, 'kd09+=1.5')
    .to(s11.querySelector('.kd5-note2'), { autoAlpha: 1, x: 0, duration: 0.6 }, 'kd09+=1.7')
    .to(s11.querySelector('#kd5-d1'), { autoAlpha: 1, duration: 0.4 }, 'kd09+=1.2')
    .to(s11.querySelector('#kd5-d2'), { autoAlpha: 1, duration: 0.4 }, 'kd09+=1.3');

  // the two pulses run the two paths (a pure function of the playhead)
  const p1 = s11.querySelector('#kd5-p1'), p2 = s11.querySelector('#kd5-p2');
  const len1 = p1.getTotalLength(), len2 = p2.getTotalLength();
  const d1 = s11.querySelector('#kd5-d1'), d2 = s11.querySelector('#kd5-d2');
  const t0 = S('kd09');
  onFrame(() => {
    const t = tl.time();
    if (t < t0 || t > win.b) return;
    const a1 = ((t - t0 - 1.2) / 2.8) % 1, a2 = ((t - t0 - 1.3) / 2.8) % 1;
    if (a1 > 0) {
      const q1 = p1.getPointAtLength(len1 * a1);
      d1.setAttribute('cx', q1.x.toFixed(1)); d1.setAttribute('cy', q1.y.toFixed(1));
    }
    if (a2 > 0) {
      const q2 = p2.getPointAtLength(len2 * a2);
      d2.setAttribute('cx', q2.x.toFixed(1)); d2.setAttribute('cy', q2.y.toFixed(1));
    }
  });

  tl.fromTo(HS, { warm: 0.8, red: 0.1, light: 0.7, pan: 0, zoom: 1.02 },
    { warm: 0.55, red: 0.0, light: 0.9, pan: 30, zoom: 1.0, duration: 7, ease: 'sine.inOut' }, S('kd09'));
  scene(s11, S('kd09') - 0.4, win.b + 0.2);
};
