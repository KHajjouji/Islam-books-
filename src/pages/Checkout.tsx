import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Lock } from 'lucide-react';
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-noor-cream px-4 text-center">
        <CheckCircle className="h-20 w-20 text-noor-green/80 mb-6" />
        <h1 className="text-4xl font-serif font-bold text-noor-dark mb-4">Order Confirmed!</h1>
        <p className="text-lg text-noor-dark/70 mb-8 max-w-md">
          Alhamdulillah, your order has been placed successfully. You will receive a confirmation email shortly.
        </p>
        <p className="text-noor-dark/60">Redirecting to home...</p>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-noor-cream px-4 text-center">
        <Lock className="h-16 w-16 text-noor-green/80 mb-6" />
        <h1 className="text-3xl font-serif font-bold text-noor-dark mb-4">Sign in to Checkout</h1>
        <p className="text-lg text-noor-dark/70 mb-8 max-w-md">
          Please sign in to your account to securely complete your purchase and track your order.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={signInWithGoogle}
            className="px-8 py-4 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green/90 transition-colors"
          >
            Sign In with Google
          </button>
          <Link to="/cart" className="px-8 py-4 bg-white text-noor-dark border border-noor-light-green font-bold rounded-full hover:bg-stone-50 transition-colors">
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Checkout | NoorKids" description="Secure checkout." />
      
      <div className="bg-noor-cream py-12 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-10">
            <Lock className="h-5 w-5 text-noor-green mr-2" />
            <h1 className="text-3xl font-serif font-bold text-noor-dark">Secure Checkout</h1>
          </div>
          
          <div className="bg-white rounded-3xl shadow-sm border border-noor-light-green overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Form Section */}
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-noor-light-green">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-noor-dark mb-4">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-noor-dark/80 mb-1">Email address</label>
                        <input type="email" id="email" required className="w-full px-4 py-3 rounded-xl border border-noor-light-green/80 focus:ring-2 focus:ring-noor-green/80 focus:border-noor-green/80 outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-noor-light-green">
                    <h2 className="text-xl font-bold text-noor-dark mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-noor-dark/80 mb-1">First name</label>
                          <input type="text" id="firstName" required className="w-full px-4 py-3 rounded-xl border border-noor-light-green/80 focus:ring-2 focus:ring-noor-green/80 focus:border-noor-green/80 outline-none transition-all" />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-noor-dark/80 mb-1">Last name</label>
                          <input type="text" id="lastName" required className="w-full px-4 py-3 rounded-xl border border-noor-light-green/80 focus:ring-2 focus:ring-noor-green/80 focus:border-noor-green/80 outline-none transition-all" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-noor-dark/80 mb-1">Address</label>
                        <input type="text" id="address" required className="w-full px-4 py-3 rounded-xl border border-noor-light-green/80 focus:ring-2 focus:ring-noor-green/80 focus:border-noor-green/80 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-noor-dark/80 mb-1">City</label>
                          <input type="text" id="city" required className="w-full px-4 py-3 rounded-xl border border-noor-light-green/80 focus:ring-2 focus:ring-noor-green/80 focus:border-noor-green/80 outline-none transition-all" />
                        </div>
                        <div>
                          <label htmlFor="zip" className="block text-sm font-medium text-noor-dark/80 mb-1">ZIP code</label>
                          <input type="text" id="zip" required className="w-full px-4 py-3 rounded-xl border border-noor-light-green/80 focus:ring-2 focus:ring-noor-green/80 focus:border-noor-green/80 outline-none transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-noor-light-green">
                    <h2 className="text-xl font-bold text-noor-dark mb-4">Payment (Mock)</h2>
                    <div className="bg-noor-cream p-4 rounded-xl border border-noor-light-green/50 text-sm text-noor-dark/70 mb-6">
                      This is a demo store. No real payment will be processed.
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center px-8 py-4 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                    </button>
                  </div>
                </form>
              </div>

              {/* Order Summary Section */}
              <div className="bg-noor-cream p-8 md:p-12">
                <h2 className="text-xl font-bold text-noor-dark mb-6">Order Summary</h2>
                <ul className="space-y-4 mb-8">
                  {items.map(item => (
                    <li key={item.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 bg-white rounded-lg border border-noor-light-green/50 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <span className="absolute -top-2 -right-2 bg-noor-dark/60 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm font-bold text-noor-dark line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-noor-dark/60">{item.category}</p>
                      </div>
                      <span className="text-sm font-medium text-noor-dark">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-noor-light-green/50 pt-4 space-y-3">
                  <div className="flex justify-between text-sm text-noor-dark/70">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-noor-dark/70">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-noor-light-green/50 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-noor-dark">Total</span>
                    <span className="text-2xl font-bold text-noor-dark">${total.toFixed(2)}</span>
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
