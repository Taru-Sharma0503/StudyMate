import "../styles/Login.css";
import scholarImg from "../assets/scholar.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { ProgressBar } from "react-loader-spinner";

export default function Login() {
  const { loading, loginUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return (
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
      />
    );
  }

  return (
    <div className="login">
      <div className="login-card">
        <img src={scholarImg} alt="scholar" className="login-img" />
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to continue with StudyMate.</p>
        <form className="auth-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="login-btn" type="submit">Login</button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
      </div>
    </div>
  );
}
