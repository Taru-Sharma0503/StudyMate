import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks.api";

export default function useTasks() {
  const { setLoading } = useContext(AuthContext);
  const [highPriorityTasks, setHighPriorityTasks] = useState([]);
  const [mediumPriorityTasks, setMediumPriorityTasks] = useState([]);
  const [lowPriorityTasks, setLowPriorityTasks] = useState([]);

  const removeTaskFromAll = (id) => {
    setHighPriorityTasks((tasks) => tasks.filter((task) => task._id !== id));
    setMediumPriorityTasks((tasks) => tasks.filter((task) => task._id !== id));
    setLowPriorityTasks((tasks) => tasks.filter((task) => task._id !== id));
  };

  const get_tasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      console.log(data.message);
      setHighPriorityTasks(data.highPrioritytasks);
      setMediumPriorityTasks(data.mediumPrioritytasks);
      setLowPriorityTasks(data.lowPrioritytasks);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const create_task = async (title, description, file) => {
    try {
      setLoading(true);
      const data = await createTask(title, description, file);
      console.log(data.message);
      if (data.task.priority === "HIGH")
        setHighPriorityTasks([...highPriorityTasks, data.task]);
      else if (data.task.priority === "MEDIUM")
        setMediumPriorityTasks([...mediumPriorityTasks, data.task]);
      else setLowPriorityTasks([...lowPriorityTasks, data.task]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const update_task = async (id, title, description, file) => {
    try {
      setLoading(true);
      const data = await updateTask(id, title, description, file);
      console.log(data.message);
      removeTaskFromAll(id);

      if (data.task.priority === "HIGH") {
        setHighPriorityTasks((tasks) => [...tasks, data.task]);
      } else if (data.task.priority === "MEDIUM") {
        setMediumPriorityTasks((tasks) => [...tasks, data.task]);
      } else {
        setLowPriorityTasks((tasks) => [...tasks, data.task]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const delete_task = async (id) => {
    try {
      setLoading(true);
      const data = await deleteTask(id);
      console.log(data.message);
      await removeTaskFromAll(id);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchTasks() {
      await get_tasks();
    }

    fetchTasks();
  }, []);

  return {
    highPriorityTasks,
    mediumPriorityTasks,
    lowPriorityTasks,
    get_tasks,
    create_task,
    update_task,
    delete_task,
  };
}
