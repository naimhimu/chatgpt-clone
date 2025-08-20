import React, { useState } from "react"; import axios from "axios";

// Components function Header() { return ( <div className="bg-gray-800 text-white p-4 text-lg font-bold"> IELTSwithNayeem </div> ); }

function ChatBox({ messages, sendMessage, input, setInput, loading }) { return ( <div className="flex-1 overflow-y-auto p-4 space-y-4"> {messages.map((msg, i) => ( <div key={i} className={p-3 rounded-2xl max-w-xl ${             msg.role === "user"               ? "bg-green-500 text-white ml-auto"               : "bg-white text-gray-900 mr-auto shadow"           }} > {msg.content} </div> ))} {loading && <p className="text-gray-500">Typing...</p>} </div> ); }

function InputBox({ input, setInput, sendMessage }) { return ( <div className="p-4 bg-white border-t flex mt-4"> <input className="flex-1 border rounded-lg p-2 mr-2" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." onKeyDown={(e) => e.key === "Enter" && sendMessage()} /> <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded-lg" > Send </button> </div> ); }

function FileUpload() { const [file, setFile] = useState(null); const [result, setResult] = useState("");

const handleUpload = async () => { if (!file) return;

const formData = new FormData();
formData.append("file", file);

try {
  const res = await axios.post("/.netlify/functions/uploadEssay", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  setResult(res.data.result);
} catch (err) {
  console.error(err);
  setResult("❌ Error processing file");
}

};

return ( <div className="p-4 bg-white border-t mt-4"> <input type="file" onChange={(e) => setFile(e.target.files[0])} /> <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2" > Upload </button> {result && <p className="mt-2">{result}</p>} </div> ); }

function App() { const [messages, setMessages] = useState([ { role: "assistant", content: "Hi! I'm your AI assistant. How can I help?" }, ]); const [input, setInput] = useState(""); const [loading, setLoading] = useState(false);

const sendMessage = async () => { if (!input.trim()) return;

const newMessages = [...messages, { role: "user", content: input }];
setMessages(newMessages);
setInput("");
setLoading(true);

try {
  const res = await axios.post("/.netlify/functions/chatgpt", {
    message: input,
  });
  const reply = res.data.reply;
  setMessages([...newMessages, { role: "assistant", content: reply }]);
} catch (err) {
  console.error(err);
  setMessages([...newMessages, { role: "assistant", content: "❌ Error fetching response" }]);
}
setLoading(false);

};

return ( <div className="flex flex-col h-screen bg-gray-100"> <Header /> <div className="flex flex-1 flex-col md:flex-row"> <div className="flex-1 md:w-2/3"> <ChatBox messages={messages} sendMessage={sendMessage} input={input} setInput={setInput} loading={loading} /> <InputBox input={input} setInput={setInput} sendMessage={sendMessage} /> </div> <div className="md:w-1/3 border-l"> <FileUpload /> </div> </div> </div> ); }

export default App;
