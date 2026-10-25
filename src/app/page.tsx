import { FloatingNav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070b18] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      <FloatingNav />
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Footer />
    </main>
  )
}
