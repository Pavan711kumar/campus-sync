import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Folder, FileText, Search, Download, HardDrive, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockFolders = ['Mathematics', 'Computer Science', 'Physics', 'Electronics'];
const mockFiles = [
  { id: '1', name: 'Calculus_Notes_Ch1.pdf', size: '2.4 MB', type: 'PDF', uploader: 'Prof. Smith' },
  { id: '2', name: 'Data_Structures_Slides.pptx', size: '5.1 MB', type: 'PPTX', uploader: 'Alex M.' },
];

const PublicDrivePage: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Public Navbar */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            CampusSync
          </h1>
          <Link to="/student">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <LogIn className="w-4 h-4" />
              Portal Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
              <HardDrive className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              Public Campus Drive
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
              Access open-source study materials, notes, and previous year papers without an account.
            </p>
          </div>
        </div>

        <div className="relative max-w-3xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
          <Input 
            placeholder="Search for open files, subjects, or notes..." 
            className="pl-12 py-8 rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-lg shadow-sm"
          />
        </div>

        {!selectedFolder ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-2xl font-semibold mb-6">Browse Public Subjects</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockFolders.map((folder) => (
                <Card 
                  key={folder} 
                  className="cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg transition-all group border-2 border-slate-100 dark:border-slate-800"
                  onClick={() => setSelectedFolder(folder)}
                >
                  <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-all">
                      <Folder className="w-10 h-10 text-blue-600 dark:text-blue-400 fill-blue-600/10 group-hover:fill-blue-600/20" />
                    </div>
                    <span className="font-semibold text-lg text-slate-800 dark:text-slate-200">{folder}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" onClick={() => setSelectedFolder(null)}>
                &larr; Back to Subjects
              </Button>
              <h3 className="text-2xl font-semibold">{selectedFolder} Public Materials</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFiles.map(file => (
                <Card key={file.id} className="hover:shadow-md transition-shadow border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-4 flex flex-row items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <FileText className="w-7 h-7 text-red-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg line-clamp-1" title={file.name}>{file.name}</CardTitle>
                        <CardDescription className="mt-1">{file.size} • By {file.uploader}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex justify-between items-center">
                    <Badge variant="secondary" className="uppercase font-semibold">{file.type}</Badge>
                    <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30">
                      <Download className="w-4 h-4 mr-2" /> Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default PublicDrivePage;
