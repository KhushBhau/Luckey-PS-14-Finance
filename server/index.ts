import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Connect to MongoDB
  connectDB();

  // Middleware
  app.use(cors({
    origin: process.env.NODE_ENV === 'production'
      ? ['https://your-production-domain.com']
      : ['http://localhost:8080'],
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "Investment Platform API is running";
    res.json({ message: ping });
  });

  // Example API routes
  app.get("/api/demo", handleDemo);

  // Investment platform routes
  // User routes
  app.post("/api/users", require("./routes/users").createUser);
  app.get("/api/users/:clerkId", require("./routes/users").getUserProfile);
  app.put("/api/users/:clerkId", require("./routes/users").updateUserProfile);
  app.get("/api/users/:clerkId/dashboard", require("./routes/users").getUserDashboard);

  // Investment routes
  app.post("/api/investments", require("./routes/investments").createInvestment);
  app.get("/api/investments/:clerkId", require("./routes/investments").getUserInvestments);
  app.post("/api/investments/roundup", require("./routes/investments").processRoundUp);
  app.post("/api/investments/sip", require("./routes/investments").processDailySIP);

  // Portfolio routes
  app.get("/api/portfolio/:clerkId", require("./routes/portfolio").getUserPortfolio);
  app.get("/api/portfolio/:clerkId/history", require("./routes/portfolio").getPortfolioHistory);
  app.post("/api/portfolio/:clerkId/refresh", require("./routes/portfolio").refreshPortfolio);
  app.get("/api/portfolio/:clerkId/recommendations", require("./routes/portfolio").getRecommendations);

  // Emergency Withdrawal routes
  app.post("/api/withdrawals/:clerkId/emergency", require("./routes/withdrawals").createEmergencyWithdrawal);
  app.get("/api/withdrawals/:clerkId/history", require("./routes/withdrawals").getWithdrawalHistory);
  app.get("/api/withdrawals/:withdrawalId/status", require("./routes/withdrawals").getWithdrawalStatus);
  app.post("/api/withdrawals/:withdrawalId/cancel", require("./routes/withdrawals").cancelWithdrawal);

  return app;
}
