'use client';
import Image from 'next/image';
import { FaMobileAlt, FaAndroid, FaApple, FaServer, FaLaptop } from 'react-icons/fa';
import SuperHero from '../../../public/images/SuperHero_Principal.png';
import AppFinanca from '../../../public/images/ui.png';
import FFIcon from '../../../public/images/flutterflow_icon.png';
import SBIcon from '../../../public/images/supabase_icon.png';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export function Projects() {
  return (
    <section className="bg-[#1d2428] text-white px-6 py-20 md:px-12 lg:px-24 overflow-x-hidden">
      <style jsx global>{`
        body, html {
          overflow-x: hidden;
        }
        /* Personaliza os botões do swiper */
        .swiper-button-next::after,
        .swiper-button-prev::after {
          color: #22d3ee;
          font-size: 2.5rem;
        }
        .swiper-button-next,
        .swiper-button-prev {
          top: 45%;
        }

        /* Faz o container do swiper permitir overflow para o crescimento */
        .project-swiper {
          overflow: visible !important;
          padding-bottom: 2rem;
        }

        /* Remove overflow hidden do wrapper dos slides */
        .swiper-wrapper {
          overflow: visible !important;
        }

        /* Permite o crescimento do slide e centraliza o hover */
        .swiper-slide {
          overflow: visible !important;
          transition: transform 0.3s ease;
          will-change: transform;
          /* margens para evitar corte ao crescer */
          margin-left: 10px;
          margin-right: 10px;
          position: relative;
          z-index: 0;
        }

        /* Quando hover no slide, aumenta, traz para frente e aumenta z-index */
        .swiper-slide:hover {
          transform: scale(1.05);
          z-index: 10;
        }
      `}</style>

      {/* Cabeçalho */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meus Projetos</h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Confira algumas soluções digitais desenvolvidas com foco em performance, design e inovação.
        </p>
      </div>

      {/* Carrossel dos Projetos */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="project-swiper"
      >
        {/* Projeto 1 */}
        <SwiperSlide>
          <div className="bg-[#2a2f33] rounded-2xl p-6 shadow-md will-change-transform">
            <div className="h-60 flex items-center justify-center mb-6">
              <Image src={SuperHero} alt="SuperHero" width={200} height={200} className="object-contain max-w-full h-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">SuperHero</h3>
            <hr className="border-cyan-400 mb-4" />
            <div className="flex items-center gap-2 text-white mt-2">
              <p className="text-sm text-gray-300">Compatível:</p>
              <FaMobileAlt /> <FaAndroid /> <FaApple /> <FaServer />
            </div>
            <div className="flex items-center gap-2 text-white mt-2">
              <p className="text-sm text-gray-300">Tecnologias:</p>
              <Image src={FFIcon} alt="" width={25} height={25} className="object-contain" />
            </div>
          </div>
        </SwiperSlide>

        {/* Projeto 2 */}
        <SwiperSlide>
          <div className="bg-[#2a2f33] rounded-2xl p-6 shadow-md will-change-transform">
            <div className="h-60 flex items-center justify-center mb-6">
              <Image src={AppFinanca} alt="Finance Flow" width={200} height={200} className="object-contain max-w-full h-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Finance Flow</h3>
            <hr className="border-cyan-400 mb-4" />
            <div className="flex items-center gap-2 text-white mt-2">
              <p className="text-sm text-gray-300">Compatível:</p>
              <FaMobileAlt /> <FaLaptop /> <FaAndroid /> <FaApple />
            </div>
            <div className="flex items-center gap-2 text-white mt-2">
              <p className="text-sm text-gray-300">Tecnologias:</p>
              <Image src={FFIcon} alt="" width={25} height={25} className="object-contain" />
              <Image src={SBIcon} alt="" width={17} height={17} className="object-contain" />
            </div>
          </div>
        </SwiperSlide>

        {/* Projeto 3 */}
        <SwiperSlide>
          <div className="bg-[#2a2f33] rounded-2xl p-6 shadow-md will-change-transform">
            <div className="h-60 flex items-center justify-center mb-6">
              <Image src={AppFinanca} alt="OverSafe" width={200} height={200} className="object-contain max-w-full h-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">OverSafe</h3>
            <hr className="border-cyan-400 mb-4" />
            <div className="flex items-center gap-2 text-white mt-2">
              <p className="text-sm text-gray-300">Compatível:</p>
              <FaMobileAlt /> <FaAndroid /> <FaApple />
            </div>
            <div className="flex items-center gap-2 text-white mt-2">
              <p className="text-sm text-gray-300">Tecnologias:</p>
              <Image src={FFIcon} alt="" width={25} height={25} className="object-contain" />
              <Image src={SBIcon} alt="" width={17} height={17} className="object-contain" />
            </div>
          </div>
        </SwiperSlide>

        {/* Placeholder */}
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
    </section>
  );
}
