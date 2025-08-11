'use client';
import { use, useState } from 'react';

import styles from "./board.module.css";

import Calendar from "../../components/calendar";
import Color from "../../components/color";
import Pixel from "../../components/pixel";

export default function Board({params}) {
  const { id } = use(params);

  const [showPixelDetails, setShowPixelDetails] = useState(true);

  return (
    <div>
      {showPixelDetails && <div>
          hello
      </div>}
    
      <div className={styles.header}>
        <div className={styles.titleprogress}>
          <h1>Workout tracker</h1>
          <img src="/progress1.png" name="progress" />
        </div>
        <div className={styles.buttons}>
          <button>Save</button>
          <button>Back</button>
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
            <input />
            <label>Finish date:</label>
            <input />
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
