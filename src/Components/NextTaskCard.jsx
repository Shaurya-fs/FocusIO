import ReadAloud from "./ReadAloud";
import { CheckIcon } from "./Icons";
import "./NextTaskCard.css";

function NextTaskCard({
  label,
  time,
  title,
  meta,
  categoryClass,
  categoryName,
  hint,
  failLabel,
  ring,
  calendar,
  readLang,
  startLabel,
  onStart,
  onDone,
  onFail,
}) {
  return (
    <section className="next-task" aria-label="Next task">
      <div className="next-task__top">
        <span className="t-sm next-task__label">
          {label} · {time}
        </span>
        <div className="next-task__tags">
          {readLang ? <ReadAloud text={title + ". " + meta + ". " + (hint || "")} lang={readLang} onHero /> : null}
          <span className={"tag " + categoryClass}>{categoryName}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <h2 className="h next-task__title">{title}</h2>
        <span className="next-task__meta">{meta}</span>
      </div>

      {ring}
      {calendar}

      {hint ? <p className="next-task__hint">{hint}</p> : null}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button type="button" className="next-task__done" onClick={onDone}>
          <CheckIcon width={2.4} />
          Mark as done
        </button>
        {onStart ? (
          <button type="button" className="next-task__fail" onClick={onStart}>
            {startLabel}
          </button>
        ) : null}
        <button type="button" className="next-task__fail" onClick={onFail}>
          {failLabel}
        </button>
      </div>
    </section>
  );
}

export default NextTaskCard;
