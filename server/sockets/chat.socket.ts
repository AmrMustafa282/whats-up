import { Server, Socket } from "socket.io";
import Message from "../models/message.model";

export const chatHandler = (io: Server, socket: Socket) => {
 socket.on("send_message", async (data) => {
  const { senderId, conversationId, content } = data;

  const message = await Message.create({
   sender_id: senderId,
   conversation_id: conversationId,
   content,
  });

  io.to(`conversation:${conversationId}`).emit("new_message", message);
 });

 socket.on("join_conversation", (conversationId) => {
  socket.join(`conversation:${conversationId}`);
 });
};
