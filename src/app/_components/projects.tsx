'use client';

import Image, { StaticImageData } from 'next/image';
import { JSX, useState } from 'react';
import {
  FaMobileAlt,
  FaAndroid,
  FaApple,
  FaServer,
  FaLaptop,
  FaWhatsapp
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

export type Project = {
  id: number;
  title: string;
  image: StaticImageData;
  description: string;
  compatibility: { icon: JSX.Element; label: string }[];
  technologies: { icon: StaticImageData; label: string }[];
  videoUrl?: string;
};

const projectList: Project[] = [
  {
    id: 1,
    title: 'SuperHero',
    image: SuperHero,
    description:
      'Detalhes: Esse Aplicativo foi desenvolvido para colocar em prática o consumo de API. Ele consiste em conectar fãs de super-heróis aos principais detalhes dos seus heróis favoritos.',
    compatibility: [
      { icon: <FaMobileAlt />, label: 'Mobile' },
      { icon: <FaAndroid />, label: 'Android' },
      { icon: <FaApple />, label: 'iOS' },
      { icon: <FaServer />, label: 'API' }
    ],
    technologies: [{ icon: FFIcon, label: 'FlutterFlow' }],
    videoUrl:
      'https://firebasestorage.googleapis.com/v0/b/meteora-experience.firebasestorage.app/o/videos%2FSuperhero.mp4?alt=media&token=0066e1e5-6123-43dd-82eb-ce753761fef5'
  },
  {
    id: 2,
    title: 'Finance Flow',
    image: AppFinanca,
    description: 'Detalhes: Esse Aplicativo é um Sistema de controle financeiro pessoal.',
    compatibility: [
      { icon: <FaMobileAlt />, label: 'Mobile' },
      { icon: <FaLaptop />, label: 'Web' },
      { icon: <FaAndroid />, label: 'Android' },
      { icon: <FaApple />, label: 'iOS' }
    ],
    technologies: [
      { icon: FFIcon, label: 'FlutterFlow' },
      { icon: SBIcon, label: 'Supabase' }
    ],
    videoUrl:
      'https://firebasestorage.googleapis.com/v0/b/meteora-experience.firebasestorage.app/o/videos%2FFinanceFlow.mp4?alt=media&token=53fdcc41-42fb-42ba-97fe-c1f597ad69a5'
  },
  {
    id: 3,
    title: 'OverSafe',
    image: AppOver,
    description: 'Detalhes: Aplicativo de Lock check para controle de status de box de self-storage.',
    compatibility: [
      { icon: <FaMobileAlt />, label: 'Mobile' },
      { icon: <FaAndroid />, label: 'Android' },
      { icon: <FaApple />, label: 'iOS' }
    ],
    technologies: [
      { icon: FFIcon, label: 'FlutterFlow' },
      { icon: SBIcon, label: 'Supabase' }
    ],
    videoUrl:
      'https://firebasestorage.googleapis.com/v0/b/meteora-experience.firebasestorage.app/o/videos%2FOverSafe.mp4?alt=media&token=bb9fb175-9e17-4dfa-bf47-2f00c7229cd1'
  }
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const selected = projectList.find((p) => p.id === selectedProject);

  return (
    <section className="relative bg-[#1d2428] text-white px-6 py-20 md:px-12 lg:px-24">
      <style jsx global>{`
        .swiper-button-next::after,
        .swiper-button-prev::after {
          color: #22d3ee;
          font-size: 2.5rem;
        }

        .swiper-button-next,
        .swiper-button-prev {
          top: 45%;
        }

        .swiper {
          overflow: visible !important;
          padding-bottom: 4rem;
        }

        .swiper-wrapper {
          overflow: visible !important;
        }

        .swiper-slide {
          overflow: visible !important;
          z-index: 1;
        }

        .swiper-slide .card-project {
          transition: transform 0.3s ease;
          will-change: transform;
        }

        .swiper-slide .card-project:hover {
          transform: scale(1.03);
          z-index: 10;
        }

        body {
          overflow-x: hidden;
        }
      `}</style>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-3xl font-bold mb-4">Projetos</h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Confira algumas soluções digitais desenvolvidas com foco em performance, design e inovação.
        </p>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }
        }}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="project-swiper"
      >
        {projectList.map((project) => (
          <SwiperSlide key={project.id}>
            <div
              className="bg-[#2a2f33] rounded-2xl p-6 shadow-md cursor-pointer hover:scale-105 transition will-change-transform card-project"
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="h-60 flex items-center justify-center mb-6 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <hr className="border-cyan-400 mb-4" />

              <div className="flex flex-wrap gap-2 mt-2 items-center">
                <p className="text-sm text-gray-300">Compatível:</p>
                {project.compatibility.map((item, i) => (
                  <div key={i} className="flex items-center gap-1 text-sm text-gray-400">
                    <span className="text-base text-cyan-400">{item.icon}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-2 items-center">
                <p className="text-sm text-gray-300">Tecnologias:</p>
                {project.technologies.map((tech, i) => (
                  <div key={i} className="flex items-center gap-1 text-sm text-gray-400">
                    <Image src={tech.icon} alt={tech.label} width={20} height={20} />
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}

        <SwiperSlide>
          <div className="bg-[#2a2f33] rounded-2xl p-6 shadow-md flex flex-col justify-center items-center text-center">
            <div className="h-60 flex items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-cyan-400 flex items-center justify-center">
                <span className="text-cyan-400 text-3xl font-bold">...</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-400">Mais projetos em breve</h3>
            <p className="text-sm text-gray-500">Novas soluções digitais estão em desenvolvimento.</p>
          </div>
        </SwiperSlide>
      </Swiper>

      <a
        href="https://wa.me/5511968272462?text=Olá,%20gostaria%20de%20falar%20com%20você!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition duration-300"
      >
        <FaWhatsapp size={24} />
      </a>

      {selected && (
        <ProjectDetails
          project={selected}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
