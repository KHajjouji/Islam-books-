import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Edit2, Loader2, CreditCard, CheckCircle2, X } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  popular: boolean;
  status: 'active' | 'archived';
  createdAt: any;
}

export default function AdminSubscriptions() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Partial<SubscriptionPlan>>({
    name: '',
    price: 0,
    period: 'month',
    features: [''],
    popular: false,
    status: 'active'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'subscription_plans'));
      const fetched: SubscriptionPlan[] = [];
      snap.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as SubscriptionPlan);
      });
      setPlans(fetched);
    } catch (error) {
      console.error("Error fetching plans:", error);
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
      const planId = currentPlan.id || doc(collection(db, 'subscription_plans')).id;
      const data = {
        ...currentPlan,
        createdAt: currentPlan.createdAt || serverTimestamp()
      };
      
      await setDoc(doc(db, 'subscription_plans', planId), data);
      setIsEditing(false);
      setCurrentPlan({ name: '', price: 0, period: 'month', features: [''], popular: false, status: 'active' });
      fetchData();
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Failed to save plan.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await deleteDoc(doc(db, 'subscription_plans', id));
        fetchData();
      } catch (error) {
        console.error("Error deleting plan:", error);
      }
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(currentPlan.features || [])];
    newFeatures[index] = value;
    setCurrentPlan({ ...currentPlan, features: newFeatures });
  };

  const addFeature = () => {
    setCurrentPlan({ ...currentPlan, features: [...(currentPlan.features || []), ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(currentPlan.features || [])];
    newFeatures.splice(index, 1);
    setCurrentPlan({ ...currentPlan, features: newFeatures });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-outline-variant/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-5xl font-headline font-black text-primary tracking-tight mb-4">Subscription Plans</h1>
            <p className="text-lg text-primary/60 font-medium max-w-xl">Configure and manage the premium tiers for your community members.</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => {
                setCurrentPlan({ name: '', price: 0, period: 'month', features: [''], popular: false, status: 'active' });
                setIsEditing(true);
              }}
              className="flex items-center px-10 py-4 bg-primary text-white font-black rounded-full hover:scale-105 transition-transform shadow-xl shadow-primary/10"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Plan
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-[3rem] shadow-2xl border border-outline-variant/10 p-12 mb-8 animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-headline font-black text-primary tracking-tight">
                {currentPlan.id ? 'Edit Subscription Plan' : 'Create New Subscription Plan'}
              </h2>
              <p className="text-xs text-primary/40 font-bold uppercase tracking-widest mt-1">Plan Configuration</p>
            </div>
            <button onClick={() => setIsEditing(false)} className="p-3 hover:bg-primary/5 rounded-full transition-colors text-primary">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Plan Name</label>
                <input
                  type="text"
                  required
                  value={currentPlan.name}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all"
                  placeholder="e.g., Family Premium"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 font-black">$</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={currentPlan.price}
                    onChange={(e) => setCurrentPlan({ ...currentPlan, price: parseFloat(e.target.value) })}
                    className="w-full pl-10 pr-6 py-4 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all"
                    placeholder="19.99"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Billing Period</label>
                <select
                  value={currentPlan.period}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, period: e.target.value as 'month' | 'year' })}
                  className="w-full px-6 py-4 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all appearance-none bg-surface-container-low"
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Status</label>
                <select
                  value={currentPlan.status}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, status: e.target.value as 'active' | 'archived' })}
                  className="w-full px-6 py-4 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all appearance-none bg-surface-container-low"
                >
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-primary/5 p-6 rounded-3xl border border-primary/10">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="popular"
                  checked={currentPlan.popular}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, popular: e.target.checked })}
                  className="w-6 h-6 text-primary rounded-lg focus:ring-primary border-outline-variant/20 cursor-pointer"
                />
              </div>
              <label htmlFor="popular" className="text-sm font-black text-primary uppercase tracking-widest cursor-pointer">Mark as "Most Popular"</label>
            </div>

            <div className="space-y-6">
              <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Features & Benefits</label>
              <div className="space-y-4">
                {currentPlan.features?.map((feature, index) => (
                  <div key={index} className="flex gap-4 animate-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                    <input
                      type="text"
                      required
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-grow px-6 py-4 rounded-2xl border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none font-medium transition-all"
                      placeholder="e.g., Unlimited access to all books"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-4 text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-2xl transition-all shadow-sm"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 px-6 py-3 bg-primary/5 text-primary font-black rounded-2xl hover:bg-primary/10 transition-colors text-xs uppercase tracking-widest"
              >
                <Plus className="h-4 w-4" /> Add Feature
              </button>
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
                Save Plan
              </button>
            </div>
          </form>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white h-96 rounded-[3rem] border border-outline-variant/10 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className={`bg-white rounded-[3.5rem] shadow-sm border p-10 flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all duration-500 ${plan.popular ? 'border-secondary ring-2 ring-secondary shadow-secondary/5' : 'border-outline-variant/10'}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-secondary text-primary px-8 py-2 rounded-bl-[2rem] text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-headline font-black text-primary tracking-tight">{plan.name}</h3>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${plan.status === 'active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-surface-container-high text-primary/40 border-outline-variant/10'}`}>
                    {plan.status}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-headline font-black text-primary tracking-tighter">${plan.price.toFixed(2)}</span>
                  <span className="text-sm text-primary/40 font-black uppercase tracking-widest">/ {plan.period}</span>
                </div>
              </div>
              
              <div className="flex-grow space-y-6 mb-10">
                <h4 className="text-[10px] font-black text-primary/30 uppercase tracking-widest">Included Features:</h4>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-primary/70 font-medium leading-relaxed">
                      <div className="bg-secondary/20 p-1 rounded-full mt-0.5">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-3 pt-8 border-t border-outline-variant/5">
                <button
                  onClick={() => {
                    setCurrentPlan(plan);
                    setIsEditing(true);
                  }}
                  className="flex-1 flex items-center justify-center px-6 py-3.5 bg-primary/5 text-primary font-black rounded-2xl hover:bg-primary hover:text-white transition-all text-sm shadow-sm"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Plan
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="p-3.5 text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-2xl transition-all shadow-sm"
                  title="Delete Plan"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          {plans.length === 0 && (
            <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border border-outline-variant/10 shadow-sm">
              <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-10 w-10 text-primary/20" />
              </div>
              <h3 className="text-2xl font-headline font-black text-primary mb-2 tracking-tight">No subscription plans</h3>
              <p className="text-primary/40 font-medium max-w-xs mx-auto">Create your first subscription plan to offer to your community.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
