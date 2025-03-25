import { FaWhatsapp } from 'react-icons/fa';
import FotoPrincipal from '../../../public/images/astro_hero.png';
import Image from 'next/image'

export function Hero() {
    return (
        <section className="bg-[#1D2428] text-white relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background.png')" }} 
        >
            <div>
                <Image 
                src={FotoPrincipal}
                alt='Minha Foto'
                fill
                sizes="100vw"
                priority
                className="object-cover opacity-65 lg:hidden"
                />

                <div className="absolute inset-0 bg-black opacity-45 md:hidden"></div>
            </div>

            <div className="container mx-auto pt-16 pb-16 md:pb-0 px-4 relative">

                <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-4xl font-bold leading-10">
                            Transformando ideias em experiências digitais extraordinárias.
                        </h1>

                        <p className="lg:text-lg">
                            MVP's personalizados sob demanda e designs inovadores de UI/UX.
                        </p>

                        <a 
                            href="#"
                            className="bg-[#29F8FF] px-5 py-2 rounded-md font-semibold flex items-center
                            justify-center w-fit mb-4"
                        >
                            Orçamento
                        </a>
                    </div>

                    <div className="hidden md:flex items-center justify-center relative max-w-md h-[300px]">
                        <Image
                            src={FotoPrincipal}
                            alt='Foto do cachorro'
                            fill
                            quality={100}
                            priority
                            className="object-contain"
                        />
                    </div>

                </article>

            </div>
        </section>
    );
}
