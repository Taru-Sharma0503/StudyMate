import "../styles/Tasks.css";
import useTasks from "../hooks/useTasks";
import TasksCard from "../components/TasksCard";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { ProgressBar } from "react-loader-spinner";

export default function Tasks() {
  const {
    completedTasks,
    highPriorityTasks,
    mediumPriorityTasks,
    lowPriorityTasks,
  } = useTasks();
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        barColor="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
      />
    );
  }

  return (
    <div className="tasks">
      <div className="tasks-heading">
        <h1 className="primary-text">Tasks</h1>
        <button className="add-task-btn">+ Add Task</button>
      </div>

      <div className="tasks-cards-container">
        {highPriorityTasks.length > 0 && (
          <div className="high-priority-tasks">
            <h1 className="priority-heading">High Priority</h1>
            {highPriorityTasks.map((highPriorityTask) => (
              <TasksCard
                title={highPriorityTask.title}
                subject={highPriorityTask.subject}
                deadline={highPriorityTask.deadline}
                isCompleted={highPriorityTask.isCompleted}
              />
            ))}
          </div>
        )}

        {mediumPriorityTasks.length > 0 && (
          <div className="medium-priority-tasks">
            <h1 className="priority-heading">Medium Priority</h1>
            {mediumPriorityTasks.map((mediumPriorityTask) => (
              <TasksCard
                title={mediumPriorityTask.title}
                subject={mediumPriorityTask.subject}
                deadline={mediumPriorityTask.deadline}
                isCompleted={mediumPriorityTask.isCompleted}
              />
            ))}
          </div>
        )}

        {lowPriorityTasks.length > 0 && (
          <div className="low-priority-tasks">
            <h1 className="priority-heading">Low Priority</h1>
            {lowPriorityTasks.map((lowPriorityTask) => (
              <TasksCard
                title={lowPriorityTask.title}
                subject={lowPriorityTask.subject}
                deadline={lowPriorityTask.deadline}
                isCompleted={lowPriorityTask.isCompleted}
              />
            ))}
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="completed-tasks">
            <h1 className="priority-heading">Completed</h1>
            {completedTasks.map((completedTask) => (
              <TasksCard
                title={completedTask.title}
                subject={completedTask.subject}
                deadline={completedTask.deadline}
                isCompleted={completedTask.isCompleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
