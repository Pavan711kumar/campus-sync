import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Phone, FileText, BookOpen, Wrench, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Default values or user values
  const [profile, setProfile] = useState({
    name: user?.name || 'Student Name',
    phone: user?.phone || '+91 9876543210',
    resume: user?.resume || 'https://drive.google.com/file/d/my-resume',
    branchSection: user?.branchSection || 'Computer Science - Section A',
    skills: user?.skills || 'React, Node.js, Python, Firebase'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSave = async () => {
    if (!user?.uid) return;
    setIsLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), profile);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Student Profile</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage your personal and academic information.</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
          <Avatar className="w-24 h-24 border-4 border-slate-50 dark:border-slate-950 shadow-md">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} />
            <AvatarFallback className="text-2xl">ST</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            {isEditing ? (
              <Input id="name" value={profile.name} onChange={handleChange} className="text-2xl font-bold h-12 w-80" />
            ) : (
              <CardTitle className="text-3xl font-bold">{profile.name}</CardTitle>
            )}
            <CardDescription className="text-base text-slate-500 flex items-center mt-2">
              <BookOpen className="w-4 h-4 mr-2" />
              {profile.branchSection}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="pt-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Phone */}
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone Number
              </Label>
              {isEditing ? (
                <Input id="phone" value={profile.phone} onChange={handleChange} />
              ) : (
                <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{profile.phone}</p>
              )}
            </div>

            {/* Branch and Section */}
            <div className="space-y-3">
              <Label htmlFor="branchSection" className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Branch & Section
              </Label>
              {isEditing ? (
                <Input id="branchSection" value={profile.branchSection} onChange={handleChange} />
              ) : (
                <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{profile.branchSection}</p>
              )}
            </div>

            {/* Resume */}
            <div className="space-y-3">
              <Label htmlFor="resume" className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Resume Link
              </Label>
              {isEditing ? (
                <Input id="resume" value={profile.resume} onChange={handleChange} placeholder="https://..." />
              ) : (
                <a href={profile.resume} target="_blank" rel="noreferrer" className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  {profile.resume.length > 30 ? profile.resume.substring(0, 30) + '...' : profile.resume}
                </a>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-3 md:col-span-2">
              <Label htmlFor="skills" className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <Wrench className="w-4 h-4" /> Technical Skills
              </Label>
              {isEditing ? (
                <Input id="skills" value={profile.skills} onChange={handleChange} placeholder="e.g. React, Node.js, Design" />
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills.split(',').map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
