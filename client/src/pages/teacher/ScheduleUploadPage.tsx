import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { toast } from 'sonner';

const ScheduleUploadPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [slots] = useState([
    { day: 'Monday', time: '10:00 AM - 12:00 PM', type: 'Office Hours' }
  ]);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Schedule updated successfully!');
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Schedule Upload</h2>
        <p className="text-slate-500 dark:text-slate-400">Set your class timetables, office hours, and free slots.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-teal-600" />
              Upload Timetable
            </CardTitle>
            <CardDescription>Upload your weekly class schedule (PDF or Image)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-10 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
              <CalendarIcon className="w-10 h-10 mb-3 text-slate-400" />
              <p className="text-sm font-medium">Click to browse or drag and drop</p>
              <p className="text-xs mt-1">PDF, PNG, JPG up to 5MB</p>
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Upload File</Button>
          </CardContent>
        </Card>

        <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              Define Free Slots
            </CardTitle>
            <CardDescription>Set times when students can request appointments</CardDescription>
          </CardHeader>
          <form onSubmit={handleUpload}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Day of Week</Label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-teal-600 dark:border-slate-800 dark:bg-slate-950">
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input type="time" defaultValue="14:00" />
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input type="time" defaultValue="16:00" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                {loading ? 'Saving...' : 'Add Slot'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <Card className="border-slate-100 dark:border-slate-800 shadow-sm mt-8">
        <CardHeader>
          <CardTitle>Current Office Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {slots.map((slot, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 p-2 rounded-md">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{slot.day}</p>
                    <p className="text-xs text-slate-500">{slot.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleUploadPage;
