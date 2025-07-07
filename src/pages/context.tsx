
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Youtube, Bot } from 'lucide-react';
import { geminiGenerateContent } from '../lib/gemini';

const ContextPage: React.FC = () => {
  const [headings, setHeadings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get uploaded file text from sessionStorage
    const fileText = sessionStorage.getItem('uploadedFileText') || '';
    const prompt = `You are an expert study assistant. Given the following text, extract the main title and a bullet list of all major sections and subtopics (as a table of contents). Only return the list, no extra explanation.\n\n${fileText}`;
    geminiGenerateContent(prompt)
      .then((result) => {
        setHeadings(result.split(/\n|\r/).filter(Boolean));
        setLoading(false);
      })
      .catch(() => {
        setHeadings(['Introduction', 'Key Concepts', 'Examples', 'Summary']);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white/90 border-2 border-purple-200 rounded-3xl shadow-2xl w-[90vw] max-w-7xl min-h-[80vh] flex flex-col justify-center p-16" style={{ margin: '2rem 0' }}>
        <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-2" style={{ color: '#a259f7' }}>
          <FileText className="w-10 h-10 text-purple-500" />
          Topic Overview
        </h1>
        {loading ? (
          <div className="text-center text-gray-500">Extracting topics...</div>
        ) : (
          <ul className="list-disc pl-12 mb-12 text-left text-2xl text-gray-800">
            {headings.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        )}
        <div className="flex flex-wrap gap-8 justify-center mt-12">
          <button onClick={() => navigate('/notes')} className="flex items-center px-10 py-6 bg-purple-600 text-white rounded-2xl shadow hover:bg-purple-700 text-2xl font-semibold transition-all"><BookOpen className="w-7 h-7 mr-2" /> Notes</button>
          <button onClick={() => navigate('/quiz')} className="flex items-center px-10 py-6 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 text-2xl font-semibold transition-all"><FileText className="w-7 h-7 mr-2" /> Take Test</button>
          <button onClick={() => navigate('/videos')} className="flex items-center px-10 py-6 bg-pink-600 text-white rounded-2xl shadow hover:bg-pink-700 text-2xl font-semibold transition-all"><Youtube className="w-7 h-7 mr-2" /> Videos</button>
          <button onClick={() => navigate('/doubts')} className="flex items-center px-10 py-6 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 text-2xl font-semibold transition-all"><Bot className="w-7 h-7 mr-2" /> Doubts</button>
        </div>
      </div>
    </div>
  );
};

export default ContextPage;
