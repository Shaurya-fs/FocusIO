import { useBearArt } from "./BearArt";
import "./CelebrationCard.css";

function DayDoneCard({ title, body, onPlanMore }) {
  const art = useBearArt();
  return (
    <section className="celebration" role="status" style={{ flexDirection: "column", alignItems: "flex-start" }}>
      <img className="breathe" src={art.proud} alt="" width="84" />
      <h2 className="h" style={{ margin: 0, fontSize: "calc(var(--fs) + 10px)", lineHeight: 1.15 }}>
        {title}
      </h2>
      <p style={{ margin: 0 }}>{body}</p>
      <button type="button" className="btn2" style={{ borderColor: "currentColor" }} onClick={onPlanMore}>
        Add something else
      </button>
    </section>
  );
}

export default DayDoneCard;
