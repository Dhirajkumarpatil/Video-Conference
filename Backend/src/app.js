import express from 'express';
import {createServer} from "node:http";
import connectToSocket from './controllers/socketManager.js';
import { Server } from "socket.io";
import dotenv from "dotenv";

import mongoose from "mongoose";
import userRoute from "./routes/user.routes.js";

import cors from "cors";

const app = express();

dotenv.config();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/user", userRoute);


const start = async () => {
  try {
    const connectionDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGO Connected DB HOST:${connectionDB.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`Listening on port ${app.get("port")}`);
    });

  } catch (error) {
    console.log("DB connection failed:", error);
  }
};

start();