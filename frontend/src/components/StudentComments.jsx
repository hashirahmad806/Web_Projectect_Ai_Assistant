/**
 * StudentComments.jsx
 * Displays community-style comment cards from fellow students.
 * Updated to use Lumina Academic design tokens.
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
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* ── Section Header ──────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--on-surface)", margin: 0 }}>
            Student Community
          </h3>
          <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginTop: 3 }}>
            What fellow students are saying
          </p>
        </div>
        <span className="label-caps" style={{ padding: "4px 10px", borderRadius: "var(--radius-full)", background: "var(--primary-container)", color: "var(--on-primary-container)" }}>
          Live
        </span>
      </div>

      {/* ── Comment Cards ────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {COMMENTS.map(({ avatar, name, course, time, text, likes, tag, tagLabel }) => (
          <article
            key={name}
            className="lumina-card"
            style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12, borderRadius: "var(--radius-lg)" }}
          >
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", background: "var(--surface-container-high)", 
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0
              }}>
                {avatar}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--on-surface)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</p>
                <p style={{ fontSize: 12, color: "var(--outline)", margin: 0 }}>{course} · {time}</p>
              </div>
            </div>

            {/* Comment text */}
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--on-surface-variant)", margin: 0 }}>"{text}"</p>

            {/* Like row */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--outline)" }}>
              <span>👍</span>
              <span>{likes} students found this helpful</span>
            </div>
          </article>
        ))}
      </div>

      {/* ── CTA ──────────────────────────────────── */}
      <div style={{
        background: "var(--surface-container)", borderRadius: "var(--radius-lg)", padding: "16px", textAlign: "center",
        border: "1px solid var(--surface-container-highest)"
      }}>
        <p style={{ fontSize: 14, color: "var(--on-surface-variant)", margin: 0 }}>
          🎓 Join <span style={{ fontWeight: 800, color: "var(--primary)" }}>2,400+ students</span> already using AI to study smarter
        </p>
      </div>
    </div>
  );
}
