import { useEffect, useRef, useState } from "react";
import ChatMessage from "../Components/ChatMessage";
import NoticedPanel from "../Components/NoticedPanel";
import HeaderWithBear from "../Components/HeaderWithBear";
import { SendIcon } from "../Components/Icons";
import "./PlanPage.css";

const EXAMPLES = ["meeting at 5pm tomorrow", "I'm overwhelmed", "I can't start my report", "I missed my study block"];

function PlanPage({
  bearName,
  bearFace,
  voice,
  messages,
  notes,
  companion,
  tasks,
  readLang,
  pickTime,
  calendarOn,
  formatTime,
  onSend,
  onLowBattery,
  onForgetNote,
  onResetNotes,
  onCalendar,
}) {
  const [draft, setDraft] = useState("");
  const scrollBox = useRef(null);

  // Keep the newest message in view.
  useEffect(() => {
    if (scrollBox.current && messages.length > 0) {
      scrollBox.current.scrollTop = scrollBox.current.scrollHeight;
    }
  }, [messages.length]);

  const send = (text) => {
    if (!text.trim()) {
      return;
    }
    onSend(text.trim());
    setDraft("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    send(draft);
  };

  const allMessages = [{ id: "hello", from: "bear", text: voice.planHello }].concat(messages);

  return (
    <div className="plan">
      <div className="plan__scroll" ref={scrollBox}>
        <HeaderWithBear companion={companion}>
          <h1 className="h t-lg title-row">Plan with {bearName}</h1>
          <p className="muted t-sm" style={{ margin: 0 }}>
            {voice.planNote}
          </p>
        </HeaderWithBear>

        <NoticedPanel notes={notes} onForget={onForgetNote} onReset={onResetNotes} />

        {allMessages.map((message, index) => {
          const isLatest = index === allMessages.length - 1;
          const calendarTask = calendarOn && message.card ? tasks.find((task) => task.id === message.card.taskId) : null;
          return (
            <ChatMessage
              key={message.id}
              message={message}
              bearFace={bearFace}
              readLang={readLang}
              showTimeChoices={pickTime && isLatest && message.askTime}
              formatTime={formatTime}
              calendarTask={calendarTask}
              onAction={onLowBattery}
              onPickTime={(words) => send(message.askedAbout + words)}
              onCalendar={() => onCalendar(message.card.taskId)}
            />
          );
        })}
      </div>

      <div className="plan__examples">
        {EXAMPLES.map((example) => (
          <button key={example} type="button" className="btn2 plan__example" onClick={() => send(example)}>
            {example}
          </button>
        ))}
      </div>

      <form className="plan__input-row" onSubmit={handleSubmit}>
        <label htmlFor="plan-input" className="visually-hidden">
          Tell {bearName} what's going on
        </label>
        <input
          id="plan-input"
          type="text"
          className="plan__input"
          placeholder="Tell me what's going on…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className="plan__send" aria-label="Send">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

export default PlanPage;
