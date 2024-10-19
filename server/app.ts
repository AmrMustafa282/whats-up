// import express, { Application, Request, Response } from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import redisClient from "./config/redis";
// import authRoutes from "./routes/auth.routes";
// // import messageRoutes from "./routes/message";

// dotenv.config();

// const app: Application = express();
// const PORT = process.env.PORT || 6000;

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// // app.use("/api/messages", messageRoutes);

// app.get("/", (req: Request, res: Response) => {
//  res.send("WhatsApp Clone Backend is running!");
// });

// // Connect to MongoDB
// mongoose
//  .connect(
//   process.env.MONGODB_URI || ""
//   // {
//   //   useNewUrlParser: true,
//   //   useUnifiedTopology: true,
//   //  }
//  )
//  .then(() => console.log("MongoDB connected"))
//  .catch((err) => console.error("MongoDB connection error:", err));

// // Redis connection
// redisClient.on("connect", () => console.log("Redis connected"));

// export default app;
