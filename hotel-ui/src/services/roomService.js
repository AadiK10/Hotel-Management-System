const BASE_URL = "https://hotel-management-system-production-08d9.up.railway.app/api/rooms";

const getToken = () => localStorage.getItem("token");

export async function getRooms() {
  const token = getToken();
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}

export async function addRoom(room) {
  const token = getToken();
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(room)
  });

  if (!res.ok) {
    throw new Error("Forbidden");
  }
  return res.json();
}

export async function bookRoom(roomId) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/${roomId}/book`, {
    method: "PUT", 
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Booking failed");
  }
}

export async function updateRoom(roomId, roomData) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/${roomId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(roomData)
  });
  if (!res.ok) throw new Error("Failed to update room");
  return res.json();
}

export async function deleteRoom(roomId) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/${roomId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to delete room");
  return res.json();
}