import { BackIcon } from "./Icons";

function PageHeader({ title, backLabel, onBack }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <button type="button" className="btn2 icon-btn" aria-label={backLabel} onClick={onBack}>
        <BackIcon />
      </button>
      <h1 className="h t-lg title-row">{title}</h1>
    </div>
  );
}

export default PageHeader;
