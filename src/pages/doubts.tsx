import React, { useState } from 'react';
import { geminiGenerateContent } from '../lib/gemini';

const DoubtsPage: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: 'user', text: input }]);
    setLoading(true);
    const fileText = sessionStorage.getItem('uploadedFileText') || '';
    const prompt = `You are an AI tutor. The following is the study material context: \n${fileText}\n\nAnswer the following question in simple, clear language for a student.\nQuestion: ${input}`;
    const aiReply = await geminiGenerateContent(prompt);
    setMessages((msgs) => [...msgs, { role: 'ai', text: aiReply }]);
    setInput('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-6 flex items-center">🤖 Doubts</h1>
        <div className="mb-6 h-64 overflow-y-auto bg-gray-100 rounded p-4">
          {messages.length === 0 && <div className="text-gray-400">Ask your doubt about the topic...</div>}
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'text-right mb-2' : 'text-left mb-2'}>
              <span className={msg.role === 'user' ? 'bg-blue-100 text-blue-800 px-3 py-2 rounded-lg inline-block' : 'bg-green-100 text-green-800 px-3 py-2 rounded-lg inline-block'}>
                {msg.text}
              </span>
            </div>
          ))}
          {loading && <div className="text-gray-400">AI is typing...</div>}
        </div>
        <div className="flex mt-4 gap-2">
          <input
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            placeholder="Type your doubt..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
            disabled={loading}
          />
          <button
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold"
            onClick={sendMessage}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoubtsPage;
