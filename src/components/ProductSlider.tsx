import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  salePrice?: number;
}

interface ProductSliderProps {
  products: Product[];
  title: string;
  subtitle?: string;
}

export default function ProductSlider({ products, title, subtitle }: ProductSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000, stopOnInteraction: true })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!products || products.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-primary font-headline mb-4 tracking-tight">{title}</h2>
            {subtitle && <p className="text-on-surface-variant font-medium max-w-2xl">{subtitle}</p>}
          </div>
          <div className="flex gap-4 hidden sm:flex">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border-2 border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border-2 border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex -ml-4">
            {products.map((product) => (
              <div key={product.id} className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] pl-4">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="group h-full flex flex-col"
                >
                  <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 shadow-lg border border-primary/5">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.salePrice && (
                      <div className="absolute top-4 left-4 bg-secondary text-on-secondary px-3 py-1 rounded-full font-black text-xs uppercase tracking-widest shadow-md">
                        Sale
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-primary font-black text-sm shadow-sm">
                      {product.salePrice ? (
                        <div className="flex items-center gap-2">
                          <span className="line-through text-primary/50 text-xs">${product.price}</span>
                          <span>${product.salePrice}</span>
                        </div>
                      ) : (
                        <span>${product.price}</span>
                      )}
                    </div>
                  </Link>
                  <div className="flex-grow flex flex-col">
                    <h3 className="text-xl font-black text-primary mb-2 font-headline line-clamp-1">{product.title}</h3>
                    <p className="text-on-surface-variant text-sm mb-6 line-clamp-2 font-medium flex-grow">{product.description}</p>
                    <Link 
                      to={`/product/${product.id}`}
                      className="w-full bg-[#faf9f6] text-primary border border-primary/10 py-3 rounded-full font-headline font-black text-sm hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-2 mt-auto"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      View Details
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
