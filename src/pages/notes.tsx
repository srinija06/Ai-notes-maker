import React, { useEffect, useState } from 'react';
import { geminiGenerateContent } from '../lib/gemini';

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fileText = sessionStorage.getItem('uploadedFileText') || '';
    const prompt = `You are an expert study assistant. For the following text, generate concise study notes, a mind map (as a text outline), and 3 memory tricks. Format with clear headings.\n\n${fileText}`;
    geminiGenerateContent(prompt)
      .then((result) => {
        setNotes(result);
        setLoading(false);
      })
      .catch(() => {
        setNotes('Could not generate notes.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-purple-600 mb-6 flex items-center">📝 Notes & Mind Map</h1>
        <div className="mb-6 whitespace-pre-line text-left text-lg">
          {loading ? 'Generating notes...' : notes}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
