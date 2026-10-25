import React from "react"
import { Package, Users, Terminal, Mail, Globe, Code2 } from "lucide-react"

export interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Case Studies", href: "#projects", icon: <Package className="h-4 w-4 text-cyan-400" /> },
  { label: "Skills", href: "#skills", icon: <Terminal className="h-4 w-4 text-purple-400" /> },
  { label: "About", href: "#about", icon: <Users className="h-4 w-4 text-pink-400" /> },
  { label: "Contact", href: "#contact", icon: <Mail className="h-4 w-4 text-emerald-400" /> },
]

export const FloatingNav = () => {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl">
      <nav className="glass rounded-full px-6 py-3.5 flex items-center justify-between shadow-2xl backdrop-blur-2xl">
        <a href="#" className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-wider text-white hover:text-cyan-300 transition-colors">
          <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_#38bdf8]" />
          sakchham.dev
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-1.5 hover:text-white transition-colors py-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/sakchham14"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass glass-hover text-slate-200 hover:text-white flex items-center justify-center"
            aria-label="GitHub"
          >
            <Code2 className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/sakchham-maharjan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass glass-hover text-slate-200 hover:text-white flex items-center justify-center"
            aria-label="LinkedIn"
          >
            <Globe className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  )
}
