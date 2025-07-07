import React, { useEffect, useState } from 'react';
// Use the User type from supabase-js if available, otherwise fallback to our own
import type { User } from '@supabase/supabase-js';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import logo from '../../public/logo.jpg';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="w-full bg-white shadow py-4 px-8 flex items-center justify-between">
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}> 
        <img src={logo} alt="EduGenie Logo" className="w-8 h-8 mr-2 rounded" />
        <span className="text-xl font-extrabold" style={{ color: '#a259f7' }}>EduGenie</span>
      </div>
      <div>
        {user ? (
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 ml-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
};

const Layout: React.FC = () => (
  <div>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
