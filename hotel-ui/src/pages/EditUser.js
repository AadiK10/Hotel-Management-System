import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    role: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [id, token]);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const users = await res.json();
      const user = users.find(u => u.id === Number(id));
      
      if (user) {
        setFormData({
          username: user.username || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          role: user.roles?.[0]?.name || ""
        });
      }
    } catch (err) {
      setError("Failed to load user data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:8080/api/reception/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email
        })
      });

      if (!res.ok) throw new Error("Failed to update user");

      setSuccess(true);
      setTimeout(() => {
        navigate("/reception");
      }, 2000);
    } catch (err) {
      setError(err.message || "Error updating user");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Edit <span className="text-primary-600">User</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Update user information
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg animate-slide-down">
            <div className="flex items-center">
              <span className="text-green-500 mr-3 text-2xl">✅</span>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-300">User Updated Successfully!</h3>
                <p className="text-sm text-green-600 dark:text-green-400">Redirecting to dashboard...</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg animate-slide-down">
            <div className="flex items-center">
              <span className="text-red-500 mr-3">⚠️</span>
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Edit Form */}
        <div className="luxury-card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  👤
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ✉️
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📞
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📍
                </span>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="Enter address"
                />
              </div>
            </div>

            {/* Role (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔐
                </span>
                <input
                  type="text"
                  value={formData.role.replace("ROLE_", "")}
                  className="input-field pl-12 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                  disabled
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Role cannot be changed
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => navigate("/reception")}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary px-8 py-3 disabled:opacity-50 min-w-[160px]"
              >
                {saving ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border-2 border-red-200 dark:border-red-800">
          <h3 className="text-xl font-display font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center">
            <span className="text-2xl mr-2">⚠️</span>
            Danger Zone
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">
            Once you delete a user, there is no going back. Please be certain.
          </p>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this user?")) {
                // Handle delete
              }
            }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;