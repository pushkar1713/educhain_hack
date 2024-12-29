import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "../components/Navbar.module.css";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link to="/">
          <img
            src="https://pokemon-tcg-v1.netlify.app/static/media/pokemon-trading-card-v1.156d3603df54aa45f2e9fa1e3a3e34f1.svg"
            alt="image of pokeball"
            id={styles.logo}
          />
        </Link>
      </div>
      <div
        className={styles.navbarLinks}
        id={showLinks ? styles.navbarActive : ""}
      >
        <Link to="/" className={location.pathname === "/" ? styles.active : ""}>
          Home
        </Link>
        <Link
          to="/search"
          className={location.pathname === "/search" ? styles.active : ""}
        >
          Search
        </Link>
        <Link
          to="/pokedex"
          className={location.pathname === "/pokedex" ? styles.active : ""}
        >
          Pokedex
        </Link>
      </div>
      <button
        className={styles.hamburger}
        onClick={() => setShowLinks(!showLinks)}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
    </nav>
  );
};

export default Navbar;
