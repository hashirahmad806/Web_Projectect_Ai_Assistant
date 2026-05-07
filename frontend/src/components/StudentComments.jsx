/**
 * StudentComments.jsx
 * Displays community-style comment cards from fellow students.
 * These show social proof and encourage new students to engage.
 * In a real app these would be fetched from the backend.
 */

const COMMENTS = [
  {
    avatar: "👨‍💻",
    name: "Ali Hassan",
    course: "CS Final Year",
    time: "2 hours ago",
    text: "This AI explained recursion better than my professor! I finally understand base cases. Highly recommend for DSA topics.",
    likes: 24,
    tag: "chip-purple",
    tagLabel: "Computer Science",
  },
  {
    avatar: "👩‍🔬",
    name: "Sara Khan",
    course: "Physics 2nd Year",
    time: "5 hours ago",
    text: "Uploaded a photo of my thermodynamics question and got a full step-by-step solution in seconds. The vision mode is 🔥",
    likes: 31,
    tag: "chip-cyan",
    tagLabel: "Physics",
  },
  {
    avatar: "🧑‍📚",
    name: "Usman Tariq",
    course: "Pre-Medical",
    time: "Yesterday",
    text: "Used voice mode to ask questions while commuting. Perfect for revision on the go. Krebs cycle has never been clearer!",
    likes: 18,
    tag: "chip-green",
    tagLabel: "Biology",
  },
  {
    avatar: "👩‍💼",
    name: "Fatima Malik",
    course: "Commerce A-Levels",
    time: "2 days ago",
    text: "Asked it to explain demand elasticity with examples from Pakistan's economy — it actually gave local examples! Impressed.",
    likes: 15,
    tag: "chip-amber",
    tagLabel: "Economics",
  },
];

export default function StudentComments() {
  return (
    <div className="space-y-4">
      {/* ── Section Header ──────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-100 text-base">
            Student Community
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            What fellow students are saying
          </p>
        </div>
        <span className="badge-online">Live</span>
      </div>

      {/* ── Comment Cards ────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2">
        {COMMENTS.map(({ avatar, name, course, time, text, likes, tag, tagLabel }) => (
          <article
            key={name}
            className="glass card-hover rounded-2xl border border-white/5 p-4 flex flex-col gap-3"
          >
            {/* Header row */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/08 text-xl"
                style={{ background: "rgba(255,255,255,0.08)" }}>
                {avatar}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-100 truncate">{name}</p>
                <p className="text-xs text-slate-500 truncate">{course} · {time}</p>
              </div>
              <span className={`chip ${tag} ml-auto shrink-0`}>{tagLabel}</span>
            </div>

            {/* Comment text */}
            <p className="text-sm leading-6 text-slate-300">"{text}"</p>

            {/* Like row */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>👍</span>
              <span>{likes} students found this helpful</span>
            </div>
          </article>
        ))}
      </div>

      {/* ── CTA ──────────────────────────────────── */}
      <div
        className="rounded-2xl border border-indigo-500/20 p-4 text-center"
        style={{ background: "rgba(99,102,241,0.06)" }}
      >
        <p className="text-sm text-slate-300">
          🎓 Join <span className="font-semibold text-indigo-400">2,400+ students</span> already using AI to study smarter
        </p>
      </div>
    </div>
  );
}
