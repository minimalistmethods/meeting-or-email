import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { input } = req.body;

  if (!input || input.trim().length === 0) {
    return res.status(400).json({ error: "Input is required" });
  }

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `
You are an assistant that decides if a communication should be an EMAIL or a MEETING.
Use these rules:
- If the message is short, simple, and doesn't need back-and-forth, choose EMAIL.
- If the message is complex, sensitive, or requires discussion, choose MEETING.
Then, generate a short explanation and a sample message to send, including subject line if email.

Message:
"""${input}"""
Answer in this format:

Decision: EMAIL or MEETING
Explanation: <short explanation>
Sample Subject: <subject line if email>
Sample Message:
<message body>
        `.trim()
      }],
    });

    const result = chatResponse.choices[0].message.content.trim();
    res.status(200).json({ result });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: 'OpenAI API error' });
  }
}
