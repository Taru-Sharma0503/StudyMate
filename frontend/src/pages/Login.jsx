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
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <p>
          Don't have an account?<Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
