import { Router } from "express";
import { MessageModel, RoomModel, UserModel } from "../db.js";
import authMiddleware from "../middleware.js";
import z from "zod";
import mongoose from 'mongoose';

const messageRouter = Router();

messageRouter.use(authMiddleware);

const sendMessageSchema = z.object({
    roomId: z.string(),
    message: z.string().min(1).max(1000)
});

messageRouter.post("/send", async (req, res) => {
    const validation = sendMessageSchema.safeParse(req.body);
    
    if (!validation.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: validation.error.issues
        });
    }

    const { roomId, message } = validation.data;
    //@ts-ignore
    const userId = req.user.id;

    const room = await RoomModel.findOne({
        hash: roomId
    });

    if (!room) {
        return res.status(404).json({
            message: "Room not found"
        });
    }

    const isInRoom = room.users.some(
        (id) => id.toString() === userId.toString()
    );
    
    if (!isInRoom) {
        return res.status(403).json({
            message: "You are not in this room"
        });
    }

    const newMessage = await MessageModel.create({
        from: userId,
        message: message,
        roomId: room._id
    });

    await newMessage.populate('from', 'name email');

    res.json({
        message: "Message sent successfully",
        data: newMessage
    });
});

messageRouter.get("/history/:roomId", async (req, res) => {
    try{

        const { roomId } = req.params;
        console.log(typeof(roomId));
        const limit = parseInt(req.query.limit as string) || 50;
        const before = req.query.before as string; 
        
        //@ts-ignore
        const userId = req.user.id;
        
        const room = await RoomModel.findOne({
            hash: roomId
        });
        console.log("room" +room);
        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }
        
        const isInRoom = room.users.some(
            (id) => id.toString() === userId.toString()
        );
        
        if (!isInRoom) {
            return res.status(403).json({
                message: "You are not in this room"
            });
        }
        
        let query: any = { roomId: room._id };
        
        if (before) {
            query._id = { $lt: new mongoose.Types.ObjectId(before) };
        }
        
        const messages = await MessageModel.find(query)
        .populate('from', 'name email')
        .sort({ createdAt: -1 }) 
        .limit(limit);
        
        res.json({
            messages: messages.reverse(), 
        });
    }catch (error) {
        console.error("Error fetching message history:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

export default messageRouter;