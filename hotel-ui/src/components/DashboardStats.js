import { useEffect, useState } from "react";
import { getRooms } from "../services/roomService";
import "../styles/dashboard.css";

function DashboardStats() {
  const [total, setTotal] = useState(0);
  const [available, setAvailable] = useState(0);
  const [booked, setBooked] = useState(0);

  useEffect(() => {
    getRooms().then((rooms) => {
      setTotal(rooms.length);
      setAvailable(rooms.filter(r => r.status === "AVAILABLE").length);
      setBooked(rooms.filter(r => r.status === "BOOKED").length);
    });
  }, []);

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h2>{total}</h2>
        <p>Total Rooms</p>
      </div>

      <div className="stat-card available">
        <h2>{available}</h2>
        <p>Available</p>
      </div>

      <div className="stat-card booked">
        <h2>{booked}</h2>
        <p>Booked</p>
      </div>
    </div>
  );
}

export default DashboardStats;
