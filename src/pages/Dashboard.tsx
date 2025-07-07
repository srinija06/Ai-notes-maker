import React, { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/login');
      } else {
        setUser(data.user ?? null);
      }
      setLoading(false);
    };
    getUser();
  }, [navigate]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center pt-12">
      <div className="w-full max-w-5xl">
        {/* Header is handled by Layout/Navbar */}
        {/* Main dashboard content as in your third image */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user?.user_metadata?.full_name || user?.email}!</h1>
          <button
            className="mb-6 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            onClick={() => navigate('/upload')}
          >
            Add Document
          </button>
        </div>
        {/* Example dashboard cards and stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-purple-50 rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
            <ul className="text-left space-y-2">
              <li className="flex justify-between"><span>French Revolution</span><span className="text-purple-600 font-bold">92%</span></li>
              <li className="flex justify-between"><span>Photosynthesis</span><span className="text-purple-600 font-bold">88%</span></li>
              <li className="flex justify-between"><span>Algebra Basics</span><span className="text-purple-600 font-bold">76%</span></li>
              <li className="flex justify-between"><span>World War II</span><span className="text-purple-600 font-bold">94%</span></li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold mb-2">Performance Analysis</h2>
            <div className="mb-2">Mathematics <span className="float-right text-green-600 font-bold">+5% 68%</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4"><div className="bg-purple-500 h-2 rounded-full" style={{width:'68%'}}></div></div>
            <div className="mb-2">Science <span className="float-right text-green-600 font-bold">+12% 74%</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4"><div className="bg-purple-500 h-2 rounded-full" style={{width:'74%'}}></div></div>
            <div className="mb-2">History <span className="float-right text-green-600 font-bold">+3% 89%</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{width:'89%'}}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
