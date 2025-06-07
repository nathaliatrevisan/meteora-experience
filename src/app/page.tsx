// src/app/page.tsx
import { Hero } from "./_components/hero";
import { Services } from "./_components/services";
import { Projects } from "./_components/projects";
import { About } from "./_components/about";
import { Contato } from "./_components/contato";

export default function Home() {
  return(
    <main>
      {/* Seção Hero - Corresponde a href="#hero" se você quiser um link para ela */}
      <section id="hero">
        <Hero/>
      </section>

      {/* Seção Services - Corresponde a href="#services" */}
      <section id="services">
        <Services/>
      </section>

      {/* Seção Projects - Corresponde a href="#projects" */}
      <section id="projects">
        <Projects/>
      </section>

      {/* Seção About - Corresponde a href="#about" */}
      <section id="about">
        <About/>
      </section>

      {/* Seção Contato - Corresponde a href="#contact" */}
      <section id="contact">
        <Contato/>
      </section>
    </main>
  )
}