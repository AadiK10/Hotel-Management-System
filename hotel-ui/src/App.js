import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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

import "./styles/main.css";

function AppContent() {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      <Navbar />

      {}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/reception" element={<ReceptionDashboard />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/reception-users" element={<ReceptionUsers />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Routes>
      </div>

      {!hideFooter && <Footer />}
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
