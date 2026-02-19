import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ReceptionDashboard from "./pages/ReceptionDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Rooms from "./pages/Rooms";
import AddRoom from "./pages/AddRoom";
import ManageUsers from "./pages/ManageUsers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditUser from "./pages/EditUser";
import ReceptionUsers from "./pages/ReceptionUsers";
import ProtectedRoute from "./components/ProtectedRoute";

import "./styles/main.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function AppContent() {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Public Routes - No protection needed */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes - Require authentication */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/reception" 
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_RECEPTIONIST"]}>
                <ReceptionDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/customer" 
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_RECEPTIONIST", "ROLE_CUSTOMER"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/rooms" 
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_RECEPTIONIST", "ROLE_CUSTOMER"]}>
                <Rooms />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/add-room" 
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                <AddRoom />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/manage-users" 
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                <ManageUsers />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/reception-users" 
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_RECEPTIONIST"]}>
                <ReceptionUsers />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/edit-user/:id" 
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_RECEPTIONIST"]}>
                <EditUser />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;