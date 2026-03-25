'use client';

import Image from 'next/image';
import Supabase from '../../../public/images/supabase.png';
import IotIcon from '../../../public/images/iot_icon.png';
import MVPImage from '../../../public/images/mvp.png';
import { useEffect, useRef } from 'react';
import { SpaceBackground } from './SpaceBackground';

const services: { title: string; description: string; image: Parameters<typeof Image>[0]['src']; tags: string[]; useIconSlot?: boolean }[] = [
  {
    title: 'Banco de Dados',
    description: 'Modelagem de tabelas, relacionamentos, RLS, Functions e Edge Functions. Foco em desempenho real — análise de CPU, RAM, índices e queries para um banco que aguenta crescer.',
    image: Supabase,
    tags: ['PostgreSQL', 'Supabase', 'RLS', 'Functions'],
  },
  {
    title: 'APIs REST',
    description: 'APIs para integrar frontend com n8n, calcular custo por usuário, conectar serviços externos. Endpoints limpos, documentados e com lógica de negócio onde tem que estar.',
    image: MVPImage,
    tags: ['REST', 'n8n', 'Integração', 'Cost API'],
    useIconSlot: true,
  },
  {
    title: 'MVPs',
    description: 'Do banco ao produto funcional — em FlutterFlow ou Next.js. Estrutura certa desde o início para você validar rápido e não precisar refatorar tudo depois.',
    image: MVPImage,
    tags: ['FlutterFlow', 'Next.js', 'Backend', 'Launch'],
  },
  {
    title: 'IoT & Automação',
    description: 'Integração de CLPs e equipamentos com comunicação Profinet, Modbus, Ethernet e TCP/IP via Node-RED. Dados de chão de fábrica indo direto pro banco — sem intermediários.',
    image: IotIcon,
    tags: ['Node-RED', 'Modbus', 'Profinet', 'CLP'],
  },
];

export function Services() {
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
      id="services"
      className="relative bg-[#14181B] text-white py-24 px-6 md:px-12 lg:px-24 border-t border-white/[0.05] overflow-hidden"
    >
      <SpaceBackground variant="grid" opacity={0.55} />

      <div className="relative z-10">
        <div
          data-reveal
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-cyan-400 mb-3">
            O que eu faço
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Serviços</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base font-light leading-relaxed">
            Banco modelado, API funcionando, MVP no ar e equipamento integrado. Do banco de dados ao chão de fábrica.
          </p>
        </div>

        <div className="grid gap-px grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
          {services.map((service, index) => (
            <div
              key={index}
              data-reveal
              className="group bg-[#14181B] p-8 relative overflow-hidden cursor-default transition-all duration-700"
              style={{ opacity: 0, transform: 'translateY(30px)', transitionDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top left, rgba(0,188,212,0.08), transparent 60%)' }} />

              <div className="mb-6 w-14 h-14 rounded-xl bg-[#1e2a3a] border border-white/[0.06] flex items-center justify-center group-hover:border-cyan-400/40 group-hover:bg-cyan-400/[0.08] group-hover:shadow-[0_0_20px_rgba(0,188,212,0.12)] transition-all duration-300">
                {service.useIconSlot ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(0,188,212,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20V10M12 20V4M6 20v-6" />
                    <circle cx="18" cy="7" r="3" />
                    <circle cx="12" cy="4" r="1" />
                    <path d="M3 12h4M17 12h4" strokeOpacity="0.4" />
                  </svg>
                ) : (
                  <Image src={service.image} alt={service.title} width={32} height={32} className="rounded-lg object-contain" />
                )}
              </div>

              <h3 className="text-white font-semibold text-base mb-3 leading-snug">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((t) => (
                  <span key={t} className="text-[0.65rem] px-2 py-0.5 rounded-md bg-cyan-400/[0.07] text-cyan-400/70 border border-cyan-400/15 font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <span className="absolute bottom-6 right-6 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-cyan-400 transition-all duration-300 text-lg">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}