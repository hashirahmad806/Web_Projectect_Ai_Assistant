/**
 * DevProfileScreen.jsx
 * Individual developer profile page at /about/:slug
 * Fetches member data from the shared TEAM array.
 */

import { useEffect, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import gsap from "gsap";
import {
  ArrowLeft, Globe, Github, Linkedin, Mail, CheckCircle2,
  Code2, GitBranch, Coffee, Star, Zap, Users, ExternalLink,
} from "lucide-react";
import { TEAM } from "./AboutScreen";

/* ─── Stat card ─────────────────────────────────────────────── */
function StatItem({ label, value, icon: Icon, color }) {
  return (
    <div className="dp-stat flex flex-col items-center gap-2 p-4 rounded-2xl text-center"
      style={{
        background: "linear-gradient(135deg, #1a2744 0%, #0f1e38 100%)",
        border: `1px solid ${color}30`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
      }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: `${color}20`, border: `1px solid ${color}35` }}>
        <Icon size={15} style={{ color }} />
      </div>
      <span className="text-xl font-extrabold" style={{ color }}>{value}</span>
      <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</span>
    </div>
  );
}

export default function DevProfileScreen() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const pageRef    = useRef(null);

  const member = TEAM.find(m => m.slug === slug);

  useEffect(() => {
    if (!member) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".dp-hero",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: "expo.out" }
      );
      gsap.fromTo(".dp-stat",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.09, duration: 0.6, ease: "back.out(1.7)", delay: 0.3 }
      );
      gsap.fromTo(".dp-skill",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "expo.out", delay: 0.4 }
      );
      gsap.fromTo(".dp-section",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "expo.out", delay: 0.2 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [member]);

  /* 404 state */
  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)" }}>
          😅
        </div>
        <h1 className="text-2xl font-extrabold" style={{ color:"var(--text-primary)" }}>
          Developer not found
        </h1>
        <p className="text-slate-400 text-sm">No developer with slug "{slug}" exists.</p>
        <button onClick={() => navigate("/about")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
          style={{ background:"var(--primary)" }}>
          <ArrowLeft size={15} /> Back to Team
        </button>
      </div>
    );
  }

  const color = member.tagColor;
  const isHashir = member.slug === "hashir";

  return (
    <div ref={pageRef} className="max-w-4xl mx-auto space-y-7 pb-10">

      {/* ── Back breadcrumb ──────────────────────────────── */}
      <div className="dp-hero flex items-center gap-2">
        <button onClick={() => navigate("/about")}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-[var(--primary)] transition-colors font-medium">
          <ArrowLeft size={15} />
          <span>All Developers</span>
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-semibold" style={{ color }}>{member.name}</span>
      </div>

      {/* ── Hero card ────────────────────────────────────── */}
      <div className="dp-hero relative overflow-hidden rounded-3xl p-8 md:p-10"
        style={{
          background: "linear-gradient(135deg, #1E3A5F 0%, #0f2642 60%, #162d4a 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}>

        {/* Decorative blobs */}
        <div style={{
          position:"absolute", top:"-70px", right:"-70px",
          width:"280px", height:"280px", borderRadius:"50%", pointerEvents:"none",
          background: `radial-gradient(circle, ${color}28 0%, transparent 70%)`,
        }} />
        <div style={{
          position:"absolute", bottom:"-50px", left:"-50px",
          width:"220px", height:"220px", borderRadius:"50%", pointerEvents:"none",
          background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
        }} />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-7">

          {/* Avatar */}
          <div className="flex-shrink-0 relative">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl flex items-center justify-center text-4xl font-extrabold text-white"
              style={{ background: member.gradient, boxShadow: `0 8px 32px ${member.glow}` }}>
              {member.initials}
            </div>
            {member.available && (
              <span className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full border-2"
                style={{ background:"#22C55E", borderColor:"#1E3A5F" }} title="Available" />
            )}
          </div>

          {/* Bio */}
          <div className="text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
              style={{ background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.6)" }}>
              Developer Profile
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
              style={{ fontFamily:"'Playfair Display', serif" }}>
              {member.name}
            </h1>

            <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{
                background: `${color}22`,
                border: `1px solid ${color}40`,
              }}>
              <Code2 size={12} style={{ color }} />
              <span className="text-sm font-semibold" style={{ color }}>{member.role}</span>
              <span className="text-xs text-slate-500">· {member.tag}</span>
            </div>

            <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              {member.bio}
            </p>

            {/* Social / Portfolio links */}
            <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3">
              {isHashir && member.portfolio !== "#" && (
                <a href={member.portfolio} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background:`${color}22`, border:`1px solid ${color}40` }}>
                  <Globe size={14} /> Portfolio <ExternalLink size={11} />
                </a>
              )}
              <a href={member.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.14)" }}>
                <Github size={14} /> GitHub
              </a>
              <a href={member.linkedin} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background:"rgba(10,102,194,0.2)", border:"1px solid rgba(10,102,194,0.35)" }}>
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href={`mailto:${member.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background:"rgba(34,197,94,0.14)", border:"1px solid rgba(34,197,94,0.25)" }}>
                <Mail size={14} /> Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats row ────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        <StatItem label="Projects"      value={member.stats.projects} icon={Code2}      color={color} />
        <StatItem label="Commits"       value={member.stats.commits}  icon={GitBranch}  color={color} />
        <StatItem label={member.slug === "hashir" ? "Coffee" : "Fun Fact"} value={member.stats.coffee} icon={Coffee} color={color} />
      </div>

      {/* ── Tech skills ──────────────────────────────────── */}
      <div className="dp-section rounded-2xl p-6"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 rounded-full" style={{ background: color }} />
          <h2 className="text-base font-bold" style={{ color:"var(--text-primary)" }}>Tech Skills</h2>
          <span className="chip" style={{
            background:`${color}15`, color, border:`1px solid ${color}25`,
            display:"inline-flex", alignItems:"center", gap:"4px",
            padding:"3px 10px", borderRadius:"999px", fontSize:"11px", fontWeight:600,
          }}>
            {member.skills.length} Technologies
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {member.skills.map((skill, i) => {
            const Icon = member.skillIcons[i] || Code2;
            return (
              <div key={skill} className="dp-skill flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                style={{
                  background: `${color}0a`,
                  border: `1px solid ${color}20`,
                }}
                onMouseEnter={e => e.currentTarget.style.background = `${color}18`}
                onMouseLeave={e => e.currentTarget.style.background = `${color}0a`}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background:`${color}20` }}>
                  <Icon size={15} style={{ color }} />
                </div>
                <span className="text-sm font-semibold" style={{ color:"var(--text-primary)" }}>{skill}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Hashir-only: portfolio highlight ─────────────── */}
      {isHashir && (
        <div className="dp-section relative overflow-hidden rounded-2xl p-6"
          style={{
            background: "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(14,165,233,0.08))",
            border: "1px solid rgba(34,197,94,0.22)",
          }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Live Portfolio
                </span>
              </div>
              <h3 className="text-lg font-extrabold mb-1" style={{ color:"var(--text-primary)", fontFamily:"'Playfair Display', serif" }}>
                See Hashir's Work Live 🚀
              </h3>
              <p className="text-sm text-slate-400 leading-5">
                Explore completed projects, case studies, and more on the official portfolio site.
              </p>
            </div>
            <a href="https://my-portfolios-sandy.vercel.app/" target="_blank" rel="noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              style={{ background:"var(--primary)", boxShadow:"0 4px 16px rgba(34,197,94,0.3)" }}>
              <Globe size={15} /> Visit Portfolio <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}

      {/* ── Dummy members: coming soon ────────────────────── */}
      {!isHashir && (
        <div className="dp-section rounded-2xl p-6 text-center"
          style={{
            background: `${color}0a`,
            border: `1px solid ${color}25`,
          }}>
          <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
            style={{ background:`${color}20` }}>
            <Star size={20} style={{ color }} />
          </div>
          <h3 className="font-bold mb-1" style={{ color:"var(--text-primary)" }}>
            Full profile coming soon!
          </h3>
          <p className="text-sm text-slate-400">
            {member.name}'s detailed portfolio & project showcase will be available soon.
          </p>
        </div>
      )}

      {/* ── Team members navigation ──────────────────────── */}
      <div className="dp-section">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background:"var(--secondary)" }} />
          <h2 className="text-base font-bold" style={{ color:"var(--text-primary)" }}>Other Team Members</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TEAM.filter(m => m.slug !== slug).map(m => (
            <NavLink key={m.slug} to={`/about/${m.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = m.tagColor}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0"
                style={{ background: m.gradient }}>
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate" style={{ color:"var(--text-primary)" }}>{m.name}</p>
                <p className="text-[10px] truncate" style={{ color: m.tagColor }}>{m.role}</p>
              </div>
              <ArrowLeft size={12} className="text-slate-300 rotate-180 flex-shrink-0" />
            </NavLink>
          ))}
        </div>
      </div>

    </div>
  );
}
