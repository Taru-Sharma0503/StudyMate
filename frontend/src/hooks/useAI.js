import {useState,useContext} from "react";
import {getAnswer} from "../api/ai.api";
import {AuthContext} from "../contexts/AuthContext";

export default function useAI(){
    const [answer,setAnswer] = useState("");
    const {setLoading}=useContext(AuthContext);

    async function get_answer(question) {
        try {
            setLoading(true);
            const data=await getAnswer(question);
            setAnswer(data.answer);
        }
        catch(err){
            console.log(err);
            throw err;
        }
        finally{
            setLoading(false);
        }
    }

    return {answer,get_answer};
}