import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db";
import redisClient from "./config/redis";
import authRoutes from "./routes/auth.routes";
import { chatHandler } from "./sockets/chat.socket";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectDB();
redisClient.connect();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);

io.on("connection", (socket) => {
 console.log("Connection started on", socket.id);
 chatHandler(io, socket);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
