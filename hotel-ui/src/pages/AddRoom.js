import { useState } from "react";
import { addRoom } from "../services/roomService";

function AddRoom() {
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addRoom({
        roomNumber,
        type,
        price,
        available: true
      });
      alert("Room added successfully");
    } catch (err) {
      alert("Only admin can add rooms");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Add Room (Admin)</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Room Number"
          value={roomNumber}
          onChange={e => setRoomNumber(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Type (AC / NON-AC)"
          value={type}
          onChange={e => setType(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        /><br /><br />

        <button>Add Room</button>
      </form>
    </div>
  );
}

export default AddRoom;
