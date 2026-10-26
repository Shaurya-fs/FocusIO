import "./QuietScreen.css";

// The "Too much" screen. Grey, still and quiet, with nothing to do until you're ready.
function QuietScreen({ bearImage, nextLine, onClose }) {
  return (
    <div className="quiet-screen" role="dialog" aria-modal="true" aria-label="Quiet screen">
      <img className="quiet-screen__bear" src={bearImage} alt="" width="120" />
      <h2 className="h quiet-screen__title">Nothing needs you right now.</h2>
      <p className="quiet-screen__body">Everything is saved. It will all still be here.</p>
      {nextLine ? <p className="quiet-screen__next">{nextLine}</p> : null}
      <button type="button" className="quiet-screen__close" onClick={onClose}>
        I'm OK now
      </button>
    </div>
  );
}

export default QuietScreen;
