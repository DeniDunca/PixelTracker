import styles from "./color.module.css";
import Pixel from "./pixel";

export default function Color() {
  return (
    <div className={styles.color}>
      <Pixel/>
      <input/>
      <button>Delete</button>
    </div>
  );
}
