import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Users, FileText, MessageSquare, Star } from 'lucide-react';

const stats = [
  { title: 'Total Students', value: '142', icon: Users, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-100 dark:bg-teal-900/30' },
  { title: 'Files Uploaded', value: '24', icon: FileText, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { title: 'Pending Doubts', value: '7', icon: MessageSquare, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  { title: 'Avg. Rating', value: '4.8', icon: Star, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
];

const TeacherDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Professor!</h2>
        <p className="text-slate-500 dark:text-slate-400">Here's an overview of your academic activities today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
                <stat.icon className={`w-16 h-16 ${stat.color}`} />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Doubts to Resolve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-500 text-center py-10">
              No pending doubts at the moment.
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-500 text-center py-10">
              No recent feedback submitted.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
