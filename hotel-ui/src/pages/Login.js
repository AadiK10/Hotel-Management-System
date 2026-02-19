import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded.role;
        if (role === "ROLE_ADMIN") navigate("/admin");
        else if (role === "ROLE_RECEPTIONIST") navigate("/reception");
        else if (role === "ROLE_CUSTOMER") navigate("/customer");
      } catch (e) {
        
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      

      const role = decoded.role;

      
      setTimeout(() => {
        if (role === "ROLE_ADMIN") {
          navigate("/admin");
        } else if (role === "ROLE_RECEPTIONIST") {
          navigate("/reception");
        } else if (role === "ROLE_CUSTOMER") {
          navigate("/customer");
        } else {
          setError("Unknown role");
        }
      }, 500);
    } catch (err) {
      setError("Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-white/30 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white/30 rounded-full animate-ping animation-delay-2000"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4 animate-scale-up">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl mb-4 shadow-lg shadow-amber-500/30">
              <span className="text-5xl font-bold text-white">AK</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in to continue to <span className="font-semibold text-amber-600 dark:text-amber-400">AKSuites</span>
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg animate-slide-down">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  ✉️
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  🔒
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <button type="button" className="text-sm text-amber-600 hover:text-amber-700 font-semibold transition-colors">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </>
              )}
            </button>

            {/* Social Login */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "G", label: "Google", color: "hover:bg-red-50 dark:hover:bg-red-900/20" },
                { icon: "f", label: "Facebook", color: "hover:bg-blue-50 dark:hover:bg-blue-900/20" },
                { icon: "in", label: "LinkedIn", color: "hover:bg-blue-50 dark:hover:bg-blue-900/20" }
              ].map((social, index) => (
                <button
                  key={index}
                  type="button"
                  className={`py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-gray-600 dark:text-gray-300 ${social.color} transition-all duration-300 hover:border-transparent hover:scale-105`}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </form>

          {/* Register Link */}
          <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;