import styles from "./boardItem.module.css";
import Link from "next/link";

export default function BoardItem() {
  return (
    <Link href="/pixel/1" className={styles.boardWrapper}>
      <div className={styles.board}>
        <div className={styles.nameDates}>
          <div>
            <label className={styles.boardName} name="boardName">
              Workout
            </label>
          </div>
          <div className={styles.boardDates}>
            <label> 24/07/25</label>
            <label> 24/07/25</label>
          </div>
        </div>
        <img
          className={styles.progress}
          src="/progress1.png"
          name="progress"
        ></img>
      </div>
    </Link>
  );
}
