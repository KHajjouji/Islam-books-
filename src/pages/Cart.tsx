import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <>
        <SEO title="Your Cart | NoorKids" description="View your shopping cart." />
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-noor-cream px-4">
          <div className="w-24 h-24 bg-noor-light-green/50 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-10 w-10 text-noor-dark/40" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-noor-dark mb-4">Your cart is empty</h2>
          <p className="text-noor-dark/60 mb-8 text-center max-w-md">
            Looks like you haven't added any books or courses to your cart yet.
          </p>
          <Link 
            to="/islamic-childrens-books" 
            className="px-8 py-4 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Your Cart | NoorKids" description="View your shopping cart." />
      
      <div className="bg-noor-cream py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-noor-dark mb-10">Your Cart</h1>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="flex-grow">
              <div className="bg-white rounded-3xl shadow-sm border border-noor-light-green overflow-hidden">
                <ul className="divide-y divide-noor-light-green">
                  {items.map((item) => (
                    <li key={item.id} className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                      <div className="w-32 h-40 flex-shrink-0 bg-noor-light-green rounded-lg overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-between h-full w-full sm:w-auto text-center sm:text-left">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-noor-dark line-clamp-2 pr-4">{item.title}</h3>
                            <span className="text-xl font-bold text-noor-dark hidden sm:block">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-noor-dark/60 mb-4">{item.category === 'book' ? 'Book' : 'Academy'}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border border-noor-light-green/80 rounded-full bg-white px-3 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-noor-dark/60 hover:text-noor-dark px-2 text-lg"
                            >-</button>
                            <span className="font-medium px-4">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-noor-dark/60 hover:text-noor-dark px-2 text-lg"
                            >+</button>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className="text-xl font-bold text-noor-dark sm:hidden">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-rose-400 hover:text-rose-600 p-2 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-5 w-5" />
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
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-white rounded-3xl shadow-sm border border-noor-light-green p-8 sticky top-28">
                <h2 className="text-2xl font-serif font-bold text-noor-dark mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-noor-dark/70">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-noor-dark/70">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-noor-light-green pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-noor-dark">Total</span>
                    <span className="text-2xl font-bold text-noor-dark">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link 
                  to="/checkout" 
                  className="w-full flex items-center justify-center px-8 py-4 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green transition-colors"
                >
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                
                <p className="text-sm text-noor-dark/60 text-center mt-6">
                  Secure checkout powered by Stripe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
