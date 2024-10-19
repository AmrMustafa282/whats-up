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


