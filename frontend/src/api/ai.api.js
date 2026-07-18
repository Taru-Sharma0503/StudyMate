import api from "./axios";
import {toast} from "sonner";

export default async function getAnswer(question) {
    try {
        const response=await api.post("/ai/ask-ai",{question});
        return response.data;
    }
    catch(err){
        toast(err.data.message);
        console.log(err);
        throw err;
    }
}