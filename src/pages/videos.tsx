import React, { useEffect, useState } from 'react';
import { geminiGenerateContent } from '../lib/gemini';
import StudyNav from '../components/StudyNav';

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<{ title: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fileText = sessionStorage.getItem('uploadedFileText') || '';
    const prompt = `You are an expert study assistant. For the following text, suggest 3-5 relevant YouTube video links with their titles. Format as a JSON array of objects with 'title' and 'url' fields.\n\n${fileText}`;
    geminiGenerateContent(prompt)
      .then((result) => {
        try {
          // Try to parse as JSON array
          const arr = JSON.parse(result);
          if (Array.isArray(arr) && arr.every(v => v.title && v.url)) {
            setVideos(arr);
          } else {
            throw new Error('Invalid format');
          }
        } catch {
          // Fallback: try to extract links from text
          const lines = result.split('\n').filter(Boolean);
          const parsed = lines.map(line => {
            const match = line.match(/\[(.*?)\]\((https:\/\/www\.youtube\.com\/watch\?v=[^\)]+)\)/i);
            if (match) {
              return { title: match[1], url: match[2] };
            }
            const urlMatch = line.match(/https:\/\/www\.youtube\.com\/watch\?v=[^\s]+/i);
            if (urlMatch) {
              return { title: line.replace(urlMatch[0], '').replace(/[-:•]/g, '').trim(), url: urlMatch[0] };
            }
            return null;
          }).filter(Boolean) as { title: string; url: string }[];
          if (parsed.length > 0) {
            setVideos(parsed);
          } else {
            setError('Could not parse video links.');
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Could not fetch videos.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden" style={{height:'100vh'}}>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full" style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>
        <h1 className="text-3xl font-bold text-pink-600 mb-6 flex items-center">📺 Videos</h1>
        <div className="mb-6 text-left text-lg">
          {loading && 'Fetching videos...'}
          {error && <span className="text-red-500">{error}</span>}
          {!loading && !error && videos.length > 0 && (
            <ul className="space-y-4">
              {videos.map((v, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold flex items-center">
                    <img src={`https://img.youtube.com/vi/${v.url.split('v=')[1]?.split('&')[0]}/hqdefault.jpg`} alt={v.title} className="w-20 h-12 rounded shadow mr-3 object-cover" />
                    <span>{v.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          {!loading && !error && videos.length === 0 && <span>No videos found.</span>}
        </div>
      </div>
      <StudyNav />
    </div>
  );
};

export default VideosPage;
