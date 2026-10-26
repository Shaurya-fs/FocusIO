import { useRef, useState } from "react";
import { MicIcon } from "./Icons";
import { canListen, listen } from "../utils/speech";
import "./VoiceDumpButton.css";

// Speak instead of typing. What you say is added after what is already written.
function VoiceDumpButton({ lang, text, onTextChange }) {
  const [listening, setListening] = useState(false);
  const [problem, setProblem] = useState("");
  const stopListening = useRef(null);

  if (!canListen()) {
    return <span className="muted t-sm">Speaking works in Chrome on Android and on computers. You can still type here.</span>;
  }

  const toggle = () => {
    if (listening) {
      stopListening.current();
      return;
    }
    const before = text.trim();
    setProblem("");
    setListening(true);
    stopListening.current = listen(
      lang,
      (heard) => onTextChange(before ? before + "\n" + heard : heard),
      (failed) => {
        setListening(false);
        if (failed) {
          setProblem("I couldn't hear that. Try again, or type instead.");
        }
      }
    );
  };

  return (
    <div className="voice-dump">
      <button type="button" className="btn2 voice-dump__button" data-on={listening ? "yes" : "no"} aria-pressed={listening} onClick={toggle}>
        <MicIcon />
        {listening ? "Listening. Tap to stop" : "Speak instead"}
      </button>
      {problem ? <span className="muted t-sm">{problem}</span> : null}
    </div>
  );
}

export default VoiceDumpButton;
