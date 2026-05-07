/**
 * HomeScreen.jsx
 * Landing dashboard — hero banner, feature cards, subject guide,
 * and the student community comments section.
 */

import { Bot, Camera, History, Mic, Sparkles, ArrowRight, BookOpen, Star } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import StudentComments from "../components/StudentComments";
import StudyTips from "../components/StudyTips";

/* ── Feature cards ─────────────────────────────────────── */
const FEATURES = [
  {
    icon: Sparkles,
    title: "Ask Anything",
    desc: "Get step-by-step help for assignments, concepts, exam prep, and more in any subject.",
    to: "/chat",
    gradient: "from-indigo-600 to-violet-600",
    glow: "rgba(99,102,241,0.4)",
    badge: "Most Used",
  },
  {
    icon: Camera,
    title: "Solve from Image",
    desc: "Upload a worksheet, handwritten note, or textbook snap. AI reads and solves it for you.",
    to: "/image",
    gradient: "from-cyan-600 to-teal-600",
    glow: "rgba(6,182,212,0.4)",
    badge: "Vision AI",
  },
  {
    icon: Mic,
    title: "Voice Mode",
    desc: "Speak your question hands-free. Perfect for revision while commuting or multitasking.",
    to: "/voice",
    gradient: "from-violet-600 to-purple-700",
    glow: "rgba(139,92,246,0.4)",
    badge: "Speech AI",
  },
  {
    icon: History,
    title: "Study History",
    desc: "Every question is saved. Revisit your sessions before exams for a quick, targeted review.",
    to: "/history",
    gradient: "from-amber-600 to-orange-600",
    glow: "rgba(245,158,11,0.4)",
    badge: "Auto-Save",
  },
];

/* ── Stats ─────────────────────────────────────────────── */
const STATS = [
  { value: "2,400+", label: "Active Students" },
  { value: "18,000+", label: "Questions Answered" },
  { value: "12+", label: "Subjects Covered" },
  { value: "4.9 ★", label: "Student Rating" },
];

/* ── Exam tips ─────────────────────────────────────────── */
const EXAM_TIPS = [
  { emoji: "🎯", tip: "Ask the AI to quiz you — type 'Give me 5 MCQs on Newton's laws'" },
  { emoji: "📝", tip: "Request summaries — 'Summarise Chapter 5 of thermodynamics in 10 points'" },
  { emoji: "🔍", tip: "Compare concepts — 'What is the difference between TCP and UDP?'" },
  { emoji: "💬", tip: "Ask follow-ups — 'Can you explain that with a simpler example?'" },
];

export default function HomeScreen() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-content", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.15
      })
      .from(".stat-card", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.5)",
        stagger: 0.1
      }, "-=0.5")
      .from(".feature-card", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1
      }, "-=0.3");
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-8">

      {/* ── Hero Banner ──────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl p-7 lg:p-10"
        style={{ background: "var(--primary-light)" }}>

        <div className="relative z-10">
          <div className="hero-content flex items-center gap-2 mb-4">
            <span className="chip chip-purple">🎓 AI-Powered</span>
            <span className="chip chip-cyan">Free to Use</span>
          </div>
          <h1 className="hero-content text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Personal{" "}
            <span className="gradient-text glow-text">AI Tutor</span>
            <br />for Every Subject
          </h1>
          <p className="hero-content mt-4 max-w-2xl text-sm sm:text-base text-slate-700 leading-7">
            Chat with AI, speak your questions, upload images of problems, and keep your
            study sessions saved — all from one beautiful dashboard designed for students.
          </p>
          <div className="hero-content mt-6 flex flex-wrap gap-3">
            <NavLink to="/chat"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm">
              <Bot size={16} /> Start Chatting
            </NavLink>
            <NavLink to="/image"
              className="btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm">
              <Camera size={16} /> Upload a Problem
            </NavLink>
          </div>
        </div>
      </section>

      {/* ── Stats Row ────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATS.map(({ value, label }) => (
          <div key={label} className="stat-card glass card-hover rounded-2xl p-4 text-center border border-white/5">
            <p className="text-xl sm:text-2xl font-extrabold gradient-text">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Feature Cards ─────────────────────────────── */}
      <div>
        <h2 className="text-base font-bold text-slate-800 mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          Everything you need to study smarter
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, desc, to, gradient, glow, badge }) => (
            <NavLink key={title} to={to}
              className="feature-card glass card-hover rounded-2xl border border-white/5 p-5 flex flex-col gap-4 group">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl text-white shrink-0"
                  style={{ background: "var(--primary)" }}>
                  <Icon size={20} />
                </div>
                <span className="chip chip-purple text-[10px]">{badge}</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{title}</h3>
                <p className="text-xs leading-5 text-slate-600">{desc}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-primary-dark font-semibold mt-auto
                group-hover:gap-2 transition-all">
                Open <ArrowRight size={13} />
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* ── Two-column: Tips + Exam Guide ─────────────── */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Exam Prompt Ideas */}
          <div className="glass rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={16} className="text-slate-600" />
              <h3 className="text-sm font-bold text-slate-800">
                Smart prompts to try
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {EXAM_TIPS.map(({ emoji, tip }) => (
                <div key={tip}
                  className="rounded-xl border border-slate-200 bg-white p-3 flex gap-3 items-start">
                  <span className="text-lg shrink-0">{emoji}</span>
                  <p className="text-xs leading-5 text-slate-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Student comments */}
          <StudentComments />
        </div>

        {/* Right sidebar tips */}
        <div className="animate-slide-left delay-200">
          <StudyTips />
        </div>
      </div>

      {/* ── Footer note ───────────────────────────────── */}
      <div className="glass rounded-2xl border border-slate-200 p-4 flex items-center gap-3 text-xs text-slate-600">
        <Star size={14} className="text-amber-500 shrink-0" />
        <p>
          Powered by <span className="text-slate-800 font-semibold">Groq AI</span> with
          llama-3 — fast, accurate answers for students at every level.
          Your questions are saved securely in MongoDB.
        </p>
      </div>
    </div>
  );
}
