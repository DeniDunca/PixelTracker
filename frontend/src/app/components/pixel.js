import styles from "./pixel.module.css";
import PixelModal from "./pixelModal";
import { usePixelStore } from "../hooks/PixelContext";

export default function Pixel({ day, month }) {
  const months = [
    "Jun",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const { showModal, toggleModal } = usePixelStore();

  const pixelSettings = () => {
    toggleModal();
  };

  if (day === 0 && month === 0) {
    return <div className={styles.pixel}></div>;
  } else if (day === 0) {
    return <div className={styles.pixel}>{months[month - 1]}</div>;
  } else if (month === 0) {
    return <div className={styles.pixel}>{day}</div>;
  }

  return <div className={styles.pixel} onClick={pixelSettings}></div>;
}
