import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, Package, Users, Heart, Handshake, BookOpen, Lock, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
const features = [
  { icon: Car, title: 'Rides', desc: 'Share rides safely' },
  { icon: Package, title: 'Rent', desc: 'Borrow & lend items' },
  { icon: Users, title: 'Errands', desc: 'Get tasks done' },
  { icon: Heart, title: 'Volunteer', desc: 'Help your campus' },
  { icon: Handshake, title: 'Collaborate', desc: 'Team up on projects' },
  { icon: BookOpen, title: 'Academic', desc: 'Peer tutoring' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        toast.success('Welcome back!');
        setLoginOpen(false);
        
        if (userData.role === 'admin') {
          navigate('/admin');
        } else if (userData.role === 'teacher') {
          navigate('/teacher');
        } else {
          navigate('/student');
        }
      } else {
        toast.error('User profile not found');
        await auth.signOut();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E88E5] via-[#3949AB] to-[#9C27B0] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="w-full flex items-center justify-between px-8 py-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">Campus-Sync</span>
        </div>
        
        <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="rounded-full bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6">
              Login
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" /> Sign In
              </DialogTitle>
              <DialogDescription>
                Enter your credentials to access your dashboard.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="student@university.edu" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950"
                />
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white mt-2" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
              <div className="text-sm text-center text-slate-500 mt-4">
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={() => { setLoginOpen(false); navigate('/register'); }}
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Register here
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 -mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Your Campus,<br/>Connected
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
            The all-in-one platform for student collaboration, support, and community building.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button size="lg" className="rounded-full bg-white text-blue-700 hover:bg-slate-100 font-bold px-8 h-12 text-base shadow-lg" onClick={() => setLoginOpen(true)}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md font-bold px-8 h-12 text-base">
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl w-full mx-auto"
        >
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/20 transition-all cursor-pointer shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] h-40">
              <feature.icon className="w-8 h-8 text-white mb-3" />
              <h3 className="text-white font-bold text-lg mb-1">{feature.title}</h3>
              <p className="text-white/80 text-xs font-medium">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-white/70 text-sm z-10 font-medium">
        © 2026 Campus-Sync. Made for students, by students.
      </footer>
    </div>
  );
}
