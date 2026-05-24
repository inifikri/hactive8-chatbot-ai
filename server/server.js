import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { xss } from "express-xss-sanitizer";
import "dotenv/config";
import path from "path";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for easier local development/external CDNs
}));
app.use(cors());
app.use(express.json());
app.use(xss());
app.use(express.static("public"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`AI Career Assistant Server running on http://localhost:${PORT}`);
});
