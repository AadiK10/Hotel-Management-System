import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(users => {
        const user = users.find(u => u.id === Number(id));
        if (user) {
          setUsername(user.username);
          setEmail(user.email);
        }
      });
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/api/reception/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ username, email })
    });

    alert("User updated successfully");
    navigate("/reception");
  };

  return (
    <div className="container">
      <h2>Edit User</h2>

      <form onSubmit={handleSubmit} className="card">
        <label>Username</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <br /><br />

        <label>Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditUser;
