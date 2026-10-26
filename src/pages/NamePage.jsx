import StepHeader from "../Components/StepHeader";
import BearSays from "../Components/BearSays";
import { useBearArt } from "../Components/BearArt";
import "./Onboarding.css";

function NamePage({ name, onNameChange, onBack, onNext }) {
  const art = useBearArt();
  return (
    <div className="screen onboarding">
      <StepHeader step={0} onBack={onBack} />
      <BearSays image={art.wave}>What should I call you?</BearSays>

      <div className="card onboarding__card">
        <label htmlFor="user-name" style={{ fontWeight: 700 }}>
          Your name
        </label>
        <input
          id="user-name"
          type="text"
          className="tf"
          placeholder="A first name or nickname is fine"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>

      <div className="onboarding__spacer" />
      <button type="button" className="btn" disabled={!name.trim()} onClick={onNext}>
        Continue
      </button>
    </div>
  );
}

export default NamePage;
