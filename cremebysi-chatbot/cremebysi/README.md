# Crème By SI — Chatbot

A WhatsApp/Instagram-style chatbot for Crème By SI café.

## 🚀 Deploy on Vercel

1. Upload this folder to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
3. Click Deploy — done!

## 🔑 Add API Keys

Open `index.html` and find the `config` block near the top:

```js
const config = {
  GROQ_API_KEY: "YOUR_GROQ_API_KEY_HERE",      // groq.com (free)
  GEMINI_API_KEY: "YOUR_GEMINI_API_KEY_HERE",   // aistudio.google.com (free)
  GROQ_MODEL: "llama3-70b-8192",
  GEMINI_MODEL: "gemini-1.5-flash"
};
```

Replace with your actual keys. Groq is used first; Gemini kicks in automatically if Groq fails.

## ✨ Features

- Full menu with **Add to Cart** (+/- quantity)
- **Date picker** with month/year dropdowns  
- **Time picker** with AM/PM selector
- Table reservation flow (branch → guests → name → contact → date → time → confirm)
- 2 branch locations (Qasimabad & Autobahn)
- AI-powered free-text responses (Groq + Gemini fallback)
- FAQs: parking, WiFi, delivery, vegan options, pricing
- Scoped to café only — won't answer off-topic questions
- Mobile responsive
