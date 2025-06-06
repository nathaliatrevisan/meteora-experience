'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import FotoPrincipal from '../../../public/images/background.png';
import Image from 'next/image';

export function Contato() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        'service_om2dwda',
        'template_0aq10ps',
        form.current,
        'DEnt1j0z_hzoXI0jm'
      )
      .then(
        () => {
          setStatus('success');
          form.current?.reset();
        },
        () => {
          setStatus('error');
        }
      );
  };

  return (
    <section
      className="bg-cover bg-center text-white py-20 px-6 md:px-12 lg:px-24"
      style={{
        backgroundImage: `url(${FotoPrincipal.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="bg-black/60 p-10 rounded-xl max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start justify-between">
        {/* Texto à esquerda */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Entre em Contato</h2>
          <p className="text-gray-300 text-base">Entre em contato e dê seu primeiro passo</p>
        </div>

        {/* Formulário */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Nome</label>
            <input name="user_name" placeholder="Digite seu nome" className="bg-gray-200 text-black rounded-md p-3" required />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">E-mail</label>
            <input name="user_email" type="email" placeholder="Digite seu e-mail" className="bg-gray-200 text-black rounded-md p-3" required />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Nome da Empresa</label>
            <input name="empresa" placeholder="Digite o nome da empresa" className="bg-gray-200 text-black rounded-md p-3" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Telefone</label>
            <input name="telefone" placeholder="Digite seu telefone" className="bg-gray-200 text-black rounded-md p-3" />
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col">
            <label className="mb-1 text-sm">Mensagem</label>
            <textarea name="message" rows={5} placeholder="Digite sua mensagem" className="bg-gray-200 text-black rounded-md p-3 resize-none"></textarea>
          </div>

          {/* Botão de envio */}
          <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-[#29F8FF] px-5 py-2 rounded-md font-semibold flex items-center justify-center w-fit mb-4"
            >
              Enviar
            </button>
          </div>

          {/* Status */}
          {status === 'success' && (
            <p className="text-green-400 col-span-2 mt-2">Mensagem enviada com sucesso!</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 col-span-2 mt-2">Erro ao enviar. Tente novamente.</p>
          )}
        </form>
      </div>
    </section>
  );
}
