export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { messages } = req.body;
  const GROQ_KEY = process.env.GROQ_KEY;
  const GEMINI_KEY = process.env.GEMINI_KEY;

  if (GROQ_KEY) {
    try {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + GROQ_KEY },
        body: JSON.stringify({ model: "llama3-70b-8192", messages, max_tokens: 500, temperature: 0.75 })
      });
      if (r.ok) {
        const d = await r.json();
        return res.status(200).json({ reply: d.choices[0].message.content, provider: "Groq" });
      }
    } catch(e) {}
  }

  if (GEMINI_KEY) {
    try {
      const sys = messages.find(m => m.role === "system");
      const hist = messages.filter(m => m.role !== "system").map(m => ({
        role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }]
      }));
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system_instruction: sys ? { parts: [{ text: sys.content }] } : undefined, contents: hist, generationConfig: { maxOutputTokens: 500, temperature: 0.75 } })
      });
      if (r.ok) {
        const d = await r.json();
        return res.status(200).json({ reply: d.candidates[0].content.parts[0].text, provider: "Gemini" });
      }
    } catch(e) {}
  }

  return res.status(500).json({ reply: "I'm having a little trouble right now ☕ Please contact us at +92 331 3677131!" });
}
