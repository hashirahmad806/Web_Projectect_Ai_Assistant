/**
 * ChatScreen.jsx
 * AI chat interface — send text questions and receive formatted AI replies.
 * Features: message history, loading dots, suggested questions, copy support.
 */

import { useRef, useState, useEffect } from "react";
import { SendHorizontal, Bot, Lightbulb, RotateCcw } from "lucide-react";
import gsap from "gsap";
import FormattedReply from "../components/FormattedReply";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* ── Suggested starter questions ──────────────────────── */
const SUGGESTIONS = [
  "Explain Newton's 3rd law with examples",
  "How does photosynthesis work step by step?",
  "Solve: If 2x + 5 = 13, what is x?",
  "What causes inflation in an economy?",
  "Explain the difference between RAM and ROM",
  "Summarise the French Revolution in 5 points",
];

export default function ChatScreen() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".chat-anim", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const [question, setQuestion] = useState("");
  const [messages, setMessages]  = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm your AI study assistant. Ask me anything — maths, science, history, programming, or any subject you're studying. I'll explain it step by step!",
    },
  ]);
  const [loading, setLoading]    = useState(false);
  const bottomRef                = useRef(null);

  /* Auto-scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ── Send a message ────────────────────────────────── */
  const sendMessage = async (text) => {
    const content = text.trim();
    if (!content || loading) return;

    setMessages((prev) => [...prev, { role: "user", content }]);
    setQuestion("");
    setLoading(true);

    try {
      const res  = await fetch(`${API_BASE}/chat`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ sessionId: "default-session", studentName: "Student", message: content }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "No response received." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Server not reachable. Make sure the backend is running on port 5000." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(question); };
  const clearChat    = () => setMessages([{ role: "assistant",
    content: "Chat cleared! Ask me a new question 😊" }]);

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      {/* ── Header ───────────────────────────────────── */}
      <div className="chat-anim glass-strong rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm" style={{ background: "var(--primary)" }}>
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Playfair Display',sans-serif" }}>
              AI Chat Tutor
            </h2>
            <p className="text-xs text-slate-500">Ask any study question</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-online">AI Ready</span>
          <button onClick={clearChat} title="Clear chat"
            className="btn-secondary flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs">
            <RotateCcw size={13} /> Clear
          </button>
        </div>
      </div>

      {/* ── Suggested questions ───────────────────────── */}
      {messages.length <= 1 && (
        <div className="chat-anim glass rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={14} className="text-amber-500" />
            <p className="text-xs font-semibold text-slate-600">Try asking…</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => sendMessage(s)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600
                  hover:border-primary hover:text-primary transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Message thread ────────────────────────────── */}
      <div className="chat-anim glass rounded-2xl border border-slate-200 flex flex-col"
        style={{ minHeight: "380px" }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[55vh]">
          {messages.map((msg, i) => (
            <div key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
              {/* AI avatar */}
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white mt-0.5" style={{ background: "var(--primary)" }}>
                  <Bot size={14} className="text-white" />
                </div>
              )}
              {/* Bubble */}
              <div className={`max-w-[80%] ${
                msg.role === "user" ? "msg-user text-white rounded-2xl px-4 py-3 text-sm" : "msg-ai"
              }`}>
                {msg.role === "user"
                  ? <p className="whitespace-pre-wrap leading-6">{msg.content}</p>
                  : <FormattedReply text={msg.content} />
                }
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "var(--primary)" }}>
                <Bot size={14} className="text-white" />
              </div>
              <div className="msg-ai flex items-center gap-1.5">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── Input form ─────────────────────────────── */}
        <div className="border-t border-slate-200 p-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              className="input-field flex-1 rounded-xl px-4 py-3 text-sm"
              placeholder="Ask a study question… e.g. 'Explain photosynthesis'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
            />
            <button type="submit"
              className="btn-primary flex items-center gap-2 rounded-xl px-5 py-3 text-sm"
              disabled={loading || !question.trim()}>
              <SendHorizontal size={16} />
              <span className="hidden sm:inline">{loading ? "Thinking…" : "Send"}</span>
            </button>
          </form>
          <p className="text-[10px] text-slate-600 mt-2 text-center">
            AI can make mistakes — always verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
