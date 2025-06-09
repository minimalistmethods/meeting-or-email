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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Email or Meeting?
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Describe what you want to communicate. Our AI will analyze your input
          and recommend whether it should be an email or a meeting — and even
          generate suggested content.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Example: I want to update my team on project delays and propose a new deadline..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Get Recommendation"}
          </button>
        </form>

        {result && (
          <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg shadow-sm text-gray-800 whitespace-pre-line">
            <h2 className="font-semibold text-blue-700 mb-2 text-lg">
              AI Recommendation
            </h2>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
