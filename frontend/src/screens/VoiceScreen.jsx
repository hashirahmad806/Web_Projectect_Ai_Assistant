/**
 * VoiceScreen.jsx
 * Speak a study question using the Web Speech API.
 * Transcript appears live, then is sent to the AI backend on submit.
 * Works best in Chrome / Edge with microphone permissions enabled.
 */

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, SendHorizontal, Bot, Volume2 } from "lucide-react";
import FormattedReply from "../components/FormattedReply";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* ── Tips shown beside the recorder ───────────────────── */
const VOICE_TIPS = [
  { emoji: "🎯", text: "Speak clearly and at a normal pace for best accuracy." },
  { emoji: "🔇", text: "Use in a quiet environment to reduce background noise." },
  { emoji: "📋", text: "Edit the transcript before submitting if recognition made errors." },
  { emoji: "💡", text: "Ask full questions — 'Explain Newton's second law' works better than 'Newton'." },
];

export default function VoiceScreen() {
  const [transcript, setTranscript] = useState("");
  const [status, setStatus]         = useState("idle"); // idle | listening | error
  const [messages, setMessages]     = useState([
    { role: "assistant", content: "🎤 Press **Start Recording** and speak your study question. I'll answer it instantly!" },
  ]);
  const [loading, setLoading]       = useState(false);
  const [supported, setSupported]   = useState(true);
  const recognitionRef              = useRef(null);
  const bottomRef                   = useRef(null);

  /* ── Setup Web Speech API ──────────────────────────── */
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setSupported(false); return; }

    const r = new SR();
    r.continuous      = false;
    r.interimResults  = true;
    r.lang            = "en-US";

    r.onresult = (e) => {
      const text = Array.from(e.results).map((res) => res[0].transcript).join(" ");
      setTranscript(text);
    };
    r.onstart = () => setStatus("listening");
    r.onerror = () => { setStatus("error"); setSupported(false); };
    r.onend   = () => setStatus("idle");

    recognitionRef.current = r;
    return () => r.abort();
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  /* ── Controls ──────────────────────────────────────── */
  const startRecording = () => {
    if (!recognitionRef.current || loading) return;
    setTranscript("");
    try { recognitionRef.current.start(); } catch { /* already running */ }
  };
  const stopRecording = () => {
    if (recognitionRef.current && status === "listening") recognitionRef.current.stop();
  };

  /* ── Submit transcript ─────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transcript.trim() || loading) return;

    const content = transcript.trim();
    setMessages((prev) => [...prev, { role: "user", content }]);
    setLoading(true);

    try {
      const res  = await fetch(`${API_BASE}/chat`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ sessionId: "default-session", studentName: "Student", message: content }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "No response received." }]);
      setTranscript("");
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Server not reachable. Make sure the backend is running on port 5000." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isListening = status === "listening";

  return (
    <div className="animate-fade-in space-y-4">
      {/* ── Header ───────────────────────────────────── */}
      <div className="glass-strong rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl glow-primary"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}>
            <Mic size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Voice Mode
            </h2>
            <p className="text-xs text-slate-500">Speak your question, get instant AI answers</p>
          </div>
        </div>
        <span className={`badge-online ${!supported ? "opacity-50" : ""}`}>
          {supported ? "Speech Ready" : "Unsupported"}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        {/* ── Left: Chat + Recorder ──────────────────── */}
        <div className="space-y-4">
          {/* Message thread */}
          <div className="glass rounded-2xl border border-white/5 flex flex-col" style={{ minHeight: "280px" }}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[40vh]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-700 mt-0.5">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${
                    msg.role === "user" ? "msg-user text-white rounded-2xl px-4 py-3 text-sm" : "msg-ai"
                  }`}>
                    {msg.role === "user"
                      ? <p className="whitespace-pre-wrap leading-6">{msg.content}</p>
                      : <FormattedReply text={msg.content} />}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 justify-start animate-fade-in">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-700">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="msg-ai flex items-center gap-1.5">
                    <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Recorder + transcript */}
          <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/5 p-4 space-y-3">
            {/* Record button */}
            <div className="flex gap-3">
              <button type="button"
                onClick={isListening ? stopRecording : startRecording}
                disabled={!supported || loading}
                className={`relative flex-1 flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold transition-all
                  ${isListening ? "btn-danger recording" : "btn-primary"}`}>
                {isListening ? <MicOff size={17} /> : <Mic size={17} />}
                {isListening ? "Stop Recording" : "Start Recording"}
              </button>
              <button type="submit"
                disabled={!supported || !transcript.trim() || loading}
                className="btn-primary flex items-center gap-2 rounded-xl px-5 py-4 text-sm font-semibold">
                <SendHorizontal size={16} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>

            {/* Live transcript */}
            <textarea
              className="input-field w-full rounded-xl px-4 py-3 text-sm resize-none"
              style={{ minHeight: "100px" }}
              placeholder={supported
                ? "Your spoken words will appear here after recording…"
                : "Speech recognition is unavailable in this browser. Please use Chrome or Edge."}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              disabled={!supported}
            />
            {isListening && (
              <p className="text-xs text-red-400 flex items-center gap-1.5 animate-pulse">
                <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
                Listening… speak your question now
              </p>
            )}
          </form>
        </div>

        {/* ── Right: Voice Tips ──────────────────────── */}
        <div className="space-y-3">
          <div className="glass rounded-2xl border border-white/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Volume2 size={14} className="text-violet-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Voice Tips</p>
            </div>
            <div className="space-y-3">
              {VOICE_TIPS.map(({ emoji, text }) => (
                <div key={text} className="flex items-start gap-2">
                  <span className="text-base shrink-0">{emoji}</span>
                  <p className="text-xs leading-5 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl border border-white/5 p-4 text-center">
            <p className="text-2xl mb-2">🌍</p>
            <p className="text-xs font-semibold text-slate-300 mb-1">English (US)</p>
            <p className="text-[10px] text-slate-500 leading-4">
              Speech recognition is optimised for English. Type your question if your accent causes issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
