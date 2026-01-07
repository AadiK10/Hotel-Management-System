import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logout } from "../utils/auth";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const token = localStorage.getItem("token");

  let role = null;
  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  return (
    <div className="navbar">
      <div> Hotel Management System</div>

      <div>
        {/* 🌙 DARK MODE — ALWAYS VISIBLE */}
        <button onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {role === "ROLE_ADMIN" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/add-room">Add Room</Link>
            <Link to="/rooms">View Rooms</Link>
            <Link to="/manage-users">Manage Users</Link>
            <button onClick={() => logout(navigate)}>Logout</button>
          </>
        )}

        {role === "ROLE_RECEPTIONIST" && (
          <>
            <Link to="/reception">Dashboard</Link>
            <Link to="/rooms">View Rooms</Link>
            <Link to="/reception-users">Update Users</Link>
            <button onClick={() => logout(navigate)}>Logout</button>
          </>
        )}

        {role === "ROLE_CUSTOMER" && (
          <>
            <Link to="/customer">Dashboard</Link>
            <Link to="/rooms">View Rooms</Link>
            <button onClick={() => logout(navigate)}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
