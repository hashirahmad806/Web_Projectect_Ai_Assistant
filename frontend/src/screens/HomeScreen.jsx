/**
 * HomeScreen.jsx
 * Standalone landing page using the Lumina Academic design system.
 * Integrates Lenis smooth scrolling and IntersectionObserver reveal animations.
 */

import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import {
  Bot, Camera, History, Mic, Sparkles, ArrowRight,
  BookOpen, Star, Code2, FlaskConical, BarChart3, Zap, GraduationCap,
  TerminalSquare, Database, Network, Flame, CheckCircle, Clock2, MonitorPlay
} from "lucide-react";
import { Link } from "react-router-dom";
import StudentComments from "../components/StudentComments";

/**
 * Custom hook: fades-in elements with [data-reveal] as they scroll into view.
 */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    // Set initial hidden state
    els.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(32px)";
      el.style.transition = "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)";
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const FEATURES = [
  {
    icon: Sparkles,
    title: "Ask Anything",
    desc: "Get step-by-step help for assignments, concepts, exam prep, and more in any subject.",
    to: "/chat",
    badge: "Most Used",
  },
  {
    icon: Camera,
    title: "Solve from Image",
    desc: "Upload a worksheet, handwritten note, or textbook snap. AI reads and solves it for you.",
    to: "/image",
    badge: "Vision AI",
  },
  {
    icon: Mic,
    title: "Voice Mode",
    desc: "Speak your question hands-free. Perfect for revision while commuting or multitasking.",
    to: "/voice",
    badge: "Speech AI",
  },
  {
    icon: History,
    title: "Study History",
    desc: "Every session is saved. Revisit your sessions before exams for quick, targeted review.",
    to: "/history",
    badge: "Auto-Save",
  },
];

const STATS = [
  { value: "2,400+",  label: "Active Students"    },
  { value: "18,000+", label: "Questions Answered" },
  { value: "12+",     label: "Subjects Covered"   },
  { value: "4.9 ★",   label: "Student Rating"     },
];

const EXAM_TIPS = [
  { emoji: "🎯", tip: "Ask the AI to quiz you — type 'Give me 5 MCQs on Newton's laws'" },
  { emoji: "📝", tip: "Request summaries — 'Summarise Chapter 5 of thermodynamics in 10 points'" },
  { emoji: "🔍", tip: "Compare concepts — 'What is the difference between TCP and UDP?'" },
  { emoji: "💬", tip: "Ask follow-ups — 'Can you explain that with a simpler example?'" },
];

const HOW_IT_WORKS = [
  "Type, speak, or upload an image of your question",
  "AI analyses and explains it step-by-step",
  "Review the answer and ask follow-ups",
  "Come back later via Study History",
];

const CS_FEATURES = [
  {
    icon: TerminalSquare,
    title: "Code Debugger & Explainer",
    desc: "Paste your broken code and get instant fixes with line-by-line logic explanations for Python, Java, C++, and more."
  },
  {
    icon: Database,
    title: "Data Science Lab",
    desc: "Get help with complex SQL queries, Pandas operations, and intuitive explanations of statistical models and ML concepts."
  },
  {
    icon: Network,
    title: "Algorithm Visualizer",
    desc: "Visualize sorting algorithms, tree traversals, and graph theory step-by-step to truly understand how they work under the hood."
  }
];

const SUCCESS_STORIES = [
  {
    icon: Flame,
    title: "30-Day Study Streak",
    desc: "Usman increased his Physics grade from B to A+ in just 4 weeks."
  },
  {
    icon: CheckCircle,
    title: "Exam Ready",
    desc: "Amina mastered 5 years of past papers for Computer Science."
  },
  {
    icon: Clock2,
    title: "24/7 Support",
    desc: "Never stuck on a homework problem again. Instant help whenever you need it."
  }
];

export default function HomeScreen() {
  // ── Lenis smooth scrolling ──
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // ── Scroll reveal for sections ──
  useScrollReveal();

  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh", position: "relative" }}>
      
      {/* ══ FLUID GRADIENT BACKGROUND ════════════════════ */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "600px", pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse at 50% -20%, var(--surface-container-high) 0%, transparent 70%)"
      }} />

      {/* ══ GLASS NAVBAR ════════════════════════════════ */}
      <nav className="lumina-glass-nav" style={{
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ 
          maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--spacing-stack-md)", 
          height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" 
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "var(--primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <GraduationCap size={18} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, color: "var(--on-surface)", letterSpacing: "-0.02em" }}>
              Lumina Academic
            </span>
          </Link>

          {/* Links & Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div className="hidden md:flex" style={{ gap: 24 }}>
              {["Features", "Community", "How It Works", "Pricing"].map(item => (
                <a key={item} href={`#${item.toLowerCase().replace(/\s/g, "")}`} style={{
                  fontSize: 14, fontWeight: 600, color: "var(--on-surface-variant)", textDecoration: "none"
                }}>{item}</a>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Link to="/login" style={{ fontSize: 14, fontWeight: 700, color: "var(--primary)", textDecoration: "none", padding: "8px 16px" }}>
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ══ HERO SECTION ════════════════════════════════ */}
      <section data-reveal style={{ position: "relative", zIndex: 1, padding: "80px var(--spacing-stack-md)", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
            <span className="label-caps" style={{
              padding: "6px 14px", borderRadius: "var(--radius-full)",
              background: "var(--surface-container)", color: "var(--primary)"
            }}>
              🎓 Optimistic Learning
            </span>
            <span className="label-caps" style={{
              padding: "6px 14px", borderRadius: "var(--radius-full)",
              background: "var(--tertiary-container)", color: "var(--on-tertiary-container)"
            }}>
              Free to Use
            </span>
          </div>

          <h1 className="display-lg" style={{ color: "var(--on-surface)", marginBottom: 24 }}>
            Achieve your flow state.<br/>
            Your intelligent <span style={{ color: "var(--primary)" }}>AI Tutor</span>.
          </h1>

          <p className="body-lg" style={{ color: "var(--on-surface-variant)", maxWidth: 640, margin: "0 auto 40px" }}>
            Bridge the gap between academic rigor and modern technology. Ask questions, speak naturally, or upload problems—all in one distraction-free environment.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link to="/chat" className="btn-primary" style={{ padding: "14px 28px", fontSize: 16 }}>
              <Bot size={18} /> Start Learning Now
            </Link>
            <Link to="/image" className="btn-secondary" style={{ padding: "14px 28px", fontSize: 16 }}>
              <Camera size={18} /> Solve from Image
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS ═══════════════════════════════════════ */}
      <section data-reveal style={{ position: "relative", zIndex: 1, padding: "0 var(--spacing-stack-md) 64px" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {STATS.map(({ value, label }, i) => (
            <div key={label} data-reveal data-reveal-delay={i * 100} className="lumina-card" style={{ padding: "32px 24px", textAlign: "center" }}>
              <p style={{ fontSize: 36, fontWeight: 800, color: "var(--primary)", marginBottom: 8, letterSpacing: "-0.03em" }}>{value}</p>
              <p className="label-caps" style={{ color: "var(--on-surface-variant)" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MAIN CONTENT (FEATURES + SIDEBAR) ════════════ */}
      <section id="features" data-reveal style={{ position: "relative", zIndex: 1, padding: "0 var(--spacing-stack-md) 64px" }}>
        <div className="grid lg:grid-cols-[1fr_340px] gap-8" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          
          {/* LEFT COLUMN: Features & Community */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <h2 className="headline-md" style={{ color: "var(--on-surface)", marginBottom: 8 }}>
              Everything you need to study smarter
            </h2>
            
            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FEATURES.map(({ icon: Icon, title, desc, to, badge }, i) => (
                <Link key={title} to={to} data-reveal data-reveal-delay={i * 80} className="lumina-card" style={{
                  padding: 24, textDecoration: "none", display: "flex", flexDirection: "column", gap: 16
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "var(--radius-lg)", background: "var(--surface-container)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={24} color="var(--primary)" />
                    </div>
                    <span className="label-caps" style={{ padding: "4px 10px", borderRadius: "var(--radius-full)", background: "var(--surface)", color: "var(--tertiary)", border: "1px solid var(--outline-variant)" }}>
                      {badge}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--on-surface)", marginBottom: 8 }}>{title}</h3>
                    <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>{desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Student Community */}
            <div id="community" data-reveal style={{ marginTop: 16 }}>
              <StudentComments />
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Smart Prompts */}
            <div data-reveal className="lumina-card" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <BookOpen size={20} color="var(--primary)" />
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--on-surface)" }}>Smart Prompts</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {EXAM_TIPS.map(({ emoji, tip }) => (
                  <div key={tip} style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 20 }}>{emoji}</span>
                    <p style={{ fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.5 }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works Timeline */}
            <div data-reveal className="lumina-card" id="howitworks" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--on-surface)", marginBottom: 20 }}>How it works</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
                
                {/* Vertical Line */}
                <div style={{ position: "absolute", left: 15, top: 10, bottom: 10, width: 2, background: "repeating-linear-gradient(to bottom, var(--outline-variant) 0, var(--outline-variant) 4px, transparent 4px, transparent 8px)" }} />
                
                {HOW_IT_WORKS.map((step, i) => (
                  <div key={step} style={{ display: "flex", gap: 16, alignItems: "flex-start", position: "relative", zIndex: 2 }}>
                    <div style={{ 
                      width: 32, height: 32, borderRadius: "50%", background: "var(--primary)", color: "white", 
                      display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ fontSize: 15, color: "var(--on-surface-variant)", paddingTop: 4 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ CS & DATA SCIENCE ═════════════════════════════ */}
      <section data-reveal style={{ padding: "80px var(--spacing-stack-md)", background: "var(--surface-container-lowest)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", textAlign: "center" }}>
          
          <h2 className="headline-md" style={{ color: "var(--on-surface)", marginBottom: 16, fontSize: 36, letterSpacing: "-0.02em" }}>
            Tailored for CS & Data Science
          </h2>
          <p className="body-lg" style={{ color: "var(--on-surface-variant)", maxWidth: 640, margin: "0 auto 48px" }}>
            Master complex logic and data structures with specialized tools built for the next generation of engineers.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24, marginBottom: 48, textAlign: "left" }}>
            {CS_FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} data-reveal data-reveal-delay={i * 100} className="lumina-card" style={{ padding: 32, background: "var(--surface)" }}>
                <div style={{ width: 48, height: 48, borderRadius: "var(--radius-lg)", background: "var(--surface-container)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <Icon size={24} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--on-surface)", marginBottom: 12 }}>{title}</h3>
                <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="lumina-card" style={{ padding: "24px 48px", display: "flex", alignItems: "center", justifyContent: "center", gap: 32, flexWrap: "wrap", background: "var(--surface)" }}>
            <span className="label-caps" style={{ color: "var(--on-surface-variant)", letterSpacing: "0.1em" }}>SUPPORTED TECH STACK</span>
            <div style={{ display: "flex", gap: 24, alignItems: "center", color: "var(--primary)", fontWeight: 700, fontSize: 14, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Code2 size={16}/> Python</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><TerminalSquare size={16}/> JavaScript</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Database size={16}/> SQL</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Network size={16}/> Git</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MonitorPlay size={16}/> React</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><FlaskConical size={16}/> Java</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SUCCESS STORIES CTA ═══════════════════════════ */}
      <section data-reveal style={{ padding: "80px var(--spacing-stack-md)", background: "var(--surface)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", textAlign: "center" }}>
          
          <h2 className="headline-md" style={{ color: "var(--on-surface)", marginBottom: 16, fontSize: 36, letterSpacing: "-0.02em" }}>
            Join thousands of successful students
          </h2>
          <p className="body-lg" style={{ color: "var(--on-surface-variant)", maxWidth: 640, margin: "0 auto 48px" }}>
            See how students are reaching their academic goals with AI Tutor.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24, marginBottom: 48, textAlign: "left" }}>
            {SUCCESS_STORIES.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} data-reveal data-reveal-delay={i * 120} className="lumina-card" style={{ padding: 32, background: "var(--surface-container-low)" }}>
                <div style={{ width: 48, height: 48, borderRadius: "var(--radius-lg)", background: "var(--primary-container)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <Icon size={24} color="var(--on-primary-container)" />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--on-surface)", marginBottom: 12 }}>{title}</h3>
                <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>{desc}</p>
              </div>
            ))}
          </div>

          <Link to="/register" className="btn-primary" style={{ padding: "16px 32px", fontSize: 18, borderRadius: "var(--radius-full)" }}>
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════ */}
      <footer style={{ background: "var(--surface-container-lowest)", padding: "48px var(--spacing-stack-md)", borderTop: "1px solid var(--surface-container-highest)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <GraduationCap size={20} color="var(--primary)" />
              <span style={{ fontWeight: 800, fontSize: 18, color: "var(--on-surface)" }}>Lumina Academic</span>
            </div>
            <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>
              © {new Date().getFullYear()} Lumina Academic. Study Smarter.
            </p>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Help Center"].map(link => (
              <a key={link} href="#" style={{ fontSize: 14, fontWeight: 600, color: "var(--outline)", textDecoration: "none" }}>{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

