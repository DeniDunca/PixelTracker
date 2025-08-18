"use client";
import { use, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Navbar from "../../components/navbar";
import BoardItem from "../../components/boardItem";
import styles from "./home.module.css";

export default function Home({ params }) {
  const { id } = use(params);
  const [boards, setBoards] = useState([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const getBoards = async (search) => {
    const res = await fetch("http://localhost:8000/board/1?search=" + search); //1 here is user id

    if (!res.ok) {
      console.error("Failed to fetch boards", res.status);
      return [];
    }

    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getBoards(search).then(setBoards);
  }, [search]);

  const addBoard = async (search) => {
    const today = new Date();
    const startDate = today.toISOString().slice(0, 10);
    const endOfYear = new Date(today.getFullYear(), 11, 31);
    const finishDate = endOfYear.toISOString().slice(0, 10);

    const res = await fetch("http://localhost:8000/board/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 1,
        category: "untitled",
        start_date: startDate,
        finish_date: finishDate,
      }),
    });

    if (!res.ok) {
      console.error("Failed to fetch boards", res.status);
      return [];
    }

    const newBoard = await res.json();
    if (!newBoard || !newBoard.id) {
      console.error("Invalid board returned from backend", newBoard);
      return;
    }
    setBoards((prev) => [...prev, newBoard]);
    router.push(`/board/${newBoard.id}`);
  };

  return (
    <div>
      <Navbar searchText={search} />
      <h1 className={styles.title}>Pixel Boards</h1>
      <div className={styles.boards}>
        {boards
          .filter((board) => board !== null)
          .map((board) => (
            <BoardItem
              key={board.id}
              id={board.id}
              category={board.category}
              startDate={board.start_date}
              finishDate={board.finish_date}
            />
          ))}
      </div>
      <button onClick={addBoard} className={styles.addboard}></button>
    </div>
  );
}
