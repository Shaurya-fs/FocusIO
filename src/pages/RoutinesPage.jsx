import { useState } from "react";
import PageHeader from "../Components/PageHeader";
import RoutineCard from "../Components/RoutineCard";
import { todayKey } from "../utils/dateHelpers";

function RoutinesPage({ routines, onBack, onNew, onEdit, onDelete }) {
  const [deleteAskedFor, setDeleteAskedFor] = useState(null);

  // Deleting needs two taps, so a routine is never removed by accident.
  const handleDelete = (id) => {
    if (deleteAskedFor === id) {
      onDelete(id);
      setDeleteAskedFor(null);
    } else {
      setDeleteAskedFor(id);
    }
  };

  return (
    <div className="screen" style={{ gap: "10px" }}>
      <PageHeader title="Routines" backLabel="Back to Me" onBack={onBack} />
      <p className="muted" style={{ margin: 0 }}>
        Steps you repeat the same way, on the days you choose. Separate from your task list, and nothing here is ever
        marked as a fail.
      </p>

      {routines.map((routine) => (
        <RoutineCard
          key={routine.id}
          routine={routine}
          today={todayKey()}
          deleteAsked={deleteAskedFor === routine.id}
          onEdit={() => onEdit(routine.id)}
          onDelete={() => handleDelete(routine.id)}
        />
      ))}

      {routines.length === 0 ? (
        <span className="muted">
          No routines yet. A routine is a short checklist you repeat, like a morning start, a wind-down, or the days you
          train.
        </span>
      ) : null}

      <button type="button" className="btn" onClick={onNew}>
        + New routine
      </button>
    </div>
  );
}

export default RoutinesPage;
