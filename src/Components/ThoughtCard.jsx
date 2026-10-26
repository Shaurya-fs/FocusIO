function ThoughtCard({ text, groupLabel, onMakeTask }) {
  return (
    <div className="card" style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <span>{text}</span>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <span className="chip">{groupLabel}</span>
        <button type="button" className="btn2" onClick={onMakeTask}>
          Make it a task
        </button>
      </div>
    </div>
  );
}

export default ThoughtCard;
