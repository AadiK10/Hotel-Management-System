const API_URL = "https://hotel-management-system-production-08d9.up.railway.app/api/users";

const getToken = () => localStorage.getItem("token");

export const getUserByEmail = async (email) => {
  const token = getToken();
  
  try {
    const response = await fetch(`${API_URL}/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching user by email:", error);
  }
  
  return null;
};