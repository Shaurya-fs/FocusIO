import { useBearArt } from "./BearArt";

// After a week, one gentle suggestion. Nothing changes unless the person says yes.
function WeekTipCard({ text, onYes, onNo }) {
  const art = useBearArt();
  return (
    <section className="card rise" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={art.idea} alt="" width="44" style={{ height: "auto" }} />
        <span style={{ fontWeight: 700 }}>Something to try</span>
      </div>
      <span>{text}</span>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button type="button" className="btn2" onClick={onYes}>
          Try it for a week
        </button>
        <button type="button" className="btn2 btn2--plain" onClick={onNo}>
          No thanks
        </button>
      </div>
    </section>
  );
}

export default WeekTipCard;
