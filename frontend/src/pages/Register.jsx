import "../styles/Register.css";
import scholarImg from "../assets/scholar.png";
import { Link , useNavigate} from "react-router-dom";
import {useState,useRef,useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {register,verify_email,verifyOtp} from "../api/auth.api";


export default function Register() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [otp,setOtp]=useState("");
  const btnRef=useRef(null);
  const {setUser,loading,setLoading}=useContext(AuthContext);


  async function verifyEmail(){
    try {
      setLoading(true);
      const data=await verify_email(email);
      console.log(data.message);
    }
    catch(err){
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  }

  async function verifyOTP(){
    try {
      setLoading(true);
      const data=await verifyOtp(email,otp);
      console.log(data.message);
    }
    catch(err){
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  }

  async function handleRegister(){
    try {
      setLoading(true);
      const data=await register(email,username,password);
      setUser(data.user);
      navigate("/login");
    }
    catch(err){
      console.log(err);
    }
    finally {
      setLoading(false);
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
        <p>Already have an account?<Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
