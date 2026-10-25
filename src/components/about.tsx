import React from "react"
import { ABOUT_CONTENT } from "@/data/content"
import { GraduationCap, MapPin, Server, Shield, Cpu, CheckCircle2 } from "lucide-react"

export const About = () => {
  return (
    <section id="about" className="py-28 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-xs uppercase tracking-widest font-mono text-cyan-400 mb-3 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">Background & Philosophy</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Engineering robust systems & seamless web experiences
            </h3>
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              {ABOUT_CONTENT.description}
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 drop-shadow-[0_0_8px_#38bdf8]" />
                <span>BSc CSIT (Computer Science & Information Technology) student in Kathmandu.</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 className="h-5 w-5 text-purple-400 shrink-0 drop-shadow-[0_0_8px_#a855f7]" />
                <span>Hands-on self-hosted server administration, Docker containerization & NGINX reverse proxies.</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 className="h-5 w-5 text-pink-400 shrink-0 drop-shadow-[0_0_8px_#f472b6]" />
                <span>Automating network infrastructure & device management using Python, Netmiko, and Ansible.</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>{ABOUT_CONTENT.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-purple-400" />
                <span>CSIT Scholar</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="glass glass-hover p-6 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <Server className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono drop-shadow-[0_0_10px_#38bdf8]">100%</div>
                <div className="text-xs text-slate-400">Self-Hosted Lab Uptime</div>
              </div>
            </div>

            <div className="glass glass-hover p-6 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono drop-shadow-[0_0_10px_#a855f7]">4+</div>
                <div className="text-xs text-slate-400">Core Network & Web Projects</div>
              </div>
            </div>

            <div className="glass glass-hover p-6 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-[0_0_15px_rgba(244,114,182,0.2)]">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono drop-shadow-[0_0_10px_#f472b6]">Linux & Docker</div>
                <div className="text-xs text-slate-400">Primary Infrastructure Stack</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
