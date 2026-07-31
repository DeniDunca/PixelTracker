"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Logo from "./components/logo";

export default function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid username or password");
      }

      router.push("/home/1?search=");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.login}>
        <Logo />
        <form onSubmit={handleLogin}>
          <div className={styles.imageWrapper}>
            <img src="/input.png" alt="username" />
            <input name="username" placeholder="username" ref={usernameRef} />
          </div>

          <div className={styles.imageWrapper}>
            <img src="/input.png" alt="password" />
            <input name="password" placeholder="password" type="password" ref={passwordRef} />
          </div>

          <button className={styles.button} type="submit">
            Login
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}