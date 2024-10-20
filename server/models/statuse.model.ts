import { Schema, model } from "mongoose";
import { IUser } from "./user.model";

interface IStatus {
 user: IUser;
 content: string;
 media_url?: string;
}

const statusSchema = new Schema<IStatus>(
 {
  user: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  media_url: String,
 },
 { timestamps: true }
);

statusSchema.index({ user: 1 });

export default model<IStatus>("Status", statusSchema);
