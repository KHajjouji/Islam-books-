import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft, CheckCircle, Loader2, Star, ShieldCheck, Truck, RefreshCw, ExternalLink, Heart, Sparkles, Minus, Plus } from 'lucide-react';
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
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="bg-surface-low w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <Sparkles className="h-10 w-10 text-primary/20" />
        </div>
        <h2 className="text-3xl font-headline font-extrabold text-primary mb-4">Product not found</h2>
        <Link to="/shop" className="inline-flex items-center text-primary font-bold hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Shop
        </Link>
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
        title={`${product.title} | Noor & Nurture`}
        description={product.description}
      />
      
      <div className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center text-on-surface-variant/60 hover:text-primary mb-10 transition-colors font-bold text-sm uppercase tracking-widest"
          >
            <div className="w-8 h-8 rounded-full bg-surface-low flex items-center justify-center mr-3 group-hover:bg-primary/10 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Collection
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            {/* Image Gallery Section */}
            <div className="lg:col-span-7">
              <div className="bg-surface rounded-[3rem] shadow-xl shadow-primary/5 border border-outline-variant/10 overflow-hidden p-8 md:p-16 flex items-center justify-center mb-8 relative group">
                <div className="absolute top-6 left-6">
                  <div className="px-4 py-2 bg-accent/20 backdrop-blur-md border border-accent/30 rounded-full text-[10px] font-bold text-secondary uppercase tracking-widest">
                    Premium Quality
                  </div>
                </div>
                <img 
                  src={activeImage || product.image} 
                  alt={product.title} 
                  className="max-w-full max-h-[600px] object-contain rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`flex-shrink-0 w-28 h-28 rounded-[1.5rem] border-4 transition-all overflow-hidden bg-surface ${
                        activeImage === img 
                          ? 'border-primary shadow-lg shadow-primary/10 scale-105' 
                          : 'border-outline-variant/10 hover:border-primary/30'
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
              <div className="sticky top-28">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-6">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {product.category === 'book' ? 'Physical Book' : 'Digital Academy'}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 leading-tight tracking-tight">
                  {product.title}
                </h1>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <div className="h-4 w-px bg-outline-variant/30"></div>
                  <span className="text-sm font-bold text-on-surface-variant/70">4.9/5 (120 reviews)</span>
                </div>

                {product.author && (
                  <p className="text-xl text-on-surface-variant font-medium mb-8">By <span className="text-primary font-bold">{product.author}</span></p>
                )}
                
                <div className="flex items-baseline gap-3 mb-10">
                  <span className="text-5xl font-headline font-extrabold text-primary">${product.price.toFixed(2)}</span>
                  <span className="text-sm font-bold text-on-surface-variant/40 uppercase tracking-widest">USD</span>
                </div>
                
                <p className="text-lg text-on-surface-variant font-medium leading-relaxed mb-10">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  {product.ageRange && (
                    <div className="p-6 bg-surface rounded-[2rem] border border-outline-variant/10 shadow-sm">
                      <span className="text-[10px] text-on-surface-variant/50 block mb-2 uppercase tracking-widest font-bold">Age Range</span>
                      <span className="font-bold text-primary text-lg">{product.ageRange}</span>
                    </div>
                  )}
                  <div className="p-6 bg-surface rounded-[2rem] border border-outline-variant/10 shadow-sm">
                    <span className="text-[10px] text-on-surface-variant/50 block mb-2 uppercase tracking-widest font-bold">Format</span>
                    <span className="font-bold text-primary text-lg">{product.category === 'book' ? 'Hardcover' : 'Instant Access'}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-6 mb-10">
                  <div className="flex items-center border border-outline-variant/30 rounded-full bg-surface px-8 py-4 justify-between shadow-inner">
                    <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">Quantity</span>
                    <div className="flex items-center gap-8">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-surface-low flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-30"
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-headline font-extrabold text-xl min-w-[24px] text-center text-primary">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-surface-low flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center px-10 py-6 rounded-full font-bold text-lg shadow-xl transition-all transform active:scale-95 ${
                      added 
                        ? 'bg-accent text-secondary' 
                        : 'bg-primary text-white hover:bg-primary/90 hover:shadow-primary/20'
                    }`}
                  >
                    {added ? (
                      <>
                        <CheckCircle className="h-6 w-6 mr-3" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-6 w-6 mr-3" />
                        Add to Cart
                      </>
                    )}
                  </button>

                  {product.interactiveUrl && (
                    <a 
                      href={product.interactiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-10 py-5 rounded-full font-bold text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all group"
                    >
                      <ExternalLink className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                      Access Interactive Content
                    </a>
                  )}
                </div>

                <div className="space-y-5 pt-8 border-t border-outline-variant/30">
                  <div className="flex items-center text-sm font-bold text-on-surface-variant/80">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mr-4">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center text-sm font-bold text-on-surface-variant/80">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mr-4">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <span>100% Secure Checkout & Payment</span>
                  </div>
                  <div className="flex items-center text-sm font-bold text-on-surface-variant/80">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mr-4">
                      <RefreshCw className="h-5 w-5 text-primary" />
                    </div>
                    <span>30-Day Easy Returns Guarantee</span>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {['Faith-Based', 'Educational', 'Ethically Made', 'Premium Content'].map(tag => (
                    <div key={tag} className="flex items-center px-4 py-2 bg-surface-low text-primary rounded-full text-[10px] font-bold border border-outline-variant/10 uppercase tracking-widest">
                      <Sparkles className="h-3 w-3 mr-2" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Info Tabs */}
          <div className="mb-32">
            <div className="bg-surface rounded-[3rem] shadow-xl shadow-primary/5 border border-outline-variant/10 overflow-hidden">
              <div className="border-b border-outline-variant/10 flex overflow-x-auto scrollbar-hide">
                <button className="px-10 py-8 font-bold text-primary border-b-4 border-primary whitespace-nowrap">Description</button>
                {product.features && <button className="px-10 py-8 font-bold text-on-surface-variant/60 hover:text-primary transition-colors whitespace-nowrap">Features</button>}
                <button className="px-10 py-8 font-bold text-on-surface-variant/60 hover:text-primary transition-colors whitespace-nowrap">Reviews (120)</button>
              </div>
              <div className="p-10 md:p-20">
                <div className="max-w-4xl">
                  <h3 className="text-3xl font-headline font-extrabold text-primary mb-8 tracking-tight">About this {product.category}</h3>
                  <p className="text-xl text-on-surface-variant font-medium leading-relaxed mb-12">
                    {product.longDescription || product.description}
                  </p>
                  
                  {product.features && (
                    <div className="mt-16">
                      <h4 className="text-2xl font-headline font-extrabold text-primary mb-8">Key Features & Benefits:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start p-6 bg-surface-low rounded-2xl border border-outline-variant/10 group hover:border-primary/30 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                              <CheckCircle className="h-5 w-5" />
                            </div>
                            <span className="text-on-surface-variant font-bold leading-tight">{feature}</span>
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
            <div className="mb-16">
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
