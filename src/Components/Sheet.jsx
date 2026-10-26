import "./Sheet.css";

function Sheet({ label, children }) {
  return (
    <div className="sheet-scrim">
      <div className="sheet rise" role="dialog" aria-modal="true" aria-label={label}>
        {children}
      </div>
    </div>
  );
}

export default Sheet;
