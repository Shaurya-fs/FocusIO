import { ArrowRightIcon } from "../Components/Icons";
import { PROFILE_OPTIONS } from "../data/profiles";

function MePage({ userName, signedInWith, bearBust, selected, routines, onChangeProfile, onOpenRoutines, onOpenSettings }) {
  const chosen = PROFILE_OPTIONS.filter((option) => selected[option.id]).map((option) => option.label);
  const routineSummary = routines.length === 0 ? "None yet" : routines.map((routine) => routine.name).join(", ");

  return (
    <div className="screen">
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <img className="breathe" src={bearBust} alt="" width="68" style={{ flexShrink: 0, height: "auto" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 className="h t-lg title-row">{userName || "You"}</h1>
          <span className="muted t-sm">{signedInWith ? "Signed in with " + signedInWith : "Saved on this device"}</span>
        </div>
      </div>

      <section className="card" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <span style={{ fontWeight: 700 }}>How I'm set up for you</span>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {(chosen.length ? chosen : ["Standard"]).map((label) => (
            <span key={label} className="chip">
              {label}
            </span>
          ))}
        </div>
        <button type="button" className="btn2" onClick={onChangeProfile}>
          Change how I'm set up
        </button>
      </section>

      <button type="button" className="setrow" onClick={onOpenRoutines}>
        <div className="setl">
          <span className="setn">Routines</span>
          <span className="muted t-sm">{routineSummary}</span>
        </div>
        <ArrowRightIcon />
      </button>

      <button type="button" className="setrow" onClick={onOpenSettings}>
        <div className="setl">
          <span className="setn">Settings</span>
          <span className="muted t-sm">Account, reminders, appearance, privacy</span>
        </div>
        <ArrowRightIcon />
      </button>
    </div>
  );
}

export default MePage;
