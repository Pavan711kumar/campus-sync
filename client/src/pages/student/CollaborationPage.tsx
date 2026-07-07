import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Network, Users, Code, Mail } from 'lucide-react';

const mockProjects = [
  { 
    id: '1', 
    title: 'AI Chatbot for Student Queries', 
    description: 'Looking for someone with React experience to build the frontend. The backend is a Python API using OpenAI.', 
    skills: ['React', 'Tailwind', 'Python'],
    lookingFor: 'Frontend Developer',
    owner: 'Pavan Kumar'
  },
  { 
    id: '2', 
    title: 'Smart Campus Navigation System', 
    description: 'Building an interactive map for the university campus. Need help with the mapping algorithms.', 
    skills: ['Algorithms', 'C++', 'Mapbox'],
    lookingFor: 'Algorithm Specialist',
    owner: 'Alice Smith'
  },
];

const CollaborationPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Network className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Collaboration Hub</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl">
            Find peers with complementary skills, join innovative projects, and build your portfolio together.
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
          <Users className="w-4 h-4" />
          Post a Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockProjects.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-indigo-100 dark:border-indigo-900/50">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800">
                    Looking for: {project.lookingFor}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-sm">Posted by <span className="font-semibold text-slate-700 dark:text-slate-300">{project.owner}</span></CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500 mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-slate-100 dark:bg-slate-800 flex items-center gap-1">
                        <Code className="w-3 h-3" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white gap-2">
                  <Mail className="w-4 h-4" />
                  Contact {project.owner.split(' ')[0]}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CollaborationPage;
