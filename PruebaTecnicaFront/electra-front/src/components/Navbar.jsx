import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-logo">Electra</div>
      <div className="nav-links">
        <Link
          to="/clientes"
          className={location.pathname === "/clientes" ? "active" : ""}
        >
          Clientes
        </Link>

        <Link
          to="/citas"
          className={location.pathname === "/citas" ? "active" : ""}
        >
          Citas
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
