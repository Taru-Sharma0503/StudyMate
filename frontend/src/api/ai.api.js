import api from "./axios";

export default async function getAnswer(question) {
    try {
        const response=await api.post("/ai/ask-ai",{question});
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}