import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, Briefcase, FolderSearch, Shield, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const notifications = [
  { id: 1, title: 'New Teacher Registration', desc: 'Dr. Alan Mathison has registered and is pending approval.', time: '10 minutes ago', type: 'system', icon: GraduationCap, color: 'text-amber-500' },
  { id: 2, title: 'New Internship Posted', desc: 'Google has posted a new Summer SWE Internship.', time: '2 hours ago', type: 'internship', icon: Briefcase, color: 'text-blue-500' },
  { id: 3, title: 'Drive Upload Alert', desc: '15 new PDF resources were uploaded to the Campus Drive.', time: '5 hours ago', type: 'drive', icon: FolderSearch, color: 'text-purple-500' },
  { id: 4, title: 'System Maintenance', desc: 'Scheduled maintenance this weekend from 2 AM to 4 AM.', time: '1 day ago', type: 'system', icon: Shield, color: 'text-rose-500' },
];

const NotificationCenterPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Notification Center</h2>
        <p className="text-slate-500 dark:text-slate-400">System-wide logs, alerts, and platform updates.</p>
      </div>

      <Card className="border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            You have {notifications.length} new notifications today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notif, idx) => (
              <motion.div 
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className={`p-3 rounded-full bg-white dark:bg-slate-950 shadow-sm h-fit ${notif.color}`}>
                  <notif.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-sm">{notif.title}</p>
                    <span className="text-xs text-slate-500">{notif.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {notif.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenterPage;
