import { useState } from "react";
import PageHeader from "../Components/PageHeader";
import { CloseIcon } from "../Components/Icons";
import { DAY_ORDER, DAY_LETTER, DAY_FULL, TIME_OF_DAY } from "../data/routines";

function RoutineEditPage({ routine, isNew, planBOn, onBack, onSave }) {
  const [draft, setDraft] = useState(routine);
  const [newStep, setNewStep] = useState("");

  const toggleDay = (day) => {
    setDraft({ ...draft, days: { ...draft.days, [day]: !draft.days[day] } });
  };

  const addStep = () => {
    const label = newStep.trim();
    if (!label) {
      return;
    }
    const step = { id: "st" + Date.now(), label, essential: draft.steps.length === 0, doneDate: null };
    setDraft({ ...draft, steps: draft.steps.concat(step) });
    setNewStep("");
  };

  const removeStep = (stepId) => {
    setDraft({ ...draft, steps: draft.steps.filter((step) => step.id !== stepId) });
  };

  const toggleEssential = (stepId) => {
    setDraft({
      ...draft,
      steps: draft.steps.map((step) => (step.id === stepId ? { ...step, essential: !step.essential } : step)),
    });
  };

  const setPlanB = (stepId, planB) => {
    setDraft({
      ...draft,
      steps: draft.steps.map((step) => (step.id === stepId ? { ...step, planB } : step)),
    });
  };

  const canSave = draft.name.trim() !== "" && draft.steps.length > 0;

  return (
    <div className="screen" style={{ gap: "10px" }}>
      <PageHeader title={isNew ? "New routine" : "Edit routine"} backLabel="Back to Routines" onBack={onBack} />

      <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span className="muted t-sm" style={{ fontWeight: 700 }}>
          Name
        </span>
        <input
          type="text"
          className="tf"
          placeholder="Morning routine"
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        />
      </label>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span className="muted t-sm" style={{ fontWeight: 700 }}>
          Days
        </span>
        <div className="segwrap">
          {DAY_ORDER.map((day) => (
            <button
              key={day}
              type="button"
              className="seg"
              data-on={draft.days[day] ? "yes" : "no"}
              aria-pressed={!!draft.days[day]}
              aria-label={DAY_FULL[day]}
              onClick={() => toggleDay(day)}
            >
              {DAY_LETTER[day]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span className="muted t-sm" style={{ fontWeight: 700 }}>
          Time of day
        </span>
        <div className="segwrap">
          {Object.keys(TIME_OF_DAY).map((key) => (
            <button
              key={key}
              type="button"
              className="seg"
              data-on={draft.timeOfDay === key ? "yes" : "no"}
              aria-pressed={draft.timeOfDay === key}
              onClick={() => setDraft({ ...draft, timeOfDay: key })}
            >
              {TIME_OF_DAY[key]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <span className="muted t-sm" style={{ fontWeight: 700 }}>
          Steps
        </span>

        {draft.steps.map((step) => (
          <div key={step.id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div className="setrow" style={{ gap: "8px" }}>
              <div className="setl" style={{ flexGrow: 1 }}>
                <span className="setn">{step.label}</span>
                <span className="muted t-sm">{step.essential ? "Kept on low battery days" : "Skipped on low battery days"}</span>
              </div>
              <button type="button" className="mini" onClick={() => toggleEssential(step.id)}>
                {step.essential ? "Essential" : "Make essential"}
              </button>
              <button type="button" className="btn2 icon-btn" aria-label={"Remove step: " + step.label} onClick={() => removeStep(step.id)}>
                <CloseIcon />
              </button>
            </div>
            {planBOn ? (
              <input
                type="text"
                className="tf"
                style={{ minHeight: "44px" }}
                placeholder="Plan B: a lighter version (optional)"
                aria-label={"Plan B for " + step.label}
                value={step.planB || ""}
                onChange={(e) => setPlanB(step.id, e.target.value)}
              />
            ) : null}
          </div>
        ))}

        {draft.steps.length === 0 ? (
          <span className="muted t-sm">Add the steps in order, as many or as few as you like.</span>
        ) : null}

        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            className="tf"
            style={{ flexGrow: 1 }}
            placeholder="Add a step"
            aria-label="New step"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addStep();
              }
            }}
          />
          <button type="button" className="btn2" onClick={addStep}>
            Add
          </button>
        </div>
      </div>

      <button type="button" className="btn" disabled={!canSave} onClick={() => onSave({ ...draft, name: draft.name.trim() })}>
        {isNew ? "Create routine" : "Save routine"}
      </button>
    </div>
  );
}

export default RoutineEditPage;
