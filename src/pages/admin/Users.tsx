import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, serverTimestamp, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Package as PackageIcon } from 'lucide-react';

interface User {
  id: string;
  email: string;
  role: string;
  assignedPacks?: string[];
  createdAt: any;
}

interface AllowedEmail {
  id: string;
  email: string;
  createdAt: any;
}

interface Pack {
  id: string;
  title: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [allowedEmails, setAllowedEmails] = useState<AllowedEmail[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersSnap, allowedSnap, packsSnap] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'allowed_emails')),
        getDocs(collection(db, 'packs'))
      ]);
      
      const fetchedUsers: User[] = [];
      usersSnap.forEach((doc) => {
        fetchedUsers.push({ id: doc.id, ...doc.data() } as User);
      });
      setUsers(fetchedUsers);

      const fetchedAllowed: AllowedEmail[] = [];
      allowedSnap.forEach((doc) => {
        fetchedAllowed.push({ id: doc.id, ...doc.data() } as AllowedEmail);
      });
      setAllowedEmails(fetchedAllowed);

      const fetchedPacks: Pack[] = [];
      packsSnap.forEach((doc) => {
        fetchedPacks.push({ id: doc.id, title: doc.data().title } as Pack);
      });
      setPacks(fetchedPacks);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    
    setIsAdding(true);
    try {
      const emailLower = newEmail.trim().toLowerCase();
      await setDoc(doc(db, 'allowed_emails', emailLower), {
        email: emailLower,
        createdAt: serverTimestamp()
      });
      setNewEmail('');
      fetchData();
    } catch (error) {
      console.error("Error adding email:", error);
      alert("Failed to add email.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteEmail = async (emailId: string) => {
    if (window.confirm("Are you sure you want to remove this email from the allowed list?")) {
      try {
        await deleteDoc(doc(db, 'allowed_emails', emailId));
        fetchData();
      } catch (error) {
        console.error("Error deleting email:", error);
      }
    }
  };

  const toggleUserPack = async (userId: string, packId: string, currentPacks: string[] = []) => {
    try {
      const isAssigned = currentPacks.includes(packId);
      const newPacks = isAssigned 
        ? currentPacks.filter(id => id !== packId)
        : [...currentPacks, packId];
      
      await updateDoc(doc(db, 'users', userId), {
        assignedPacks: newPacks
      });
      
      // Update local state
      setUsers(users.map(u => u.id === userId ? { ...u, assignedPacks: newPacks } : u));
    } catch (error) {
      console.error("Error updating user packs:", error);
      alert("Failed to update user packs.");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-outline-variant/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-headline font-black text-primary tracking-tight mb-4">Users & Access</h1>
          <p className="text-lg text-primary/60 font-medium max-w-xl">Control platform access and manage user subscriptions and bundle assignments.</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-outline-variant/10 p-10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
        <h2 className="text-2xl font-headline font-black text-primary mb-4 tracking-tight">Register New User</h2>
        <p className="text-sm text-primary/60 mb-8 font-medium">
          Whitelist email addresses to allow users to log in using Google Authentication.
        </p>
        <form onSubmit={handleAddEmail} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            required
            placeholder="Enter email address"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="flex-grow px-6 py-4 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all"
          />
          <button
            type="submit"
            disabled={isAdding}
            className="flex items-center justify-center px-10 py-4 bg-primary text-white font-black rounded-2xl hover:scale-105 transition-transform disabled:opacity-70 shadow-xl shadow-primary/10"
          >
            <Plus className="h-5 w-5 mr-2" />
            {isAdding ? 'Adding...' : 'Allow Email'}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {[1, 2].map(i => (
            <div key={i} className="bg-white h-96 rounded-[3rem] border border-outline-variant/10 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Allowed Emails Table */}
          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-black text-primary tracking-tight px-4">Allowed Emails</h2>
            <div className="bg-white rounded-[3rem] shadow-sm border border-outline-variant/10 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant/10">
                    <th className="p-8 text-[10px] font-black text-primary/40 uppercase tracking-widest">Email Address</th>
                    <th className="p-8 text-[10px] font-black text-primary/40 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {allowedEmails.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="p-12 text-center text-primary/40 font-medium">No allowed emails found.</td>
                    </tr>
                  ) : (
                    allowedEmails.map(item => (
                      <tr key={item.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="p-8 font-bold text-primary">{item.email}</td>
                        <td className="p-8 text-right">
                          <button 
                            onClick={() => handleDeleteEmail(item.id)} 
                            className="p-4 text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-2xl transition-all shadow-sm"
                            title="Remove access"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Users Table */}
          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-black text-primary tracking-tight px-4">Active Users & Packs</h2>
            <div className="bg-white rounded-[3rem] shadow-sm border border-outline-variant/10 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant/10">
                    <th className="p-8 text-[10px] font-black text-primary/40 uppercase tracking-widest">User</th>
                    <th className="p-8 text-[10px] font-black text-primary/40 uppercase tracking-widest">Assigned Packs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="p-12 text-center text-primary/40 font-medium">No active users found.</td>
                    </tr>
                  ) : (
                    users.map(user => (
                      <tr key={user.id} className="hover:bg-surface-container-low transition-colors align-top">
                        <td className="p-8">
                          <div className="font-bold text-primary mb-2">{user.email}</div>
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            user.role === 'admin' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-high text-primary/60'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-8">
                          <div className="space-y-3">
                            {packs.map(pack => {
                              const isAssigned = user.assignedPacks?.includes(pack.id);
                              return (
                                <label key={pack.id} className="flex items-center gap-3 cursor-pointer group">
                                  <div className="relative flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={isAssigned || false}
                                      onChange={() => toggleUserPack(user.id, pack.id, user.assignedPacks)}
                                      className="w-5 h-5 text-primary rounded-lg border-outline-variant/30 focus:ring-primary transition-all cursor-pointer"
                                    />
                                  </div>
                                  <span className={`text-sm font-bold transition-colors ${isAssigned ? 'text-primary' : 'text-primary/40 group-hover:text-primary/60'}`}>
                                    {pack.title}
                                  </span>
                                </label>
                              );
                            })}
                            {packs.length === 0 && (
                              <span className="text-sm text-primary/30 italic font-medium">No packs available</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
