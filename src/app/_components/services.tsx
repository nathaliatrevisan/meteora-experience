'use client';

import Image from 'next/image';
import MVPImage from '../../../public/images/mvp.png';
import UIImage from '../../../public/images/UX.jpg';
import Supabase from '../../../public/images/supabase.png';
import FigmaLogo from '../../../public/images/figma_flutterflow.png';
import { useEffect, useRef } from 'react';
import { SpaceBackground } from './SpaceBackground';

const services = [
  { title: 'Criação de MVPs sob demanda', description: 'Transformação de ideias em protótipos funcionais e testáveis, com agilidade.', image: MVPImage },
  { title: 'Design de interfaces (UI)', description: 'Criação de visuais modernos e impactantes para sua aplicação ou site.', image: UIImage },
  { title: 'Desenvolvimento low-code', description: 'Desenvolvimento de soluções tecnológicas sem linhas de código.', image: FigmaLogo },
  { title: 'Modelagem Banco de Dados', description: 'Modelagem de Banco de Dados relacionais e não relacionais.', image: Supabase },
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
      { threshold: 0.12 }
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
        {/* Header */}
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
            Soluções rápidas, inovadoras e personalizadas para transformar suas ideias em realidade.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-px grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
          {services.map((service, index) => (
            <div
              key={index}
              data-reveal
              className="group bg-[#14181B] p-8 relative overflow-hidden cursor-default transition-all duration-700"
              style={{ opacity: 0, transform: 'translateY(30px)', transitionDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top left, rgba(0,188,212,0.08), transparent 60%)' }} />

              <div className="mb-6 w-14 h-14 rounded-xl bg-[#1e2a3a] border border-white/[0.06] flex items-center justify-center group-hover:border-cyan-400/40 group-hover:bg-cyan-400/[0.08] group-hover:shadow-[0_0_20px_rgba(0,188,212,0.12)] transition-all duration-300">
                <Image src={service.image} alt={service.title} width={32} height={32} className="rounded-lg object-contain" />
              </div>

              <h3 className="text-white font-semibold text-base mb-3 leading-snug">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>

              <span className="absolute bottom-6 right-6 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-cyan-400 transition-all duration-300 text-lg">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}