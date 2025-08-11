import Logo from "../components/logo";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navBar}>
      <Logo />
      <div className={styles.halfnavbar}>
        <div className={styles.searchBar}>
          <img src="/search.png"></img>
          <input name="search" placeholder="search..." />
        </div>
        <button className={styles.theme}></button>
        <button className={styles.profile}></button>
      </div>
    </div>
  );
}
