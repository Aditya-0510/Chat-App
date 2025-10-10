import mongoose, { Schema, model } from "mongoose"
const { ObjectId } = mongoose.Types;
import dotenv from "dotenv"

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI!);

const userSchema = new Schema({
    name: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required: true}
})

const RoomSchema= new Schema({
    hash: {type: String, required:true},
    users: [{type: ObjectId, ref:'users'}]
})

const MessageSchema= new Schema({
  from: { type: Schema.Types.ObjectId, ref: "users", required: true },
  message: { type: String, required: true },
  roomId: { type: ObjectId, ref: "room", required: true },
})

export const UserModel = model("users", userSchema);
export const MessageModel = model("message", MessageSchema);
export const RoomModel = model("room", RoomSchema);