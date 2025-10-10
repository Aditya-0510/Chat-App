import { WebSocketServer, WebSocket } from "ws";
import express from "express"
import cors from "cors"
import userRouter from "./routes/user.js"
import roomRouter from "./routes/room.js"
import messageRouter from "./routes/message.js"
import http from 'http';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter)
app.use("/api/v1/room", roomRouter)
app.use("/api/v1/message", messageRouter)

// app.listen(3000);

interface User {
    socket : WebSocket;
    room : string
}

// const wss = new WebSocketServer({
//     port: 8080
// })
const server = http.createServer(app);
const wss = new WebSocketServer({ server })

let userCount = 0;
let allSockets: User[] = []

wss.on('connection', (socket) => {

    userCount++;
    console.log("User connected #" + userCount);

    let currentUser = null;
    socket.on("message", (message) =>{
        let messageObj = JSON.parse(message as unknown as string)

        if(messageObj.type === "join"){
            console.log("User joined room "+ messageObj.payload.roomId);
            allSockets = allSockets.filter(s => s.socket !== socket);
            currentUser = {
                socket: socket,
                room: messageObj.payload.roomId
            };
            allSockets.push(currentUser)
            console.log(allSockets);
        }
        
        if(messageObj.type === "leave"){
            console.log("User leaving room");
            allSockets = allSockets.filter(s => s.socket !== socket);
            currentUser = null;
            console.log("Active sockets:", allSockets.length);
        }

        if(messageObj.type === "chat"){
            console.log("message recieved " + messageObj.payload.message.toString());
            
            const user= allSockets.find((x) => x.socket == socket);
            if(user){
                const currentUserRoom = user.room;
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
    socket.on('close', () => {
        userCount--;
        allSockets = allSockets.filter(x => x.socket !== socket);
        console.log("User disconnected. Remaining: " + userCount);
        console.log("Active sockets:", allSockets.length);
    });

    socket.on('error', (error) => {
        console.error('WebSocket error:', error);
        allSockets = allSockets.filter(x => x.socket !== socket);
    });
})

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server (HTTP + WebSocket) running on port ${PORT}`);
});