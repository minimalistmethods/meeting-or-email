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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Should this be an Email or a Meeting?
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Describe the message you want to communicate — the AI will recommend
          whether it should be a meeting or an email, and even draft the content for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full h-52 p-4 border border-gray-300 rounded-lg text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Example: I need to align the team on our new marketing strategy and confirm who’s doing what…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Get Recommendation"}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg whitespace-pre-line text-gray-800">
            <h2 className="text-lg font-bold text-blue-700 mb-2">
              AI Suggestion
            </h2>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
