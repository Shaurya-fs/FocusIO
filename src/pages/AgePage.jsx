import StepHeader from "../Components/StepHeader";
import BearSays from "../Components/BearSays";
import { useBearArt } from "../Components/BearArt";
import "./Onboarding.css";

function AgePage({ name, age, onAgeChange, onBack, onNext }) {
  const art = useBearArt();
  const ageNumber = parseInt(age, 10);
  const ageIsValid = !isNaN(ageNumber) && ageNumber >= 5 && ageNumber <= 120;

  const changeAge = (amount) => {
    if (isNaN(ageNumber)) {
      onAgeChange("24");
    } else {
      onAgeChange(String(Math.min(120, Math.max(5, ageNumber + amount))));
    }
  };

  return (
    <div className="screen onboarding">
      <StepHeader step={1} onBack={onBack} />
      <BearSays image={art.curious}>Nice to meet you, {name || "friend"}. How old are you?</BearSays>

      <div className="card onboarding__card" style={{ alignItems: "center", gap: "12px" }}>
        <label htmlFor="user-age" style={{ fontWeight: 700, alignSelf: "flex-start" }}>
          Your age
        </label>
        <div className="onboarding__age-row">
          <button type="button" className="btn2 onboarding__age-btn" aria-label="One year younger" onClick={() => changeAge(-1)}>
            −
          </button>
          <input
            id="user-age"
            type="number"
            className="tf onboarding__age-input"
            placeholder="0"
            value={age}
            onChange={(e) => onAgeChange(e.target.value)}
          />
          <button type="button" className="btn2 onboarding__age-btn" aria-label="One year older" onClick={() => changeAge(1)}>
            +
          </button>
        </div>
        <span className="muted t-sm" style={{ textAlign: "center" }}>
          I only use this to pick words that fit you.
        </span>
      </div>

      <div className="onboarding__spacer" />
      <button type="button" className="btn" disabled={!ageIsValid} onClick={onNext}>
        Continue
      </button>
    </div>
  );
}

export default AgePage;
