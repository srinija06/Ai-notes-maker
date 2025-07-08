import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, FileText, Youtube, Bot, FileText as OverviewIcon } from 'lucide-react';

const navs = [
  { label: 'Overview', path: '/context', icon: OverviewIcon, color: 'bg-yellow-500', hover: 'hover:bg-yellow-600' },
  { label: 'Notes', path: '/notes', icon: BookOpen, color: 'bg-purple-600', hover: 'hover:bg-purple-700' },
  { label: 'Take Test', path: '/quiz', icon: FileText, color: 'bg-blue-600', hover: 'hover:bg-blue-700' },
  { label: 'Videos', path: '/videos', icon: Youtube, color: 'bg-pink-600', hover: 'hover:bg-pink-700' },
  { label: 'Doubts', path: '/doubts', icon: Bot, color: 'bg-green-600', hover: 'hover:bg-green-700' },
];

const StudyNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center bg-white/80 backdrop-blur border-t border-purple-200 py-4 gap-6" style={{boxShadow:'0 -2px 16px 0 rgba(162,89,247,0.08)'}}>
      {navs.map(({ label, path, icon: Icon, color, hover }) => (
        <button
          key={label}
          onClick={() => navigate(path)}
          className={`flex items-center px-7 py-4 ${color} text-white rounded-2xl shadow ${hover} text-lg font-semibold transition-all ${location.pathname === path ? 'ring-4 ring-purple-300' : ''}`}
        >
          <Icon className="w-6 h-6 mr-2" /> {label}
        </button>
      ))}
    </div>
  );
};

export default StudyNav;
