import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Building2, MapPin, Clock, IndianRupee } from 'lucide-react';

const mockInternships = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    role: 'Frontend Engineering Intern',
    location: 'Remote',
    duration: '3 Months',
    stipend: '₹25,000/mo',
    tags: ['React', 'TypeScript', 'Web'],
    type: 'Summer Internship'
  },
  {
    id: '2',
    company: 'InnovateX Labs',
    role: 'Data Science Intern',
    location: 'New Delhi, DL',
    duration: '6 Months',
    stipend: 'Unpaid',
    tags: ['Python', 'Machine Learning'],
    type: 'Fall Co-op'
  }
];

const InternshipPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <Briefcase className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Internships & Opportunities</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl">
            Discover internships curated by faculty and verified providers to kickstart your career.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockInternships.map((internship, idx) => (
          <motion.div 
            key={internship.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full flex flex-col hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors border-emerald-100 dark:border-emerald-900/40 shadow-sm hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800">
                    {internship.type}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{internship.role}</CardTitle>
                <CardDescription className="text-base font-medium flex items-center text-slate-700 dark:text-slate-300 mt-1">
                  <Building2 className="w-4 h-4 mr-1.5 text-slate-400" />
                  {internship.company}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                    {internship.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-slate-400" />
                    {internship.duration}
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 mr-2 text-slate-400" />
                    {internship.stipend}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {internship.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InternshipPage;
