// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import Profile from "./pages/Profile";
import Templates from "./pages/Templates";
import CreateTemplate from "./pages/CreateTemplate";
import PrivateRoute from "./components/PrivateRoute"; // PrivateRoute to protect pages
import LayoutWithSidebar from "./components/LayoutWithSidebar"; // Layout for pages with Sidebar
import About from "./pages/About";
import Ai from "./pages/Ai";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/About" element={<About />} />

      {/* Private Routes with Sidebar Layout */}
      <Route element={<PrivateRoute />}>
        <Route element={<LayoutWithSidebar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/create-template" element={<CreateTemplate />} />
          <Route path="/genrate-content" element={<Ai />} />
        </Route>
      </Route>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
