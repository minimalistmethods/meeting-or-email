import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  if (!question || question.trim().length === 0) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const prompt = `
You are an assistant that decides if a communication should be an EMAIL or a MEETING.
Use these rules:
- If the message is short, simple, and doesn't need back-and-forth, choose EMAIL.
- If the message is complex, sensitive, or requires discussion, choose MEETING.
Then, generate a short explanation and a sample message to send, including subject line if email.

Message:
"""${question}"""
Answer in this format:

Decision: EMAIL or MEETING
Explanation: <short explanation>
Sample Subject: <subject line if email>
Sample Message:
<message body>
`;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 300,
      temperature: 0.3,
    });

    const answer = completion.data.choices[0].text.trim();
    res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI request failed" });
  }
}
