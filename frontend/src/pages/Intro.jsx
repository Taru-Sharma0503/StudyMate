import "../styles/Intro.css";
import IntroNavbar from "../components/IntroNavbar";
import introImg from "../assets/Intro-img.jpg";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { ProgressBar } from "react-loader-spinner";

export default function Intro() {
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
    <div className="intro">
      <IntroNavbar />

      <div className="intro-content">
        <div className="intro-text">
          <h1 className="primary-text">Study Smarter,</h1>
          <h1 className="secondary-text"> Study Organized</h1>
          <p className="intro-text">
            The all-in-one productivity workspace for students to master the
            courses and manage their time effectively.
          </p>
        </div>

        <div className="intro-img">
          <img src={introImg} alt="intro" className="intro-img" />
        </div>
      </div>

      <h1 className="footer-primary-text">Everything you need to succeed</h1>
      <p className="footer-secondary-text">StudyMate provides professional tools tailored for the academic journey, from initial</p>
      <p className="footer-secondary-text">lecture notes,tasks to final exam prep.</p>
    </div>
  );
}
