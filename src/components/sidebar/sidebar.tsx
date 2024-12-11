import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBox,
  FaClipboardList,
  FaTags,
  FaUsers,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import "./sidebar.css";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, firstname, lastname } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "❮" : "❯"}
      </button>

      {isOpen && (
        <div className="profile">
          <div>
            <h3 className="h3">{firstname && lastname ? `${firstname} ${lastname}` : "User"}</h3>
          </div>
        </div>
      )}

      <ul className="sidebar-nav">
        <li className="sidebar-nav-item">
          <Link
            to="/dashboard"
            className={`sidebar-nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
          >
            <FaHome />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link
            to="/profile"
            className={`sidebar-nav-link ${location.pathname === "/profile" ? "active" : ""}`}
          >
            <FaUser />
            {isOpen && <span>Profile</span>}
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link
            to="/orders"
            className={`sidebar-nav-link ${location.pathname === "/orders" ? "active" : ""}`}
          >
            <FaClipboardList />
            {isOpen && <span>Orders</span>}
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link
            to="/products"
            className={`sidebar-nav-link ${location.pathname === "/products" ? "active" : ""}`}
          >
            <FaBox />
            {isOpen && <span>Products</span>}
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link
            to="/categories"
            className={`sidebar-nav-link ${location.pathname === "/categories" ? "active" : ""}`}
          >
            <FaTags />
            {isOpen && <span>Categories</span>}
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link
            to="/users"
            className={`sidebar-nav-link ${location.pathname === "/users" ? "active" : ""}`}
          >
            <FaUsers />
            {isOpen && <span>Users</span>}
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button className="sidebar-nav-link logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
