/**
 * Footer.jsx
 * Site-wide footer — displays team name, year, and quick nav links.
 * Updated for Lumina Academic design system.
 */

import { NavLink } from "react-router-dom";
import { GraduationCap, Github, Heart, Users } from "lucide-react";

const FOOTER_LINKS = [
  { to: "/",       label: "Home"    },
  { to: "/chat",   label: "Chat"    },
  { to: "/voice",  label: "Voice"   },
  { to: "/image",  label: "Vision"  },
  { to: "/history",label: "History" },
  { to: "/about",  label: "Team"    },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto w-full"
      style={{
        background: "var(--surface-container-lowest)",
        borderTop: "1px solid var(--surface-container-highest)",
        fontFamily: "var(--font-family)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white flex-shrink-0"
              style={{ background: "var(--primary)" }}
            >
              <GraduationCap size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--on-surface)]">
                Lumina Academic
              </p>
              <p className="text-[11px] text-[var(--on-surface-variant)]">Powered by AI</p>
            </div>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {FOOTER_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-xs font-bold transition-colors duration-150 ${
                    isActive ? "text-[var(--primary)]" : "text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* GitHub link */}
          <a
            href="https://github.com/hashirahmad806"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-container)] transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0"
            style={{ background: "var(--surface-container-lowest)", border: "1px solid var(--outline-variant)" }}
          >
            <Github size={13} /> GitHub
          </a>
        </div>

        {/* Divider */}
        <div className="my-5 h-px" style={{ background: "var(--outline-variant)", opacity: 0.5 }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p className="text-[11px] text-[var(--on-surface-variant)]">
            © {year} Lumina Academic. All rights reserved.
          </p>
          <p className="text-[11px] text-[var(--on-surface-variant)] flex items-center gap-1.5">
            Built with <Heart size={10} className="text-red-500" fill="#ef4444" /> by{" "}
            <NavLink to="/about" className="text-[var(--primary)] hover:text-[#005a3b] transition-colors font-bold inline-flex items-center gap-1">
              <Users size={10} /> Team of 4
            </NavLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
