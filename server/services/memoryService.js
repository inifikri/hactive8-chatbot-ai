// Simple in-memory session store (can be replaced with Redis/DB later)
const sessions = new Map();

export const getSessionHistory = (sessionId) => {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, []);
  }
  return sessions.get(sessionId);
};

export const addMessageToHistory = (sessionId, role, content) => {
  const history = getSessionHistory(sessionId);
  history.push({ role, content });
  
  // Limit history size to prevent context overflow (e.g., last 20 messages)
  if (history.length > 20) {
    history.shift();
  }
};

export const clearSessionHistory = (sessionId) => {
  sessions.set(sessionId, []);
};
