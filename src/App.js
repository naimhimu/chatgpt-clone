import React, { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o", // ChatGPT-style model
          messages: newMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = res.data.choices[0].message.content;
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ Error fetching response" },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 text-lg font-bold">
        ChatGPT Clone
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-2xl max-w-xl ${
              msg.role === "user"
                ? "bg-green-500 text-white ml-auto"
                : "bg-white text-gray-900 mr-auto shadow"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <p className="text-gray-500">Typing...</p>}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white border-t flex">
        <input
          className="flex-1 border rounded-lg p-2 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
