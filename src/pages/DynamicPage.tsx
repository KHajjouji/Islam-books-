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
            <section key={section.id} className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#faf9f6]">
              {/* Islamic Pattern Background */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l6 14 14 6-14 6-6 14-6-14L0 20l14-6z' fill='%23000' fill-rule='evenodd'/%3E%3C/svg%3E")`, 
                  backgroundSize: '40px 40px' 
                }}
              ></div>

              {/* Background Gradients */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
              </div>

              <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="animate-fade-in-left">
                  <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full text-primary font-bold text-xs mb-8 uppercase tracking-widest">
                    <span>Featured</span>
                  </div>
                  
                  <h1 className="text-6xl lg:text-7xl font-black text-primary font-headline leading-[1.1] mb-8 tracking-tight">
                    {section.title || page.title}
                  </h1>
                  
                  <p className="text-xl text-on-surface-variant leading-relaxed mb-12 max-w-xl font-medium">
                    {section.subtitle || "Discover our premium collection."}
                  </p>
                </div>

                <div className="relative animate-fade-in-up">
                  <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                    <img 
                      src={section.image || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1000&fit=crop"} 
                      alt={section.title || "Featured Book"} 
                      className="w-full aspect-[4/5] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                  </div>
                </div>
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
