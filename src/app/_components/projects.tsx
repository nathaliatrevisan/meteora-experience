'use client';

import Image, { StaticImageData } from 'next/image';
import { JSX, useState, useEffect, useRef } from 'react';
import {
  FaMobileAlt, FaAndroid, FaApple, FaServer, FaLaptop, FaWhatsapp,
} from 'react-icons/fa';
import SuperHero from '../../../public/images/SuperHero_Principal.png';
import AppFinanca from '../../../public/images/ui.png';
import AppOver from '../../../public/images/overSafve.png';
import FFIcon from '../../../public/images/flutterflow_icon.png';
import SBIcon from '../../../public/images/supabase_icon.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import ProjectDetails from './ProjectDetails';
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
      'Plataforma de engajamento educacional com IA — onde a inteligência artificial aprende com os materiais do educador, cria trilhas personalizadas e mantém os alunos engajados. Atuação como Backend Developer no time fundador: modelagem e evolução do banco de dados (Supabase/PostgreSQL), desenvolvimento de APIs e implementação de regras de acesso (RLS).',
    compatibility: [
      { icon: <FaLaptop />, label: 'Web' },
      { icon: <FaMobileAlt />, label: 'Mobile' },
    ],
    technologies: [
      { icon: SBIcon, label: 'Supabase' },
    ],
  },
  {
    id: 1,
    title: 'SuperHero',
    image: SuperHero,
    badge: 'meteora',
    badgeLabel: 'Meteora',
    description:
      'Esse Aplicativo foi desenvolvido para colocar em prática o consumo de API. Ele consiste em conectar fãs de super-heróis aos principais detalhes dos seus heróis favoritos.',
    compatibility: [
      { icon: <FaMobileAlt />, label: 'Mobile' },
      { icon: <FaAndroid />, label: 'Android' },
      { icon: <FaApple />, label: 'iOS' },
      { icon: <FaServer />, label: 'API' },
    ],
    technologies: [{ icon: FFIcon, label: 'FlutterFlow' }],
    videoUrl:
      'https://firebasestorage.googleapis.com/v0/b/meteora-experience.firebasestorage.app/o/videos%2FSuperhero.mp4?alt=media&token=0066e1e5-6123-43dd-82eb-ce753761fef5',
  },
  {
    id: 2,
    title: 'Finance Flow',
    image: AppFinanca,
    badge: 'meteora',
    badgeLabel: 'Meteora',
    description: 'Sistema de controle financeiro pessoal com dashboard em tempo real.',
    compatibility: [
      { icon: <FaMobileAlt />, label: 'Mobile' },
      { icon: <FaLaptop />, label: 'Web' },
      { icon: <FaAndroid />, label: 'Android' },
      { icon: <FaApple />, label: 'iOS' },
    ],
    technologies: [
      { icon: FFIcon, label: 'FlutterFlow' },
      { icon: SBIcon, label: 'Supabase' },
    ],
    videoUrl:
      'https://firebasestorage.googleapis.com/v0/b/meteora-experience.firebasestorage.app/o/videos%2FFinanceFlow.mp4?alt=media&token=53fdcc41-42fb-42ba-97fe-c1f597ad69a5',
  },
  {
    id: 3,
    title: 'OverSafe',
    image: AppOver,
    badge: 'meteora',
    badgeLabel: 'Meteora',
    description: 'Aplicativo de Lock check para controle de status de box de self-storage.',
    compatibility: [
      { icon: <FaMobileAlt />, label: 'Mobile' },
      { icon: <FaAndroid />, label: 'Android' },
      { icon: <FaApple />, label: 'iOS' },
    ],
    technologies: [
      { icon: FFIcon, label: 'FlutterFlow' },
      { icon: SBIcon, label: 'Supabase' },
    ],
    videoUrl:
      'https://firebasestorage.googleapis.com/v0/b/meteora-experience.firebasestorage.app/o/videos%2FOverSafe.mp4?alt=media&token=bb9fb175-9e17-4dfa-bf47-2f00c7229cd1',
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const selected = projectList.find((p) => p.id === selectedProject);
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

  const comuniverso = projectList.find((p) => p.id === 4)!;
  const regularProjects = projectList.filter((p) => p.id !== 4);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#1d2428] text-white px-6 py-24 md:px-12 lg:px-24 border-t border-white/[0.05] overflow-hidden"
    >
      <style jsx global>{`
        .swiper-button-next::after,
        .swiper-button-prev::after { color: #22d3ee; font-size: 1.8rem; }
        .swiper-button-prev { left: 0.5rem; top: 45%; transform: translateY(-50%); }
        .swiper-button-next { right: 0.5rem; top: 45%; transform: translateY(-50%); }
        @media (max-width: 767px) {
          .swiper-button-next, .swiper-button-prev { display: none; }
        }
        .swiper { padding-bottom: 3.5rem; padding-left: 1rem !important; padding-right: 1rem !important; }
        .swiper-wrapper { overflow: visible !important; }
        .swiper-slide { overflow: visible !important; z-index: 1; }
        .swiper-slide .card-project { transition: transform 0.3s ease, box-shadow 0.3s ease; will-change: transform; }
        .swiper-slide .card-project:hover { transform: translateY(-6px); z-index: 10;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,188,212,0.12); }
        .swiper-pagination-bullet { background: #6b7280; opacity: 1; }
        .swiper-pagination-bullet-active { background: #22d3ee; }
      `}</style>

      <SpaceBackground variant="circuit" opacity={0.5} />
      {/* Header */}
      <div
        data-reveal
        className="mb-14 transition-all duration-700"
        style={{ opacity: 0, transform: 'translateY(30px)' }}
      >
        <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-cyan-400 mb-3">
          Trabalhos recentes
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Projetos</h2>
        <p className="text-gray-400 max-w-xl text-base font-light leading-relaxed">
          Confira algumas soluções digitais desenvolvidas com foco em performance, design e inovação.
        </p>
      </div>

      {/* Comuniverso — Featured Card */}
      <div
        data-reveal
        className="mb-8 transition-all duration-700"
        style={{ opacity: 0, transform: 'translateY(30px)', transitionDelay: '0.1s' }}
      >
        <div
          className="group bg-[#1a2030] border border-white/[0.07] rounded-2xl overflow-hidden cursor-pointer hover:border-cyan-400/25 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,188,212,0.1)] grid grid-cols-1 md:grid-cols-2"
          onClick={() => setSelectedProject(comuniverso.id)}
        >
          {/* Visual side */}
          <div className="relative bg-[#111827] flex items-center justify-center min-h-[200px] overflow-hidden">
            <div className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at center, rgba(0,188,212,0.06) 0%, transparent 70%)' }} />
            <div className="text-center z-10 p-8">
              <div className="text-5xl mb-3 opacity-20">🌌</div>
              <p className="font-bold text-lg tracking-widest text-cyan-400/40 uppercase">Comuniverso</p>
            </div>
            {/* Badge */}
            <span className="absolute top-4 right-4 text-[0.65rem] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
              Founding Team
            </span>
          </div>

          {/* Content side */}
          <div className="p-8 flex flex-col justify-center">
            <p className="text-[0.7rem] tracking-widest uppercase text-cyan-400/70 font-semibold mb-2">
              {comuniverso.role}
            </p>
            <h3 className="text-xl font-bold mb-3">{comuniverso.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{comuniverso.description}</p>
            <div className="flex flex-wrap gap-2">
              {['Supabase', 'PostgreSQL', 'Backend', 'RLS', 'APIs', 'Founding Team'].map((tag) => (
                <span key={tag} className="text-[0.7rem] px-2.5 py-1 rounded-md bg-[#243042] text-gray-400 border border-white/[0.06]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              {comuniverso.technologies.map((t, i) => (
                <Image key={i} src={t.icon} alt={t.label} width={20} height={20} className="opacity-70 hover:opacity-100 transition" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Regular projects swiper */}
      <div
        data-reveal
        className="transition-all duration-700"
        style={{ opacity: 0, transform: 'translateY(30px)', transitionDelay: '0.2s' }}
      >
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="project-swiper"
        >
          {regularProjects.map((project) => (
            <SwiperSlide key={project.id}>
              <div
                className="bg-[#1e2a3a] border border-white/[0.06] rounded-2xl p-6 cursor-pointer card-project"
                onClick={() => setSelectedProject(project.id)}
              >
                {/* Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[0.65rem] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-cyan-400/[0.08] text-cyan-400 border border-cyan-400/20">
                    Meteora
                  </span>
                </div>

                <div className="h-52 flex items-center justify-center mb-5 overflow-hidden rounded-lg bg-[#151e2d]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-base font-semibold mb-2">{project.title}</h3>
                <hr className="border-cyan-400/30 mb-4" />

                <div className="flex flex-wrap gap-1.5 mt-2 items-center mb-2">
                  <p className="text-xs text-gray-500 mr-1">Compatível:</p>
                  {project.compatibility.map((item, i) => (
                    <span key={i} className="text-sm text-cyan-400">{item.icon}</span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-1 items-center">
                  <p className="text-xs text-gray-500 mr-1">Tecnologias:</p>
                  {project.technologies.map((tech, i) => (
                    <Image key={i} src={tech.icon} alt={tech.label} width={18} height={18} className="opacity-75" />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}

          <SwiperSlide>
            <div className="bg-[#1e2a3a] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-center items-center text-center h-full min-h-[320px]">
              <div className="h-52 flex items-center justify-center mb-5">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-cyan-400/40 flex items-center justify-center">
                  <span className="text-cyan-400/60 text-2xl font-bold">···</span>
                </div>
              </div>
              <h3 className="text-sm font-semibold mb-2 text-gray-500">Mais projetos em breve</h3>
              <p className="text-xs text-gray-600">Novas soluções digitais estão em desenvolvimento.</p>
            </div>
          </SwiperSlide>
        </Swiper>
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

      {selected && (
        <ProjectDetails project={selected} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}