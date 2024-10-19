import { Router } from "express";
import { login, sendOTP } from "../controllers/auth.controller";

const router = Router();

router.post("/send-otp", sendOTP).post("/login", login);

export default router;
