import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ReceptionUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://hotel-management-system-production-08d9.up.railway.app/api/reception/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      
      
      const nonAdminUsers = data.filter(user => 
        !user.roles?.some(role => role.name === "ROLE_ADMIN")
      );
      
      setUsers(nonAdminUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (user) => {
    setEditingUser({ ...user });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({ ...prev, [name]: value }));
  };

  const saveUser = async () => {
    setSaveLoading(true);
    try {
      const res = await fetch(`https://hotel-management-system-production-08d9.up.railway.app/api/reception/users/${editingUser.id}`, {
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

      if (!res.ok) throw new Error("Failed to update user");

      
      setUsers(users.map(u => 
        u.id === editingUser.id ? { ...u, username: editingUser.username, email: editingUser.email } : u
      ));
      
      closeModal();
    } catch (error) {
      alert("Error updating user");
      console.error(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (roleName) => {
    const colors = {
      "ROLE_RECEPTIONIST": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "ROLE_CUSTOMER": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    };
    return colors[roleName] || "bg-gray-100 text-gray-800";
  };

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
          <button
            onClick={() => navigate("/reception")}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4 transition-colors"
          >
            <span className="text-xl mr-2">←</span>
            Back to Dashboard
          </button>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Manage <span className="text-primary-600">Guests</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            View and update guest and receptionist information
          </p>
        </div>

        {/* Stats Cards - Updated with icons for both */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Guests</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {users.filter(u => u.roles?.some(r => r.name === "ROLE_CUSTOMER")).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl">
                👤 {/* Added icon for guests */}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Receptionists</p>
                <p className="text-3xl font-bold text-blue-600">
                  {users.filter(u => u.roles?.some(r => r.name === "ROLE_RECEPTIONIST")).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="luxury-card p-6 mb-8">
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl pointer-events-none z-10">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search guests by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12 py-4 w-full" /* Added pl-12 for proper padding */
              style={{ paddingLeft: '3rem' }} /* Extra safety for padding */
            />
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-2">
                No Guests Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            filteredUsers.map((user, index) => (
              <div
                key={user.id}
                className="luxury-card group hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  {/* User Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white">
                          {user.username}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {user.roles?.map(role => (
                        <span
                          key={role.id}
                          className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(role.name)}`}
                        >
                          {role.name.replace("ROLE_", "")}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* User Details - Only Email */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <span className="w-8 text-xl">✉️</span>
                      <span className="text-sm truncate">{user.email}</span>
                    </div>
                  </div>

                  {/* Action Buttons - Only Edit button (History removed) */}
                  <button
                    onClick={() => openEditModal(user)}
                    className="w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>✏️</span>
                    <span>Edit User</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && editingUser && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                  Edit User
                </h3>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* User Avatar Preview */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-4xl font-bold">
                  {editingUser.username?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Edit Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={editingUser.username || ""}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editingUser.email || ""}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter email"
                  />
                </div>

                {/* Roles Tags - Display Only */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Roles
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {editingUser.roles?.map(role => (
                      <span
                        key={role.id}
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleBadgeColor(role.name)}`}
                      >
                        {role.name.replace("ROLE_", "")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={saveUser}
                  disabled={saveLoading}
                  className="btn-primary px-8 py-3 disabled:opacity-50 min-w-[140px]"
                >
                  {saveLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceptionUsers;