import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contract analysis runs entirely client-side using pure pattern matching.
  // This server only serves static frontend files — no contract data is processed here.

  const httpServer = createServer(app);

  return httpServer;
}
