import "./CelebrationCard.css";

function CelebrationCard({ title, body, showRings, onContinue }) {
  return (
    <section className="celebration" role="status">
      {showRings ? (
        <div className="celebration__rings">
          <div className="celebration__ring" />
          <div className="celebration__ring celebration__ring--late" />
          <div className="celebration__circle">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path className="celebration__tick" d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="celebration__small">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
      )}

      <div className="rise" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <h2 className="h" style={{ margin: 0, fontSize: "calc(var(--fs) + 6px)", lineHeight: 1.15 }}>
          {title}
        </h2>
        {body ? <p style={{ margin: 0 }}>{body}</p> : null}
        <button type="button" className="btn2" style={{ alignSelf: "flex-start", borderColor: "currentColor" }} onClick={onContinue}>
          Continue
        </button>
      </div>
    </section>
  );
}

export default CelebrationCard;
