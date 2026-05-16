import express from 'express';
import { createServer } from "node:http";
import connectToSocket from './controllers/socketManager.js';
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Routes
app.use("/api/v1/user", userRoute);

// Port
const PORT = process.env.PORT || 8000;

// Create HTTP Server
const server = createServer(app);

// Socket Connection
connectToSocket(server);

// MongoDB Connection + Server Start
const startServer = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

  } catch (error) {

    console.log("MongoDB Connection Failed:", error);

  }

  // IMPORTANT:
  // Server should start even if DB fails
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();