import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "View Rooms",
      desc: "Browse available rooms",
      onClick: () => navigate("/rooms")
    },
    {
      title: "Book Room",
      desc: "Reserve your stay",
      onClick: () => navigate("/rooms")
    }
  ];

  return (
    <DashboardLayout
      title="Customer Dashboard"
      subtitle="Plan your stay with comfort"
      cards={cards}
    />
  );
}

export default CustomerDashboard;
