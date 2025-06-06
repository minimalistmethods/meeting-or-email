import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setResult(data.answer);
    } else {
      setResult("Error: " + data.error);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Email or Meeting AI</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={5}
          placeholder="Describe what you want to communicate..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", padding: 10, fontSize: 16 }}
        />
        <button
          type="submit"
          disabled={loading || input.trim() === ""}
          style={{ marginTop: 10, padding: "10px 20px" }}
        >
          {loading ? "Thinking..." : "Get Recommendation"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 20, whiteSpace: "pre-wrap", background: "#f0f0f0", padding: 15 }}>
          {result}
        </div>
      )}
    </div>
  );
}

