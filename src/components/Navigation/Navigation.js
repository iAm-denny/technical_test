import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

export const Navigation = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, []);

  return (
    <div>
      <div className={`navbar-wrapper ${isScrolled && "active"}`}>
        <div id="logo" onClick={() => (window.location.href = "/")}>
          Logo
        </div>
        <div>
          <div
            className={`menu-btn ${active && "active"}`}
            onClick={() => setActive(!active)}
          >
            <div className="menu-icon"></div>
          </div>
        </div>
        <nav className={`navbar ${active && "active"}`}>
          <ul className="navbar_items">
            <li data-text="Home">
              <Link to="/" onClick={() => setActive(false)}>
                Home
              </Link>
            </li>
            <li data-text="Services">Services</li>
          </ul>
        </nav>
      </div>

      <>{children}</>
    </div>
  );
};
