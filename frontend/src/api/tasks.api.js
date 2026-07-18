import api from "../api/axios";
import { toast } from "sonner";

async function getTasks() {
    try {
        const response = await api.get("/tasks/get-tasks");
        return response.data;
    } catch (err) {
        toast(err.data.message);
        console.log(err);
        throw err;
    }
}

async function updateTask(id, title, subject, deadline, priority, isCompleted) {
    try {
        const response = await api.patch(`/tasks/update-task/${id}`, {
            title,
            subject,
            deadline,
            priority,
            isCompleted,
        });
        return response.data;
    } catch (err) {
        toast(err.data.message);
        console.log(err);
        throw err;
    }
}

async function createTask(title, subject, deadline, priority) {
    try {
        const response = await api.post("/tasks/create-task", {
            title,
            subject,
            deadline,
            priority,
        });
        return response.data;
    } catch (err) {
        toast(err.data.message);
        console.log(err);
        throw err;
    }
}

async function deleteTask(id){
    try {
        const response = await api.delete(`/tasks/delete-task/${id}`);
        return response.data;
    } catch (err) {
        toast(err.data.message);
        console.log(err);
        throw err;
    }
}

export { getTasks, updateTask, createTask, deleteTask };