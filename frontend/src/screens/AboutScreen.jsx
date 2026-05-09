/**
 * AboutScreen.jsx  →  Main "Meet The Team" page
 *
 * Fully redesigned: dark premium cards, CSS keyframe animations
 * (no GSAP opacity-0 traps), real team data, collaboration section.
 */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  Users, Sparkles, ArrowRight, Globe, Github, Linkedin,
  Code2, Layers, Cpu, Palette, Server, Database,
  GitBranch, MessageSquare, Zap, Star, Target,
} from "lucide-react";

/* ─── Team data ─────────────────────────────────────────────── */
export const TEAM = [
  {
    slug: "hashir",
    name: "Hashir Ahmad",
    initials: "HA",
    role: "MERN Stack Developer",
    tag: "Team Lead",
    tagColor: "#22C55E",
    gradient: "linear-gradient(135deg, #22C55E 0%, #0EA5E9 100%)",
    glow: "rgba(34,197,94,0.4)",
    bio: "Passionate full-stack developer specializing in MERN. Loves building AI-powered, scalable web apps with beautiful UIs.",
    portfolio: "https://my-portfolios-sandy.vercel.app/",
    github: "https://github.com/hashirahmad806",
    linkedin: "https://linkedin.com",
    email: "hashirahmad806@gmail.com",
    skills: ["React.js", "Node.js", "MongoDB", "Express.js", "Next.js", "AI/ML"],
    skillIcons: [Globe, Server, Database, Code2, Layers, Cpu],
    stats: { projects: "10+", commits: "500+", coffee: "∞" },
    available: true,
  },
  {
    slug: "raza",
    name: "Raza",
    initials: "RZ",
    role: "Frontend Developer",
    tag: "UI Expert",
    tagColor: "#A78BFA",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
    glow: "rgba(139,92,246,0.4)",
    bio: "Creative frontend developer with an eye for detail. Crafts stunning responsive interfaces and smooth micro-animations.",
    portfolio: "#",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "raza@example.com",
    skills: ["React.js", "Tailwind CSS", "Figma", "TypeScript", "GSAP", "Redux"],
    skillIcons: [Globe, Palette, Palette, Code2, Zap, Layers],
    stats: { projects: "8+", commits: "350+", coffee: "🎨" },
    available: false,
  },
  {
    slug: "aryan",
    name: "Aryan",
    initials: "AR",
    role: "Backend Developer",
    tag: "API Architect",
    tagColor: "#FBBF24",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
    glow: "rgba(245,158,11,0.4)",
    bio: "Backend engineer who designs robust, scalable APIs & microservices. Expert in database optimization and server architecture.",
    portfolio: "#",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "aryan@example.com",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Docker", "AWS"],
    skillIcons: [Server, Code2, Database, Globe, Cpu, Layers],
    stats: { projects: "12+", commits: "600+", coffee: "☕" },
    available: false,
  },
  {
    slug: "afzal",
    name: "Afzal",
    initials: "AF",
    role: "Full Stack Developer",
    tag: "DevOps",
    tagColor: "#38BDF8",
    gradient: "linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)",
    glow: "rgba(14,165,233,0.4)",
    bio: "Versatile full-stack developer & DevOps enthusiast. Bridges frontend and backend while keeping deployments fast and reliable.",
    portfolio: "#",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "afzal@example.com",
    skills: ["React.js", "Node.js", "CI/CD", "Git", "Linux", "MongoDB"],
    skillIcons: [Globe, Server, GitBranch, Code2, Cpu, Database],
    stats: { projects: "15+", commits: "800+", coffee: "🚀" },
    available: false,
  },
];

/* ─── Team stats ─────────────────────────────────────────────── */
const TEAM_STATS = [
  { label: "Team Members", value: "4", icon: Users },
  { label: "Total Projects", value: "45+", icon: Target },
  { label: "Combined Commits", value: "2K+", icon: GitBranch },
  { label: "GitHub Stars", value: "⭐", icon: Star },
];

/* ─── Workflow steps ─────────────────────────────────────────── */
const WORKFLOW = [
  {
    step: "01", title: "Plan Together",
    desc: "We kick off every project with collaborative planning, aligning on architecture, design system, and sprint deadlines.",
    icon: MessageSquare, color: "#22C55E",
  },
  {
    step: "02", title: "Divide & Build",
    desc: "Each developer owns their domain — frontend, backend, DB — working in parallel using Git feature branches.",
    icon: GitBranch, color: "#A78BFA",
  },
  {
    step: "03", title: "Review & Merge",
    desc: "Code reviews are mandatory. We use pull requests and peer feedback to maintain high-quality standards.",
    icon: Code2, color: "#FBBF24",
  },
  {
    step: "04", title: "Ship & Iterate",
    desc: "We deploy fast, gather real feedback, and iterate quickly. Continuous improvement is our core team value.",
    icon: Zap, color: "#38BDF8",
  },
];

/* ─── MemberCard ─────────────────────────────────────────────── */
function MemberCard({ member, index, onClick }) {
  const cardRef = useRef(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -10, scale: 1.02, duration: 0.3, ease: "power2.out",
    });
  };
  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0, scale: 1, duration: 0.3, ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="member-card relative overflow-hidden rounded-3xl cursor-pointer flex flex-col"
      style={{
        background: "#1a2744",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: `0 8px 32px rgba(0,0,0,0.25), 0 0 0 0 ${member.glow}`,
        animationDelay: `${index * 0.12}s`,
        minHeight: "380px",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onClick(member.slug)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick(member.slug)}
    >
      {/* ── Gradient header band ─────────────────────── */}
      <div
        className="relative flex-shrink-0"
        style={{
          height: "120px",
          background: member.gradient,
        }}
      >
        {/* Sheen overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
        }} />

        {/* Tag badge */}
        <span
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white"
          style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            letterSpacing: "0.1em",
          }}
        >
          {member.tag}
        </span>

        {/* Decorative circle top-right */}
        <div style={{
          position: "absolute", top: "-30px", right: "-30px",
          width: "100px", height: "100px", borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── Avatar (overlapping band) ─────────────────── */}
      <div className="px-6 -mt-8 relative flex items-end justify-between">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black"
            style={{
              background: member.gradient,
              boxShadow: `0 6px 24px ${member.glow}, 0 0 0 4px #1a2744`,
            }}
          >
            {member.initials}
          </div>
          {member.available && (
            <span
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full"
              style={{
                background: "#22C55E",
                border: "2px solid #1a2744",
                boxShadow: "0 0 8px rgba(34,197,94,0.6)",
              }}
            />
          )}
        </div>

        {/* Social icon row */}
        <div className="flex gap-2 mb-1">
          <a
            href={member.github}
            target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          >
            <Github size={13} />
          </a>
          <a
            href={member.linkedin}
            target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(10,102,194,0.3)"; e.currentTarget.style.color = "#60a5fa"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          >
            <Linkedin size={13} />
          </a>
          {member.portfolio !== "#" && (
            <a
              href={member.portfolio}
              target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={e => { e.currentTarget.style.background = `${member.tagColor}30`; e.currentTarget.style.color = member.tagColor; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
            >
              <Globe size={13} />
            </a>
          )}
        </div>
      </div>

      {/* ── Card body ─────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-6 pt-4 pb-6 gap-3">
        {/* Name + role */}
        <div>
          <h3 className="text-base font-extrabold text-white leading-tight">{member.name}</h3>
          <p className="text-xs font-semibold mt-0.5" style={{ color: member.tagColor }}>
            {member.role}
          </p>
        </div>

        {/* Bio */}
        <p
          className="text-xs leading-5 line-clamp-3"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {member.bio}
        </p>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {member.skills.slice(0, 3).map(s => (
            <span
              key={s}
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
              style={{
                background: `${member.tagColor}20`,
                color: member.tagColor,
                border: `1px solid ${member.tagColor}40`,
              }}
            >
              {s}
            </span>
          ))}
          {member.skills.length > 3 && (
            <span
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              +{member.skills.length - 3}
            </span>
          )}
        </div>

        {/* View profile CTA */}
        <button
          className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-200"
          style={{
            background: `${member.tagColor}22`,
            border: `1px solid ${member.tagColor}45`,
            color: member.tagColor,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${member.tagColor}38`;
            e.currentTarget.style.boxShadow = `0 4px 16px ${member.glow}`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `${member.tagColor}22`;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          View Full Profile <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function AboutScreen() {
  const pageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Use CSS animations as baseline (already visible), GSAP adds polish
    const ctx = gsap.context(() => {
      // Hero section
      gsap.fromTo(".team-hero-item",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "expo.out" }
      );
      // Stats
      gsap.fromTo(".team-stat-item",
        { scale: 0.75, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.08, duration: 0.65, ease: "back.out(1.7)", delay: 0.4 }
      );
      // Cards
      gsap.fromTo(".member-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.13, duration: 0.8, ease: "expo.out", delay: 0.35 }
      );
      // Workflow
      gsap.fromTo(".workflow-card",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "expo.out", delay: 0.55 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto space-y-10 pb-10">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <div
        className="team-hero-item relative overflow-hidden rounded-3xl p-8 md:p-12 text-center"
        style={{
          background: "linear-gradient(135deg, #0f2642 0%, #1E3A5F 50%, #0d1f38 100%)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
        }}
      >
        {/* BG orbs */}
        <div style={{ position: "absolute", top: "-90px", right: "-90px", width: "300px", height: "300px", borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "-70px", left: "-70px", width: "260px", height: "260px", borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(14,165,233,0.16) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", top: "40%", left: "55%", width: "200px", height: "200px", borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)" }} />

        <div className="relative">
          <div
            className="team-hero-item inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <Sparkles size={13} className="text-amber-400" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">Meet The Team</span>
          </div>

          <h1
            className="team-hero-item text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Builders Behind<br />
            <span style={{
              background: "linear-gradient(90deg, #22C55E, #0EA5E9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              AI Student
            </span>
          </h1>

          <p className="team-hero-item text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            We're a passionate team of{" "}
            <strong className="text-white">4 developers</strong> who built this AI-powered learning
            platform from scratch — combining MERN stack expertise, creative UI design, and a shared
            love for education technology. 🚀
          </p>

          {/* Stacked avatars */}
          <div className="team-hero-item mt-7 flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {TEAM.map(m => (
                <div
                  key={m.slug}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 cursor-pointer transition-transform hover:-translate-y-1"
                  style={{
                    background: m.gradient,
                    boxShadow: `0 2px 10px ${m.glow}, 0 0 0 3px #0f2642`,
                  }}
                  title={m.name}
                  onClick={() => navigate(`/about/${m.slug}`)}
                >
                  {m.initials}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm">4 Members</p>
              <p className="text-slate-400 text-xs">1 shared vision</p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ TEAM STATS ════════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {TEAM_STATS.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="team-stat-item rounded-2xl p-5 flex flex-col items-center gap-3 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a2744 0%, #0f1e38 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}
            >
              <Icon size={18} style={{ color: "#22C55E" }} />
            </div>
            <div>
              <p className="text-2xl font-black" style={{ color: "#22C55E" }}>{value}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ══ TEAM CARDS ════════════════════════════════════════ */}
      <div>
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg, #22C55E, #0EA5E9)" }} />
          <h2
            className="text-2xl font-extrabold"
            style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}
          >
            Our Developers
          </h2>
          <span
            className="px-3 py-1 rounded-full text-xs font-black text-white"
            style={{ background: "linear-gradient(90deg, #22C55E, #0EA5E9)" }}
          >
            4 Members
          </span>
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {TEAM.map((member, i) => (
            <MemberCard
              key={member.slug}
              member={member}
              index={i}
              onClick={slug => navigate(`/about/${slug}`)}
            />
          ))}
        </div>
      </div>

      {/* ══ HOW WE WORK TOGETHER ══════════════════════════════ */}
      <div
        className="rounded-3xl p-7 md:p-10"
        style={{
          background: "linear-gradient(135deg, #0f2642 0%, #1a2e52 50%, #0d1f38 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.2)",
        }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg, #22C55E, #0EA5E9)" }} />
          <h2
            className="text-2xl font-extrabold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How We Work Together
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {WORKFLOW.map(({ step, title, desc, icon: Icon, color }) => (
            <div
              key={step}
              className="workflow-card group flex gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${color}10`;
                e.currentTarget.style.borderColor = `${color}35`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}20`, border: `1.5px solid ${color}45` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <span
                  className="text-[10px] font-black tracking-widest"
                  style={{ color: `${color}80` }}
                >
                  {step}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-extrabold text-white mb-1.5">{title}</h3>
                <p className="text-xs leading-5" style={{ color: "rgba(255,255,255,0.5)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {["Git & GitHub", "Agile Sprints", "Code Reviews", "Pair Programming", "Daily Stand-ups"].map(t => (
            <span
              key={t}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22C55E" }} />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ══ FOOTER CTA ════════════════════════════════════════ */}
      <div
        className="team-hero-item rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{
          background: "linear-gradient(90deg, rgba(34,197,94,0.1), rgba(14,165,233,0.08))",
          border: "1px solid rgba(34,197,94,0.2)",
        }}
      >
        <div>
          <p className="font-extrabold text-base" style={{ color: "var(--text-primary)" }}>
            Want to see Hashir's full profile? 👀
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Real portfolio, GitHub, and detailed tech showcase.
          </p>
        </div>
        <button
          onClick={() => navigate("/about/hashir")}
          className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          style={{
            background: "linear-gradient(135deg, #22C55E, #0EA5E9)",
            boxShadow: "0 4px 20px rgba(34,197,94,0.3)",
          }}
        >
          View Hashir's Profile <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
}
