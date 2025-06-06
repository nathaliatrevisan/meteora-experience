import { Hero } from "./_components/hero";
import { Services } from "./_components/services";
import { Projects } from "./_components/projects";
import { About } from "./_components/about";
import { Contato } from "./_components/contato";

export default function Home() {
  return(
    <main>
      <Hero/>
      <Services/>
      <Projects/>
      <About/>
      <Contato/>
    </main>
  )
}