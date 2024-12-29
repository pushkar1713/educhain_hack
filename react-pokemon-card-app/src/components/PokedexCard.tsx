import styles from "../components/PokedexCard.module.css";

const PokedexCard = () => {
  return (
    <div className={styles.PokedexCardContainer}>
      <img
        src="https://media.cnn.com/api/v1/images/stellar/prod/210226040722-01-pokemon-anniversary-design.jpg?q=w_1920,h_1080,x_0,y_0,c_fill"
        alt=""
        className={styles.pokedexCardImg}
      />
      <div className={styles.pokedexCard}>
        <div className={styles.pokedexTitle}>
          <h1>Bulbasaur</h1>
          <div className={styles.pokedexType}></div>
          <button>Grass</button>
          <button>Poison</button>
        </div>
        <div className={styles.pokedexNumber}>#001</div>
      </div>
    </div>
  );
};

export default PokedexCard;
