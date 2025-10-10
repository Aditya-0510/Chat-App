import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { LogOut } from 'lucide-react';

const Chat = () => {
  const { socket, messages, room, setMessages, setRoom} = useWebSocket();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [currentUsername, setUsername] = useState<string | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!room) {
      navigate("/dashboard");
    }
  }, [room, navigate]);

  async function submitHandler() {
    if (!socket || !inputRef.current) return;

    const m = inputRef.current.value.trim();
    if (!m) return;

    const username = localStorage.getItem("userName");
    console.log(username);
    setUsername(username);
    socket.send(
      JSON.stringify({
        type: "chat",
        payload: { message: m, username: username},
      })
    );
    inputRef.current.value = "";
    console.log(messages);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${backendUrl}/message/send`,
        {
          roomId: room,
          message: m,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  }

  async function leaveRoom() {

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${backendUrl}/room/leave`,
        { hash: room },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (err) {
      console.error("Failed to leave room:", err);
    }

    setRoom(null);
    setMessages([]);
    navigate("/dashboard");
  }

  return (
    <div className="h-screen bg-black flex flex-col">
      {room && (
        <div className="p-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
          <p className="text-white text-sm">
            Room: <span className="text-purple-400 font-semibold">{room}</span>
          </p>
          <button
            onClick={leaveRoom}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors cursor-pointer flex items-center gap-2"
          >
            <LogOut size={16} />
            Leave
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start chatting!</p>
          </div>
        ) : (
          <div className="space-y-3 max-w-3xl mx-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.username === currentUsername
                    ? "bg-gray-800 text-right"
                    : "bg-gray-800"
                } text-white rounded-lg p-4 shadow-lg break-words`}
              >
                {msg.username && (
                  <p className="text-purple-400 font-semibold text-sm mb-1">
                    {msg.username}
                  </p>
                )}
                <p className="text-gray-100">{msg.message}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

      </div>

      <div className="p-4 bg-gray-900 border-t border-gray-700">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Enter message"
            ref={inputRef}
            onKeyDown={(e) => e.key === "Enter" && submitHandler()}
            className="flex-1 p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={submitHandler}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded transition-colors font-semibold cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;