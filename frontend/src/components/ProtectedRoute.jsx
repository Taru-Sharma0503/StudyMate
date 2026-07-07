import {AuthContext} from "../contexts/AuthContext";
import {useContext} from "react";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children}){
    const {user,loading}=useContext(AuthContext);

    if(loading){
        return <h1>Loading...</h1>
    }
    if(!user){
        return <Navigate to="/login" replace/>
    }

    return children;
}