import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Building2, Briefcase } from 'lucide-react';

const stats = [
  { title: 'Total Students', value: '4,521', icon: GraduationCap, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { title: 'Total Faculty', value: '184', icon: Users, color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-100 dark:bg-pink-900/30' },
  { title: 'Active Internships', value: '38', icon: Briefcase, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { title: 'Departments', value: '12', icon: Building2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
];

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Platform Overview</h2>
        <p className="text-slate-500 dark:text-slate-400">Monitor overall system health, users, and module statistics.</p>
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
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-500 text-center py-10">
              No new signups today.
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle>System Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-500 text-center py-10">
              System is running smoothly. No critical logs.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
