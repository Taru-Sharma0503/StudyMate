import "../styles/Register.css";
import scholarImg from "../assets/scholar.png";
import { Link , useNavigate} from "react-router-dom";
import {useState,useRef} from "react";
import useAuth from "../hooks/useAuth";



export default function Register() {
  const navigate=useNavigate();
  const {loading,registerUser,verifyUserEmail,verifyUserOTP}=useAuth();
  const [email,setEmail]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [otp,setOtp]=useState("");
  const EmailbtnRef=useRef(null);
  const OTPbtnRef=useRef(null);


  async function verifyEmail(){
    try {
    await verifyUserEmail(email);
    setTimeout(()=>{
      EmailbtnRef.current.innerText="OTP Sent✅";
    },2000);
    }
    catch(err){
      console.log(err);
    }
  }

  async function verifyOTP(){
    try {
      await verifyUserOTP(email,otp);
      setTimeout(()=>{
        OTPbtnRef.current.innerText="Verified✅";
      },2000);
    }
    catch(err){
      console.log(err);
    }
  }

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
      <h1>Loading...</h1>
    );
  }

  return (
    <div className="register">
      <div className="register-card">
        <img src={scholarImg} alt="scholar" className="register-img" />
        <h1>Register</h1>
        <input type="email" placeholder="Email" className="register-input" onChange={(e)=>setEmail(e.target.value)} />
        <button className="register-btn" onClick={verifyEmail} ref={EmailbtnRef}>Verify Email</button>
        <br />
        <input type="text" placeholder="Enter OTP sent to your email" className="register-input" onChange={(e)=>setOtp(e.target.value)} />
        <button className="register-btn" onClick={verifyOTP} ref={OTPbtnRef}>Verify Code</button>
        <br />
        <input type="text" placeholder="Username" className="register-input" onChange={(e)=>setUsername(e.target.value)} />
        <br />
        <input type="text" placeholder="Password" className="register-input" onChange={(e)=>setPassword(e.target.value)} />
        <br />
        <button className='register-btn' onClick={handleRegister}>Register</button>
        <p>Already have an account?<Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
