import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMsg = { sender: "You", text: question };
    setConversation([...conversation, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/ask", {
        message: question,
      });
      const botMsg = { sender: "AI", text: res.data.reply };
      setConversation((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
      setConversation((prev) => [
        ...prev,
        { sender: "AI", text: "Sorry, something went wrong. Please try again." },
      ]);
    }

    setQuestion("");
  };

  return (
    <div className="container">
      <h1>GenAI Financial Assistant</h1>
      <div className="chat-box">
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about investing..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;