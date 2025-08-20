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
      // Call Netlify serverless function
      const res = await axios.post("/.netlify/functions/chatgpt", {
        message: input, // send only the latest user message
      });

      const reply = res.data.reply;
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
        IELTSwithNayeem
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
