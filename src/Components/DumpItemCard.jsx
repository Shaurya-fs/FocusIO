import ReadAloud from "./ReadAloud";
import CalendarButton from "./CalendarButton";
import "./DumpItemCard.css";

function DumpItemCard({ item, isFirst, showDoneWhen, durationText, readLang, calendarOn, onCalendar, onToggle, onAdd }) {
  let tagClass = "cat-neutral";
  if (item.days !== null && item.days <= 1) {
    tagClass = "cat-people";
  } else if (item.days !== null) {
    tagClass = "cat-study";
  }

  return (
    <div className="dump-item">
      <div className="card dump-item__card">
        <div className="dump-item__top">
          <span className="dump-item__title">{item.title}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            {readLang ? <ReadAloud text={item.title + ". " + item.when + ". " + item.why} lang={readLang} /> : null}
            <span className={"tag " + tagClass}>{item.when}</span>
          </div>
        </div>

        {isFirst ? (
          <div>
            <span className="chip">Start here</span>
          </div>
        ) : null}

        <span className="muted t-sm">{item.why}</span>
        {showDoneWhen ? <span className="t-sm">Done when: {item.doneWhen}.</span> : null}
        {calendarOn && item.date ? (
          <CalendarButton event={{ title: item.title, date: item.date, details: item.why }} added={item.inCalendar} onAdded={onCalendar} />
        ) : null}

        <div className="dump-item__buttons">
          <button type="button" className="btn2" aria-expanded={item.open} onClick={onToggle}>
            {item.open ? "Hide the steps" : "Show me the steps (" + item.steps.length + ")"}
          </button>
          {item.added ? (
            <span className="chip">First step is on Today</span>
          ) : (
            <button type="button" className="btn2" onClick={onAdd}>
              Add first step to Today
            </button>
          )}
        </div>
      </div>

      {item.open
        ? item.steps.map((step, index) => (
            <div key={step.text} className="dump-item__step">
              <span className="dump-item__number">{index + 1}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span>{step.text}</span>
                {step.mins ? <span className="muted t-xs">{durationText(step.mins)}</span> : null}
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default DumpItemCard;
