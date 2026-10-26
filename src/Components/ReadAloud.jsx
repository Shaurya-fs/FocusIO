import { useState } from "react";
import { SpeakerIcon } from "./Icons";
import { canSpeak, speak, stopSpeaking } from "../utils/speech";
import "./ReadAloud.css";

// A speaker button. With showText it also shows the words and marks each one as it is read.
function ReadAloud({ text, lang, showText, onHero }) {
  const [word, setWord] = useState(null);
  const [playing, setPlaying] = useState(false);

  if (!canSpeak()) {
    return showText ? <span>{text}</span> : null;
  }

  const toggle = () => {
    if (playing) {
      stopSpeaking();
      return;
    }
    setPlaying(true);
    speak(
      text,
      lang,
      (from, to) => setWord([from, to]),
      () => {
        setPlaying(false);
        setWord(null);
      }
    );
  };

  const button = (
    <button
      type="button"
      className={"read-aloud" + (onHero ? " read-aloud--hero" : "")}
      aria-label={playing ? "Stop reading" : "Read it to me"}
      aria-pressed={playing}
      onClick={toggle}
    >
      <SpeakerIcon playing={playing} />
    </button>
  );

  if (!showText) {
    return button;
  }

  return (
    <div className="read-aloud__row">
      <span>
        {word ? (
          <>
            {text.slice(0, word[0])}
            <mark className="read-aloud__word">{text.slice(word[0], word[1])}</mark>
            {text.slice(word[1])}
          </>
        ) : (
          text
        )}
      </span>
      {button}
    </div>
  );
}

export default ReadAloud;
