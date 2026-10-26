import "./Confetti.css";

// About two seconds of confetti falling over the screen. Taps go straight through it.
function Confetti({ pieces }) {
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti__piece"
          style={{
            left: piece.left + "%",
            width: piece.width + "px",
            height: piece.height + "px",
            borderRadius: piece.round ? "50%" : "2px",
            background: piece.colour,
            animationDelay: piece.delay + "s",
            animationDuration: piece.duration + "s",
            "--drift": piece.drift + "px",
            "--spin": piece.spin + "deg",
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
