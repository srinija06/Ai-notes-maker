import React, { useEffect, useState } from 'react';
import { geminiGenerateContent } from '../lib/gemini';

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fileText = sessionStorage.getItem('uploadedFileText') || '';
    const prompt = `You are an expert study assistant. For the following text, suggest 3-5 relevant YouTube video links with their titles. Format as a list.\n\n${fileText}`;
    geminiGenerateContent(prompt)
      .then((result) => {
        setVideos(result);
        setLoading(false);
      })
      .catch(() => {
        setVideos('Could not fetch videos.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 flex items-center">📺 Videos</h1>
        <div className="mb-6 whitespace-pre-line text-left text-lg">
          {loading ? 'Fetching videos...' : videos}
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
