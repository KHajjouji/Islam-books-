import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft, CheckCircle, Loader2, Star, ShieldCheck, Truck, RefreshCw, ExternalLink, Heart, Sparkles } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import ProductCarousel from '../components/ProductCarousel';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-noor-cream">
        <Loader2 className="h-8 w-8 animate-spin text-noor-green" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/" className="text-noor-green hover:underline">Return to Home</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.theme === product.theme))
    .slice(0, 4);

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
      
      <div className="bg-noor-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-noor-dark/60 hover:text-noor-dark mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Image Gallery Section */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl shadow-sm border border-noor-light-green overflow-hidden p-8 md:p-12 flex items-center justify-center mb-6">
                <img 
                  src={activeImage || product.image} 
                  alt={product.title} 
                  className="max-w-full max-h-[600px] object-contain rounded-lg shadow-xl transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`flex-shrink-0 w-24 h-24 rounded-xl border-2 transition-all overflow-hidden bg-white ${
                        activeImage === img ? 'border-noor-green shadow-md' : 'border-noor-light-green hover:border-noor-green/50'
                      }`}
                    >
                      <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <div className="uppercase tracking-widest text-xs font-bold text-noor-green mb-4">
                  {product.category === 'book' ? 'Book' : 'Academy Course'}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-noor-dark mb-4 leading-tight">
                  {product.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex text-noor-yellow">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <span className="text-sm text-noor-dark/60">(4.9/5 based on 120 reviews)</span>
                </div>

                {product.author && (
                  <p className="text-lg text-noor-dark/60 mb-6">By {product.author}</p>
                )}
                
                <div className="text-4xl font-bold text-noor-dark mb-8">
                  ${product.price.toFixed(2)}
                </div>
                
                <p className="text-lg text-noor-dark/70 leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {product.ageRange && (
                    <div className="p-4 bg-white rounded-2xl border border-noor-light-green shadow-sm">
                      <span className="text-xs text-noor-dark/60 block mb-1 uppercase tracking-wider font-bold">Age Range</span>
                      <span className="font-medium text-noor-dark">{product.ageRange}</span>
                    </div>
                  )}
                  <div className="p-4 bg-white rounded-2xl border border-noor-light-green shadow-sm">
                    <span className="text-xs text-noor-dark/60 block mb-1 uppercase tracking-wider font-bold">Format</span>
                    <span className="font-medium text-noor-dark">{product.category === 'book' ? 'Physical Book' : 'Digital Access'}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-center border border-noor-light-green/80 rounded-full bg-white px-6 py-3 justify-between">
                    <span className="text-sm font-bold text-noor-dark/60 uppercase">Quantity</span>
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="text-noor-dark/60 hover:text-noor-dark text-2xl font-bold"
                      >-</button>
                      <span className="font-bold text-lg min-w-[20px] text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="text-noor-dark/60 hover:text-noor-dark text-2xl font-bold"
                      >+</button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center px-8 py-5 rounded-full font-bold text-lg shadow-lg transition-all transform active:scale-95 ${
                      added 
                        ? 'bg-noor-light-green text-noor-green' 
                        : 'bg-noor-green text-white hover:bg-noor-green/90 hover:shadow-xl'
                    }`}
                  >
                    {added ? (
                      <>
                        <CheckCircle className="h-6 w-6 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-6 w-6 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>

                  {product.interactiveUrl && (
                    <a 
                      href={product.interactiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-8 py-4 rounded-full font-bold text-noor-green border-2 border-noor-green hover:bg-noor-green hover:text-white transition-all"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Access Interactive Content
                    </a>
                  )}
                </div>

                <div className="space-y-4 pt-6 border-t border-noor-light-green/50">
                  <div className="flex items-center text-sm text-noor-dark/70">
                    <Truck className="h-5 w-5 mr-3 text-noor-green" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center text-sm text-noor-dark/70">
                    <ShieldCheck className="h-5 w-5 mr-3 text-noor-green" />
                    <span>100% Secure Checkout</span>
                  </div>
                  <div className="flex items-center text-sm text-noor-dark/70">
                    <RefreshCw className="h-5 w-5 mr-3 text-noor-green" />
                    <span>30-Day Easy Returns</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="flex items-center px-3 py-1 bg-noor-light-green/30 text-noor-green rounded-full text-xs font-bold border border-noor-light-green/50">
                    <Sparkles className="h-3 w-3 mr-1.5" />
                    Faith-Based
                  </div>
                  <div className="flex items-center px-3 py-1 bg-noor-light-green/30 text-noor-green rounded-full text-xs font-bold border border-noor-light-green/50">
                    <ShieldCheck className="h-3 w-3 mr-1.5" />
                    Educational
                  </div>
                  <div className="flex items-center px-3 py-1 bg-noor-light-green/30 text-noor-green rounded-full text-xs font-bold border border-noor-light-green/50">
                    <Heart className="h-3 w-3 mr-1.5" />
                    Ethically Made
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Info Tabs */}
          <div className="mb-20">
            <div className="bg-white rounded-3xl shadow-sm border border-noor-light-green overflow-hidden">
              <div className="border-b border-noor-light-green/50 flex">
                <button className="px-8 py-6 font-bold text-noor-green border-b-4 border-noor-green">Description</button>
                {product.features && <button className="px-8 py-6 font-bold text-noor-dark/60 hover:text-noor-dark transition-colors">Features</button>}
                <button className="px-8 py-6 font-bold text-noor-dark/60 hover:text-noor-dark transition-colors">Reviews (120)</button>
              </div>
              <div className="p-8 md:p-12">
                <div className="prose prose-noor max-w-none">
                  <h3 className="text-2xl font-serif font-bold text-noor-dark mb-6">About this {product.category}</h3>
                  <p className="text-lg text-noor-dark/70 leading-relaxed mb-8">
                    {product.longDescription || product.description}
                  </p>
                  
                  {product.features && (
                    <div className="mt-12">
                      <h4 className="text-xl font-bold text-noor-dark mb-6">Key Features:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-noor-dark/70">
                            <CheckCircle className="h-5 w-5 mr-3 text-noor-green flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-12">
              <ProductCarousel 
                products={relatedProducts} 
                title="You Might Also Like" 
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
