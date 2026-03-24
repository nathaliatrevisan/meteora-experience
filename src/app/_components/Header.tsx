'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import MeteoraLogo from '../../../public/images/MeteoraLogo.png';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Serviços' },
    { href: '#projects', label: 'Projetos' },
    { href: '#about', label: 'Sobre' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 text-white flex items-center justify-between transition-all duration-300
        ${scrolled
          ? 'py-3 px-6 md:px-12 lg:px-24 bg-[#151e2d]/95 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'py-5 px-6 md:px-12 lg:px-24 bg-[#151e2d]/70 backdrop-blur-md'
        }
        border-b border-white/[0.06]`}
    >
      {/* Logo */}
      <Link href="#hero" className="flex items-center" onClick={() => setIsOpen(false)}>
        <Image
          src={MeteoraLogo}
          alt="Meteora Experience Logo"
          width={160}
          height={36}
          className="object-contain"
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="relative text-sm font-medium tracking-widest uppercase text-gray-400 hover:text-white transition-colors duration-200 group"
          >
            {label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
        <Link
          href="#contact"
          className="border border-cyan-400/60 text-cyan-400 text-sm font-medium px-5 py-2 rounded-lg bg-cyan-400/[0.06] hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,188,212,0.2)] tracking-wide"
        >
          Orçamento
        </Link>
      </nav>

      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white text-xl p-1"
        aria-label="Menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1a2438]/98 backdrop-blur-xl border-b border-white/[0.06] flex flex-col items-center py-6 space-y-5 shadow-xl">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium tracking-widest uppercase text-gray-400 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="border border-cyan-400/60 text-cyan-400 text-sm font-medium px-6 py-2 rounded-lg bg-cyan-400/[0.06] hover:bg-cyan-400/20 transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Orçamento
          </Link>
        </div>
      )}
    </header>
  );
}