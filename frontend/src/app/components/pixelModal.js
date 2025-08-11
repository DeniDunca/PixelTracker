import styles from "./pixelModal.module.css";
import { usePixelStore } from "../hooks/PixelContext";

export default function PixelModal() {

  const { showModal, toggleModal } = usePixelStore();

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <span className={styles.close} onClick={toggleModal}>&times;</span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  );
}
