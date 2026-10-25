import React from "react"
import { PROJECTS_DATA } from "@/data/content"
import { ExternalLink, Terminal, Code2 } from "lucide-react"

export const Projects = () => {
  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-mono text-cyan-400 mb-3 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">Featured Work</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Case Studies & Projects</h3>
          <p className="text-slate-400 text-base">
            Real-world applications, network automation tools, and self-hosted monitoring dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="glass glass-hover rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between group"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                    <Terminal className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl glass glass-hover text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-mono"
                      aria-label="GitHub Repository"
                    >
                      <Code2 className="h-4 w-4" />
                      <span>Code</span>
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl glass glass-hover text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 text-xs font-mono"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                  {project.title}
                </h4>

                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  {project.longDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shadow-[0_0_10px_rgba(56,189,248,0.1)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-8 py-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Production Ready</span>
                <span className="font-mono text-cyan-400 drop-shadow-[0_0_8px_#38bdf8]">View Source →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
