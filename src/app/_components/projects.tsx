'use client';

import Image, { StaticImageData } from 'next/image';
import { JSX, useEffect, useRef } from 'react';
import { FaMobileAlt, FaLaptop, FaWhatsapp } from 'react-icons/fa';
import SBIcon from '../../../public/images/supabase_icon.png';
import LogoDestrave from '../../../public/images/logo_destrave.png';
import { SpaceBackground } from './SpaceBackground';

export type Project = {
  id: number;
  title: string;
  image: StaticImageData;
  description: string;
  compatibility: { icon: JSX.Element; label: string }[];
  technologies: { icon: StaticImageData; label: string }[];
  videoUrl?: string;
  badge?: 'meteora' | 'founding';
  badgeLabel?: string;
  featured?: boolean;
  role?: string;
};

const projectList: Project[] = [
  {
    id: 4,
    title: 'Comuniverso',
    image: SBIcon,
    featured: true,
    badge: 'founding',
    badgeLabel: 'Founding Team',
    role: 'Destrave · Backend Developer · ago/2025 → presente',
    description:
      'Plataforma de engajamento educacional com IA. Modelagem do banco com Supabase/PostgreSQL, relacionamentos, RLS por perfil de usuário, Functions, Edge Functions e APIs REST para integração com o frontend. Foco em desempenho e segurança de dados desde o início.',
    compatibility: [
      { icon: <FaLaptop />, label: 'Web' },
      { icon: <FaMobileAlt />, label: 'Mobile' },
    ],
    technologies: [{ icon: SBIcon, label: 'Supabase' }],
  },
];

export function Projects() {
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
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const comuniverso = projectList[0];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#1d2428] text-white px-6 py-24 md:px-12 lg:px-24 border-t border-white/[0.05] overflow-hidden"
    >
      <SpaceBackground variant="circuit" opacity={0.5} />

      {/* Header */}
      <div
        data-reveal
        className="mb-14 transition-all duration-700 relative z-10"
        style={{ opacity: 0, transform: 'translateY(30px)' }}
      >
        <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-cyan-400 mb-3">
          Trabalhos recentes
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Projetos</h2>
        <p className="text-gray-400 max-w-xl text-base font-light leading-relaxed">
          Produto com banco modelado, API funcionando e entregue. Mais cases chegando em breve.
        </p>
      </div>

      {/* Comuniverso featured */}
      <div
        data-reveal
        className="mb-6 transition-all duration-700 relative z-10"
        style={{ opacity: 0, transform: 'translateY(30px)', transitionDelay: '0.1s' }}
      >
        <div
          className="group bg-[#1a2030] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-cyan-400/25 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,188,212,0.1)] grid grid-cols-1 md:grid-cols-2"
        >
          {/* Visual */}
          <div className="relative bg-[#111827] flex items-center justify-center min-h-[200px] overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,188,212,0.06) 0%, transparent 70%)' }} />
            <div className="text-center z-10 p-8">
              <Image src={LogoDestrave} alt="Destrave" width={160} height={80} className="object-contain opacity-80 mx-auto mb-3" />
              <p className="font-bold text-sm tracking-widest text-cyan-400/40 uppercase">Comuniverso</p>
            </div>
            <span className="absolute top-4 right-4 text-[0.65rem] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
              Founding Team
            </span>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <p className="text-[0.7rem] tracking-widest uppercase text-cyan-400/70 font-semibold mb-2">
              {comuniverso.role}
            </p>
            <h3 className="text-xl font-bold mb-3">{comuniverso.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{comuniverso.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Supabase', 'PostgreSQL', 'RLS', 'Edge Functions', 'REST API', 'Founding Team'].map((tag) => (
                <span key={tag} className="text-[0.7rem] px-2.5 py-1 rounded-md bg-[#243042] text-gray-400 border border-white/[0.06] font-mono">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              {comuniverso.technologies.map((t, i) => (
                <Image key={i} src={t.icon} alt={t.label} width={20} height={20} className="opacity-70 hover:opacity-100 transition" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* More coming soon */}
      <div
        data-reveal
        className="transition-all duration-700 relative z-10"
        style={{ opacity: 0, transform: 'translateY(30px)', transitionDelay: '0.2s' }}
      >
        <div className="bg-[#1e2a3a] border border-white/[0.06] border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full border border-dashed border-cyan-400/25 flex items-center justify-center mb-3">
            <span className="text-cyan-400/40 text-lg font-mono">···</span>
          </div>
          <p className="text-sm font-medium text-gray-500">Mais projetos em breve</p>
          <p className="text-xs text-gray-600 mt-1">Novos cases em desenvolvimento.</p>
        </div>
      </div>

      {/* WhatsApp */}
      <a
        href="https://wa.me/5511968272462?text=Olá,%20gostaria%20de%20falar%20com%20você!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition duration-300"
      >
        <FaWhatsapp size={24} />
      </a>

    </section>
  );
}