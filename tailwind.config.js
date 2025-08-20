{/* Input Box */}
<div className="p-4 bg-white border-t flex items-center space-x-2">
  <input
    className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Ask anything"
    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  />
  {/* Microphone icon */}
  <button className="text-gray-500 hover:text-green-500">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v11m0 0a3 3 0 003-3V4a3 3 0 00-6 0v5a3 3 0 003 3zm0 0v7m0 4h.01" />
    </svg>
  </button>
</div>
