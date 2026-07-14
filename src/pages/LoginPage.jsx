import { useState } from "react";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="LoginCredentials">
          <h1>FocusIO</h1>

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
