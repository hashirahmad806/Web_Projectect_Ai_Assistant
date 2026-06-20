/**
 * StudentComments.jsx
 * Displays community-style comment cards from fellow students.
 * Updated to use Lumina Academic design tokens with profile images.
 */

const COMMENTS = [
  {
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXM7tTJ9mlIuAvIcXi_F7bc-nO4GwnyHFLUFtRxzfskZot9oyHd95PNnVaBddK1b8J-68WxCywv2Hh9RuYaW8R4Q0ZWsKrq8dQWcKk8cVSSWX1gLQKRc7wF9F1z5pp0M6CNgvguH1IIjyyEv2Dmvn_HgCy--z8aVkqsrbMt1li8WWFzqyiH_Q-bXpg_ZrAZ7Gu1RD6YPmqaLzRVQI0anDnc-31rYfXN_va62p3-loTo3VJ56OWRqn2MYkhgNPcYj7VLKeOn07PG9Ty",
    name: "Ali Hassan",
    course: "CS Final Year",
    time: "2 hours ago",
    text: "This AI explained recursion better than my professor! I finally understand base cases. Highly recommend for DSA topics.",
    likes: 24,
    tag: "chip-purple",
    tagLabel: "Computer Science",
  },
  {
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlCD55xwUE0aijhgvD8hwjkT3tt2HKMEoOZTLYOHZjkB-I0y5iliLFCe_U04LbQuEB2tsvNk19Q7vEH-bjBgmfAKuhHMuyZTxXmAGkW1vR4oVoccGbCZrW5qvG424P9kH38oigdFWi2K0J5ZKxUvgSgFl1JyfObqZeHpWD0d-blAgO6cy3PE96d1QM222BYbv6WMlxlmtjFCQ_TUEh_WgnfrndyYqmtNcSvvK6xNI59jIfU4LOh6morUNhPu6bP_zr7DJuk4I75rlg",
    name: "Sara Khan",
    course: "Physics 2nd Year",
    time: "5 hours ago",
    text: "Uploaded a photo of my thermodynamics question and got a full step-by-step solution in seconds. The vision mode is 🔥",
    likes: 31,
    tag: "chip-cyan",
    tagLabel: "Physics",
  },
  {
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0bL84cVEOG7rjhparGvhVFWrdE4u-ALMovL2ndMM3RHVTzCE8uuQv5iPcbPrFZex9AGnkpPf2WPu2E-GCm_ov1UD1kUbeIxaHaDV_SiquM0uX8CIGJYNs-_rH_fERT4m-GcKlE4SQn477wgtf7CR4dEsFNl-WQW6qHbSUEjB9Oqjr1v4cauN8ptc3NZe0V8dwgQf-nMmldGF0d-Rl5Gws3NjQ_onhpSkMrA8qoKDPav6c34yqU07obIPiKTRFc550gZS7_SaVkCto",
    name: "Usman Tariq",
    course: "Pre-Medical",
    time: "Yesterday",
    text: "Used voice mode to ask questions while commuting. Perfect for revision on the go. Krebs cycle has never been clearer!",
    likes: 18,
    tag: "chip-green",
    tagLabel: "Biology",
  },
  {
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfeBzyryu-y0hdG9xFa3nxyyryzxNdmAz0-VwSDkywNyb6OAQninmRUmEz49JigR49vxe8BkQyWqhPlLeROaO-C4H96XjFRAnO3AFbG7rgf6tnGgE_NhJmPA8rTiEHElP7Rd0W-1sFSvXYRbzlL6wU1o4wnmAVrK0-EG_6U2ZOoexSvAPfkGxTDp-wruEn-2f1yGym5Kib_fXvnUQCwzmxHN35wVqN92Rx34rBuRiPfWzrIvkfz0cK6eIIBeWtLFQwHDTyF8Gi10K2",
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {COMMENTS.map(({ avatar, name, course, time, text, likes, tag, tagLabel }) => (
          <article
            key={name}
            className="lumina-card"
            style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12, borderRadius: "var(--radius-lg)" }}
          >
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src={avatar}
                alt={name}
                style={{
                  width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0,
                  border: "2px solid var(--primary-container)",
                }}
              />
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
