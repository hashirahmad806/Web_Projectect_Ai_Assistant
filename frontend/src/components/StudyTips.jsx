/**
 * StudyTips.jsx
 * Sidebar widget showing daily study tips and quick-access resources.
 * Helps students discover how to use each feature of the AI assistant.
 */

const TIPS = [
  {
    icon: "💡",
    color: "tip-purple",
    label: "Pro Tip",
    text: "Break big topics into small questions. Ask one concept at a time for clearer answers.",
  },
  {
    icon: "📸",
    color: "tip-cyan",
    label: "Vision Mode",
    text: "Snap your textbook page or handwritten notes and upload it — the AI reads images!",
  },
  {
    icon: "🎤",
    color: "tip-green",
    label: "Voice Mode",
    text: "Speak naturally. Use Chrome or Edge for best microphone support.",
  },
  {
    icon: "📚",
    color: "tip-amber",
    label: "Study History",
    text: "All your questions are saved. Revisit them before exams for quick revision.",
  },
];

const SUBJECTS = [
  { label: "Mathematics",  chip: "chip-purple", emoji: "📐" },
  { label: "Physics",      chip: "chip-cyan",   emoji: "⚛️" },
  { label: "Chemistry",    chip: "chip-green",  emoji: "🧪" },
  { label: "Biology",      chip: "chip-amber",  emoji: "🧬" },
  { label: "Computer Sci", chip: "chip-purple", emoji: "💻" },
  { label: "History",      chip: "chip-cyan",   emoji: "📜" },
  { label: "English",      chip: "chip-green",  emoji: "✍️" },
  { label: "Economics",    chip: "chip-amber",  emoji: "📊" },
];

export default function StudyTips() {
  return (
    <div className="space-y-5">
      {/* ── Quick Subjects ─────────────────────────── */}
      <div className="glass rounded-2xl p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
          Ask about any subject
        </p>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map(({ label, chip, emoji }) => (
            <span key={label} className={`chip ${chip}`}>
              {emoji} {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Tips List ─────────────────────────────── */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">
          Tips for students
        </p>
        {TIPS.map(({ icon, color, label, text }) => (
          <div
            key={label}
            className={`${color} card-hover rounded-2xl border p-4`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{icon}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {label}
              </span>
            </div>
            <p className="text-xs leading-5 text-slate-300">{text}</p>
          </div>
        ))}
      </div>

      {/* ── How It Works ──────────────────────────── */}
      <div className="glass rounded-2xl p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
          How it works
        </p>
        <ol className="space-y-3">
          {[
            { step: "1", text: "Type, speak, or upload an image of your question" },
            { step: "2", text: "AI analyses and explains it step-by-step" },
            { step: "3", text: "Review the answer and ask follow-ups" },
            { step: "4", text: "Come back later via Study History" },
          ].map(({ step, text }) => (
            <li key={step} className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {step}
              </span>
              <span className="text-xs leading-5 text-slate-300">{text}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
