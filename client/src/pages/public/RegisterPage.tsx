import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, ArrowRight, UserPlus } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { toast } from 'sonner';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: formData.email,
        name: formData.name,
        role: formData.role,
        status: formData.role === 'teacher' ? 'pending' : 'approved',
        createdAt: new Date().toISOString()
      });
      
      toast.success('Registration successful!');
      
      if (formData.role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/student');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-pink-600 to-purple-600 p-3 rounded-2xl shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-3">
          Join CampusSync
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-base">
          Create an account to access resources, collaborate, and manage your academic life.
        </p>
      </motion.div>

      <div className="w-full max-w-md z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                Create Account
              </CardTitle>
              <CardDescription>
                Fill in the details below to get started.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-slate-50/50 dark:bg-slate-950/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="student@university.edu" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-slate-50/50 dark:bg-slate-950/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="bg-slate-50/50 dark:bg-slate-950/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">I am a...</Label>
                  <select 
                    id="role"
                    value={formData.role} 
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-md transition-all duration-300" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Register'}
                  {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
                <div className="text-sm text-center text-slate-500">
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-pink-600 dark:text-pink-400 font-semibold hover:underline"
                  >
                    Sign in here
                  </button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
