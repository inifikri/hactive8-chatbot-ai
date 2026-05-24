# AI Career Assistant Chatbot

## Architecture Documentation for Gemini CLI

---

# 1. Project Overview

## Project Name

AI Career Assistant Chatbot

## Technology Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

### Backend

- Node.js
- Express.js

### AI Provider

- Gemini API

### Optional Database

- MongoDB / MySQL

### External API Integration

- YouTube API
- GitHub API
- Dev.to API
- Coursera/Udemy API
- Build With Angga

---

# 2. Main Features

## Core Features

- AI Chatbot Career Assistant
- Career Recommendation
- Interview Preparation
- CV Review Assistant
- Skill Recommendation
- Learning Roadmap
- Session Memory
- AI Model Selector
- Temperature Configuration
- Top-K Configuration
- Top-P Configuration
- Conversation Context
- External API Integration
- Dark Mode UI
- Typing Animation
- Chat History

---

# 3. System Architecture

```text
┌───────────────────────┐
│        USER           │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│       FRONTEND        │
│ HTML + CSS + JS       │
└───────────┬───────────┘
            │ HTTP Request
            ▼
┌───────────────────────┐
│   NODE EXPRESS API    │
│      BACKEND          │
└───────────┬───────────┘
            │
            ├────────────────────┐
            │                    │
            ▼                    ▼
┌───────────────────┐   ┌───────────────────┐
│  EXTERNAL API     │   │   GEMINI MODEL    │
│ YouTube/GitHub    │   │  Google Gemini    │
└───────────────────┘   └───────────────────┘
            │                    │
            └────────┬───────────┘
                     ▼
             AI Final Response
                     │
                     ▼
                Frontend UI
```

---

# 4. Folder Structure

```text
ai-career-chatbot/
│
├── server/
│   ├── server.js
│   │
│   ├── routes/
│   │   └── chat.js
│   │
│   ├── controllers/
│   │   └── chatController.js
│   │
│   ├── services/
│   │   ├── geminiService.js
│   │   ├── youtubeService.js
│   │   ├── githubService.js
│   │   └── memoryService.js
│   │
│   ├── config/
│   │   ├── geminiConfig.js
│   │   └── aiModels.js
│   │
│   ├── middleware/
│   │   ├── validation.js
│   │   ├── security.js
│   │   └── rateLimiter.js
│   │
│   └── utils/
│       ├── promptBuilder.js
│       └── formatter.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── assets/
│
├── .env
├── package.json
├── README.md
└── architecture.md
```

---

# 5. Application Flow

```text
START
  │
  ▼
User opens website
  │
  ▼
Frontend displays chatbot UI
  │
  ▼
User sends message
  │
  ▼
Frontend sends request to Express API
  │
  ▼
Backend validates request
  │
  ▼
Load AI Configuration
  │
  ├── Temperature
  ├── Top-K
  ├── Top-P
  ├── Max Output Tokens
  ├── Memory Context
  └── Selected Gemini Model
  │
  ▼
Load Conversation Memory
  │
  ▼
(Optional)
Fetch External API Data
  │
  ▼
Build Final Prompt
  │
  ▼
Send Request to Gemini API
  │
  ▼
Receive AI Response
  │
  ▼
Store Chat Memory
  │
  ▼
Return JSON Response
  │
  ▼
Frontend renders AI response
  │
  ▼
END / LOOP CHAT
```

---

# 6. AI Configuration

## AI Parameters

### Temperature

Controls AI creativity.

```js
const temperature = 0.7;
```

| Value | Description        |
| ----- | ------------------ |
| 0.1   | Very deterministic |
| 0.5   | Balanced           |
| 0.7   | Creative           |
| 1.0   | Very creative      |

---

### Top-K

Controls token selection range.

```js
const topK = 40;
```

| Value | Description      |
| ----- | ---------------- |
| 10    | Focused response |
| 40    | Balanced         |
| 100   | Diverse response |

---

### Top-P

Controls probability distribution.

```js
const topP = 0.95;
```

| Value | Description  |
| ----- | ------------ |
| 0.5   | Conservative |
| 0.8   | Balanced     |
| 0.95  | Creative     |

---

### Max Output Tokens

Limits AI response length.

```js
const maxOutputTokens = 2048;
```

---

### Presence Penalty

Encourages new topics.

```js
const presencePenalty = 0.2;
```

---

### Frequency Penalty

Reduces repetitive text.

```js
const frequencyPenalty = 0.3;
```

---

# 7. Gemini Model Selection

## User Selectable Models

```js
const models = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
];
```

---

## Frontend Model Selector

```html
<select id="model-select">
  <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
  <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
  <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
</select>
```

---

## Backend Dynamic Model

```js
const model = req.body.model;
```

---

# 8. Memory Architecture

## Memory Concept

Chat history is stored temporarily to maintain conversation context.

---

## Memory Flow

```text
User Message
     │
     ▼
Conversation History
     │
     ▼
Append New Message
     │
     ▼
Send Context to Gemini
     │
     ▼
Store AI Response
```

---

## Example Memory Structure

```js
const memory = [
  {
    role: "user",
    content: "I want to become backend engineer",
  },
  {
    role: "assistant",
    content: "You should learn Node.js and databases",
  },
];
```

---

# 9. Prompt Engineering

## System Prompt

```text
You are a professional AI Career Assistant.
Help users with:
- Career planning
- Skill recommendation
- Interview preparation
- Learning roadmap
- CV improvement

Always provide professional and structured responses.
```

---

## Prompt Structure

```text
System Prompt
      +
Conversation Memory
      +
External API Data
      +
User Prompt
      │
      ▼
Final Prompt
```

---

# 10. External API Integration

## YouTube API

Purpose:

- learning video recommendation
- tutorial recommendation

---

## GitHub API

Purpose:

- trending repository recommendation
- portfolio examples

---

## Dev.to API

Purpose:

- programming articles
- career articles

---

# 11. Security Architecture

## Security Features

- Input validation
- Prompt injection filtering
- API key protection
- Environment variables
- Rate limiting
- CORS configuration
- Error handling
- Request sanitization

---

## Example Environment Variables

```env
PORT=3000
GEMINI_API_KEY=YOUR_API_KEY
YOUTUBE_API_KEY=YOUR_API_KEY
GITHUB_TOKEN=YOUR_GITHUB_TOKEN
```

---

# 12. Backend Request Flow

```text
Frontend Request
      │
      ▼
Express Route
      │
      ▼
Controller
      │
      ▼
Validation Middleware
      │
      ▼
Prompt Builder
      │
      ▼
Gemini Service
      │
      ▼
Gemini API
      │
      ▼
JSON Response
```

---

# 13. API Endpoint Design

## Chat Endpoint

```http
POST /api/chat
```

---

## Request Body

```json
{
  "message": "I want to learn React",
  "model": "gemini-2.5-flash",
  "temperature": 0.7,
  "topK": 40,
  "topP": 0.95
}
```

---

## Response

```json
{
  "reply": "You should start learning React fundamentals..."
}
```

---

# 14. Frontend Features

## UI Components

- Sidebar
- Chat Container
- Chat Bubble
- Typing Animation
- Model Selector
- AI Parameter Settings
- Dark Mode
- Responsive Layout
- Chat History

---

# 15. Recommended UI Layout

```text
┌─────────────────────────────┐
│ Sidebar                     │
│ - AI Models                 │
│ - Temperature               │
│ - Top-K                     │
│ - Top-P                     │
│ - Chat History              │
├─────────────────────────────┤
│ Chat Messages               │
│                             │
│ User Bubble                 │
│ AI Bubble                   │
│                             │
├─────────────────────────────┤
│ Input Message Box           │
└─────────────────────────────┘
```

---

# 16. Recommended NPM Packages

```bash
npm install express cors dotenv axios
npm install @google/generative-ai
npm install express-rate-limit
npm install helmet
npm install express-xss-sanitizer
npm install nodemon --save-dev
```

---

# 17. Gemini Service Example

```js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const result = await model.generateContent({
  contents: [
    {
      role: "user",
      parts: [{ text: "Explain backend roadmap" }],
    },
  ],
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048,
  },
});
```

---

# 18. Future Improvements

## Recommended Enhancements

- Authentication System
- Database Persistence
- Vector Database
- Semantic Search
- Voice Assistant
- Speech-to-Text
- AI Resume Analyzer
- AI Mock Interview
- File Upload CV
- PDF Export
- Multi-language Support
- Redis Cache
- Docker Deployment
- CI/CD Pipeline
- Kubernetes Deployment

---

# 19. Deployment Recommendation

## Frontend

- Vercel
- Netlify

## Backend

- Railway
- Render
- VPS Ubuntu

---

# 20. Final Notes

This project demonstrates:

- AI Integration
- LLM/NLP Implementation
- REST API Architecture
- Prompt Engineering
- External API Integration
- Fullstack Development
- AI Configuration Management
- Secure Backend Design
- Modern Chatbot Architecture
- Real-world AI Application
