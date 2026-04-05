import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  BookOpen, 
  GraduationCap, 
  Star, 
  ShieldCheck, 
  Palette, 
  Globe, 
  MousePointer2, 
  ArrowRight, 
  ShoppingCart, 
  Zap, 
  Volume2, 
  Quote,
  PlayCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { useProducts } from '../hooks/useProducts';
import ProductSlider from '../components/ProductSlider';
import SEO from '../components/SEO';

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

export default function Home() {
  const { products, loading } = useProducts();
  const [homePageData, setHomePageData] = useState<PageData | null>(null);
  const [homeLoading, setHomeLoading] = useState(true);

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const docRef = doc(db, 'site_settings', 'homepage');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHomePageData(docSnap.data() as PageData);
        }
      } catch (error) {
        console.error("Error fetching home page data:", error);
      } finally {
        setHomeLoading(false);
      }
    };
    fetchHomePage();
  }, []);
  
  // Simulate new arrivals and on sale for the sliders
  const newArrivals = products.slice(0, 6).map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    image: p.image
  }));

  const onSaleBooks = products.slice(2, 8).map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    salePrice: Math.round(p.price * 0.8), // 20% off simulation
    image: p.image
  }));

  if (homeLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const hasCustomHero = homePageData?.sections?.some(s => s.type === 'hero');

  return (
    <div className="pt-20">
      <SEO 
        title={homePageData?.title || "Home"} 
        description="Premium Islamic children's books and interactive learning designed to inspire love for Allah and the Prophet (SAW) in every child's heart."
      />

      {/* Render Custom Sections First */}
      {homePageData?.sections?.map((section) => {
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
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full text-primary font-bold text-xs mb-8 uppercase tracking-widest">
                    <Star className="h-4 w-4 fill-primary" />
                    <span>Nurturing the Next Generation</span>
                  </div>
                  
                  <h1 className="text-6xl lg:text-7xl font-black text-primary font-headline leading-[1.1] mb-8 tracking-tight">
                    {section.title || "Where Faith Meets Wonder."}
                  </h1>
                  
                  <p className="text-xl text-on-surface-variant leading-relaxed mb-12 max-w-xl font-medium">
                    {section.subtitle || "Premium Islamic children's books and interactive learning designed to inspire love for Allah and the Prophet (SAW) in every child's heart."}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Link 
                      to="/shop" 
                      className="bg-primary text-on-primary px-10 py-5 rounded-full font-headline font-black text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Shop the Books
                    </Link>
                    <Link 
                      to="/academy" 
                      className="bg-white text-primary border-2 border-primary/10 px-10 py-5 rounded-full font-headline font-black text-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-3"
                    >
                      <PlayCircle className="h-5 w-5" />
                      Explore Academy
                    </Link>
                  </div>

                  <div className="mt-12 flex items-center gap-6">
                    <div className="flex -space-x-4">
                      {[1, 2, 3, 4].map((i) => (
                        <img 
                          key={i}
                          src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                          alt="User" 
                          className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                        />
                      ))}
                    </div>
                    <div>
                      <div className="flex text-secondary mb-1">
                        {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                      </div>
                      <p className="text-sm font-bold text-primary">Trusted by 10,000+ Muslim Parents</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                    <img 
                      src={section.image || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1000&fit=crop"} 
                      alt={section.title || "Featured Book"} 
                      className="w-full aspect-[4/5] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 border border-primary/5"
                  >
                    <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">New Release</p>
                      <p className="text-lg font-black text-primary">Must Read</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 border border-primary/5"
                  >
                    <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center text-on-primary-container">
                      <Volume2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Audio Books</p>
                      <p className="text-lg font-black text-primary">Prophet Stories</p>
                    </div>
                  </motion.div>
                </motion.div>
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

      {/* Default Hero Section - Only show if no custom hero is added */}
      {!hasCustomHero && (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#faf9f6]">
          {/* Background Patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full text-primary font-bold text-xs mb-8 uppercase tracking-widest">
                <Star className="h-4 w-4 fill-primary" />
                <span>Nurturing the Next Generation</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-black text-primary font-headline leading-[1.1] mb-8 tracking-tight">
                Where Faith Meets <span className="text-secondary italic">Wonder.</span>
              </h1>
              
              <p className="text-xl text-on-surface-variant leading-relaxed mb-12 max-w-xl font-medium">
                Premium Islamic children's books and interactive learning designed to inspire love for Allah and the Prophet (SAW) in every child's heart.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  to="/shop" 
                  className="bg-primary text-on-primary px-10 py-5 rounded-full font-headline font-black text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Shop the Books
                </Link>
                <Link 
                  to="/academy" 
                  className="bg-white text-primary border-2 border-primary/10 px-10 py-5 rounded-full font-headline font-black text-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-3"
                >
                  <PlayCircle className="h-5 w-5" />
                  Explore Academy
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                      alt="User" 
                      className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex text-secondary mb-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-sm font-bold text-primary">Trusted by 10,000+ Muslim Parents</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1000&fit=crop" 
                  alt="Hakim and Hana 3D Illustration" 
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 border border-primary/5"
              >
                <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">New Release</p>
                  <p className="text-lg font-black text-primary">Ramadan Quest</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 border border-primary/5"
              >
                <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center text-on-primary-container">
                  <Volume2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Audio Books</p>
                  <p className="text-lg font-black text-primary">Prophet Stories</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Trust Pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Authentic Content", desc: "Verified by scholars for accuracy and age-appropriateness." },
              { icon: Palette, title: "Premium Design", desc: "Breathtaking 3D illustrations that captivate young minds." },
              { icon: Globe, title: "Practical for West", desc: "Stories that resonate with children growing up in the West." },
              { icon: MousePointer2, title: "Interactive", desc: "Beyond books—interactive learning through our Academy." }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2.5rem] bg-[#faf9f6] border border-primary/5 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-primary text-on-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/10">
                  <pillar.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-primary mb-3 font-headline">{pillar.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed font-medium">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Slider */}
      {!loading && newArrivals.length > 0 && (
        <ProductSlider 
          products={newArrivals} 
          title="New Arrivals" 
          subtitle="Discover our latest additions to inspire young minds."
        />
      )}

      {/* Featured Themes (Categories) */}
      <section className="py-24 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-black text-primary font-headline mb-4 tracking-tight">Book Themes</h2>
              <p className="text-on-surface-variant font-medium">Explore our collection by themes and topics.</p>
            </div>
            <Link to="/shop" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all group">
              View All Books <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Quran Stories", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=500&fit=crop", path: "/shop?category=quran-stories" },
              { title: "Prophet Stories", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop", path: "/shop?category=prophet-stories" },
              { title: "Ramadan & Eid", img: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=400&h=500&fit=crop", path: "/shop?category=ramadan" },
              { title: "Bedtime Stories", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop", path: "/shop?category=bedtime" }
            ].map((cat, i) => (
              <Link 
                key={i}
                to={cat.path}
                className="group relative h-[450px] rounded-[3rem] overflow-hidden shadow-lg"
              >
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-black text-white font-headline leading-tight mb-4">{cat.title}</h3>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* On Sale Slider */}
      {!loading && onSaleBooks.length > 0 && (
        <div className="bg-[#faf9f6]">
          <ProductSlider 
            products={onSaleBooks} 
            title="Special Offers" 
            subtitle="Limited time deals on our most loved collections."
          />
        </div>
      )}

      {/* Academy Teaser */}
      <section className="py-24 bg-primary overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white font-bold text-xs mb-8 uppercase tracking-widest">
              <GraduationCap className="h-4 w-4" />
              <span>Interactive Learning</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-white font-headline leading-tight mb-8 tracking-tight">
              The Academy: <br />
              <span className="text-secondary italic">Beyond the Page.</span>
            </h2>
            <p className="text-xl text-white/80 leading-relaxed mb-10 font-medium">
              Turn storytime into a lifelong journey. Our digital academy offers interactive lessons, quizzes, and activities that bring our books to life.
            </p>
            
            <ul className="space-y-6 mb-12">
              {[
                "Interactive Quranic Arabic lessons",
                "Character building (Akhlaq) workshops",
                "Live storytelling sessions with authors",
                "Progress tracking for parents"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white font-bold">
                  <div className="w-6 h-6 bg-secondary text-on-secondary rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Link 
              to="/academy" 
              className="inline-flex bg-secondary text-on-secondary px-10 py-5 rounded-full font-headline font-black text-lg hover:scale-105 transition-transform shadow-xl shadow-secondary/20 items-center gap-3"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop" 
                alt="Academy Interface" 
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white text-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                  <PlayCircle className="h-10 w-10 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-primary font-headline mb-4 tracking-tight">Parent Stories</h2>
            <p className="text-on-surface-variant font-medium">Real experiences from families in our community.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", role: "Mother of 3, London", text: "Finally, books that my children can relate to. The quality of the illustrations is unlike anything I've seen in Islamic publishing." },
              { name: "Omar K.", role: "Father of 2, New York", text: "The Academy has transformed our weekends. My kids actually look forward to learning about the Prophets now." },
              { name: "Aisha R.", role: "Educator, Toronto", text: "A breath of fresh air. The language is accessible yet profound. A must-have for every Muslim home library." }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-primary/5 relative">
                <Quote className="absolute top-8 right-8 h-12 w-12 text-primary/5" />
                <div className="flex text-secondary mb-6">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-lg text-primary font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-primary">{t.name}</p>
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <div className="bg-secondary-container rounded-[4rem] p-16 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black text-on-secondary-container font-headline mb-6 tracking-tight">Join the Sanctuary</h2>
              <p className="text-on-secondary-container/80 font-medium mb-10 max-w-2xl mx-auto">
                Get weekly Islamic parenting tips, free activity sheets, and early access to new releases.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-8 py-5 rounded-full border-none focus:ring-2 focus:ring-primary text-primary font-medium"
                />
                <button className="bg-primary text-on-primary px-10 py-5 rounded-full font-headline font-black hover:scale-105 transition-transform shadow-lg">
                  Subscribe
                </button>
              </form>
              <p className="mt-6 text-xs text-on-secondary-container/60 font-bold uppercase tracking-widest">
                No spam, just love. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
