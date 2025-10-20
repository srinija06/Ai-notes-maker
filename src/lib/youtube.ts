// src/lib/youtube.ts
// Utility for YouTube API search

interface YouTubeItem {
  snippet: {
    title: string;
  };
  id: {
    videoId: string;
  };
}

export const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function searchYouTubeVideos(query: string): Promise<{ title: string; url: string }[]> {
  if (!youtubeApiKey) {
    throw new Error('YouTube API key not found');
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${youtubeApiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('YouTube API request failed');
  }

  const data = await res.json();
  return data.items.map((item: YouTubeItem) => ({
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`
  }));
}