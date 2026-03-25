'use client';

import { useEffect, useRef } from 'react';

const twinkleStars = [
  { top: '18%', left: '8%',  delay: '0s',   size: '1rem'  },
  { top: '12%', left: '35%', delay: '0.6s', size: '1rem'  },
  { top: '25%', left: '62%', delay: '1.2s', size: '0.9rem'},
  { top: '60%', left: '14%', delay: '0.3s', size: '1rem'  },
  { top: '72%', left: '50%', delay: '1.8s', size: '0.8rem'},
  { top: '42%', left: '76%', delay: '0.9s', size: '1rem'  },
  { top: '10%', left: '90%', delay: '1.5s', size: '1rem'  },
  { top: '34%', left: '28%', delay: '2.4s', size: '0.7rem'},
];

const CODE_LINES = [
  { text: 'const db = createClient(supabase_url);',        color: '#e2e8f0' },
  { text: 'await db.schema.createTable("products");',      color: '#94a3b8' },
  { text: '',                                               color: '#94a3b8' },
  { text: 'type Database = {',                             color: '#67e8f9' },
  { text: '  products: ProductsTable;',                    color: '#94a3b8' },
  { text: '  users: UsersTable;',                          color: '#94a3b8' },
  { text: '  rls: RowLevelSecurity;',                      color: '#94a3b8' },
  { text: '};',                                            color: '#67e8f9' },
  { text: '',                                               color: '#94a3b8' },
  { text: 'async function buildAPI(idea: string) {',       color: '#a5f3fc' },
  { text: '  const schema = await modelDatabase(idea);',   color: '#64748b' },
  { text: '  const api    = await createEndpoints(schema);',color: '#64748b' },
  { text: '  return deploy(api).to("production");',        color: '#64748b' },
  { text: '}',                                             color: '#a5f3fc' },
  { text: '',                                               color: '#94a3b8' },
  { text: 'interface MVP extends Idea {',                  color: '#67e8f9' },
  { text: '  database: PostgreSQL;',                       color: '#94a3b8' },
  { text: '  api: RESTful | RPC;',                         color: '#94a3b8' },
  { text: '  shipped: true;',                              color: '#94a3b8' },
  { text: '}',                                             color: '#67e8f9' },
  { text: '',                                               color: '#94a3b8' },
  { text: 'export default MeteoraDev;',                    color: '#a5f3fc' },
];

const KEYWORDS = ['const','let','type','interface','function','return','export','default','await','new','extends','import','from'];
const TYPES    = ['string','boolean','void','Promise','UIComponent','SupabaseClient','MVP','Vision','RealProduct','Experience'];


function tokenize(text: string): { word: string; color: string }[] {
  if (!text.trim()) return [{ word: text, color: '#transparent' }];
  const tokens: { word: string; color: string }[] = [];
  let i = 0;
  while (i < text.length) {
    // string literal
    if (text[i] === '"' || text[i] === "'" || text[i] === '`') {
      const q = text[i];
      let j = i + 1;
      while (j < text.length && text[j] !== q) j++;
      tokens.push({ word: text.slice(i, j + 1), color: '#86efac' });
      i = j + 1; continue;
    }
    // word
    if (/[a-zA-Z_$]/.test(text[i])) {
      let j = i;
      while (j < text.length && /[\w$]/.test(text[j])) j++;
      const word = text.slice(i, j);
      let color = '#e2e8f0';
      if (KEYWORDS.includes(word)) color = '#c084fc';
      else if (TYPES.includes(word))    color = '#f9a8d4';
      else if (word === 'true' || word === 'false' || word === 'null') color = '#fb923c';
      tokens.push({ word, color }); i = j; continue;
    }
    // number
    if (/\d/.test(text[i])) {
      let j = i;
      while (j < text.length && /[\d.]/.test(text[j])) j++;
      tokens.push({ word: text.slice(i, j), color: '#fb923c' }); i = j; continue;
    }
    // punctuation / operator
    const punct = text[i];
    let color = '#94a3b8';
    if ('{}()[]'.includes(punct)) color = '#fbbf24';
    if ('=><>'.includes(punct))   color = '#67e8f9';
    tokens.push({ word: punct, color }); i++;
  }
  return tokens;
}

export function Hero() {
  const bgRef  = useRef<HTMLCanvasElement>(null);
  const fgRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  // ── BG: stars + nebulas + meteors ──
  useEffect(() => {
    const canvas = bgRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let animId: number;
    let t = 0;

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.15,
      speed: Math.random() * 0.016 + 0.004,
      offset: Math.random() * Math.PI * 2,
      c: Math.random() > 0.8 ? 'rgba(180,220,255,' : Math.random() > 0.65 ? 'rgba(0,188,212,' : 'rgba(255,255,255,',
    }));

    const nebulas = [
      { x:W*0.1,  y:H*0.25, rx:280,ry:160, r:0,  g:188,b:212,a:0.032,dx:0.06, dy:0.025 },
      { x:W*0.82, y:H*0.65, rx:200,ry:140, r:60, g:100,b:255,a:0.022,dx:-0.04,dy:0.038 },
      { x:W*0.55, y:H*0.08, rx:280,ry:100, r:0,  g:190,b:160,a:0.018,dx:0.03, dy:-0.02 },
    ];

    type Streak = { x:number;y:number;len:number;speed:number;angle:number;op:number;active:boolean;timer:number;next:number };
    const streaks: Streak[] = Array.from({ length: 5 }, () => ({ x:0,y:0,len:0,speed:0,angle:0,op:0,active:false,timer:0,next:Math.random()*250 }));
    const spawnStreak = (s: Streak) => { s.x=Math.random()*W*1.5-W*0.2; s.y=Math.random()*H*0.4-30; s.len=Math.random()*160+90; s.speed=Math.random()*12+7; s.angle=Math.PI/4+(Math.random()-0.5)*0.22; s.op=Math.random()*0.5+0.28; s.active=true; s.timer=0; };

    const draw = () => {
      t++; ctx.clearRect(0,0,W,H);
      for (const nb of nebulas) {
        nb.x+=nb.dx; nb.y+=nb.dy;
        if(nb.x>W+300)nb.x=-300; if(nb.x<-300)nb.x=W+300;
        if(nb.y>H+200)nb.y=-200; if(nb.y<-200)nb.y=H+200;
        const mr=Math.max(nb.rx,nb.ry);
        ctx.save(); ctx.translate(nb.x,nb.y);
        const g=ctx.createRadialGradient(0,0,0,0,0,mr);
        g.addColorStop(0,`rgba(${nb.r},${nb.g},${nb.b},${nb.a})`);
        g.addColorStop(1,`rgba(${nb.r},${nb.g},${nb.b},0)`);
        ctx.scale(nb.rx/mr,nb.ry/mr); ctx.beginPath(); ctx.arc(0,0,mr,0,Math.PI*2); ctx.fillStyle=g; ctx.fill(); ctx.restore();
      }
      for (const s of stars) {
        const tw=0.3+0.7*(0.5+0.5*Math.sin(t*s.speed+s.offset));
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`${s.c}${tw})`; ctx.fill();
      }
      for (const m of streaks) {
        if(!m.active){ m.next--; if(m.next<=0){spawnStreak(m);m.next=Math.random()*320+100;} continue; }
        m.x+=Math.cos(m.angle)*m.speed; m.y+=Math.sin(m.angle)*m.speed; m.timer++;
        const fade=Math.max(0,1-m.timer/46);
        const tx=m.x-Math.cos(m.angle)*m.len, ty=m.y-Math.sin(m.angle)*m.len;
        const mg=ctx.createLinearGradient(tx,ty,m.x,m.y);
        mg.addColorStop(0,'rgba(0,188,212,0)');
        mg.addColorStop(0.55,`rgba(0,188,212,${m.op*fade*0.4})`);
        mg.addColorStop(1,`rgba(255,255,255,${m.op*fade})`);
        ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(m.x,m.y);
        ctx.strokeStyle=mg; ctx.lineWidth=1.4; ctx.stroke();
        ctx.beginPath(); ctx.arc(m.x,m.y,1.5,0,Math.PI*2);
        ctx.fillStyle=`rgba(200,240,255,${m.op*fade})`; ctx.fill();
        if(m.x>W+200||m.y>H+200||fade<=0) m.active=false;
      }
      animId=requestAnimationFrame(draw);
    };
    draw();
    const onResize=()=>{W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;};
    window.addEventListener('resize',onResize);
    return ()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',onResize);};
  },[]);

  // ── FG: terminal com interação de mouse ──
  useEffect(() => {
    const canvas = fgRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let animId: number;
    let t = 0;

    // mouse tracking
    const mouse = mouseRef.current;
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -999; mouse.y = -999; };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    // spark particles on mouse interaction
    type Spark = { x:number;y:number;vx:number;vy:number;life:number;maxLife:number;color:string };
    const sparks: Spark[] = [];
    const emitSparks = (x:number, y:number) => {
      for(let i=0;i<3;i++){
        const angle=Math.random()*Math.PI*2;
        const speed=Math.random()*2+0.5;
        sparks.push({
          x, y,
          vx: Math.cos(angle)*speed,
          vy: Math.sin(angle)*speed,
          life: 0,
          maxLife: Math.random()*30+15,
          color: Math.random()>0.5 ? '#00bcd4' : '#a5f3fc',
        });
      }
      if(sparks.length>200) sparks.splice(0,sparks.length-200);
    };

    // ripple effect on click
    type Ripple = { x:number;y:number;r:number;maxR:number;life:number;maxLife:number };
    const ripples: Ripple[] = [];
    const onMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({ x:e.clientX-rect.left, y:e.clientY-rect.top, r:0, maxR:120, life:0, maxLife:40 });
    };
    canvas.addEventListener('mousedown', onMouseDown);

    // typing state
    type TermLine = { text:string; displayed:number; opacity:number; tokens: {word:string;color:string}[] };
    const lines: TermLine[] = [];
    let nextLineAt = 20;
    let lineIndex = 0;
    const LINE_H = 21;
    const MAX_VISIBLE = 14;
    const CHAR_SPEED = 2.2;
    let cursorBlink = 0;

    // glitch state
    let glitchActive = false;
    let glitchTimer = 0;
    let glitchLines: number[] = [];
    let nextGlitch = 180;

    // hover highlight state — which line is hovered
    let hoveredLine = -1;

    const TERM_PAD_X = 20;
    const TERM_PAD_Y = 48;
    const TERM_H_MAX = MAX_VISIBLE * LINE_H + TERM_PAD_Y + 28;

    const draw = () => {
      t++;
      ctx.clearRect(0,0,W,H);

      const TW = W - 28;
      const TH = Math.min(H - 28, TERM_H_MAX);
      const TX = 14;
      const TY = 14;

      // ── advance typing ──
      if(t >= nextLineAt && lineIndex < CODE_LINES.length){
        const src = CODE_LINES[lineIndex];
        lines.push({ text:src.text, displayed:0, opacity:0, tokens: tokenize(src.text) });
        if(lines.length > MAX_VISIBLE) lines.shift();
        lineIndex++;
        const delay = src.text.length === 0 ? 12 : Math.round(src.text.length / CHAR_SPEED) + 10;
        nextLineAt = t + delay;
      }
      for(const ln of lines){
        if(ln.displayed < ln.text.length) ln.displayed = Math.min(ln.text.length, ln.displayed + CHAR_SPEED);
        if(ln.opacity < 1) ln.opacity = Math.min(1, ln.opacity + 0.08);
      }

      // ── glitch trigger ──
      nextGlitch--;
      if(nextGlitch <= 0 && !glitchActive){
        glitchActive = true;
        glitchTimer = 0;
        glitchLines = Array.from({length: 3}, () => Math.floor(Math.random()*lines.length));
        nextGlitch = Math.random()*300+200;
      }
      if(glitchActive){ glitchTimer++; if(glitchTimer>12) glitchActive=false; }

      // ── detect hovered line ──
      hoveredLine = -1;
      if(mouse.x>TX && mouse.x<TX+TW){
        for(let i=0;i<lines.length;i++){
          const ly = TY + TERM_PAD_Y + i*LINE_H;
          if(mouse.y >= ly-4 && mouse.y <= ly+LINE_H-4){ hoveredLine=i; break; }
        }
      }

      // ── emit sparks near mouse if inside terminal ──
      if(mouse.x > TX && mouse.x < TX+TW && mouse.y > TY && mouse.y < TY+TH){
        if(t % 4 === 0) emitSparks(mouse.x + (Math.random()-0.5)*20, mouse.y + (Math.random()-0.5)*10);
      }

      // ── draw sparks ──
      for(let i=sparks.length-1;i>=0;i--){
        const sp=sparks[i]; sp.life++;
        if(sp.life>=sp.maxLife){sparks.splice(i,1);continue;}
        sp.x+=sp.vx; sp.y+=sp.vy; sp.vx*=0.94; sp.vy*=0.94;
        const prog=sp.life/sp.maxLife;
        ctx.beginPath(); ctx.arc(sp.x,sp.y,1.5*(1-prog),0,Math.PI*2);
        ctx.fillStyle=sp.color; ctx.globalAlpha=(1-prog)*0.8; ctx.fill(); ctx.globalAlpha=1;
      }

      // ── draw ripples ──
      for(let i=ripples.length-1;i>=0;i--){
        const rp=ripples[i]; rp.life++;
        if(rp.life>=rp.maxLife){ripples.splice(i,1);continue;}
        rp.r += rp.maxR/rp.maxLife;
        const prog=rp.life/rp.maxLife;
        ctx.beginPath(); ctx.arc(rp.x,rp.y,rp.r,0,Math.PI*2);
        ctx.strokeStyle=`rgba(0,188,212,${(1-prog)*0.5})`; ctx.lineWidth=1.5*(1-prog); ctx.stroke();
      }

      // ── terminal background ──
      ctx.save();
      // soft glow behind terminal near mouse
      if(mouse.x>TX && mouse.x<TX+TW && mouse.y>TY && mouse.y<TY+TH){
        const gx = Math.max(TX+60, Math.min(TX+TW-60, mouse.x));
        const gy = Math.max(TY+40, Math.min(TY+TH-40, mouse.y));
        const mg = ctx.createRadialGradient(gx,gy,0,gx,gy,160);
        mg.addColorStop(0,'rgba(0,188,212,0.07)');
        mg.addColorStop(1,'rgba(0,188,212,0)');
        ctx.beginPath(); ctx.rect(TX,TY,TW,TH); ctx.fillStyle=mg; ctx.fill();
      }

      // window body
      ctx.beginPath();
      const cr=10;
      ctx.moveTo(TX+cr,TY); ctx.lineTo(TX+TW-cr,TY); ctx.quadraticCurveTo(TX+TW,TY,TX+TW,TY+cr);
      ctx.lineTo(TX+TW,TY+TH-cr); ctx.quadraticCurveTo(TX+TW,TY+TH,TX+TW-cr,TY+TH);
      ctx.lineTo(TX+cr,TY+TH); ctx.quadraticCurveTo(TX,TY+TH,TX,TY+TH-cr);
      ctx.lineTo(TX,TY+cr); ctx.quadraticCurveTo(TX,TY,TX+cr,TY);
      ctx.closePath();
      ctx.fillStyle='rgba(6,11,22,0.88)'; ctx.fill();
      ctx.strokeStyle='rgba(0,188,212,0.16)'; ctx.lineWidth=1; ctx.stroke();

      // title bar
      ctx.fillStyle='rgba(0,188,212,0.06)';
      ctx.beginPath();
      ctx.moveTo(TX+cr,TY); ctx.lineTo(TX+TW-cr,TY); ctx.quadraticCurveTo(TX+TW,TY,TX+TW,TY+cr);
      ctx.lineTo(TX+TW,TY+30); ctx.lineTo(TX,TY+30); ctx.lineTo(TX,TY+cr); ctx.quadraticCurveTo(TX,TY,TX+cr,TY);
      ctx.closePath(); ctx.fill();

      // traffic lights
      ([[22,'rgba(255,95,86,0.75)'],[40,'rgba(255,189,46,0.75)'],[58,'rgba(39,201,63,0.75)']] as [number,string][]).forEach(([x,c])=>{
        ctx.beginPath(); ctx.arc(TX+x,TY+15,5,0,Math.PI*2); ctx.fillStyle=c; ctx.fill();
      });

      // title
      ctx.font='11px monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(148,163,184,0.65)';
      ctx.fillText('meteora.ts — backend', TX+TW/2, TY+20);
      ctx.textAlign='left';

      // title border
      ctx.beginPath(); ctx.moveTo(TX,TY+30); ctx.lineTo(TX+TW,TY+30);
      ctx.strokeStyle='rgba(0,188,212,0.1)'; ctx.lineWidth=0.8; ctx.stroke();
      ctx.restore();

      // ── scanlines ──
      ctx.save();
      ctx.beginPath(); ctx.rect(TX,TY+30,TW,TH-30); ctx.clip();
      for(let sy=TY+30;sy<TY+TH;sy+=3){
        ctx.fillStyle='rgba(0,0,0,0.025)'; ctx.fillRect(TX,sy,TW,1);
      }
      ctx.restore();

      // ── line numbers + code ──
      ctx.save();
      ctx.beginPath(); ctx.rect(TX,TY+30,TW,TH-56); ctx.clip();
      ctx.font='13px "Fira Code","Courier New",monospace';

      for(let i=0;i<lines.length;i++){
        const ln=lines[i];
        const ly = TY + TERM_PAD_Y + i*LINE_H;
        const lineNum = (lineIndex - lines.length + i + 1);
        const isHovered = hoveredLine === i;
        const isGlitch = glitchActive && glitchLines.includes(i);

        // hover highlight row
        if(isHovered){
          ctx.fillStyle='rgba(0,188,212,0.07)';
          ctx.fillRect(TX, ly-14, TW, LINE_H);
          // left accent bar
          ctx.fillStyle='rgba(0,188,212,0.6)';
          ctx.fillRect(TX, ly-14, 2, LINE_H);
        }

        // line number
        ctx.fillStyle=isHovered ? 'rgba(0,188,212,0.7)' : 'rgba(75,95,120,0.5)';
        ctx.fillText(String(lineNum).padStart(3,' '), TX+8, ly);

        // prompt
        ctx.fillStyle=`rgba(0,188,212,${ln.opacity*0.6})`;
        ctx.fillText('❯', TX+48, ly);

        // code with syntax highlight
        const shown = ln.text.slice(0, Math.floor(ln.displayed));
        let xOff = TX + TERM_PAD_X + 44;

        if(isGlitch && glitchTimer < 8){
          // glitch: random offset + color
          ctx.save();
          ctx.translate((Math.random()-0.5)*4, 0);
          ctx.fillStyle=`rgba(0,255,200,${ln.opacity*0.9})`;
          ctx.fillText(shown, xOff, ly);
          ctx.restore();
        } else {
          // render tokens up to displayed length
          let charCount = 0;
          for(const tok of ln.tokens){
            if(charCount >= Math.floor(ln.displayed)) break;
            const slice = tok.word.slice(0, Math.floor(ln.displayed) - charCount);
            ctx.globalAlpha = ln.opacity;
            ctx.fillStyle = isHovered ? '#ffffff' : tok.color;
            ctx.fillText(slice, xOff, ly);
            xOff += ctx.measureText(slice).width;
            charCount += tok.word.length;
          }
          ctx.globalAlpha = 1;
        }
      }

      // blinking cursor
      cursorBlink++;
      if(lines.length > 0 && Math.floor(cursorBlink/18)%2===0){
        const last = lines[lines.length-1];
        const ly = TY + TERM_PAD_Y + (lines.length-1)*LINE_H;
        const shown = last.text.slice(0, Math.floor(last.displayed));
        ctx.font='13px "Fira Code","Courier New",monospace';
        const textW = ctx.measureText(shown).width;
        ctx.fillStyle='rgba(0,220,255,0.85)';
        ctx.fillRect(TX + TERM_PAD_X + 44 + textW, ly-12, 8, 15);
        // cursor glow
        const cg = ctx.createRadialGradient(TX+TERM_PAD_X+44+textW+4,ly-4,0,TX+TERM_PAD_X+44+textW+4,ly-4,20);
        cg.addColorStop(0,'rgba(0,220,255,0.2)'); cg.addColorStop(1,'rgba(0,220,255,0)');
        ctx.beginPath(); ctx.arc(TX+TERM_PAD_X+44+textW+4,ly-4,20,0,Math.PI*2);
        ctx.fillStyle=cg; ctx.fill();
      }
      ctx.restore();

      // ── status bar ──
      const sbY = TY + TH - 24;
      ctx.fillStyle='rgba(0,188,212,0.06)';
      ctx.fillRect(TX, sbY, TW, 24);
      ctx.beginPath(); ctx.moveTo(TX,sbY); ctx.lineTo(TX+TW,sbY);
      ctx.strokeStyle='rgba(0,188,212,0.1)'; ctx.lineWidth=0.8; ctx.stroke();
      ctx.font='10px monospace';
      ctx.fillStyle='rgba(0,188,212,0.5)';
      ctx.fillText('  PostgreSQL  ·  Supabase  ·  REST API  ·  FlutterFlow', TX+8, sbY+16);
      ctx.fillStyle='rgba(39,201,63,0.7)';
      ctx.textAlign='right';
      ctx.fillText(`● ${lines.length} lines  `, TX+TW-8, sbY+16);
      ctx.textAlign='left';

      animId=requestAnimationFrame(draw);
    };
    draw();

    const onResize=()=>{W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;};
    window.addEventListener('resize',onResize);
    return ()=>{
      cancelAnimationFrame(animId);
      window.removeEventListener('resize',onResize);
      canvas.removeEventListener('mousemove',onMouseMove);
      canvas.removeEventListener('mouseleave',onMouseLeave);
      canvas.removeEventListener('mousedown',onMouseDown);
    };
  },[]);

  return (
    <section className="relative bg-[#080d18] text-white overflow-hidden min-h-screen flex items-center">
      <canvas ref={bgRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 20% 50%, rgba(0,188,212,0.05) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(60,80,200,0.06) 0%, transparent 50%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at center, transparent 38%, rgba(5,8,18,0.75) 100%)' }} />

      {twinkleStars.map((s,i)=>(
        <span key={i} className="absolute text-cyan-400 pointer-events-none select-none"
          style={{ top:s.top,left:s.left,fontSize:s.size,animationDelay:s.delay,animationDuration:'3s',animationIterationCount:'infinite',animationTimingFunction:'ease-in-out',animationName:'starTwinkle',opacity:0 }}>✦</span>
      ))}

      <div className="container mx-auto pt-8 pb-8 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-76px)]">

          <div className="space-y-7 animate-heroFadeUp">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-cyan-400/30 bg-cyan-400/[0.07] text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(0,188,212,0.8)]" />
              Disponível para novos projetos
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Da ideia ao{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                produto em produção.
              </span>
            </h1>
            <p className="text-gray-400 text-base lg:text-lg font-light leading-relaxed max-w-md">
              Banco modelado, API funcionando, MVP no ar — e equipamento industrial integrado ao sistema.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a href="#contact" className="bg-cyan-400 hover:bg-cyan-300 text-[#080d18] px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,188,212,0.4)] flex items-center gap-2">
                Solicitar Orçamento
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#projects" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                Ver projetos
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          <div className="hidden lg:block relative h-[500px] w-full" style={{ cursor:'crosshair' }}>
            <canvas ref={fgRef} className="absolute inset-0 w-full h-full" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce-slow">
        <span className="text-[0.6rem] tracking-[0.18em] uppercase text-gray-400">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-400 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes starTwinkle{0%,100%{opacity:0;transform:scale(.5) rotate(0deg);}50%{opacity:.75;transform:scale(1) rotate(20deg);}}
        @keyframes heroFadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
        .animate-heroFadeUp{animation:heroFadeUp .7s ease forwards .2s;opacity:0;}
        @keyframes bounceSlow{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(6px);}}
        .animate-bounce-slow{animation:bounceSlow 2s ease-in-out infinite;}
      `}</style>
    </section>
  );
}