import "../styles/Login.css";
import scholarImg from "../assets/scholar.png";
import { Link, useNavigate } from "react-router-dom";
import {useState,useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {login} from "../api/auth.api";

export default function Login() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const {setUser,loading,setLoading}=useContext(AuthContext);

  async function handleLogin(e){
      e.preventDefault();
      try{
        setLoading(true);
        const data=await login(email,password);
        console.log(data.message);
        setUser(data.user);
        navigate("/");
      }
      catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
  }

  if(loading) {
    return (
      <h1>Loading...</h1>
    );
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
        <p>Don't have an account?<Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
