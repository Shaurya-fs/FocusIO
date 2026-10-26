import { useBearArt } from "./BearArt";

// Shown when a task did not happen. It never asks why.
function FailCard({ title, body, actions, onAction, onClose }) {
  const art = useBearArt();
  return (
    <section className="card rise" role="status" style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <img className="breathe" src={art.heart} alt="" width="48" />
      <h2 className="h" style={{ margin: 0, fontSize: "calc(var(--fs) + 5px)", lineHeight: 1.2 }}>
        {title}
      </h2>
      <p className="muted" style={{ margin: 0 }}>
        {body}
      </p>
      <button type="button" className="btn2" onClick={() => onAction("later")}>
        {actions[0]}
      </button>
      <button type="button" className="btn2" onClick={() => onAction("shorter")}>
        {actions[1]}
      </button>
      <button type="button" className="btn2" onClick={() => onAction("skip")}>
        {actions[2]}
      </button>
      <button type="button" className="btn2 btn2--plain" onClick={onClose}>
        Go back
      </button>
    </section>
  );
}

export default FailCard;
