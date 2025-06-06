import Image from 'next/image';
import nathalia from '../../../public/images/nathalia.png';

export function About() {
  return (
    <section className="bg-[#14181B] text-white py-20 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      <div className="relative w-full max-w-5xl text-center">
        <h2 className="text-3xl md:text-3xl font-bold mt-4">Sobre</h2>
      </div>

      <div className="mt-12 flex flex-col lg:flex-row items-center gap-10 max-w-5xl w-full">
        {/* Foto */}
        <div className="flex-shrink-0">
          <div className="rounded-full overflow-hidden w-48 h-48 md:w-60 md:h-60 bg-white flex items-center justify-center">
            <Image
              src={nathalia}
              alt="Foto da Nathalia"
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Texto */}
        <div className="text-left max-w-2xl">
          <h3 className="text-2xl font-semibold mb-4">Oi, eu sou a Nathalia!</h3>
          <p className="text-sm md:text-base leading-relaxed text-gray-300 mb-4">
            Sou fundadora da Meteora Experience, uma startup focada em transformar ideias em produtos digitais únicos e memoráveis.
            Com formação em Automação Industrial, pós-graduação em Design de Produtos Digitais e Desenvolvimento Front-End,
            encontrei minha verdadeira paixão no universo de UI/UX e no desenvolvimento low-code.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-gray-300 mb-4">
            A Meteora Experience nasceu do meu desejo de simplificar o processo de criação de produtos digitais,
            oferecendo MVPs personalizados e experiências intuitivas para usuários. Cada projeto é uma oportunidade de trazer inovação,
            criatividade e resultados rápidos para startups e empresas que querem se destacar no mercado.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-gray-300 mb-6">
            Nossa missão é ajudar você a tirar suas ideias do papel, seja com um design envolvente, uma interface funcional
            ou um protótipo que surpreenda. Vamos juntos criar experiências que marquem a diferença no mundo digital? 🚀
          </p>

          {/* Botão LinkedIn */}
          <a
            href="https://www.linkedin.com/in/nathalia-trevisan-074a9714b"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#29F8FF] px-5 py-2 rounded-md font-semibold flex items-center justify-center w-fit mb-4"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
