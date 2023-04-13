import React from "react";
import "../css/navbar.css";
import logo from "../assests/logo/logo.jpg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="sidebar">
      <ul className="p-3 position-relative">
        <li className="mb-2">
          <Link to="/">
            <img
              src={logo}
              width="200"
              height="100"
              className="object-fit-contain "
            />
          </Link>
        </li>

        <li>
          <Link
            to="/home"
            className="d-flex align-content-center fs-14  p-3 rounded-4">
            <i class="fa-solid fa-home"></i>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="d-flex align-content-center fs-14 p-3">
            <i class="fa-solid fa-chart-line"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/client" className="d-flex align-content-center fs-14 p-3">
            <i class="fa-solid fa-user"></i>
            <span>Client Order</span>
          </Link>
        </li>
        <li>
          <Link to="/Contact" className="d-flex align-content-center fs-14 p-3">
            <i class="fa-solid fa-user"></i>
            <span>Contact</span>
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            className="d-flex align-content-center fs-14 p-3">
            <i class="fa-solid fa-gear"></i>
            <span>Settings</span>
          </Link>
        </li>
        <i class="fa-solid fa-arrow-right position-absolute end-0 me-2 fs-4 bg-warning rounded-4 p-3 text-white"></i>
      </ul>
    </div>
  );
}
