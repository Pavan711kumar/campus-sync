import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { BookOpen, Target, TrendingUp, Award } from 'lucide-react';

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

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Student Dashboard</h2>
        <p className="text-slate-500 dark:text-slate-400">Welcome back! Here is your academic overview.</p>
      </div>

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
  );
};

export default DashboardPage;
