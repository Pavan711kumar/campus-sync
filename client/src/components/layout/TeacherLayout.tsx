import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, MessageSquare, HandHeart, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

const navItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/teacher' },
  { title: 'Student Doubts', icon: MessageSquare, href: '/teacher/doubts' },
  { title: 'Manage Drive', icon: BookOpen, href: '/teacher/drive' },
  { title: 'Feedback Analytics', icon: HandHeart, href: '/teacher/feedback' },
  { title: 'Settings', icon: Settings, href: '/teacher/settings' },
];

export const TeacherLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50/50 dark:bg-slate-950/50">
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            CampusSync
          </h2>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Faculty Portal</span>
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
                    ? "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-medium shadow-sm" 
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
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Dr. Teacher</p>
              <p className="text-xs text-slate-500">View Profile</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center px-8 z-10 sticky top-0">
          <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {navItems.find(item => location.pathname.includes(item.href))?.title || 'Dashboard'}
          </h1>
        </header>
        
        <div className="flex-1 overflow-auto p-8 relative">
          <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-teal-50/50 to-transparent dark:from-teal-900/10 -z-10 pointer-events-none" />
          <Outlet />
        </div>
      </main>
    </div>
  );
};
