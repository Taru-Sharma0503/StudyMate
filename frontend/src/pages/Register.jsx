import "../styles/Register.css";
import scholarImg from "../assets/scholar.png";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="register">
      <div className="register-card">
        <img src={scholarImg} alt="scholar" className="register-img" />
        <h1>Register</h1>
        <input type="email" placeholder="Email" className="register-input" />
        <button className="register-btn">Verify Email</button>
        <br />
        <input type="text" placeholder="Enter OTP sent to your email" className="register-input" />
        <button className="register-btn">Verify Code</button>
        <br />
        <input type="text" placeholder="Username" className="register-input" />
        <br />
        <input type="text" placeholder="Password" className="register-input" />
        <br />
        <button className='register-btn'>Register</button>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
