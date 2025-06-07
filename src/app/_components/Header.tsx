'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import MeteoraLogo from '../../../public/images/MeteoraLogo.png';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#14181B] text-white py-4 px-6 md:px-12 lg:px-24 flex items-center justify-between shadow-lg">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src={MeteoraLogo}
          alt="Meteora Experience Logo"
          width={180}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Navegação para Desktop */}
      <nav className="hidden md:flex items-center space-x-8">
        {/* Adicionado onClick para fechar o menu mobile, caso ele esteja visível (mesmo no desktop, por segurança) */}
        <Link href="#services" className="text-gray-300 hover:text-white transition" onClick={() => setIsOpen(false)}>
          Serviços
        </Link>
        <Link href="#projects" className="text-gray-300 hover:text-white transition" onClick={() => setIsOpen(false)}>
          Projetos
        </Link>
        <Link href="#about" className="text-gray-300 hover:text-white transition" onClick={() => setIsOpen(false)}>
          Sobre
        </Link>
        <Link
          href="#contact"
          className="border-2 border-cyan-400 text-cyan-400 px-6 py-2 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-300"
          onClick={() => setIsOpen(false)}
        >
          Orçamento
        </Link>
      </nav>

      {/* Botão para Mobile (Exemplo de Hamburger) */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu Mobile (Descomente e use se precisar de um menu hamburguer) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1d2428] shadow-md flex flex-col items-center py-4 space-y-4">
          <Link href="#services" className="text-gray-300 hover:text-white transition" onClick={() => setIsOpen(false)}>
            Serviços
          </Link>
          <Link href="#projects" className="text-gray-300 hover:text-white transition" onClick={() => setIsOpen(false)}>
            Projetos
          </Link>
          <Link href="#about" className="text-gray-300 hover:text-white transition" onClick={() => setIsOpen(false)}>
            Sobre
          </Link>
          <Link
            href="#contact"
            className="border-2 border-cyan-400 text-cyan-400 px-6 py-2 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Orçamento
          </Link>
        </div>
      )}
    </header>
  );
}