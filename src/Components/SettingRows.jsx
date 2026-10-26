import { ArrowRightIcon } from "./Icons";
import "./SettingRows.css";

export function SettingHeading({ children }) {
  return <h2 className="muted t-sm setting-heading">{children}</h2>;
}

export function SettingToggle({ label, description, isOn, onToggle }) {
  return (
    <div className="setrow">
      <div className="setl">
        <span className="setn">{label}</span>
        {description ? <span className="muted t-sm">{description}</span> : null}
      </div>
      <button
        type="button"
        className="setting-switch"
        role="switch"
        data-on={isOn ? "yes" : "no"}
        aria-checked={isOn}
        aria-label={label}
        onClick={onToggle}
      />
    </div>
  );
}

// options is a list like [["Light", "light"], ["Dark", "dark"]]
export function SettingSegment({ label, description, value, options, onChange }) {
  return (
    <div className="setcol">
      <div className="setl">
        <span className="setn">{label}</span>
        {description ? <span className="muted t-sm">{description}</span> : null}
      </div>
      <div className="segwrap">
        {options.map((option) => (
          <button
            key={option[1]}
            type="button"
            className="seg"
            data-on={value === option[1] ? "yes" : "no"}
            aria-pressed={value === option[1]}
            onClick={() => onChange(option[1])}
          >
            {option[0]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SettingInput({ label, value, type = "text", onChange }) {
  return (
    <div className="setcol">
      <span className="setn">{label}</span>
      <input type={type} className="tf" aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function SettingInfo({ label, value }) {
  return (
    <div className="setrow">
      <span className="setn">{label}</span>
      <span className="muted">{value}</span>
    </div>
  );
}

export function SettingAction({ label, description, danger, onClick }) {
  return (
    <button type="button" className="setrow" data-danger={danger ? "yes" : "no"} onClick={onClick}>
      <div className="setl">
        <span className="setn">{label}</span>
        {description ? <span className="muted t-sm">{description}</span> : null}
      </div>
      <ArrowRightIcon />
    </button>
  );
}

// A grid of pictures to choose from, used for the bear and its outfits.
export function SettingPictures({ label, description, choices, value, onChange }) {
  return (
    <div className="setcol">
      <div className="setl">
        <span className="setn">{label}</span>
        <span className="muted t-sm">{description}</span>
      </div>
      <div className="setting-pictures">
        {choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            className="setting-pictures__choice"
            data-on={value === choice.id ? "yes" : "no"}
            aria-pressed={value === choice.id}
            onClick={() => onChange(choice.id)}
          >
            <img src={choice.thumb} alt="" width="58" />
            <span>{choice.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function SettingPalettes({ palettes, value, onChange }) {
  return (
    <div className="setcol">
      <div className="setl">
        <span className="setn">Colour scheme</span>
        <span className="muted t-sm">Two subtle, two happy and one more colourful</span>
      </div>
      <div className="setting-pictures">
        {palettes.map((palette) => (
          <button
            key={palette.id}
            type="button"
            className="setting-pictures__choice"
            data-on={value === palette.id ? "yes" : "no"}
            aria-pressed={value === palette.id}
            onClick={() => onChange(palette.id)}
          >
            <span className="setting-palette__dots" aria-hidden="true">
              {palette.swatches.map((colour) => (
                <span key={colour} className="setting-palette__dot" style={{ background: colour }} />
              ))}
            </span>
            <span>{palette.label}</span>
            <span className="muted t-xs" style={{ fontWeight: 400 }}>
              {palette.mood}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
