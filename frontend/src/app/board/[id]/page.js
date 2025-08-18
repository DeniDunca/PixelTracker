"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./board.module.css";

import Calendar from "../../components/calendar";
import Color from "../../components/color";
import Pixel from "../../components/pixel";
import PixelModal from "../../components/pixelModal";
import { usePixelStore } from "../../hooks/PixelContext";

export default function Board({ params }) {
  const { id } = use(params);

  const { showModal, toggleModal } = usePixelStore();

  const [board, setBoard] = useState({});
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");

  const router = useRouter();

  const getBoardById = async (id) => {
    const res = await fetch("http://localhost:8000/board/tracker/" + id);

    if (!res.ok) {
      console.error("Failed to fetch board", res.status);
      return [];
    }

    const data = await res.json();
    return data;
  };

  const updateBoard = async (id, updatedBoard) => {
    const res = await fetch("http://localhost:8000/board/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBoard),
    });

    if (!res.ok) {
      console.error("Failed to update board", res.status);
      return null;
    }

    const dataUpdated = await res.json();
    console.log("Board updated:", dataUpdated);
    return dataUpdated;
  };

  useEffect(() => {
    getBoardById(id).then((data) => {
      if (data && data.length > 0) {
        setBoard(data[0]);
        setTitle(data[0].category);
        setStartDate(data[0].start_date);
        setFinishDate(data[0].finish_date);
      }
    });
  }, [id]);

  const saveBoard = async () => {
    if (!board) return;

    const updated = await updateBoard(board.id, {
      ...board,
      category: title,
      start_date: startDate,
      finish_date: finishDate,
    });

    if (updated) {
      setBoard(updated);
    }
  };

  const deleteBoard = async () => {
    const res = await fetch(`http://localhost:8000/board/delete/${board.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Failed to delete board", res.status);
      return;
    }

    console.log("Board deleted successfully");

    router.push("/home/1?search=");
  };

  return (
    <div>
      {showModal && <PixelModal />}
      <div className={styles.header}>
        <div className={styles.titleprogress}>
          <h1
            contentEditable="true"
            suppressContentEditableWarning={true}
            onInput={(e) => setTitle(e.currentTarget.textContent)}
          >
            {board.category}
          </h1>
          <img src="/progress1.png" name="progress" />
        </div>
        <div className={styles.buttons}>
          <button onClick={saveBoard}>Save</button>
          <button onClick={() => router.push("/home/1?search=")}>Back</button>
          <button onClick={deleteBoard}>Delete</button>
        </div>
      </div>

      <div className={styles.calendarsettings}>
        <div className={styles.calendarwinner}>
          <Calendar />
        </div>
        <div className={styles.settings}>
          <div className={styles.colorCode}>
            <label>Color code:</label>
            <Color />
            <Color />
            <Color />
            <Color />
            <button>Add more</button>
          </div>
          <div className={styles.dates}>
            <label>Start date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>Finish date:</label>
            <input
              type="date"
              value={finishDate}
              onChange={(e) => setFinishDate(e.target.value)}
            />
          </div>
          <div className={styles.colorwinner}>
            <label>Color winner:</label>
            <Pixel />
          </div>
        </div>
      </div>
    </div>
  );
}
