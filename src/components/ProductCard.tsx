import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
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
    <Link to={`/product/${product.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-noor-light-green shadow-sm card-hover flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden bg-noor-light-green">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-xs font-bold text-noor-green uppercase tracking-wider">
          {product.category === 'book' ? 'Book' : 'Academy'}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-noor-dark mb-1 group-hover:text-noor-green transition-colors line-clamp-2">
          {product.title}
        </h3>
        {product.author && (
          <p className="text-sm text-noor-dark/60 mb-3">{product.author}</p>
        )}
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-noor-dark">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-noor-light-green text-noor-green p-2 rounded-full hover:bg-noor-green hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
