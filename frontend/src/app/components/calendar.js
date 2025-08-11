import Pixel from "./pixel";
import style from "./calendar.module.css";

export default function Calendar(props) {
  const rows = 13;
  const cols = 32;

  return (
    <div className={style.calendar}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ display: "flex" }}>
          {Array.from({ length: cols }).map((_, j) => (
            <Pixel key={`${i}-${j}`} day={j} month={i} />
          ))}
        </div>
      ))}
    </div>
  );
}
