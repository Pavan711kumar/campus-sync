import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const tabs = ['+ Create', 'Feed', 'My Tasks'];

const mockErrands = [
  { 
    id: '1', 
    title: 'Need groceries from Walmart', 
    location: 'Walmart Supercenter', 
    reward: '$5',
    time: 'Today',
    timeAgo: '2 hrs ago',
    type: 'blue'
  },
  { 
    id: '2', 
    title: 'Pick up package from Mailroom', 
    location: 'Student Union', 
    reward: 'Coffee',
    time: 'Flexible',
    timeAgo: '5 hrs ago',
    type: 'purple'
  }
];

const DoubtSystemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Feed');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10 font-sans">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <Users className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Errands</h2>
        </div>
        <p className="text-slate-500 text-sm ml-13">
          Get help with tasks or offer your services to others
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="flex items-center bg-white dark:bg-slate-900 rounded-full p-1 shadow-sm border border-slate-100 dark:border-slate-800 w-full max-w-3xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-2.5 text-sm font-semibold rounded-full transition-all duration-300",
                activeTab === tab 
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-[0_2px_8px_rgb(0,0,0,0.08)]" 
                  : tab === '+ Create' 
                    ? "text-orange-500 hover:text-orange-600" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'Feed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockErrands.map((errand, idx) => (
            <motion.div 
              key={errand.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="rounded-3xl border-slate-100 dark:border-slate-800 shadow-[0_4px_24px_rgb(0,0,0,0.04)] overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={cn(
                      "text-xs font-bold px-3 py-1 rounded-full",
                      errand.time === 'Today' ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
                    )}>
                      {errand.time}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{errand.timeAgo}</span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">{errand.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-slate-500 font-medium">
                      <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                      {errand.location}
                    </div>
                    <div className="flex items-center text-sm text-slate-500 font-medium">
                      <div className="w-4 h-4 mr-2 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-[10px]">✨</span>
                      </div>
                      Reward: <span className="font-bold ml-1 text-slate-700 dark:text-slate-300">{errand.reward}</span>
                    </div>
                  </div>
                  
                  <Button className={cn(
                    "w-full rounded-xl h-12 font-bold shadow-md transition-all hover:opacity-90",
                    errand.type === 'blue' ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
                  )}>
                    Accept Errand
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === '+ Create' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-[0_4px_24px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
            <Plus className="w-5 h-5 text-orange-600" />
            Post an Errand
          </h3>
          <form className="space-y-6">
            <Input placeholder="Title" className="h-14 rounded-xl border-slate-200 bg-slate-50/50" />
            <Input placeholder="Location" className="h-14 rounded-xl border-slate-200 bg-slate-50/50" />
            <Input placeholder="Reward (e.g. $5, Coffee)" className="h-14 rounded-xl border-slate-200 bg-slate-50/50" />
            <Textarea placeholder="Details..." className="min-h-[120px] rounded-xl border-slate-200 bg-slate-50/50 resize-none p-4" />
            <Button type="button" className="w-full h-14 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg mt-4 shadow-md">
              Post Errand
            </Button>
          </form>
        </motion.div>
      )}

      {activeTab === 'My Tasks' && (
        <div className="text-center py-20 text-slate-500 font-medium">You have no active tasks.</div>
      )}
    </div>
  );
};

export default DoubtSystemPage;
