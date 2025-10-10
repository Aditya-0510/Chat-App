import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";
import axios from "axios";
import { useRef, useState } from "react";
import {
  EmailIcon,
  PasswordIcon,
  EyeIcon,
  EyeOffIcon,
} from "../icons/InputIcons";

export default function Signin() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signin() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/user/signin`,
        {
          email,
          password,
        }
      );

      const success = response.data.success;
      if(!success){
        setError("Invalid credentials. Please check your email and password.");
        return;
      }
      const token = response.data.token;
      const username = response.data.userName;
      // console.log(username);

      localStorage.setItem("token", token);
      localStorage.setItem("userName", username);
      navigate("/dashboard");
    } 
    catch (e) {
      console.error("Signin failed:", e);
      setError("Invalid email or password. Please try again.");
    } 
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex overflow-hidden">
      <div className="w-full h-full bg-white shadow-2xl flex items-center justify-center">
        <div className="w-full lg:w-1/2 p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">
                Sign in to continue to your account
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                signin();
              }}
            >
              <Input
                placeholder="Email Address"
                type="email"
                reference={emailRef}
                icon={<EmailIcon />}
              />

              <div className="relative">
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  reference={passwordRef}
                  icon={<PasswordIcon />}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                </div>
              )}

              <Button
                text="Sign In"
                variant="primary"
                size="lg"
                fullWidth={true}
                loading={loading}
              />
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 hover:text-blue-700 font-semibold focus:outline-none focus:underline cursor-pointer"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}