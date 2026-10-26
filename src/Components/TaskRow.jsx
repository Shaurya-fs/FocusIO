import { CheckIcon } from "./Icons";
import "./TaskRow.css";

function TaskRow({ time, title, meta, categoryClass, done, calendar, onToggle }) {
  return (
    <div className={"task-row " + categoryClass} data-done={done ? "yes" : "no"}>
      <span className="task-row__time">{time}</span>
      <div className="task-row__text">
        <span className="task-row__title">{title}</span>
        <span className="t-sm">{meta}</span>
        {calendar}
      </div>
      <button
        type="button"
        className="ck"
        data-done={done ? "yes" : "no"}
        aria-label={(done ? "Mark not done: " : "Mark done: ") + title}
        onClick={onToggle}
      >
        <CheckIcon />
      </button>
    </div>
  );
}

export default TaskRow;
