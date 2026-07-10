import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// Using exact labels from the reference image for UI/UX matching, but routing to existing pages
const navItems = [
  { title: 'Dashboard', href: '/student' },
  { title: 'Rides', href: '/student/drive' }, // Mapping Drive to Rides visually
  { title: 'Rent', href: '/student/internships' }, // Mapping Internships to Rent visually
  { title: 'Errands', href: '/student/doubts' }, // Mapping Doubts to Errands visually
  { title: 'Collaboration', href: '/student/collaboration' }, 
];

export const StudentLayout: React.FC = () => {
  const location = useLocation();
  const { profile } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-[#FDFDFD] dark:bg-slate-950 font-sans">
      {/* Top Navbar */}
      <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shrink-0 shadow-sm z-50">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#8A2BE2] flex items-center justify-center shadow-inner">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-bold text-xl text-[#5B21B6] dark:text-purple-400 tracking-tight">
            CampusConnect
          </span>
        </div>

        {/* Center: Navigation Pills */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/student' && location.pathname.startsWith(item.href + '/'));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                  isActive 
                    ? "bg-[#F3F4F6] dark:bg-slate-800 text-[#111827] dark:text-white" 
                    : "text-[#4B5563] dark:text-slate-400 hover:bg-[#F9FAFB] dark:hover:bg-slate-800/50 hover:text-[#111827] dark:hover:text-white"
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* Right: Avatar */}
        <div className="flex items-center gap-4">
          <Link to="/student/profile" className="cursor-pointer hover:opacity-80 transition-opacity">
            <Avatar className="w-9 h-9 ring-2 ring-slate-100 dark:ring-slate-800">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name || 'Student'}`} />
              <AvatarFallback className="bg-purple-100 text-purple-700 font-medium">
                {(profile?.name || 'S').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#FDFDFD] dark:bg-slate-950 relative">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
