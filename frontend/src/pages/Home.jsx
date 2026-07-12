import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Home.css";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="home">
      <header className="mobile-header">
        <h1>StudyMate</h1>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span></span><span></span><span></span>
        </button>
      </header>
      {isMenuOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <Sidebar isOpen={isMenuOpen} onNavigate={() => setIsMenuOpen(false)} />
      <main className="home-content">
        <Outlet />
      </main>
    </div>
  );
}
