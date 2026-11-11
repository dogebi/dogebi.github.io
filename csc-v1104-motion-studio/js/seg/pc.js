/* seg/pc.js — 05 过程：模型之外，四个课题的功夫 */
window.SEG = window.SEG || {};
window.SEG.pc = (ctx, K, TX, H, win) => {
  const { tl, cue, scene, onFrame, W, H: SH, gsap, HS, node, D, S, E, w, rand } = H;

  // ── S25 · pc01 — 后场：四个工作台 ──────────────────────────────────────
  const s25 = node(`<section class="scene" id="s-pc-01">
    <div class="cam">
      <div class="pc-kick kicker" style="position:absolute;left:104px;top:196px">这部分是功夫最多的地方</div>
      <div class="pc-line head" style="position:absolute;left:104px;top:240px;width:900px;font-size:66px">
        模型之外，<span class="hl">四个课题</span>
      </div>
      <div class="pc-four" style="position:absolute;left:104px;top:430px;display:flex;gap:26px;width:1300px"></div>
      <div class="pc-racks" style="position:absolute;right:60px;top:150px;width:520px;height:760px"></div>
    </div>
  </section>`);
  const rackBox = s25.querySelector('.pc-racks');
  const rr = rand(5150);
  for (let i = 0; i < 3; i++) {
    const r = document.createElement('div');
    r.style.cssText = `position:absolute;right:${i * 150}px;top:${i * 26}px;width:120px;height:${620 - i * 40}px;
      background:linear-gradient(180deg,#131C2C,#080D16);box-shadow:inset 0 0 0 1px rgba(150,190,240,.12), 0 30px 60px rgba(0,0,0,.6)`;
    for (let k = 0; k < 9; k++) {
      const led = document.createElement('div');
      led.style.cssText = `position:absolute;left:14px;top:${24 + k * 60}px;width:${8 + rr() * 26}px;height:3px;
        background:${rr() > 0.68 ? 'rgba(255,192,105,.55)' : 'rgba(110,160,235,.55)'}`;
      r.appendChild(led);
    }
    rackBox.appendChild(r);
  }
  const FOURQ = ['数据清洗与入库', '上下文长度', '输出质量', '响应速度 (备选)'];
  const fourEls = FOURQ.map((t, i) => {
    const el = document.createElement('div');
    el.style.cssText = 'width:290px';
    el.innerHTML = `<div style="height:2px;background:linear-gradient(90deg,rgba(150,190,255,.75),rgba(150,190,255,0))"></div>
      <div style="margin-top:12px;font-size:26px;color:#7F92B4;font-variant-numeric:tabular-nums">课题 ${String(i + 1).padStart(2, '0')}</div>
      <div style="margin-top:6px;font-size:34px;font-weight:700;color:#E7EEFB">${t}</div>`;
    s25.querySelector('.pc-four').appendChild(el);
    return el;
  });
  gsap.set(fourEls, { autoAlpha: 0, y: 18 });
  tl.from(s25.querySelector('.pc-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'pc01')
    .from(s25.querySelector('.pc-line'), { autoAlpha: 0, y: 24, duration: 0.8, ease: 'expo.out' }, 'pc01+=0.1')
    .to(fourEls, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.22 }, 'pc01+=0.9');
  tl.fromTo(HS, { pan: 30, zoom: 1.02, light: 0.6, warm: 0.2 },
    { pan: -50, zoom: 1.08, light: 0.5, warm: 0.3, duration: 7, ease: 'sine.inOut' }, S('pc01'));
  scene(s25, win.a, S('pc02') + 0.4);
  tl.to(s25, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('pc02') - 0.2);

  // ── S26 · pc02 pc03 pc04 — 台 1：五站筛链 ──────────────────────────────
  const s26 = node(`<section class="scene" id="s-pc-02">
    <div class="cam">
      <div class="pc2-kick kicker" style="position:absolute;left:104px;top:186px">课题 01 · 数据清洗与入库</div>
      <div class="pc2-line head" style="position:absolute;left:104px;top:230px;width:900px;font-size:54px">
        来源多、格式多、<span class="hl-blue">还在持续更新</span>
      </div>
      <div class="pc2-chain" style="position:absolute;left:104px;right:104px;top:520px;display:flex;align-items:flex-start;gap:0;width:1712px"></div>
      <div class="pc2-in" style="position:absolute;left:104px;top:380px;width:520px;height:120px;opacity:.9"></div>
      <div class="pc2-drawer" style="position:absolute;right:120px;top:640px;width:420px;height:220px;
           background:linear-gradient(180deg,#1A2434,#0A0F19);box-shadow:inset 0 1px 0 rgba(255,255,255,.2), 0 30px 60px rgba(0,0,0,.6)"></div>
      <div class="pc2-drawer-lb" style="position:absolute;right:130px;top:820px;width:400px;font-size:24px;color:#8FA0B8">定时入库 · 质量可追溯</div>
    </div>
  </section>`);
  const CHAIN = ['统一接入', '解析 · 去重', '字段 / 权限', '向量入库', '抽样质检'];
  const chainEls = CHAIN.map((t, i) => {
    const el = document.createElement('div');
    el.style.cssText = 'width:342px;position:relative';
    el.innerHTML = `<div style="height:2px;background:linear-gradient(90deg,rgba(150,190,255,.8),rgba(150,190,255,.15))"></div>
      <div style="height:120px;margin-top:0;background:linear-gradient(180deg,rgba(26,38,58,.96),rgba(8,13,22,.98));
        box-shadow:inset 0 1px 0 rgba(200,220,255,.28), inset 0 0 0 1px rgba(150,190,255,.18), 0 18px 34px rgba(0,0,0,.55)"></div>
      <div style="margin-top:14px;font-size:27px;font-weight:600;color:#DCE6F7">${t}</div>`;
    s26.querySelector('.pc2-chain').appendChild(el);
    return el;
  });
  const inBox = s26.querySelector('.pc2-in');
  const inSheets = [];
  for (let i = 0; i < 7; i++) {
    const sh = document.createElement('div');
    sh.style.cssText = `position:absolute;left:${i * 60}px;top:${(i % 3) * 26}px;width:120px;height:64px;
      background:linear-gradient(180deg,#F6F2E7,#E2DCCB);box-shadow:0 12px 22px rgba(0,0,0,.6);transform:rotate(${(i % 5) - 2}deg)`;
    inBox.appendChild(sh);
    inSheets.push(sh);
  }
  gsap.set(chainEls, { autoAlpha: 0, y: 22 });
  gsap.set(inSheets, { autoAlpha: 0, y: -30 });
  tl.from(s26.querySelector('.pc2-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'pc02')
    .from(s26.querySelector('.pc2-line'), { autoAlpha: 0, y: 22, duration: 0.7 }, 'pc02+=0.2')
    .to(inSheets, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, 'pc02+=0.7')
    .to(chainEls, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.26, ease: 'power2.out' }, 'pc03+=0.1')
    .to(inSheets, { y: 150, x: 300, autoAlpha: 0, duration: 1.6, stagger: 0.06, ease: 'power2.in' }, 'pc03+=0.4')
    .from(s26.querySelector('.pc2-drawer'), { autoAlpha: 0, y: 20, duration: 0.8, ease: 'expo.out' }, 'pc04+=0.1')
    .from(s26.querySelector('.pc2-drawer-lb'), { autoAlpha: 0, y: 12, duration: 0.6 }, 'pc04+=0.5');
  tl.fromTo(HS, { pan: 0, zoom: 1.02, light: 0.55, warm: 0.2 },
    { pan: -60, zoom: 1.07, light: 0.5, warm: 0.25, duration: 9, ease: 'sine.inOut' }, S('pc02'));
  scene(s26, S('pc02') - 0.4, S('pc05') + 0.4);
  tl.to(s26, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('pc05') - 0.2);

  // ── S27 · pc05 pc06 pc07 — 台 2：长卷轴被切段、再装订 ────────────────────
  const s27 = node(`<section class="scene" id="s-pc-03">
    <div class="cam">
      <div class="pc3-kick kicker" style="position:absolute;left:104px;top:186px">课题 02 · 上下文长度</div>
      <div class="pc3-line head" style="position:absolute;left:104px;top:230px;width:860px;font-size:54px">
        工单统计一带就是<span class="hl-red" style="color:#FFB7AC">大量原始数据</span>，256K 容易触顶
      </div>
      <div class="pc3-scroll" style="position:absolute;left:-80px;top:600px;width:2200px;height:120px;
           background:linear-gradient(180deg,#F2EEE2,#DCD6C6);box-shadow:0 26px 50px rgba(0,0,0,.55)"></div>
      <div class="pc3-cuts" style="position:absolute;left:104px;right:104px;top:590px;display:flex;gap:0;width:1712px"></div>
      <div class="pc3-book" style="position:absolute;right:180px;bottom:150px;width:520px;height:220px"></div>
    </div>
  </section>`);
  const scrollEl = s27.querySelector('.pc3-scroll');
  const CUTS = ['摘要压缩', '任务拆解', '子任务处理', '结构化合并', '冲突校验'];
  const cutEls = CUTS.map((t, i) => {
    const el = document.createElement('div');
    el.style.cssText = 'width:342px;text-align:center';
    el.innerHTML = `<div style="height:64px;border-left:1px solid rgba(255,192,105,.55);margin:0 auto 12px;width:1px"></div>
      <div style="font-size:25px;font-weight:600;color:#DCE6F7">${t}</div>`;
    s27.querySelector('.pc3-cuts').appendChild(el);
    return el;
  });
  const bookEl = s27.querySelector('.pc3-book');
  bookEl.innerHTML = `<div style="position:absolute;left:0;top:40px;width:520px;height:180px;
      background:linear-gradient(160deg,#20293A,#0D1420);box-shadow:inset 0 0 0 1px rgba(160,195,255,.2), 0 30px 60px rgba(0,0,0,.6)"></div>
    <div style="position:absolute;left:30px;top:70px;width:460px;height:120px;background:linear-gradient(180deg,#F2EEE2,#DFD9C9)"></div>
    <div style="position:absolute;left:56px;top:96px;font-size:24px;color:#3A4048">结论可合并 · 长任务不中断</div>`;
  gsap.set(cutEls, { autoAlpha: 0, y: 10 });
  gsap.set(bookEl, { autoAlpha: 0, y: 30 });
  tl.from(s27.querySelector('.pc3-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'pc05')
    .from(s27.querySelector('.pc3-line'), { autoAlpha: 0, y: 22, duration: 0.7 }, 'pc05+=0.2')
    .fromTo(scrollEl, { x: 0 }, { x: -260, duration: 8, ease: 'sine.inOut' }, 'pc05')
    .to(cutEls, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.3 }, 'pc06+=0.1')
    .to(bookEl, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 'pc07+=0.1');
  tl.fromTo(HS, { pan: 20, zoom: 1.0, light: 0.55, warm: 0.25 },
    { pan: -40, zoom: 1.05, light: 0.5, warm: 0.3, duration: 9, ease: 'sine.inOut' }, S('pc05'));
  scene(s27, S('pc05') - 0.4, S('pc08') + 0.4);
  tl.to(s27, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('pc08') - 0.2);

  // ── S28 · pc08 pc09 pc10 — 台 3：三层模板与可复现 ───────────────────────
  const s28 = node(`<section class="scene" id="s-pc-04">
    <div class="cam">
      <div class="pc4-kick kicker" style="position:absolute;left:104px;top:186px">课题 03 · 输出质量</div>
      <div class="pc4-line head" style="position:absolute;left:104px;top:230px;width:820px;font-size:54px">
        分层提示词 <span class="hl-blue">+</span> 语义预处理
      </div>
      <div class="pc4-stack" style="position:absolute;left:150px;top:420px;width:700px;height:460px"></div>
      <div class="pc4-prints" style="position:absolute;right:170px;top:430px;width:620px;height:440px"></div>
      <div class="pc4-same" style="position:absolute;right:170px;bottom:120px;font-size:28px;color:#9FB8FF;opacity:0">
        同样的输入 → 同样的结论
      </div>
    </div>
  </section>`);
  const LAYERS = ['数据层', '规则层', '表达层'];
  const stackBox = s28.querySelector('.pc4-stack');
  const layerEls = LAYERS.map((t, i) => {
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;left:${i * 26}px;top:${i * 96}px;width:600px;height:110px;
      background:linear-gradient(180deg,rgba(240,238,230,.94),rgba(214,209,196,.9));
      box-shadow:0 26px 50px rgba(0,0,0,.5);clip-path:polygon(0 0,100% 0,98% 100%,2% 100%)`;
    el.innerHTML = `<div style="padding:22px 28px;font-size:26px;font-weight:700;color:#2A303C">${t}</div>
      <div style="padding:0 28px;font-size:20px;color:#5A6270">${['样本 · 字段 · 口径', '判定 · 边界 · 例外', '格式 · 语气 · 结论'][i]}</div>`;
    stackBox.appendChild(el);
    return el;
  });
  const printsBox = s28.querySelector('.pc4-prints');
  const printEls = [];
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    p.style.cssText = `position:absolute;left:${(i % 3) * 190}px;top:${Math.floor(i / 3) * 210}px;width:170px;height:170px;
      background:linear-gradient(180deg,#F2EEE2,#DFD9C9);box-shadow:0 14px 30px rgba(0,0,0,.5)`;
    p.innerHTML = `<div style="padding:14px;font-size:16px;color:#3A4048;line-height:1.5">结论<br>判定依据<br>攻击类型</div>`;
    printsBox.appendChild(p);
    printEls.push(p);
  }
  gsap.set(layerEls, { autoAlpha: 0, y: -30 });
  gsap.set(printEls, { autoAlpha: 0, y: 20 });
  tl.from(s28.querySelector('.pc4-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'pc08')
    .from(s28.querySelector('.pc4-line'), { autoAlpha: 0, y: 22, duration: 0.7 }, 'pc08+=0.2')
    .to(layerEls, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.35, ease: 'power2.out' }, 'pc09+=0.1')
    .to(printEls, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.16 }, 'pc09+=1.4')
    .to(s28.querySelector('.pc4-same'), { autoAlpha: 1, duration: 0.6 }, 'pc10+=0.2');
  tl.fromTo(HS, { pan: -10, zoom: 1.04, light: 0.55, warm: 0.3 },
    { pan: 50, zoom: 1.0, light: 0.55, warm: 0.35, duration: 9, ease: 'sine.inOut' }, S('pc08'));
  scene(s28, S('pc08') - 0.4, S('pc11') + 0.4);
  tl.to(s28, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('pc11') - 0.2);

  // ── S29 · pc11 pc12 pc13 — 台 4：等第一个字（备选课题） ──────────────────
  const s29 = node(`<section class="scene" id="s-pc-05">
    <div class="cam">
      <div class="pc5-kick kicker" style="position:absolute;left:104px;top:186px">课题 04 · 响应速度（备选）</div>
      <div class="pc5-line head" style="position:absolute;left:104px;top:230px;width:860px;font-size:54px">
        TTFT：按下回车，<br>到看见<span class="hl">第一个字</span>
      </div>
      <div class="pc5-screen" style="position:absolute;right:150px;top:220px;width:900px;height:520px"></div>
      <div class="pc5-drum" style="position:absolute;right:200px;bottom:150px;width:220px;height:220px"></div>
      <div class="pc5-tag" style="position:absolute;left:150px;bottom:190px;opacity:0">
        <div class="plate" style="position:relative;font-size:26px">未纳入正式成果统计</div>
      </div>
    </div>
  </section>`);
  const term = D.screen({
    style: 'width:900px;height:520px',
    body: `<div style="font-size:24px;color:#7E93B5">local-llm · 告警研判</div>
      <div style="margin-top:28px;font-size:30px;color:#E7EEFB;line-height:1.6">&gt; 请研判本次告警<br><span class="pc5-cursor" style="display:inline-block;width:14px;height:32px;background:#9FB8FF;vertical-align:-4px"></span></div>
      <div class="pc5-lat" style="margin-top:36px;font-size:26px;color:#FFB7AC">首字等待 4.8s</div>`,
  });
  s29.querySelector('.pc5-screen').appendChild(term);
  const drum = s29.querySelector('.pc5-drum');
  drum.innerHTML = `<svg width="220" height="220" viewBox="0 0 220 220">
    <circle cx="110" cy="110" r="88" fill="none" stroke="rgba(150,190,240,.28)" stroke-width="14"/>
    <circle class="drum-arc" cx="110" cy="110" r="88" fill="none" stroke="rgba(255,192,105,.65)" stroke-width="6"
            stroke-dasharray="90 460" stroke-linecap="round"/>
    <text x="110" y="118" text-anchor="middle" fill="#DCE6F7" font-size="22" font-weight="700"
          font-family="Noto Sans SC, Pretendard, sans-serif">缓存</text>
  </svg>`;
  gsap.set(drum, { autoAlpha: 0, scale: 0.94, transformOrigin: '50% 50%' });
  tl.from(s29.querySelector('.pc5-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'pc11')
    .from(s29.querySelector('.pc5-line'), { autoAlpha: 0, y: 22, duration: 0.7 }, 'pc11+=0.2')
    .from(term, { autoAlpha: 0, y: 26, duration: 0.8, ease: 'expo.out' }, 'pc11+=0.5')
    .to(drum, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'expo.out' }, 'pc12+=0.1')
    .to(drum.querySelector('.drum-arc'), { rotation: 300, svgOrigin: '110 110', duration: 4, ease: 'none' }, 'pc12+=0.2')
    .to(s29.querySelector('.pc5-lat'), { autoAlpha: 0, duration: 0.4 }, 'pc12+=0.3')
    .to(s29.querySelector('.pc5-tag'), { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 'pc13+=0.1');
  tl.fromTo(HS, { pan: 20, zoom: 1.03, light: 0.5, warm: 0.2, dawn: 0 },
    { pan: -20, zoom: 1.0, light: 0.48, warm: 0.25, duration: 9, ease: 'sine.inOut' }, S('pc11'));
  scene(s29, S('pc11') - 0.4, S('pc14') + 0.4);
  tl.to(s29, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('pc14') - 0.2);

  // ── S30 · pc14 pc15 pc16 — 四级提示词与结构化输出 ───────────────────────
  const s30 = node(`<section class="scene" id="s-pc-06">
    <div class="cam">
      <div class="pc6-kick kicker" style="position:absolute;left:104px;top:186px">提示词工程</div>
      <div class="pc6-line head" style="position:absolute;left:104px;top:230px;width:760px;font-size:56px">
        分级提示词，<span class="hl-blue">结构化输出</span>
      </div>
      <div class="pc6-wall" style="position:absolute;left:104px;top:430px;display:flex;gap:24px;width:1000px"></div>
      <div class="pc6-out" style="position:absolute;right:170px;top:300px;width:720px;height:520px"></div>
    </div>
  </section>`);
  const GRADES = ['P1', 'P2', 'P3', 'P4'];
  const gradeEls = GRADES.map((g, i) => {
    const el = document.createElement('div');
    el.style.cssText = `width:230px;height:330px;position:relative;
      background:linear-gradient(180deg,rgba(26,38,60,${0.35 + i * 0.06}),rgba(8,14,26,.9));
      box-shadow:inset 0 0 0 1px rgba(150,190,255,${0.12 + i * 0.06}), 0 20px 40px rgba(0,0,0,.5)`;
    el.innerHTML = `<div style="position:absolute;left:26px;top:26px;font-size:64px;font-weight:900;color:rgba(190,215,255,${0.35 + i * 0.16})">${g}</div>
      <div style="position:absolute;left:26px;bottom:26px;font-size:23px;color:#8FA0B8;line-height:1.5">${['基础规则', '场景约束', '判定口径', '输出格式'][i]}</div>
      <div style="position:absolute;left:26px;bottom:96px;width:${40 + i * 46}px;height:3px;background:rgba(150,190,255,${0.3 + i * 0.15})"></div>`;
    s30.querySelector('.pc6-wall').appendChild(el);
    return el;
  });
  const json = D.screen({
    style: 'width:720px;height:520px',
    body: `<div style="font-size:22px;color:#7E93B5">/api/judgement</div>
      <div class="pc6-json" style="margin-top:24px;font-size:26px;line-height:1.8;color:#BBD2F5;white-space:pre"></div>`,
  });
  s30.querySelector('.pc6-out').appendChild(json);
  const jsonEl = json.querySelector('.pc6-json');
  const JSON_TXT = '{\n  "attack_type": "Web 攻击 · SQL 注入",\n  "reason": "WAF rule 942100 / uri=/portal/login",\n  "evidence": ["日志行 3", "情报命中 1"],\n  "confidence": 0.86\n}';
  const typed = { n: 0 };
  tl.from(s30.querySelector('.pc6-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'pc14')
    .from(s30.querySelector('.pc6-line'), { autoAlpha: 0, y: 22, duration: 0.7 }, 'pc14+=0.2')
    .from(gradeEls, { autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.18 }, 'pc15+=0.1')
    .from(json, { autoAlpha: 0, y: 24, duration: 0.8, ease: 'expo.out' }, 'pc15+=0.9')
    .to(typed, { n: JSON_TXT.length, duration: 2.4, ease: 'none' }, 'pc16+=0.1');
  onFrame(() => {
    const n = Math.round(typed.n);
    if (jsonEl.dataset.n !== String(n)) { jsonEl.textContent = JSON_TXT.slice(0, n); jsonEl.dataset.n = String(n); }
  });
  tl.fromTo(HS, { pan: -30, zoom: 1.02, light: 0.5, warm: 0.3 },
    { pan: 40, zoom: 1.06, light: 0.55, warm: 0.4, duration: 9, ease: 'sine.inOut' }, S('pc14'));
  scene(s30, S('pc14') - 0.4, win.b + 0.2);
};
