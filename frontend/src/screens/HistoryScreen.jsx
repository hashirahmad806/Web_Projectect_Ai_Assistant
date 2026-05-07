/**
 * HistoryScreen.jsx
 * Displays all saved study sessions from the MongoDB backend.
 * Shows the session title, last question, subject tag, and timestamp.
 * Students can use this for revision before exams.
 */

import { useEffect, useState } from "react";
import { History, BookOpen, Clock, RefreshCw, Bot } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
console.log(API_BASE);

/* ── Colour cycling for session cards ─────────────────── */
const CARD_STYLES = [
  {
    border: "rgba(99,102,241,0.25)",
    bg: "rgba(99,102,241,0.07)",
    dot: "#818cf8",
  },
  {
    border: "rgba(6,182,212,0.25)",
    bg: "rgba(6,182,212,0.07)",
    dot: "#67e8f9",
  },
  {
    border: "rgba(16,185,129,0.25)",
    bg: "rgba(16,185,129,0.07)",
    dot: "#6ee7b7",
  },
  {
    border: "rgba(245,158,11,0.25)",
    bg: "rgba(245,158,11,0.07)",
    dot: "#fcd34d",
  },
  {
    border: "rgba(239,68,68,0.20)",
    bg: "rgba(239,68,68,0.06)",
    dot: "#fca5a5",
  },
];

/* ── Skeleton loader card ──────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="glass rounded-2xl border border-white/5 p-5 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="shimmer h-9 w-9 rounded-full" />
        <div className="flex-1 space-y-1.5">
          <div className="shimmer h-3.5 w-2/3 rounded-full" />
          <div className="shimmer h-2.5 w-1/3 rounded-full" />
        </div>
        <div className="shimmer h-5 w-16 rounded-full" />
      </div>
      <div className="shimmer h-3 w-full rounded-full" />
      <div className="shimmer h-3 w-5/6 rounded-full" />
    </div>
  );
}

/* ── Empty state ───────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="glass rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          background: "rgba(99,102,241,0.1)",
          border: "1px solid rgba(99,102,241,0.2)",
        }}
      >
        <History size={28} className="text-indigo-400" />
      </div>
      <div>
        <p className="text-base font-bold text-slate-200">
          No study history yet
        </p>
        <p className="text-sm text-slate-500 mt-1 max-w-sm leading-6">
          Start a chat, use voice mode, or upload an image — your study sessions
          will appear here automatically.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-1">
        {["💬 Start Chatting", "🎤 Voice Mode", "📷 Upload Image"].map(
          (label) => (
            <span key={label} className="chip chip-purple">
              {label}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/history`);
      const data = await res.json();
      setHistory(data.history || []);
    } catch {
      setError(
        "Could not load history. Make sure the backend server is running.",
      );
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="animate-fade-in space-y-4">
      {/* ── Header ───────────────────────────────────── */}
      <div className="glass-strong rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg,#d97706,#ea580c)",
              boxShadow: "0 0 16px rgba(245,158,11,0.4)",
            }}
          >
            <History size={18} className="text-white" />
          </div>
          <div>
            <h2
              className="text-sm font-bold text-slate-100"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
            >
              Study History
            </h2>
            <p className="text-xs text-slate-500">
              All your saved sessions for revision
            </p>
          </div>
        </div>
        <button
          onClick={loadHistory}
          className="btn-secondary flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs"
        >
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      {/* ── Stats row ─────────────────────────────────── */}
      {!loading && history.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="glass rounded-2xl border border-white/5 p-3 text-center">
            <p className="text-xl font-extrabold gradient-text">
              {history.length}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Sessions</p>
          </div>
          <div className="glass rounded-2xl border border-white/5 p-3 text-center">
            <p className="text-xl font-extrabold gradient-text">
              {new Set(history.map((h) => h.title?.split(" ")[0])).size}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Topics</p>
          </div>
          <div className="glass rounded-2xl border border-white/5 p-3 text-center">
            <p className="text-xl font-extrabold gradient-text">
              {history.length > 0
                ? new Date(history[0].updatedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })
                : "—"}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Last Active</p>
          </div>
        </div>
      )}

      {/* ── Error ─────────────────────────────────────── */}
      {error && (
        <div
          className="rounded-2xl border border-red-500/20 p-4 text-sm text-red-400"
          style={{ background: "rgba(239,68,68,0.06)" }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* ── Skeleton loaders ──────────────────────────── */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      )}

      {/* ── Empty state ────────────────────────────────── */}
      {!loading && !error && history.length === 0 && <EmptyState />}

      {/* ── Session cards ─────────────────────────────── */}
      {!loading && history.length > 0 && (
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 px-1">
            Recent sessions
          </p>
          {history.map((item, idx) => {
            const style = CARD_STYLES[idx % CARD_STYLES.length];
            return (
              <article
                key={item._id}
                className="card-hover rounded-2xl border p-5 space-y-3"
                style={{ borderColor: style.border, background: style.bg }}
              >
                {/* Card header */}
                <div className="flex items-start gap-3">
                  {/* Session icon */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: `${style.dot}22`,
                      border: `1px solid ${style.dot}55`,
                    }}
                  >
                    <Bot size={15} style={{ color: style.dot }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-100 truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock size={10} className="text-slate-600" />
                      <span className="text-[10px] text-slate-500">
                        {new Date(item.updatedAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <span
                    className="chip shrink-0"
                    style={{
                      background: `${style.dot}22`,
                      color: style.dot,
                      borderColor: `${style.dot}44`,
                    }}
                  >
                    Session {idx + 1}
                  </span>
                </div>

                {/* Last question */}
                {item.lastQuestion && (
                  <div
                    className="rounded-xl border border-white/5 px-3 py-2.5"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <BookOpen size={10} className="text-slate-600" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                        Last question
                      </span>
                    </div>
                    <p className="text-xs leading-5 text-slate-300 line-clamp-2">
                      {item.lastQuestion}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* ── Exam tip ──────────────────────────────────── */}
      <div className="glass rounded-2xl border border-white/5 p-4 flex items-start gap-3 text-xs text-slate-500">
        <span className="text-lg shrink-0">💡</span>
        <p className="leading-5">
          <span className="text-slate-300 font-semibold">Exam Tip:</span> Use
          Study History to quickly revisit concepts before a test. Each session
          saves your questions and AI answers automatically.
        </p>
      </div>
    </div>
  );
}
