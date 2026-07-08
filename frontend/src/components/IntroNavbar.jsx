import "./IntroNavbar.css";
import { useNavigate } from "react-router-dom";

export default function IntroNavbar() {
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }

  function handleSignup() {
    navigate("/register");
  }

  return (
    <div className="intro-navbar">
      <p className="app-name">StudyMate</p>
      <div className="navbar-btns">
        <button className="login-btn-intro" onClick={handleLogin}>
          Login
        </button>
        <button className="get-started-btn" onClick={handleSignup}>
          Get Started
        </button>
      </div>
    </div>
  );
}
