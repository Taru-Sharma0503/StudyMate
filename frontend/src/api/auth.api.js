import api from "./axios";

async function login(email,password){
    try {
        const response=await api.post("/auth/login",{email,password});
        return response.data;
    }
    catch(err){
        console.error(err);
        throw err;
    }
}

async function register(email,username,password){
    try {
        const response=await api.post("/auth/register",{email,username,password});
        return response.data;
    }
    catch(err){
        console.error(err);
        throw err;
    }
}

async function logout(){
    try {
        const response=await api.post("/auth/logout");
        return response.data;
    }
    catch(err){
        console.error(err);
        throw err;
    }
}

export {login,register,logout};