import { Chrome, Facebook, Twitter } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

interface AuthFormProps {
  initialMode?: "login" | "signup";
  onFormSwitch?: (mode: "login" | "signup") => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  initialMode = "login",
  onFormSwitch,
}) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check for mode in URL params
  useEffect(() => {
    const urlMode = searchParams.get('mode') as 'login' | 'signup' | null;
    if (urlMode && (urlMode === 'login' || urlMode === 'signup')) {
      setMode(urlMode);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "signup") {
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      // Here you would typically make an API call to register the user
      // For now, we'll just log them in directly
    }
    
    // Simulate successful authentication
    dispatch(login({
      email,
      username: username || email.split('@')[0],
      role: 'user'
    }));
    
    // Redirect to home page after successful login
    navigate('/');
  };

  const switchMode = (newMode: "login" | "signup") => {
    setMode(newMode);
    onFormSwitch?.(newMode);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="w-full max-w-md bg-amber-50 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute w-12 h-12 bg-pink-400 -top-4 -left-4 animate-bounce rounded-full border-2 border-black"></div>
        <div className="absolute w-8 h-8 bg-blue-400 -bottom-2 -right-2 animate-pulse border-2 border-black"></div>
        <div className="absolute w-10 h-10 bg-green-400 top-1/2 -left-4 animate-spin border-2 border-black"></div>

        <div className="mb-8 border-b-2 border-black">
          <div className="flex">
            <button
              className={`py-3 px-6 font-bold text-lg transition-all duration-300 ${
                mode === "login"
                  ? "bg-red-500 text-white border-b-4 border-black"
                  : "bg-transparent"
              }`}
              onClick={() => switchMode("login")}
            >
              Login
            </button>
            <button
              className={`py-3 px-6 font-bold text-lg transition-all duration-300 ${
                mode === "signup"
                  ? "bg-red-500 text-white border-b-4 border-black"
                  : "bg-transparent"
              }`}
              onClick={() => switchMode("signup")}
            >
              Sign Up
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === "signup" && (
            <div className="form-group">
              <label className="block font-bold mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border-2 border-black bg-white focus:outline-none focus:border-red-500 focus:shadow-[4px_4px_0px_0px_rgba(255,107,107,1)] transition-all duration-300"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-black bg-white focus:outline-none focus:border-red-500 focus:shadow-[4px_4px_0px_0px_rgba(255,107,107,1)] transition-all duration-300"
              required
            />
          </div>

          <div className="form-group">
            <label className="block font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-black bg-white focus:outline-none focus:border-red-500 focus:shadow-[4px_4px_0px_0px_rgba(255,107,107,1)] transition-all duration-300"
              required
            />
          </div>

          {mode === "signup" && (
            <div className="form-group">
              <label className="block font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border-2 border-black bg-white focus:outline-none focus:border-red-500 focus:shadow-[4px_4px_0px_0px_rgba(255,107,107,1)] transition-all duration-300"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-0 transition-all duration-300"
            onClick={handleSubmit}
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t-2 border-black">
          <p className="text-center mb-4 font-bold">Or continue with</p>
          <div className="flex justify-center space-x-4">
            <button className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300">
              <Facebook />
            </button>
            <button className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300">
              <Twitter />
            </button>
            <button className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-300">
              <Chrome />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;