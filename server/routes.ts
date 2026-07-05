import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contract analysis runs entirely in the browser (local pattern matcher).
  // This server only serves static frontend files - no contract processing occurs here

  const httpServer = createServer(app);

  return httpServer;
}
