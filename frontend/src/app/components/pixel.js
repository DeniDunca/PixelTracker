import styles from "./pixel.module.css";

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

  if (day === 0 && month === 0) {
    return <div className={styles.pixel}></div>;
  } else if (day === 0) {
    return <div className={styles.pixel}>{months[month - 1]}</div>;
  } else if (month === 0) {
    return <div className={styles.pixel}>{day}</div>;
  }

  return <div className={styles.pixel}></div>;
}
