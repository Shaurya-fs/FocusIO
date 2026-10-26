import "./TimeRing.css";

const RADIUS = 19;
const LENGTH = 2 * Math.PI * RADIUS;

// Time as a shape: the ring gets shorter as time passes, with the time in words next to it.
function TimeRing({ fraction, label }) {
  return (
    <div className="time-ring">
      <svg width="46" height="46" viewBox="0 0 46 46" aria-hidden="true">
        <circle className="time-ring__track" cx="23" cy="23" r={RADIUS} />
        <circle
          className="time-ring__fill"
          cx="23"
          cy="23"
          r={RADIUS}
          strokeDasharray={LENGTH}
          strokeDashoffset={LENGTH * (1 - fraction)}
          transform="rotate(-90 23 23)"
        />
      </svg>
      <span className="time-ring__label">{label}</span>
    </div>
  );
}

export default TimeRing;
