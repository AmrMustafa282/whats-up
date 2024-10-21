import { NextFunction, Request, Response } from "express";
import redisClient from "../config/redis";
import { catchAsync } from "../middlewares/catchAsync";
import { sendSMS } from "../utils/sendSMS";
import AppError from "../utils/appError";
import { IUser, User } from "../models/user.model";
import { sendOTPToken, sendToken } from "../config/jwt";
import { JwtPayload, verify } from "jsonwebtoken";

export const sendOTP = catchAsync(
 async (req: Request, res: Response, next: NextFunction) => {
  const { phone_number } = req.body;
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  redisClient.setEx(`otp:${phone_number}`, 300, otpCode);

  sendSMS(phone_number, otpCode);

  res.status(200).json({ message: "OTP sent" });
 }
);

export const verifyOTP = catchAsync(async (req: Request, res: Response) => {
 const { phone_number, otp } = req.body;
 const otpCode = await redisClient.get(`otp:${phone_number}`);
 if (!otpCode) {
  return res.status(401).json({ message: "OTP expired" });
 }
 if (otpCode !== otp) {
  return res.status(401).json({ message: "Invalid OTP" });
 }
 sendOTPToken(phone_number, 200, res);
});

export const register = catchAsync(
 async (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const phone_number = req.phone_number;
  if (!phone_number) {
   return next(new AppError("Phone number is required", 400));
  }
  // 2- check if this phone number is already registered
  const isExist = await User.findOne({ phone_number });
  if (isExist) {
   return next(new AppError("Phone number already registered", 400));
  }
  // 3- create a new user
  let { name, avatar_url } = req.body;
  if (!avatar_url)
   avatar_url =
    "https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg";
  const user = await User.create({ phone_number, name, avatar_url });
  res.status(201).json({ user });
 }
);
export const login = catchAsync(
 async (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const phone_number = req.phone_number;

  const user = await User.findOne({ phone_number });
  if (!user) {
   return res.status(404).json({ message: "User not found" });
  }
  sendToken(user, 200, res);
 }
);

export const authorize = catchAsync(
 async (req: Request, res: Response, next: NextFunction) => {
  let otp_token;
  if (
   req.headers.authorization &&
   req.headers.authorization.startsWith("Bearer")
  ) {
   otp_token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.otp_token) {
   otp_token = req.cookies.otp_token;
  }

  if (!otp_token) {
   return next(
    new AppError("Please verify your phone number, ask for an otp", 400)
   );
  }

  try {
   const decoded = verify(otp_token, process.env.JWT_OTP_TOKEN!) as JwtPayload;
   const phone_number = (decoded as JwtPayload).phone_number || "";
   if (!phone_number) {
    return next(
     new AppError("Phone number is not verified, please ask for an otp", 400)
    );
   }

   //@ts-ignore
   req.phone_number = phone_number;

   next();
  } catch (error) {
   return res.status(401).json({ message: "Invalid token" });
  }
 }
);
