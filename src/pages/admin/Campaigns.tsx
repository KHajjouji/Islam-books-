import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Edit2, Loader2, Mail, Send, CheckCircle2 } from 'lucide-react';

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
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-noor-dark">Email Campaigns</h1>
          <p className="text-noor-dark/70 mt-2">Create and manage email communications with your users.</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => {
              setCurrentCampaign({ subject: '', body: '', status: 'draft' });
              setIsEditing(true);
            }}
            className="flex items-center px-6 py-3 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green/90 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Campaign
          </button>
        )}
      </div>

      {/* Mailing System Integration Note */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex gap-4 items-start">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
          <Mail className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-blue-900 mb-1">Mailing System Integration</h3>
          <p className="text-sm text-blue-800/80 mb-3">
            To actually send these emails, you will need to connect a mailing service like Mailchimp or Mailjet. 
            The recommended approach is to use the <strong>Firebase "Trigger Email" Extension</strong> or a custom Cloud Function that listens for new documents in the <code>campaigns</code> collection with <code>status: 'sent'</code>.
          </p>
          <a href="https://firebase.google.com/products/extensions/firebase-ext-firestore-send-email" target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:text-blue-800 underline">
            Learn about Firebase Email Extension &rarr;
          </a>
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-noor-dark mb-6">{currentCampaign.id ? 'Edit Campaign' : 'Create New Campaign'}</h2>
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-noor-dark mb-2">Subject Line</label>
              <input
                type="text"
                required
                value={currentCampaign.subject}
                onChange={(e) => setCurrentCampaign({ ...currentCampaign, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                placeholder="e.g., New Ramadan Pack Available!"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-noor-dark mb-2">Email Body (HTML supported)</label>
              <textarea
                required
                rows={10}
                value={currentCampaign.body}
                onChange={(e) => setCurrentCampaign({ ...currentCampaign, body: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none font-mono text-sm"
                placeholder="<h1>Hello!</h1><p>Check out our new packs...</p>"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-stone-100 text-noor-dark font-bold rounded-full hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green/90 transition-colors"
              >
                Save Draft
              </button>
            </div>
          </form>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-12 w-12 text-noor-green animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-noor-dark">{campaign.subject}</h3>
                  {campaign.status === 'sent' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="h-3 w-3" /> Sent
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-800 rounded-full text-xs font-bold uppercase tracking-wider">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-noor-dark/60 text-sm line-clamp-2 mb-2">{campaign.body.replace(/<[^>]*>?/gm, '')}</p>
                <div className="text-xs text-noor-dark/40">
                  Created: {campaign.createdAt?.toDate().toLocaleDateString()}
                  {campaign.sentAt && ` • Sent: ${campaign.sentAt.toDate().toLocaleDateString()}`}
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-stone-100">
                {campaign.status === 'draft' && (
                  <>
                    <button
                      onClick={() => handleSend(campaign.id)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Now
                    </button>
                    <button
                      onClick={() => {
                        setCurrentCampaign(campaign);
                        setIsEditing(true);
                      }}
                      className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                      title="Edit Draft"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(campaign.id)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Campaign"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          {campaigns.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-stone-200">
              <Mail className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-noor-dark mb-2">No campaigns yet</h3>
              <p className="text-noor-dark/60">Create your first email campaign to connect with users.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
