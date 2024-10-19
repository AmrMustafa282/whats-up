import dotenv from "dotenv";
import { catchAsync } from "../middlewares/catchAsync";
const { Vonage } = require("@vonage/server-sdk");
dotenv.config();

const vonage = new Vonage({
 apiKey: process.env.VONAGE_API_KEY,
 apiSecret: process.env.VONAGE_API_SECRET,
});

export const sendSMS = async (phone_number: string, otpCode: string) => {
 if (process.env.NODE_ENV === "development") {
  console.log(`[MOCK SMS] Sent to ${phone_number}: ${otpCode}`);
  return;
 }

 await vonage.sms
  .send({ to: phone_number, from: "WhatUp", text: `Your OTP is: ${otpCode}` })
  .then((resp: any) => {
   console.log("Message sent successfully");
   console.log(resp);
  })
  .catch((err: Error) => {
   console.log("There was an error sending the messages.");
   console.error(err);
  });
};
