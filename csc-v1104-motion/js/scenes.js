/*
 * scenes.js — the integrator: installs the world, holds the shared devices, computes each
 * chapter's window and calls its builder in js/seg/<id>.js.
 * Positions come from cue ids (never seconds), so re-recorded narration re-times everything.
 */
Video.define((ctx) => {
  const { tl, cue, cues, scene, onFrame, rand, fitCanvas, stage, W, H: SH } = ctx;
  const gsap = window.gsap;

  const HS = window.HALL.install(ctx).st;
  const K = FXKit.install(ctx);
  const TX = TypeFX.install(ctx);

  const ids = cues.map((c) => c.id);
  const S = (id) => cue(id).start;
  const E = (id) => cue(id).end;
  const w = (id, phrase, off = 0) => cue(id).when(phrase) + off;

  // scenes are sections of the stage itself (smoke.mjs / the player read #stage > .scene)
  const segs = document.getElementById('stage');
  function node(html) {
    const tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    const el = tpl.content.firstElementChild;
    segs.appendChild(el);
    return el;
  }

  // ── shared devices, one implementation each ────────────────────────────────
  const D = {
    // a real sheet of paper on a desk
    paper({ cls = '', title = '', lines = [], meta = '', stamp = '', style = '' }) {
      return node(`<div class="paper ${cls}" style="${style}">
        ${meta ? `<div class="p-meta">${meta}</div>` : ''}
        ${title ? `<div class="p-title">${title}</div>` : ''}
        <div class="p-rule"></div>
        ${lines.map((l) => `<div class="p-line">${l}</div>`).join('')}
        ${stamp ? `<div class="p-stamp">${stamp}</div>` : ''}
      </div>`);
    },
    // a stamped metal plate in the world
    plate(text, cls = '', style = '') {
      return node(`<div class="plate ${cls}" style="${style}">${text}</div>`);
    },
    // a monitor on a desk
    screen({ cls = '', style = '', body = '', log = '' }) {
      return node(`<div class="screen ${cls}" style="${style}">
        ${log ? `<div class="s-log">${log}</div>` : ''}
        <div class="s-body">${body}</div>
      </div>`);
    },
    // big type lit from the side (floor stencil / wall signage)
    stencil(text, cls = '', style = '') {
      return node(`<div class="stencil ${cls}" style="${style}">${text}</div>`);
    },
    // a tool on the pegboard: a Skill
    tool(name, x, y, kind = 0) {
      const shapes = [
        '<svg width="52" height="52" viewBox="0 0 52 52"><path d="M12 34 L26 8 L40 34 Z" fill="none" stroke="#9FB6D8" stroke-width="2.4" stroke-linejoin="round"/></svg>',
        '<svg width="52" height="52" viewBox="0 0 52 52"><rect x="12" y="12" width="28" height="28" rx="3" fill="none" stroke="#9FB6D8" stroke-width="2.4"/><path d="M12 26 h28" stroke="#9FB6D8" stroke-width="2.4"/></svg>',
        '<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="14" fill="none" stroke="#9FB6D8" stroke-width="2.4"/><path d="M26 12 v28 M12 26 h28" stroke="#9FB6D8" stroke-width="2.4"/></svg>',
        '<svg width="52" height="52" viewBox="0 0 52 52"><path d="M14 38 v-12 a12 12 0 0 1 24 0 v12" fill="none" stroke="#9FB6D8" stroke-width="2.4"/><path d="M10 38 h32" stroke="#9FB6D8" stroke-width="2.4"/></svg>',
        '<svg width="52" height="52" viewBox="0 0 52 52"><path d="M12 40 L26 12 L40 40" fill="none" stroke="#9FB6D8" stroke-width="2.4"/><circle cx="26" cy="32" r="4" fill="none" stroke="#9FB6D8" stroke-width="2.2"/></svg>',
        '<svg width="52" height="52" viewBox="0 0 52 52"><path d="M16 16 h20 v20 h-20 z" fill="none" stroke="#9FB6D8" stroke-width="2.4"/><path d="M16 16 L36 36 M36 16 L16 36" stroke="#9FB6D8" stroke-width="2.2"/></svg>',
        '<svg width="52" height="52" viewBox="0 0 52 52"><path d="M26 12 v28" stroke="#9FB6D8" stroke-width="2.6"/><path d="M14 24 h24" stroke="#9FB6D8" stroke-width="2.4"/><circle cx="26" cy="12" r="3.4" fill="none" stroke="#9FB6D8" stroke-width="2"/></svg>',
        '<svg width="52" height="52" viewBox="0 0 52 52"><path d="M14 34 a12 12 0 1 1 24 0" fill="none" stroke="#9FB6D8" stroke-width="2.4"/><path d="M12 40 h28" stroke="#9FB6D8" stroke-width="2.4"/><path d="M26 34 v-8" stroke="#9FB6D8" stroke-width="2.2"/></svg>',
        '<svg width="52" height="52" viewBox="0 0 52 52"><rect x="14" y="20" width="24" height="16" rx="2" fill="none" stroke="#9FB6D8" stroke-width="2.4"/><path d="M26 12 v8" stroke="#9FB6D8" stroke-width="2.4"/><circle cx="26" cy="10" r="3" fill="#9FB6D8"/></svg>',
      ];
      return node(`<div class="tool" data-tool="${name}" style="left:${x}px;top:${y}px">
        <div class="t-hook"></div>
        <div class="t-shape">${shapes[kind % shapes.length]}</div>
        <div class="t-tag">${name}</div>
      </div>`);
    },
    // one station of the rail
    station(label, x, top) {
      return node(`<div class="station" style="left:${x}px;top:${top}px;height:120px">
        <div class="st-lb">${label}</div>
      </div>`);
    },
  };

  // ── chapter windows (references/long-form.md §4) ──────────────────────────
  const ORDER = ['bk', 'kd', 'jf', 'ap', 'pc', 'cg'];
  const first = (s) => ids.find((i) => i.startsWith(s));
  const last = (s) => [...ids].reverse().find((i) => i.startsWith(s));
  const startOf = (k) => {
    const fk = first(ORDER[k]);
    const pl = k > 0 ? last(ORDER[k - 1]) : null;
    return pl ? Math.max(S(fk) - 1.05, E(pl) - 0.25) : 0;
  };

  const CHAPTERS = {
    bk: { n: '01', q: '每天在这里<span class="hl">跑</span>的是什么？' },
    kd: { n: '02', q: '量压到人头上，<span class="hl">卡</span>在三个字？' },
    jf: { n: '03', q: '两种业务，怎么用<span class="hl">一套底座</span>跑？' },
    ap: { n: '04', q: '真跑起来，<span class="hl">是</span>什么样子？' },
    pc: { n: '05', q: '模型之外，<span class="hl">功夫</span>花在哪？' },
    cg: { n: '06', q: '省下了多少，<span class="hl">改变</span>了什么？' },
  };

  const H = { S, E, w, node, D, HS, tl, cue, cues, scene, stage, W, H: SH, rand, gsap, onFrame, fitCanvas, data: ctx.data };

  ORDER.forEach((seg, i) => {
    const a = i === 0 ? 0 : startOf(i);
    const b = ORDER[i + 1] ? startOf(i + 1) : ctx.data.duration;
    const win = { id: seg, first: first(seg), last: last(seg), a, b, index: i };

    // the chapter card: light on the glass, over the chapter's establishing shot
    const ch = CHAPTERS[seg];
    const card = node(`<section class="scene chap" id="chap-${seg}">
      <div class="c-num stencil amber">${ch.n}</div>
      <div class="c-q hero">${ch.q}</div>
      <div class="c-strip"></div>
    </section>`);
    const cardIn = Math.max(0, win.a + 0.15);
    const cardOut = Math.min(S(win.first) + 1.2, win.b - 0.5);
    gsap.set(card.querySelector('.c-num'), { autoAlpha: 0, y: 40 });
    gsap.set(card.querySelector('.c-q'), { autoAlpha: 0, y: 26 });
    gsap.set(card.querySelector('.c-strip'), { scaleX: 0, transformOrigin: 'left center' });
    tl.to(card.querySelector('.c-num'), { autoAlpha: 1, y: 0, duration: 0.85, ease: 'expo.out' }, cardIn)
      .to(card.querySelector('.c-q'), { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out' }, cardIn + 0.18)
      .to(card.querySelector('.c-strip'), { scaleX: 1, duration: 1.1, ease: 'power3.inOut' }, cardIn + 0.3)
      .to(card, { autoAlpha: 0, duration: 0.55, ease: 'power2.in' }, cardOut);
    scene(card, win.a, cardOut + 0.6);

    // the signature transition: the signal's pulse sweeps the frame and re-lights the hall
    if (i > 0) {
      const wipe = document.querySelector('.lightwipe');
      tl.fromTo(wipe, { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.55, ease: 'power2.in' }, win.a - 0.55)
        .set(wipe, { transformOrigin: 'right center' })
        .to(wipe, { scaleX: 0, duration: 0.7, ease: 'power2.out' }, win.a + 0.02);
    }

    try {
      window.SEG[seg](ctx, K, TX, H, win);
    } catch (err) {
      console.error(`[${seg}] segment failed`, err);
    }
  });
});
