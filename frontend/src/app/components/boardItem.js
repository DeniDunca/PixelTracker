import styles from "./boardItem.module.css";
import Link from "next/link";

export default function BoardItem(params) {

  const { category, startDate, finishDate } = params;

  return (
    <Link href="/pixel/1" className={styles.boardWrapper}>
      <div className={styles.board}>
        <div className={styles.nameDates}>
          <div>
            <label className={styles.boardName} name="boardName">
              {category}
            </label>
          </div>
          <div className={styles.boardDates}>
            <label>{startDate}</label>
            <label>{finishDate}</label>
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
