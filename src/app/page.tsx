import { Hero } from "./_components/hero";
import { Services } from "./_components/services";
import { Projects } from "./_components/projects";

export default function Home() {
  return(
    <main>
      <Hero/>
      <Services/>
      <Projects/>
    </main>
  )
}