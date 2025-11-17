import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contract analysis is triggered client-side and uses Google Gemini AI (with user consent)
  // This server only serves static frontend files - no contract processing occurs here

  const httpServer = createServer(app);

  return httpServer;
}
