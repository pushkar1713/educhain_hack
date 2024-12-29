import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerText}>
        <h1>
          Pokémon TCG Search - <br /> Ultimate <br />
          <span className={styles.textGradient}>Trading Card</span> <br />
          Experience.
        </h1>
        <p>
          Built specifcally for card collectors <br />
          and Pokemon enthusiasts
        </p>
        <div className={styles.headerButtons}>
          <Link to="/search">
            <button>Search Cards</button>
          </Link>
          <Link to="/pokedex">
            <button>Explore Pokedex</button>
          </Link>
        </div>
      </div>
      <div>
        <img
          src="https://pokemon-tcg-v1.netlify.app/static/media/pikachu.31bf5db7acb73a02b1bf.png"
          alt="image of pikachu"
        />
      </div>
    </header>
  );
};

export { Header };
