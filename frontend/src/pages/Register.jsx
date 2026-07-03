import "../styles/Register.css";
import scholarImg from "../assets/scholar.png";
import { Link , useNavigate} from "react-router-dom";
import {useState,useRef} from "react";
import axios from "axios";

export default function Register() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [otp,setOtp]=useState("");
  const btnRef=useRef(null);

  async function verifyEmail(){
    try{
      const response=await axios.post("/api/auth/verify-email",{
        "email":email
      })
      const data=response.data;
      console.log(data.message);
    }
    catch(err){
      console.log(err);
    }
  }

  async function verifyOTP(){
    try{
      const response=await axios.post("/api/auth/verify-otp",{
        "email":email,
        "otp":otp
      })
      const data=response.data;
      console.log(data.message);
      setTimeout(()=>{
        btnRef.current.innerText="Verified✅";
      },1000);
    }
    catch(err){
      console.log(err);
    }
  }

  async function handleRegister(){
    try {
      const response=await axios.post("/api/auth/register",{
        "email":email,
        "username":username,
        "password":password
      })
      const data=response.data;
      console.log(data.message);
      navigate("/login");
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="register">
      <div className="register-card">
        <img src={scholarImg} alt="scholar" className="register-img" />
        <h1>Register</h1>
        <input type="email" placeholder="Email" className="register-input" onChange={(e)=>setEmail(e.target.value)} />
        <button className="register-btn" onClick={verifyEmail}>Verify Email</button>
        <br />
        <input type="text" placeholder="Enter OTP sent to your email" className="register-input" onChange={(e)=>setOtp(e.target.value)} />
        <button className="register-btn" onClick={verifyOTP} ref={btnRef}>Verify Code</button>
        <br />
        <input type="text" placeholder="Username" className="register-input" onChange={(e)=>setUsername(e.target.value)} />
        <br />
        <input type="text" placeholder="Password" className="register-input" onChange={(e)=>setPassword(e.target.value)} />
        <br />
        <button className='register-btn' onClick={handleRegister}>Register</button>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
