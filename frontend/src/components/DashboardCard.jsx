import "./DashboardCard.css";

export default function DashboardCard({title,value,bgColor}) {
    return (
        <div className="dashboard-card" style={{backgroundColor:bgColor}}>
            <h2>{title}</h2>
            <h1>{value}</h1>
        </div>
    );
}