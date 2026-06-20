/**
 * LoginScreen.jsx
 * Redesigned sign-in page matching exactly the EduFlow AI template design (from assets/regiester/code.html).
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function LoginScreen({ setAuthToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (setAuthToken) setAuthToken(data.token);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background font-body-md text-on-surface overflow-x-hidden" style={{ minHeight: "100vh" }}>
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          vertical-align: middle;
        }
        .glass-effect {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .hero-gradient {
          background: radial-gradient(circle at top left, #50e3a415, transparent),
                      radial-gradient(circle at bottom right, #494bd610, transparent);
        }
      `}</style>

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-5 md:px-[64px] py-4">
          <Link to="/" className="font-headline-md text-[24px] font-bold text-primary flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            EduFlow AI
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-[16px] no-underline" href="#">Features</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-[16px] no-underline" href="#">CS Tools</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-[16px] no-underline" href="#">Data Science</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-[16px] no-underline" href="#">Pricing</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link className="text-on-surface-variant hover:text-primary font-body-md text-[16px] no-underline" to="/register">Sign Up</Link>
            <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-bold transition-colors shadow-sm border-none cursor-pointer hover:scale-[0.98]">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="min-h-screen flex items-center justify-center pt-24 pb-stack-lg hero-gradient">
        <div className="max-w-[1280px] w-full px-5 md:px-[64px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mx-auto">
          {/* Left Column: Branding/Value Prop */}
          <div className="hidden lg:flex flex-col gap-8">
            <div className="space-y-4">
              <h1 className="font-display-lg text-[48px] font-[800] leading-[1.1] tracking-[-0.02em] text-on-surface m-0">
                Master any subject with <span className="text-primary italic">AI-guided</span> precision.
              </h1>
              <p className="font-body-lg text-[18px] leading-[1.6] text-on-surface-variant max-w-lg m-0 mt-4">
                Join over 50,000 students using EduFlow AI to personalize their learning journeys and achieve academic excellence.
              </p>
            </div>
            {/* Bento-style visual decoration */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-surface-container-high p-6 rounded-[16px] shadow-sm border border-outline-variant/30 flex flex-col gap-2">
                <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
                <p className="font-label-caps text-[12px] font-[700] tracking-[0.05em] uppercase text-primary m-0 mt-1">PERSONALIZED FEEDBACK</p>
                <p className="font-body-md text-[16px] font-bold m-0 mt-1">Instant code & essay reviews</p>
              </div>
              <div className="bg-primary-container p-6 rounded-[16px] shadow-sm flex flex-col gap-2">
                <span className="material-symbols-outlined text-on-primary-container text-3xl">timeline</span>
                <p className="font-label-caps text-[12px] font-[700] tracking-[0.05em] uppercase text-on-primary-container m-0 mt-1">PROGRESS TRACKING</p>
                <p className="font-body-md text-[16px] font-bold text-on-primary-container m-0 mt-1">Visualize your growth path</p>
              </div>
            </div>
          </div>

          {/* Right Column: Login Card */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-surface-container-lowest p-8 md:p-10 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20 relative overflow-hidden" style={{ borderRadius: "24px" }}>
              {/* Subtle Shimmer on container */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-tertiary opacity-40"></div>
              
              <div className="space-y-2 mb-8">
                <h2 className="font-headline-md text-[24px] font-[700] leading-[1.3] text-on-surface m-0 mb-2">Welcome Back</h2>
                <p className="font-body-md text-[16px] text-on-surface-variant m-0">Access your AI learning companion.</p>
              </div>

              {error && (
                <div className="mb-6 p-3 rounded-xl flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200">
                  <p className="m-0 font-bold">{error}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5 flex flex-col gap-5">
                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant hover:bg-surface-container transition-all active:scale-95 duration-200 bg-transparent cursor-pointer">
                    <img className="w-5 h-5" alt="Google" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfeBzyryu-y0hdG9xFa3nxyyryzxNdmAz0-VwSDkywNyb6OAQninmRUmEz49JigR49vxe8BkQyWqhPlLeROaO-C4H96XjFRAnO3AFbG7rgf6tnGgE_NhJmPA8rTiEHElP7Rd0W-1sFSvXYRbzlL6wU1o4wnmAVrK0-EG_6U2ZOoexSvAPfkGxTDp-wruEn-2f1yGym5Kib_fXvnUQCwzmxHN35wVqN92Rx34rBuRiPfWzrIvkfz0cK6eIIBeWtLFQwHDTyF8Gi10K2"/>
                    <span className="font-label-caps text-[12px] font-[700] tracking-[0.05em] uppercase">Google</span>
                  </button>
                  <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant hover:bg-surface-container transition-all active:scale-95 duration-200 bg-transparent cursor-pointer">
                    <img className="w-5 h-5" alt="GitHub" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiHwgKU55lBxJS1HiTRRqN6m8TWKRksIfg-HphSdA7RhFNfEgUPzODVqlvyhu2CETYv9-tr5zhtTQlg7tpfg9svKgim0D328Ksm0p2oY8rdlClQhxGYA-JzTDbBNcStxEULkwQImYPjIYB3hOffAtorCOcx-27t6T_9DIGQR-eIFN25ZO_ZbUxggbMx3eTi9KK2BzbpU0ZY9V5olsm0JugAgFGSiNkmlzrzYCC-sgxKgGHeA-Hw5n5nHEe40sdwb5zdV0t4CjmgnXn"/>
                    <span className="font-label-caps text-[12px] font-[700] tracking-[0.05em] uppercase">GitHub</span>
                  </button>
                </div>

                <div className="relative flex items-center justify-center mb-4">
                  <hr className="w-full border-t border-outline-variant m-0"/>
                  <span className="absolute px-4 bg-surface-container-lowest text-[12px] font-[700] tracking-[0.05em] text-on-surface-variant">OR EMAIL</span>
                </div>

                {/* Inputs */}
                <div className="space-y-4 flex flex-col gap-4">
                  <div>
                    <label className="block font-label-caps text-[12px] font-[700] tracking-[0.05em] text-on-surface-variant mb-2" htmlFor="email">EMAIL ADDRESS</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ pointerEvents: 'none' }}>mail</span>
                      <input 
                        className="w-full pl-12 pr-4 py-3 bg-surface-bright border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-[16px]" 
                        id="email" 
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="student@university.edu"
                        style={{ boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="font-label-caps text-[12px] font-[700] tracking-[0.05em] text-on-surface-variant" htmlFor="password">PASSWORD</label>
                      <a className="font-label-caps text-[12px] text-primary font-bold hover:underline" href="#">FORGOT?</a>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ pointerEvents: 'none' }}>lock</span>
                      <input 
                        className="w-full pl-12 pr-4 py-3 bg-surface-bright border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-[16px]" 
                        id="password" 
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{ boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary" id="remember" type="checkbox"/>
                  <label className="font-body-md text-[16px] text-on-surface-variant" htmlFor="remember">Keep me signed in</label>
                </div>

                {/* Primary Action */}
                <button 
                  className="w-full group relative overflow-hidden py-4 bg-primary text-on-primary rounded-xl font-headline-md text-[24px] font-[700] shadow-md hover:shadow-lg transition-all active:scale-[0.98] duration-200 border-none cursor-pointer mt-4" 
                  type="submit"
                  disabled={loading}
                >
                  <div className="shimmer absolute inset-0 opacity-20 pointer-events-none"></div>
                  <span className="relative z-10">{loading ? "Signing In..." : "Sign In"}</span>
                </button>
              </form>
              <p className="mt-8 text-center font-body-md text-[16px] text-on-surface-variant">
                By signing in, you agree to our <a className="underline text-primary" href="#">Academic Integrity</a> policy.
              </p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
