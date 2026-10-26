import ReadAloud from "./ReadAloud";
import CalendarButton from "./CalendarButton";
import "./ChatMessage.css";

const TIME_CHOICES = [
  ["Morning", "09:00", " at 9am"],
  ["After lunch", "14:00", " at 2pm"],
  ["Evening", "18:00", " at 6pm"],
];

function ChatMessage({ message, bearFace, readLang, showTimeChoices, formatTime, calendarTask, onAction, onPickTime, onCalendar }) {
  if (message.from === "user") {
    return <div className="chat-message__user">{message.text}</div>;
  }

  return (
    <div className="chat-message__bear-row">
      <span className="chat-message__avatar">
        <img src={bearFace} alt="" width="38" height="38" />
      </span>
      <div className="card chat-message__bear">
        {readLang ? <ReadAloud text={message.text} lang={readLang} showText /> : <span>{message.text}</span>}

        {showTimeChoices ? (
          <div className="chat-message__choices">
            {TIME_CHOICES.map(([label, time, words]) => (
              <button key={time} type="button" className="btn2" onClick={() => onPickTime(words)}>
                {label} · {formatTime(time)}
              </button>
            ))}
          </div>
        ) : null}

        {message.card ? (
          <div className="cat-people chat-message__card">
            <span style={{ fontWeight: 700 }}>{message.card.title}</span>
            <span className="t-sm">
              {message.card.time ? message.card.day + " · " + formatTime(message.card.time) : message.card.meta}
            </span>
            {message.card.where ? <span className="t-xs">{message.card.where}</span> : null}
            {calendarTask ? (
              <CalendarButton
                event={{ title: calendarTask.title, date: calendarTask.date, time: calendarTask.time, mins: calendarTask.mins }}
                added={calendarTask.inCalendar}
                onAdded={onCalendar}
              />
            ) : null}
          </div>
        ) : null}

        {message.actionLabel ? (
          <button type="button" className="btn2" onClick={onAction}>
            {message.actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ChatMessage;
