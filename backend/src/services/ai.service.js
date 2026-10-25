const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
});

const ACADEMIC_SYSTEM_INSTRUCTION = `
You are StudyMate's Academic Assistant.
Guidelines:
1. Provide accurate, clear, and step-by-step academic explanations.
2. If the user question is ambiguous, clarify assumptions before answering.
3. Always verify mathematical formulas, definitions, and factual claims.
4. Maintain a supportive, concise academic tone.
5. If explaining concepts or algorithms, include concise examples or key properties.
`;

/**
 * Executes a Gemini prompt with retry logic, exponential backoff, and prompt engineering.
 * @param {string} question - The student's academic query
 * @param {number} maxRetries - Maximum number of retries upon transient failure
 * @returns {Promise<string>} The generated academic explanation
 */
async function getAnswerWithRetry(question, maxRetries = 2) {
  let attempts = 0;
  while (attempts <= maxRetries) {
    try {
      const response = await ai.interactions.create({
        model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
        input: question,
        system_instruction: ACADEMIC_SYSTEM_INSTRUCTION,
        generation_config: {
          temperature: 0.2, // Low temperature minimizes hallucinations & increases factual accuracy
        },
      });

      if (!response || !response.output_text) {
        throw new Error("Empty response received from Gemini API");
      }

      return response.output_text;
    } catch (err) {
      attempts++;
      console.warn(`[Gemini API] Attempt ${attempts} failed: ${err.message}`);
      if (attempts > maxRetries) {
        throw err;
      }
      // Exponential backoff: 1s, 2s...
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
    }
  }
}

/**
 * Express Controller for handling student questions.
 */
async function getAnswer(req, res) {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string" || question.trim() === "") {
      return res.status(400).json({
        message: "A valid question string is required in the request body.",
      });
    }

    if (question.length > 2000) {
      return res.status(400).json({
        message: "Question exceeds maximum allowed length of 2000 characters.",
      });
    }

    const answer = await getAnswerWithRetry(question.trim());

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (err) {
    console.error("AI Service Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to generate academic response. Please try again.",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

module.exports = {
  getAnswer,
  getAnswerWithRetry,
  ACADEMIC_SYSTEM_INSTRUCTION,
};
