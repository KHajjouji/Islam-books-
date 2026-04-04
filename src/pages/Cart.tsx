import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <>
        <SEO title="Your Cart | Noor & Nurture" description="View your shopping cart." />
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background px-4">
          <div className="w-32 h-32 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl shadow-primary/5">
            <ShoppingBag className="h-12 w-12 text-primary/40" />
          </div>
          <h2 className="text-4xl font-headline font-extrabold text-primary mb-4 tracking-tight">Your cart is empty</h2>
          <p className="text-xl text-on-surface-variant font-medium mb-10 text-center max-w-md leading-relaxed">
            Looks like you haven't added any books or courses to your cart yet.
          </p>
          <Link 
            to="/shop" 
            className="px-10 py-5 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-primary/20 text-lg"
          >
            Start Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Your Cart | Noor & Nurture" description="View your shopping cart." />
      
      <div className="bg-background py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary tracking-tight">Your Cart</h1>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="flex-grow">
              <div className="bg-surface rounded-[3rem] shadow-xl shadow-primary/5 border border-outline-variant/10 overflow-hidden">
                <ul className="divide-y divide-outline-variant/10">
                  {items.map((item) => (
                    <li key={item.id} className="p-8 sm:p-10 flex flex-col sm:row gap-8 items-center sm:items-start group">
                      <div className="w-40 h-52 flex-shrink-0 bg-primary/5 rounded-[2rem] overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-between h-full w-full sm:w-auto text-center sm:text-left py-2">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-headline font-extrabold text-primary line-clamp-2 pr-4 leading-tight group-hover:text-accent-dark transition-colors">{item.title}</h3>
                            <span className="text-2xl font-headline font-extrabold text-primary hidden sm:block">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <div className="inline-flex px-4 py-1.5 bg-primary/5 rounded-full text-xs font-bold text-primary uppercase tracking-widest mb-6">
                            {item.category === 'book' ? 'Physical Book' : 'Academy Course'}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border-2 border-outline-variant/20 rounded-full bg-background px-4 py-2 shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-primary/40 hover:text-primary p-2 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-5 w-5" />
                            </button>
                            <span className="font-bold text-xl px-6 text-primary">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-primary/40 hover:text-primary p-2 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-5 w-5" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <span className="text-2xl font-headline font-extrabold text-primary sm:hidden">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="w-12 h-12 rounded-full bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all shadow-sm"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-6 w-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[26rem] flex-shrink-0">
              <div className="bg-surface rounded-[3rem] shadow-2xl shadow-primary/5 border border-outline-variant/10 p-10 sticky top-28">
                <h2 className="text-2xl font-headline font-extrabold text-primary mb-8 tracking-tight">Order Summary</h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-lg font-medium text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="text-primary font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium text-on-surface-variant">
                    <span>Shipping</span>
                    <span className="text-primary font-bold italic">Calculated at checkout</span>
                  </div>
                  <div className="border-t-2 border-outline-variant/10 pt-6 flex justify-between items-center">
                    <span className="text-xl font-headline font-extrabold text-primary">Total</span>
                    <span className="text-3xl font-headline font-extrabold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link 
                  to="/checkout" 
                  className="w-full flex items-center justify-center px-10 py-5 bg-accent text-secondary font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-accent/20 text-lg"
                >
                  Proceed to Checkout <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
                
                <div className="mt-8 flex items-center justify-center gap-3 text-on-surface-variant/60">
                  <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                  <p className="text-sm font-medium">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
