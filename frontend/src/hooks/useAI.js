import {useContext} from "react";
import getAnswer from "../api/ai.api.js";
import {AuthContext} from "../contexts/AuthContext";

export default function useAI(){
    const {setLoading}=useContext(AuthContext);

    async function get_answer(question) {
        try {
            setLoading(true);
            const data=await getAnswer(question);
            return data.answer;
        }
        catch(err){
            console.log(err);
            throw err;
        }
        finally{
            setLoading(false);
        }
    }

    return {get_answer};
}