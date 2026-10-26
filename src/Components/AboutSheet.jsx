import { useState } from "react";
import Sheet from "./Sheet";
import { CheckIcon, ChevronDownIcon } from "./Icons";
import { PROFILE_OPTIONS, PROFILE_CHANGES, getTheme } from "../data/profiles";
import { useBearArt } from "./BearArt";
import "./AboutSheet.css";

// "How does your brain work" question. Optional, and only changes how the app looks and talks.
function AboutSheet({ selected, onToggle, onContinue, onSkip, skipLabel }) {
  const art = useBearArt();
  const [listOpen, setListOpen] = useState(false);

  const chosen = PROFILE_OPTIONS.filter((o) => selected[o.id]).map((o) => o.label);
  const theme = getTheme(selected);

  let changes = PROFILE_CHANGES[theme] || ["Everything stays standard. I'll adjust as I learn what you like."];
  if (selected.dyslexia) {
    changes = changes.concat("Reading support: soft cream background, wider spacing, no capitals");
  }
  if (selected.dyscalc) {
    changes = changes.concat("Times and lengths are shown in plain words");
  }

  return (
    <Sheet label="About how your brain works">
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img className="breathe" src={art.curious} alt="" width="60" style={{ flexShrink: 0 }} />
        <h2 className="h sheet__title">Is there anything I should know about how your brain works?</h2>
      </div>
      <p className="muted" style={{ margin: 0 }}>
        Pick anything that fits. It's optional, and it only shapes how I look and talk. You can change it any time.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <span id="brain-label" style={{ fontWeight: 700 }}>
          My brain…
        </span>
        <button
          type="button"
          className="about__field"
          aria-labelledby="brain-label"
          aria-expanded={listOpen}
          onClick={() => setListOpen(!listOpen)}
        >
          <span>{chosen.length ? chosen.join(", ") : "Nothing selected. I'll keep things standard."}</span>
          <ChevronDownIcon open={listOpen} />
        </button>

        {listOpen ? (
          <div className="card" style={{ overflow: "hidden" }}>
            {PROFILE_OPTIONS.map((option) => {
              const isOn = !!selected[option.id];
              return (
                <button
                  key={option.id}
                  type="button"
                  className="about__option"
                  data-on={isOn ? "yes" : "no"}
                  aria-pressed={isOn}
                  onClick={() => onToggle(option.id)}
                >
                  <span className="about__box">
                    <CheckIcon size={16} width={3.2} />
                  </span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 700 }}>{option.label}</span>
                    <span className="muted t-sm">{option.note}</span>
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="card" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={{ fontWeight: 700 }}>What will change for you</span>
        {changes.map((line) => (
          <span key={line} className="muted t-sm">
            {line}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button type="button" className="btn" onClick={onContinue}>
          Continue
        </button>
        <button type="button" className="btn2 btn2--plain" onClick={onSkip}>
          {skipLabel}
        </button>
      </div>
    </Sheet>
  );
}

export default AboutSheet;
