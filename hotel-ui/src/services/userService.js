const API_URL = "http://localhost:8080/api/users";

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