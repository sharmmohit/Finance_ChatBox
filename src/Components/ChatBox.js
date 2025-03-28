import React, { useState } from 'react';
import axios from 'axios';
import './ChatBox.css';
function ChatBox() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setChat(prev => [...prev, userMessage]);

    try {
      const response = await axios.get('https://api.duckduckgo.com/', {
        params: {
          q: input,
          format: 'json',
          no_html: 1,
        },
      });

      const answer = response.data.AbstractText;
      const aiReply = answer && answer.length > 0
        ? answer
        : "Sorry, I couldn't find a detailed answer. Try rephrasing your question.";

      const aiMessage = { sender: 'ai', text: aiReply };
      setChat(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { sender: 'ai', text: 'Sorry, something went wrong. Please try again.' };
      setChat(prev => [...prev, errorMessage]);
    }

    setInput('');
  };

  return (
    <div>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll', marginBottom: '10px' }}>
        {chat.map((msg, index) => (
          <div key={index} style={{ margin: '5px 0', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        placeholder="Ask about investing..."
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '70%', padding: '8px' }}
      />
      <button onClick={handleSend} style={{ padding: '8px 12px', marginLeft: '5px' }}>Send</button>
    </div>
  );
}

export default ChatBox;
