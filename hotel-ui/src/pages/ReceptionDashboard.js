import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

function ReceptionDashboard() {
  const navigate = useNavigate();

  const cards = [
  {
    title: "View Rooms",
    desc: "Check room availability",
    onClick: () => navigate("/rooms")
  },
  {
    title: "Book Room",
    desc: "Book rooms for customers",
    onClick: () => navigate("/rooms")
  },
  {
    title: "Update Users",
    desc: "Edit customer & receptionist details",
    onClick: () => navigate("/reception-users")
  },
];


  return (
    <DashboardLayout
      title="Reception Dashboard"
      subtitle="Handle bookings and customers"
      cards={cards}
    />
  );
}

export default ReceptionDashboard;
