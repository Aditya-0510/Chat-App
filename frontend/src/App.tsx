import Dashboard from "./pages/Dashboard"
import  Signin  from "./pages/Signin"
import  Signup  from "./pages/Signup"
import LandingPage from "./pages/LandingPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Chat from "./pages/Chat"
import { WebSocketProvider } from "./context/WebSocketContext";

const App = () => {
  
    
  return (
    <WebSocketProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LandingPage/>} />
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    </BrowserRouter>
    </WebSocketProvider>
  )
}

export default App
