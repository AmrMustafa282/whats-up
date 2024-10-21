import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db";
import redisClient from "./config/redis";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { chatHandler } from "./sockets/chat.socket";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectDB();
redisClient.connect();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

io.on("connection", (socket) => {
 console.log("Connection started on", socket.id);
 chatHandler(io, socket);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
