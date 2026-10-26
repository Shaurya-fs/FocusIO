import { GlobeIcon } from "../Components/Icons";
import "./Onboarding.css";

function WelcomePage({ bearName, bearLook, languageName, languageLabel, onOpenLanguage, onStart, onHaveAccount }) {
  return (
    <div className="screen welcome">
      <button type="button" className="btn2 welcome__language" aria-label={"Language: " + languageLabel + ". Change language"} onClick={onOpenLanguage}>
        <GlobeIcon />
        <span>{languageName}</span>
      </button>

      <div className="welcome__middle">
        <img className="welcome__bear" src={bearLook.full} alt={"Your bear, a friendly teddy bear in " + bearLook.alt + ", smiling"} width="210" />
        <h1 className="h t-xl title-row">Hi! I'm {bearName}.</h1>
        <p className="muted" style={{ margin: 0, maxWidth: "300px" }}>
          I'm your companion. I'll keep you company while you plan, remember the small stuff, and stay close on the days
          your head feels full. A calmer, brighter you, one day at a time.
        </p>
      </div>

      <div className="welcome__buttons">
        <button type="button" className="btn" onClick={onStart}>
          Nice to meet you
        </button>
        <button type="button" className="btn2 btn2--center" onClick={onHaveAccount}>
          I already have an account
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
