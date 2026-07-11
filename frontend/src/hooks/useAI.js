import { useState} from "react";
import getAnswer from "../api/ai.api.js";

export default function useAI(){
    const [isAnswering, setIsAnswering] = useState(false);

    async function get_answer(question) {
        try {
            setIsAnswering(true);
            const data=await getAnswer(question);
            return data.answer;
        }
        catch(err){
            console.log(err);
            throw err;
        }
        finally{
            setIsAnswering(false);
        }
    }

    return {get_answer,isAnswering};
}