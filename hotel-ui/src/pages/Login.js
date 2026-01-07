import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
        try {
        const token = await login(email, password);
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        console.log("DECODED TOKEN:", decoded); 

        const role = decoded.role;

        if (role === "ROLE_ADMIN") {
        navigate("/admin");
        } else if (role === "ROLE_RECEPTIONIST") {
        navigate("/reception");
        } else if (role === "ROLE_CUSTOMER") {
        navigate("/customer");
        } else {
        alert("Unknown role");
        }
        }catch (err) {
         alert("Invalid credentials");
        }
    };


  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  </div>
);

}

export default Login;
