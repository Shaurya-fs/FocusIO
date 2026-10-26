// Says what comes next, in the same words every time, so a change of activity is never a surprise.
function HeadsUpCard({ when, title, length, doneWhen }) {
  return (
    <section className="card" role="status" style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "4px", borderLeft: "4px solid var(--hero)" }}>
      <span className="muted t-sm" style={{ fontWeight: 700 }}>
        Coming up
      </span>
      <span style={{ fontWeight: 700 }}>
        {when}: {title}.
      </span>
      <span className="muted t-sm">
        It takes {length}. Done when: {doneWhen}.
      </span>
    </section>
  );
}

export default HeadsUpCard;
