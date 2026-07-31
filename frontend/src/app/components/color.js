import styles from "./color.module.css";
import PixelColorCode from "./pixelColorCode";

export default function Color({ color, onChange, onDelete }) {
  return (
    <div className={styles.color}>
      <PixelColorCode color={color} onChange={onChange} />
      <input placeholder="Pixel name..."/>
      <button onClick={onDelete} className={styles.colorCodeButton}
      >Delete</button>
    </div>
  );
}
