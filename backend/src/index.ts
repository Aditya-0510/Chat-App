import { WebSocketServer, WebSocket } from "ws";
import express from "express"
import cors from "cors"
import userRouter from "./routes/user.js"
import roomRouter from "./routes/room.js"
import messageRouter from "./routes/message.js"

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter)
app.use("/api/v1/room", roomRouter)
app.use("/api/v1/message", messageRouter)

app.listen(3000);

interface User {
    socket : WebSocket;
    room : string
}

const wss = new WebSocketServer({
    port: 8080
})

let userCount = 0;
let allSockets: User[] = []

wss.on('connection', (socket) => {

    userCount++;
    console.log("User connected #" + userCount);

    socket.on("message", (message) =>{
        let messageObj = JSON.parse(message as unknown as string)

        if(messageObj.type === "join"){
            console.log("User joined room "+ messageObj.payload.roomId);
            allSockets.push({
                socket: socket,
                room : messageObj.payload.roomId
            })
            console.log(allSockets);
        }
        if(messageObj.type === "chat"){
            console.log("message recieved " + messageObj.payload.message.toString());
            
            const currentUser= allSockets.find((x) => x.socket == socket);
            if(currentUser){
                const currentUserRoom = currentUser.room;
                allSockets.forEach(s => {
                    if(s.room == currentUserRoom){
                        s.socket.send(
                            JSON.stringify({
                                type: "chat",
                                payload: {
                                    message: messageObj.payload.message,
                                    username: messageObj.payload.username
                                },
                            })
                        );
                    }
                });
            }
        } 
    })
})