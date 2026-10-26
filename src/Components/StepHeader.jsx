import { BackIcon } from "./Icons";
import "./StepHeader.css";

function StepHeader({ step, onBack, rightButton }) {
  return (
    <div className="step-header">
      <button type="button" className="btn2 icon-btn" aria-label="Back" onClick={onBack}>
        <BackIcon />
      </button>

      <div className="step-header__dots" aria-label={"Step " + (step + 1) + " of 4"}>
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="step-header__dot" data-on={n === step ? "yes" : "no"} />
        ))}
      </div>

      {rightButton ? rightButton : <span className="step-header__spacer" />}
    </div>
  );
}

export default StepHeader;
