import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRoom } from "../services/roomService";

function AddRoom() {
  const [formData, setFormData] = useState({
    roomNumber: "",
    type: "",
    price: "",
    description: "",
    amenities: [],
    capacity: "2",
    floor: "",
    status: "AVAILABLE"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const roomTypes = [
    { value: "STANDARD", label: "Standard Room", icon: "🏨", price: "₹2,999 - ₹4,999" },
    { value: "DELUXE", label: "Deluxe Room", icon: "🌟", price: "₹5,999 - ₹8,999" },
    { value: "SUITE", label: "Executive Suite", icon: "👑", price: "₹9,999 - ₹14,999" },
    { value: "PRESIDENTIAL", label: "Presidential Suite", icon: "⭐", price: "₹19,999 - ₹29,999" }
  ];

  const amenitiesList = [
    { id: "wifi", label: "Free WiFi", icon: "📶" },
    { id: "ac", label: "Air Conditioning", icon: "❄️" },
    { id: "tv", label: "Smart TV", icon: "📺" },
    { id: "minibar", label: "Mini Bar", icon: "🍷" },
    { id: "safe", label: "In-room Safe", icon: "🔒" },
    { id: "bathtub", label: "Jacuzzi Bathtub", icon: "🛁" },
    { id: "view", label: "Ocean View", icon: "🌊" },
    { id: "balcony", label: "Private Balcony", icon: "🏞️" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenityId) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await addRoom({
        roomNumber: formData.roomNumber,
        type: formData.type,
        price: parseFloat(formData.price),
        description: formData.description,
        amenities: formData.amenities,
        capacity: parseInt(formData.capacity),
        floor: formData.floor,
        status: formData.status
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate("/rooms");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to add room. Only admin can add rooms.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-slide-down">
          <button
            onClick={() => navigate("/rooms")}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4 transition-colors"
          >
            <span className="text-xl mr-2">←</span>
            Back to Rooms
          </button>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Add New <span className="text-primary-600">Room</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Create a luxurious room for your guests
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg animate-slide-down">
            <div className="flex items-center">
              <span className="text-green-500 mr-3 text-2xl">✅</span>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-300">Room Added Successfully!</h3>
                <p className="text-sm text-green-600 dark:text-green-400">Redirecting to rooms page...</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg animate-slide-down">
            <div className="flex items-center">
              <span className="text-red-500 mr-3">⚠️</span>
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="luxury-card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Room Number and Floor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Room Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 101, 202, 305"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Floor <span className="text-red-500">*</span>
                </label>
                <select
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Floor</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(floor => (
                    <option key={floor} value={floor}>Floor {floor}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Room Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {roomTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 ${
                      formData.type === type.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={handleChange}
                      className="sr-only"
                      required
                    />
                    <div className="text-center">
                      <span className="text-4xl block mb-2">{type.icon}</span>
                      <span className={`font-semibold block ${
                        formData.type === type.value
                          ? 'text-primary-600'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {type.label}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                        {type.price}
                      </span>
                    </div>
                    {formData.type === type.value && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm">
                        ✓
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Price and Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Price per Night (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input-field pl-8"
                    placeholder="5000"
                    min="0"
                    step="100"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Capacity (Guests) <span className="text-red-500">*</span>
                </label>
                <select
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Room Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="input-field"
                placeholder="Describe the room features, view, special amenities..."
              ></textarea>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Amenities
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {amenitiesList.map((amenity) => (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity.id)}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 flex items-center space-x-2 ${
                      formData.amenities.includes(amenity.id)
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                    }`}
                  >
                    <span className="text-xl">{amenity.icon}</span>
                    <span className={`text-sm font-medium ${
                      formData.amenities.includes(amenity.id)
                        ? 'text-primary-600'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {amenity.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Initial Status
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="status"
                    value="AVAILABLE"
                    checked={formData.status === "AVAILABLE"}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Available</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="status"
                    value="MAINTENANCE"
                    checked={formData.status === "MAINTENANCE"}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Under Maintenance</span>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => navigate("/rooms")}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Adding...</span>
                  </div>
                ) : (
                  'Add Room'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Card */}
        {formData.type && (
          <div className="mt-8 animate-slide-up">
            <h2 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-4">
              Preview
            </h2>
            <div className="room-card">
              <div className="relative h-48 bg-gradient-to-r from-primary-500 to-primary-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl opacity-20">🏨</span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-2xl font-bold">Room {formData.roomNumber || "XXX"}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                      {roomTypes.find(t => t.value === formData.type)?.label || "Select Room Type"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">Floor {formData.floor || "X"}</p>
                  </div>
                  <span className="text-3xl font-bold text-primary-600">
                    ₹{formData.price || "0"}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {formData.description || "No description added yet."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.map(amenity => {
                    const a = amenitiesList.find(a => a.id === amenity);
                    return a ? (
                      <span key={a.id} className="badge badge-primary flex items-center space-x-1">
                        <span>{a.icon}</span>
                        <span>{a.label}</span>
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddRoom;