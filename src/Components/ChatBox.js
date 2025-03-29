import React, { useState } from 'react';
import axios from 'axios';
import './ChatBox.css';

function ChatBox() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setChat(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true); // Show loading indicator

    try {
      const response = await axios.post('http://localhost:5000/ask', { message: input });
      const aiMessage = { sender: 'ai', text: response.data.reply };
      setChat(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setChat(prev => [...prev, { sender: 'ai', text: 'Sorry, something went wrong. Please try again.' }]);
    }

    setLoading(false); // Hide loading indicator
  };

  return (
    <div className="chatbox-container">
      <div className="chat-window">
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'user' ? 'user-msg' : 'ai-msg'}`}>
            <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div className="loading">AI is thinking...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          placeholder="Ask about investing..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
