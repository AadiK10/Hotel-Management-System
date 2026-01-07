import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_CUSTOMER");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("Registration successful. Please login.");
    } catch (err) {
      alert("Error during registration");
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="ROLE_CUSTOMER">Customer</option>
          <option value="ROLE_RECEPTIONIST">Receptionist</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  </div>
);

}

export default Register;
