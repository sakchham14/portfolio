"use client";

import React, { useState } from "react"
import Link from "next/link"
import { Package, Users, Terminal, Mail, Globe, Code2, Menu, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

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
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-3xl">
      <nav className="glass rounded-full px-4 py-3 flex items-center justify-between shadow-2xl backdrop-blur-2xl">
        <Link href="#" className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-wider text-white hover:text-cyan-300 transition-colors">
          <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_#38bdf8]" />
          sakchham.dev
        </Link>

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

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://github.com/sakchham14"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex p-2.5 rounded-full glass glass-hover text-slate-200 hover:text-white items-center justify-center"
            aria-label="GitHub"
          >
            <Code2 className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/sakchham-maharjan"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex p-2.5 rounded-full glass glass-hover text-slate-200 hover:text-white items-center justify-center"
            aria-label="LinkedIn"
          >
            <Globe className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden p-2.5 rounded-full glass glass-hover text-slate-200 hover:text-white flex items-center justify-center"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-out overflow-hidden ${
          open ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass rounded-3xl px-4 py-4 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-2xl text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-3 px-3">
            <a
              href="https://github.com/sakchham14"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <Code2 className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/sakchham-maharjan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <Globe className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}