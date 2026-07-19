import "../styles/Register.css";
import scholarImg from "../assets/scholar.png";
import { Link , useNavigate} from "react-router-dom";
import {useState} from "react";
import useAuth from "../hooks/useAuth";
import { ProgressBar } from "react-loader-spinner";

export default function Register() {
  const navigate=useNavigate();
  const {loading,registerUser}=useAuth();
  const [email,setEmail]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  async function handleRegister(){
    try {
    await registerUser(email,username,password);
    navigate("/login");
    }
    catch(err){
      console.log(err);
    }
  }

  if(loading) {
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
    <div className="register">
      <div className="register-card">
        <img src={scholarImg} alt="scholar" className="register-img" />
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Start organizing your study life.</p>
        <input type="email" placeholder="Email" className="register-input" onChange={(e)=>setEmail(e.target.value)} />
        <input type="text" placeholder="Username" className="register-input" onChange={(e)=>setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="register-input" onChange={(e)=>setPassword(e.target.value)} />
        <br />
        <button className='register-btn' onClick={handleRegister}>Register</button>
        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
