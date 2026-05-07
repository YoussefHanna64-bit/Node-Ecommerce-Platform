import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful, professional customer support agent for an E-Commerce platform called Carty. Keep your answers concise, polite, and under 3 sentences.",
        },
        { role: "user", content: userMessage },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenRouter/DeepSeek Error:", error);
    res.status(500).json({
      reply:
        "Sorry, our AI is currently taking a break. Please try again later.",
    });
  }
});

export default router;
