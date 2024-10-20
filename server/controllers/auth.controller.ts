import { Request, Response } from "express";
import redisClient from "../config/redis";
import { catchAsync } from "../middlewares/catchAsync";
import { sendSMS } from "../utils/sendSMS";
import { sendOtp } from "../utils/otp";

export const sendOTP = catchAsync(async (req: Request, res: Response) => {
 const { phone_number } = req.body;
 const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

 redisClient.setEx(`otp:${phone_number}`, 300, otpCode);

 sendSMS(phone_number, otpCode);

 res.status(200).json({ message: "OTP sent" });
});

export const register = catchAsync(async (req: Request, res: Response) => {});
export const login = catchAsync(async (req: Request, res: Response) => {
 const { phone_number, otp } = req.body;

 const otpCode = await redisClient.get(`otp:${phone_number}`);

 if (!otpCode) {
  return res.status(401).json({ message: "OTP expired" });
 }

 if (otpCode !== otp) {
  return res.status(401).json({ message: "Invalid OTP" });
 }

 res.status(200).json({ message: "Login successful" });
});
