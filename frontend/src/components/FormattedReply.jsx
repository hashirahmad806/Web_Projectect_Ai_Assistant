/**
 * FormattedReply.jsx
 * Renders an AI reply string as beautifully structured blocks:
 *   - Markdown/plain headings  → styled <section> cards
 *   - Numbered / bullet lists  → ordered list with index badges
 *   - Plain paragraphs         → readable prose
 * Used in ChatScreen, VoiceScreen, and ImageScreen.
 */

export default function FormattedReply({ text }) {
  const lines  = text.split("\n");
  const blocks = [];
  let paraLines = [];
  let listItems = [];

  /* ── Helpers ─────────────────────────────────────── */
  const flushPara = () => {
    if (!paraLines.length) return;
    blocks.push({ type: "paragraph", content: paraLines.join(" ").trim() });
    paraLines = [];
  };
  const flushList = () => {
    if (!listItems.length) return;
    blocks.push({ type: "list", items: [...listItems] });
    listItems = [];
  };

  /* ── Parse lines ─────────────────────────────────── */
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) { flushPara(); flushList(); continue; }

    const numbered = line.match(/^(\d+)\.\s+(.*)$/);
    const bullet   = line.match(/^[-*]\s+(.*)$/);
    const mdHead   = line.match(/^#{1,6}\s+(.*)$/);
    const txtHead  = line.match(/^([A-Za-z][A-Za-z\s]{1,40}):\s*(.*)$/);

    if (numbered) { flushPara(); listItems.push(numbered[2]); continue; }
    if (bullet)   { flushPara(); listItems.push(bullet[1]);   continue; }

    if (mdHead) {
      flushPara(); flushList();
      blocks.push({ type: "heading", title: mdHead[1], content: "" });
      continue;
    }
    if (txtHead) {
      flushPara(); flushList();
      blocks.push({ type: "heading", title: txtHead[1], content: txtHead[2] });
      continue;
    }

    flushList();
    paraLines.push(line);
  }
  flushPara();
  flushList();

  /* ── Fallback ────────────────────────────────────── */
  if (!blocks.length) {
    return (
      <div className="whitespace-pre-wrap break-words leading-[1.6] text-[#1F2937] text-[15px]">
        {text}
      </div>
    );
  }

  /* ── Render blocks ───────────────────────────────── */
  return (
    <div className="space-y-4 break-words leading-[1.6]">
      {blocks.map((block, i) => {
        /* Heading block */
        if (block.type === "heading") {
          return (
            <section
              key={i}
              className="rounded-xl border border-[#BFDBFE] bg-white px-4 py-3"
            >
              <h4 className="text-[15px] font-semibold uppercase tracking-widest text-[#2563EB]">
                {block.title}
              </h4>
              {block.content && (
                <p className="mt-1 text-[15px] text-[#374151]">{block.content}</p>
              )}
            </section>
          );
        }

        /* List block */
        if (block.type === "list") {
          return (
            <ol key={i} className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-[15px] text-[#1F2937]">
                  <span className="mt-[2px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[11px] font-bold text-white">
                    {j + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          );
        }

        /* Paragraph block */
        return (
          <p key={i} className="text-[15px] leading-[1.6] text-[#1F2937]">
            {block.content}
          </p>
        );
      })}
    </div>
  );
}
