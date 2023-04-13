import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Settings from "./pages/settings";
import Dashboard from "./pages/dashboard";
import ClientCommands from "./pages/ClientCommands";
import User from "./pages/user";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/settings" element={<Settings />} />

          <Route path="/user" element={<User />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/client" element={<ClientCommands />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
