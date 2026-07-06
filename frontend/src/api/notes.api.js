import api from "../api/axios";

async function getNotes(){
    try {
        const response=await api.get("/notes/get-notes");
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

async function createNote(title,description,file){
    try {
        const response=await api.post("/notes/create-note",{title,description,file});
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

async function updateNote(id,title,description,file){
    try {
        const response=await api.patch(`/notes/update-note/${id}`,{title,description,file});
        return response.data;
    }
    catch(err){
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
        console.log(err);
        throw err;
    }
}

export {getNotes,createNote,updateNote,deleteNote};