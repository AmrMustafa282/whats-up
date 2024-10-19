import { Schema, model } from "mongoose";

const messageSchema = new Schema({
 conversation_id: { type: Schema.Types.ObjectId, ref: "Conversation" },
 sender_id: { type: Schema.Types.ObjectId, ref: "User" },
 content: String,
 media_url: String,
 sent_at: { type: Date, default: Date.now },
});

export default model("Message", messageSchema);
