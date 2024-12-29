import React, { useState } from "react";
import styles from "./CardGrid.module.css";
import { Tilt } from "react-tilt";
import { PokemonCard } from "./SearchPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import CardModal from "./CardModal";

const defaultOptions = {
  reverse: false,
  max: 35,
  perspective: 1000,
  scale: 1.1,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

type CardGridProps = {
  cards: PokemonCard[];
};

export const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  const [selectedCard, setSelectedCard] = useState<PokemonCard | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (card: PokemonCard) => {
    setSelectedCard(card);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setModalIsOpen(false);
  };

  return (
    <div className={styles.CardGrid}>
      {Array.isArray(cards) &&
        cards.map((card) => (
          <div className={styles.cardContainer} key={card.id}>
            <Tilt options={defaultOptions}>
              <div onClick={() => openModal(card)}>
                <img src={card.images.large} className={styles.cardImage} />
              </div>
            </Tilt>
            <div className={styles.cardDescription}>
              <div className={styles.cardText}>
                <p>
                  <strong>{card.name}</strong>
                </p>
                <p>
                  <small>{card.types[0]}</small>
                </p>
                <p>
                  <small>
                    {card.rarity === undefined ? "Common" : card.rarity}
                  </small>
                </p>
              </div>
              <FontAwesomeIcon
                className={styles.cardAddIcon}
                icon={faCirclePlus}
              />
            </div>
          </div>
        ))}
      <CardModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        card={selectedCard}
      />
    </div>
  );
};
