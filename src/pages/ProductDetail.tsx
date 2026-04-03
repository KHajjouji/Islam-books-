import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, ArrowLeft, CheckCircle } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/" className="text-emerald-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <SEO 
        title={`${product.title} | NoorKids`}
        description={product.description}
      />
      
      <div className="bg-stone-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>

          <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="bg-stone-100 p-8 md:p-16 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="max-w-full max-h-[500px] object-contain rounded-lg shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Details Section */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="uppercase tracking-widest text-xs font-bold text-emerald-600 mb-4">
                  {product.category === 'book' ? 'Book' : 'Academy Course'}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                  {product.title}
                </h1>
                
                {product.author && (
                  <p className="text-lg text-stone-500 mb-6">By {product.author}</p>
                )}
                
                <div className="text-3xl font-bold text-stone-900 mb-8">
                  ${product.price.toFixed(2)}
                </div>
                
                <p className="text-lg text-stone-600 leading-relaxed mb-8">
                  {product.description}
                </p>

                {product.ageRange && (
                  <div className="mb-8 p-4 bg-stone-50 rounded-xl border border-stone-100 inline-block">
                    <span className="text-sm text-stone-500 block mb-1">Recommended Age</span>
                    <span className="font-medium text-stone-900">{product.ageRange}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <div className="flex items-center border border-stone-300 rounded-full bg-white px-4 py-2 w-full sm:w-auto justify-between">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-stone-500 hover:text-stone-900 px-2 text-xl"
                    >-</button>
                    <span className="font-medium px-4">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-stone-500 hover:text-stone-900 px-2 text-xl"
                    >+</button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className={`flex-grow flex items-center justify-center px-8 py-4 rounded-full font-bold transition-all ${
                      added 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-emerald-800 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {added ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
