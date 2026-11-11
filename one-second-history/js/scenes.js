/*
 * scenes.js — the video itself. Everything is placed on the master timeline `tl`
 * at times derived from narration cues, so re-generated narration re-times the visuals.
 *
 * Position shorthands: every cue id is a timeline label, plus `<id>_end`.
 *   tl.from('#s01 .title', { yPercent: 110, duration: 0.9, ease: 'expo.out' }, 'c01+=0.1');
 *   tl.to('#s01', { autoAlpha: 0, duration: 0.4 }, 'c02-=0.3');
 *   cue('c03').when('핵심 단어')   → the time that phrase is spoken (measured from the take once scripts/sync.mjs has run,
 *                                   estimated by character position until then)
 *
 * Rules: no Math.random / Date / setTimeout / standalone gsap.to() — see references/player-api.md.
 * Kits (optional, already linked in index.html): const K = FXKit.install(ctx) — impacts, counters, particles
 * (references/fx-kit.md); const TX = TypeFX.install(ctx) — expressive typography (references/type-fx.md).
 * Footage (references/footage.md): const M = MEDIA.install(ctx) — clips on the master clock (declared in js/media-src.js);
 * const R = RecKit.install(ctx) — a recording window, dim-the-rest highlights and pinned-up callouts (never zoom in).
 * Long videos (references/long-form.md): one builder per chapter in js/seg/<id>.js, called from here with its window.
 */
Video.define(({ tl, cue, cues, scene, onFrame, rand, fitCanvas, stage, W, H }) => {
  scene('#s01', 'c01', 'c03');
  scene('#s02', 'c03', 'c07');
  scene('#s03', 'c06', 'c11');
  scene('#s04', 'c11', null);

  const sceneWindows = [
    ['#s01', cue('c01').start, cue('c03').start],
    ['#s02', cue('c03').start, cue('c07').start],
    ['#s03', cue('c06').start, cue('c11').start],
    ['#s04', cue('c11').start, null],
  ].map(([selector, start, end]) => [stage.querySelector(selector), start, end]);
  onFrame((t) => {
    for (const [el, start, end] of sceneWindows) {
      el.style.visibility = t >= start && (end == null || t < end) ? 'visible' : 'hidden';
    }
  });

  tl.fromTo('#s01 .brass-dial', { scale: 0.78, rotation: -18, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 1.4, ease: 'power3.out' }, 'c01');
  tl.fromTo('#s01 .dial-hand', { rotation: -42 }, { rotation: 22, duration: 5.4, ease: 'power1.inOut' }, 'c01+=0.2');
  tl.fromTo('#s01 .hero-copy', { x: -70, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.05, ease: 'power3.out' }, 'c01+=0.55');
  tl.fromTo('#s01 .gathering', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 'c02+=0.4');
  tl.fromTo('#s01 .brass-dial', { x: 0, scale: 1 }, { x: 78, scale: 0.87, duration: 1.1, ease: 'power2.inOut' }, 'c02+=0.5');
  tl.fromTo('#s01 .hero-copy', { y: 0, scale: 1 }, { y: -22, scale: 0.94, duration: 1.1, ease: 'power2.inOut' }, 'c02+=0.5');
  tl.fromTo('#s01 .gathering', { x: 0, scale: 1 }, { x: 120, scale: 1.14, duration: 1, ease: 'power2.out' }, 'c02+=0.8');
  tl.fromTo('#s01 .brass-dial', { x: 78, scale: 0.87 }, { x: 80, scale: 0.82, duration: 0.75, ease: 'power2.inOut' }, 'c03-=0.55');

  tl.fromTo('#s02 .sun-orbit', { scale: 0.72, rotation: -8, autoAlpha: 0 }, { scale: 1, rotation: -21, autoAlpha: 1, duration: 1.3, ease: 'power2.out' }, 'c03');
  tl.fromTo('#s02 .sun', { x: -110, y: 70 }, { x: 250, y: 300, duration: 7, ease: 'sine.inOut' }, 'c03');
  tl.fromTo('#s02 .stone-number', { x: 130, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out' }, 'c03+=0.65');
  tl.fromTo('#s02 .stone-caption', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 'c03+=1.05');
  tl.fromTo('#s02 .stone-number', { x: 0 }, { x: 70, duration: 0.8 }, 'c04+=0.3');
  tl.fromTo('#s02 .shadow-clock', { x: -80, rotation: 0, autoAlpha: 0 }, { x: 0, rotation: -8, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, 'c03+=0.3');
  tl.fromTo('#s02 .shadow-pointer', { rotation: 60 }, { rotation: -15, duration: 6.5, ease: 'sine.inOut' }, 'c04');
  tl.fromTo('#s02 .orbit-year', { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 'c05');
  tl.fromTo('#s02 .year-astrolabe', { scale: 0.76, rotation: -22, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, 'c05');
  tl.fromTo('#s02 .year-number', { scale: 1.1, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.1, ease: 'power2.out' }, 'c05+=0.5');
  tl.fromTo('#s02 .stone-number', { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.6 }, 'c05+=0.2');
  tl.fromTo('#s02 .sun-orbit, #s02 .shadow-clock', { autoAlpha: 1 }, { autoAlpha: 0.38, duration: 0.9 }, 'c06+=0.1');

  tl.fromTo('#s02 .scene-kicker', { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5 }, 'c06+=0.2');
  tl.fromTo('#s03 .scene-kicker', { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 'c06+=0.4');
  tl.fromTo('#s03 .lab-window', { x: 180, rotation: 16, autoAlpha: 0 }, { x: 0, rotation: 8, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, 'c06');
  tl.fromTo('#s03 .beam', { scaleX: 0.1, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 1.3, ease: 'power2.out' }, 'c06+=0.4');
  tl.fromTo('#s03 .vacuum-tube', { y: 60, x: -980, scale: 0.72, autoAlpha: 0 }, { y: 0, x: -850, scale: 1.7, autoAlpha: 1, duration: 1.1, ease: 'power2.out' }, 'c07');
  tl.fromTo('#s03 .atom', { scale: 0.2, autoAlpha: 0 }, { scale: 2.4, autoAlpha: 1, duration: 0.8, ease: 'power2.out' }, 'c07+=0.25');
  tl.fromTo('#s03 .level', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7, stagger: 0.3 }, 'c07+=0.55');
  tl.fromTo('#s03 .count-number', { x: -80, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out' }, 'c09');
  tl.fromTo('#s03 .resonator', { scaleX: 0.12, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 1.25, ease: 'power2.out' }, 'c09-=0.2');
  tl.fromTo('#s03 .count-caption', { y: 25, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 'c09+=0.45');
  tl.fromTo('#s03 .year-stamp', { autoAlpha: 0, letterSpacing: '0.4em' }, { autoAlpha: 1, letterSpacing: '0.1em', duration: 0.9 }, 'c08+=0.45');
  tl.fromTo('#s03 .standard-plate', { x: -100, rotation: -28, autoAlpha: 0 }, { x: 0, rotation: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, 'c08');
  tl.fromTo('#s03 .refine', { x: 35, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8 }, 'c10+=0.35');
  tl.fromTo('#s03 .vacuum-tube', { scale: 1.7, x: -850 }, { scale: 0.92, x: 38, duration: 1.1, ease: 'power2.inOut' }, 'c08+=0.4');
  tl.fromTo('#s03 .count-number', { scale: 1 }, { scale: 1.04, duration: 1.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 'c09+=1.2');

  tl.fromTo('#s04 .wave-ribbon', { x: -120, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, 'c11');
  tl.fromTo('#s04 .one-second', { y: 38, scale: 0.88, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 1, ease: 'power3.out' }, 'c11+=0.45');
  tl.fromTo('#s04 .present-caption', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 'c11+=0.9');
  tl.fromTo('#s04 .wave-ribbon', { x: 0, y: 0, rotation: -8, scaleX: 1, scaleY: 1, autoAlpha: 1 }, { x: 650, y: 410, rotation: 82, scaleX: 0.18, scaleY: 0.045, autoAlpha: 0.72, duration: 1.4, ease: 'power2.inOut' }, 'c12');
  tl.fromTo('#s04 .one-second, #s04 .present-caption', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -25, duration: 0.7, ease: 'power2.in' }, 'c12+=0.15');
  tl.fromTo('#s04 .closing', { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, 'c12+=0.9');
  tl.fromTo('#s04 .closing-foot', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 'c12+=2');
  tl.fromTo('#s04 .closing-clock', { scale: 0.72, rotation: -28, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, 'c12+=1.4');
  tl.fromTo('#s04 .far-clock', { scale: 0.75, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, stagger: 0.22 }, 'c12+=2');
  tl.fromTo('#s04 .closing-clock i', { rotation: -80 }, { rotation: 28, duration: 4.5, ease: 'sine.inOut' }, 'c12+=1.4');
});
