import React, { useState } from 'react';
import ChatInput from './ChatInput';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = ({ message, file }) => {
    // Example: add the new message (and file if any) to state
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: message, file },
    ]);
    // TODO: call your Netlify Functions here
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Message list */}
      <div className="flex-grow overflow-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white p-3 rounded shadow-sm">
            <p>{msg.text}</p>
            {msg.file && <small className="text-gray-500">{msg.file.name}</small>}
          </div>
        ))}
      </div>

      {/* Chat input */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default App;
