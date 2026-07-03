import "../styles/Login.css";
import scholarImg from "../assets/scholar.png";
import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function Login() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  async function handleLogin(){
      try {
        const response=await axios.post("/api/auth/login",{
          "email":email,
          "password":password
        })

        const data=response.data;
        console.log(data.message);
        navigate("/home");
      }
      catch(err){
        console.log(err);
      }
  }

  return (
    <div className="login">
      <div className="login-card">
        <img src={scholarImg} alt="scholar" className="login-img" />
        <h1>Login</h1>
        <input type="email" placeholder="Email" className="login-input" onChange={(e)=>setEmail(e.target.value)}/>
        <br />
        <input type="text" placeholder="Password" className="login-input" onChange={(e)=>setPassword(e.target.value)} />
        <br />
        <button className='login-btn' onClick={handleLogin}>Login</button>
        <p>Don't have an account?</p>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
