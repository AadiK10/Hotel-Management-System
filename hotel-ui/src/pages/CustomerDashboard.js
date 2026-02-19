import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function CustomerDashboard() {
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
      title: "Browse Rooms",
      desc: "Explore our luxury rooms and suites",
      icon: "🔍",
      onClick: () => navigate("/rooms"),
    },
    {
      title: "Book a Room",
      desc: "Reserve your perfect stay",
      icon: "📅",
      onClick: () => navigate("/rooms"),
    }
  ];

  return (
    <DashboardLayout
      title={`Welcome back, ${userName}!`}
      subtitle="Your luxury experience awaits."
      cards={cards}
    >
      {/* Empty - no extra content */}
    </DashboardLayout>
  );
}

export default CustomerDashboard;