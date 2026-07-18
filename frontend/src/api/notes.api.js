import api from "../api/axios";
import { toast } from "sonner";

async function getNotes(){
    try {
        const response=await api.get("/notes/get-notes");
        return response.data;
    }
    catch(err){
        toast(err.data.message);
        console.log(err);
        throw err;
    }
}

async function createNote(title,description,file){
    try {
        const formData=new FormData();
        formData.append("title",title);
        formData.append("description",description);
        formData.append("file",file);

        const response=await api.post("/notes/create-note",formData);
        return response.data;
    }
    catch(err){
        toast(err.data.message);
        console.log(err);
        throw err;
    }
}

async function updateNote(id,title,description,file){
    try {
        const formData=new FormData();
        formData.append("title",title);
        formData.append("description",description);
        formData.append("file",file);

        const response=await api.patch(`/notes/update-note/${id}`,formData);
        return response.data;
    }
    catch(err){
        toast(err.data.message);
        console.log(err);
        throw err;
    }
}

async function deleteNote(id){
    try {
        const response=await api.delete(`/notes/delete-note/${id}`);
        return response.data;
    }
    catch(err){
        toast(err.data.message);
        console.log(err);
        throw err;
    }
}

export {getNotes,createNote,updateNote,deleteNote};