// src/App.js
import React, { useState } from 'react';
import ChatInput from './ChatInput';    // <— import it
import './index.css';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = ({ message, file }) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: message, file },
    ]);
    // TODO: invoke your Netlify Functions here
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Message List */}
      <div className="flex-grow overflow-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white p-3 rounded shadow-sm">
            <p>{msg.text}</p>
            {msg.file && (
              <small className="text-gray-500">{msg.file.name}</small>
            )}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default App;
