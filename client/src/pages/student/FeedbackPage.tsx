import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { HandHeart, Star, Send, ShieldAlert } from 'lucide-react';

const mockTeachers = [
  { id: 't1', name: 'Dr. Alan Turing', subject: 'Computer Science' },
  { id: 't2', name: 'Prof. Marie Curie', subject: 'Physics' },
];

const FeedbackPage: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
          <HandHeart className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Smart Feedback System</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Share your honest thoughts about your classes. Your feedback is analyzed to help faculty improve their teaching methods.
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-pink-100 dark:border-pink-900/50 shadow-lg">
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
            <CardDescription>Constructive feedback builds a better learning environment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="teacher">Select Faculty / Course</Label>
              <select 
                id="teacher" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">-- Select --</option>
                {mockTeachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name} - {t.subject}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 cursor-pointer transition-colors ${
                      (hoverRating || rating) >= star 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Your Feedback</Label>
              <textarea 
                id="comment"
                className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:ring-offset-slate-950"
                placeholder="What did you like? What could be improved?"
              />
            </div>

            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
              <input 
                type="checkbox" 
                id="anonymous" 
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-pink-600 focus:ring-pink-600"
              />
              <div className="flex-1 ml-2">
                <Label htmlFor="anonymous" className="font-medium cursor-pointer">Submit Anonymously</Label>
                <p className="text-xs text-slate-500 flex items-center mt-0.5">
                  <ShieldAlert className="w-3 h-3 mr-1" />
                  Your identity will be completely hidden from the faculty.
                </p>
              </div>
            </div>

          </CardContent>
          <CardFooter className="justify-end bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800 p-6">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white gap-2 px-8">
              <Send className="w-4 h-4" />
              Submit Feedback
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default FeedbackPage;
