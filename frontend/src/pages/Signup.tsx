import { useRef, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  EmailIcon,
  PasswordIcon,
  EyeIcon,
  EyeOffIcon,
} from "../icons/InputIcons";

export default function Signup() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function signup() {
    setError(null);
    setSuccess(null);
    
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
    
      const response = await axios.post(`${backendUrl}/user/signup`, {
        name,
        email,
        password,
      });

      const success = response.data.success;
      if(!success){
        setError("Failed to create account. Please try again.");
        return;
      }
      setSuccess("Account created successfully! Redirecting to sign in...");
      
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } 
    catch (e: unknown) {
  console.error("Signup failed:", e);

  if (axios.isAxiosError(e)) {
    if (e.response?.status === 409) {
      setError("An account with this email already exists. Please sign in instead.");
    } else {
      setError("Failed to create account. Please try again.");
    }
  } else {
    setError("Something went wrong. Please try again.");
  }
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
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Sign up to get started with your account
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                signup();
              }}
            >
              <Input
                placeholder="Full Name"
                reference={nameRef}
                icon={<UserIcon />}
              />

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

              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-700 text-sm">{success}</span>
                  </div>
                </div>
              )}

              <Button
                text="Create Account"
                variant="primary"
                size="lg"
                fullWidth={true}
                loading={loading}
              />
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/signin")}
                  className="text-blue-600 hover:text-blue-700 font-semibold focus:outline-none focus:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}