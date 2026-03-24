'use client';

import { useEffect, useRef } from 'react';


// polyfill for ctx.roundRect
function drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

const twinkleStars = [
  { top: '18%', left: '8%',  delay: '0s',    size: '1rem' },
  { top: '12%', left: '35%', delay: '0.6s',  size: '1rem' },
  { top: '25%', left: '62%', delay: '1.2s',  size: '0.9rem' },
  { top: '60%', left: '14%', delay: '0.3s',  size: '1rem' },
  { top: '72%', left: '50%', delay: '1.8s',  size: '0.8rem' },
  { top: '42%', left: '76%', delay: '0.9s',  size: '1rem' },
  { top: '82%', left: '82%', delay: '2.1s',  size: '0.9rem' },
  { top: '10%', left: '90%', delay: '1.5s',  size: '1rem' },
  { top: '52%', left: '92%', delay: '0.4s',  size: '0.7rem' },
  { top: '34%', left: '28%', delay: '2.4s',  size: '0.7rem' },
];

export function Hero() {
  const bgCanvasRef  = useRef<HTMLCanvasElement>(null);
  const fgCanvasRef  = useRef<HTMLCanvasElement>(null);

  // ── BACKGROUND: stars + nebulas + meteors ──
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let animId: number;
    let t = 0;

    const starField = Array.from({ length: 180 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      offset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.85 ? 'rgba(180,220,255,' : Math.random() > 0.7 ? 'rgba(0,188,212,' : 'rgba(255,255,255,',
    }));

    type Meteor = { x:number;y:number;len:number;speed:number;angle:number;opacity:number;active:boolean;timer:number;nextSpawn:number };
    const meteors: Meteor[] = Array.from({ length: 5 }, () => ({ x:0,y:0,len:0,speed:0,angle:0,opacity:0,active:false,timer:0,nextSpawn:Math.random()*300 }));
    const spawnMeteor = (m: Meteor) => { m.x=Math.random()*W*1.5-W*0.2; m.y=Math.random()*H*0.5-50; m.len=Math.random()*160+80; m.speed=Math.random()*14+8; m.angle=Math.PI/4+(Math.random()-0.5)*0.3; m.opacity=Math.random()*0.7+0.3; m.active=true; m.timer=0; };

    const nebulas = [
      { x:W*0.15,y:H*0.3, rx:220,ry:140, r:0,  g:188,b:212, a:0.04, dx:0.08,  dy:0.04  },
      { x:W*0.75,y:H*0.6, rx:180,ry:120, r:80, g:120,b:255, a:0.03, dx:-0.06, dy:0.05  },
      { x:W*0.5, y:H*0.15,rx:250,ry:100, r:0,  g:210,b:180, a:0.022,dx:0.04,  dy:-0.03 },
      { x:W*0.88,y:H*0.25,rx:140,ry:180, r:120,g:80, b:220, a:0.026,dx:-0.05, dy:0.06  },
    ];

    const draw = () => {
      t++; ctx.clearRect(0,0,W,H);
      for (const nb of nebulas) {
        nb.x+=nb.dx; nb.y+=nb.dy;
        if(nb.x>W+300)nb.x=-300; if(nb.x<-300)nb.x=W+300;
        if(nb.y>H+200)nb.y=-200; if(nb.y<-200)nb.y=H+200;
        ctx.save(); ctx.translate(nb.x,nb.y);
        const mr=Math.max(nb.rx,nb.ry);
        const g=ctx.createRadialGradient(0,0,0,0,0,mr);
        g.addColorStop(0,`rgba(${nb.r},${nb.g},${nb.b},${nb.a})`);
        g.addColorStop(1,`rgba(${nb.r},${nb.g},${nb.b},0)`);
        ctx.scale(nb.rx/mr,nb.ry/mr);
        ctx.beginPath(); ctx.arc(0,0,mr,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
        ctx.restore();
      }
      for (const s of starField) {
        const tw=0.4+0.6*(0.5+0.5*Math.sin(t*s.speed+s.offset));
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`${s.color}${tw})`; ctx.fill();
      }
      for (const m of meteors) {
        if(!m.active){ m.nextSpawn--; if(m.nextSpawn<=0){spawnMeteor(m);m.nextSpawn=Math.random()*400+150;} continue; }
        m.x+=Math.cos(m.angle)*m.speed; m.y+=Math.sin(m.angle)*m.speed; m.timer++;
        const fade=Math.max(0,1-m.timer/50);
        const tx=m.x-Math.cos(m.angle)*m.len, ty=m.y-Math.sin(m.angle)*m.len;
        const mg=ctx.createLinearGradient(tx,ty,m.x,m.y);
        mg.addColorStop(0,'rgba(0,188,212,0)');
        mg.addColorStop(0.6,`rgba(0,188,212,${m.opacity*fade*0.5})`);
        mg.addColorStop(1,`rgba(255,255,255,${m.opacity*fade})`);
        ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(m.x,m.y);
        ctx.strokeStyle=mg; ctx.lineWidth=1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(m.x,m.y,2,0,Math.PI*2);
        ctx.fillStyle=`rgba(200,240,255,${m.opacity*fade})`; ctx.fill();
        if(m.x>W+200||m.y>H+200||fade<=0) m.active=false;
      }
      animId=requestAnimationFrame(draw);
    };
    draw();
    const onResize=()=>{W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;};
    window.addEventListener('resize',onResize);
    return ()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',onResize);};
  }, []);

  // ── FOREGROUND: astronaut scene animation ──
  useEffect(() => {
    const canvas = fgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let animId: number;
    let t = 0;

    // floating offset
    const floatAmp = 12;
    const floatSpeed = 0.012;

    // orbit rings around astronaut
    const rings = [
      { rx: 110, ry: 42, speed: 0.008,  dotSize: 4,   color: '0,188,212',   angle: 0   },
      { rx: 150, ry: 58, speed: -0.005, dotSize: 3,   color: '80,200,255',  angle: 1.2 },
      { rx: 190, ry: 72, speed: 0.003,  dotSize: 2.5, color: '120,230,255', angle: 2.4 },
    ];

    // data particles flying toward/away astronaut
    type DataParticle = { angle: number; dist: number; speed: number; size: number; alpha: number; };
    const dataParticles: DataParticle[] = Array.from({ length: 22 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 160 + 60,
      speed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    // hexagonal HUD elements
    const hexPulse = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
        i === 0 ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
                : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0,188,212,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // draw astronaut body (geometric/stylized, no IA look)
    const drawAstronaut = (cx: number, cy: number, scale: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // --- suit body ---
      ctx.beginPath();
      ctx.ellipse(0, 28, 38, 50, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(220,235,245,0.92)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,188,212,0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // suit chest detail lines
      ctx.beginPath();
      ctx.moveTo(-20, 10); ctx.lineTo(20, 10);
      ctx.moveTo(-18, 20); ctx.lineTo(18, 20);
      ctx.strokeStyle = 'rgba(0,188,212,0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // chest screen/panel
      ctx.beginPath();
      drawRoundRect(ctx, -14, 12, 28, 16, 3);
      ctx.fillStyle = 'rgba(0,188,212,0.18)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,188,212,0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // panel blinking dot
      const blink = 0.4 + 0.6 * Math.abs(Math.sin(t * 0.05));
      ctx.beginPath();
      ctx.arc(10, 20, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,180,${blink})`;
      ctx.fill();

      // --- helmet ---
      ctx.beginPath();
      ctx.arc(0, -28, 36, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,220,240,0.88)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,188,212,0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // visor
      ctx.beginPath();
      ctx.ellipse(0, -28, 24, 20, 0, 0, Math.PI * 2);
      const visorGrad = ctx.createRadialGradient(-6, -34, 2, 0, -28, 24);
      visorGrad.addColorStop(0, 'rgba(180,230,255,0.55)');
      visorGrad.addColorStop(0.5, 'rgba(0,80,120,0.7)');
      visorGrad.addColorStop(1, 'rgba(0,20,40,0.85)');
      ctx.fillStyle = visorGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,188,212,0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // visor reflection shine
      ctx.beginPath();
      ctx.ellipse(-7, -35, 8, 5, -0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fill();

      // helmet ring
      ctx.beginPath();
      ctx.ellipse(0, -10, 38, 10, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(180,200,220,0.5)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // --- left arm ---
      ctx.save();
      ctx.rotate(-0.3 + Math.sin(t * 0.015) * 0.05);
      ctx.beginPath();
      ctx.ellipse(-48, 18, 14, 32, 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(210,228,242,0.9)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,188,212,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      // glove
      ctx.beginPath();
      ctx.ellipse(-52, 46, 12, 10, 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(80,100,120,0.85)';
      ctx.fill();
      ctx.restore();

      // --- right arm (holding phone) ---
      ctx.save();
      ctx.rotate(0.25 + Math.sin(t * 0.015 + 1) * 0.04);
      ctx.beginPath();
      ctx.ellipse(48, 18, 14, 32, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(210,228,242,0.9)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,188,212,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      // glove
      ctx.beginPath();
      ctx.ellipse(52, 46, 12, 10, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(80,100,120,0.85)';
      ctx.fill();
      // phone
      ctx.beginPath();
      drawRoundRect(ctx, 42, 30, 22, 36, 4);
      ctx.fillStyle = 'rgba(15,25,40,0.95)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,188,212,0.7)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // phone screen glow
      const screenGlow = 0.4 + 0.3 * Math.sin(t * 0.04);
      ctx.beginPath();
      drawRoundRect(ctx, 44, 33, 18, 28, 2);
      ctx.fillStyle = `rgba(0,188,212,${screenGlow * 0.3})`;
      ctx.fill();
      // screen lines (code)
      for (let li = 0; li < 5; li++) {
        const lw = 6 + Math.random() * 6;
        ctx.beginPath();
        drawRoundRect(ctx, 45, 36 + li * 5, lw, 2, 1);
        ctx.fillStyle = `rgba(0,220,255,${0.3 + screenGlow * 0.3})`;
        ctx.fill();
      }
      ctx.restore();

      // --- backpack ---
      ctx.beginPath();
      drawRoundRect(ctx, 32, 0, 18, 36, 4);
      ctx.fillStyle = 'rgba(160,180,200,0.7)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,188,212,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // --- legs ---
      [-16, 16].forEach((lx, i) => {
        ctx.beginPath();
        ctx.ellipse(lx, 74, 14, 26, (i === 0 ? -0.1 : 0.1) + Math.sin(t * 0.01 + i) * 0.03, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(205,222,238,0.88)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,188,212,0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
        // boots
        ctx.beginPath();
        ctx.ellipse(lx, 96, 16, 10, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(60,80,100,0.85)';
        ctx.fill();
      });

      ctx.restore();
    };

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2 + Math.sin(t * floatSpeed) * floatAmp;

      // --- outer HUD hexagons ---
      const hexPulseA = 0.06 + 0.04 * Math.sin(t * 0.01);
      hexPulse(ctx, cx, cy, 220, hexPulseA * 0.5);
      hexPulse(ctx, cx, cy, 240, hexPulseA * 0.3);

      // --- orbit rings ---
      for (const ring of rings) {
        ring.angle += ring.speed;

        // draw elliptical ring
        ctx.beginPath();
        ctx.ellipse(cx, cy, ring.rx, ring.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ring.color},0.12)`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        // orbiting dot
        const dx = cx + Math.cos(ring.angle) * ring.rx;
        const dy = cy + Math.sin(ring.angle) * ring.ry;

        // trail
        for (let tr = 1; tr <= 12; tr++) {
          const ta = ring.angle - tr * ring.speed * 6;
          const tx = cx + Math.cos(ta) * ring.rx;
          const ty = cy + Math.sin(ta) * ring.ry;
          ctx.beginPath();
          ctx.arc(tx, ty, ring.dotSize * (1 - tr / 14), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ring.color},${0.4 * (1 - tr / 14)})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(dx, dy, ring.dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ring.color},0.9)`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(dx, dy, ring.dotSize + 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ring.color},0.15)`;
        ctx.fill();
      }

      // --- data particles ---
      for (const p of dataParticles) {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.dist;
        const py = cy + Math.sin(p.angle) * p.dist;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,220,255,${p.alpha * (0.5 + 0.5 * Math.sin(t * 0.02 + p.angle))})`;
        ctx.fill();
      }

      // --- glow halo behind astronaut ---
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      halo.addColorStop(0, 'rgba(0,188,212,0.08)');
      halo.addColorStop(1, 'rgba(0,188,212,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // --- astronaut ---
      const scale = Math.min(W, H) / 520;
      drawAstronaut(cx, cy, scale);

      // --- HUD scan line ---
      const scanY = cy - 130 + ((t * 1.2) % 260);
      const scanGrad = ctx.createLinearGradient(cx - 140, scanY, cx + 140, scanY);
      scanGrad.addColorStop(0, 'rgba(0,188,212,0)');
      scanGrad.addColorStop(0.5, 'rgba(0,188,212,0.12)');
      scanGrad.addColorStop(1, 'rgba(0,188,212,0)');
      ctx.beginPath();
      ctx.rect(cx - 140, scanY, 280, 1.5);
      ctx.fillStyle = scanGrad;
      ctx.fill();

      // --- floating data labels ---
      const labels = [
        { text: 'UI/UX', dx: -130, dy: -80,  pulse: 0    },
        { text: 'MVP',   dx:  130, dy: -60,  pulse: 1.2  },
        { text: 'API',   dx: -120, dy:  70,  pulse: 2.1  },
        { text: 'DB',    dx:  110, dy:  80,  pulse: 0.7  },
      ];
      ctx.font = 'bold 10px monospace';
      for (const lb of labels) {
        const la = 0.35 + 0.25 * Math.sin(t * 0.015 + lb.pulse);
        const lx = cx + lb.dx + Math.sin(t * 0.008 + lb.pulse) * 6;
        const ly = cy + lb.dy + Math.cos(t * 0.01 + lb.pulse) * 4;
        // connector line
        ctx.beginPath();
        ctx.moveTo(cx + lb.dx * 0.55, cy + lb.dy * 0.55);
        ctx.lineTo(lx, ly);
        ctx.strokeStyle = `rgba(0,188,212,${la * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        // label box
        const tw = ctx.measureText(lb.text).width;
        ctx.beginPath();
        drawRoundRect(ctx, lx - tw / 2 - 6, ly - 10, tw + 12, 16, 3);
        ctx.fillStyle = `rgba(0,15,30,${la * 0.8})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(0,188,212,${la})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.fillStyle = `rgba(0,220,255,${la + 0.1})`;
        ctx.fillText(lb.text, lx - tw / 2, ly + 2);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <section className="relative bg-[#080d18] text-white overflow-hidden min-h-screen flex items-center">
      {/* BG canvas: stars, nebulas, meteors */}
      <canvas ref={bgCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(0,188,212,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(60,80,200,0.07) 0%, transparent 50%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,8,18,0.75) 100%)' }} />

      {/* Twinkle stars */}
      {twinkleStars.map((s, i) => (
        <span key={i} className="absolute text-cyan-400 pointer-events-none select-none"
          style={{ top: s.top, left: s.left, fontSize: s.size, animationDelay: s.delay, animationDuration: '3s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationName: 'starTwinkle', opacity: 0 }}>
          ✦
        </span>
      ))}

      <div className="container mx-auto pt-8 pb-8 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-76px)]">

          {/* LEFT: text */}
          <div className="space-y-7 animate-heroFadeUp">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-cyan-400/30 bg-cyan-400/[0.07] text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(0,188,212,0.8)]" />
              Disponível para novos projetos
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Transformando ideias em{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                experiências digitais extraordinárias
              </span>
            </h1>

            <p className="text-gray-400 text-base lg:text-lg font-light leading-relaxed max-w-md">
              MVP&apos;s personalizados sob demanda e designs inovadores de UI/UX
            </p>

            <div className="flex items-center gap-4 pt-1">
              <a href="#contact" className="bg-cyan-400 hover:bg-cyan-300 text-[#080d18] px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,188,212,0.4)] flex items-center gap-2">
                Solicitar Orçamento
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <a href="#projects" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                Ver projetos
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>

          {/* RIGHT: animated astronaut canvas */}
          <div className="hidden lg:block relative h-[500px] w-full">
            <canvas ref={fgCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce-slow">
        <span className="text-[0.6rem] tracking-[0.18em] uppercase text-gray-400">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-400 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          50% { opacity: 0.75; transform: scale(1) rotate(20deg); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-heroFadeUp { animation: heroFadeUp 0.7s ease forwards 0.2s; opacity: 0; }
        @keyframes bounceSlow {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        .animate-bounce-slow { animation: bounceSlow 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}