import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Clock, PlusCircle } from 'lucide-react';

// Mock Data (until hooked up to API)
const broadcastDoubts = [
  { id: '1', title: 'Calculus IV - Fourier Series Expansion', subject: 'Mathematics', studentName: 'Alex M.', time: '20 mins ago', type: 'Doubt' },
  { id: '2', title: 'React useEffect dependency array loop', subject: 'Web Dev', studentName: 'Sam K.', time: '1 hour ago', type: 'Guidance' }
];

const DoubtSystemPage: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">Smart Doubt Clarification</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Ask questions, get answers from peers, or escalate to teachers if unanswered.
          </p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <PlusCircle className="h-4 w-4" />
          Ask a Question
        </Button>
      </div>

      {isCreating && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10 shadow-md">
            <CardHeader>
              <CardTitle>Create a New Request</CardTitle>
              <CardDescription>Your request will be broadcasted to peers for 4 hours before reaching faculty.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g. Help with Fourier Series Expansion" className="bg-white dark:bg-slate-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject / Tag</Label>
                  <Input id="subject" placeholder="e.g. Mathematics" className="bg-white dark:bg-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Request Type</Label>
                  <Input id="type" placeholder="e.g. Doubt, Guidance, Project Help" className="bg-white dark:bg-slate-900" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <textarea 
                  id="desc"
                  className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  placeholder="Describe your issue in detail..."
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Broadcast Request</Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="broadcast" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="broadcast">Peer Requests (Help Others)</TabsTrigger>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="broadcast" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {broadcastDoubts.map(doubt => (
              <Card key={doubt.id} className="group hover:shadow-lg transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                      {doubt.subject}
                    </Badge>
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {doubt.time}
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 leading-tight">{doubt.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Asked by <span className="font-semibold">{doubt.studentName}</span>
                  </p>
                </CardContent>
                <CardFooter className="pt-0 justify-between items-center">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {doubt.type}
                  </Badge>
                  <Button size="sm" variant="outline" className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                    Offer Help
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-requests" className="mt-6">
          <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 dark:bg-slate-900/20 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <HelpCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Active Requests</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              You haven't asked any questions recently. If you're stuck, don't hesitate to broadcast a doubt!
            </p>
            <Button onClick={() => setIsCreating(true)} variant="outline">
              Ask a Question
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoubtSystemPage;
