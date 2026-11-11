/* hall.js — the world: the CSC operations hall at night.
 *
 * A one-point perspective hall (eye level, real metres) drawn as a pure function of t and a
 * state object the timeline tweens: the camera walks the corridor, the light changes.
 * Everything far is drawn into a small canvas and scaled up, so distance is soft (haze + DOF)
 * instead of crisp vector geometry.
 *
 * window.HALL.install(ctx) -> { st, draw }
 *   st: { pan, zoom, drop, light, warm, red, dawn, haze, dark }
 */
(function () {
  const W = 1920, H = 1080;
  const HOR = 470;            // eye level
  const F = 1180;             // focal length in px (x scale)
  const CAM_H = 1.45;         // eye height in metres
  const px = (m, z) => (F * m) / z;              // metres at depth z -> px
  // fy(h, z): h = height above the floor in metres -> screen y (floor is HOR + F*CAM_H/z)
  const fy = (h, z) => HOR + (F * (CAM_H - h)) / z;

  function noiseTex(w, h, seed) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d');
    const img = g.createImageData(w, h);
    let s = seed;
    const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 12 + rnd() * 22;
      img.data[i] = v * 0.75; img.data[i + 1] = v * 0.86; img.data[i + 2] = v * 1.2;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    return c;
  }

  window.HALL = {
    install(ctx) {
      const { fitCanvas, rand, onFrame } = ctx;
      const c2 = fitCanvas(document.getElementById('hall'), W, H, 2);
      const floorTex = noiseTex(360, 360, 20261111);
      const r = rand(7717);

      // the hall's furniture, in metres: both sides of the corridor
      const desks = [];
      for (const side of [-1, 1]) {
        for (let i = 0; i < 6; i++) {
          const z = 6.0 + i * 2.9 + r() * 0.5;
          desks.push({
            side, z,
            x: side * (2.75 + (i % 2) * 0.6),
            mon: 0.5 + r() * 0.5,
            lamp: r() < 0.4,
            lampPhase: r(),
          });
        }
      }
      const dust = Array.from({ length: 70 }, () => ({ x: r(), y: r(), z: 0.3 + r() * 0.9, p: r() * 6.28 }));

      const st = { pan: 0, zoom: 1, drop: 0, light: 1, warm: 0, red: 0, dawn: 0, haze: 1, dark: 0 };
      const blur = document.createElement('canvas');
      blur.width = 480; blur.height = 270;
      const b2 = blur.getContext('2d');

      const cam = (p) => {
        c2.save();
        c2.translate(W / 2 + st.pan * p, HOR + st.drop * p);
        const z = 1 + (st.zoom - 1) * p;
        c2.scale(z, z);
        c2.translate(-W / 2, -HOR);
      };
      const uncam = () => c2.restore();

      // ── the far wall: the SOC monitor wall at the end of the hall, soft with distance ──
      function drawFarWall() {
        b2.clearRect(0, 0, 480, 270);
        const x0 = 40, y0 = 62, w = 400, h = 96;
        b2.filter = 'blur(2.2px)';
        b2.fillStyle = '#04070C';
        b2.fillRect(x0 - 8, y0 - 10, w + 16, h + 26);
        // panels of monitors: many thin strips, not a coarse grid
        for (let cx = 0; cx < 40; cx++) {
          for (let cy = 0; cy < 10; cy++) {
            const px_ = x0 + 4 + cx * (w - 8) / 40;
            const py_ = y0 + 4 + cy * (h - 8) / 10;
            const bw = (w - 8) / 40 - 1.2, bh = (h - 8) / 10 - 1.4;
            const red = st.red > 0.04 && ((cx * 5 + cy * 7) % 11 === 0);
            const a = (0.10 + 0.30 * st.light) * (0.45 + 0.55 * ((cx * 3 + cy) % 4 === 0 ? 1 : 0.35));
            b2.fillStyle = red
              ? `rgba(255,96,78,${a * st.red})`
              : `rgba(${80 + (cx % 5) * 10},${140 + (cy % 3) * 14},${225},${a})`;
            b2.fillRect(px_, py_, bw, bh);
          }
        }
        // light spilling up the wall behind it
        const g = b2.createLinearGradient(0, y0 - 40, 0, y0 + h + 40);
        g.addColorStop(0, 'rgba(30,60,120,0)');
        g.addColorStop(0.5, `rgba(50,95,180,${0.10 + 0.14 * st.light})`);
        g.addColorStop(1, 'rgba(20,40,90,0)');
        b2.fillStyle = g;
        b2.fillRect(x0 - 80, y0 - 60, w + 160, h + 140);

        b2.filter = 'none';
        cam(0.55);
        c2.save();
        c2.globalAlpha = 0.88;
        c2.drawImage(blur, W / 2 - 700, HOR - 300, 1400, 600);
        c2.restore();
        uncam();
      }

      // ── ceiling light strips: perpendicular bars, spacing by perspective ──
      function drawCeiling() {
        cam(0.8);
        for (let i = 0; i < 8; i++) {
          const z = 3.6 + i * 2.6;
          const y = HOR - px(CAM_H + 1.05, z);
          const wid = px(9.0, z);
          const hgt = Math.max(3, px(0.16, z));
          if (y > HOR - 2 || y < 30) continue;
          const x = W / 2 - wid / 2;
          // the bloom in the air under the strip
          const bg = c2.createLinearGradient(0, y - hgt * 2, 0, y + px(1.6, z));
          const a = 0.26 * st.light * (1 - i * 0.05);
          bg.addColorStop(0, 'rgba(140,175,255,0)');
          bg.addColorStop(0.30, `rgba(160,195,255,${a})`);
          bg.addColorStop(1, 'rgba(120,160,240,0)');
          c2.fillStyle = bg;
          c2.fillRect(x - wid * 0.06, y - hgt * 2, wid * 1.12, px(1.6, z) + hgt * 2);
          // the tube
          const tg = c2.createLinearGradient(0, y, 0, y + hgt);
          tg.addColorStop(0, `rgba(246,250,255,${0.55 + 0.45 * st.light})`);
          tg.addColorStop(0.5, `rgba(196,220,255,${0.45 + 0.4 * st.light})`);
          tg.addColorStop(1, `rgba(120,155,225,${0.20 + 0.3 * st.light})`);
          c2.fillStyle = tg;
          c2.fillRect(x, y, wid, hgt);
        }
        uncam();
      }

      function drawFloor() {
        cam(1);
        const g = c2.createLinearGradient(0, HOR, 0, H);
        g.addColorStop(0, '#0A1220');
        g.addColorStop(0.30, '#070C16');
        g.addColorStop(1, '#03060C');
        c2.fillStyle = g;
        c2.fillRect(-400, HOR, W + 800, H - HOR + 400);

        // resin grain
        c2.globalAlpha = 0.14;
        c2.globalCompositeOperation = 'overlay';
        c2.fillStyle = c2.createPattern(floorTex, 'repeat');
        c2.fillRect(-400, HOR, W + 800, H - HOR + 400);
        c2.globalCompositeOperation = 'source-over';
        c2.globalAlpha = 1;

        // the pool of light the strips pour onto the floor
        const pool = c2.createRadialGradient(W / 2 + st.pan * 0.3, HOR + 210, 30, W / 2 + st.pan * 0.3, HOR + 210, 900);
        pool.addColorStop(0, `rgba(78,118,198,${0.26 * st.light})`);
        pool.addColorStop(0.5, `rgba(40,70,140,${0.10 * st.light})`);
        pool.addColorStop(1, 'rgba(10,20,45,0)');
        c2.fillStyle = pool;
        c2.fillRect(-200, HOR, W + 400, H - HOR);

        // reflections of each strip: a long soft streak running toward the camera
        for (let i = 0; i < 8; i++) {
          const z = 3.6 + i * 2.6;
          const yTop = HOR;
          const yBot = Math.min(H + 200, fy(0, z) + 140);
          const wid = px(6.4, z) * 0.55;
          const rg = c2.createLinearGradient(0, yTop, 0, yBot);
          const a = 0.13 * st.light * (1 - i * 0.06);
          rg.addColorStop(0, `rgba(150,190,255,${a * 1.5})`);
          rg.addColorStop(0.55, `rgba(110,155,240,${a})`);
          rg.addColorStop(1, 'rgba(70,110,190,0)');
          c2.fillStyle = rg;
          c2.fillRect(W / 2 - wid / 2 + st.pan * 0.2, yTop, wid, yBot - yTop);
        }

        // joints: faint, only readable close to the camera
        c2.strokeStyle = `rgba(130,165,215,${0.05 + 0.05 * st.light})`;
        for (let k = -6; k <= 6; k++) {
          c2.lineWidth = 1.2;
          c2.beginPath();
          c2.moveTo(W / 2 + k * 4.2 * F / 1.6, H + 200);
          c2.lineTo(W / 2 + k * 4.2 * F / 40, HOR);
          c2.stroke();
        }
        for (let i = 1; i <= 8; i++) {
          const z = 2 + i * 2.2;
          const y = fy(0, z);
          if (y > H + 60) continue;
          c2.globalAlpha = Math.max(0.15, 1 - z / 26);
          c2.beginPath(); c2.moveTo(-200, y); c2.lineTo(W + 200, y); c2.stroke();
        }
        c2.globalAlpha = 1;
        uncam();
      }

      // ── desks on both sides: boxes in perspective, monitors glowing ──
      function boxTop(xm, zm, wm, dm, hm) {
        const z1 = zm, z2 = zm + dm;
        const X1 = W / 2 + px(xm - wm / 2, z1), X2 = W / 2 + px(xm + wm / 2, z1);
        const X3 = W / 2 + px(xm + wm / 2, z2), X4 = W / 2 + px(xm - wm / 2, z2);
        const Y1 = fy(hm, z1), Y2 = fy(hm, z2);
        return { X1, X2, X3, X4, Y1, Y2, Yb: fy(0, z1) };
      }

      function drawDesks() {
        cam(1.04);
        const sorted = [...desks].sort((a, b) => b.z - a.z);
        for (const d of sorted) {
          const z = d.z;
          const dim = Math.min(1, 0.30 + 2.0 / z);
          const b = boxTop(d.x, z, 1.5, 0.72, 0.74);
          // contact shadow on the floor
          c2.fillStyle = `rgba(2,4,9,${0.5 * dim})`;
          c2.beginPath();
          c2.ellipse((b.X1 + b.X2) / 2, b.Yb + 4, (b.X2 - b.X1) * 0.62, (b.Yb - b.Y2) * 0.5 + 6, 0, 0, 6.3);
          c2.fill();
          // front face (dark, in shadow)
          c2.fillStyle = `rgba(8,12,20,${0.65 + 0.3 * dim})`;
          c2.beginPath();
          c2.moveTo(b.X1, b.Y1); c2.lineTo(b.X2, b.Y1);
          c2.lineTo(b.X2, b.Yb); c2.lineTo(b.X1, b.Yb);
          c2.closePath(); c2.fill();
          // top surface (catches the ceiling light)
          const tg = c2.createLinearGradient(0, b.Y2, 0, b.Y1);
          tg.addColorStop(0, `rgba(30,42,64,${0.55 + 0.3 * dim})`);
          tg.addColorStop(1, `rgba(20,29,46,${0.7 + 0.25 * dim})`);
          c2.fillStyle = tg;
          c2.beginPath();
          c2.moveTo(b.X1, b.Y1); c2.lineTo(b.X2, b.Y1);
          c2.lineTo(b.X3, b.Y2); c2.lineTo(b.X4, b.Y2);
          c2.closePath(); c2.fill();
          // the lit front edge of the top
          c2.strokeStyle = `rgba(170,200,245,${0.30 * st.light * dim})`;
          c2.lineWidth = Math.max(1, 2.2 * (1 - z / 30));
          c2.beginPath(); c2.moveTo(b.X1, b.Y1); c2.lineTo(b.X2, b.Y1); c2.stroke();

          // monitor: a thin panel standing on the top
          const m = boxTop(d.x, z + 0.28, 0.62, 0.06, 1.10);
          const glowA = (0.10 + 0.30 * st.light) * d.mon;
          const cx = (m.X1 + m.X2) / 2, cy = (m.Y1 + m.Y2) / 2;
          const gl = c2.createRadialGradient(cx, cy, 1, cx, cy, Math.max(20, (m.X2 - m.X1) * 2.4));
          gl.addColorStop(0, `rgba(110,160,250,${glowA})`);
          gl.addColorStop(1, 'rgba(60,100,190,0)');
          c2.fillStyle = gl;
          c2.fillRect(cx - (m.X2 - m.X1) * 2.4, cy - (m.X2 - m.X1) * 2.4, (m.X2 - m.X1) * 4.8, (m.X2 - m.X1) * 4.8);
          c2.fillStyle = `rgba(12,19,32,${0.7 + 0.25 * dim})`;
          c2.beginPath();
          c2.moveTo(m.X1 - 2, m.Y1 + 2); c2.lineTo(m.X2 + 2, m.Y1 + 2);
          c2.lineTo(m.X3 + 2, m.Y2 - 2); c2.lineTo(m.X4 - 2, m.Y2 - 2);
          c2.closePath(); c2.fill();
          c2.fillStyle = `rgba(150,190,255,${0.60 * st.light * d.mon})`;
          c2.beginPath();
          c2.moveTo(m.X1, m.Y1); c2.lineTo(m.X2, m.Y1);
          c2.lineTo(m.X3, m.Y2); c2.lineTo(m.X4, m.Y2);
          c2.closePath(); c2.fill();

          // chair: a small dark box in front of the desk
          const ch = boxTop(d.x + (d.side > 0 ? 0.1 : -0.1), z - 0.62, 0.46, 0.44, 0.46);
          c2.fillStyle = `rgba(4,7,13,${0.8 * dim})`;
          c2.beginPath();
          c2.moveTo(ch.X1, ch.Y1); c2.lineTo(ch.X2, ch.Y1);
          c2.lineTo(ch.X3, ch.Y2); c2.lineTo(ch.X4, ch.Y2);
          c2.closePath(); c2.fill();
          c2.fillStyle = `rgba(6,10,17,${0.85 * dim})`;
          c2.fillRect(ch.X1, ch.Y1, ch.X2 - ch.X1, ch.Yb - ch.Y1);

          // the amber desk lamp: a human seat
          if (d.lamp) {
            const lx = (b.X1 + b.X2) / 2 + (d.side > 0 ? -1 : 1) * (b.X2 - b.X1) * 0.28;
            const ly = b.Y1 - 18;
            const lr = Math.max(40, px(1.0, z));
            const lg = c2.createRadialGradient(lx, ly, 1, lx, ly, lr);
            lg.addColorStop(0, `rgba(255,196,120,${0.34 * st.warm * dim})`);
            lg.addColorStop(0.4, `rgba(255,170,90,${0.12 * st.warm * dim})`);
            lg.addColorStop(1, 'rgba(255,150,70,0)');
            c2.fillStyle = lg;
            c2.fillRect(lx - lr, ly - lr, lr * 2, lr * 2);
          }
        }
        uncam();
      }

      // ── columns: the corridor's architecture, lit on one edge ──
      function drawColumns() {
        cam(1);
        for (let i = 0; i < 7; i++) {
          const z = 3.0 + i * 3.4;
          for (const side of [-1, 1]) {
            const xm = side * 3.9;
            const x1 = W / 2 + px(xm - 0.22, z), x2 = W / 2 + px(xm + 0.22, z);
            const yTop = HOR - px(CAM_H + 1.55, z), yBot = fy(0, z);
            const a = Math.max(0.05, 0.30 - i * 0.035);
            c2.fillStyle = `rgba(9,14,24,${0.55 + 0.3 * (1 - i / 7)})`;
            c2.fillRect(x1, yTop, Math.max(2, x2 - x1), yBot - yTop);
            c2.fillStyle = `rgba(150,190,245,${a * st.light})`;
            c2.fillRect(side > 0 ? x1 : x2 - Math.max(1, (x2 - x1) * 0.16), yTop,
              Math.max(1, (x2 - x1) * 0.16), yBot - yTop);
          }
        }
        uncam();
      }

      function drawHaze() {
        const cx = W / 2 + st.pan * 0.4;
        const g = c2.createRadialGradient(cx, HOR + 40, 20, cx, HOR + 40, 1100);
        g.addColorStop(0, `rgba(105,145,225,${0.20 * st.haze * (0.35 + 0.65 * st.light)})`);
        g.addColorStop(0.4, `rgba(55,90,160,${0.09 * st.haze})`);
        g.addColorStop(1, 'rgba(8,16,34,0)');
        c2.fillStyle = g;
        c2.fillRect(0, 0, W, H);
      }

      function drawDust(t) {
        cam(1);
        for (const p of dust) {
          const pz = 1.2 + p.z * 6;
          const pxp = W / 2 + px((p.x - 0.5) * 5.4 + Math.sin(p.p + t * 0.2) * 0.08, pz);
          const pyp = fy(0.4 + p.y * 1.6, pz);
          const a = (0.05 + 0.13 * st.light) * (1 - Math.min(1, pz / 9));
          c2.fillStyle = `rgba(205,225,255,${a})`;
          c2.fillRect(pxp, pyp, 1.8, 1.8);
        }
        uncam();
      }

      function drawForeground() {
        // an out-of-focus chair back and a desk edge, close to the lens: depth without detail
        cam(1.5);
        c2.save();
        c2.filter = 'blur(18px)';
        c2.fillStyle = 'rgba(3,6,12,0.92)';
        c2.beginPath();
        c2.ellipse(90, 1060, 250, 190, 0, 0, 6.3);
        c2.fill();
        c2.beginPath();
        c2.ellipse(1850, 1075, 280, 200, 0, 0, 6.3);
        c2.fill();
        c2.fillRect(-100, 1058, 2120, 120);
        c2.restore();
        uncam();
      }

      function drawBeacon(t) {
        if (st.red < 0.02) return;
        const bx = W / 2 + px(2.9, 6.5), by = HOR - px(1.6, 6.5);
        const ang = t * 1.1;
        c2.save();
        c2.translate(bx, by);
        for (let k = 0; k < 2; k++) {
          const a0 = ang + k * Math.PI;
          const grad = c2.createRadialGradient(0, 0, 10, 0, 0, 1500);
          grad.addColorStop(0, `rgba(255,86,68,${0.34 * st.red})`);
          grad.addColorStop(0.35, `rgba(255,70,55,${0.07 * st.red})`);
          grad.addColorStop(1, 'rgba(255,60,50,0)');
          c2.fillStyle = grad;
          c2.beginPath();
          c2.moveTo(0, 0);
          c2.arc(0, 0, 1500, a0 - 0.09, a0 + 0.09);
          c2.closePath();
          c2.fill();
        }
        c2.restore();
      }

      function drawDawn() {
        if (st.dawn < 0.01) return;
        const g = c2.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, `rgba(160,185,235,${0.34 * st.dawn})`);
        g.addColorStop(0.45, `rgba(215,224,240,${0.40 * st.dawn})`);
        g.addColorStop(1, `rgba(255,228,196,${0.16 * st.dawn})`);
        c2.fillStyle = g;
        c2.fillRect(0, 0, W, H);
        // the light band where the dawn meets the floor
        const band = c2.createLinearGradient(0, HOR - 40, 0, HOR + 90);
        band.addColorStop(0, `rgba(255,244,222,0)`);
        band.addColorStop(0.45, `rgba(255,244,222,${0.22 * st.dawn})`);
        band.addColorStop(1, `rgba(255,240,214,0)`);
        c2.fillStyle = band;
        c2.fillRect(0, HOR - 40, W, 130);
        const fg = c2.createLinearGradient(0, HOR, 0, H);
        fg.addColorStop(0, `rgba(255,240,216,${0.26 * st.dawn})`);
        fg.addColorStop(1, `rgba(255,230,200,${0.04 * st.dawn})`);
        c2.fillStyle = fg;
        c2.fillRect(0, HOR, W, H - HOR);
      }

      function draw(t) {
        c2.clearRect(0, 0, W, H);
        const bg = c2.createLinearGradient(0, 0, 0, H);
        if (st.dawn > 0.01) {
          bg.addColorStop(0, '#121C2E'); bg.addColorStop(0.55, '#16243A'); bg.addColorStop(1, '#0A1220');
        } else {
          bg.addColorStop(0, '#04070D'); bg.addColorStop(0.55, '#060B14'); bg.addColorStop(1, '#02040A');
        }
        c2.fillStyle = bg;
        c2.fillRect(0, 0, W, H);

        drawFarWall();
        drawCeiling();
        drawFloor();
        drawColumns();
        drawDesks();
        drawDust(t);
        drawBeacon(t);
        drawHaze();
        drawDawn();
        if (st.dark > 0.01) {
          c2.fillStyle = `rgba(3,5,10,${0.6 * st.dark})`;
          c2.fillRect(0, 0, W, H);
        }
        drawForeground();
      }

      onFrame((t) => draw(t));
      return { st, draw };
    },
  };
})();
