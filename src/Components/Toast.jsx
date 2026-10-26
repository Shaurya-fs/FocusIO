import "./Toast.css";

function Toast({ message }) {
  if (!message) {
    return null;
  }
  return (
    <div role="status" className="toast rise">
      {message}
    </div>
  );
}

export default Toast;
