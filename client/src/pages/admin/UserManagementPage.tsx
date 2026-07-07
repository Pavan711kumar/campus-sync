import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, UserCheck, UserX, Shield, GraduationCap, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulated fetch from backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      // In a real app, this would be an API call to /api/admin/users
      setTimeout(() => {
        setUsers([
          { id: '1', name: 'John Doe', email: 'john@student.edu', role: 'student', status: 'approved', createdAt: '2026-07-01' },
          { id: '2', name: 'Jane Smith', email: 'jane@teacher.edu', role: 'teacher', status: 'pending', createdAt: '2026-07-05' },
          { id: '3', name: 'Dr. Alan Mathison', email: 'alan@teacher.edu', role: 'teacher', status: 'approved', createdAt: '2026-06-15' },
          { id: '4', name: 'Sarah Connor', email: 'sarah@student.edu', role: 'student', status: 'approved', createdAt: '2026-07-02' }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchUsers();
  }, []);

  const handleStatusChange = (id: string, newStatus: string) => {
    // Optimistic update
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    toast.success(`User status updated to ${newStatus}`);
    // In a real app, make an API call to update the status
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">User Management</h2>
          <p className="text-slate-500 dark:text-slate-400">View, approve, and manage system users.</p>
        </div>
      </div>

      <Card className="border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle>All Users</CardTitle>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-50 dark:bg-slate-950/50"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-500">Loading users...</td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-500">No users found.</td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="py-4 font-medium">{user.name}</td>
                      <td className="py-4 text-slate-500">{user.email}</td>
                      <td className="py-4">
                        <Badge variant="outline" className={`capitalize flex w-fit items-center gap-1 ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800' :
                          user.role === 'teacher' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 border-pink-200 dark:border-pink-800' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                        }`}>
                          {user.role === 'admin' && <Shield className="w-3 h-3" />}
                          {user.role === 'teacher' && <Briefcase className="w-3 h-3" />}
                          {user.role === 'student' && <GraduationCap className="w-3 h-3" />}
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge variant="secondary" className={`capitalize flex w-fit items-center gap-1 ${
                          user.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          user.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {user.status === 'pending' && <Clock className="w-3 h-3" />}
                          {user.status === 'approved' && <UserCheck className="w-3 h-3" />}
                          {user.status === 'rejected' && <UserX className="w-3 h-3" />}
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {user.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="default" 
                                className="bg-emerald-600 hover:bg-emerald-700 text-white h-8"
                                onClick={() => handleStatusChange(user.id, 'approved')}
                              >
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                className="h-8"
                                onClick={() => handleStatusChange(user.id, 'rejected')}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {user.status === 'approved' && user.role !== 'admin' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 border-red-200 h-8"
                              onClick={() => handleStatusChange(user.id, 'rejected')}
                            >
                              Suspend
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Briefcase icon missing from lucide-react import above? It is imported.
import { Briefcase } from 'lucide-react';

export default UserManagementPage;
