import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { BookOpen, Target, TrendingUp, Award, Car, Package, Users, Heart, Handshake } from 'lucide-react';

const performanceData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 68 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 82 },
  { month: 'Jun', score: 90 },
];

const attendanceData = [
  { week: 'W1', attendance: 100 },
  { week: 'W2', attendance: 95 },
  { week: 'W3', attendance: 80 },
  { week: 'W4', attendance: 100 },
  { week: 'W5', attendance: 90 },
  { week: 'W6', attendance: 95 },
];

import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const modules = [
  { title: 'Rides', desc: 'Share rides with fellow students.', icon: <Car className="w-5 h-5 text-white" />, color: 'bg-[#E0F2FE]', iconBg: 'bg-[#38BDF8]', route: '/student/drive' },
  { title: 'Rent & Lend', desc: 'Borrow or lend items.', icon: <Package className="w-5 h-5 text-white" />, color: 'bg-[#F3E8FF]', iconBg: 'bg-[#A855F7]', route: '/student/internships' },
  { title: 'Errands', desc: 'Get help with quick tasks.', icon: <Users className="w-5 h-5 text-white" />, color: 'bg-[#FFEDD5]', iconBg: 'bg-[#F97316]', route: '/student/doubts' },
  { title: 'Volunteering', desc: 'Join campus events.', icon: <Heart className="w-5 h-5 text-white" />, color: 'bg-[#D1FAE5]', iconBg: 'bg-[#10B981]', route: '/student/feedback' },
  { title: 'Collaboration', desc: 'Find teammates for projects.', icon: <Handshake className="w-5 h-5 text-white" />, color: 'bg-[#FCE7F3]', iconBg: 'bg-[#EC4899]', route: '/student/collaboration' },
  { title: 'Academic Support', desc: 'Post & answer doubts.', icon: <BookOpen className="w-5 h-5 text-white" />, color: 'bg-[#E0E7FF]', iconBg: 'bg-[#6366F1]', route: '/student/doubts' },
];

const DashboardPage: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-12 pb-10">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] dark:text-white uppercase">
          Hello, {profile?.name?.toUpperCase() || 'STUDENT'}! 👋
        </h2>
        <p className="text-[#6B7280] dark:text-slate-400 mt-2 text-lg">What would you like to do today?</p>
      </div>

      {/* Explore Modules Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#111827] dark:text-white">Explore Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate(mod.route)}
              className={`${mod.color} rounded-2xl p-6 cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
            >
              <div className={`${mod.iconBg} w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm`}>
                {mod.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-1">{mod.title}</h4>
              <p className="text-slate-600 text-sm">{mod.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800" />
      
      <div>
        <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-6">Your Performance</h3>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">CGPA</p>
              <h3 className="text-2xl font-bold">8.4</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Attendance</p>
              <h3 className="text-2xl font-bold">92%</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Assignments</p>
              <h3 className="text-2xl font-bold">12/15</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Credits</p>
              <h3 className="text-2xl font-bold">104</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        
        {/* Performance Chart */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
            <CardDescription>Your score trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0f172a' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Chart */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Attendance Percentage</CardTitle>
            <CardDescription>Weekly attendance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{fill: 'rgba(241, 245, 249, 0.5)'}}
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="attendance" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};

export default DashboardPage;
