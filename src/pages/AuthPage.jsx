import StepHeader from "../Components/StepHeader";
import BearSays from "../Components/BearSays";
import { GlobeIcon } from "../Components/Icons";
import { useBearArt } from "../Components/BearArt";
import "./Onboarding.css";

function AuthPage({ mode, name, countryCode, phone, languageLabel, onCountryCode, onPhone, onApple, onGoogle, onSendCode, onBack, onOpenLanguage }) {
  const art = useBearArt();
  const isSignUp = mode === "signup";
  const digits = phone.replace(/\D/g, "");

  const languageButton = (
    <button type="button" className="btn2 icon-btn" aria-label={"Language: " + languageLabel + ". Change language"} onClick={onOpenLanguage}>
      <GlobeIcon />
    </button>
  );

  return (
    <div className="screen onboarding">
      <StepHeader step={3} onBack={onBack} rightButton={languageButton} />
      <BearSays image={art.hug}>{isSignUp ? "Last step, " + (name || "friend") + "." : "Good to see you again!"}</BearSays>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <h1 className="h t-lg title-row">{isSignUp ? "Let's keep your plans safe" : "Welcome back"}</h1>
        <p className="muted" style={{ margin: 0 }}>
          {isSignUp
            ? "Create an account so your plans, and what I learn about you, follow you to any phone."
            : "Sign in to pick up where you left off."}
        </p>
        <p className="muted t-sm" style={{ margin: 0 }}>
          Accounts are coming soon. Until then, your plans are saved on this device only.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button type="button" className="onboarding__sso onboarding__sso--apple" onClick={onApple}>
          Continue with Apple
        </button>
        <button type="button" className="onboarding__sso" onClick={onGoogle}>
          Continue with Google
        </button>
      </div>

      <div className="onboarding__divider">
        <span />
        <span className="muted t-sm">or use your phone</span>
        <span />
      </div>

      <div className="card onboarding__card">
        <label htmlFor="phone" style={{ fontWeight: 700 }}>
          Phone number
        </label>
        <div style={{ display: "flex", gap: "8px" }}>
          <select
            className="tf"
            aria-label="Country code"
            style={{ width: "92px", flexShrink: 0 }}
            value={countryCode}
            onChange={(e) => onCountryCode(e.target.value)}
          >
            <option value="+91">+91</option>
            <option value="+49">+49</option>
            <option value="+44">+44</option>
            <option value="+1">+1</option>
          </select>
          <input
            id="phone"
            type="tel"
            className="tf"
            style={{ flexGrow: 1, minWidth: 0 }}
            placeholder="Your number"
            value={phone}
            onChange={(e) => onPhone(e.target.value)}
          />
        </div>
        <button type="button" className="btn" disabled={digits.length < 7} onClick={onSendCode}>
          Send me a code
        </button>
      </div>

      <span className="muted t-xs" style={{ textAlign: "center" }}>
        By continuing you agree to the Terms and the Privacy Policy.
      </span>
    </div>
  );
}

export default AuthPage;
