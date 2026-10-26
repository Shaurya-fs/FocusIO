import "./BearSays.css";

function BearSays({ image, children }) {
  return (
    <div className="bear-says">
      <img className="breathe bear-says__img" src={image} alt="" width="84" />
      <div className="bear-says__bubble">{children}</div>
    </div>
  );
}

export default BearSays;
