import Pixel from "./pixel";
import style from "./calendar.module.css";

export default function Calendar(props) {
  const rows = 13;
  const cols = 32;

  return (
    <div className={style.calendarmonthly}>
      <div className={style.calendar}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} style={{ display: "flex" }}>
            {Array.from({ length: cols }).map((_, j) => (
              <Pixel key={`${i}-${j}`} day={j} month={i} />
            ))}
          </div>
        ))}
      </div>

      <div className={style.monthly}>
        <label> Winner</label>
        {Array.from({ length: rows - 1 }).map((_, i) => (
          <Pixel key={i} day={i} month={i} />
        ))}
      </div>
    </div>
  );
}
