import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Handshake, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const tabs = ['Collab Feed', 'Post Request', 'My Posts'];

const CollaborationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Post Request');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10 font-sans">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
            <Handshake className="w-5 h-5 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Collaboration</h2>
        </div>
        <p className="text-slate-500 text-sm ml-13">
          Find teammates for projects or get help with assignments
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
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'Post Request' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-[0_4px_24px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
            <Plus className="w-5 h-5 text-pink-600" />
            Create Collaboration Request
          </h3>

          <form className="space-y-6">
            <Input 
              placeholder="Title (e.g., Need Backend Dev for Hackathon)" 
              className="h-14 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50/50"
            />
            
            <Textarea 
              placeholder="Describe what you need..." 
              className="min-h-[160px] rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50/50 resize-none p-4"
            />
            
            <Input 
              placeholder="Skills Needed (comma separated, e.g., React, Node.js, Python)" 
              className="h-14 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50/50"
            />
            
            <div className="space-y-2">
              <Select>
                <SelectTrigger className="h-14 rounded-xl border-slate-200 focus:border-indigo-500 bg-slate-50/50 text-slate-500">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="startup">Startup Idea</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="button" 
              className="w-full h-14 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-lg mt-4 shadow-md transition-colors"
            >
              Post Request
            </Button>
          </form>
        </motion.div>
      )}

      {activeTab === 'Collab Feed' && (
        <div className="text-center py-20 text-slate-500">Collab Feed Coming Soon</div>
      )}

      {activeTab === 'My Posts' && (
        <div className="text-center py-20 text-slate-500">My Posts Coming Soon</div>
      )}
    </div>
  );
};

export default CollaborationPage;
