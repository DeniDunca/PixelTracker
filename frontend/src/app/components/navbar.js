import { useRef } from "react";
import { useRouter } from "next/navigation";

import Logo from "../components/logo";
import styles from "./navbar.module.css";

export default function Navbar({ searchText }) {
  const searchRef = useRef(searchText);
  const router = useRouter();

  const onSearch = (event) => {
    event.preventDefault();
    console.log(searchRef.current.value);
    router.push('/home/1?search='+ searchRef.current.value)
  };

  return (
    <div className={styles.navBar}>
      <Logo />
      <div className={styles.halfnavbar}>
        <form className={styles.searchBar} onSubmit={onSearch}>
          <img src="/search.png"></img>
          <input name="search" placeholder="search..." defaultValue={searchText} ref={searchRef} />
        </form>
        <button className={styles.theme}></button>
        <button className={styles.profile}></button>
      </div>
    </div>
  );
}
