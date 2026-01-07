import { useEffect, useState } from "react";
import "../styles/dashboard.css";

function ReceptionUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/api/reception/users", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [token]);

  const openEditModal = (user) => {
    if (user.roles.some(r => r.name === "ROLE_ADMIN")) return;
    setEditingUser({ ...user });
  };

  const closeModal = () => {
    setEditingUser(null);
  };

  const saveUser = async () => {
    await fetch(`http://localhost:8080/api/reception/users/${editingUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        username: editingUser.username,
        email: editingUser.email
      })
    });

    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    closeModal();
  };

  return (
    <div className="container">
      <h2>Manage Users</h2>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.roles.map(r => r.name).join(", ")}</td>
              <td>
                <button
                  disabled={user.roles.some(r => r.name === "ROLE_ADMIN")}
                  onClick={() => openEditModal(user)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 EDIT MODAL */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit User</h3>

            <label>Username</label>
            <input
              value={editingUser.username}
              onChange={(e) =>
                setEditingUser({ ...editingUser, username: e.target.value })
              }
            />

            <label>Email</label>
            <input
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={saveUser}>Save</button>
              <button className="cancel" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceptionUsers;
