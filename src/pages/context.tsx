import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Youtube, Bot } from 'lucide-react';
import { kiloGenerateContent } from '../lib/kilo';
import StudyNav from '../components/StudyNav';

const ContextPage: React.FC = () => {
  const [headings, setHeadings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get uploaded file text from sessionStorage
    const fileText = sessionStorage.getItem('uploadedFileText') || '';
    const prompt = `You are an expert study assistant. Given the following text, extract the main title and a bullet list of all major sections and subtopics (as a table of contents). Only return the list, no extra explanation.\n\n${fileText}`;
    kiloGenerateContent(prompt)
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden" style={{height:'100vh'}}>
      <div className="bg-white/90 border-2 border-purple-200 rounded-3xl shadow-2xl w-[98vw] max-w-[1600px] min-h-[70vh] flex flex-col justify-center p-20" style={{ margin: '2.5rem 0', maxHeight: 'calc(100vh - 180px)' }}>
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
      </div>
      <StudyNav />
    </div>
  );
};

export default ContextPage;
