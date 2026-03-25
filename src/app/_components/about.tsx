'use client';

import Image from 'next/image';
import nathalia from '../../../public/images/nathalia.png';
import SBIcon from '../../../public/images/supabase_icon.png';
import { useEffect, useRef } from 'react';
import { SpaceBackground } from './SpaceBackground';

const stack = [
  'PostgreSQL', 'Supabase', 'RLS', 'Edge Functions', 'REST API', 'Node-RED', 'Redes Industriais', 'FlutterFlow', 'Next.js', 'IoT',
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#14181B] text-white py-24 px-6 md:px-12 lg:px-24 border-t border-white/[0.05] overflow-hidden"
    >
      <SpaceBackground variant="orbit" opacity={0.45} />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Photo */}
        <div
          data-reveal
          className="relative transition-all duration-700"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <div className="relative aspect-square max-w-[320px] mx-auto rounded-2xl overflow-hidden border border-white/[0.06] bg-[#1e2a3a]">
            <Image src={nathalia} alt="Foto da Nathalia" fill className="object-cover object-top" priority />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(20,24,27,0.6) 100%)' }} />
          </div>
          <div className="absolute -bottom-5 -right-4 bg-[#1e2a3a] border border-cyan-400/25 rounded-xl px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <Image src={SBIcon} alt="Supabase" width={16} height={16} className="opacity-80" />
              <span className="text-[0.7rem] text-gray-400 font-medium">Founding Team · Destrave</span>
            </div>
            <p className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">8 meses+</p>
            <p className="text-[0.7rem] text-gray-500 mt-0.5">Backend Developer</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div
            data-reveal
            className="transition-all duration-700"
            style={{ opacity: 0, transform: 'translateY(25px)' }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-cyan-400 mb-3">
              Sobre mim
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Oi, eu sou a{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                Nathalia!
              </span>
            </h2>
          </div>

          <div
            data-reveal
            className="space-y-4 transition-all duration-700"
            style={{ opacity: 0, transform: 'translateY(25px)', transitionDelay: '0.1s' }}
          >
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Fundadora da <strong className="text-gray-300 font-medium">Meteora Experience</strong> e Backend Developer
              no time fundador da <strong className="text-cyan-400 font-medium">Destrave</strong>, startup por trás do Comuniverso.
              Tenho formação em Automação Industrial, Análise e Desenvolvimento de Sistemas e pós em Desenvolvimento Front-End e Produtos Digitais.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Atuo na arquitetura e modelagem de dados, estruturando tabelas, relacionamentos, políticas de RLS, Functions e Edge Functions com foco em performance, 
              escalabilidade e eficiência de recursos (CPU, RAM e índices). Desenvolvo APIs REST para integração com frontends, 
              automações (como n8n) e serviços externos, sempre considerando custo por usuário e crescimento sustentável da aplicação.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Também atuo na interseção entre T.I. e automação industrial, integrando CLPs e equipamentos via Profinet, Modbus, Ethernet e TCP/IP com Node-RED. 
              Estruturo pipelines de dados que levam informações do chão de fábrica diretamente para o banco e as transformo em interfaces e dashboards de alta performance, 
              voltados para monitoramento em tempo real e tomada de decisão. 🚀
            </p>
          </div>

          <div
            data-reveal
            className="flex flex-wrap gap-2 transition-all duration-700"
            style={{ opacity: 0, transform: 'translateY(25px)', transitionDelay: '0.2s' }}
          >
            {stack.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1.5 rounded-full border border-white/[0.08] text-gray-400 bg-[#1e2a3a] hover:border-cyan-400/35 hover:text-cyan-300 hover:bg-cyan-400/[0.06] transition-all duration-200 cursor-default font-mono"
              >
                {s}
              </span>
            ))}
          </div>

          <div
            data-reveal
            className="flex flex-wrap gap-3 pt-1 transition-all duration-700"
            style={{ opacity: 0, transform: 'translateY(25px)', transitionDelay: '0.3s' }}
          >
            <a
              href="https://www.linkedin.com/in/nathalia-trevisan-074a9714b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-white/[0.08] bg-[#1e2a3a] text-gray-300 hover:border-cyan-400/35 hover:text-cyan-300 hover:bg-cyan-400/[0.06] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://www.comuniverso.co/landing-comuniverso"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-white/[0.08] bg-[#1e2a3a] text-gray-300 hover:border-cyan-400/35 hover:text-cyan-300 hover:bg-cyan-400/[0.06] transition-all duration-200"
            >
              🌌 Comuniverso
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}