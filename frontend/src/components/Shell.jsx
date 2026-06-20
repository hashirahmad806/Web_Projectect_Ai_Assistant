/**
 * Shell.jsx
 * Main layout wrapper — collapsible sidebar (desktop) + mobile hamburger drawer + bottom nav.
 * Updated for Lumina Academic design system.
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
  { to: "/", label: "Home", icon: Home },
  { to: "/chat", label: "Chat", icon: Bot },
  { to: "/voice", label: "Voice", icon: Mic },
  { to: "/image", label: "Vision", icon: Camera },
  { to: "/history", label: "History", icon: History },
  { to: "/about", label: "About", icon: User },
];

/* ── Active link class helper (full sidebar) ──────────────── */
const navClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
    ? "bg-[var(--primary)] text-white"
    : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] hover:text-[var(--on-surface)]"
  }`;

/* ── Active link class helper (collapsed, icon-only) ─────── */
const navClassCollapsed = ({ isActive }) =>
  `group relative flex items-center justify-center rounded-xl p-2 my-2 transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-0.5 hover:shadow-sm ${isActive
    ? "bg-[var(--primary)] text-white shadow-sm"
    : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] hover:text-[var(--on-surface)]"
  }`;

/* ── Mobile nav link ──────────────────────────────────────── */
const mobileNavClass = ({ isActive }) =>
  `flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${isActive
    ? "text-[var(--primary)] bg-[var(--primary-container)]"
    : "text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]"
  }`;

/* ── Drawer nav link (mobile overlay) ────────────────────── */
const drawerNavClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
    ? "bg-[var(--primary)] text-white"
    : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] hover:text-[var(--on-surface)]"
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
    <div className="relative z-10 flex min-h-screen" style={{ background: "var(--surface)", fontFamily: "var(--font-family)" }}>

      {/* ══ DESKTOP SIDEBAR ════════════════════════════════ */}
      <aside ref={sidebarRef}
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-20"
        style={{
          width: SIDEBAR_W,
          transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}>
        <div className="flex flex-col h-full m-3 rounded-[24px] relative"
          style={{ background: "var(--surface-container-low)", border: "1px solid var(--outline-variant)" }}>

          {/* ── Logo + Toggle ────────────────────────────── */}
          <div className={`relative flex items-center ${collapsed ? "justify-center" : "justify-between"} px-4 pt-4 pb-3`}>
            
            {/* Show logo only when expanded */}
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-white"
                  style={{ background: "var(--primary)" }}>
                  <GraduationCap size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-[var(--on-surface)]">
                    Lumina Academic
                  </p>
                  <p className="text-[11px] text-[var(--on-surface-variant)]">Powered by AI</p>
                </div>
              </div>
            )}

            {/* Collapse toggle button */}
            <button onClick={() => setCollapsed(c => !c)}
              className={`flex items-center justify-center rounded-lg text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] hover:text-[var(--on-surface)] transition-colors duration-150 flex-shrink-0 z-50 ${collapsed ? "h-10 w-10 bg-[var(--surface-container)]" : "h-7 w-7"}`}>
              {collapsed ? <ChevronRight size={22} strokeWidth={2.5} /> : <ChevronLeft size={15} />}
            </button>
          </div>

          <div className="h-px w-full my-1" style={{ background: "var(--outline-variant)", opacity: 0.5 }} />

          {/* ── Welcome card (only when expanded) ──────── */}
          {!collapsed && (
            <div className="mx-3 my-3 rounded-xl p-3"
              style={{ background: "var(--surface-container)", border: "1px solid var(--outline-variant)" }}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={12} className="text-[var(--primary)]" />
                <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider">
                  Welcome back
                </span>
              </div>
              <p className="text-sm font-bold leading-snug text-[var(--on-surface)]">Hello, Student! 👋</p>
              <p className="text-[11px] mt-1 leading-5 text-[var(--on-surface-variant)]">
                Ask questions, upload homework, use voice mode — all in one place.
              </p>
            </div>
          )}

          {/* ── Navigation ────────────────────────────────── */}
          <nav className="flex-1 px-2 py-1 space-y-0.5">
            {!collapsed && (
              <p className="text-[10px] font-bold uppercase tracking-widest px-3 py-2 text-[var(--outline)]">
                Main Menu
              </p>
            )}
            {NAV.map(({ to, label, icon: Icon }) =>
              collapsed ? (
                <NavLink key={to} to={to} className={navClassCollapsed}>
                  <Icon size={28} strokeWidth={1.8} />
                  {/* Custom CSS Tooltip */}
                  <div className="absolute left-full ml-4 px-3 py-1.5 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none" style={{ background: "var(--on-surface)" }}>
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

          <div className="h-px w-full my-1" style={{ background: "var(--outline-variant)", opacity: 0.5 }} />

          {/* ── User & Auth ─────────────────────────────── */}
          <div className="px-4 py-3 space-y-2">
            {authToken ? (
              <>
                {!collapsed && (
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl border mb-2" style={{ background: "var(--surface)", borderColor: "var(--outline-variant)" }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center border" style={{ background: "var(--primary-container)", borderColor: "var(--primary-container)" }}>
                      <User size={13} style={{ color: "var(--on-primary-container)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate text-[var(--on-surface)]">{user?.name || "Student"}</p>
                    </div>
                  </div>
                )}
                <button onClick={handleLogout} className={collapsed
                  ? "group relative flex items-center justify-center p-2 my-2 rounded-xl text-red-500 hover:bg-red-50 hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 ease-out mx-auto w-full"
                  : "w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors"}>
                  {collapsed ? <LogOut size={28} strokeWidth={1.8} /> : <LogOut size={20} />}
                  {!collapsed && <span className="text-sm font-semibold">Logout</span>}
                  
                  {/* Custom Tooltip */}
                  {collapsed && (
                    <div className="absolute left-full ml-4 px-3 py-1.5 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none" style={{ background: "var(--on-surface)" }}>
                      Logout
                    </div>
                  )}
                </button>
              </>
            ) : (
              <NavLink to="/login" className={collapsed ? navClassCollapsed : navClass}>
                {collapsed ? <LogIn size={28} strokeWidth={1.8} /> : <LogIn size={20} className="flex-shrink-0 text-[var(--primary)]" />}
                {!collapsed && <span className="text-[var(--primary)] font-bold">Login / Register</span>}
                
                {/* Custom Tooltip */}
                {collapsed && (
                  <div className="absolute left-full ml-4 px-3 py-1.5 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none" style={{ background: "var(--on-surface)" }}>
                    Login / Register
                  </div>
                )}
              </NavLink>
            )}
          </div>

          <div className="h-px w-full my-1" style={{ background: "var(--outline-variant)", opacity: 0.5 }} />

          {/* ── Status footer ─────────────────────────────── */}
          {!collapsed ? (
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--outline)]">System Status</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: "var(--primary-container)", color: "var(--on-primary-container)" }}>Online</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={12} className="text-[var(--primary)]" />
                <span className="text-xs text-[var(--outline)]">Ultra-fast inference</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-4 relative group">
              <div className="hover:scale-110 transition-transform duration-300 cursor-help">
                <Zap size={28} className="text-[var(--primary)] hover:drop-shadow-[0_0_8px_rgba(0,108,72,0.4)]" />
              </div>
              {/* Custom Tooltip */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none" style={{ background: "var(--on-surface)" }}>
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
          <div className="mx-3 mt-3 rounded-[24px] px-4 py-3 flex items-center justify-between shadow-sm border"
            style={{ background: "var(--surface-container-low)", borderColor: "var(--outline-variant)" }}>
            <div className="flex items-center gap-2">
              {/* Hamburger */}
              <button onClick={openDrawer}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] hover:text-[var(--on-surface)] transition-colors mr-1"
                aria-label="Open menu">
                <Menu size={18} />
              </button>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                style={{ background: "var(--primary)" }}>
                <GraduationCap size={15} className="text-white" />
              </div>
              <p className="text-sm font-bold text-[var(--on-surface)]">
                Lumina Academic
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: "var(--primary-container)", color: "var(--on-primary-container)" }}>Online</span>
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
          <div className="rounded-[24px] px-2 py-2 flex items-center justify-around shadow-lg border" style={{ background: "var(--surface-container)", borderColor: "var(--outline-variant)" }}>
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
            style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(2px)" }}
            onClick={closeDrawer}
          />

          {/* Drawer panel */}
          <div ref={drawerRef}
            className="lg:hidden fixed inset-y-0 left-0 z-50 flex flex-col"
            style={{ width: "280px", background: "var(--surface-container-low)" }}>

            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-5 border-b" style={{ borderColor: "var(--outline-variant)" }}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                  style={{ background: "var(--primary)" }}>
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--on-surface)]">
                    Lumina Academic
                  </p>
                  <p className="text-[11px] text-[var(--on-surface-variant)]">Powered by AI</p>
                </div>
              </div>
              <button onClick={closeDrawer}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] hover:text-[var(--on-surface)] transition-colors"
                aria-label="Close menu">
                <X size={18} />
              </button>
            </div>

            {/* Welcome card */}
            <div className="mx-4 my-4 rounded-xl p-3 border"
              style={{ background: "var(--surface-container)", borderColor: "var(--outline-variant)" }}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={12} className="text-[var(--primary)]" />
                <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider">
                  Welcome back
                </span>
              </div>
              <p className="text-sm font-bold text-[var(--on-surface)]">Hello, Student! 👋</p>
              <p className="text-[11px] text-[var(--on-surface-variant)] mt-1 leading-5">
                Ask questions, upload homework, use voice mode.
              </p>
            </div>

            {/* Drawer nav links */}
            <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto">
              <p className="text-[10px] font-bold uppercase tracking-widest px-3 py-2 text-[var(--outline)]">
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
            <div className="px-5 py-3 border-t" style={{ borderColor: "var(--outline-variant)" }}>
              {authToken ? (
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 font-semibold hover:bg-red-50">
                  <LogOut size={18} className="flex-shrink-0" />
                  <span>Logout</span>
                </button>
              ) : (
                <NavLink to="/login" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[var(--primary)] font-bold hover:bg-[var(--surface-container)]" onClick={closeDrawer}>
                  <LogIn size={18} className="flex-shrink-0" />
                  <span>Login / Register</span>
                </NavLink>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 space-y-2 border-t" style={{ borderColor: "var(--outline-variant)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--outline)]">System Status</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: "var(--primary-container)", color: "var(--on-primary-container)" }}>Online</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={12} className="text-[var(--primary)]" />
                <span className="text-xs text-[var(--outline)]">Ultra-fast inference</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
