import React from "react"
import { ABOUT_CONTENT } from "@/data/content"
import { Mail, Terminal, ArrowUpRight } from "lucide-react"

export const Footer = () => {
  return (
    <footer id="contact" className="py-24 px-6 border-t border-white/10 relative bg-[#030712]/90 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto">
        <div className="glass p-12 rounded-3xl border border-white/15 text-center relative overflow-hidden mb-16 shadow-[0_0_50px_rgba(56,189,248,0.15)]">
          <div className="glow-orb top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 blur-[120px]" />
          
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Let's Build Something Amazing Together
          </h3>
          <p className="max-w-xl mx-auto text-slate-300 text-base mb-8 relative z-10">
            Whether you have an infrastructure challenge, a full-stack project, or want to talk about networking and DevOps—my inbox is always open.
          </p>
          <a
            href={`mailto:${ABOUT_CONTENT.email}`}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] hover:scale-[1.02] transition-all relative z-10"
          >
            <Mail className="h-4 w-4" />
            <span>sakchham@example.com</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2 font-mono text-cyan-400">
            <Terminal className="h-4 w-4" />
            <span>Sakchham Maharjan • CSIT Student & Systems Engineer</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={ABOUT_CONTENT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={ABOUT_CONTENT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${ABOUT_CONTENT.email}`}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
