import ChatHistory from "../models/ChatHistory.js";

export async function upsertSession({
  sessionId,
  studentName = "Student",
  question,
  answer,
  type = "text",
}) {
  const cleanQuestion = question?.trim() || "Uploaded an image for analysis";
  const cleanAnswer = answer?.trim() || "No response received";
  const title = cleanQuestion.slice(0, 50) || "New Study Session";

  const existing = await ChatHistory.findOne({ sessionId });

  if (!existing) {
    return ChatHistory.create({
      sessionId,
      studentName,
      title,
      lastQuestion: cleanQuestion,
      messages: [
        { role: "user", content: cleanQuestion, type },
        { role: "assistant", content: cleanAnswer, type: "text" },
      ],
    });
  }

  existing.lastQuestion = cleanQuestion;
  existing.messages.push(
    { role: "user", content: cleanQuestion, type },
    { role: "assistant", content: cleanAnswer, type: "text" },
  );

  if (existing.title === "New Study Session" && cleanQuestion) {
    existing.title = title;
  }

  return existing.save();
}
