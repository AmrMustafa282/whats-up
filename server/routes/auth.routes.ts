import { Router } from "express";
import {
 authorize,
 login,
 register,
 sendOTP,
 verifyOTP,
} from "../controllers/auth.controller";

const router = Router();

router
 .post("/send-otp", sendOTP)
 .post("/verify-otp", verifyOTP)
 .post("/login", authorize, login)
 .post("/register", authorize, register);

export default router;
