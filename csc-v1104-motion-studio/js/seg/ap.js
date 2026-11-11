/* seg/ap.js — 04 落地：两个真实场景怎么跑 */
window.SEG = window.SEG || {};
window.SEG.ap = (ctx, K, TX, H, win) => {
  const { tl, cue, scene, onFrame, W, H: SH, gsap, HS, node, D, S, E, w, rand } = H;

  // ── S19 · ap01 — 显示器上的一封来信 ────────────────────────────────────
  const s19 = node(`<section class="scene" id="s-ap-01">
    <div class="cam">
      <div class="ap-kick kicker" style="position:absolute;left:104px;top:200px">场景一 · 客服</div>
      <div class="ap-slot" style="position:absolute;right:150px;top:230px;width:980px;height:560px"></div>
      <div class="ap-side sub" style="position:absolute;left:104px;top:280px;width:620px;font-size:40px;color:#D8DFEC">
        早上客户来信：<br>系统很慢，页面要等很久
      </div>
      <div class="ap-t" style="position:absolute;left:104px;top:470px;width:640px;font-size:32px;color:#8FA0B8">
        进件时间 09:12 · 客户等级 VIP
      </div>
    </div>
  </section>`);
  const mail = D.screen({
    style: 'width:980px;height:560px',
    body: `<div style="font-size:22px;color:#7E93B5;letter-spacing:.04em">MAIL · 客户来信 09:12</div>
      <div style="margin-top:26px;font-size:34px;color:#E7EEFB;line-height:1.6">今早开始访问系统很慢，<br>打开页面要等很久。</div>
      <div style="margin-top:30px;font-size:24px;color:#8FA0B8">— 客户担当 / 制造部</div>`,
    log: '<div style="position:absolute;left:0;bottom:0;font-size:15px;color:rgba(120,160,220,.35)">session ok · TLS 1.3 · relay cn-dalian-02</div>',
  });
  s19.querySelector('.ap-slot').appendChild(mail);
  gsap.set(mail, { autoAlpha: 0, scale: 0.97, transformOrigin: '50% 50%' });
  tl.from(s19.querySelector('.ap-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'ap01')
    .to(mail, { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'expo.out' }, 'ap01+=0.1')
    .from(s19.querySelector('.ap-side'), { autoAlpha: 0, y: 20, duration: 0.8 }, 'ap01+=0.4')
    .from(s19.querySelector('.ap-t'), { autoAlpha: 0, y: 14, duration: 0.6 }, 'ap01+=0.9');
  tl.fromTo(HS, { pan: 30, zoom: 1.02, light: 0.9, warm: 0.4 },
    { pan: -30, zoom: 1.08, light: 0.85, warm: 0.5, duration: 6, ease: 'sine.inOut' }, S('ap01'));
  scene(s19, win.a, S('ap02') + 0.4);
  tl.to(s19, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('ap02') - 0.2);

  // ── S20 · ap02 ap03 ap04 — 它按顺序取工具 ──────────────────────────────
  const s20 = node(`<section class="scene" id="s-ap-02">
    <div class="cam">
      <div class="peg" style="position:absolute;right:50px;top:120px;width:960px;height:620px"></div>
      <div class="ap2-kick kicker" style="position:absolute;left:104px;top:200px">Agent 自己规划</div>
      <div class="ap2-line head" style="position:absolute;left:104px;top:244px;width:640px;font-size:58px">
        先查监控，<br>再查<span class="hl-blue">联系人 · 合同</span>
      </div>
      <div class="ap2-note sub" style="position:absolute;left:104px;top:430px;width:600px;font-size:32px;color:#A9BDE2">
        然后设备、线路、地址、服务内容<br>历史工单与经验也一起带上
      </div>
      <div class="ap2-seq" style="position:absolute;left:104px;bottom:150px;width:620px;font-size:28px;color:#7F92B4"></div>
    </div>
  </section>`);
  const peg2 = s20.querySelector('.peg');
  const TOOLS2 = ['监控查询', '联系人查询', '合同查询', '设备查询', '线路查询', '地址查询',
    '服务内容查询', '历史工单', '经验查询', '故障分析', '日志分析', '故障报告'];
  const tools20 = TOOLS2.map((n, i) => {
    const jx = ((i * 5) % 3) * 8 - 8, jy = ((i * 7) % 4) * 9 - 12;
    const el = D.tool(n, 54 + (i % 4) * 222 + jx, 44 + Math.floor(i / 4) * 190 + jy, i + 1);
    peg2.appendChild(el);
    return el;
  });
  gsap.set(tools20, { autoAlpha: 0.35 });
  tools20.forEach((el, i) => {
    tl.to(el, { autoAlpha: 1, duration: 0.35 }, `ap03+=${0.1 + i * 0.42}`);
  });
  tl.from(s20.querySelector('.ap2-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'ap02')
    .from(s20.querySelector('.ap2-line'), { autoAlpha: 0, y: 24, duration: 0.8, ease: 'expo.out' }, 'ap02+=0.1')
    .from(s20.querySelector('.ap2-note'), { autoAlpha: 0, y: 18, duration: 0.7 }, 'ap02+=1.0')
    .from(s20.querySelector('.ap2-seq'), { autoAlpha: 0, duration: 0.6 }, 'ap04+=0.2');
  s20.querySelector('.ap2-seq').textContent = '→ 故障分析 · 日志分析 · 故障报告';
  tl.fromTo(HS, { pan: -20, zoom: 1.03, light: 0.85, warm: 0.5 },
    { pan: -80, zoom: 1.08, light: 0.9, warm: 0.6, duration: 12, ease: 'sine.inOut' }, S('ap02'));
  scene(s20, S('ap02') - 0.4, S('ap05') + 0.4);
  tl.to(s20, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('ap05') - 0.2);

  // ── S21 · ap05 ap06 ap07 ap08 — 回复、切备线、关单 ─────────────────────
  const s21 = node(`<section class="scene" id="s-ap-03">
    <div class="cam">
      <div class="ap3-kick kicker" style="position:absolute;left:104px;top:196px">查下来是专线丢包</div>
      <div class="ap3-found" style="position:absolute;left:104px;top:244px;width:760px">
        <div class="stencil red" style="font-size:96px">互联网专线丢包</div>
      </div>
      <div class="ap3-printer" style="position:absolute;right:210px;top:220px;width:760px;height:280px"></div>
      <div class="ap3-out" style="position:absolute;right:150px;top:520px;width:820px;height:420px"></div>
      <div class="ap3-close" style="position:absolute;left:104px;top:640px;width:560px;height:300px"></div>
    </div>
  </section>`);
  const printer = D.screen({
    style: 'width:760px;height:280px',
    body: `<div style="font-size:22px;color:#7E93B5;letter-spacing:.04em">MAIL · NTT 回复已发出</div>
      <div style="margin-top:22px;font-size:30px;color:#E7EEFB;line-height:1.55">【回复】网络慢问题受理<br>互联网专线丢包，已安排工程师紧急处理</div>`,
  });
  s21.querySelector('.ap3-printer').appendChild(printer);
  const r1 = D.paper({
    meta: '回复 ①· 09:26', title: '网络慢问题受理',
    lines: ['互联网专线丢包', '已安排工程师紧急处理'],
    style: 'left:0;top:0;width:520px;transform:rotate(-1.6deg)',
  });
  const r2 = D.paper({
    meta: '回复 ② · 10:04', title: '【已恢复】网络已正常',
    lines: ['已切换备线', '客户可继续使用'], stamp: 'CLOSED',
    style: 'left:180px;top:150px;width:520px;transform:rotate(2.2deg)',
  });
  const outBox = s21.querySelector('.ap3-out');
  outBox.appendChild(r1); outBox.appendChild(r2);
  gsap.set([r1, r2], { autoAlpha: 0, y: 50 });
  const cMail = D.screen({
    style: 'width:560px;height:250px',
    body: `<div style="font-size:22px;color:#7E93B5">客户回复 · 10:09</div>
      <div style="margin-top:20px;font-size:30px;color:#E7EEFB">已恢复正常，谢谢</div>`,
  });
  s21.querySelector('.ap3-close').appendChild(cMail);
  gsap.set(cMail, { autoAlpha: 0, y: 30 });
  gsap.set(printer, { autoAlpha: 0, y: 30 });

  tl.from(s21.querySelector('.ap3-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'ap05')
    .from(s21.querySelector('.ap3-found'), { autoAlpha: 0, y: 22, duration: 0.8, ease: 'expo.out' }, 'ap05+=0.15')
    .to(printer, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 'ap06')
    .to(r1, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 'ap06+=0.4')
    .to(r2, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 'ap07+=0.2')
    .to(cMail, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 'ap08+=0.1');
  // the closing stamp lands with the words "工单关单"
  tl.fromTo(r2.querySelector('.p-stamp'), { scale: 1.6, autoAlpha: 0, rotation: -18 },
    { scale: 1, autoAlpha: 1, rotation: -6, duration: 0.35, ease: 'power2.in' }, w('ap08', '关单', -0.1));
  tl.fromTo(HS, { pan: 20, zoom: 1.05, light: 0.85, warm: 0.5, red: 0.1 },
    { pan: -40, zoom: 1.0, light: 0.9, warm: 0.65, red: 0.0, duration: 12, ease: 'sine.inOut' }, S('ap05'));
  scene(s21, S('ap05') - 0.4, S('ap09') + 0.4);
  tl.to(s21, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('ap09') - 0.2);

  // ── S22 · ap09 ap10 — 告警进轨：六步、纸带被盖满墨印 ─────────────────────
  const s22 = node(`<section class="scene" id="s-ap-04">
    <div class="cam">
      <div class="ap4-kick kicker" style="position:absolute;left:104px;top:186px">场景二 · SOC 的一次告警</div>
      <div class="ap4-line head" style="position:absolute;left:104px;top:230px;width:900px;font-size:54px">
        统一受理 → 建单 → 研判 → <span class="hl-blue">全链路留痕</span>
      </div>
      <div class="rail" style="left:110px;right:110px;top:600px"></div>
      <div class="ap4-box" style="position:absolute;left:140px;top:548px;width:78px;height:48px;
           background:linear-gradient(180deg,#8A5560,#2E1C24);box-shadow:0 14px 26px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.35),0 0 30px rgba(255,90,72,.35)"></div>
      <div class="ap4-tape" style="position:absolute;left:150px;width:1560px;top:648px;height:34px;transform:rotate(-0.4deg);
           background:linear-gradient(180deg,#F7F3E9,#DED7C6);box-shadow:0 14px 28px rgba(0,0,0,.65), 0 1px 0 rgba(255,255,255,.5) inset"></div>
      <div class="ap4-glow" style="position:absolute;left:110px;right:110px;top:520px;height:180px;
           background:radial-gradient(60% 100% at 50% 60%, rgba(255,90,72,.18), rgba(255,90,72,0) 70%)"></div>
    </div>
  </section>`);
  const rail4 = s22.querySelector('.rail');
  const ST4 = ['日志收集', '情报聚合', '类型判断', '信息提取', '原因分析', '报告做成'];
  const st4 = ST4.map((label, i) => {
    const el = D.station(label, 36 + i * 280, 20);
    rail4.appendChild(el);
    return el;
  });
  gsap.set(st4, { autoAlpha: 0.22 });
  const tape = s22.querySelector('.ap4-tape');
  const marks = ST4.map((_, i) => {
    const m = document.createElement('div');
    m.style.cssText = `position:absolute;left:${24 + i * 272}px;top:2px;width:40px;height:26px;opacity:0;
      background:radial-gradient(circle at 40% 30%, rgba(160,60,50,.85), rgba(120,40,32,.2) 70%, rgba(120,40,32,0))`;
    tape.appendChild(m);
    return m;
  });
  const box4 = s22.querySelector('.ap4-box');
  tl.from(s22.querySelector('.ap4-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'ap09')
    .from(s22.querySelector('.ap4-line'), { autoAlpha: 0, y: 22, duration: 0.7 }, 'ap09+=0.2')
    .to(st4, { autoAlpha: 1, duration: 0.4, stagger: 0.06 }, 'ap10')
    .to(box4, { x: 1400, duration: 3.6, ease: 'none' }, 'ap10+=0.1')
    .to(marks, { opacity: 1, duration: 0.22, stagger: 0.6 }, 'ap10+=0.35');
  ST4.forEach((_, i) => {
    tl.to(st4[i], { autoAlpha: 1, duration: 0.3 }, `ap10+=${0.1 + i * 0.6}`);
  });
  tl.fromTo(HS, { pan: 10, zoom: 1.04, light: 0.7, red: 0.75, warm: 0.3 },
    { pan: -70, zoom: 1.0, light: 0.78, red: 0.55, warm: 0.4, duration: 9, ease: 'sine.inOut' }, S('ap09'));
  scene(s22, S('ap09') - 0.4, S('ap11') + 0.4);
  tl.to(s22, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('ap11') - 0.2);

  // ── S23 · ap11 ap12 — 墙上背光的 Prompt 骨架 ────────────────────────────
  const s23 = node(`<section class="scene" id="s-ap-05">
    <div class="cam">
      <div class="ap5-kick kicker" style="position:absolute;left:104px;top:180px">六步背后的 Prompt 骨架</div>
      <div class="ap5-sheet" style="position:absolute;left:104px;right:104px;top:230px;height:640px;
           background:linear-gradient(178deg,rgba(246,244,236,.96),rgba(226,222,210,.94));
           box-shadow:0 40px 80px rgba(0,0,0,.6), 0 0 120px rgba(190,215,255,.18)"></div>
      <div class="ap5-lines" style="position:absolute;left:150px;right:150px;top:270px;width:1600px"></div>
      <div class="ap5-focus" style="position:absolute;left:120px;top:392px;width:900px;height:96px;
           box-shadow:0 0 0 2px rgba(255,192,105,.75), 0 0 40px rgba(255,192,105,.35);opacity:0"></div>
    </div>
  </section>`);
  const LINES = [
    ['【角色定位】', '#8A3A2E'],
    ['你是一名拥有 15 年实战经验的高级安全分析师（SOC / DFIR）', '#23262E'],
    ['【分析输入】事件标题 · mitreTechniques · evidence · IP/URL/HASH 威胁情报 · 完整日志', '#3B4048'],
    ['【输出要求】明确给出最可能的攻击类型与判定依据，引用日志中的关键行为或字段', '#3B4048'],
    ['不输出分析过程，仅输出结论', '#23262E'],
    ['【输出格式】{"attack_type": "…", "reason": "…"}', '#8A3A2E'],
  ];
  const lineEls = LINES.map(([t, c], i) => {
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;left:0;top:${i * 86}px;font-size:${i === 1 ? 34 : 27}px;font-weight:${i === 1 ? 800 : 500};color:${c};letter-spacing:.01em`;
    el.textContent = t;
    s23.querySelector('.ap5-lines').appendChild(el);
    return el;
  });
  gsap.set(lineEls, { autoAlpha: 0, x: -14 });
  gsap.set(s23.querySelector('.ap5-sheet'), { autoAlpha: 0, y: 30 });
  tl.from(s23.querySelector('.ap5-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'ap11')
    .to(s23.querySelector('.ap5-sheet'), { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 'ap11+=0.1')
    .to(lineEls, { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.24 }, 'ap11+=0.5')
    .to(s23.querySelector('.ap5-focus'), { opacity: 1, duration: 0.4 }, 'ap12+=0.1');
  tl.fromTo(HS, { pan: -20, zoom: 1.0, light: 0.6, red: 0.3 },
    { pan: 10, zoom: 1.07, light: 0.55, red: 0.1, duration: 8, ease: 'sine.inOut' }, S('ap11'));
  scene(s23, S('ap11') - 0.4, S('ap13') + 0.4);
  tl.to(s23, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('ap13') - 0.2);

  // ── S24 · ap13 — 复核、通报、闭环 ──────────────────────────────────────
  const s24 = node(`<section class="scene" id="s-ap-06">
    <div class="cam">
      <div class="ap6-kick kicker" style="position:absolute;left:104px;top:200px">分析师复核 · 人工通报</div>
      <div class="ap6-line head" style="position:absolute;left:104px;top:244px;width:820px;font-size:58px">
        人确认，才对外
      </div>
      <svg width="900" height="700" style="position:absolute;right:80px;top:200px" viewBox="0 0 900 700">
        <ellipse cx="450" cy="640" rx="330" ry="34" fill="rgba(0,0,0,.5)"/>
        <rect x="150" y="330" width="600" height="26" fill="#101827" stroke="rgba(150,190,240,.2)"/>
        <rect x="170" y="356" width="560" height="250" fill="#0A1120"/>
        <rect x="215" y="270" width="300" height="60" fill="#F2EEE2" transform="rotate(-2 215 270)"/>
        <rect x="240" y="286" width="250" height="2" fill="rgba(40,45,55,.5)"/>
        <rect x="240" y="298" width="210" height="2" fill="rgba(40,45,55,.4)"/>
        <circle cx="640" cy="300" r="46" fill="rgba(255,192,105,.18)"/>
        <circle cx="640" cy="300" r="18" fill="#FFC069"/>
        <path d="M640 346 L640 470" stroke="rgba(255,192,105,.25)" stroke-width="40" stroke-linecap="round"/>
      </svg>
      <div class="ap6-loop" style="position:absolute;left:104px;bottom:170px;display:flex;align-items:center;gap:22px"></div>
    </div>
  </section>`);
  const STEPS = ['研判结论', '分析师复核', '人工通报', '客户处置'];
  const loopEls = STEPS.map((t, i) => {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex;align-items:center;gap:22px';
    el.innerHTML = `<div style="font-size:30px;font-weight:700;color:#DCE6F7">${t}</div>
      ${i < STEPS.length - 1 ? '<div style="width:70px;height:1px;background:rgba(150,190,255,.35)"></div>' : ''}`;
    s24.querySelector('.ap6-loop').appendChild(el);
    return el;
  });
  gsap.set(loopEls, { autoAlpha: 0, y: 12 });
  tl.from(s24.querySelector('.ap6-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'ap13')
    .from(s24.querySelector('.ap6-line'), { autoAlpha: 0, y: 22, duration: 0.7 }, 'ap13+=0.1')
    .to(loopEls, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.3 }, 'ap13+=0.6');
  tl.fromTo(HS, { pan: 40, zoom: 1.02, light: 0.75, warm: 0.7, red: 0.4 },
    { pan: -30, zoom: 1.0, light: 0.85, warm: 0.9, red: 0.12, duration: 7, ease: 'sine.inOut' }, S('ap13'));
  scene(s24, S('ap13') - 0.4, win.b + 0.2);
};
