import { scheduleLabel, TIME_OF_DAY } from "../data/routines";

function RoutineCard({ routine, today, deleteAsked, onEdit, onDelete }) {
  const doneCount = routine.steps.filter((step) => step.doneDate === today).length;
  const stepCount = routine.steps.length + (routine.steps.length === 1 ? " step" : " steps");

  return (
    <div className="card" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontWeight: 700 }}>{routine.name}</span>
          <span className="muted t-sm">
            {scheduleLabel(routine.days)} · {TIME_OF_DAY[routine.timeOfDay]} · {stepCount}
          </span>
        </div>
        <span className="chip">
          {doneCount}/{routine.steps.length}
        </span>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="button" className="btn2" style={{ flexGrow: 1 }} onClick={onEdit}>
          Edit
        </button>
        <button type="button" className="btn2" onClick={onDelete}>
          {deleteAsked ? "Tap again to delete" : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default RoutineCard;
