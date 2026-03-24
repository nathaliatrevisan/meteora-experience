'use client';

import { useEffect, useRef } from 'react';

type Variant = 'grid' | 'circuit' | 'dna' | 'orbit';

interface Props {
  variant?: Variant;
  opacity?: number;
}

export function SpaceBackground({ variant = 'grid', opacity = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let animId: number;
    let t = 0;

    // ── shared: tiny star field ──
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 0.9 + 0.2,
      speed: Math.random() * 0.015 + 0.004,
      offset: Math.random() * Math.PI * 2,
    }));

    // ── GRID variant: isometric tech grid with pulsing nodes ──
    const drawGrid = () => {
      const cellW = 80, cellH = 80;
      const cols = Math.ceil(W / cellW) + 2;
      const rows = Math.ceil(H / cellH) + 2;
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.008);

      ctx.strokeStyle = `rgba(0,188,212,${0.045 + 0.02 * pulse})`;
      ctx.lineWidth = 0.5;

      for (let c = -1; c < cols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * cellW, 0);
        ctx.lineTo(c * cellW, H);
        ctx.stroke();
      }
      for (let r = -1; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * cellH);
        ctx.lineTo(W, r * cellH);
        ctx.stroke();
      }

      // pulsing nodes at intersections
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const nx = c * cellW, ny = r * cellH;
          const nodePulse = 0.5 + 0.5 * Math.sin(t * 0.012 + c * 0.4 + r * 0.6);
          if (nodePulse > 0.72) {
            ctx.beginPath();
            ctx.arc(nx, ny, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,188,212,${nodePulse * 0.5})`;
            ctx.fill();
            // glow ring
            ctx.beginPath();
            ctx.arc(nx, ny, 5 * nodePulse, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0,188,212,${nodePulse * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // traveling data packets along grid lines
      const packetT = (t * 0.6) % (cols * cellW);
      const packetRow = Math.floor(t / 80) % rows;
      ctx.beginPath();
      ctx.arc(packetT, packetRow * cellH, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,220,255,0.7)`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(packetT, packetRow * cellH, 8, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,220,255,0.15)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // ── CIRCUIT variant: flowing circuit board lines ──
    type CircuitNode = { x: number; y: number; connections: number[]; };
    const nodes: CircuitNode[] = [];
    const initCircuit = () => {
      nodes.length = 0;
      const count = Math.floor(W * H / 18000);
      for (let i = 0; i < count; i++) {
        nodes.push({ x: Math.random() * W, y: Math.random() * H, connections: [] });
      }
      for (let i = 0; i < nodes.length; i++) {
        const nearby = nodes
          .map((n, j) => ({ j, d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y) }))
          .filter(e => e.j !== i && e.d < 180)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2);
        nodes[i].connections = nearby.map(e => e.j);
      }
    };
    initCircuit();

    // flowing signal along a random path
    let signalPath: number[] = [];
    let signalT = 0;
    const pickSignalPath = () => {
      const start = Math.floor(Math.random() * nodes.length);
      const path = [start];
      let cur = start;
      for (let step = 0; step < 8; step++) {
        const next = nodes[cur].connections[Math.floor(Math.random() * nodes[cur].connections.length)];
        if (next !== undefined && !path.includes(next)) { path.push(next); cur = next; }
      }
      signalPath = path;
      signalT = 0;
    };
    pickSignalPath();

    const drawCircuit = () => {
      // static lines
      for (const node of nodes) {
        for (const ci of node.connections) {
          const other = nodes[ci];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          // right-angle circuit style
          ctx.lineTo(other.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(0,188,212,0.07)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,188,212,0.18)`;
        ctx.fill();
      }

      // flowing signal
      signalT += 0.018;
      if (signalT >= signalPath.length - 1) pickSignalPath();

      const segIdx = Math.floor(signalT);
      const frac = signalT - segIdx;
      if (segIdx < signalPath.length - 1) {
        const a = nodes[signalPath[segIdx]];
        const b = nodes[signalPath[segIdx + 1]];
        // right-angle interpolation
        let sx: number, sy: number;
        if (frac < 0.5) {
          sx = a.x + (b.x - a.x) * (frac * 2);
          sy = a.y;
        } else {
          sx = b.x;
          sy = a.y + (b.y - a.y) * ((frac - 0.5) * 2);
        }
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,220,255,0.9)`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(sx, sy, 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,220,255,0.12)`;
        ctx.fill();
      }
    };

    // ── DNA variant: double helix + binary rain ──
    const binaryColumns = Array.from({ length: Math.floor(W / 20) }, (_, i) => ({
      x: i * 20 + 10,
      y: Math.random() * H,
      speed: Math.random() * 1.5 + 0.5,
      chars: Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0'),
      opacity: Math.random() * 0.12 + 0.03,
    }));

    const drawDNA = () => {
      // binary rain
      ctx.font = '11px monospace';
      for (const col of binaryColumns) {
        col.y += col.speed;
        if (col.y > H + 200) col.y = -200;
        col.chars.forEach((ch, i) => {
          const alpha = col.opacity * (1 - i / col.chars.length);
          ctx.fillStyle = `rgba(0,188,212,${alpha})`;
          ctx.fillText(ch, col.x, col.y - i * 14);
        });
        // occasionally flip a bit
        if (Math.random() < 0.02) {
          const ri = Math.floor(Math.random() * col.chars.length);
          col.chars[ri] = col.chars[ri] === '0' ? '1' : '0';
        }
      }

      // double helix
      const helixX = W / 2;
      const helixAmplitude = 60;
      const helixFreq = 0.025;
      const helixSpeed = t * 0.012;
      const helixStep = 8;

      for (let y = 0; y < H; y += helixStep) {
        const x1 = helixX + Math.cos(y * helixFreq + helixSpeed) * helixAmplitude;
        const x2 = helixX + Math.cos(y * helixFreq + helixSpeed + Math.PI) * helixAmplitude;
        const alpha = 0.08 + 0.06 * Math.abs(Math.cos(y * helixFreq + helixSpeed));

        // strand 1
        if (y > 0) {
          const py1 = y - helixStep;
          const px1 = helixX + Math.cos(py1 * helixFreq + helixSpeed) * helixAmplitude;
          ctx.beginPath();
          ctx.moveTo(px1, py1);
          ctx.lineTo(x1, y);
          ctx.strokeStyle = `rgba(0,188,212,${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          const px2 = helixX + Math.cos(py1 * helixFreq + helixSpeed + Math.PI) * helixAmplitude;
          ctx.beginPath();
          ctx.moveTo(px2, py1);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(80,200,255,${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // rungs every 3 steps
        if (y % (helixStep * 3) === 0) {
          const rungAlpha = 0.12 + 0.08 * Math.abs(Math.cos(y * helixFreq + helixSpeed));
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(0,220,200,${rungAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // node dots
          [x1, x2].forEach(nx => {
            ctx.beginPath();
            ctx.arc(nx, y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,220,220,${rungAlpha * 2})`;
            ctx.fill();
          });
        }
      }
    };

    // ── ORBIT variant: concentric rings + orbiting dots ──
    type OrbDot = { angle: number; speed: number; ring: number; size: number; trail: { x: number; y: number }[]; };
    const rings = [120, 200, 290, 380];
    const orbDots: OrbDot[] = rings.flatMap((r, ri) =>
      Array.from({ length: ri + 2 }, (_, i) => ({
        angle: (i / (ri + 2)) * Math.PI * 2,
        speed: (0.006 - ri * 0.001) * (Math.random() > 0.5 ? 1 : -1),
        ring: r,
        size: Math.random() * 2 + 2,
        trail: [],
      }))
    );
    const cx = W / 2, cy = H / 2;

    const drawOrbit = () => {
      // rings
      rings.forEach((r, ri) => {
        const ringPulse = 0.5 + 0.5 * Math.sin(t * 0.008 + ri);
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.38, -0.3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,188,212,${0.06 + 0.03 * ringPulse})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // center glow
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 55);
      cg.addColorStop(0, 'rgba(0,188,212,0.12)');
      cg.addColorStop(1, 'rgba(0,188,212,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,220,255,0.5)';
      ctx.fill();

      // orbiting dots + trails
      for (const dot of orbDots) {
        dot.angle += dot.speed;
        const ex = cx + Math.cos(dot.angle) * dot.ring;
        const ey = cy + Math.sin(dot.angle) * dot.ring * 0.38;
        dot.trail.push({ x: ex, y: ey });
        if (dot.trail.length > 18) dot.trail.shift();

        dot.trail.forEach((pt, i) => {
          const a = (i / dot.trail.length) * 0.35;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,220,255,${a})`;
          ctx.fill();
        });

        ctx.beginPath();
        ctx.arc(ex, ey, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,220,255,0.75)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ex, ey, dot.size + 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,220,255,0.1)';
        ctx.fill();
      }
    };

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, W, H);

      // star field (all variants)
      for (const s of stars) {
        const tw = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed + s.offset));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${tw * 0.25})`;
        ctx.fill();
      }

      if (variant === 'grid')    drawGrid();
      if (variant === 'circuit') drawCircuit();
      if (variant === 'dna')     drawDNA();
      if (variant === 'orbit')   drawOrbit();

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      if (variant === 'circuit') initCircuit();
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
}