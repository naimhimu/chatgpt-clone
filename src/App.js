import React, { useState } from 'react';

function ChatInput({ onSend }) {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = () => {
    if (!message && !file) return; // prevent empty sends
    onSend({ message, file });
    setMessage('');
    setFile(null);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderTop: '1px solid #ccc',
      backgroundColor: '#f9f9f9'
    }}>
      {/* Upload Button */}
      <label style={{ cursor: 'pointer', marginRight: '10px' }}>
        <span style={{ fontSize: '24px' }}>➕</span>
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </label>

      {/* Text Input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message or essay..."
        style={{
          flex: 1,
          padding: '8px 12px',
          borderRadius: '20px',
          border: '1px solid #ccc',
          outline: 'none'
        }}
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        style={{
          marginLeft: '10px',
          padding: '8px 16px',
          borderRadius: '20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
