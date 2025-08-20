// src/ChatInput.js
import React, { useState } from 'react';

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState('');
  const [file, setFile]     = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = () => {
    if (!message && !file) return; 
    onSend({ message, file });
    setMessage('');
    setFile(null);
  };

  return (
    <div className="p-4 bg-white border-t flex items-center space-x-2">
      {/* Upload Button */}
      <label className="cursor-pointer text-2xl">
        ➕
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Text Input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message or essay..."
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
      >
        Send
      </button>
    </div>
  );
}
