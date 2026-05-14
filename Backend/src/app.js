import express from 'express';
import {createServer} from "node:http";
import connectToSocket from './controllers/socketManager.js';
import { Server } from "socket.io";

import mongoose from "mongoose";
import userRoute from "./routes/user.routes.js";

import cors from "cors";

const app = express();

const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/user", userRoute);


const start = async() =>{
  const connectionDB = await mongoose.connect("mongodb+srv://dhirajkumarp715_db_user:AHiTZKs1mqzhyWia@cluster0.o0vpgdc.mongodb.net/?appName=Cluster0");
  console.log(`MONGO Connected DB HOST:${connectionDB.connection.host}`)
  server.listen(app.get("port"),()=>{
    console.log("Listening on port 8000")
  })
}

start();