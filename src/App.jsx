import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <HomePage />
  ) : (
    <LoginPage onLogin={() => setIsLoggedIn(true)} />
  );
}

export default App;
