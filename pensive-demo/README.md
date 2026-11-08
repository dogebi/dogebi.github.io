# Pensive Grader — demo clone

Static, offline-capable rebuild of <https://www.pensive.com/demo?from=landing-view-demo>.

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8799     # then http://127.0.0.1:8799/index.html
```

## How it was made

The demo is a React/Vite SPA whose whole scripted walkthrough is client-side (no
network calls during the demo). Rather than re-implementing the UI by hand, every
screen was captured from the live app as rendered DOM and replayed verbatim with
the app's own compiled stylesheets — so the result is pixel-identical, not
"close enough".

- `raw/` — DOM snapshots taken from the live demo (state by state).
- `build.py` — splits each snapshot into the two panes of the split view, emits
  `assets/state.js`. Run `python3 build.py` after adding captures.
- `assets/app.js` — state machine: welcome → about → transcribe → transcribed →
  autograde → graded → review → complete, plus tab switching, restart and skip.
- `assets/app.css` — only glue: full-height roots, hiding two artefacts the live
  app removes after load (the images-viewer white veil + spinner) and matching
  the app's grayscale text antialiasing.
- `assets/index-*.css`, `rubric-*.css`, `mathpix-*.css`, `runtime-toast.css`,
  `mathjax-svg.css`, `mathpix-rendered.css` — the app's stylesheets, including
  the three that the live page injects at runtime (MathJax SVG, mathpix output,
  toasts). Those three are what make rubric line heights and math match exactly.

## Fidelity

Screenshots compared against the live site at 1440×900, same browser:

| screen | mean channel diff |
| --- | --- |
| Welcome / About / Base | 0.00 (identical) |
| Transcribed (both tabs) | 0.00 |
| Graded / Review dialog / Review / Complete | 0.00 |

The only non-zero areas are the rotating `tutorial-border` glow around the
Transcribe/Autograde pill (a 2.5s CSS animation, so its phase never matches) and
a 5×12 px glyph-AA patch on the "10 / 14" score.

## Behaviour ported from the bundle

`demo-*.js` defines the timings, which this clone mirrors:

- transcribe: 500ms "banner" state, then 20 steps of `150 + rand(100) - 50` ms,
  progress = `round(t/20*100)`; Continue stays disabled until 100%.
- autograde: `0 → 4000ms → 33 → 1000ms → 67 → 1000ms → 100`.
- rubric items 7 and 8 (0-based) are the ones highlighted for review.
- `Sign up` navigates to `https://www.pensive.com/app/sign_up`.

## Known gaps

- The demo is a scripted mock: "Use this feedback", the rubric item toggles and
  the pane drag handle are static here (they are props in the real app).
- The page bitmap is captured as `loading="eager"`; the original marks it lazy,
  which a background/hidden tab may never decode.
- Fonts (Geist, Google Sans Flex) load from Google Fonts, as in the original; a
  fully offline copy would need them self-hosted.
- Built from the demo build live at capture time. The site was later redeployed
  (CSS hash `CWZXjbD5` → `CeNjiyQh`); the visuals were verified identical
  afterwards.
