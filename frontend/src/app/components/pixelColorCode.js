import styles from "./pixelColorCode.module.css";

export default function PixelColorCode({ color, onChange }) {
    return (
        <div className={styles.pixelWrapper}>
            <input
                type="color"
                className={styles.pixel}
                value={color}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}