import { useState } from "react";
import { ChevronDownIcon } from "./Icons";
import "./NoticedPanel.css";

// What the bear has learned about the user. Every note can be forgotten.
function NoticedPanel({ notes, onForget, onReset }) {
  const [open, setOpen] = useState(false);

  let summary = "Nothing yet";
  if (notes.length > 0) {
    summary = notes.length + (notes.length === 1 ? " note" : " notes") + ". I use these when I plan.";
  }

  return (
    <div className="card noticed">
      <button type="button" className="noticed__toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontWeight: 700 }}>What I've noticed about you</span>
          <span className="muted t-sm">{summary}</span>
        </span>
        <ChevronDownIcon open={open} />
      </button>

      {open ? (
        <div className="noticed__body">
          <span className="muted t-sm">I use these when I suggest a plan. This is yours. Forget anything, any time.</span>

          {notes.map((note) => (
            <div key={note.id} className="noticed__note">
              <span>{note.text}</span>
              <span className="muted t-xs">{note.meta}</span>
              <div>
                <button type="button" className="btn2" onClick={() => onForget(note.id)}>
                  Forget this
                </button>
              </div>
            </div>
          ))}

          {notes.length === 0 ? (
            <span className="muted">Nothing yet. I'll note things as we go, and you can see every one.</span>
          ) : (
            <button type="button" className="btn2 btn2--center" onClick={onReset}>
              Reset everything I've learned
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default NoticedPanel;
