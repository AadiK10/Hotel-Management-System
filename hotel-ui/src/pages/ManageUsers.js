import { useEffect, useState } from "react";
import "../styles/dashboard.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to load users");
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        alert("Error loading users");
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  const deleteUser = async (id) => {
    if (!id) {
      alert("Invalid user ID");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }


      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));

    } catch (err) {
      alert("Error deleting user");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="container">Loading users...</div>;
  }

  return (
    <div className="container">
      <h2>Manage Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
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
                <td>
                  {user.roles.map(r => r.name).join(", ")}
                </td>
                <td>
                  <button
                    style={{ background: "red" }}
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageUsers;
