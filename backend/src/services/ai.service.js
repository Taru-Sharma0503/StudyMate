const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function getAnswer(req, res) {
  try {
    const question = req.body.question;
    const response = await ai.interactions.create({
      model: "gemini-2.5-flash",
      input: question,
    });
    return res.status(200).json({
      answer: response.output_text,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getAnswer };
