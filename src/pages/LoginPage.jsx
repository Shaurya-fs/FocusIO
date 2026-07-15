import { useState } from "react";
import "./LoginPage.css";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="LoginCredentials">
          <h1>FocuSIO</h1>
          <p className="login-subtitle">AI assisted daily planner</p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={onLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
