import {Router} from "express"
import { RoomModel } from "../db.js"; 
import authMiddleware from "../middleware.js";

const roomRouter = Router();

roomRouter.use(authMiddleware)

roomRouter.post("/create", async(req,res)=>{
    try {
        //@ts-ignore
        const user = req.user;
        const hash = Math.floor(100000 + Math.random() * 900000).toString();

        const room = await RoomModel.create({
            hash: hash,
            users: [user.id]
        })
        
        res.json({
            success: true,
            hash: hash,
            roomId: room._id
        })
    } 
    catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create room"
        })
    }
})

roomRouter.post("/join", async(req,res)=>{
    const { hash } = req.body;
    //@ts-ignore
    const user = req.user;

    const room =  await RoomModel.findOne({
        hash: hash
    })

    if(!room){
        return res.json({
            message: "Room doesn't exist",
            success: false  
        })
    }
    const isAlreadyJoined = room.users.some(
        (userId) => userId.toString() === user.id.toString()
    );

    if (!isAlreadyJoined) {
        room.users.push(user.id);
        await room.save();
    }
    res.json({
        message: "Joined room successfully",
        roomId: room.hash,
        participantCount: room.users.length
    })

})

roomRouter.post("/leave", async(req,res)=>{
    const { hash } = req.body;
    //@ts-ignore
    const user = req.user;

    const room = await RoomModel.findOne({ hash });

    if(!room){
        return res.status(404).json({
            message: "Room doesn't exist"    
        })
    }

    room.users = room.users.filter(
        (userId) => userId.toString() !== user.id.toString()
    ) as any;
    
    await room.save();

    res.json({
        message: "Left room successfully"
    })
})

export default roomRouter