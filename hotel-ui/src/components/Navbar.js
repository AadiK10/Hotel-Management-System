import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logout } from "../utils/auth";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  let role = null;
  let userName = localStorage.getItem("username") || "Guest";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      
      if (decoded.sub && !localStorage.getItem("username")) {
        localStorage.setItem("username", decoded.sub);
        userName = decoded.sub;
      }
    } catch (e) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home", public: true },
    { path: "/rooms", label: "Rooms", public: true },
  ];

  const roleBasedLinks = {
    ROLE_ADMIN: [
      { path: "/admin", label: "Dashboard" },
      { path: "/add-room", label: "Add Room" },
      { path: "/manage-users", label: "Manage Users" },
    ],
    ROLE_RECEPTIONIST: [
      { path: "/reception", label: "Dashboard" },
      { path: "/reception-users", label: "Update Users" },
    ],
    ROLE_CUSTOMER: [
      { path: "/customer", label: "Dashboard" },
    ],
  };

  const currentRoleLinks = role ? roleBasedLinks[role] || [] : [];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent hover:scale-110 transition-transform drop-shadow-lg"
          >
            AKSuites
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 font-medium rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
                    : 'text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {currentRoleLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 font-medium rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
                    : 'text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <span className="text-xl">☀️</span>
              ) : (
                <span className="text-xl">🌙</span>
              )}
            </button>

            {/* User Menu / Auth Buttons */}
            {token ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Welcome, <span className="font-semibold text-amber-600 dark:text-amber-400">{userName}</span>
                </span>
                <button
                  onClick={() => logout(navigate)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 font-medium rounded-lg transition-all duration-300 ${
                    location.pathname === "/login"
                      ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
                      : 'text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 font-medium rounded-lg transition-all duration-300 ${
                    location.pathname === "/register"
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            <span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white dark:bg-gray-900 shadow-lg px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                location.pathname === link.path
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/20'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {currentRoleLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                location.pathname === link.path
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/20'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Dark Mode Toggle for Mobile - Added here */}
          <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 mb-2">
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <span className="text-xl">☀️</span>
              ) : (
                <span className="text-xl">🌙</span>
              )}
            </button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
            {token ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                  Logged in as <span className="font-semibold">{userName}</span>
                </div>
                <button
                  onClick={() => {
                    logout(navigate);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === "/login"
                      ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg mt-2 text-center ${
                    location.pathname === "/register"
                      ? 'bg-amber-500 text-white'
                      : 'bg-primary-600 text-white'
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;