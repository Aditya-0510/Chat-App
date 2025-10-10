import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type WebSocketContextType = {
  socket: WebSocket | null;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  room: string | null;
  setRoom: React.Dispatch<React.SetStateAction<string | null>>;
  isConnected: boolean;
};

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  messages: [],
  setMessages: () => {},
  room: null,
  setRoom: () => {},
  isConnected: false
});

type ChatMessage = {
  username?: string;
  message: string;
};

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [room, setRoom] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const WS_URL = import.meta.env.VITE_WS_URL;

  useEffect(() => {
    
    const ws = new WebSocket(WS_URL || "ws://localhost:8080");
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true); 
    };
    
    ws.onmessage = (e) => {
      console.log("Raw message from server:", e.data);

      try {
        // Try to parse as JSON first
        const data = JSON.parse(e.data);
        if (data.type === "chat" && data.payload?.message) {
          console.log("username" + data.payload.username);
          setMessages((prev) => [...prev, {
          username: data.payload.username,
          message: data.payload.message ,
        },]);
        } else if (data.message) {
          setMessages((prev) => [...prev, data.message]);
        }else {
          setMessages((prev) => [...prev, e.data]);
        }
      } catch {
        // If not JSON, just add the raw data
        setMessages((prev) => [...prev, e.data]);
      }
    };
    
    ws.onclose = (e) => {
     console.log("WebSocket closed", e.code, e .reason);
      setIsConnected(false);
    };
    
    ws.onerror = (err) => {
      console.error("WebSocket error", err);
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        socket: socketRef.current,
        messages,
        setMessages,
        room,
        setRoom,
        isConnected
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);