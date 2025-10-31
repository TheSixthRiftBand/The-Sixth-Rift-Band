import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import { requireAdminAuth } from "./middleware/auth";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      if (existingSubscriber) {
        return res.status(409).json({ 
          message: "You're already subscribed to our newsletter!" 
        });
      }

      const subscriber = await storage.createSubscriber(validatedData);
      res.status(201).json({ 
        message: "Thank you for subscribing!",
        subscriber: { id: subscriber.id, email: subscriber.email }
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid email address" });
    }
  });

  app.get("/api/subscribers", requireAdminAuth, async (_req, res) => {
    try {
      const subscribers = await storage.getAllSubscribers();
      res.json(subscribers);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve subscribers" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
