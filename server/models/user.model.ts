import { ObjectId, Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface IUserPreferences {
 theme?: string;
 notifications_enabled?: boolean;
 language?: string;
}
const userPreferencesSchema = new Schema<IUserPreferences>(
 {
  theme: { type: String, default: "light" },
  notifications_enabled: { type: Boolean, default: true },
  language: { type: String, default: "en" },
 },
 { timestamps: true }
);

export interface IUser {
 phone_number: string;
 name: string;
 avatar_url?: string;
 status?: string;
 last_seen?: Date;
 userPreferences?: IUserPreferences;
 contacts?: Schema.Types.ObjectId[];
 SignAccessToken: () => string;
 SignRefreshToken: () => string;
}

const userSchema = new Schema<IUser>(
 {
  phone_number: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  avatar_url: String,
  status: { type: String, default: "Hey there! I am using WhatUp 😀" },
  last_seen: Date,
  userPreferences: {
   theme: { type: String, default: "light" },
   notifications_enabled: { type: Boolean, default: true },
   language: { type: String, default: "en" },
  },
  // contacts: [{ type: Schema.ObjectId, ref: "Contact" }],
 },
 {
  timestamps: true,
 }
);

userPreferencesSchema.index({ user: 1 }, { unique: true });

userSchema.index({ phone_number: 1 });

userSchema.methods.SignAccessToken = function () {
 return jwt.sign({ _id: this._id }, process.env.JWT_ACCESS_TOKEN!, {
  expiresIn: "1d",
 });
};

userSchema.methods.SignRefreshToken = function () {
 return jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_TOKEN!, {
  expiresIn: "30d",
 });
};

export const User = model<IUser>("User", userSchema);
