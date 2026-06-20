/**
 * RegisterScreen.jsx
 * Redesigned sign-up page matching exactly the EduFlow AI template design (from assets/loginpage/code.html).
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function RegisterScreen({ setAuthToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
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
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col overflow-x-hidden">
      <style>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          vertical-align: middle;
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(80, 227, 164, 0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .hover-scale { transition: transform 0.2s ease; }
        .hover-scale:active { transform: scale(0.98); }
      `}</style>

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-5 md:px-[64px] py-4">
          <Link to="/" className="font-headline-md text-[24px] font-bold text-primary" style={{ textDecoration: 'none' }}>
            EduFlow AI
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-[16px] no-underline" href="#">Features</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-[16px] no-underline" href="#">CS Tools</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-[16px] no-underline" href="#">Data Science</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-[16px] no-underline" href="#">Pricing</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link className="text-on-surface-variant hover:text-primary font-body-md text-[16px] no-underline" to="/login">Sign In</Link>
            <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-bold hover-scale transition-colors shadow-sm border-none cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow pt-24 md:pt-32 flex items-center justify-center relative overflow-hidden">
        {/* Atmospheric Background Decoration */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-[1280px] mx-auto px-5 md:px-[64px] w-full grid md:grid-cols-2 gap-[48px] items-center relative z-10">
          
          {/* Hero Area (Left) */}
          <div className="hidden md:flex flex-col space-y-[24px] pr-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-container/20 border border-primary/10 rounded-full w-fit gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
              <span className="text-[12px] font-[700] tracking-[0.05em] uppercase text-primary">ACADEMIC EXCELLENCE</span>
            </div>
            <h1 className="font-display-lg text-[48px] font-[800] leading-[1.1] tracking-[-0.02em] text-on-background m-0">
              Start your journey to <br/>
              <span className="text-primary italic">academic excellence.</span>
            </h1>
            <p className="font-body-lg text-[18px] text-on-surface-variant max-w-lg leading-[1.6] m-0">
              Join a vibrant community of over 50,000 students and researchers using EduFlow AI to master complex subjects and accelerate their publication workflow.
            </p>
            {/* Trust Badge / Testimonial Mini-Card */}
            <div className="flex items-center space-x-4 pt-[12px] gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-surface bg-gray-200 overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Student" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXM7tTJ9mlIuAvIcXi_F7bc-nO4GwnyHFLUFtRxzfskZot9oyHd95PNnVaBddK1b8J-68WxCywv2Hh9RuYaW8R4Q0ZWsKrq8dQWcKk8cVSSWX1gLQKRc7wF9F1z5pp0M6CNgvguH1IIjyyEv2Dmvn_HgCy--z8aVkqsrbMt1li8WWFzqyiH_Q-bXpg_ZrAZ7Gu1RD6YPmqaLzRVQI0anDnc-31rYfXN_va62p3-loTo3VJ56OWRqn2MYkhgNPcYj7VLKeOn07PG9Ty"/>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-surface bg-gray-200 overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Student" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlCD55xwUE0aijhgvD8hwjkT3tt2HKMEoOZTLYOHZjkB-I0y5iliLFCe_U04LbQuEB2tsvNk19Q7vEH-bjBgmfAKuhHMuyZTxXmAGkW1vR4oVoccGbCZrW5qvG424P9kH38oigdFWi2K0J5ZKxUvgSgFl1JyfObqZeHpWD0d-blAgO6cy3PE96d1QM222BYbv6WMlxlmtjFCQ_TUEh_WgnfrndyYqmtNcSvvK6xNI59jIfU4LOh6morUNhPu6bP_zr7DJuk4I75rlg"/>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-surface bg-gray-200 overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Researcher" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0bL84cVEOG7rjhparGvhVFWrdE4u-ALMovL2ndMM3RHVTzCE8uuQv5iPcbPrFZex9AGnkpPf2WPu2E-GCm_ov1UD1kUbeIxaHaDV_SiquM0uX8CIGJYNs-_rH_fERT4m-GcKlE4SQn477wgtf7CR4dEsFNl-WQW6qHbSUEjB9Oqjr1v4cauN8ptc3NZe0V8dwgQf-nMmldGF0d-Rl5Gws3NjQ_onhpSkMrA8qoKDPav6c34yqU07obIPiKTRFc550gZS7_SaVkCto"/>
                </div>
              </div>
              <p className="text-[16px] font-body-md text-on-surface-variant m-0">
                <span className="font-bold text-on-surface">50k+</span> Researchers onboarded
              </p>
            </div>
          </div>

          {/* Registration Card (Right) */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[32px] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.03)] w-full max-w-[480px] relative overflow-hidden">
              {/* Top Link */}
              <div className="absolute top-8 right-10 hidden sm:block">
                <Link className="text-[16px] font-body-md text-primary hover:underline no-underline" to="/login">Sign In</Link>
              </div>
              
              <div className="mb-[24px]">
                <h2 className="font-headline-md text-[24px] font-[700] text-on-surface mb-2 m-0 mt-4">Create Your Account</h2>
                <p className="text-[16px] font-body-md text-on-surface-variant m-0">Join the next generation of researchers today.</p>
              </div>

              {error && (
                <div className="mb-6 p-3 rounded-xl flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200">
                  <p className="m-0 font-bold">{error}</p>
                </div>
              )}

              {/* Social Sign-up */}
              <div className="grid grid-cols-2 gap-4 mb-[24px]">
                <button type="button" className="flex items-center justify-center space-x-3 py-3 px-4 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors hover-scale bg-transparent cursor-pointer">
                  <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEqlj2NENNNiRlPKENKnYFswcTHYdPTpJvpJbwkZMK_efG_CdOxH8AQWrovAX3LmX1Syx0JyRYvvdUvaBCvbTC1t2Pl3d3uujsn-jFbGuazN2S6qQ498bzFUu9_D-XQM6QT-jKfFmV4tjWHFGbPyhHPAzCFLa2GdB7b9HKZvqDoPB233h-2ETrZIAn14ptqnIkh4BYYNbgTmPuSL3P4zTTnGMEz_M94M3Y-jQWJzPKn6s8F93-mlLPdjuMUYocxCK5HOpsNyigdxhY"/>
                  <span className="text-[12px] font-[700] tracking-[0.05em] uppercase text-on-surface">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center space-x-3 py-3 px-4 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors hover-scale bg-transparent cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                  <span className="text-[12px] font-[700] tracking-[0.05em] uppercase text-on-surface">GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center mb-[24px]">
                <div className="flex-grow border-t border-outline-variant"></div>
                <span className="flex-shrink mx-4 text-[12px] font-[700] tracking-[0.05em] uppercase text-outline">OR CONTINUE WITH EMAIL</span>
                <div className="flex-grow border-t border-outline-variant"></div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleRegister} className="space-y-4 flex flex-col gap-4">
                <div>
                  <label className="block text-[12px] font-[700] tracking-[0.05em] uppercase text-on-surface-variant mb-2 ml-1">FULL NAME</label>
                  <input 
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all font-body-md text-[16px]" 
                    placeholder="John Doe" 
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-[700] tracking-[0.05em] uppercase text-on-surface-variant mb-2 ml-1">UNIVERSITY EMAIL ADDRESS</label>
                  <input 
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all font-body-md text-[16px]" 
                    placeholder="john.doe@university.edu" 
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-[700] tracking-[0.05em] uppercase text-on-surface-variant mb-2 ml-1">PASSWORD</label>
                  <div className="relative">
                    <input 
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all font-body-md text-[16px]" 
                      placeholder="••••••••" 
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={{ boxSizing: "border-box" }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3 text-outline hover:text-on-surface bg-transparent border-none cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-start space-x-3 pt-2 gap-3">
                  <input className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" id="terms" type="checkbox" required/>
                  <label className="text-[16px] font-body-md text-on-surface-variant leading-snug m-0" htmlFor="terms">
                    I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Academic Integrity Policy</a>.
                  </label>
                </div>

                {/* Primary Action */}
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 mt-2 bg-primary-container text-[16px] text-on-primary-container font-bold rounded-xl hover-scale transition-all shadow-md relative overflow-hidden group border-none cursor-pointer"
                >
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10">{loading ? "Creating Account..." : "Create Account"}</span>
                </button>
              </form>

              {/* Mobile Only Login Link */}
              <div className="mt-6 text-center sm:hidden">
                <p className="text-[16px] font-body-md text-on-surface-variant">
                  Already have an account? <Link className="text-primary font-bold no-underline" to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
