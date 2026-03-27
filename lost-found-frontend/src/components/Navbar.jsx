import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}
      <NavLink to="/" className="logo">
        Lost & Found
      </NavLink>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>

        {/* ✅ MATCHING ROUTES */}
        <NavLink to="/report-lost">Report Lost</NavLink>
        <NavLink to="/report-found">Report Found</NavLink>

        <NavLink to="/items">Items</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>

    </nav>
  );
}

export default Navbar;