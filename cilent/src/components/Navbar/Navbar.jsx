// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setIsScrolled(true);
      } else {
        // Scrolling up
        setIsScrolled(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`navbar ${isScrolled ? "navbar-hidden" : ""} ${
        !isScrolled && lastScrollY > 0 ? "navbar-scrolled" : ""
      }`}
    >
      <div className="navbar-logo">
        <Link to="/">
          <img src="./logo.png" alt="Logo" />
        </Link>
        <span className="navbar-brand">AirEAGLE</span>
      </div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>
      <div
        className={`navbar-links-container ${
          isSidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <ul className={`navbar-links ${isSidebarOpen ? "sidebar-links" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/flights">Flight</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
