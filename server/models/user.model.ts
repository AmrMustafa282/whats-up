import { Schema, model } from "mongoose";

const userSchema = new Schema({
 phone_number: { type: String, unique: true, required: true },
 name: { type: String, required: true },
 avatar_url: String,
 status: { type: String, default: "Hey there! I am using WhatUp 😀" },
 last_seen: Date,
 created_at: { type: Date, default: Date.now },
});

export const User = model("User", userSchema);
