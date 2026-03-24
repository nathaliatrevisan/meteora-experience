'use client';

import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { SpaceBackground } from './SpaceBackground';

export function Contato() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);
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

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    emailjs
      .sendForm('service_om2dwda', 'template_0aq10ps', form.current, 'DEnt1j0z_hzoXI0jm')
      .then(() => { setStatus('success'); form.current?.reset(); },
            () => { setStatus('error'); });
  };

  const inputClass = `w-full bg-[#151e2d] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white
    placeholder-gray-600 outline-none transition-all duration-200
    focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(0,188,212,0.08)]`;

  const labelClass = 'block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2';

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#1d2428] text-white py-24 px-6 md:px-12 lg:px-24 border-t border-white/[0.05] overflow-hidden"
    >
      <SpaceBackground variant="dna" opacity={0.45} />
      <div
        data-reveal
        className="max-w-5xl mx-auto transition-all duration-700"
        style={{ opacity: 0, transform: 'translateY(30px)' }}
      >
        <div className="bg-[#1a2030] border border-white/[0.07] rounded-2xl p-8 md:p-12 relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Glow */}
          <div className="absolute -top-1/3 -left-1/4 w-1/2 h-4/5 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0,188,212,0.06) 0%, transparent 70%)' }} />

          {/* Left */}
          <div className="space-y-6 relative z-10">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-cyan-400 mb-3">
                Vamos trabalhar juntos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                Tem um projeto<br />em mente?
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Conte sua ideia — seja um MVP, uma interface ou uma solução backend.
              Vamos transformar isso em realidade.
            </p>
            <div className="space-y-3 pt-2">
              <a
                href="mailto:contato@meteoraexperience.tech"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                contato@meteoraexperience.tech
              </a>
              <a
                href="https://www.linkedin.com/in/nathalia-trevisan-074a9714b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn · Nathalia Trevisan
              </a>
            </div>
          </div>

          {/* Form */}
          <form ref={form} onSubmit={sendEmail} className="space-y-4 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nome</label>
                <input name="user_name" placeholder="Seu nome" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>E-mail</label>
                <input name="user_email" type="email" placeholder="seu@email.com" className={inputClass} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Empresa</label>
                <input name="empresa" placeholder="Nome da empresa" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Telefone</label>
                <input name="telefone" placeholder="(11) 99999-9999" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Mensagem</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Conte sobre seu projeto..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                {status === 'success' && (
                  <p className="text-green-400 text-sm">✓ Mensagem enviada com sucesso!</p>
                )}
                {status === 'error' && (
                  <p className="text-red-400 text-sm">✗ Erro ao enviar. Tente novamente.</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-cyan-400 hover:bg-cyan-300 text-[#151e2d] px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,188,212,0.35)] flex items-center gap-2"
              >
                Enviar mensagem
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}