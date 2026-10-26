import { useBearArt } from "./BearArt";
import "./Companion.css";

// The small bear that keeps the user company. It sleeps, sits or climbs, and wakes up when tapped.
function Companion({ pose, asleep, mood, awake, message, bearName, onTap }) {
  const art = useBearArt();
  let picture;

  if (asleep) {
    picture = (
      <span className="companion__sleep">
        <img
          className={art.posed ? "breathe companion__sleep-img" : "breathe companion__img companion__img--resting"}
          src={art.sleep}
          alt=""
          width={art.posed ? 86 : 70}
        />
        <span className="companion__z companion__z--1">z</span>
        <span className="companion__z companion__z--2">z</span>
        <span className="companion__z companion__z--3">z</span>
      </span>
    );
  } else if (pose === "climb") {
    picture = <img className="breathe companion__img" src={art.climb} alt="" width="70" />;
  } else {
    picture = <img className="breathe companion__img" src={art[mood]} alt="" width="70" />;
  }

  const label = bearName + (asleep ? " is sleeping. Tap to wake up." : " is awake. Tap to let it rest.");

  return (
    <div className="companion">
      {awake && message ? <span className="companion__say rise">{message}</span> : null}
      <button type="button" className={awake ? "companion__btn companion__btn--hop" : "companion__btn"} aria-label={label} onClick={onTap}>
        {picture}
      </button>
    </div>
  );
}

export default Companion;
