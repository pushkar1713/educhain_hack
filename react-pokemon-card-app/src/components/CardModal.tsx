// CardModal.tsx
import React from "react";
import Modal from "react-modal";
import styles from "./CardModal.module.css";

type Card = {
  id: string;
  name: string;
  images: {
    small: string;
  };
  types: string[];
  rarity: string;
};

type CardModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  card: Card | null;
};

const CardModal: React.FC<CardModalProps> = ({
  isOpen,
  onRequestClose,
  card,
}) => {
  if (!card) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button className={styles.closeButton} onClick={onRequestClose}>
        &times;
      </button>
      <div className={styles.modalTitle}>
        <h2>{card.name}</h2>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.modalContent}>
          <img
            src={card.images.small}
            alt={card.name}
            className={styles.cardImage}
          />
          <div className={styles.cardDetails}>
            <div className={styles.cardDetailsRow}>
              <p>Name:</p> <p>{card.name}</p>
            </div>
            <div className={styles.cardDetailsRow}>
              <p>Type:</p> <p>{card.types.join(", ")}</p>
            </div>
            <div className={styles.cardDetailsRow}>
              <p>Rarity:</p> <p>{card.rarity}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;
