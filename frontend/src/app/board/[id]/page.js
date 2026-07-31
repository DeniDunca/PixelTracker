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

  const {
    showModal,
    toggleModal,
    colors,
    setColors,
    pixels
  } = usePixelStore(); const [board, setBoard] = useState({});
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const draftKey = `board-draft-${id}`;

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
    const loadBoard = async () => {

      const savedDraft = localStorage.getItem(draftKey);

      if (savedDraft) {
        const draft = JSON.parse(savedDraft);

        setBoard(draft);
        setTitle(draft.category);
        setStartDate(draft.start_date);
        setFinishDate(draft.finish_date);

        if (draft.colors) {
          setColors(draft.colors);
        }

        return;
      }


      const data = await getBoardById(id);

      if (data && data.length > 0) {
        setBoard(data[0]);
        setTitle(data[0].category);
        setStartDate(data[0].start_date);
        setFinishDate(data[0].finish_date);
      }
    };


    loadBoard();

  }, [id]);

  useEffect(() => {
    if (!board.id) return;

    const draft = {
      ...board,
      category: title,
      start_date: startDate,
      finish_date: finishDate,
      colors,
    };

    localStorage.setItem(draftKey, JSON.stringify(draft));

  }, [title, startDate, finishDate, colors]);

  const saveBoard = async () => {
    if (!board) return;

    const updated = await updateBoard(board.id, {
      ...board,
      category: title,
      start_date: startDate,
      finish_date: finishDate,
      colors: colors,
      pixels: pixels
    });


    if (updated) {
      setBoard(updated);

      // remove local draft after successful save
      localStorage.removeItem(`board-${board.id}-pixels`);

      console.log("Saved successfully");
    }
  };

  const deleteBoard = async () => {

    const res = await fetch(
      `http://localhost:8000/board/delete/${board.id}`,
      {
        method: "DELETE"
      }
    );

    if (!res.ok) return;


    localStorage.removeItem(
      `board-${board.id}-pixels`
    );


    router.push("/home/1?search=");
  };

  const addColor = () => {
    setColors((prev) => {
      if (prev.length >= 10) {
        return prev;
      }

      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          value: "#f3fafb",
        },
      ];
    });
  };

  const updateColor = (id, newColor) => {
    setColors((prev) =>
      prev.map((color) =>
        color.id === id
          ? { ...color, value: newColor }
          : color
      )
    );
  };

  const deleteColor = (id) => {
    setColors((prev) => prev.filter((color) => color.id !== id));
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

            {colors.map((color) => (
              <Color
                key={color.id}
                color={color.value}
                onChange={(newColor) => updateColor(color.id, newColor)}
                onDelete={() => deleteColor(color.id)}
              />
            ))}
            <button
              className={styles.colorCodeButton}
              onClick={addColor}
              disabled={colors.length >= 10}
            >
              + Add more
            </button>
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
