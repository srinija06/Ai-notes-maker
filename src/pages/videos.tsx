import React, { useEffect, useState } from 'react';
import { kiloGenerateContent } from '../lib/kilo';
import { searchYouTubeVideos } from '../lib/youtube';
import StudyNav from '../components/StudyNav';

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<{ title: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fileText = sessionStorage.getItem('uploadedFileText') || '';
    const prompt = `You are an expert study assistant. For the following text, suggest a search query for relevant YouTube videos.\n\n${fileText}`;
    kiloGenerateContent(prompt)
      .then((query) => {
        // Use the generated query to search YouTube
        return searchYouTubeVideos(query.trim());
      })
      .then((videos) => {
        if (videos.length === 0) {
          setError('No videos found for this topic. Try uploading different content.');
        } else {
          setVideos(videos);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Video fetch error:', err);
        setError('Could not fetch videos. Please check your internet connection.');
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
