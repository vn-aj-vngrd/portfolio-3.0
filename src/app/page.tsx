import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Engineering } from "@/components/sections/Engineering";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <SelectedWork />
      <Engineering />
      <Experience />
      <Certifications />
      <About />
      <Contact />
    </main>
  );
}
