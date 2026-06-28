import "../styles/Login.css";
import scholarImg from "../assets/scholar.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login">
      <div className="login-card">
        <img src={scholarImg} alt="scholar" className="login-img" />
        <h1>Login</h1>
        <input type="email" placeholder="Email" className="login-input" />
        <br />
        <input type="text" placeholder="Password" className="login-input" />
        <br />
        <button className='login-btn'>Login</button>
        <p>Don't have an account?</p>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
