import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/.netlify/functions/uploadEssay", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setResult("❌ Error processing essay");
    }

    setUploading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-2">Upload Your Essay</h2>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2"
      >
        {uploading ? "Uploading..." : "Submit"}
      </button>

      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <strong>AI Feedback:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
