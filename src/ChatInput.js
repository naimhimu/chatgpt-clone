# 1. Clone your repo & create a branch
git clone git@github.com:your-username/your-repo.git
cd your-repo
git checkout -b fix/build-error

# 2. Add the missing ChatInput component
cat > src/ChatInput.js << 'EOF'
import React, { useState } from 'react';

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = e => setFile(e.target.files[0]);
  const handleSend = () => {
    if (!message && !file) return;
    onSend({ message, file });
    setMessage('');
    setFile(null);
  };

  return (
    <div className="p-4 bg-white border-t flex items-center space-x-2">
      <label className="cursor-pointer text-2xl">
        ➕<input type="file" className="hidden" onChange={handleFileChange} />
      </label>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => e.key==='Enter' && handleSend()}
        placeholder="Type your message or essay..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
      >
        Send
      </button>
    </div>
  );
}
EOF

# 3. Update src/App.js: remove raw HTML, import ChatInput, wrap in function
#    (edit manually or with your editor)

# 4. Remove any .html files under src/
git rm src/*.html

# 5. Fix postcss.config.js to use module.exports
#    (edit manually: wrap JSON in module.exports = { … })

# 6. Test locally
npm install
npm run build   # Should pass without “Unexpected token”

# 7. Push & open PR
git add .
git commit -m "fix: wrap JSX properly & add ChatInput component"
git push -u origin fix/build-error
