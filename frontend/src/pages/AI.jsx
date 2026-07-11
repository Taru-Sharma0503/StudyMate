import "../styles/AI.css";
import useAI from "../hooks/useAI";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { ProgressBar } from "react-loader-spinner";

export default function AI() {
  const { get_answer } = useAI();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm your Study Buddy. How can I help you today?",
    },
  ]);
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

  async function getAIanswer() {
    if (question.trim() === "") return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");

    try {
      const answer = await get_answer(userQuestion);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: answer,
        },
      ]);
    } catch (err) {
      console.log(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong. Please try again.",
        },
      ]);
    }
  }

  return (
    <div className="ai">
      <div className="ai-output-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === "user" ? "user-message" : "ai-message"
            }
          >
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        ))}
      </div>

      <div className="ai-input-container">
        <input
          type="text"
          className="ai-input"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") getAIanswer();
          }}
        />

        <button className="send-btn" onClick={getAIanswer}>
          Send
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558ZM5 4.38249V10.9999H10V12.9999H5V19.6174L18.8499 11.9999L5 4.38249Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
