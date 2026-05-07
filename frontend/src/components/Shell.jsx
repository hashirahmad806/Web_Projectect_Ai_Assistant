/**
 * Shell.jsx
 * Main layout wrapper — sidebar (desktop) + mobile top-bar + bottom nav.
 * Provides the persistent navigation structure for the entire app.
 */

import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Bot, Camera, GraduationCap, History, Home, Mic, Sparkles, Zap,
} from "lucide-react";

/* ── Navigation items ──────────────────────────────────── */
export const NAV = [
  { to: "/",       label: "Home",    icon: Home,    chip: "chip-purple" },
  { to: "/chat",   label: "Chat",    icon: Bot,     chip: "chip-cyan"   },
  { to: "/voice",  label: "Voice",   icon: Mic,     chip: "chip-green"  },
  { to: "/image",  label: "Vision",  icon: Camera,  chip: "chip-amber"  },
  { to: "/history",label: "History", icon: History, chip: "chip-purple" },
];

/* ── Active link class helper ─────────────────────────── */
const navClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-[var(--primary)] text-white"
      : "text-slate-300 hover:bg-white/5 hover:text-white"
  }`;

/* ── Mobile nav link ──────────────────────────────────── */
const mobileNavClass = ({ isActive }) =>
  `flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${
    isActive
      ? "text-[var(--primary)] bg-[var(--primary)]/10"
      : "text-slate-500 hover:text-slate-300"
  }`;

export default function Shell({ children }) {
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(sidebarRef.current, 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: "expo.out" }
    ).fromTo(contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
      "-=0.6"
    );
  }, []);

  return (
    <div className="relative z-10 flex min-h-screen">

      {/* ── Desktop Sidebar ──────────────────────────── */}
      <aside ref={sidebarRef} className="hidden lg:flex lg:w-64 xl:w-72 flex-col fixed inset-y-0 left-0 z-20">
        <div className="flex flex-col h-full m-3 rounded-2xl p-5 gap-5 shadow-lg" style={{ background: "var(--bg-sidebar)" }}>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm" style={{ background: "var(--primary)" }}>
              <GraduationCap size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                AI Student
              </p>
              <p className="text-xs text-slate-300">Powered by Groq AI</p>
            </div>
          </div>

          <div className="divider" />

          {/* Welcome card */}
          <div className="rounded-xl p-4 text-white"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-white/80" />
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                Welcome back
              </span>
            </div>
            <p className="text-base font-bold leading-tight">Hello, Student! 👋</p>
            <p className="text-xs text-white/80 mt-1 leading-5">
              Ask questions, upload homework, use voice mode — all in one place.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">
              Main Menu
            </p>
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={navClass}>
                <Icon size={17} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="divider" />

          {/* Status footer */}
          <div className="space-y-2 text-white">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-slate-300">AI Status</span>
              <span className="badge-online">Online</span>
            </div>
            <div className="flex items-center gap-2 px-1">
              <Zap size={12} className="text-amber-400" />
              <span className="text-xs text-slate-300">
                Groq — ultra-fast inference
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content area ────────────────────── */}
      <div ref={contentRef} className="flex-1 flex flex-col lg:ml-64 xl:ml-72 min-h-screen">

        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-30">
          <div className="mx-3 mt-3 rounded-2xl px-4 py-3 flex items-center justify-between shadow-md" style={{ background: "var(--bg-sidebar)" }}>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ background: "var(--primary)" }}>
                <GraduationCap size={16} className="text-white" />
              </div>
              <p className="text-sm font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                AI Student
              </p>
            </div>
            <span className="badge-online">Online</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-3 py-3 lg:px-5 lg:py-5">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden sticky bottom-0 z-30 pb-3 px-3">
          <div className="glass-strong rounded-2xl px-2 py-2 flex items-center justify-around">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={mobileNavClass}>
                <Icon size={19} />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
