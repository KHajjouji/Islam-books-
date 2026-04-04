import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Edit2, Loader2, Mail, Send, CheckCircle2, ArrowRight, X } from 'lucide-react';

interface Campaign {
  id: string;
  subject: string;
  body: string;
  status: 'draft' | 'sent';
  sentAt?: any;
  createdAt: any;
}

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<Partial<Campaign>>({
    subject: '',
    body: '',
    status: 'draft'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'campaigns'));
      const fetched: Campaign[] = [];
      snap.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as Campaign);
      });
      // Sort by created date descending
      fetched.sort((a, b) => {
        const dateA = a.createdAt?.toMillis() || 0;
        const dateB = b.createdAt?.toMillis() || 0;
        return dateB - dateA;
      });
      setCampaigns(fetched);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const campaignId = currentCampaign.id || doc(collection(db, 'campaigns')).id;
      const data = {
        ...currentCampaign,
        createdAt: currentCampaign.createdAt || serverTimestamp()
      };
      
      await setDoc(doc(db, 'campaigns', campaignId), data);
      setIsEditing(false);
      setCurrentCampaign({ subject: '', body: '', status: 'draft' });
      fetchData();
    } catch (error) {
      console.error("Error saving campaign:", error);
      alert("Failed to save campaign.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await deleteDoc(doc(db, 'campaigns', id));
        fetchData();
      } catch (error) {
        console.error("Error deleting campaign:", error);
      }
    }
  };

  const handleSend = async (id: string) => {
    if (window.confirm("Are you sure you want to send this campaign to all users? This action cannot be undone.")) {
      try {
        // In a real app, this would trigger a Cloud Function to send emails via Mailchimp/SendGrid
        // For now, we just update the status in Firestore
        await setDoc(doc(db, 'campaigns', id), {
          status: 'sent',
          sentAt: serverTimestamp()
        }, { merge: true });
        
        alert("Campaign sent successfully! (Simulated)");
        fetchData();
      } catch (error) {
        console.error("Error sending campaign:", error);
        alert("Failed to send campaign.");
      }
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-outline-variant/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-5xl font-headline font-black text-primary tracking-tight mb-4">Email Campaigns</h1>
            <p className="text-lg text-primary/60 font-medium max-w-xl">Design and broadcast premium newsletters to your community.</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => {
                setCurrentCampaign({ subject: '', body: '', status: 'draft' });
                setIsEditing(true);
              }}
              className="flex items-center px-10 py-4 bg-primary text-white font-black rounded-full hover:scale-105 transition-transform shadow-xl shadow-primary/10"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Campaign
            </button>
          )}
        </div>
      </div>

      {/* Mailing System Integration Note */}
      <div className="bg-secondary/10 border border-secondary/20 rounded-[3rem] p-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex gap-8 items-start">
          <div className="bg-secondary text-primary p-5 rounded-3xl shadow-lg shadow-secondary/20">
            <Mail className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-2xl font-headline font-black text-primary mb-3 tracking-tight">Mailing System Integration</h3>
            <p className="text-primary/70 font-medium mb-6 max-w-2xl leading-relaxed">
              To broadcast these emails, connect a delivery service like Mailchimp or SendGrid. 
              We recommend the <strong>Firebase "Trigger Email" Extension</strong> for seamless integration with your campaigns collection.
            </p>
            <a href="https://firebase.google.com/products/extensions/firebase-ext-firestore-send-email" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-black text-primary hover:gap-4 transition-all uppercase tracking-widest">
              Learn about Firebase Email Extension <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-[3rem] shadow-2xl border border-outline-variant/10 p-12 mb-8 animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-headline font-black text-primary tracking-tight">
                {currentCampaign.id ? 'Edit Campaign' : 'Create New Campaign'}
              </h2>
              <p className="text-xs text-primary/40 font-bold uppercase tracking-widest mt-1">Campaign Designer</p>
            </div>
            <button onClick={() => setIsEditing(false)} className="p-3 hover:bg-primary/5 rounded-full transition-colors text-primary">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSave} className="space-y-10">
            <div className="space-y-3">
              <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Subject Line</label>
              <input
                type="text"
                required
                value={currentCampaign.subject}
                onChange={(e) => setCurrentCampaign({ ...currentCampaign, subject: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all"
                placeholder="e.g., New Ramadan Pack Available!"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Email Body (HTML supported)</label>
              <textarea
                required
                rows={12}
                value={currentCampaign.body}
                onChange={(e) => setCurrentCampaign({ ...currentCampaign, body: e.target.value })}
                className="w-full px-6 py-5 rounded-3xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-mono text-sm bg-surface-container-low resize-none"
                placeholder="<h1>Hello!</h1><p>Check out our new packs...</p>"
              />
            </div>

            <div className="flex justify-end gap-4 pt-8 border-t border-outline-variant/10">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-10 py-4 rounded-full font-black text-sm text-primary/60 hover:bg-primary/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-12 py-4 bg-primary text-white font-black rounded-full hover:scale-105 transition-transform shadow-xl shadow-primary/10"
              >
                Save Draft
              </button>
            </div>
          </form>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white h-48 rounded-[3rem] border border-outline-variant/10 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-[3rem] shadow-sm border border-outline-variant/10 p-10 flex flex-col md:flex-row gap-10 items-start md:items-center group hover:shadow-xl transition-all duration-500">
              <div className="flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-2xl font-headline font-black text-primary tracking-tight">{campaign.subject}</h3>
                  {campaign.status === 'sent' ? (
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                      <CheckCircle2 className="h-3 w-3" /> Sent
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface-container-high text-primary/40 rounded-full text-[10px] font-black uppercase tracking-widest border border-outline-variant/10">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-primary/60 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">{campaign.body.replace(/<[^>]*>?/gm, '')}</p>
                <div className="flex items-center gap-6 text-[10px] text-primary/30 font-black uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
                    Created: {campaign.createdAt?.toDate().toLocaleDateString()}
                  </div>
                  {campaign.sentAt && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                      Sent: {campaign.sentAt.toDate().toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-8 md:pt-0 border-outline-variant/5">
                {campaign.status === 'draft' && (
                  <>
                    <button
                      onClick={() => handleSend(campaign.id)}
                      className="flex items-center px-8 py-3.5 bg-secondary text-primary font-black rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-secondary/10 text-sm"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Now
                    </button>
                    <button
                      onClick={() => {
                        setCurrentCampaign(campaign);
                        setIsEditing(true);
                      }}
                      className="p-4 text-primary bg-primary/5 hover:bg-primary hover:text-white rounded-2xl transition-all shadow-sm"
                      title="Edit Draft"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(campaign.id)}
                  className="p-4 text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-2xl transition-all shadow-sm"
                  title="Delete Campaign"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          {campaigns.length === 0 && (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-outline-variant/10 shadow-sm">
              <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-10 w-10 text-primary/20" />
              </div>
              <h3 className="text-2xl font-headline font-black text-primary mb-2 tracking-tight">No campaigns yet</h3>
              <p className="text-primary/40 font-medium max-w-xs mx-auto">Create your first email campaign to connect with your community.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
