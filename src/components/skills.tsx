"use client";

import { useState } from "react"
import { SKILLS_DATA, SkillCategory } from "@/data/content"
import { Terminal, Code, Zap } from "lucide-react"

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("full-stack")

  const categories: { id: SkillCategory; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: "full-stack", label: "Full-Stack Development", icon: <Code className="h-4 w-4" />, desc: "Modern web apps with React, Next.js, and Node.js" },
    { id: "system-admin", label: "System Administration", icon: <Terminal className="h-4 w-4" />, desc: "Linux servers, Docker containers, and NGINX" },
    { id: "automation", label: "Infrastructure & Automation", icon: <Zap className="h-4 w-4" />, desc: "Ansible, CI/CD pipelines, and network automation" },
  ]

  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-mono text-cyan-400 mb-3 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">Technical Expertise</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Skills & Core Competencies</h3>
          <p className="text-slate-400 text-base">
            Combining rigorous computer science fundamentals with practical system engineering and full-stack development experience.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-medium text-sm transition-all duration-300 border backdrop-blur-xl ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-cyan-500/25 to-purple-500/25 border-cyan-500/60 text-white shadow-[0_0_30px_rgba(56,189,248,0.25)]"
                  : "glass glass-hover border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS_DATA[activeCategory].map((skill) => (
            <div
              key={skill.name}
              className="glass glass-hover p-7 rounded-3xl border border-white/10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-white text-lg group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 w-4 rounded-full transition-all duration-300 ${
                          i < skill.level ? "bg-cyan-400 shadow-[0_0_10px_#38bdf8]" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
