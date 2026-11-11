/* seg/jf.js — 03 解法：两种场景两种解法，一套底座 CSM Agent One */
window.SEG = window.SEG || {};
window.SEG.jf = (ctx, K, TX, H, win) => {
  const { tl, cue, scene, onFrame, W, H: SH, gsap, HS, node, D, S, E, w, rand } = H;

  // ── S12 · jf01 jf02 jf03 — 桌面上摊开的四张申报 ────────────────────────
  const s12 = node(`<section class="scene" id="s-jf-01">
    <div class="cam">
      <div class="jf-kick kicker" style="position:absolute;left:104px;top:200px">客服要的是覆盖</div>
      <div class="jf-lead head" style="position:absolute;left:104px;top:244px;width:780px;font-size:64px">
        申报<span class="hl-blue">千变万化</span>，<br>没法穷举
      </div>
      <div class="jf-stack" style="position:absolute;right:120px;bottom:150px;width:760px;height:520px"></div>
    </div>
  </section>`);
  const stack = s12.querySelector('.jf-stack');
  const reqs = [
    ['PHP2Shell 漏洞', '对我司的影响是什么？', -7, 40, 30],
    ['全员 O365 邮件', '无法收发', 4, 150, 120],
    ['大量线路', '同时中断', -5, 300, 30],
    ['安全审核', '请提供半年变更记录', 6, 420, 140],
  ];
  const sheets12 = reqs.map(([t1, t2, rot, top, left], i) => {
    const el = D.paper({
      meta: `客户申报 · ${['CS-2411-07', 'CS-2411-08', 'CS-2411-09', 'CS-2411-10'][i]}`,
      title: t1, lines: [t2], style: `left:${left}px;top:${top}px;width:420px;transform:rotate(${rot}deg)`,
    });
    stack.appendChild(el);
    return el;
  });
  gsap.set(sheets12, { autoAlpha: 0, y: 60 });
  tl.from(s12.querySelector('.jf-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'jf01')
    .from(s12.querySelector('.jf-lead'), { autoAlpha: 0, y: 24, duration: 0.8, ease: 'expo.out' }, 'jf02')
    .to(sheets12, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.42, ease: 'expo.out' }, 'jf03+=0.2');
  tl.fromTo(HS, { pan: 30, zoom: 1.02, light: 0.9, warm: 0.3 },
    { pan: -40, zoom: 1.1, light: 0.8, warm: 0.45, duration: 9, ease: 'sine.inOut' }, S('jf01'));
  scene(s12, win.a, S('jf04') + 0.4);
  tl.to(s12, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('jf04') - 0.2);

  // ── S13 · jf04 jf05 jf06 — 工具墙：把场景拆成 Skill ────────────────────
  const s13 = node(`<section class="scene" id="s-jf-02">
    <div class="cam">
      <div class="peg" style="position:absolute;right:60px;top:110px;width:940px;height:640px"></div>
      <div class="jf2-kick kicker" style="position:absolute;left:104px;top:200px">第一个解法</div>
      <div class="jf2-line head" style="position:absolute;left:104px;top:244px;width:640px;font-size:64px">
        Agent <span class="hl">+</span> Skill
      </div>
      <div class="jf2-sub sub" style="position:absolute;left:104px;top:360px;width:620px;font-size:38px">
        场景拆成一个一个 Skill：<br>可以重复调用，也可以组合
      </div>
      <div class="jf2-note sub" style="position:absolute;left:104px;top:560px;width:620px;font-size:34px;color:#9FB8FF">
        按申报内容自主规划、组合使用 → 覆盖长尾
      </div>
    </div>
  </section>`);
  const peg = s13.querySelector('.peg');
  const TOOLS = ['工单统计', '资产调查', '监控调查', '故障排查', '报告生成', '证据收集', '情报验证',
    '联系人查询', '合同查询', '设备查询', '线路查询', '日志分析'];
  const tools13 = TOOLS.map((n, i) => {
    const jx = ((i * 5) % 3) * 8 - 8, jy = ((i * 7) % 4) * 9 - 12;
    const el = D.tool(n, 54 + (i % 4) * 218 + jx, 48 + Math.floor(i / 4) * 190 + jy, i);
    peg.appendChild(el);
    return el;
  });
  gsap.set(tools13, { autoAlpha: 0, y: -14 });
  tl.from(s13.querySelector('.jf2-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'jf04')
    .from(s13.querySelector('.jf2-line'), { autoAlpha: 0, y: 24, duration: 0.8, ease: 'expo.out' }, 'jf04+=0.2')
    .from(s13.querySelector('.jf2-sub'), { autoAlpha: 0, y: 20, duration: 0.7 }, 'jf05+=0.1')
    .to(tools13, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.055, ease: 'power2.out' }, 'jf05+=0.2')
    // three of them are the ones this request needs
    .to([tools13[2], tools13[11], tools13[4]], { y: 26, duration: 0.5, stagger: 0.28, ease: 'power2.inOut' }, 'jf06+=0.3')
    .from(s13.querySelector('.jf2-note'), { autoAlpha: 0, y: 18, duration: 0.7 }, 'jf06+=1.1');
  tl.fromTo(HS, { pan: -20, zoom: 1.02, light: 0.85 },
    { pan: -70, zoom: 1.07, light: 0.95, duration: 10, ease: 'sine.inOut' }, S('jf04'));
  scene(s13, S('jf04') - 0.4, S('jf07') + 0.4);
  tl.to(s13, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('jf07') - 0.2);

  // ── S14 · jf07 jf08 — 单向钢轨：六步锁死，每步留痕 ──────────────────────
  const s14 = node(`<section class="scene" id="s-jf-03">
    <div class="cam">
      <div class="rail" style="left:120px;right:120px;top:610px"></div>
      <div class="jf3-kick kicker" style="position:absolute;left:104px;top:190px">第二个解法 · 安全这边要的是严谨</div>
      <div class="jf3-line head" style="position:absolute;left:104px;top:234px;width:900px;font-size:62px">
        Agent <span class="hl-blue">+</span> Workflow
      </div>
      <div class="jf3-sub sub" style="position:absolute;left:104px;top:352px;width:900px;font-size:36px">
        六步顺序强依赖，前一步错了，后面的结论不可逆 —— 所以流程锁死
      </div>
      <div class="jf3-note sub" style="position:absolute;right:104px;top:352px;width:620px;font-size:34px;color:#9FB8FF;text-align:right">
        AI 严格按流程执行 · 每一步留痕 · 事后可举证
      </div>
      <div class="jf3-box" style="position:absolute;left:150px;top:552px;width:64px;height:40px;
           background:linear-gradient(180deg,#4A5B78,#1B2434);box-shadow:0 10px 20px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.3)"></div>
      <div class="jf3-trail" style="position:absolute;left:150px;right:160px;top:648px;height:26px"></div>
    </div>
  </section>`);
  const ST = ['日志收集', '情报聚合', '类型判断', '信息提取', '原因分析', '报告做成'];
  const railEl = s14.querySelector('.rail');
  const stations = ST.map((label, i) => {
    const el = D.station(label, 40 + i * 270, 20);
    railEl.appendChild(el);
    return el;
  });
  gsap.set(stations, { autoAlpha: 0.25 });
  const box = s14.querySelector('.jf3-box');
  const trail = s14.querySelector('.jf3-trail');
  const stamps = ST.map((_, i) => {
    const m = document.createElement('div');
    m.style.cssText = `position:absolute;left:${20 + i * 270}px;top:0;width:34px;height:26px;opacity:0;
      background:radial-gradient(circle at 40% 30%, rgba(255,192,105,.9), rgba(200,140,60,.25) 70%, rgba(160,100,40,0))`;
    trail.appendChild(m);
    return m;
  });
  tl.from(s14.querySelector('.jf3-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'jf07')
    .from(s14.querySelector('.jf3-line'), { autoAlpha: 0, y: 24, duration: 0.8, ease: 'expo.out' }, 'jf07+=0.1')
    .from(s14.querySelector('.jf3-sub'), { autoAlpha: 0, y: 18, duration: 0.7 }, 'jf07+=0.6')
    .to(stations, { autoAlpha: 1, duration: 0.5, stagger: 0.08 }, 'jf07+=0.9')
    .to(box, { x: 1350, duration: 3.4, ease: 'none' }, 'jf08+=0.15')
    .to(stamps, { opacity: 1, duration: 0.2, stagger: 0.56 }, 'jf08+=0.35')
    .from(s14.querySelector('.jf3-note'), { autoAlpha: 0, y: 18, duration: 0.7 }, 'jf08+=0.9');
  // each station lights as the box passes it
  ST.forEach((_, i) => {
    tl.to(stations[i], { autoAlpha: 1, duration: 0.3 }, `jf08+=${0.15 + i * 0.56}`);
  });
  tl.fromTo(HS, { pan: 20, zoom: 1.04, light: 0.75, red: 0.15 },
    { pan: -60, zoom: 1.0, light: 0.85, red: 0.35, duration: 9, ease: 'sine.inOut' }, S('jf07'));
  scene(s14, S('jf07') - 0.4, S('jf09') + 0.4);
  tl.to(s14, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('jf09') - 0.2);

  // ── S15 · jf09 jf10 jf11 — 同一台机器：入口在上，结果在下 ───────────────
  const s15 = node(`<section class="scene" id="s-jf-04">
    <div class="cam">
      <div class="jf4-kick kicker" style="position:absolute;left:104px;top:176px">两种走法，同一套底座</div>
      <div class="jf4-name stencil" style="position:absolute;left:96px;top:214px;font-size:120px">CSM Agent One</div>
      <div class="jf4-entries" style="position:absolute;left:120px;right:120px;top:392px;display:flex;gap:14px;flex-wrap:wrap;width:1680px"></div>
      <div class="jf4-body" style="position:absolute;left:260px;top:520px;width:1400px;height:330px;
           background:
             linear-gradient(118deg, rgba(190,215,255,.16) 0%, rgba(190,215,255,.04) 22%, rgba(190,215,255,0) 38%),
             linear-gradient(170deg, rgba(30,46,78,.94), rgba(6,11,20,.98));
           box-shadow:inset 0 2px 0 rgba(215,232,255,.45), inset 0 -2px 0 rgba(0,0,0,.7),
             inset 0 0 0 1px rgba(160,200,255,.34), 0 44px 90px rgba(0,0,0,.75);border-radius:6px">
           <div style="position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,rgba(150,190,255,.1),rgba(210,230,255,.85),rgba(150,190,255,.1))"></div>
           ${[['left:16px;top:16px'],['right:16px;top:16px'],['left:16px;bottom:16px'],['right:16px;bottom:16px']].map(([pos]) =>
             `<div style="position:absolute;${pos};width:9px;height:9px;border-radius:50%;
                background:radial-gradient(circle at 35% 30%,#E7F0FF,#5A6B85 60%,#1B2434);box-shadow:0 1px 2px rgba(0,0,0,.7)"></div>`).join('')}
      </div>
      <div class="jf4-core" style="position:absolute;left:760px;top:588px;width:400px;height:210px;
           background:radial-gradient(circle at 50% 50%, rgba(150,190,255,.85), rgba(46,107,255,.28) 45%, rgba(10,20,40,0) 100%);
           filter:blur(2px)"></div>
      <div class="jf4-core-t" style="position:absolute;left:800px;top:668px;width:320px;text-align:center;font-size:30px;font-weight:700;color:#DCE7FB">任务分析</div>
      <div class="jf4-core-t2" style="position:absolute;left:760px;top:706px;width:400px;text-align:center;font-size:24px;color:#9FB8FF">复杂任务自主规划 · 标准任务既定流程</div>
      <div class="jf4-out" style="position:absolute;left:120px;right:120px;top:880px;display:flex;gap:26px;width:1680px"></div>
    </div>
  </section>`);
  const entries = ['计划作业', '故障申报', '变更申请', '咨询协助', '告警', 'CSM', '文档系统', '监控系统'];
  const entryEls = entries.map((t) => {
    const el = document.createElement('div');
    el.className = 'plate';
    el.style.cssText = 'position:relative;font-size:24px';
    el.textContent = t;
    s15.querySelector('.jf4-entries').appendChild(el);
    return el;
  });
  const outs = ['统计', '预警', '审计'];
  const outEls = outs.map((t) => {
    const el = D.plate(t, '', 'position:relative;font-size:24px');
    s15.querySelector('.jf4-out').appendChild(el);
    return el;
  });
  gsap.set(entryEls, { autoAlpha: 0, y: -12 });
  gsap.set(outEls, { autoAlpha: 0, y: 12 });
  gsap.set(s15.querySelector('.jf4-body'), { autoAlpha: 0, scaleY: 0.9, transformOrigin: '50% 0%' });
  gsap.set([s15.querySelector('.jf4-core'), s15.querySelector('.jf4-core-t'), s15.querySelector('.jf4-core-t2')], { autoAlpha: 0 });
  tl.from(s15.querySelector('.jf4-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'jf09')
    .from(s15.querySelector('.jf4-name'), { autoAlpha: 0, y: 30, duration: 0.9, ease: 'expo.out' }, 'jf09+=0.1')
    .to(entryEls, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.07 }, 'jf10+=0.1')
    .to(s15.querySelector('.jf4-body'), { autoAlpha: 1, scaleY: 1, duration: 0.8, ease: 'power2.out' }, 'jf11+=0.1')
    .to([s15.querySelector('.jf4-core'), s15.querySelector('.jf4-core-t'), s15.querySelector('.jf4-core-t2')],
      { autoAlpha: 1, duration: 0.7, stagger: 0.12 }, 'jf11+=0.4')
    .to(outEls, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12 }, 'jf11+=1.1');
  tl.fromTo(HS, { pan: 0, zoom: 1.06, light: 0.8, warm: 0.3 },
    { pan: 0, zoom: 0.94, light: 0.95, warm: 0.55, duration: 10, ease: 'sine.inOut' }, S('jf09'));
  scene(s15, S('jf09') - 0.4, S('jf12') + 0.4);
  tl.to(s15, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('jf12') - 0.2);

  // ── S16 · jf12 jf13 — 玻璃里面：五样东西 ────────────────────────────────
  const s16 = node(`<section class="scene" id="s-jf-05">
    <div class="cam">
      <div class="jf5-kick kicker" style="position:absolute;left:104px;top:190px">它手上的五样东西</div>
      <div class="jf5-glass" style="position:absolute;left:140px;right:140px;top:300px;height:600px;
           background:linear-gradient(165deg,rgba(26,42,72,.42),rgba(8,14,26,.72));
           box-shadow:inset 0 0 0 1px rgba(160,195,255,.20), inset 0 40px 80px rgba(120,160,255,.06), 0 40px 90px rgba(0,0,0,.6);
           border-radius:8px"></div>
      <div class="jf5-row" style="position:absolute;left:200px;right:200px;top:380px;display:flex;justify-content:space-between;width:1520px"></div>
      <div class="jf5-note sub" style="position:absolute;left:104px;bottom:120px;width:900px;font-size:34px;color:#A9BDE2">
        知识库里放的是客户环境、设备、线路、合同，还有过去每一次的处置经验
      </div>
    </div>
  </section>`);
  const FIVE = [
    ['MCP', '连外部系统', '<path d="M14 30 h24 M14 38 h24 M20 46 h12" stroke="#9FB6D8" stroke-width="2.6"/>'],
    ['记忆', '会话上下文', '<circle cx="26" cy="34" r="13" fill="none" stroke="#9FB6D8" stroke-width="2.6"/><path d="M26 21 v13 h10" stroke="#9FB6D8" stroke-width="2.6"/>'],
    ['Skill 池', '可复用的做法', '<rect x="12" y="20" width="28" height="26" rx="3" fill="none" stroke="#9FB6D8" stroke-width="2.6"/><path d="M18 28 h16 M18 36 h16" stroke="#9FB6D8" stroke-width="2.4"/>'],
    ['Prompt', '规程与格式', '<path d="M16 18 h20 v32 h-20 z" fill="none" stroke="#9FB6D8" stroke-width="2.6"/><path d="M20 26 h12 M20 34 h12 M20 42 h8" stroke="#9FB6D8" stroke-width="2.2"/>'],
    ['知识库', '环境·设备·经验', '<path d="M12 24 h28 v8 h-28 z M12 36 h28 v8 h-28 z" fill="none" stroke="#9FB6D8" stroke-width="2.4"/>'],
  ];
  const fiveEls = FIVE.map(([name, note, shape]) => {
    const el = document.createElement('div');
    el.style.cssText = 'width:270px;text-align:center';
    el.innerHTML = `<div style="height:96px;display:flex;align-items:center;justify-content:center">
        <svg width="72" height="72" viewBox="0 0 52 60">${shape}</svg></div>
      <div style="margin-top:8px;font-size:32px;font-weight:800;color:#E7EEFB">${name}</div>
      <div style="margin-top:6px;font-size:23px;color:#93A2BA">${note}</div>`;
    s16.querySelector('.jf5-row').appendChild(el);
    return el;
  });
  gsap.set(fiveEls, { autoAlpha: 0, y: 22 });
  tl.from(s16.querySelector('.jf5-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'jf12')
    .from(s16.querySelector('.jf5-glass'), { autoAlpha: 0, duration: 0.9 }, 'jf12+=0.1')
    .to(fiveEls, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.3, ease: 'power2.out' }, 'jf12+=0.3')
    .from(s16.querySelector('.jf5-note'), { autoAlpha: 0, y: 16, duration: 0.7 }, 'jf13+=0.3');
  tl.fromTo(HS, { pan: -20, zoom: 1.02, light: 0.85, warm: 0.5, dark: 0.1 },
    { pan: 30, zoom: 1.09, light: 0.8, warm: 0.55, dark: 0.35, duration: 9, ease: 'sine.inOut' }, S('jf12'));
  scene(s16, S('jf12') - 0.4, S('jf14') + 0.4);
  tl.to(s16, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('jf14') - 0.2);

  // ── S17 · jf14 — 电子围栏：光柱围着机器，推理不出域 ─────────────────────
  const s17 = node(`<section class="scene" id="s-jf-06">
    <div class="cam">
      <div class="jf6-kick kicker" style="position:absolute;left:104px;top:196px">底座外面有一道围栏</div>
      <div class="jf6-line head" style="position:absolute;left:104px;top:240px;width:760px;font-size:68px">
        电子围栏<br><span class="hl-blue">推理不出域</span>
      </div>
      <div class="jf6-sub sub" style="position:absolute;left:104px;top:430px;width:660px;font-size:36px">
        模型用的是本地 LLM ——<br>数据不离开内网
      </div>
      <svg width="900" height="760" style="position:absolute;right:60px;top:170px" viewBox="0 0 900 760">
        <g class="jf6-fence">
          ${Array.from({ length: 9 }, (_, i) => {
            const a = (i / 9) * Math.PI * 2;
            const x = 450 + Math.cos(a) * 330, y = 400 + Math.sin(a) * 250;
            return `<line x1="${x.toFixed(0)}" y1="${(y + 60).toFixed(0)}" x2="${x.toFixed(0)}" y2="${(y - 210).toFixed(0)}" stroke="rgba(120,200,255,.30)" stroke-width="2"/>`;
          }).join('')}
          <ellipse cx="450" cy="462" rx="330" ry="250" fill="none" stroke="rgba(120,200,255,.34)" stroke-width="2" stroke-dasharray="7 9"/>
        </g>
        <g class="jf6-core">
          <circle cx="450" cy="400" r="86" fill="rgba(46,107,255,.16)"/>
          <circle cx="450" cy="400" r="52" fill="rgba(120,165,255,.30)"/>
          <circle cx="450" cy="400" r="22" fill="#BFD6FF"/>
          <text x="450" y="416" text-anchor="middle" fill="#0A1020" font-size="20" font-weight="900"
                font-family="Noto Sans SC, Pretendard, sans-serif">LLM</text>
        </g>
        <text x="450" y="190" text-anchor="middle" fill="rgba(180,215,255,.55)" font-size="26" font-weight="600"
              font-family="Noto Sans SC, Pretendard, sans-serif">内网 · 数据不出域</text>
      </svg>
    </div>
  </section>`);
  const fence = s17.querySelector('.jf6-fence');
  gsap.set(fence, { autoAlpha: 0, scaleY: 0.86, transformOrigin: '50% 100%' });
  gsap.set(s17.querySelector('.jf6-core'), { autoAlpha: 0, scale: 0.9, transformOrigin: '50% 50%' });
  tl.from(s17.querySelector('.jf6-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'jf14')
    .from(s17.querySelector('.jf6-line'), { autoAlpha: 0, y: 24, duration: 0.8, ease: 'expo.out' }, 'jf14+=0.1')
    .to(s17.querySelector('.jf6-core'), { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'expo.out' }, 'jf14+=0.5')
    .to(fence, { autoAlpha: 1, scaleY: 1, duration: 1.1, ease: 'power2.out' }, 'jf14+=0.9')
    .from(s17.querySelector('.jf6-sub'), { autoAlpha: 0, y: 18, duration: 0.7 }, 'jf14+=1.3');
  tl.fromTo(HS, { pan: 40, zoom: 1.0, light: 0.7, dawn: 0 },
    { pan: -20, zoom: 1.06, light: 0.65, dawn: 0, duration: 7, ease: 'sine.inOut' }, S('jf14'));
  scene(s17, S('jf14') - 0.4, S('jf15') + 0.4);
  tl.to(s17, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, S('jf15') - 0.2);

  // ── S18 · jf15 jf16 — 出口三路，leader 放行 ────────────────────────────
  const s18 = node(`<section class="scene" id="s-jf-07">
    <div class="cam">
      <div class="jf7-kick kicker" style="position:absolute;left:104px;top:196px">结果分三路</div>
      <div class="jf7-row" style="position:absolute;left:104px;top:250px;display:flex;gap:60px"></div>
      <div class="jf7-line head" style="position:absolute;left:104px;top:470px;width:900px;font-size:58px">
        经过 leader <span class="hl">审核放行</span>
      </div>
      <div class="jf7-four" style="position:absolute;left:104px;top:600px;width:820px;display:flex;flex-wrap:wrap;gap:18px 26px"></div>
    </div>
  </section>`);
  const OUTS = ['统计', '预警', '审计'];
  const routeEls = OUTS.map((t) => {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex;align-items:center;gap:16px';
    el.innerHTML = `<div style="width:120px;height:8px;background:linear-gradient(90deg,rgba(46,107,255,.85),rgba(46,107,255,.1))"></div>
      <div style="font-size:36px;font-weight:700;color:#E7EEFB">${t}</div>`;
    s18.querySelector('.jf7-row').appendChild(el);
    return el;
  });
  const FOUR = ['处置结论', '过程记录', '客户答复', '优化建议'];
  const fourEls = FOUR.map((t) => {
    const el = D.plate(t, '', 'position:relative;font-size:25px');
    s18.querySelector('.jf7-four').appendChild(el);
    return el;
  });
  const approval = D.paper({
    meta: 'leader 审阅', title: '放行',
    lines: ['结论与证据一并提交', '签字后对外'], stamp: 'APPROVED',
    style: 'right:110px;top:410px;width:470px;transform:rotate(-2.4deg)',
  });
  s18.querySelector('.cam').appendChild(approval);
  gsap.set(routeEls, { autoAlpha: 0, x: -20 });
  gsap.set(fourEls, { autoAlpha: 0, y: 14 });
  gsap.set(approval, { autoAlpha: 0, y: 40, rotation: 0 });
  tl.from(s18.querySelector('.jf7-kick'), { autoAlpha: 0, y: -10, duration: 0.5 }, 'jf15')
    .to(routeEls, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.18 }, 'jf15+=0.1')
    .from(s18.querySelector('.jf7-line'), { autoAlpha: 0, y: 22, duration: 0.7 }, 'jf15+=0.7')
    .to(approval, { autoAlpha: 1, y: 0, rotation: -2.4, duration: 0.9, ease: 'expo.out' }, 'jf15+=1.3')
    .to(fourEls, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.14 }, 'jf16+=0.2');
  tl.fromTo(HS, { pan: -30, zoom: 1.05, light: 0.8, warm: 0.5 },
    { pan: 40, zoom: 0.98, light: 0.95, warm: 0.75, duration: 8, ease: 'sine.inOut' }, S('jf15'));
  scene(s18, S('jf15') - 0.4, win.b + 0.2);
};
