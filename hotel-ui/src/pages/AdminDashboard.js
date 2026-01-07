import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Add Room",
      desc: "Add new rooms to the hotel",
      onClick: () => navigate("/add-room")
    },
    {
      title: "View Rooms",
      desc: "View all hotel rooms",
      onClick: () => navigate("/rooms")
    },
    {
      title: "Manage Users",
      desc: "View customers and staff",
      onClick: () => navigate("/manage-users")
    }
  ];

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Manage hotel operations efficiently"
      cards={cards}
    />
  );
}

export default AdminDashboard;
