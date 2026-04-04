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
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-noor-dark">Users & Access</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-noor-dark mb-4">Register New User</h2>
        <p className="text-sm text-noor-dark/70 mb-4">
          Only users whose emails are registered here can log in using Google.
        </p>
        <form onSubmit={handleAddEmail} className="flex gap-4">
          <input
            type="email"
            required
            placeholder="Enter email address"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="flex-grow px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
          />
          <button
            type="submit"
            disabled={isAdding}
            className="flex items-center px-6 py-2 bg-noor-green text-white font-bold rounded-xl hover:bg-noor-green/90 transition-colors disabled:opacity-70"
          >
            <Plus className="h-5 w-5 mr-2" />
            {isAdding ? 'Adding...' : 'Allow Email'}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white h-16 rounded-2xl border border-stone-200"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Allowed Emails Table */}
          <div>
            <h2 className="text-xl font-bold text-noor-dark mb-4">Allowed Emails</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-noor-dark/70">
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {allowedEmails.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="p-8 text-center text-noor-dark/60">No allowed emails found.</td>
                    </tr>
                  ) : (
                    allowedEmails.map(item => (
                      <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-4 font-medium text-noor-dark">{item.email}</td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => handleDeleteEmail(item.id)} 
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Remove access"
                          >
                            <Trash2 className="h-4 w-4" />
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
          <div>
            <h2 className="text-xl font-bold text-noor-dark mb-4">Active Users & Packs</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-noor-dark/70">
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Assigned Packs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="p-8 text-center text-noor-dark/60">No active users found.</td>
                    </tr>
                  ) : (
                    users.map(user => (
                      <tr key={user.id} className="hover:bg-stone-50 transition-colors align-top">
                        <td className="p-4">
                          <div className="font-medium text-noor-dark">{user.email}</div>
                          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="space-y-2">
                            {packs.map(pack => {
                              const isAssigned = user.assignedPacks?.includes(pack.id);
                              return (
                                <label key={pack.id} className="flex items-center gap-2 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    checked={isAssigned || false}
                                    onChange={() => toggleUserPack(user.id, pack.id, user.assignedPacks)}
                                    className="w-4 h-4 text-noor-green rounded focus:ring-noor-green"
                                  />
                                  <span className={`text-sm ${isAssigned ? 'text-noor-dark font-medium' : 'text-noor-dark/60 group-hover:text-noor-dark'}`}>
                                    {pack.title}
                                  </span>
                                </label>
                              );
                            })}
                            {packs.length === 0 && (
                              <span className="text-sm text-noor-dark/50 italic">No packs available</span>
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
