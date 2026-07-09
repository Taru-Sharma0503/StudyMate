import "../styles/Dashboard.css";
import useTasks from "../hooks/useTasks";
import useNotes from "../hooks/useNotes";
import DashboardCard from "../components/DashboardCard";
import NotesCard from "../components/NotesCard";
import TasksCard from "../components/TasksCard";

export default function Dashboard() {
    const {notes} = useNotes();
    const {completedTasks, highPriorityTasks, mediumPriorityTasks, lowPriorityTasks} = useTasks();

    return (
        <div className="dashboard">
            <div className="dashboard-heading">
                <h1 className="primary-text">Welcome Back!!</h1>
                <p className="intro-text">You have {highPriorityTasks.length+mediumPriorityTasks.length+lowPriorityTasks.length} tasks pending for today. Let's get things done.</p>
            </div>

            <div className="dashboard-statistics">
                <DashboardCard title="Total Notes" value={notes.length} bgColor="#4F46E5"/>
                <DashboardCard title="Pending Tasks" value={highPriorityTasks.length+mediumPriorityTasks.length+lowPriorityTasks.length} bgColor="red"/>
                <DashboardCard title="Completed Tasks" value={completedTasks.length} bgColor="cyan"/>
            </div>

            <div className="recent-activity">
                <div className="recent-notes">
                    <h1>Recent Notes</h1>
                    {notes.map((note)=>(
                        <NotesCard title={note.title} description={note.description} fileUrl={note.fileUrl} />
                    ))}
                </div>

                <div className="recent-tasks">
                    <h1>Recent Tasks</h1>
                    {highPriorityTasks.map((highPriorityTask)=>(
                        <TasksCard title={highPriorityTask.title} subject={highPriorityTask.subject} deadline={highPriorityTask.deadline} />
                    ))}
                    {mediumPriorityTasks.map((mediumPriorityTask)=>(
                        <TasksCard title={mediumPriorityTask.title} subject={mediumPriorityTask.subject} deadline={mediumPriorityTask.deadline} />
                    ))}
                    {lowPriorityTasks.map((lowPriorityTask)=>(
                        <TasksCard title={lowPriorityTask.title} subject={lowPriorityTask.subject} deadline={lowPriorityTask.deadline} />
                    ))}
                </div>
            </div>
        </div>
    );
}