import styles from "./pixelModal.module.css";
import { usePixelStore } from "../hooks/PixelContext";

export default function PixelModal() {
  const { showModal, toggleModal } = usePixelStore();

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <span className={styles.close} onClick={toggleModal}>
          &times;
        </span>
        <div className={styles.modalHeader}>
          <p>Workout pixel</p>
          <label>17/08/25</label>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.pixel}/>
          <div className={styles.colors}>
            <select></select>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button>Save</button>
          <button>Close</button>
        </div>
      </div>
    </div>
  );
}
