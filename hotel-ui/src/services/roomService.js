const BASE_URL = "http://localhost:8080/api/rooms";

export async function getRooms() {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
}


export async function addRoom(room) {
  const token = localStorage.getItem("token");

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
  const token = localStorage.getItem("token");

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
