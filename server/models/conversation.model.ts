import { Schema, model } from "mongoose";
import { IUser } from "./user.model";
import { IMessage } from "./message.model";

interface IConversationParticipants {
 user: IUser;
 conversation_id: IConversation;
 role: "admin" | "member";
 joined_at: Date;
}
const conversationParticipantsSchema = new Schema<IConversationParticipants>(
 {
  user: { type: Schema.Types.ObjectId, ref: "User" },
  conversation_id: { type: Schema.Types.ObjectId, ref: "Conversation" },
  role: { type: String, enum: ["admin", "member"], default: "member" },
  joined_at: { type: Date, default: Date.now },
 },
 { timestamps: true }
);
conversationParticipantsSchema.index(
 { user: 1, conversation_id: 1 },
 { unique: true }
);

export interface IConversation {
 participants: IConversationParticipants[];
 is_group: boolean;
 pinned_message_id?: IMessage;
}

const conversationSchema = new Schema<IConversation>(
 {
  participants: [conversationParticipantsSchema],
  is_group: { type: Boolean, default: false },
  pinned_message_id: { type: Schema.Types.ObjectId, ref: "Message" },
 },
 { timestamps: true }
);
