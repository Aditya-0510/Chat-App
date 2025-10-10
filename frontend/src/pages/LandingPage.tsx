import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full">
                <MessageCircle size={48} className="text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white bg-clip-text">
            Real Time Chat
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => navigate("/signin")}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 w-full sm:w-auto cursor-pointer"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="group px-8 py-4 bg-transparent border-2 border-gray-700 rounded-full font-semibold text-lg transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 w-full sm:w-auto cursor-pointer"
            >
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-white group-hover:from-purple-300 group-hover:to-blue-300">
                Sign Up
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
