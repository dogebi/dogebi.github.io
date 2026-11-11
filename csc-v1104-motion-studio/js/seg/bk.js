/* seg/bk.js — 01 背景：大连 CSC 是谁，每天在这里跑的是什么 */
window.SEG = window.SEG || {};
window.SEG.bk = (ctx, K, TX, H, win) => {
  const { tl, cue, scene, onFrame, W, H: SH, gsap, HS, node, D, S, E, w } = H;

  // ── S01 · bk01 — 天花降下，地面上的名字 ────────────────────────────────
  const s01 = node(`<section class="scene" id="s-bk-01">
    <div class="cam">
      <div class="bk-name stencil" style="position:absolute;left:96px;top:352px;font-size:212px">大连 CSC</div>
      <div class="bk-sub" style="position:absolute;left:102px;top:600px;width:1100px;font-size:44px;color:#C6D2E6;letter-spacing:.02em">
        NTT Com China 的运营据点 · 大连
      </div>
    </div>
  </section>`);
  const nameEl = s01.querySelector('.bk-name');
  gsap.set(s01.querySelector('.bk-sub'), { autoAlpha: 0, y: 18 });
  // a clip wrapper instead of SplitText: the stencil's paint comes from background-clip:text,
  // which never reaches SplitText's per-character spans (the type would vanish)
  const nameWrap = document.createElement('div');
  nameWrap.style.cssText = 'position:absolute;left:96px;top:352px;overflow:hidden;padding-bottom:10px';
  nameEl.parentNode.insertBefore(nameWrap, nameEl);
  nameWrap.appendChild(nameEl);
  nameEl.style.position = 'relative';
  nameEl.style.left = '0';
  nameEl.style.top = '0';

  const plateYn = D.plate('稳定运营 20 年以上', '', 'left:640px;top:500px');
  s01.querySelector('.cam').appendChild(plateYn);
  gsap.set(plateYn, { autoAlpha: 0, x: -30 });

  tl.from(nameEl, { yPercent: 108, duration: 1.05, ease: 'expo.out' }, 'bk01+=0.1')
    .to(s01.querySelector('.bk-sub'), { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 'bk01+=0.9')
    .fromTo(plateYn, { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power2.out' }, w('bk01', '二十多年', -0.35));

  // camera: cradle down from the ceiling into the hall, the strips come up
  tl.fromTo(HS, { drop: -300, zoom: 1.07, light: 0.25 },
    { drop: 0, zoom: 1.0, light: 1, duration: 5.2, ease: 'sine.inOut' }, 0);
  scene(s01, 0, S('bk02') + 0.5);
  tl.to(s01, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('bk02') - 0.1);

  // ── S02 · bk02 bk03 — 三百人，三块业务，灯一段一段亮 ──────────────────
  const s02 = node(`<section class="scene" id="s-bk-02">
    <div class="cam">
      <div class="bk-cap kicker" style="position:absolute;left:104px;top:242px">团队规模</div>
      <div class="bk-hero num stencil" style="position:absolute;left:96px;top:276px;font-size:152px">300 人以内</div>
      <div class="bk-lead sub" style="position:absolute;left:104px;top:452px;width:760px;font-size:40px">
        最早只是一个客服运营中心
      </div>
      <div class="bk-zones" style="position:absolute;left:104px;top:600px;width:800px">
        <div class="zone" data-z="1" style="position:absolute;left:0;top:0;width:800px">
          <div class="z-bar" style="height:2px;width:800px;background:linear-gradient(90deg,rgba(46,107,255,.85),rgba(46,107,255,0))"></div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:12px">
            <div class="z-name" style="font-size:36px;font-weight:700;color:#E7EEFB">客户服务 · 一元化受理</div>
            <div class="z-note" style="font-size:26px;color:#8FA0B8">500 个项目 · 300 件 / 天</div>
          </div>
        </div>
        <div class="zone" data-z="2" style="position:absolute;left:0;top:118px;width:800px">
          <div class="z-bar" style="height:2px;width:800px;background:linear-gradient(90deg,rgba(255,77,61,.85),rgba(255,77,61,0))"></div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:12px">
            <div class="z-name" style="font-size:36px;font-weight:700;color:#E7EEFB">安全运营 · 研判型 SOC</div>
            <div class="z-note" style="font-size:26px;color:#8FA0B8">海量告警 800 件 / 天</div>
          </div>
        </div>
        <div class="zone" data-z="3" style="position:absolute;left:0;top:236px;width:800px">
          <div class="z-bar" style="height:2px;width:800px;background:linear-gradient(90deg,rgba(255,192,105,.85),rgba(255,192,105,0))"></div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:12px">
            <div class="z-name" style="font-size:36px;font-weight:700;color:#E7EEFB">AI 应用</div>
            <div class="z-note" style="font-size:26px;color:#8FA0B8">CSM Agent One</div>
          </div>
        </div>
      </div>
    </div>
  </section>`);
  s02.querySelectorAll('.zone').forEach((z) => gsap.set(z, { autoAlpha: 0, x: 40 }));

  tl.from(s02.querySelector('.bk-hero'), { yPercent: 40, autoAlpha: 0, duration: 1.0, ease: 'expo.out' }, 'bk02')
    .from(s02.querySelector('.bk-cap'), { autoAlpha: 0, y: -12, duration: 0.6 }, 'bk02+=0.05')
    .from(s02.querySelector('.bk-lead'), { autoAlpha: 0, y: 22, duration: 0.8, ease: 'power2.out' }, 'bk02+=0.5')
    // 三块业务: each light comes on as it is named
    .to(s02.querySelector('.zone[data-z="1"]'), { autoAlpha: 1, x: 0, duration: 0.7, ease: 'expo.out' }, 'bk03+=0.05')
    .to(s02.querySelector('.zone[data-z="2"]'), { autoAlpha: 1, x: 0, duration: 0.7, ease: 'expo.out' }, 'bk03+=0.9')
    .to(s02.querySelector('.zone[data-z="3"]'), { autoAlpha: 1, x: 0, duration: 0.7, ease: 'expo.out' }, 'bk03+=1.9');

  tl.fromTo(HS, { zoom: 1.02, pan: 40 }, { zoom: 0.94, pan: -20, duration: 6.5, ease: 'sine.inOut' }, S('bk02'));
  scene(s02, S('bk02') - 0.4, S('bk04') + 0.4);
  tl.to(s02, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('bk04') - 0.2);

  // ── S03 · bk04 bk05 — 客户、三种语言、24×7×365 ─────────────────────────
  const s03 = node(`<section class="scene" id="s-bk-03">
    <div class="cam">
      <div class="bk-kick kicker" style="position:absolute;left:96px;top:222px">服务的对象</div>
      <div class="bk-line head" style="position:absolute;left:96px;top:262px;width:900px;font-size:84px">
        NTT 集团的<span class="hl">重点客户</span>
      </div>
      <div class="bk-body sub" style="position:absolute;left:96px;top:430px;width:840px;font-size:40px">
        基础设施 · 应用 · 安全 · MSS<br>一站式交付
      </div>
      <div class="bk-langs" style="position:absolute;left:100px;top:640px;display:flex;gap:26px"></div>
      <div class="bk-ring" style="position:absolute;right:150px;top:298px;width:520px;height:520px"></div>
    </div>
  </section>`);
  const langs = ['中文', '日本語', 'English'];
  const langBox = s03.querySelector('.bk-langs');
  langs.forEach((l) => {
    const el = document.createElement('div');
    el.className = 'lang';
    el.innerHTML = `<div class="l-mark" style="width:6px;height:56px;background:linear-gradient(180deg,#BFD4FF,rgba(46,107,255,.15))"></div>
      <div class="l-tx" style="margin-top:14px;font-size:32px;font-weight:600;color:#DCE6F7">${l}</div>`;
    langBox.appendChild(el);
    gsap.set(el, { autoAlpha: 0, y: 16 });
  });
  const ring = s03.querySelector('.bk-ring');
  ring.innerHTML = `<svg width="520" height="520" viewBox="0 0 520 520">
      <circle cx="260" cy="260" r="236" fill="none" stroke="rgba(150,180,235,.20)" stroke-width="1.4"/>
      <circle class="rg-dash" cx="260" cy="260" r="236" fill="none" stroke="rgba(150,190,255,.55)"
              stroke-width="2.2" stroke-dasharray="5 13"/>
      <circle cx="260" cy="260" r="176" fill="none" stroke="rgba(150,180,235,.14)" stroke-width="1.2"/>
      <text x="260" y="250" text-anchor="middle" fill="#EAF1FF" font-size="46" font-weight="900"
            font-family="Noto Sans SC, Pretendard, sans-serif" letter-spacing="1">24×7×365</text>
      <text x="260" y="300" text-anchor="middle" fill="#93A2BA" font-size="24" font-weight="500"
            font-family="Noto Sans SC, Pretendard, sans-serif">全年 · 全天候</text>
    </svg>`;
  gsap.set(ring, { autoAlpha: 0, scale: 0.94, transformOrigin: '50% 50%' });

  tl.from(s03.querySelector('.bk-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'bk04')
    .from(s03.querySelector('.bk-line'), { autoAlpha: 0, y: 30, duration: 0.9, ease: 'expo.out' }, 'bk04+=0.15')
    .from(s03.querySelector('.bk-body'), { autoAlpha: 0, y: 24, duration: 0.8 }, 'bk04+=0.7')
    .to(ring, { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'expo.out' }, 'bk05')
    .to(langBox.children, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.22, ease: 'power2.out' }, 'bk05+=0.1');
  // the dashed ring turns: 24 hours, every day
  tl.to(ring.querySelector('.rg-dash'), { rotation: 60, transformOrigin: '260px 260px', duration: 9, ease: 'none' }, 'bk05');

  tl.fromTo(HS, { pan: 60, zoom: 1.0 }, { pan: -70, zoom: 1.05, duration: 8, ease: 'sine.inOut' }, S('bk04'));
  scene(s03, S('bk04') - 0.4, S('bk06') + 0.4);
  tl.to(s03, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('bk06') - 0.2);

  // ── S04 · bk06 bk07 — 桌面上：两条线的量 ──────────────────────────────
  const s04 = node(`<section class="scene" id="s-bk-04">
    <div class="cam">
      <div class="bk-two kicker" style="position:absolute;left:96px;top:196px">每天最费人的两件事</div>
      <div class="bk-two-h head" style="position:absolute;left:96px;top:240px;width:1000px;font-size:74px">
        申报的处理，和<span class="hl-blue">告警的研判</span>
      </div>
    </div>
  </section>`);
  const stack = D.paper({
    cls: 'bk-stack', meta: '客户申报 · 一元化受理', title: '今日受理',
    lines: ['设备变更', '线路故障', '安全审核 · 变更记录', '邮件收发异常', '…'],
    style: 'left:1120px;top:470px;width:420px;transform:rotate(-2.4deg)',
  });
  s04.querySelector('.cam').appendChild(stack);
  const tray = D.paper({
    cls: 'bk-tray', meta: '工单', title: '300 件 / 天',
    lines: ['500 个项目在跑'], style: 'left:1290px;top:300px;width:330px;transform:rotate(3.2deg)',
  });
  s04.querySelector('.cam').appendChild(tray);
  const p500 = D.plate('500 个项目', '', 'left:700px;top:760px');
  s04.querySelector('.cam').appendChild(p500);
  gsap.set([stack, tray], { autoAlpha: 0, y: 60, rotation: 0 });
  gsap.set(p500, { autoAlpha: 0, y: 20 });

  tl.from([s04.querySelector('.bk-two'), s04.querySelector('.bk-two-h')], { autoAlpha: 0, y: 22, duration: 0.7, stagger: 0.1 }, 'bk06')
    .to(tray, { autoAlpha: 1, y: 0, rotation: 3.2, duration: 0.9, ease: 'expo.out' }, 'bk06+=0.6')
    .to(stack, { autoAlpha: 1, y: 0, rotation: -2.4, duration: 0.9, ease: 'expo.out' }, 'bk07+=0.1')
    .to(p500, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 'bk07+=0.5');

  tl.fromTo(HS, { pan: 120, zoom: 1.05, light: 0.95 }, { pan: 150, zoom: 1.14, light: 0.8, duration: 8, ease: 'sine.inOut' }, S('bk06'));
  scene(s04, S('bk06') - 0.4, S('bk08') + 0.4);
  tl.to(s04, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('bk08') - 0.2);

  // ── S05 · bk08 — 十九亿五千万条 ──────────────────────────────────────
  const s05 = node(`<section class="scene" id="s-bk-05">
    <div class="cam">
      <div class="bk-ae kicker blue" style="position:absolute;left:96px;top:206px">安全这条线 · 对象设备原生告警日志</div>
      <div class="bk-big num stencil" id="bk-count" style="position:absolute;left:88px;top:262px;font-size:248px">0</div>
      <div class="bk-unit sub" style="position:absolute;left:104px;top:560px;font-size:38px;color:#B9C6D8">
        条 / 月　*2025 年度月度平均值
      </div>
      <div class="bk-log" style="position:absolute;right:-40px;top:180px;width:640px;height:720px;overflow:hidden;opacity:.5"></div>
    </div>
  </section>`);
  const logBox = s05.querySelector('.bk-log');
  const LOG = 'CEF:0|Fortinet|FortiGate|7.4|traffic|deny|5|src=10.22.7.14 dst=203.0.113.9 dpt=445\n'
    + 'WAF alert rule=942100 sql_injection uri=/portal/login\n'
    + 'EDR process=rundll32.exe parent=winword.exe\n'
    + 'counters: session_state=Established reason=timeout\n'
    + 'DNS query: cdn-update-node.example | NXDOMAIN\n'
    + 'SIEM normalized: device_id=NE-0042 severity=low\n';
  for (let i = 0; i < 16; i++) {
    const ln = document.createElement('div');
    ln.className = 's-log';
    ln.style.cssText = 'position:absolute;left:0;right:0;font-size:19px;color:rgba(130,165,225,.65);white-space:pre;line-height:1.9';
    ln.textContent = LOG.split('\n')[i % 6];
    ln.style.top = (i * 46) + 'px';
    logBox.appendChild(ln);
  }
  tl.fromTo(logBox, { y: 40 }, { y: -220, duration: 12, ease: 'none' }, S('bk08'));

  const cEl = s05.querySelector('#bk-count');
  const cObj = { v: 0 };
  tl.to(cObj, { v: 1951000000, duration: 3.2, ease: 'power2.out' }, 'bk08+=0.15');
  onFrame(() => { cEl.textContent = Math.round(cObj.v).toLocaleString('en-US'); });

  tl.from(s05.querySelectorAll('.bk-ae, .bk-unit'), { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.12 }, 'bk08')
    .from(cEl, { autoAlpha: 0, yPercent: 18, duration: 0.8, ease: 'expo.out' }, 'bk08+=0.05');
  tl.fromTo(HS, { pan: -60, zoom: 1.0, light: 0.9, red: 0.05 },
    { pan: -110, zoom: 1.08, light: 0.75, red: 0.22, duration: 6, ease: 'sine.inOut' }, S('bk08'));
  scene(s05, S('bk08') - 0.4, S('bk09') + 0.4);
  tl.to(s05, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('bk09') - 0.15);

  // ── S06 · bk09 bk10 — 收敛：27,000 → 30 人 → 十万分之一 ────────────────
  const s06 = node(`<section class="scene" id="s-bk-06">
    <div class="cam">
      <svg class="bk-funnel" width="1920" height="1080" style="position:absolute;left:0;top:0">
        <path id="bk-f1" d="M120 214 C 660 300, 900 430, 1140 560" fill="none" stroke="rgba(120,170,255,.30)" stroke-width="2"/>
        <path id="bk-f2" d="M120 330 C 660 390, 900 470, 1140 566" fill="none" stroke="rgba(120,170,255,.22)" stroke-width="2"/>
        <path id="bk-f3" d="M120 820 C 660 720, 900 620, 1140 586" fill="none" stroke="rgba(120,170,255,.22)" stroke-width="2"/>
        <path id="bk-f4" d="M120 930 C 660 780, 900 640, 1140 592" fill="none" stroke="rgba(120,170,255,.16)" stroke-width="2"/>
        <circle cx="1150" cy="576" r="9" fill="#BFD6FF"/>
      </svg>
      <div class="bk-siem kicker blue" style="position:absolute;left:96px;top:150px">第一轮 · SIEM 引擎收敛</div>
      <div class="bk-gate" style="position:absolute;left:1064px;top:470px;width:170px;height:210px;
           background:linear-gradient(180deg,rgba(120,165,255,.16),rgba(120,165,255,.02));
           box-shadow:inset 0 0 0 1px rgba(150,190,255,.35)"></div>
      <div class="bk-c27 num stencil" id="bk-c27" style="position:absolute;left:1290px;top:400px;font-size:180px">0</div>
      <div class="bk-c27l sub" style="position:absolute;left:1300px;top:600px;font-size:34px;color:#B9C6D8">
        27,000 条 · 约 1/1,000
      </div>
      <div class="bk-c30" style="position:absolute;left:1300px;top:700px;opacity:0">
        <div class="stencil amber num" style="font-size:120px">30</div>
        <div class="sub" style="font-size:32px;color:#B9C6D8;margin-top:-8px">名安全分析师 · 逐条研判</div>
      </div>
      <div class="bk-badge" style="position:absolute;left:1268px;top:830px;opacity:0;display:flex;align-items:center;gap:18px">
        <div style="width:14px;height:14px;background:#FFC069;box-shadow:0 0 24px 6px rgba(255,192,105,.55)"></div>
        <div class="sub" style="font-size:34px;color:#F0E3CC">实际报告：十万分之一</div>
      </div>
    </div>
  </section>`);
  ['#bk-f1', '#bk-f2', '#bk-f3', '#bk-f4'].forEach((p) => gsap.set(s06.querySelector(p), { drawSVG: '0%' }));
  const c27 = s06.querySelector('#bk-c27');
  const c27o = { v: 0 };

  tl.from(s06.querySelector('.bk-siem'), { autoAlpha: 0, y: 16, duration: 0.6 }, 'bk09')
    .to(['#bk-f1', '#bk-f2', '#bk-f3', '#bk-f4'], { drawSVG: '100%', duration: 1.4, stagger: 0.12, ease: 'power2.inOut' }, 'bk09+=0.1')
    .to(c27o, { v: 27000, duration: 1.2, ease: 'power2.out' }, 'bk09+=0.5')
    .from(s06.querySelector('.bk-c27l'), { autoAlpha: 0, y: 14, duration: 0.6 }, 'bk09+=1.1')
    .fromTo(s06.querySelector('.bk-c30'), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 'bk10+=0.1')
    .fromTo(s06.querySelector('.bk-badge'), { autoAlpha: 0, x: -24 }, { autoAlpha: 1, x: 0, duration: 0.8, ease: 'expo.out' }, w('bk10', '十万分之一', -0.4));
  onFrame(() => { c27.textContent = Math.round(c27o.v).toLocaleString('en-US'); });

  tl.fromTo(HS, { pan: -30, zoom: 1.06, red: 0.2, light: 0.8 }, { pan: 70, zoom: 0.97, red: 0.04, light: 1, duration: 7, ease: 'sine.inOut' }, S('bk09'));
  scene(s06, S('bk09') - 0.4, win.b + 0.2);
};
