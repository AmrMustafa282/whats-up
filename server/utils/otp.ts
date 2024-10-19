import crypto from "crypto";

export const sendOtp = (phoneNumber: string): string => {
 const otp = crypto.randomInt(100000, 999999).toString();
 console.log(`Sending OTP ${otp} to ${phoneNumber}`); // Use Twilio in production
 return otp;
};

export const verifyOtp = (
 enteredOtp: string,
 storedOtp: string,
 expiry: Date
): boolean => {
 return enteredOtp === storedOtp && new Date() < expiry;
};
