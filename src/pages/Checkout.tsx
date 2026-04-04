import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Lock, ShieldCheck, CreditCard, MapPin, User, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import SEO from '../components/SEO';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      const form = e.target as HTMLFormElement;
      const shippingAddress = {
        firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
        lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
        address: (form.elements.namedItem('address') as HTMLInputElement).value,
        city: (form.elements.namedItem('city') as HTMLInputElement).value,
        zip: (form.elements.namedItem('zip') as HTMLInputElement).value,
      };

      const orderData = {
        userId: user.uid,
        items: items.map(item => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total,
        status: 'pending',
        shippingAddress,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'orders'), orderData);
      
      setIsSuccess(true);
      clearCart();
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4 text-center">
        <div className="w-32 h-32 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-primary/5">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 tracking-tight">Order Confirmed!</h1>
        <p className="text-xl text-on-surface-variant font-medium mb-10 max-w-md leading-relaxed">
          Alhamdulillah, your order has been placed successfully. You will receive a confirmation email shortly.
        </p>
        <div className="flex items-center gap-3 text-primary/40 font-bold uppercase tracking-widest text-xs">
          <div className="w-2 h-2 rounded-full bg-primary/20 animate-pulse"></div>
          Redirecting to home...
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4 text-center">
        <div className="w-24 h-24 bg-accent/10 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-accent/10">
          <Lock className="h-10 w-10 text-accent-dark" />
        </div>
        <h1 className="text-4xl font-headline font-extrabold text-primary mb-6 tracking-tight">Sign in to Checkout</h1>
        <p className="text-xl text-on-surface-variant font-medium mb-12 max-w-md leading-relaxed">
          Please sign in to your account to securely complete your purchase and track your order.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={signInWithGoogle}
            className="px-10 py-5 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-primary/20 text-lg"
          >
            Sign In with Google
          </button>
          <Link to="/cart" className="px-10 py-5 bg-surface text-primary border-2 border-outline-variant/20 font-bold rounded-full hover:bg-background transition-all text-lg">
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Checkout | Noor & Nurture" description="Secure checkout." />
      
      <div className="bg-background py-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary tracking-tight">Secure Checkout</h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <Lock className="h-4 w-4 text-accent-dark" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-dark">SSL Encrypted</span>
            </div>
          </div>
          
          <div className="bg-surface rounded-[3rem] shadow-2xl shadow-primary/5 border border-outline-variant/10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Form Section */}
              <div className="lg:col-span-3 p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-outline-variant/10">
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <Mail className="h-6 w-6 text-primary/40" />
                      <h2 className="text-2xl font-headline font-extrabold text-primary tracking-tight">Contact Information</h2>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-primary/60 uppercase tracking-widest mb-3">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          required 
                          defaultValue={user.email || ''}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-outline-variant/20 bg-background focus:border-primary outline-none transition-all font-medium text-primary" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 border-t border-outline-variant/10">
                    <div className="flex items-center gap-3 mb-8">
                      <MapPin className="h-6 w-6 text-primary/40" />
                      <h2 className="text-2xl font-headline font-extrabold text-primary tracking-tight">Shipping Address</h2>
                    </div>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-bold text-primary/60 uppercase tracking-widest mb-3">First Name</label>
                          <input type="text" id="firstName" required className="w-full px-6 py-4 rounded-2xl border-2 border-outline-variant/20 bg-background focus:border-primary outline-none transition-all font-medium text-primary" />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-bold text-primary/60 uppercase tracking-widest mb-3">Last Name</label>
                          <input type="text" id="lastName" required className="w-full px-6 py-4 rounded-2xl border-2 border-outline-variant/20 bg-background focus:border-primary outline-none transition-all font-medium text-primary" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-bold text-primary/60 uppercase tracking-widest mb-3">Street Address</label>
                        <input type="text" id="address" required className="w-full px-6 py-4 rounded-2xl border-2 border-outline-variant/20 bg-background focus:border-primary outline-none transition-all font-medium text-primary" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-bold text-primary/60 uppercase tracking-widest mb-3">City</label>
                          <input type="text" id="city" required className="w-full px-6 py-4 rounded-2xl border-2 border-outline-variant/20 bg-background focus:border-primary outline-none transition-all font-medium text-primary" />
                        </div>
                        <div>
                          <label htmlFor="zip" className="block text-sm font-bold text-primary/60 uppercase tracking-widest mb-3">ZIP Code</label>
                          <input type="text" id="zip" required className="w-full px-6 py-4 rounded-2xl border-2 border-outline-variant/20 bg-background focus:border-primary outline-none transition-all font-medium text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 border-t border-outline-variant/10">
                    <div className="flex items-center gap-3 mb-8">
                      <CreditCard className="h-6 w-6 text-primary/40" />
                      <h2 className="text-2xl font-headline font-extrabold text-primary tracking-tight">Payment (Demo)</h2>
                    </div>
                    <div className="bg-primary/5 p-6 rounded-3xl border-2 border-primary/10 text-primary/70 font-medium mb-10 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm leading-relaxed">
                        This is a demo store. No real payment will be processed. Your order will be simulated for testing purposes.
                      </p>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center px-10 py-6 bg-primary text-white font-bold rounded-full hover:scale-[1.02] transition-all disabled:opacity-70 shadow-2xl shadow-primary/20 text-xl"
                    >
                      {isSubmitting ? 'Processing Order...' : `Complete Purchase • $${total.toFixed(2)}`}
                    </button>
                  </div>
                </form>
              </div>

              {/* Order Summary Section */}
              <div className="lg:col-span-2 bg-surface-low p-10 md:p-16">
                <h2 className="text-2xl font-headline font-extrabold text-primary mb-10 tracking-tight">Order Summary</h2>
                <ul className="space-y-8 mb-12">
                  {items.map(item => (
                    <li key={item.id} className="flex items-center gap-6 group">
                      <div className="relative w-24 h-32 bg-white rounded-2xl border border-outline-variant/10 overflow-hidden flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-7 h-7 flex items-center justify-center rounded-full shadow-lg">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-headline font-extrabold text-primary line-clamp-2 leading-tight mb-2">{item.title}</h3>
                        <div className="inline-flex px-3 py-1 bg-primary/5 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
                          {item.category}
                        </div>
                      </div>
                      <span className="text-xl font-headline font-extrabold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t-2 border-outline-variant/10 pt-8 space-y-5">
                  <div className="flex justify-between text-lg font-medium text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="text-primary font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium text-on-surface-variant">
                    <span>Shipping</span>
                    <span className="text-primary font-bold uppercase tracking-widest text-sm">Free</span>
                  </div>
                  <div className="border-t-2 border-outline-variant/10 pt-8 flex justify-between items-center">
                    <span className="text-2xl font-headline font-extrabold text-primary">Total</span>
                    <span className="text-4xl font-headline font-extrabold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-white/50 rounded-3xl border border-outline-variant/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-accent-dark" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">Logged in as</p>
                      <p className="font-bold text-primary">{user.displayName || user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
