/* seg/cg.js — 06 成果：时间、品质、人的工作方式 */
window.SEG = window.SEG || {};
window.SEG.cg = (ctx, K, TX, H, win) => {
  const { tl, cue, scene, onFrame, W, H: SH, gsap, HS, node, D, S, E, w, rand } = H;

  // ── S31 · cg01 cg02 cg03 cg04 — 时间：三支沙漏里的砂 ────────────────────
  const s31 = node(`<section class="scene" id="s-cg-01">
    <div class="cam">
      <div class="cg-kick kicker" style="position:absolute;left:104px;top:186px">成果 1 · 作业时间</div>
      <div class="cg-line head" style="position:absolute;left:104px;top:230px;width:900px;font-size:54px">
        同一件活，人工多久，<span class="hl">AI 参与后多久</span>
      </div>
      <div class="cg-rows" style="position:absolute;left:104px;right:104px;top:420px;display:flex;flex-direction:column;gap:38px"></div>
    </div>
  </section>`);
  const ROWS = [
    ['工单对应 · 300 件 / 天', 10, 2, 50, 10, 'cg02'],
    ['信息确认', 5, 2, 25, 10, 'cg03'],
    ['客户对应', 20, 5, 100, 25, 'cg04'],
  ];
  const rowEls = ROWS.map(([label, a, b, ha, hb, at]) => {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex;align-items:center;gap:30px;width:1712px';
    el.innerHTML = `<div style="width:420px;font-size:32px;font-weight:600;color:#E7EEFB">${label}</div>
      <div style="position:relative;width:820px;height:30px;background:linear-gradient(180deg,rgba(20,30,48,.9),rgba(10,16,28,.9));
           box-shadow:inset 0 0 0 1px rgba(150,190,255,.16), inset 0 1px 6px rgba(0,0,0,.6)">
        <div class="sand" style="position:absolute;left:0;top:0;bottom:0;width:100%;
             background:linear-gradient(90deg,rgba(255,192,105,.85),rgba(255,150,70,.35))"></div>
      </div>
      <div style="width:300px;display:flex;align-items:baseline;gap:12px">
        <div class="a" style="font-size:34px;font-weight:800;color:#F4E4C8;font-variant-numeric:tabular-nums">${a}m</div>
        <div style="font-size:24px;color:#7F92B4">→</div>
        <div class="b" style="font-size:34px;font-weight:800;color:#BFD6FF;font-variant-numeric:tabular-nums">${b}m</div>
        <div style="font-size:23px;color:#7F92B4">/ 件</div>
      </div>
      <div class="hours" style="width:280px;font-size:26px;color:#8FA0B8;font-variant-numeric:tabular-nums">${ha}h/d → ${hb}h/d</div>`;
    s31.querySelector('.cg-rows').appendChild(el);
    return el;
  });
  gsap.set(rowEls, { autoAlpha: 0, y: 22 });
  rowEls.forEach((row, i) => {
    const [, a, b, , , at] = ROWS[i];
    tl.to(row, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, `${at}+=0.1`)
      .to(row.querySelector('.sand'), { width: `${(b / a / (1.9)) * 100}%`, duration: 1.4, ease: 'power3.inOut' }, `${at}+=0.35`);
  });
  tl.from(s31.querySelector('.cg-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'cg01')
    .from(s31.querySelector('.cg-line'), { autoAlpha: 0, y: 24, duration: 0.8, ease: 'expo.out' }, 'cg01+=0.2');
  tl.fromTo(HS, { pan: -20, zoom: 1.02, light: 0.55, warm: 0.3, dawn: 0.08 },
    { pan: 30, zoom: 1.05, light: 0.6, warm: 0.5, dawn: 0.16, duration: 10, ease: 'sine.inOut' }, S('cg01'));
  scene(s31, win.a, S('cg05') + 0.4);
  tl.to(s31, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('cg05') - 0.2);

  // ── S32 · cg05–cg09 — 墙上的六个表盘 ──────────────────────────────────
  const s32 = node(`<section class="scene" id="s-cg-02">
    <div class="cam">
      <div class="cg2-kick kicker" style="position:absolute;left:104px;top:186px">同一笔账，换一种作业</div>
      <div class="cg2-line head" style="position:absolute;left:104px;top:230px;width:1000px;font-size:52px">
        越标准化的作业，<span class="hl-blue">压下来的越多</span>
      </div>
      <div class="cg2-grid" style="position:absolute;left:104px;right:104px;top:390px;display:flex;flex-wrap:wrap;gap:44px 60px;width:1712px"></div>
    </div>
  </section>`);
  const GAUGES = [
    ['交接班', '3h/d', '2h/d', 0.33, 'cg05'],
    ['TL 现场管理', '24h/d', '8h/d', 0.67, 'cg06'],
    ['运营数据整理', '24h/M', '12h/M', 0.50, 'cg07'],
    ['客户月报 ×50', '4h', '2h', 0.50, 'cg07'],
    ['告警分析 ×800', '130h/d', '65h/d', 0.50, 'cg08'],
    ['报告做成 ×30', '150h/M', '60h/M', 0.60, 'cg09'],
  ];
  const gaugeEls = GAUGES.map(([label, before, after, cut, at]) => {
    const el = document.createElement('div');
    el.className = 'gauge';
    el.style.cssText = 'position:relative;width:250px;text-align:center';
    el.innerHTML = `<div style="position:relative;width:200px;height:200px;margin:0 auto">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="82" fill="rgba(9,14,24,.72)" stroke="rgba(150,190,240,.16)" stroke-width="1.4"/>
          <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,120,100,.22)" stroke-width="8"
                  stroke-dasharray="150 300" stroke-linecap="round" transform="rotate(135 100 100)"/>
          <g class="nd"><line x1="100" y1="100" x2="100" y2="34" stroke="#FFC069" stroke-width="3.4" stroke-linecap="round"/></g>
          <circle cx="100" cy="100" r="6" fill="#FFC069"/>
        </svg>
      </div>
      <div style="margin-top:10px;font-size:24px;font-weight:600;color:#C7D4E6">${label}</div>
      <div style="margin-top:4px;font-size:22px;color:#8FA0B8;font-variant-numeric:tabular-nums">${before} → ${after}</div>`;
    s32.querySelector('.cg2-grid').appendChild(el);
    return { el, cut, at };
  });
  gsap.set(gaugeEls.map((g) => g.el), { autoAlpha: 0, y: 20 });
  gaugeEls.forEach((g) => {
    const nd = g.el.querySelector('.nd');
    gsap.set(nd, { rotation: -135, svgOrigin: '100 100' });
    tl.to(g.el, { autoAlpha: 1, y: 0, duration: 0.5 }, `${g.at}+=0.15`)
      .to(nd, { rotation: -135 + 270 * (1 - g.cut), duration: 1.1, ease: 'power3.inOut' }, `${g.at}+=0.35`);
  });
  tl.from(s32.querySelector('.cg2-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'cg05')
    .from(s32.querySelector('.cg2-line'), { autoAlpha: 0, y: 22, duration: 0.7 }, 'cg05+=0.15');
  tl.fromTo(HS, { pan: 20, zoom: 1.02, light: 0.6, warm: 0.5, dawn: 0.14 },
    { pan: -30, zoom: 1.0, light: 0.62, warm: 0.6, dawn: 0.2, duration: 14, ease: 'sine.inOut' }, S('cg05'));
  scene(s32, S('cg05') - 0.4, S('cg10') + 0.4);
  tl.to(s32, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('cg10') - 0.2);

  // ── S33 · cg10 — 一支总刻度量表：两成到六成七 ──────────────────────────
  const s33 = node(`<section class="scene" id="s-cg-03">
    <div class="cam">
      <div class="cg3-kick kicker" style="position:absolute;left:104px;top:230px">合起来看</div>
      <div class="cg3-line stencil" style="position:absolute;left:96px;top:280px;font-size:150px">削减两成 → 六成七</div>
      <svg width="1712" height="200" style="position:absolute;left:104px;bottom:250px" viewBox="0 0 1712 200">
        <line x1="40" y1="120" x2="1672" y2="120" stroke="rgba(150,190,240,.30)" stroke-width="2"/>
        <rect x="40" y="106" width="0" height="28" fill="rgba(255,192,105,.22)" class="cg3-band"/>
        ${Array.from({ length: 21 }, (_, i) => {
          const x = 40 + i * (1632 / 20);
          const tall = i % 5 === 0;
          return `<line x1="${x.toFixed(1)}" y1="${120 - (tall ? 16 : 8)}" x2="${x.toFixed(1)}" y2="${120 + (tall ? 16 : 8)}" stroke="rgba(170,200,240,${tall ? 0.7 : 0.35})" stroke-width="2"/>`;
        }).join('')}
        <text x="40" y="80" fill="#8FA0B8" font-size="24" font-family="Noto Sans SC, Pretendard, sans-serif">0%</text>
        <text x="700" y="80" fill="#8FA0B8" font-size="24" font-family="Noto Sans SC, Pretendard, sans-serif">35%</text>
        <text x="1600" y="80" fill="#8FA0B8" font-size="24" font-family="Noto Sans SC, Pretendard, sans-serif">70%</text>
      </svg>
      <div class="cg3-note sub" style="position:absolute;left:104px;bottom:160px;width:1200px;font-size:34px;color:#A9BDE2">
        削减率落在两成到六成七之间 —— 标准化程度越高，压下来的越多
      </div>
    </div>
  </section>`);
  gsap.set(s33.querySelector('.cg3-line'), { autoAlpha: 0, y: 26 });
  gsap.set(s33.querySelector('.cg3-note'), { autoAlpha: 0, y: 16 });
  tl.from(s33.querySelector('.cg3-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'cg10')
    .to(s33.querySelector('.cg3-line'), { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 'cg10+=0.1')
    .fromTo(s33.querySelector('.cg3-band'), { width: 0 }, { width: 1632 * (0.67 - 0.20) , duration: 1.4, ease: 'power3.inOut' }, 'cg10+=0.7')
    .to(s33.querySelector('.cg3-note'), { autoAlpha: 1, y: 0, duration: 0.7 }, 'cg10+=1.2');
  tl.fromTo(HS, { pan: -20, zoom: 1.0, light: 0.62, warm: 0.6, dawn: 0.2 },
    { pan: 20, zoom: 1.06, light: 0.66, warm: 0.65, dawn: 0.24, duration: 7, ease: 'sine.inOut' }, S('cg10'));
  scene(s33, S('cg10') - 0.4, S('cg11') + 0.4);
  tl.to(s33, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('cg11') - 0.2);

  // ── S34 · cg11 cg12 cg13 cg14 — 品质：二次研判、靶环、同一条口径 ─────────
  const s34 = node(`<section class="scene" id="s-cg-04">
    <div class="cam">
      <div class="cg4-kick kicker" style="position:absolute;left:104px;top:186px">成果 2 · 品质</div>
      <div class="cg4-line head" style="position:absolute;left:104px;top:230px;width:1200px;font-size:52px">
        误报 <span class="hl">−10%</span>　·　精准度 <span class="hl-blue">+20%</span>
      </div>
      <div class="cg4-dots" style="position:absolute;left:104px;top:400px;width:640px;height:300px"></div>
      <div class="cg4-ring" style="position:absolute;left:820px;top:380px;width:340px;height:340px"></div>
      <div class="cg4-two" style="position:absolute;right:120px;top:400px;width:600px;height:340px"></div>
      <div class="cg4-same" style="position:absolute;left:104px;bottom:130px;width:1500px;font-size:34px;color:#A9BDE2;opacity:0">
        同一事件、同一结论，不随人波动 —— 专业知识的均质化
      </div>
    </div>
  </section>`);
  const dots = s34.querySelector('.cg4-dots');
  const rd = rand(9090);
  const dotEls = [];
  for (let i = 0; i < 40; i++) {
    const d = document.createElement('div');
    d.style.cssText = `position:absolute;left:${(i % 10) * 62 + rd() * 8}px;top:${Math.floor(i / 10) * 66 + rd() * 8}px;
      width:14px;height:14px;border-radius:50%;background:${i % 4 === 0 ? 'rgba(255,90,72,.85)' : 'rgba(120,160,230,.45)'};
      box-shadow:0 0 14px ${i % 4 === 0 ? 'rgba(255,90,72,.5)' : 'rgba(90,130,210,.25)'}`;
    dots.appendChild(d);
    dotEls.push(d);
  }
  const ring = s34.querySelector('.cg4-ring');
  ring.innerHTML = `<svg width="340" height="340" viewBox="0 0 340 340">
    <circle cx="170" cy="170" r="150" fill="none" stroke="rgba(120,160,230,.22)" stroke-width="2"/>
    <circle class="outer" cx="170" cy="170" r="118" fill="none" stroke="rgba(255,192,105,.30)" stroke-width="2"/>
    <circle class="inner" cx="170" cy="170" r="74" fill="none" stroke="rgba(255,192,105,.55)" stroke-width="2"/>
    <circle cx="170" cy="170" r="8" fill="#FFC069"/>
    <line x1="170" y1="20" x2="170" y2="60" stroke="rgba(190,215,255,.4)" stroke-width="2"/>
    <line x1="170" y1="280" x2="170" y2="320" stroke="rgba(190,215,255,.4)" stroke-width="2"/>
    <line x1="20" y1="170" x2="60" y2="170" stroke="rgba(190,215,255,.4)" stroke-width="2"/>
    <line x1="280" y1="170" x2="320" y2="170" stroke="rgba(190,215,255,.4)" stroke-width="2"/>
  </svg>`;
  gsap.set(ring.querySelector('.outer'), { scale: 1, transformOrigin: '50% 50%' });
  gsap.set(ring.querySelector('.inner'), { scale: 1, transformOrigin: '50% 50%' });
  const twoBox = s34.querySelector('.cg4-two');
  twoBox.innerHTML = `<div style="display:flex;gap:24px;justify-content:flex-end">
      <div class="paper" style="position:relative;width:250px;height:280px;padding:16px">
        <div class="p-meta">新人担当</div><div class="p-line" style="font-size:20px">专线丢包<br>已切备线<br>影响：1 条线路</div></div>
      <div class="paper" style="position:relative;width:250px;height:280px;padding:16px">
        <div class="p-meta">资深担当</div><div class="p-line" style="font-size:20px">专线丢包<br>已切备线<br>影响：1 条线路</div></div>
    </div>`;
  gsap.set(twoBox, { autoAlpha: 0, y: 20 });
  tl.from(s34.querySelector('.cg4-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'cg11')
    .from(s34.querySelector('.cg4-line'), { autoAlpha: 0, y: 22, duration: 0.7 }, 'cg11+=0.15')
    .to(dotEls.filter((_, i) => i % 4 === 0), { autoAlpha: 0.12, scale: 0.6, duration: 0.5, stagger: 0.04 }, 'cg11+=0.7')
    .to([ring.querySelector('.outer'), ring.querySelector('.inner')], { scale: 0.72, duration: 1.3, ease: 'power3.inOut' }, 'cg12+=0.2')
    .to(twoBox, { autoAlpha: 1, y: 0, duration: 0.7 }, 'cg13+=0.1')
    .to(s34.querySelector('.cg4-same'), { autoAlpha: 1, duration: 0.7 }, 'cg14+=0.2');
  tl.fromTo(HS, { pan: 0, zoom: 1.02, light: 0.62, warm: 0.6, dawn: 0.2, red: 0.1 },
    { pan: -40, zoom: 1.04, light: 0.66, warm: 0.7, dawn: 0.24, red: 0.0, duration: 10, ease: 'sine.inOut' }, S('cg11'));
  scene(s34, S('cg11') - 0.4, S('cg15') + 0.4);
  tl.to(s34, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('cg15') - 0.2);

  // ── S35 · cg15–cg19 — 清单、证据、通报、档案 ───────────────────────────
  const s35 = node(`<section class="scene" id="s-cg-05">
    <div class="cam">
      <div class="cg5-list" style="position:absolute;left:104px;top:230px;width:760px"></div>
      <div class="cg5-binder" style="position:absolute;left:920px;top:250px;width:420px;height:520px"></div>
      <div class="cg5-send" style="position:absolute;left:1400px;top:270px;width:400px;height:220px"></div>
      <div class="cg5-arch" style="position:absolute;left:1400px;top:540px;width:400px;height:300px"></div>
      <div class="cg5-one" style="position:absolute;left:104px;bottom:130px;width:1120px;font-size:38px;line-height:1.5;color:#EAF1FF;opacity:0">
        品质稳定不是靠人更努力 ——<br><span class="hl">是知识统一沉淀、AI 稳定执行</span>
      </div>
    </div>
  </section>`);
  const CHECK = ['关键步骤逐项核对', '信息项不漏项', '错别字与口径同校', '判定依据随结论留档'];
  const checkEls = CHECK.map((t, i) => {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex;align-items:center;gap:18px;margin-bottom:26px';
    el.innerHTML = `<svg width="34" height="34" viewBox="0 0 34 34"><path class="tick" d="M6 18 L14 26 L28 8"
        fill="none" stroke="rgba(255,192,105,.9)" stroke-width="3.4" stroke-linecap="round"/></svg>
      <div style="font-size:30px;color:#DCE6F7">${t}</div>`;
    s35.querySelector('.cg5-list').appendChild(el);
    return el;
  });
  checkEls.forEach((el) => gsap.set(el.querySelector('.tick'), { drawSVG: '0%' }));
  const binder = s35.querySelector('.cg5-binder');
  binder.innerHTML = `<div style="position:absolute;inset:0;background:linear-gradient(160deg,#1E2738,#0B111C);
      box-shadow:inset 0 0 0 1px rgba(160,195,255,.18), 0 30px 60px rgba(0,0,0,.6)"></div>
    <div class="paper" style="position:absolute;left:34px;top:40px;width:352px;height:440px;padding:18px">
      <div class="p-meta">研判结论 · EVD-2411-0031</div>
      <div class="p-title" style="font-size:24px">证据链</div>
      <div class="p-rule"></div>
      <div class="p-line" style="font-size:18px">① WAF 命中 rule 942100<br>② 日志 3 行关键行为<br>③ 情报命中 1 条<br>④ 上下文关联 2 单</div>
    </div>`;
  gsap.set(binder, { autoAlpha: 0, x: 30 });
  const send = D.screen({
    style: 'width:400px;height:220px',
    body: `<div style="font-size:20px;color:#7E93B5">通报 · 即时</div>
      <div style="margin-top:16px;font-size:24px;color:#E7EEFB">【告警通报】攻击类型 · SQL 注入<br>已处置，证据附后</div>`,
  });
  s35.querySelector('.cg5-send').appendChild(send);
  const arch = s35.querySelector('.cg5-arch');
  const drawers = [0, 1, 2].map((i) => {
    const d = document.createElement('div');
    d.style.cssText = `position:absolute;left:0;right:0;top:${i * 96}px;height:82px;
      background:linear-gradient(180deg,#1A2434,#0A0F19);box-shadow:inset 0 1px 0 rgba(255,255,255,.16), 0 16px 30px rgba(0,0,0,.5)`;
    d.innerHTML = `<div style="position:absolute;left:22px;top:28px;font-size:22px;color:#8FA0B8">${['2025-09', '2025-10', '2025-11'][i]} · 全量留档</div>`;
    arch.appendChild(d);
    return d;
  });
  gsap.set([send, ...drawers], { autoAlpha: 0, y: 16 });
  tl.to(checkEls.map((el) => el.querySelector('.tick')), { drawSVG: '100%', duration: 0.45, stagger: 0.34 }, 'cg15+=0.1')
    .to(binder, { autoAlpha: 1, x: 0, duration: 0.8, ease: 'expo.out' }, 'cg16+=0.1')
    .to(send, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 'cg17+=0.1')
    .to(drawers, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.16 }, 'cg18+=0.2')
    .to(s35.querySelector('.cg5-one'), { autoAlpha: 1, duration: 0.8 }, 'cg19+=0.15');
  tl.fromTo(HS, { pan: -20, zoom: 1.0, light: 0.66, warm: 0.7, dawn: 0.26 },
    { pan: 30, zoom: 1.04, light: 0.7, warm: 0.75, dawn: 0.3, duration: 12, ease: 'sine.inOut' }, S('cg15'));
  scene(s35, S('cg15') - 0.4, S('cg20') + 0.4);
  tl.to(s35, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('cg20') - 0.2);

  // ── S36 · cg20 cg21 cg22 — 大厅里六个位置依次亮一下 ────────────────────
  const s36 = node(`<section class="scene" id="s-cg-06">
    <div class="cam">
      <div class="cg6-kick kicker" style="position:absolute;left:104px;top:200px">最后是人的变化</div>
      <div class="cg6-line head" style="position:absolute;left:104px;top:244px;width:1000px;font-size:60px">
        六个日常场景，<span class="hl">同一种处理方式</span>
      </div>
      <div class="cg6-pts" style="position:absolute;inset:0"></div>
    </div>
  </section>`);
  const SIX = [
    ['客户催故障进度', 340, 640], ['安全事件通报', 760, 690], ['客户投诉', 1180, 660],
    ['T1 早班接班', 1480, 620], ['TL 晨间风险检查', 620, 790], ['月底品质管理', 1080, 800],
  ];
  const sixEls = SIX.map(([t, x, y]) => {
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;left:${x}px;top:${y}px;display:flex;align-items:center;gap:12px`;
    el.innerHTML = `<div style="width:10px;height:10px;border-radius:50%;background:#FFC069;box-shadow:0 0 22px 6px rgba(255,192,105,.45)"></div>
      <div style="font-size:24px;color:#CBD6E8">${t}</div>`;
    s36.querySelector('.cg6-pts').appendChild(el);
    return el;
  });
  gsap.set(sixEls, { autoAlpha: 0, y: 10 });
  tl.from(s36.querySelector('.cg6-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'cg20')
    .from(s36.querySelector('.cg6-line'), { autoAlpha: 0, y: 22, duration: 0.7 }, 'cg20+=0.2')
    .to(sixEls, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.5 }, 'cg21+=0.1');
  tl.fromTo(HS, { pan: 0, zoom: 1.02, light: 0.7, warm: 0.75, dawn: 0.28 },
    { pan: -30, zoom: 0.98, light: 0.72, warm: 0.8, dawn: 0.32, duration: 9, ease: 'sine.inOut' }, S('cg20'));
  scene(s36, S('cg20') - 0.4, S('cg23') + 0.4);
  tl.to(s36, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('cg23') - 0.2);

  // ── S37 · cg23 cg24 cg25 — 地面上的闭环光路 ────────────────────────────
  const s37 = node(`<section class="scene" id="s-cg-07">
    <div class="cam">
      <div class="cg7-kick kicker" style="position:absolute;left:104px;top:190px">人机协同回路</div>
      <div class="cg7-line head" style="position:absolute;left:104px;top:234px;width:900px;font-size:54px">
        人下指令 → 一起执行 →<br>人判断定稿 → <span class="hl-blue">知识沉淀</span>
      </div>
      <svg width="1200" height="760" style="position:absolute;right:40px;top:180px" viewBox="0 0 1200 760">
        <path class="loop" d="M300 240 C 620 130, 900 220, 940 400 C 980 590, 700 690, 460 640 C 240 596, 190 420, 300 240 Z"
              fill="none" stroke="rgba(255,192,105,.28)" stroke-width="2.4" stroke-dasharray="8 10"/>
        <circle class="pulse" r="9" fill="#FFE0B0"/>
        ${[['人 · 下指令', 300, 214], ['人+Agent · 执行', 950, 386], ['人 · 定稿', 460, 672], ['知识 · 复用', 210, 420]].map(([t, x, y]) =>
          `<text x="${x}" y="${y}" text-anchor="middle" fill="#E7EEFB" font-size="27" font-weight="700"
             font-family="Noto Sans SC, Pretendard, sans-serif">${t}</text>`).join('')}
      </svg>
    </div>
  </section>`);
  const loopPath = s37.querySelector('.loop');
  const pulse = s37.querySelector('.pulse');
  const loopLen = loopPath.getTotalLength();
  onFrame(() => {
    const t = tl.time();
    if (t < S('cg23') || t > win.b) return;
    const a = ((t - S('cg23')) / 9) % 1;
    const q = loopPath.getPointAtLength(loopLen * a);
    pulse.setAttribute('cx', q.x.toFixed(1));
    pulse.setAttribute('cy', q.y.toFixed(1));
  });
  gsap.set(loopPath, { drawSVG: '0%' });
  tl.from(s37.querySelector('.cg7-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'cg23')
    .from(s37.querySelector('.cg7-line'), { autoAlpha: 0, y: 22, duration: 0.7 }, 'cg23+=0.15')
    .to(loopPath, { drawSVG: '100%', duration: 2.6, ease: 'power2.inOut' }, 'cg24+=0.2')
    .to(pulse, { autoAlpha: 1, duration: 0.4 }, 'cg25+=0.1');
  tl.fromTo(HS, { pan: 20, zoom: 1.0, light: 0.74, warm: 0.8, dawn: 0.34 },
    { pan: -20, zoom: 1.04, light: 0.76, warm: 0.85, dawn: 0.38, duration: 10, ease: 'sine.inOut' }, S('cg23'));
  scene(s37, S('cg23') - 0.4, S('cg26') + 0.4);
  tl.to(s37, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('cg26') - 0.2);

  // ── S38 · cg26 cg27 — 走向窗边：更快、更稳 ─────────────────────────────
  const s38 = node(`<section class="scene" id="s-cg-08">
    <div class="cam">
      <div class="cg8-left" style="position:absolute;left:104px;top:236px;width:760px">
        <div class="kicker">员工侧 · EX</div>
        <div class="head" style="margin-top:16px;font-size:48px;color:#E7EEFB">从查询、整理、编写里解放</div>
        <div class="sub" style="margin-top:14px;font-size:32px;color:#A9BDE2">回到事件的本质与客户的沟通</div>
      </div>
      <div class="cg8-right" style="position:absolute;right:130px;top:300px;width:700px;text-align:right">
        <div class="kicker" style="text-align:right">客户侧 · CX</div>
        <div class="hero" style="margin-top:18px;font-size:96px;color:#FFF3DE">更快</div>
        <div class="hero" style="margin-top:8px;font-size:96px;color:#DCE9FF">更稳</div>
      </div>
      <svg width="1920" height="1080" style="position:absolute;left:0;top:0" viewBox="0 0 1920 1080">
        <g class="cg8-fig" opacity="0.9">
          <ellipse cx="980" cy="960" rx="120" ry="20" fill="rgba(0,0,0,.45)"/>
          <path d="M930 960 C 930 820, 950 770, 990 766 C 1032 770, 1050 820, 1050 960 Z" fill="#0A1018"/>
          <circle cx="990" cy="716" r="40" fill="#0A1018"/>
          <path d="M960 706 a 30 30 0 0 1 60 0" fill="none" stroke="rgba(255,225,190,.45)" stroke-width="2.6"/>
        </g>
      </svg>
    </div>
  </section>`);
  gsap.set([s38.querySelector('.cg8-left'), s38.querySelector('.cg8-right')], { autoAlpha: 0, y: 24 });
  tl.to(s38.querySelector('.cg8-left'), { autoAlpha: 1, y: 0, duration: 0.8 }, 'cg26+=0.1')
    .to(s38.querySelector('.cg8-right'), { autoAlpha: 1, y: 0, duration: 0.8 }, 'cg27+=0.1');
  tl.fromTo(HS, { pan: 0, zoom: 1.0, light: 0.7, warm: 0.8, dawn: 0.42 },
    { pan: 40, zoom: 1.06, light: 0.95, warm: 0.7, dawn: 0.62, duration: 9, ease: 'sine.inOut' }, S('cg26'));
  scene(s38, S('cg26') - 0.4, S('cg28') + 0.2);
  tl.to(s38, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('cg28') - 0.2);

  // ── S39 · cg28 — 黎明里的三行字 ────────────────────────────────────────
  const s39 = node(`<section class="scene" id="s-cg-09">
    <div class="cam">
      <div class="cg9-kick kicker" style="position:absolute;left:104px;top:250px">重 · 繁 · 危，同一条对策</div>
      <div class="cg9-l1 stencil" style="position:absolute;left:96px;top:300px;font-size:120px">人回到判断</div>
      <div class="cg9-l2 stencil amber" style="position:absolute;left:96px;top:440px;font-size:120px">AI 承担执行</div>
      <div class="cg9-l3 stencil" style="position:absolute;left:96px;top:580px;font-size:120px">知识统一沉淀</div>
      <div class="cg9-note sub" style="position:absolute;left:110px;bottom:170px;width:1400px;font-size:34px;color:#C9D6E8">
        量靠 AI 承接 · 杂靠沉淀复用 · 险靠统一执行
      </div>
    </div>
  </section>`);
  ['1', '2', '3'].forEach((n) => gsap.set(s39.querySelector('.cg9-l' + n), { autoAlpha: 0, yPercent: 40 }));
  gsap.set(s39.querySelector('.cg9-note'), { autoAlpha: 0 });
  tl.from(s39.querySelector('.cg9-kick'), { autoAlpha: 0, y: -10, duration: 0.6 }, 'cg28')
    .to(s39.querySelector('.cg9-l1'), { autoAlpha: 1, yPercent: 0, duration: 1.0, ease: 'expo.out' }, 'cg28+=0.15')
    .to(s39.querySelector('.cg9-l2'), { autoAlpha: 1, yPercent: 0, duration: 1.0, ease: 'expo.out' }, 'cg28+=1.0')
    .to(s39.querySelector('.cg9-l3'), { autoAlpha: 1, yPercent: 0, duration: 1.0, ease: 'expo.out' }, 'cg28+=1.8')
    .to(s39.querySelector('.cg9-note'), { autoAlpha: 1, duration: 1.0 }, 'cg28+=2.6');
  tl.fromTo(HS, { pan: 20, zoom: 1.05, light: 0.6, warm: 0.55, dawn: 0.55 },
    { pan: -20, zoom: 0.97, light: 0.25, warm: 0.4, dawn: 0.95, duration: 9, ease: 'sine.inOut' }, S('cg28'));
  scene(s39, S('cg28') - 0.3, null);
};
