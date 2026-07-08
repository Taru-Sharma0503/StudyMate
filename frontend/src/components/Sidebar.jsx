import "./Sidebar.css";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1>StudyMate</h1>
      <p>Productivity Portal</p>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/notes">Notes</NavLink>
      <NavLink to="/tasks">Tasks</NavLink>
      <NavLink to="/ai">AI Assistant</NavLink>
    </div>
  );
}
