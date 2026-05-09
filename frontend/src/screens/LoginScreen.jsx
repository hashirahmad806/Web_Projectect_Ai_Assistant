import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck, GraduationCap } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function LoginScreen({ setAuthToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".auth-element", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }, formRef);
    return () => ctx.revert();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (setAuthToken) setAuthToken(data.token);

      // Flash success, then redirect
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div ref={formRef} className="w-full max-w-md p-8 rounded-3xl"
        style={{
          background: "linear-gradient(135deg, #1a2744 0%, #0f1e38 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
        }}>
        
        {/* Header */}
        <div className="auth-element flex flex-col items-center mb-8 text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
            <GraduationCap size={28} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome Back
          </h2>
          <p className="text-slate-400 text-sm mt-2">Sign in to sync your AI study history.</p>
        </div>

        {error && (
          <div className="auth-element mb-6 p-3 rounded-xl flex items-start gap-2 text-sm text-red-400"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <ShieldCheck size={18} className="flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="auth-element space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-slate-500" />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                placeholder="student@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-element space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Password</label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={16} className="text-slate-500" />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="auth-element w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 mt-2"
            style={{ 
              background: "linear-gradient(135deg, #22C55E, #0EA5E9)", 
              opacity: loading ? 0.7 : 1,
              boxShadow: "0 4px 16px rgba(34,197,94,0.25)"
            }}
          >
            {loading ? "Signing in..." : (
              <>Sign In <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <p className="auth-element text-center text-sm text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-400 font-bold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
