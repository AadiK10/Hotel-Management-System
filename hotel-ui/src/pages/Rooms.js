import { useEffect, useState } from "react";
import { getRooms, bookRoom } from "../services/roomService";
import { jwtDecode } from "jwt-decode";
import "../styles/dashboard.css";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  const token = localStorage.getItem("token");
  const role = token ? jwtDecode(token).role : null;

  const loadRooms = () => {
    getRooms().then(res => setRooms(res));
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleBook = async (roomId) => {
    try {
      await bookRoom(roomId);
      alert("Room booked successfully");
      loadRooms(); // refresh table
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div className="container">
      <h2>Rooms</h2>

      <table>
        <thead>
          <tr>
            <th>Room No</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            {(role === "ROLE_CUSTOMER" || role === "ROLE_RECEPTIONIST") && (
              <th>Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.roomNumber}</td>
              <td>{room.type}</td>
              <td>₹{room.price}</td>
              <td
                style={{
                  color: room.status === "AVAILABLE" ? "green" : "red"
                }}
              >
                {room.status}
              </td>

              {(role === "ROLE_CUSTOMER" || role === "ROLE_RECEPTIONIST") && (
                <td>
                  {room.status === "AVAILABLE" ? (
                    <button onClick={() => handleBook(room.id)}>
                      Book
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Rooms;
