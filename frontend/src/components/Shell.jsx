/**
 * Shell.jsx
 * Main layout wrapper — collapsible sidebar (desktop) + mobile hamburger drawer + bottom nav.
 * Sidebar can be toggled open/closed. Mobile uses a slide-in overlay drawer.
 */

import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Bot, Camera, GraduationCap, History, Home, Mic,
  Sparkles, Zap, User, ChevronLeft, ChevronRight, Menu, X, LogOut, LogIn
} from "lucide-react";

/* ── Navigation items ──────────────────────────────────────── */
export const NAV = [
  { to: "/", label: "Home", icon: Home, chip: "chip-purple" },
  { to: "/chat", label: "Chat", icon: Bot, chip: "chip-cyan" },
  { to: "/voice", label: "Voice", icon: Mic, chip: "chip-green" },
  { to: "/image", label: "Vision", icon: Camera, chip: "chip-amber" },
  { to: "/history", label: "History", icon: History, chip: "chip-purple" },
  { to: "/about", label: "About", icon: User, chip: "chip-cyan" },
];

/* ── Active link class helper (full sidebar) ──────────────── */
const navClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
    ? "bg-[var(--primary)] text-white"
    : "text-slate-300 hover:bg-white/5 hover:text-white"
  }`;

/* ── Active link class helper (collapsed, icon-only) ─────── */
const navClassCollapsed = ({ isActive }) =>
  `group relative flex items-center justify-center rounded-xl p-2 my-2 transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg ${isActive
    ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/30"
    : "text-slate-400 hover:bg-white/10 hover:text-white"
  }`;

/* ── Mobile nav link ──────────────────────────────────────── */
const mobileNavClass = ({ isActive }) =>
  `flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${isActive
    ? "text-[var(--primary)] bg-[var(--primary)]/10"
    : "text-slate-500 hover:text-slate-300"
  }`;

/* ── Drawer nav link (mobile overlay) ────────────────────── */
const drawerNavClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
    ? "bg-[var(--primary)] text-white"
    : "text-slate-200 hover:bg-white/8 hover:text-white"
  }`;

export default function Shell({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Auth logic
  const authToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);

  /* ── Entrance animation ─────────────────────────────── */
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

  /* ── Open mobile drawer ─────────────────────────────── */
  const openDrawer = () => {
    setDrawerOpen(true);
    requestAnimationFrame(() => {
      if (drawerRef.current) gsap.fromTo(drawerRef.current, { x: -280 }, { x: 0, duration: 0.35, ease: "expo.out" });
      if (overlayRef.current) gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    });
  };

  /* ── Close mobile drawer ────────────────────────────── */
  const closeDrawer = () => {
    if (drawerRef.current) gsap.to(drawerRef.current, { x: -280, duration: 0.28, ease: "expo.in" });
    if (overlayRef.current) gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 });
    setTimeout(() => setDrawerOpen(false), 300);
  };

  /* Widths */
  const SIDEBAR_W = collapsed ? "72px" : "272px";
  const CONTENT_ML = collapsed ? "72px" : "272px";

  return (
    <div className="relative z-10 flex min-h-screen">

      {/* ══ DESKTOP SIDEBAR ════════════════════════════════ */}
      <aside ref={sidebarRef}
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-20"
        style={{
          width: SIDEBAR_W,
          transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}>
        <div className="flex flex-col h-full m-3 rounded-2xl shadow-lg relative"
          style={{ background: "var(--bg-sidebar)" }}>

          {/* ── Logo + Toggle ────────────────────────────── */}
          <div className={`relative flex items-center ${collapsed ? "justify-center" : "justify-between"} px-4 pt-4 pb-3`}>
            
            {/* Show logo only when expanded */}
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                  style={{ background: "var(--primary)" }}>
                  <GraduationCap size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    AI Student
                  </p>
                  <p className="text-[11px] text-slate-400">Powered by Groq AI</p>
                </div>
              </div>
            )}

            {/* Collapse toggle button */}
            <button onClick={() => setCollapsed(c => !c)}
              className={`flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition-colors duration-150 flex-shrink-0 z-50 ${collapsed ? "h-10 w-10 bg-white/5" : "h-7 w-7"}`}>
              {collapsed ? <ChevronRight size={22} strokeWidth={2.5} /> : <ChevronLeft size={15} />}
            </button>
          </div>

          <div className="divider mx-3" />

          {/* ── Welcome card (only when expanded) ──────── */}
          {!collapsed && (
            <div className="mx-3 my-3 rounded-xl p-3 text-white"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={12} className="text-white/70" />
                <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">
                  Welcome back
                </span>
              </div>
              <p className="text-sm font-bold leading-snug">Hello, Student! 👋</p>
              <p className="text-[11px] text-white/70 mt-1 leading-5">
                Ask questions, upload homework, use voice mode — all in one place.
              </p>
            </div>
          )}

          {/* ── Navigation ────────────────────────────────── */}
          <nav className="flex-1 px-2 py-1 space-y-0.5">
            {!collapsed && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 py-2">
                Main Menu
              </p>
            )}
            {NAV.map(({ to, label, icon: Icon }) =>
              collapsed ? (
                <NavLink key={to} to={to} className={navClassCollapsed}>
                  <Icon size={28} strokeWidth={1.8} />
                  {/* Custom CSS Tooltip */}
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {label}
                  </div>
                </NavLink>
              ) : (
                <NavLink key={to} to={to} className={navClass}>
                  <Icon size={20} />
                  <span>{label}</span>
                </NavLink>
              )
            )}
          </nav>

          <div className="divider mx-3" />

          {/* ── User & Auth ─────────────────────────────── */}
          <div className="px-4 py-3 space-y-2">
            {authToken ? (
              <>
                {!collapsed && (
                  <div className="flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded-xl border border-white/5 mb-2">
                    <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                      <User size={13} className="text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-200 truncate">{user?.name || "Student"}</p>
                    </div>
                  </div>
                )}
                <button onClick={handleLogout} className={collapsed
                  ? "group relative flex items-center justify-center p-2 my-2 rounded-xl text-red-400 hover:bg-red-500/15 hover:text-red-300 hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 ease-out mx-auto w-full"
                  : "w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"}>
                  {collapsed ? <LogOut size={28} strokeWidth={1.8} /> : <LogOut size={20} />}
                  {!collapsed && <span className="text-sm font-semibold">Logout</span>}
                  
                  {/* Custom Tooltip */}
                  {collapsed && (
                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                      Logout
                    </div>
                  )}
                </button>
              </>
            ) : (
              <NavLink to="/login" className={collapsed ? navClassCollapsed : navClass}>
                {collapsed ? <LogIn size={28} strokeWidth={1.8} /> : <LogIn size={20} className="flex-shrink-0 text-cyan-400" />}
                {!collapsed && <span className="text-cyan-400">Login / Register</span>}
                
                {/* Custom Tooltip */}
                {collapsed && (
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                    Login / Register
                  </div>
                )}
              </NavLink>
            )}
          </div>

          <div className="divider mx-3" />

          {/* ── Status footer ─────────────────────────────── */}
          {!collapsed ? (
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">AI Status</span>
                <span className="badge-online">Online</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={12} className="text-amber-400" />
                <span className="text-xs text-slate-400">Groq — ultra-fast inference</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-4 relative group">
              <div className="hover:scale-110 transition-transform duration-300 cursor-help">
                <Zap size={28} className="text-amber-400 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              </div>
              {/* Custom Tooltip */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                System Online
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ══ MAIN CONTENT ════════════════════════════════════ */}
      <div ref={contentRef} className="flex-1 flex flex-col min-h-screen"
        style={{
          marginLeft: 0,
          transition: "margin-left 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      /* Apply desktop margin via inline only for lg+ */
      >
        {/* Desktop margin spacer (invisible, for layout shift) */}
        <style>{`
          @media (min-width: 1024px) {
            .shell-content { margin-left: ${CONTENT_ML}; }
          }
        `}</style>

        {/* ── Mobile top bar ─────────────────────────────── */}
        <header className="lg:hidden sticky top-0 z-30">
          <div className="mx-3 mt-3 rounded-2xl px-4 py-3 flex items-center justify-between shadow-md"
            style={{ background: "var(--bg-sidebar)" }}>
            <div className="flex items-center gap-2">
              {/* Hamburger */}
              <button onClick={openDrawer}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors mr-1"
                aria-label="Open menu">
                <Menu size={18} />
              </button>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                style={{ background: "var(--primary)" }}>
                <GraduationCap size={15} className="text-white" />
              </div>
              <p className="text-sm font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                AI Student
              </p>
            </div>
            <span className="badge-online">Online</span>
          </div>
        </header>

        {/* Page content */}
        <main className="shell-content flex-1 px-3 py-3 lg:px-5 lg:py-5">
          {children}
        </main>

        {/* ── Site Footer ────────────────────────────────── */}
        <div className="shell-content">
          <Footer />
        </div>

        {/* ── Mobile bottom nav ──────────────────────────── */}
        <nav className="lg:hidden sticky bottom-0 z-30 pb-3 px-3">
          <div className="glass-strong rounded-2xl px-2 py-2 flex items-center justify-around">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={mobileNavClass}>
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/* ══ MOBILE DRAWER OVERLAY ══════════════════════════ */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div ref={overlayRef}
            className="lg:hidden fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
            onClick={closeDrawer}
          />

          {/* Drawer panel */}
          <div ref={drawerRef}
            className="lg:hidden fixed inset-y-0 left-0 z-50 flex flex-col"
            style={{ width: "280px", background: "var(--bg-sidebar)" }}>

            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                  style={{ background: "var(--primary)" }}>
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    AI Student
                  </p>
                  <p className="text-[11px] text-slate-400">Powered by Groq AI</p>
                </div>
              </div>
              <button onClick={closeDrawer}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close menu">
                <X size={18} />
              </button>
            </div>

            <div className="divider mx-4" />

            {/* Welcome card */}
            <div className="mx-4 my-3 rounded-xl p-3 text-white"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={12} className="text-amber-400" />
                <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                  Welcome back
                </span>
              </div>
              <p className="text-sm font-bold">Hello, Student! 👋</p>
              <p className="text-[11px] text-white/60 mt-1 leading-5">
                Ask questions, upload homework, use voice mode.
              </p>
            </div>

            {/* Drawer nav links */}
            <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 py-2">
                Navigation
              </p>
              {NAV.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} className={drawerNavClass} onClick={closeDrawer}>
                  <Icon size={22} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Auth Links Mobile */}
            <div className="px-5 py-3 border-t border-white/5">
              {authToken ? (
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 font-semibold hover:bg-red-500/10">
                  <LogOut size={18} className="flex-shrink-0" />
                  <span>Logout</span>
                </button>
              ) : (
                <NavLink to="/login" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-cyan-400 font-semibold hover:bg-cyan-500/10" onClick={closeDrawer}>
                  <LogIn size={18} className="flex-shrink-0" />
                  <span>Login / Register</span>
                </NavLink>
              )}
            </div>

            <div className="divider mx-4" />

            {/* Footer */}
            <div className="px-5 py-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">AI Status</span>
                <span className="badge-online">Online</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={12} className="text-amber-400" />
                <span className="text-xs text-slate-400">Groq — ultra-fast inference</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
