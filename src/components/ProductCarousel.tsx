import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../data/products';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
}

export default function ProductCarousel({ products, title }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="relative">
      {title && (
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">{title}</h2>
          <div className="hidden sm:flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map(product => (
          <div key={product.id} className="min-w-[280px] max-w-[280px] sm:min-w-[300px] sm:max-w-[300px] snap-start flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
