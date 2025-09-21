import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import path from "path";
import { fileURLToPath } from 'url';

// Define the equivalent of __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Register all API routes
registerRoutes(app);

// Serve your built client-side application
// The path must be relative to the serverless function's location.
const buildPath = path.join(__dirname, "../dist/public");
app.use(express.static(buildPath));

// Handle all other requests by serving the main HTML file
app.get("*", (_req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default app;
