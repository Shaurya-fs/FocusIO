import { useState } from "react";
import ParkThought from "./ParkThought";
import { useNow } from "../utils/useNow";
import { minutesInWords, padTwo } from "../utils/textHelpers";
import "./FocusSession.css";

const BLOCK = 10 * 60000;
const OVER_LIMIT = 20;

// The bear sits with you while you work: a calm 10 minute timer and a place to park thoughts.
// With the hyperfocus check on, it also says something when the task runs 20 minutes over.
function FocusSession({ task, nextTask, bearImage, bearName, wordsOnly, parkOn, hyperOn, formatTime, onPark, onDone, onClose }) {
  const now = useNow(1000).getTime();
  const [startedAt] = useState(() => Date.now());
  const [blockEnd, setBlockEnd] = useState(() => Date.now() + BLOCK);
  const [checkAt, setCheckAt] = useState(() => Date.now() + (Math.max(task.mins, 10) + OVER_LIMIT) * 60000);

  const left = Math.max(0, blockEnd - now);
  const blockOver = left === 0;
  const minutesOn = Math.max(1, Math.round((now - startedAt) / 60000));
  const showCheck = hyperOn && now >= checkAt;

  let clock = Math.floor(left / 60000) + ":" + padTwo(Math.floor((left % 60000) / 1000));
  if (wordsOnly) {
    clock = minutesInWords(Math.ceil(left / 60000)) + " left";
  }

  let nextLine = "Nothing else is planned right now.";
  if (nextTask) {
    nextLine = "Your next item is " + nextTask.title + " at " + formatTime(nextTask.time) + ".";
  }

  return (
    <div className="focus-session" role="dialog" aria-modal="true" aria-label={bearName + " is with you"}>
      <img className="breathe focus-session__bear" src={bearImage} alt="" width="140" />
      <span className="muted">{bearName} is here with you.</span>
      <h2 className="h focus-session__task">{task.title}</h2>

      {showCheck ? (
        <section className="card focus-session__card" role="status">
          <span style={{ fontWeight: 700 }}>
            You've been on this {minutesOn} minutes. {nextLine}
          </span>
          <span className="muted">Keep going, or stop and move on? Either is fine.</span>
          <button type="button" className="btn2" onClick={() => setCheckAt(now + OVER_LIMIT * 60000)}>
            Keep going
          </button>
          <button type="button" className="btn2" onClick={onClose}>
            Stop and move on
          </button>
        </section>
      ) : null}

      {!showCheck && blockOver ? (
        <section className="card focus-session__card" role="status">
          <span style={{ fontWeight: 700 }}>10 minutes done. Keep going, or stop here? Both are fine.</span>
          <button type="button" className="btn2" onClick={() => setBlockEnd(now + BLOCK)}>
            Another 10 minutes
          </button>
          <button type="button" className="btn2" onClick={onClose}>
            Stop here
          </button>
        </section>
      ) : null}

      {!showCheck && !blockOver ? (
        <div className="focus-session__timer" aria-live="off">
          <span className="focus-session__clock">{clock}</span>
          <div className="focus-session__bar">
            <div style={{ width: (100 * left) / BLOCK + "%" }} />
          </div>
          <span className="muted t-sm">Just the first small bit. No need to finish.</span>
        </div>
      ) : null}

      {parkOn ? <ParkThought onPark={onPark} /> : null}

      <div className="focus-session__buttons">
        <button type="button" className="btn" onClick={onDone}>
          Mark as done
        </button>
        <button type="button" className="btn2 btn2--plain" onClick={onClose}>
          Stop for now
        </button>
      </div>
    </div>
  );
}

export default FocusSession;
