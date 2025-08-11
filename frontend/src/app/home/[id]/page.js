"use client";
import { use, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "../../components/navbar";
import BoardItem from "../../components/boardItem";
import styles from "./home.module.css";

export default function Home({ params }) {
  const { id } = use(params);
  const [boards, setBoards] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const getBoards = async (search) => {
    const res = await fetch("http://localhost:8000/board/1?search=" + search);

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
  console.log(boards);
  return (
    <div>
      <Navbar searchText={search} />
      <h1 className={styles.title}>Pixel Boards</h1>
      <div className={styles.boards}>
        {boards.map((board) => (
          <BoardItem
            key={board.id}
            category={board.category}
            startDate={board.start_date}
            finishDate={board.finish_date}
          />
      
        ))}
      </div>
      <button className={styles.addboard}></button>
    </div>
  );
}
