/**
 * ImageScreen.jsx
 * Upload a photo of a homework problem or textbook page.
 * The image is compressed then sent to the Groq vision API.
 * AI returns a structured explanation shown via FormattedReply.
 */

import { useState } from "react";
import { Camera, Upload, Sparkles, ImageIcon, X } from "lucide-react";
import FormattedReply from "../components/FormattedReply";
import { compressImageForVision } from "../utils/imageCompress";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* ── Usage tips ────────────────────────────────────────── */
const TIPS = [
  { emoji: "📐", text: "Maths problems — algebra, geometry, calculus" },
  { emoji: "🧪", text: "Chemistry equations & lab diagrams" },
  { emoji: "📄", text: "Printed or handwritten notes" },
  { emoji: "📖", text: "Textbook pages with diagrams" },
  { emoji: "📝", text: "Past paper questions" },
];

export default function ImageScreen() {
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [question, setQuestion] = useState("");
  const [result, setResult]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  /* ── File select ─────────────────────────────────────── */
  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setResult("");
    setError("");
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResult("");
    setError("");
  };

  /* ── Submit ─────────────────────────────────────────── */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || loading) return;

    setLoading(true);
    setResult("");
    setError("");

    try {
      const prepared = await compressImageForVision(file);
      const form     = new FormData();
      form.append("image",     prepared);
      form.append("question",  question);
      form.append("sessionId", "default-session");

      const res = await fetch(`${API_BASE}/upload`, { method: "POST", body: form });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Upload failed.");
      }
      const data = await res.json();
      setResult(data.reply || "No answer returned.");
    } catch (err) {
      setError(err.message || "Vision endpoint not reachable. Start the backend and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-4">
      {/* ── Header ───────────────────────────────────── */}
      <div className="glass-strong rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glow-accent"
            style={{ background: "linear-gradient(135deg,#0891b2,#0e7490)" }}>
            <Camera size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Vision Solver
            </h2>
            <p className="text-xs text-slate-500">Upload a problem image — AI reads and explains it</p>
          </div>
        </div>
        <span className="chip chip-cyan">Groq Vision</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        {/* ── Left: Upload zone ─────────────────────── */}
        <div className="space-y-4">
          <form onSubmit={handleUpload} className="space-y-4">
            {/* Drop zone */}
            <label className="drop-zone glass rounded-2xl cursor-pointer block p-6 text-center transition-all">
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Preview" className="mx-auto max-h-56 rounded-xl object-contain" />
                  <button type="button" onClick={(e) => { e.preventDefault(); clearFile(); }}
                    className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700">
                    <X size={13} />
                  </button>
                  <p className="mt-3 text-xs text-slate-400 truncate">{file?.name}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.2)" }}>
                    <ImageIcon size={26} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">Click to choose an image</p>
                    <p className="text-xs text-slate-500 mt-1">JPG, PNG, WEBP · Large images auto-compressed</p>
                  </div>
                  <span className="chip chip-cyan mt-1">Browse files</span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>

            {/* Optional question */}
            <div className="glass rounded-2xl border border-white/5 p-4 space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Optional — specific question
              </label>
              <textarea
                className="input-field w-full rounded-xl px-3 py-2.5 text-sm resize-none"
                style={{ minHeight: "90px" }}
                placeholder="e.g. 'Solve question 3 step by step' or leave blank for full explanation"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button type="submit" disabled={!file || loading}
              className="btn-primary w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold">
              {loading ? (
                <>
                  <div className="progress-bar w-16 rounded-full overflow-hidden">
                    <div className="progress-bar-fill" />
                  </div>
                  Analysing image…
                </>
              ) : (
                <>
                  <Upload size={16} /> Upload &amp; Solve
                </>
              )}
            </button>
          </form>

          {/* What you can upload */}
          <div className="glass rounded-2xl border border-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
              What you can upload
            </p>
            <div className="space-y-2">
              {TIPS.map(({ emoji, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <span className="text-sm">{emoji}</span>
                  <span className="text-xs text-slate-400">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: AI Answer ───────────────────────── */}
        <div className="glass rounded-2xl border border-white/5 flex flex-col" style={{ minHeight: "420px" }}>
          {/* Answer header */}
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <Sparkles size={15} className="text-cyan-400" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              AI Vision Answer
            </p>
          </div>

          {/* Answer body */}
          <div className="flex-1 overflow-y-auto p-4 max-h-[60vh]">
            {error ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/08 p-4 text-sm text-red-400"
                style={{ background: "rgba(239,68,68,0.08)" }}>
                ⚠️ {error}
              </div>
            ) : result ? (
              <div className="msg-ai">
                <FormattedReply text={result} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3 py-10 text-center">
                <Camera size={36} className="text-slate-700" />
                <p className="text-sm text-slate-500 max-w-xs leading-6">
                  Upload an image of your problem and click{" "}
                  <span className="text-cyan-400 font-semibold">Upload &amp; Solve</span> — the AI will
                  explain it step by step here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
