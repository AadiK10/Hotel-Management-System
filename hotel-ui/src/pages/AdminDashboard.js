import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setAdminName(storedUsername);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.sub) {
            localStorage.setItem("username", decoded.sub);
            setAdminName(decoded.sub);
          }
        } catch (e) {
          console.error("Error decoding token:", e);
        }
      }
    }
  }, []);

  const cards = [
    {
      title: "Add New Room",
      desc: "Create and add new rooms to your hotel inventory",
      icon: "➕",
      onClick: () => navigate("/add-room"),
    },
    {
      title: "View All Rooms",
      desc: "Browse and manage all hotel rooms and their status",
      icon: "🏨",
      onClick: () => navigate("/rooms"),
    },
    {
      title: "Manage Users",
      desc: "View and manage customers, receptionists, and admins",
      icon: "👥",
      onClick: () => navigate("/manage-users"),
    }
  ];

  return (
    <DashboardLayout
      title={`Welcome back, ${adminName}!`}
      subtitle="Here's what's happening with your hotel today."
      cards={cards}
    >
      {/* Empty - no extra content */}
    </DashboardLayout>
  );
}

export default AdminDashboard;