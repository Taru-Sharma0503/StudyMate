import {login,register,logout} from "../api/auth.api";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import { setAccessToken } from "../api/axios";

export default function useAuth(){
    const {user,setUser,loading,setLoading}=useContext(AuthContext);

    const loginUser=async (email, password) => {
        try {
            setLoading(true);
            const data=await login(email,password);
            console.log(data.message);
            setAccessToken(data.accessToken);
            setUser(data.user);
        }
        catch(err){
            console.log(err);
            throw err;
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
            throw err;
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
            throw err;
        }
        finally{
            setLoading(false);
        }
    }

    return {user,loading,loginUser,registerUser,logoutUser};
}