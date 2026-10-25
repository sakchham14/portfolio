import React from "react"
import { ABOUT_CONTENT } from "@/data/content"
import { Terminal, ArrowRight, ShieldCheck, Cpu, Cloud, Code2 } from "lucide-react"

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden grid-bg">
      {/* Radial glow orbs */}
      <div className="glow-orb top-1/4 left-1/4 w-[32rem] h-[32rem] bg-cyan-500/20 blur-[140px]" />
      <div className="glow-orb bottom-1/4 right-1/4 w-[36rem] h-[36rem] bg-purple-500/20 blur-[160px]" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-cyan-500/30 text-xs sm:text-sm font-mono text-cyan-300 mb-8 shadow-[0_0_25px_rgba(56,189,248,0.15)]">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_10px_#34d399]" />
          <span>CSIT Student & Systems Engineer • Open for Opportunities</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">Cloud Infrastructure</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">Full-Stack Systems</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl text-lg sm:text-xl text-slate-300 mb-12 leading-relaxed font-sans">
          {ABOUT_CONTENT.subtitle}. Passionate about Linux administration, Docker containerization, network automation, and dynamic web applications.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-16">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] hover:scale-[1.02] transition-all"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass glass-hover text-slate-200 font-semibold transition-all"
          >
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Tech Stack Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl">
          <div className="glass glass-hover p-5 rounded-2xl flex items-center gap-4 text-left">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Full-Stack</div>
              <div className="text-xs text-slate-400">React & Next.js</div>
            </div>
          </div>

          <div className="glass glass-hover p-5 rounded-2xl flex items-center gap-4 text-left">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Systems</div>
              <div className="text-xs text-slate-400">Linux & Docker</div>
            </div>
          </div>

          <div className="glass glass-hover p-5 rounded-2xl flex items-center gap-4 text-left">
            <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-[0_0_15px_rgba(244,114,182,0.15)]">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Automation</div>
              <div className="text-xs text-slate-400">Ansible & Bash</div>
            </div>
          </div>

          <div className="glass glass-hover p-5 rounded-2xl flex items-center gap-4 text-left">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.15)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Networks</div>
              <div className="text-xs text-slate-400">Netmiko & Python</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
