import Navbar from "../components/navbar";
import BoardItem from "../components/boardItem";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1 className={styles.title}>Pixel Boards</h1>
      <div className={styles.boards}>
        <BoardItem />
        <BoardItem />
        <BoardItem />
        <BoardItem />
      </div>
      <button className={styles.addboard}></button>
    </div>
  );
}
