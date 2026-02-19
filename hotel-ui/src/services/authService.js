import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const token = await response.text();
  
  localStorage.setItem("token", token);
  
  try {
    const profileResponse = await fetch(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (profileResponse.ok) {
      const userData = await profileResponse.json();
      if (userData && userData.username) {
        localStorage.setItem("username", userData.username);
      } else {
        
        const username = email.split('@')[0];
        localStorage.setItem("username", username);
      }
    } else {
      
      const username = email.split('@')[0];
      localStorage.setItem("username", username);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    
    const username = email.split('@')[0];
    localStorage.setItem("username", username);
  }
  
  return token;
};