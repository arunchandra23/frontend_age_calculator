import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'



const NavBar = () => {
  return (
    <div className="nav-container ui fixed borderless huge menu">
      <Link to="/" className="active item">
        Age Calculator
      </Link>
      
    </div>
  );
};

export default NavBar;
