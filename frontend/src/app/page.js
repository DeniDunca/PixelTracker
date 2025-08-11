"use client";
import { useRef } from "react";
import styles from "./page.module.css";
import Logo from "./components/logo";

export default function Login() {
  const usernameRef = useRef();

  const handleLogin = (event) => {
    event.preventDefault();
    alert(usernameRef.current.value);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.login}>
        <Logo />
        <form onSubmit={handleLogin}>
          <div className={styles.imageWrapper}>
            <img src="/input.png"></img>
            <input name="username" placeholder="username" ref={usernameRef} />
          </div>

          <div className={styles.imageWrapper}>
            <img src="/input.png"></img>
            <input name="password" placeholder="password" type="password" />
          </div>

          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
        <div className={styles.links}>
          <a href="/">I don't have an acount!</a>
          <a href="/">I forgot password!</a>
        </div>
      </div>
    </div>
  );
}
