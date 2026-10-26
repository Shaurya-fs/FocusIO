import { CheckIcon } from "./Icons";

// A routine on the Today screen. Unfinished steps are never shown as a fail.
// With Plan B on, a step can be swapped for its lighter version just for today.
function RoutineChecklist({ routine, lowBattery, today, planBOn, onToggleStep, onSwapStep }) {
  const visibleSteps = lowBattery ? routine.steps.filter((step) => step.essential) : routine.steps;
  const hiddenCount = routine.steps.length - visibleSteps.length;
  const doneCount = routine.steps.filter((step) => step.doneDate === today).length;

  return (
    <section className="card" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
        <span style={{ fontWeight: 700 }}>{routine.name}</span>
        <span className="chip">
          {doneCount}/{routine.steps.length}
        </span>
      </div>

      {visibleSteps.map((step) => {
        const done = step.doneDate === today;
        const swapped = planBOn && step.planB && step.planBDate === today;
        const label = swapped ? step.planB : step.label;
        return (
          <div key={step.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              type="button"
              className="ck"
              data-done={done ? "yes" : "no"}
              aria-label={label}
              onClick={() => onToggleStep(routine.id, step.id)}
            >
              <CheckIcon />
            </button>
            <span style={{ opacity: done ? 0.55 : 1, flexGrow: 1 }}>
              {label}
              {swapped ? <span className="muted t-xs"> · Plan B</span> : null}
            </span>
            {planBOn && step.planB && !done ? (
              <button type="button" className="mini" style={{ minHeight: "36px" }} onClick={() => onSwapStep(routine.id, step.id)}>
                {swapped ? "Back to plan" : "Plan B"}
              </button>
            ) : null}
          </div>
        );
      })}

      {hiddenCount > 0 ? (
        <span className="muted t-xs">
          {hiddenCount} {hiddenCount === 1 ? "step is" : "steps are"} tucked away for today
        </span>
      ) : null}
    </section>
  );
}

export default RoutineChecklist;
