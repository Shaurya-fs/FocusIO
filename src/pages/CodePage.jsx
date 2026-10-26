import StepHeader from "../Components/StepHeader";
import BearSays from "../Components/BearSays";
import { useBearArt } from "../Components/BearArt";
import "./Onboarding.css";

function CodePage({ countryCode, phone, code, onCodeChange, onVerify, onResend, onChangeNumber, onBack }) {
  const art = useBearArt();
  const digits = phone.replace(/\D/g, "");
  const shownNumber = digits.length >= 4 ? "••• " + digits.slice(-4) : digits;

  return (
    <div className="screen onboarding">
      <StepHeader step={3} onBack={onBack} />
      <BearSays image={art.headphones}>Check your messages.</BearSays>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <h1 className="h t-lg title-row">Enter the code</h1>
        <p className="muted" style={{ margin: 0 }}>
          We sent a 6-digit code to {countryCode} {shownNumber}.
        </p>
      </div>

      <div className="card onboarding__card" style={{ gap: "12px" }}>
        <label htmlFor="code" style={{ fontWeight: 700 }}>
          6-digit code
        </label>
        <input
          id="code"
          type="text"
          inputMode="numeric"
          className="tf onboarding__code"
          placeholder="······"
          value={code}
          onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
        />
        <span className="muted t-xs">Text messages are not switched on yet, so any 6 digits will work for now.</span>
      </div>

      <button type="button" className="btn" disabled={code.length < 6} onClick={onVerify}>
        Verify and start
      </button>
      <div style={{ display: "flex", gap: "8px" }}>
        <button type="button" className="btn2 btn2--center" style={{ flexGrow: 1 }} onClick={onResend}>
          Resend code
        </button>
        <button type="button" className="btn2 btn2--center" style={{ flexGrow: 1 }} onClick={onChangeNumber}>
          Change number
        </button>
      </div>
    </div>
  );
}

export default CodePage;
