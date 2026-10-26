import { useState } from "react";
import "./ParkThought.css";

// A quick place for a stray thought. It goes to Unpack so you can stay on what you're doing.
function ParkThought({ onPark }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const park = (event) => {
    event.preventDefault();
    if (!text.trim()) {
      return;
    }
    onPark(text.trim());
    setText("");
    setOpen(false);
  };

  if (!open) {
    return (
      <button type="button" className="btn2 btn2--plain park-thought__open" onClick={() => setOpen(true)}>
        Park a thought
      </button>
    );
  }

  return (
    <form className="card park-thought" onSubmit={park}>
      <label htmlFor="park-input" style={{ fontWeight: 700 }}>
        What popped into your head?
      </label>
      <div className="park-thought__row">
        <input id="park-input" type="text" className="tf" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" className="btn" disabled={!text.trim()}>
          Park it
        </button>
      </div>
      <div className="park-thought__row">
        <span className="muted t-xs">It waits in Unpack. You can sort it later.</span>
        <button type="button" className="btn2 btn2--plain" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ParkThought;
