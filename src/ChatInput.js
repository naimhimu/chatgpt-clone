import React, { useState } from 'react';

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        aria-label="Chat message input"
      />
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
}
