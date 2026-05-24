import { generateAIResponse } from "../services/geminiService.js";
import { getSessionHistory, addMessageToHistory } from "../services/memoryService.js";
import { buildSystemPrompt } from "../utils/promptBuilder.js";

export const chatWithAI = async (req, res) => {
  const { message, model, temperature, topK, topP, sessionId = "default" } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const history = getSessionHistory(sessionId);
    
    // Add system prompt if history is empty
    if (history.length === 0) {
      addMessageToHistory(sessionId, "system", buildSystemPrompt());
    }

    // Add user message to history
    addMessageToHistory(sessionId, "user", message);

    const config = {
      model,
      temperature: parseFloat(temperature),
      topK: parseInt(topK),
      topP: parseFloat(topP),
    };

    // Filter out system prompt for Gemini startChat history (Gemini handles system instructions differently in some SDK versions, but for startChat we use user/model)
    // Actually, for @google/generative-ai, systemInstruction is a separate config in getGenerativeModel
    // I'll adjust geminiService to handle system instruction properly if possible, or just keep it as part of history if role is 'user'/'model'
    
    const reply = await generateAIResponse(history, config);

    // Add AI response to history
    addMessageToHistory(sessionId, "assistant", reply);

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate response" });
  }
};
