// src/lib/gemini.ts
// Utility for calling Gemini API

export const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
// Use the latest available model with generateContent support
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent';

export async function geminiGenerateContent(prompt: string): Promise<string> {
  const res = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  let data;
  try {
    data = await res.json();
  } catch (e) {
    console.error('Gemini API response is not JSON:', e);
    return 'Gemini API error: Invalid response.';
  }
  if (!res.ok) {
    console.error('Gemini API error:', data);
    return data?.error?.message || 'Gemini API error: Request failed.';
  }
  // Gemini returns text in data.candidates[0].content.parts[0].text
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Gemini API: No content generated.';
}
