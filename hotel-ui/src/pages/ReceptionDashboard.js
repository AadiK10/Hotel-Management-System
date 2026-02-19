import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function ReceptionDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(""); 

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.sub) {
            localStorage.setItem("username", decoded.sub);
            setUserName(decoded.sub);
          }
        } catch (e) {
          console.error("Error decoding token:", e);
        }
      }
    }
  }, []);

  const cards = [
    {
      title: "View All Rooms",
      desc: "Check room availability and details",
      icon: "🏨",
      onClick: () => navigate("/rooms"),
    },
    {
      title: "Quick Book",
      desc: "Book a room for walk-in customers",
      icon: "📝",
      onClick: () => navigate("/rooms"),
    },
    {
      title: "Manage Guests",
      desc: "Update guest information and details",
      icon: "👤",
      onClick: () => navigate("/reception-users"),
    }
  ];

  return (
    <DashboardLayout
      title={`Welcome back, ${userName}!`} 
      subtitle="Welcome! Manage guest check-ins, bookings, and room availability."
      cards={cards}
    >
      {/* Empty - no extra content */}
    </DashboardLayout>
  );
}

export default ReceptionDashboard;