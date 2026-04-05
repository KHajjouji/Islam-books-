import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import ProductSlider from '../components/ProductSlider';
import { useProducts } from '../hooks/useProducts';

interface PageSection {
  id: string;
  type: 'hero' | 'html' | 'product_slider';
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  category?: string;
}

interface PageData {
  id?: string;
  slug: string;
  title: string;
  status: 'draft' | 'published';
  sections: PageSection[];
}

export default function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const { products, loading: productsLoading } = useProducts();

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      try {
        const q = query(collection(db, 'pages'), where('slug', '==', slug), where('status', '==', 'published'));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          setPage({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as PageData);
        } else {
          setPage(null);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading || productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pt-20">
      <SEO title={page.title} />

      {page.sections.map((section) => {
        if (section.type === 'hero') {
          return (
            <section key={section.id} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
              {section.image && (
                <img 
                  src={section.image} 
                  alt={section.title || page.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div 
                className="absolute inset-0" 
                style={{ 
                  backgroundColor: section.overlayColor || '#000000', 
                  opacity: (section.overlayOpacity || 40) / 100 
                }}
              />
              <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
                {section.title && (
                  <h1 className="text-5xl lg:text-7xl font-black text-white font-headline leading-tight mb-6 tracking-tight">
                    {section.title}
                  </h1>
                )}
                {section.subtitle && (
                  <p className="text-xl text-white/90 font-medium leading-relaxed">
                    {section.subtitle}
                  </p>
                )}
              </div>
            </section>
          );
        }

        if (section.type === 'product_slider') {
          const filteredProducts = section.category && section.category !== 'all'
            ? products.filter(p => p.category === section.category || p.theme === section.category)
            : products;

          if (filteredProducts.length === 0) return null;

          return (
            <div key={section.id} className="bg-[#faf9f6]">
              <ProductSlider 
                products={filteredProducts} 
                title={section.title || "Featured Products"} 
              />
            </div>
          );
        }

        if (section.type === 'html') {
          return (
            <section key={section.id} className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-8">
                <div dangerouslySetInnerHTML={{ __html: section.content || '' }} />
              </div>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}
