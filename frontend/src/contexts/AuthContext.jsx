import { createContext, useState , useEffect} from "react";
import { getUser } from "../api/auth.api";

const AuthContext=createContext(null);

export default function AuthProvider ({children}){
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

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

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext};