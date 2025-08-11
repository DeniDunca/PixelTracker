import styles from "./board.module.css";
import Calendar from "../../components/calendar";

export default async function Board(props) {
  const params = await props.params;
  const id = params.id;

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.titleprogress}>
          <h1>Workout tracker</h1>
          <img src="/progress1.png" name="progress" />
        </div>
        <div className={styles.buttons}>
          <button>Save</button>
          <button>Back</button>
        </div>
      </div>

      <div className={styles.calendarsettings}>
        <div className={styles.calendarwinner}>
          <div>
            <Calendar />
          </div>
          <div>
            <lable> Monthly Color Winner</lable>
          </div>
        </div>

        <div className={styles.settings}>
          <div>Color code</div>
          <div>start finish date</div>
          <div>color winner</div>
        </div>
      </div>
    </div>
  );
}
