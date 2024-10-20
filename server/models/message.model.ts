import { Schema, model } from "mongoose";
import { IConversation } from "./conversation.model";
import { IUser } from "./user.model";

export interface IMessage {
 conversation: IConversation;
 sender: IUser;
 content: string;
 is_deleted: boolean;
 is_Edit: boolean;
 message_receipts?: IMessageReceipts;
 message_media?: IMessageMedia;
 message_reactions?: IMessageReactions;
}

interface IMessageReceipts {
 message: IMessage;
 user: IUser;
}
const messageReceiptsSchema = new Schema<IMessageReceipts>(
 {
  message: { type: Schema.Types.ObjectId, ref: "Message" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
 },
 { timestamps: true }
);

messageReceiptsSchema.index({ message: 1, user: 1 }, { unique: true });

interface IMessageMedia {
 message: IMessage;
 media_url: string;
 media_type: string;
}
const messageMediaSchema = new Schema<IMessageMedia>(
 {
  message: { type: Schema.Types.ObjectId, ref: "Message" },
  media_url: { type: String, required: true },
  media_type: { type: String, required: true },
 },
 { timestamps: true }
);

messageMediaSchema.index({ message: 1 });

interface IMessageReactions {
 message: IMessage;
 user: IUser;
 reaction: string;
}
const messageReactionsSchema = new Schema<IMessageReactions>(
 {
  message: { type: Schema.Types.ObjectId, ref: "Message" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  reaction: { type: String, required: true },
 },
 { timestamps: true }
);

const messageSchema = new Schema<IMessage>(
 {
  conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
  is_Edit: { type: Boolean, default: false },
  message_receipts: messageReceiptsSchema,
  message_media: messageMediaSchema,
  message_reactions: messageReactionsSchema,
 },
 { timestamps: true }
);

messageSchema.index({ conversation_id: 1 });

export default model<IMessage>("Message", messageSchema);
