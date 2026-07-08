import api from "./axios";

export default function getAnswer(question) {
    try {
        const response=api.post("/ai/ask-ai",{question});
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}