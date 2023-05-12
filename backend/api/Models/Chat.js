import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chat = new Schema({
  id: {
    type: String,
  },
  msg: {
    type: String,
  },
  date: {
    type: String,
  },
});
const Chat = mongoose.model("chat", chat);
export default Chat;
