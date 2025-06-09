// pages/index.js
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const response = await fetch("/api/decision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Should This Be a Meeting or an Email?
        </h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-4">
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the purpose or content you’re considering..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Decide for Me"}
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-white p-4 border border-blue-100 rounded-xl shadow-sm text-gray-700 whitespace-pre-line">
            <h2 className="font-semibold mb-2 text-blue-700">Recommendation:</h2>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

