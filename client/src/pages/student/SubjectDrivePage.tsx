import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Folder, FileText, Upload, Search, Download, HardDrive } from 'lucide-react';

const mockFolders = ['Mathematics', 'Computer Science', 'Physics', 'Electronics'];
const mockFiles = [
  { id: '1', name: 'Calculus_Notes_Ch1.pdf', size: '2.4 MB', type: 'PDF', uploader: 'Prof. Smith' },
  { id: '2', name: 'Data_Structures_Slides.pptx', size: '5.1 MB', type: 'PPTX', uploader: 'Alex M.' },
];

const SubjectDrivePage: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
            <HardDrive className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            Subject Drive
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Access and share study materials, notes, and previous year papers.
          </p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Upload className="h-4 w-4" />
          Upload File
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input 
          placeholder="Search for files, subjects, or notes..." 
          className="pl-10 py-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-lg shadow-sm"
        />
      </div>

      {!selectedFolder ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="text-xl font-semibold mb-4">Browse Subjects</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockFolders.map((folder) => (
              <Card 
                key={folder} 
                className="cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors group"
                onClick={() => setSelectedFolder(folder)}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Folder className="w-8 h-8 text-blue-600 dark:text-blue-400 fill-blue-600/20" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-200">{folder}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" onClick={() => setSelectedFolder(null)}>
              &larr; Back to Subjects
            </Button>
            <h3 className="text-xl font-semibold">{selectedFolder} Materials</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockFiles.map(file => (
              <Card key={file.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3 flex flex-row items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <FileText className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <CardTitle className="text-base line-clamp-1" title={file.name}>{file.name}</CardTitle>
                      <CardDescription>{file.size} • Uploaded by {file.uploader}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex justify-between items-center">
                  <Badge variant="secondary" className="uppercase">{file.type}</Badge>
                  <Button size="sm" variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                    <Download className="w-4 h-4 mr-2" /> Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SubjectDrivePage;
