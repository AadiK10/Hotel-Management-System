import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Decode token to check role
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // Redirect based on actual role
      if (userRole === "ROLE_ADMIN") {
        return <Navigate to="/admin" replace />;
      } else if (userRole === "ROLE_RECEPTIONIST") {
        return <Navigate to="/reception" replace />;
      } else if (userRole === "ROLE_CUSTOMER") {
        return <Navigate to="/customer" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }

    
    return children;
  } catch (error) {
    
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;