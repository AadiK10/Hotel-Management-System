import { useEffect, useState } from "react";
import { getRooms, bookRoom } from "../services/roomService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const roomImages = {
  "STANDARD": [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  "DELUXE": [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d577334dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  "SUITE": [
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  "PRESIDENTIAL": [
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]
};


const getRoomImage = (type, index) => {
  const images = roomImages[type] || roomImages["STANDARD"];
  return images[index % images.length];
};

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (e) {
      localStorage.removeItem("token");
    }
  }

  const loadRooms = async () => {
    try {
      setLoading(true);
      const res = await getRooms();
      setRooms(res);
    } catch (error) {
      console.error("Error loading rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleBook = async (roomId) => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await bookRoom(roomId);
      alert("Room booked successfully");
      loadRooms();
    } catch (err) {
      alert("Booking failed");
    }
  };

  const filteredRooms = filter === "ALL" 
    ? rooms 
    : rooms.filter(room => room.status === filter);

  
  const amenityMap = {
    wifi: { icon: "📶", label: "WiFi" },
    ac: { icon: "❄️", label: "AC" },
    tv: { icon: "📺", label: "TV" },
    minibar: { icon: "🍷", label: "Minibar" },
    safe: { icon: "🔒", label: "Safe" },
    bathtub: { icon: "🛁", label: "Jacuzzi" },
    view: { icon: "🌊", label: "Ocean View" },
    balcony: { icon: "🏞️", label: "Balcony" }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-primary-600">Luxury Rooms</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience comfort and elegance in our carefully curated rooms
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg bg-white dark:bg-gray-800 shadow-lg p-1">
            {["ALL", "AVAILABLE", "BOOKED"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  filter === filterType
                    ? "bg-primary-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {filterType.charAt(0) + filterType.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="spinner"></div>
          </div>
        )}

        {/* Rooms Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room, index) => (
              <div
                key={room.id}
                className="room-card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden h-64">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow-lg ${
                      room.status === "AVAILABLE" 
                        ? "bg-green-500/90 backdrop-blur-sm text-white border border-green-400" 
                        : "bg-red-500/90 backdrop-blur-sm text-white border border-red-400"
                    }`}>
                      {room.status}
                    </span>
                  </div>
                  <img
                    src={getRoomImage(room.type, index)}
                    alt={room.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white">
                      Room {room.roomNumber}
                    </h3>
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                      {room.type}
                    </span>
                  </div>

                  <div className="flex items-center mb-3">
                    <span className="text-3xl font-bold text-primary-600">
                      ₹{room.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">/ night</span>
                  </div>

                  {/* Description */}
                  {room.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {room.description}
                    </p>
                  )}

                  {/* Amenities */}
                  {room.amenities && room.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.amenities.map((amenity, i) => {
                        const a = amenityMap[amenity] || { icon: "✓", label: amenity };
                        return (
                          <span key={i} className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs">
                            <span className="mr-1">{a.icon}</span>
                            <span>{a.label}</span>
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {token && (role === "ROLE_CUSTOMER" || role === "ROLE_RECEPTIONIST") && (
                    <button
                      onClick={() => handleBook(room.id)}
                      disabled={room.status !== "AVAILABLE"}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                        room.status === "AVAILABLE"
                          ? "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {room.status === "AVAILABLE" ? "Book Now" : "Not Available"}
                    </button>
                  )}

                  {!token && (
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full py-3 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-charcoal rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Login to Book
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredRooms.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-2">
              No Rooms Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {filter === "AVAILABLE" 
                ? "All rooms are currently booked. Please check back later."
                : "No rooms match your criteria."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;