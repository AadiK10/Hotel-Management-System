import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://hotel-management-system-production-08d9.up.railway.app/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to load users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(
        `https://hotel-management-system-production-08d9.up.railway.app/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      alert("Error deleting user");
      console.error(err);
    }
  };

  const getRoleBadgeColor = (roleName) => {
    const colors = {
      "ROLE_ADMIN": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      "ROLE_RECEPTIONIST": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "ROLE_CUSTOMER": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    };
    return colors[roleName] || "bg-gray-100 text-gray-800";
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "ALL" || 
      user.roles?.some(r => r.name === roleFilter);
    
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-slide-down">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Manage <span className="text-primary-600">Users</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            View and manage all users in the system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{users.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-2xl">
                👥
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Admins</p>
                <p className="text-3xl font-bold text-purple-600">
                  {users.filter(u => u.roles?.some(r => r.name === "ROLE_ADMIN")).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-2xl">
                👑
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receptionists</p>
                <p className="text-3xl font-bold text-blue-600">
                  {users.filter(u => u.roles?.some(r => r.name === "ROLE_RECEPTIONIST")).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">
                🛎️
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customers</p>
                <p className="text-3xl font-bold text-green-600">
                  {users.filter(u => u.roles?.some(r => r.name === "ROLE_CUSTOMER")).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl">
                👤
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="luxury-card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search by username or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-12"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              {["ALL", "ROLE_ADMIN", "ROLE_RECEPTIONIST", "ROLE_CUSTOMER"].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    roleFilter === role
                      ? role === "ALL" 
                        ? "bg-primary-600 text-white"
                        : role === "ROLE_ADMIN"
                        ? "bg-purple-600 text-white"
                        : role === "ROLE_RECEPTIONIST"
                        ? "bg-blue-600 text-white"
                        : "bg-green-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {role.replace("ROLE_", "").charAt(0) + role.replace("ROLE_", "").slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="luxury-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Roles</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Joined</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      <div className="text-4xl mb-3">👥</div>
                      <p className="text-lg font-medium">No users found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                            {user.username?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {user.roles?.map(role => (
                            <span
                              key={role.id}
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(role.name)}`}
                            >
                              {role.name.replace("ROLE_", "")}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {new Date().toLocaleDateString()} {/* Replace with actual join date */}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {deleteConfirm === user.id ? (
                          <div className="flex items-center justify-end space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Sure?</span>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg text-sm transition-colors"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(user.id)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 text-sm font-medium"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;