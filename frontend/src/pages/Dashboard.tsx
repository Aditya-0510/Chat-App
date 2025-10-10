import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../context/WebSocketContext";
import axios from "axios";

const Dashboard = () => {
  const { socket, setRoom, isConnected, setMessages } = useWebSocket();
  const [hash, setHash] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const roomRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  async function joinHandler() {
    if (!socket) {
      alert("WebSocket not connected yet. Please wait.");
      return;
    }

    const roomId = roomRef.current?.value.trim();
    if (!roomId) {
      alert("Please enter a room ID");
      return;
    }

    setRoom(roomId);
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backendUrl}/room/join`,
        { 
          hash: roomId 
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.data.message || response.data.message !== "Joined room successfully") {
        setError(response.data.message || "Failed to join room");
        setLoading(false);
        return;
      }

      setMessages([]);
      setRoom(roomId);

      const messageResponse = await axios.get(
        `${backendUrl}/message/history/${roomId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(messageResponse.data);
      if (messageResponse.data.messages) {
         setMessages(messageResponse.data.messages.map((msg: any) => ({
            username: msg.from.name,
            message: msg.message
          })));
      }
      const username = localStorage.getItem("userName");
      console.log(username);
      socket.send(
        JSON.stringify({
          type: "join",
          payload: { roomId, username },
        })
      );
      console.log(roomId);

      navigate("/chat");
    } 
    catch (err: any) {
      setError(err.response?.data?.message || "Failed to join room");
    } 
    finally {
      setLoading(false);
    }
  }

  async function createHandler(){
    if (!socket) {
      alert("WebSocket not connected yet. Please wait.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      console.log("token " +token);
      const response = await axios.post(
        `${backendUrl}/room/create`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);

      setHash(response.data.hash);
    } 
    catch (err: any) {
      setError(err.response?.data?.message || "Failed to create room");
    } 
    finally {
      setLoading(false);
    }
  }
  

  function copyToClipboard() {
    navigator.clipboard.writeText(hash);
    alert("Room ID copied to clipboard!");
  }


  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center gap-8 p-8">
      
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Create a Chat Room
        </h1>
        <button
          onClick={createHandler}
          disabled={!isConnected || loading}
          className={`w-full py-3 rounded font-semibold transition-colors cursor-pointer ${
            !isConnected || loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Creating..." : isConnected ? "Create Room" : "Connecting..."}
        </button>

        {hash && (
          <div className="mt-4 p-4 bg-gray-800 rounded border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Your Room ID:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-purple-400 font-mono text-lg">
                {hash}
              </code>
              <button
                onClick={copyToClipboard}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      
      <div className="w-full max-w-md flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-700"></div>
        <span className="text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-700"></div>
      </div>

      
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Join a Chat Room
        </h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter room ID"
            ref={roomRef}
            onKeyDown={(e) => e.key === "Enter" && joinHandler()}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={joinHandler}
            disabled={!isConnected || loading}
            className={`w-full py-3 rounded font-semibold transition-colors cursor-pointer ${
              !isConnected || loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Joining..." : isConnected ? "Join Room" : "Connecting..."}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;