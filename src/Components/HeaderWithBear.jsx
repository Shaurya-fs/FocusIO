import "./HeaderWithBear.css";

// Page header with the companion bear resting on the line under it, so the bear never covers any content.
function HeaderWithBear({ companion, children }) {
  return (
    <div className="header-bear">
      <div className="header-bear__text">{children}</div>
      {companion}
    </div>
  );
}

export default HeaderWithBear;
