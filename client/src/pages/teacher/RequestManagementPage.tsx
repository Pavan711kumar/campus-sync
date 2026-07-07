import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Check, X, Calendar as CalendarIcon, User } from 'lucide-react';
import { toast } from 'sonner';

const initialRequests = [
  { id: '1', studentName: 'John Doe', type: 'Academic Doubt', subject: 'Data Structures', desc: 'Need help understanding Red-Black Trees', status: 'pending', time: '1 hour ago' },
  { id: '2', studentName: 'Sarah Connor', type: 'Career Guidance', subject: 'Software Engineering', desc: 'Looking for advice on backend career paths', status: 'pending', time: '3 hours ago' },
  { id: '3', studentName: 'Mike Ross', type: 'Project Guidance', subject: 'Machine Learning', desc: 'Can you review my final year project proposal?', status: 'accepted', time: '1 day ago' },
];

const RequestManagementPage: React.FC = () => {
  const [requests, setRequests] = useState(initialRequests);

  const handleAction = (id: string, action: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: action } : r));
    toast.success(`Request marked as ${action}`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Student Requests</h2>
        <p className="text-slate-500 dark:text-slate-400">Manage doubts, appointments, and project guidance requests.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-6">
        {requests.map(req => (
          <Card key={req.id} className="border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge className={
                      req.type === 'Academic Doubt' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400' :
                      req.type === 'Career Guidance' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400' :
                      'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400'
                    }>
                      {req.type}
                    </Badge>
                    <span className="text-xs text-slate-500">{req.time}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{req.subject}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{req.desc}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <User className="w-4 h-4" />
                    <span>{req.studentName}</span>
                  </div>
                </div>

                <div className="flex md:flex-col justify-end gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
                  {req.status === 'pending' ? (
                    <>
                      <Button onClick={() => handleAction(req.id, 'accepted')} className="bg-teal-600 hover:bg-teal-700 text-white flex-1 md:flex-none">
                        <Check className="w-4 h-4 mr-2" /> Accept
                      </Button>
                      <Button onClick={() => handleAction(req.id, 'rejected')} variant="outline" className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 flex-1 md:flex-none">
                        <X className="w-4 h-4 mr-2" /> Reject
                      </Button>
                      <Button variant="secondary" className="flex-1 md:flex-none">
                        <CalendarIcon className="w-4 h-4 mr-2" /> Reschedule
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Badge variant="outline" className={`py-1.5 px-3 text-sm ${req.status === 'accepted' ? 'border-teal-200 text-teal-700 bg-teal-50 dark:border-teal-800 dark:text-teal-400 dark:bg-teal-900/20' : 'border-red-200 text-red-700 bg-red-50 dark:border-red-800 dark:text-red-400 dark:bg-red-900/20'}`}>
                        {req.status === 'accepted' ? 'Accepted' : 'Rejected'}
                      </Badge>
                    </div>
                  )}
                </div>

              </div>
            </CardContent>
          </Card>
        ))}
        {requests.length === 0 && (
          <div className="text-center py-20 text-slate-500 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 text-slate-400" />
            <p>No new requests at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestManagementPage;
