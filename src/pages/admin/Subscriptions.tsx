import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Edit2, Loader2, CreditCard, CheckCircle2 } from 'lucide-react';

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
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-noor-dark">Subscription Plans</h1>
          <p className="text-noor-dark/70 mt-2">Manage the subscription plans offered to your users.</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => {
              setCurrentPlan({ name: '', price: 0, period: 'month', features: [''], popular: false, status: 'active' });
              setIsEditing(true);
            }}
            className="flex items-center px-6 py-3 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green/90 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Plan
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-noor-dark mb-6">{currentPlan.id ? 'Edit Plan' : 'Create New Plan'}</h2>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-noor-dark mb-2">Plan Name</label>
                <input
                  type="text"
                  required
                  value={currentPlan.name}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                  placeholder="e.g., Family Premium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-noor-dark mb-2">Price (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={currentPlan.price}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                  placeholder="19.99"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-noor-dark mb-2">Billing Period</label>
                <select
                  value={currentPlan.period}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, period: e.target.value as 'month' | 'year' })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-noor-dark mb-2">Status</label>
                <select
                  value={currentPlan.status}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, status: e.target.value as 'active' | 'archived' })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                >
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="popular"
                checked={currentPlan.popular}
                onChange={(e) => setCurrentPlan({ ...currentPlan, popular: e.target.checked })}
                className="w-5 h-5 text-noor-green rounded focus:ring-noor-green"
              />
              <label htmlFor="popular" className="text-sm font-bold text-noor-dark">Mark as "Most Popular"</label>
            </div>

            <div>
              <label className="block text-sm font-bold text-noor-dark mb-2">Features</label>
              <div className="space-y-3">
                {currentPlan.features?.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-grow px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-noor-green outline-none"
                      placeholder="e.g., Unlimited access to all books"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-stone-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addFeature}
                className="mt-3 text-sm font-bold text-noor-green hover:underline flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Feature
              </button>
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
                Save Plan
              </button>
            </div>
          </form>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-12 w-12 text-noor-green animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className={`bg-white rounded-3xl shadow-sm border p-6 flex flex-col ${plan.popular ? 'border-noor-green ring-1 ring-noor-green' : 'border-stone-200'}`}>
              {plan.popular && (
                <div className="self-start bg-noor-green text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                  Most Popular
                </div>
              )}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-noor-dark">{plan.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-800'}`}>
                  {plan.status}
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-noor-dark">${plan.price.toFixed(2)}</span>
                <span className="text-sm text-noor-dark/60 font-medium">/ {plan.period}</span>
              </div>
              
              <div className="flex-grow">
                <h4 className="text-sm font-bold text-noor-dark mb-3">Features:</h4>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-noor-dark/80">
                      <CheckCircle2 className="h-4 w-4 text-noor-green mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-2 pt-4 border-t border-stone-100">
                <button
                  onClick={() => {
                    setCurrentPlan(plan);
                    setIsEditing(true);
                  }}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-stone-100 text-noor-dark font-bold rounded-xl hover:bg-stone-200 transition-colors"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-100"
                  title="Delete Plan"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          {plans.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-stone-200">
              <CreditCard className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-noor-dark mb-2">No subscription plans</h3>
              <p className="text-noor-dark/60">Create your first subscription plan to offer to users.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
