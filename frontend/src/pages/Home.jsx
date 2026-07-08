import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Home.css";

export default function Home() {
    return(
        <div className="home">
            <Sidebar/>
            <Outlet/>
        </div>
    );
}