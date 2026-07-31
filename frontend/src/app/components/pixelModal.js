import styles from "./pixelModal.module.css";
import { usePixelStore } from "../hooks/PixelContext";

export default function PixelModal() {
  const {
    colors,
    setPixels,
    selectedPixel,
    toggleModal
  } = usePixelStore();

  const savePixel = (color) => {

    setPixels(prev => ({
      ...prev,
      [selectedPixel]: color
    }));

    toggleModal();

  };
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
          <div className={styles.pixel} />

          <div className={styles.colors}>
            <div className={styles.palette}>
              {colors.map((color) => (
                <button
                  key={color.id}
                  className={styles.colorOption}
                  style={{
                    backgroundColor: color.value
                  }}
                  onClick={() => savePixel(color.value)}
                />
              ))}
            </div>
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
