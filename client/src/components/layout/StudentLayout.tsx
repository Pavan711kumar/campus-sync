import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, MessageSquare, HandHeart, Users, Settings, Briefcase } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

const navItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/student' },
  { title: 'Doubt System', icon: MessageSquare, href: '/student/doubts' },
  { title: 'Subject Drive', icon: BookOpen, href: '/student/drive' },
  { title: 'Feedback', icon: HandHeart, href: '/student/feedback' },
  { title: 'Collaboration', icon: Users, href: '/student/collaboration' },
  { title: 'Internships', icon: Briefcase, href: '/student/internships' },
  { title: 'Settings', icon: Settings, href: '/student/settings' },
];

export const StudentLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50/50 dark:bg-slate-950/50">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            CampusSync
          </h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium shadow-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link to="/student/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Student" />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">My Profile</p>
              <p className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Edit Profile</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center px-8 z-10 sticky top-0">
          <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {navItems.find(item => location.pathname.includes(item.href))?.title || 'Dashboard'}
          </h1>
        </header>
        
        <div className="flex-1 overflow-auto p-8 relative">
          {/* Animated Background Gradients (Optional Glassmorphism) */}
          <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 -z-10 pointer-events-none" />
          
          <Outlet />
        </div>
      </main>
    </div>
  );
};
