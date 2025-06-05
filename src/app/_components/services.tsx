import Image from 'next/image';
import MVPImage from '../../../public/images/mvp.png';
import UIImage from '../../../public/images/UX.jpg';
import Supabase from '../../../public/images/supabase.png';
import FigmaLogo from '../../../public/images/figma_flutterflow.png';

const services = [
  {
    title: 'Criação de MVPs sob demanda',
    description:
      'Transformação de ideias em protótipos funcionais e testáveis, com agilidade.',
    image: MVPImage,
  },
  {
    title: 'Design de interfaces (UI)',
    description:
      'Criação de visuais modernos e impactantes para sua aplicação ou site.',
    image: UIImage,
  },
  {
    title: 'Desenvolvimento low-code',
    description:
      'Desenvolvimento de soluções tecnológicas sem linhas de código.',
    image: FigmaLogo,
  },
  {
    title: 'Modelagem Banco de Dados',
    description:
      'Modelagem de Banco de Dados relacionais e não relacionais.',
    image: Supabase,
  },
];

export function Services() {
  return (
    <section className="bg-[#14181B] text-white py-20 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Serviços</h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Soluções rápidas, inovadoras e personalizadas para transformar suas ideias em realidade.
        </p>
      </div>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#1E2429] p-6 rounded-2xl text-center shadow-lg hover:scale-[1.03] transition-transform duration-300"
          >
            <div className="mb-4 h-[100px] w-[100px] mx-auto relative">
              <Image
                src={service.image}
                alt={service.title}
                width={100}
                height={100}
                className="mx-auto rounded-xl"
              />
            </div>
            <h3 className="text-cyan-400 font-semibold text-lg mb-2">{service.title}</h3>
            <p className="text-gray-300 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
