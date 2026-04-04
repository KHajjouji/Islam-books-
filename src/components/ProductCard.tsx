import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page when clicking the button
    addToCart(product);
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group block bg-surface rounded-[2.5rem] overflow-hidden border border-outline-variant/10 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-2"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-low">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="px-4 py-2 bg-white/90 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
            {product.category === 'book' ? 'Physical Book' : 'Digital Academy'}
          </div>
          {product.theme && (
            <div className="px-4 py-2 bg-accent/90 backdrop-blur-md border border-accent/20 rounded-full text-[10px] font-bold text-secondary uppercase tracking-widest shadow-sm">
              {product.theme}
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-3 w-3 text-accent" />
          <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Premium Content</span>
        </div>
        
        <h3 className="text-xl font-headline font-extrabold text-primary mb-2 group-hover:text-primary/80 transition-colors line-clamp-2 leading-tight">
          {product.title}
        </h3>
        
        {product.author && (
          <p className="text-sm text-on-surface-variant/60 font-medium mb-4">By {product.author}</p>
        )}
        
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-outline-variant/5">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Price</span>
            <span className="text-2xl font-headline font-extrabold text-primary">${product.price.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-primary/90 hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/20 group/btn"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
