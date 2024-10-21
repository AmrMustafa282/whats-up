import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../models/user.model";
import { Response } from "express";
dotenv.config();
interface ITokenOptions {
 expires: Date;
 maxAge: number;
 httpOnly: boolean;
 sameSite: "strict" | "lax" | "none";
 secure?: boolean;
}
const accessTokenExpire = parseInt(
 process.env.JWT_ACCESS_TOKEN_EXPIRE! || "300",
 10
);
const otpTokenExpire = parseInt(process.env.JWT_OTP_TOKEN_EXPIRE! || "300", 10);

const refreshTokenExpire = parseInt(
 process.env.JWT_REFRESH_TOKEN! || "1200",
 10
);

const accessTokenOptions: ITokenOptions = {
 expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
 maxAge: accessTokenExpire * 60 * 60 * 1000,
 httpOnly: true,
 sameSite: "lax",
};
const otpTokenOptions: ITokenOptions = {
 expires: new Date(Date.now() + otpTokenExpire * 60 * 60 * 1000),
 maxAge: otpTokenExpire * 60 * 60 * 1000,
 httpOnly: true,
 sameSite: "lax",
};
const refreshTokenOptions: ITokenOptions = {
 expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
 maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
 httpOnly: true,
 sameSite: "lax",
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
 const token = user.SignAccessToken();
 const refreshToken = user.SignRefreshToken();
 if (process.env.NODE_ENV === "production") {
  accessTokenOptions.secure = true;
  refreshTokenOptions.secure = true;
 }
 res.cookie("access_token", token, accessTokenOptions);
 res.cookie("refresh_token", refreshToken, refreshTokenOptions);
 res.status(statusCode).json({ user, token, refreshToken });
};

export const sendOTPToken = (
 phone_number: string,
 statusCode: number,
 res: Response
) => {
 const token = jwt.sign({ phone_number }, process.env.JWT_OTP_TOKEN!, {
  expiresIn: "5m",
 });
 if (process.env.NODE_ENV === "production") {
  otpTokenOptions.secure = true;
 }
 res.cookie("otp_token", token, otpTokenOptions);
 res.status(statusCode).json({ message: "OTP verified", otp_token: token });
};
