import genAI from "../config/geminiConfig.js";
import { defaultGenerationConfig } from "../config/aiModels.js";

export const generateAIResponse = async (messages, config = {}) => {
  const modelName = config.model || "gemini-1.5-flash";
  
  // Extract system prompt if present
  const systemPrompt = messages.find(msg => msg.role === "system")?.content;
  
  const model = genAI.getGenerativeModel({ 
    model: modelName,
    systemInstruction: systemPrompt,
  });

  const generationConfig = {
    ...defaultGenerationConfig,
  };

  if (!isNaN(config.temperature)) generationConfig.temperature = config.temperature;
  if (!isNaN(config.topK)) generationConfig.topK = config.topK;
  if (!isNaN(config.topP)) generationConfig.topP = config.topP;

  // Convert messages to Gemini format (excluding system prompt)
  const history = messages
    .filter(msg => msg.role !== "system")
    .slice(0, -1)
    .map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

  const lastMessage = messages[messages.length - 1].content;

  const chat = model.startChat({
    history: history,
    generationConfig,
  });

  const result = await chat.sendMessage(lastMessage);
  const response = await result.response;
  return response.text();
};
