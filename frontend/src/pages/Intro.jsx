import "../styles/Intro.css";
import IntroNavbar from "../components/IntroNavbar";
import introImg from "../assets/Intro-img.jpg";

export default function intro() {
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
