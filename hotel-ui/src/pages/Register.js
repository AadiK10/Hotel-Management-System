import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ROLE_CUSTOMER"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "password") {
      // Calculate password strength
      let strength = 0;
      if (value.length >= 8) strength++;
      if (value.match(/[a-z]/)) strength++;
      if (value.match(/[A-Z]/)) strength++;
      if (value.match(/[0-9]/)) strength++;
      if (value.match(/[^a-zA-Z0-9]/)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Registration failed");
      }

      
      alert("🎉 Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    const colors = {
      0: "bg-gray-200",
      1: "bg-red-500",
      2: "bg-orange-500",
      3: "bg-yellow-500",
      4: "bg-blue-500",
      5: "bg-green-500"
    };
    return colors[passwordStrength] || colors[0];
  };

  const getPasswordStrengthText = () => {
    const texts = {
      0: "Very Weak",
      1: "Weak",
      2: "Fair",
      3: "Good",
      4: "Strong",
      5: "Very Strong"
    };
    return texts[passwordStrength] || texts[0];
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-12 pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-white/30 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white/30 rounded-full animate-ping animation-delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-white/30 rounded-full animate-ping animation-delay-1500"></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md px-4 animate-scale-up">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl mb-4 shadow-lg shadow-amber-500/30">
              <span className="text-5xl font-bold text-white">AK</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Join <span className="font-semibold text-amber-600 dark:text-amber-400">AKSuites</span> for a luxurious experience
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

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Username
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  👤
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Email */}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                  placeholder="Create a password"
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
              
              {/* Password Strength Meter */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex space-x-1 h-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 h-full rounded-full transition-all duration-300 ${
                          level <= passwordStrength 
                            ? getPasswordStrengthColor() 
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${
                    passwordStrength <= 1 ? 'text-red-500' :
                    passwordStrength <= 2 ? 'text-orange-500' :
                    passwordStrength <= 3 ? 'text-yellow-500' :
                    passwordStrength <= 4 ? 'text-blue-500' :
                    'text-green-500'
                  }`}>
                    {getPasswordStrengthText()}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  ✓
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-2 rounded-xl outline-none transition-all duration-300 text-gray-900 dark:text-white ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-500 focus:border-red-500'
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-gray-200 dark:border-gray-700 focus:border-amber-500'
                  }`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                I want to register as
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 ${
                  formData.role === "ROLE_CUSTOMER"
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="ROLE_CUSTOMER"
                    checked={formData.role === "ROLE_CUSTOMER"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <span className="text-3xl block mb-2">👤</span>
                    <span className={`text-sm font-semibold ${
                      formData.role === "ROLE_CUSTOMER"
                        ? 'text-amber-600'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      Customer
                    </span>
                  </div>
                  {formData.role === "ROLE_CUSTOMER" && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  )}
                </label>

                <label className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 ${
                  formData.role === "ROLE_RECEPTIONIST"
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="ROLE_RECEPTIONIST"
                    checked={formData.role === "ROLE_RECEPTIONIST"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <span className="text-3xl block mb-2">🛎️</span>
                    <span className={`text-sm font-semibold ${
                      formData.role === "ROLE_RECEPTIONIST"
                        ? 'text-amber-600'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      Receptionist
                    </span>
                  </div>
                  {formData.role === "ROLE_RECEPTIONIST" && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{" "}
                <button type="button" className="text-amber-600 hover:text-amber-700 font-semibold">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-amber-600 hover:text-amber-700 font-semibold">
                  Privacy Policy
                </button>
              </label>
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
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <span className="relative z-10">Create Account</span>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;