import { Schema, model } from "mongoose";
import { IUser } from "./user.model";

interface IContact {
 user: IUser;
 contact_name: string;
 contact_number: string;
}

const contactSchema = new Schema<IContact>(
 {
  user: { type: Schema.Types.ObjectId, ref: "User" },
  contact_name: { type: String, required: true },
  contact_number: { type: String, required: true },
 },
 { timestamps: true }
);

contactSchema.index({ user: 1 });

export default model<IContact>("Contact", contactSchema);
