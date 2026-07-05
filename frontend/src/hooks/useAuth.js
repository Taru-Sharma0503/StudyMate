import {login,register,logout,verify_email,verifyOtp,getUser} from "../api/auth.api";
import {useContext,useEffect} from "react";
import {AuthContext} from "../contexts/AuthContext";

export default function useAuth(){
    const {user,setUser,loading,setLoading}=useContext(AuthContext);

    useEffect(()=>{
        async function fetchUser() {
            try {
                const data=await getUser();
                setUser(data.user);
            }
            catch(err){
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        }
        fetchUser();
    },[]);
    const loginUser=async (email, password) => {
        try {
            setLoading(true);
            const data=await login(email,password);
            console.log(data.message);
            setUser(data.user);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    const registerUser=async (email, username, password) => {
        try {
            setLoading(true);
            const data=await register(email,username,password);
            setUser(data.user);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    const logoutUser=async () => {
        try {
            setLoading(true);
            const data=await logout();
            console.log(data.message);
            setUser(null);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    const verifyUserEmail=async (email) => {
        try {
            setLoading(true);
            const data=await verify_email(email);
            console.log(data.message);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    const verifyUserOTP=async (email,otp) => {
        try {
            setLoading(true);
            const data=await verifyOtp(email,otp);
            console.log(data.message);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    return {user,loading,loginUser,registerUser,logoutUser,verifyUserEmail,verifyUserOTP};
}