import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
 password: process.env.REDIS_PASSWORD,
 socket: {
  host: process.env.REDIS_HOST,
  port: 14137,
 },
});
redisClient.on("connect", () => console.error("Redis Client Connected"));
redisClient.on("error", (err) => console.error("Redis Client Error", err));

export default redisClient;
