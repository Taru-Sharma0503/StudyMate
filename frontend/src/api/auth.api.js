import api from "./axios";

async function login(email,password){
    try {
        const response=await api.post("/auth/login",{email,password});
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

async function register(email,username,password){
    try {
        const response=await api.post("/auth/register",{email,username,password});
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

async function logout(){
    try {
        const response=await api.post("/auth/logout");
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

async function verify_email(email){
    try {
        const response=await api.post("/auth/verify-email",{email});
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

async function verifyOtp(email,otp){
    try {
        const response=await api.post("/auth/verify-otp",{email,otp});
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export {login,register,logout,verify_email,verifyOtp};