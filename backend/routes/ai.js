const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function readPdf(filename) {
  const pdfPath = path.join(__dirname, "../uploads", filename);

  if (!fs.existsSync(pdfPath)) {
    throw new Error("PDF not found.");
  }

  const dataBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdf(dataBuffer);

  if (!pdfData.text.trim()) {
    throw new Error("This PDF contains no readable text.");
  }

  return pdfData.text;
}
router.post("/summary", async (req, res) => {
  try {
    const { filename } = req.body;

    const notes = await readPdf(filename);

console.log(notes.substring(0, 500));
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
      `Summarize these notes in simple language:\n\n${notes}`
    );

    res.json({
      summary: result.response.text(),
    });
  } catch (error) {
    console.error(error);

   res.status(500).json({
  error: error.message,
});
  }
});
router.post("/chat", async (req, res) => {
  try {
    const { filename, question } = req.body;

    const notes = await readPdf(filename);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
`
You are an intelligent AI Study Assistant.

These are the student's notes:

${notes}

Instructions:

- Answer ONLY using the uploaded notes.
- The student's question may contain spelling mistakes, typing mistakes, or grammatical errors.
- If it is obvious what they meant, automatically correct the mistake mentally before answering.
- Never mention that there was a typo unless the meaning is unclear.
- If the answer is not found in the notes, politely say:
"I couldn't find that information in the uploaded notes."
- Keep the answer simple, clear, and easy to understand.

Question:
${question}
`
);

    res.json({
      answer: result.response.text(),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
  error: error.message,
});
  }
});
router.post("/quiz", async (req, res) => {
  try {
    const { filename } = req.body;

    const notes = await readPdf(filename);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(`
You are an expert teacher.

Read ONLY the student's notes below.

Create exactly 5 multiple-choice questions ONLY from these notes.

Rules:
- Do NOT use your own knowledge.
- Do NOT ask generic questions unrelated to the notes.
- Every question must come from the uploaded PDF.
- Each question should have 4 options (A, B, C, D).
- After each question, write:
Answer: <Correct Option>

Student Notes:
${notes}
`);

    res.json({
      quiz: result.response.text(),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
  error: error.message,
});
  }
});

router.post("/flashcards", async (req, res) => {
  try {
    const { filename } = req.body;

    const notes = await readPdf(filename);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    let result;

const prompt = `
You are an expert teacher.

Read ONLY the student's notes below.

Create exactly 10 flashcards.

Format:

Flashcard 1
Q: ...
A: ...

Flashcard 2
Q: ...
A: ...

Rules:
- Use ONLY the uploaded PDF.
- Do NOT use outside knowledge.
- Keep answers short.
- Cover the most important concepts.

Student Notes:
${notes}
`;

for (let i = 0; i < 3; i++) {
  try {
    result = await model.generateContent(prompt);
    break;
  } catch (err) {
    if (err.status === 503 && i < 2) {
      console.log(`Gemini busy... retrying (${i + 1}/3)`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    } else {
      throw err;
    }
  }
}

    if (!result) {
  return res.status(500).json({
    error: "Failed to generate flashcards after multiple retries.",
  });
}

res.json({
  flashcards: result.response.text(),
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
  error: error.message,
});
  }
});
module.exports = router;