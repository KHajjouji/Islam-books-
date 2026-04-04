import { Link } from 'react-router-dom';
import { BookOpen, Star, Heart, Sparkles, ArrowRight, Loader2, CheckCircle2, PlayCircle, Bell } from 'lucide-react';
import SEO from '../components/SEO';
import ProductCarousel from '../components/ProductCarousel';
import { useProducts } from '../hooks/useProducts';

export default function Home() {
  const { products, loading } = useProducts();
  const featuredBooks = products.filter(p => p.category === 'book').slice(0, 5);

  return (
    <>
      <SEO 
        title="Islamic Children's Books & Interactive Learning for Muslim Kids | Noor & Nurture"
        description="Discover Islamic children's books, Quran stories for kids, Prophet stories, Ramadan books, and interactive Islamic learning for Muslim families in the West."
      />
      
      {/* Hero Section */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 mb-8 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest">The Nurturing Sanctuary</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-extrabold leading-[1.1] mb-8 tracking-tight">
                Nurturing the <span className="text-accent">Next Generation</span> of the Ummah
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 font-medium leading-relaxed">
                Premium Islamic learning ecosystem combining beautifully illustrated books with an interactive digital academy. Designed for Muslim families in the West.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop" className="inline-flex justify-center items-center px-10 py-4 bg-accent text-secondary font-bold rounded-full hover:scale-105 transition-all text-lg shadow-xl shadow-black/10">
                  Shop All Products
                </Link>
                <Link to="/academy" className="inline-flex justify-center items-center px-10 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 border border-white/20 transition-all text-lg backdrop-blur-sm">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Explore Academy
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-10 h-10 rounded-full border-2 border-primary object-cover" />
                  ))}
                </div>
                <p className="text-sm font-bold text-white/70">Joined by 5,000+ Muslim families</p>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="relative z-10 bg-surface-low/10 backdrop-blur-sm p-4 rounded-[3rem] border border-white/10 shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/noorkids-hero/800/1000" 
                  alt="Hakim and Hana characters" 
                  className="rounded-[2.5rem] shadow-2xl w-full object-cover aspect-[4/5]" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div className="absolute bottom-12 -left-12 bg-accent p-4 rounded-2xl shadow-xl animate-pulse">
                <Star className="h-8 w-8 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 tracking-tight">
              The Illuminated Path to Learning
            </h2>
            <p className="text-lg text-on-surface-variant font-medium">
              We combine traditional values with modern learning techniques to create a holistic ecosystem for your child's spiritual growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Faith-Centered",
                text: "Every story and activity is rooted in authentic Islamic teachings, helping children build a strong connection with Allah.",
                icon: Heart,
                color: "bg-primary/5 text-primary"
              },
              {
                title: "Modern & Engaging",
                text: "High-quality illustrations and interactive digital content that compete with mainstream media while keeping values at the core.",
                icon: Sparkles,
                color: "bg-accent/10 text-secondary"
              },
              {
                title: "Family First",
                text: "Designed to create meaningful moments between parents and children, fostering discussion and shared growth.",
                icon: Star,
                color: "bg-surface-low text-primary"
              }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-surface p-10 rounded-[2.5rem] border border-outline-variant/20 shadow-sm hover:shadow-md transition-all group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${pillar.color} group-hover:scale-110 transition-transform`}>
                  <pillar.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-headline font-extrabold text-primary mb-4">{pillar.title}</h3>
                <p className="text-on-surface-variant font-medium leading-relaxed">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pathways */}
      <section className="py-24 bg-surface-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-4 tracking-tight">
                Explore the Sanctuary
              </h2>
              <p className="text-lg text-on-surface-variant font-medium">
                Choose the learning journey that best fits your family's current needs.
              </p>
            </div>
            <Link to="/shop" className="px-8 py-4 bg-primary text-white rounded-full font-bold text-sm shadow-lg shadow-primary/10 hover:scale-105 transition-all flex items-center gap-2">
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Book Shop",
                text: "Physical books that children can touch, feel, and treasure forever.",
                link: "/shop",
                icon: BookOpen,
                color: "bg-primary text-white"
              },
              {
                title: "Quran Stories",
                text: "Age-appropriate stories from the Holy Quran for young hearts.",
                link: "/quran-stories-for-kids",
                icon: Sparkles,
                color: "bg-accent text-secondary"
              },
              {
                title: "Prophet Stories",
                text: "Learning courage and kindness from the lives of the Prophets.",
                link: "/stories-of-the-prophets-for-kids",
                icon: Star,
                color: "bg-surface text-primary"
              },
              {
                title: "Digital Academy",
                text: "Interactive classes and activities to deepen the learning experience.",
                link: "/academy",
                icon: PlayCircle,
                color: "bg-secondary text-white"
              }
            ].map((card, idx) => (
              <Link key={idx} to={card.link} className="group block h-full">
                <div className="bg-surface rounded-[2rem] p-8 shadow-sm card-hover border border-outline-variant/20 h-full flex flex-col">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${card.color} shadow-lg`}>
                    <card.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-headline font-extrabold text-primary mb-3 group-hover:text-secondary transition-colors">{card.title}</h3>
                  <p className="text-on-surface-variant text-sm font-medium flex-grow leading-relaxed">{card.text}</p>
                  <div className="mt-8 flex items-center text-primary font-bold text-xs uppercase tracking-widest">
                    Explore <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Carousel */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <ProductCarousel products={featuredBooks} title="Featured in the Shop" />
          )}
        </div>
      </section>

      {/* Interactive Learning / Academy */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-white rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-24 opacity-10">
              <Sparkles className="h-64 w-64" />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-8 tracking-tight leading-tight">
                  Interactive Learning <br />
                  <span className="text-accent">Beyond the Book</span>
                </h2>
                <p className="text-xl text-white/80 mb-12 font-medium leading-relaxed">
                  Our digital academy brings stories to life with guided pathways, audio-supported reading, and child-friendly activities.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {[
                    "Story-based learning journeys",
                    "Audio-supported reading",
                    "Child-friendly activities",
                    "Parent-guided moments"
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <span className="text-sm font-bold">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/academy" className="inline-flex justify-center items-center px-10 py-5 bg-accent text-secondary font-bold rounded-full hover:scale-105 transition-all text-lg shadow-xl shadow-black/10">
                  Join the Academy
                </Link>
              </div>
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/academy-preview/800/600" 
                  alt="Academy Interface" 
                  className="rounded-3xl shadow-2xl w-full object-cover border-8 border-white/10" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Lead Magnet */}
      <section className="py-32 bg-surface-low">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center text-secondary mx-auto mb-10 shadow-lg rotate-3">
            <Bell className="h-10 w-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 tracking-tight">
            Join the Nurturing Community
          </h2>
          <p className="text-xl text-on-surface-variant font-medium mb-12 max-w-2xl mx-auto">
            Get a free Islamic story resource and stay updated with new releases, seasonal activities, and parenting tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-8 py-5 rounded-full border border-outline-variant/30 bg-surface focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-lg font-medium transition-all"
              required
            />
            <button type="submit" className="px-10 py-5 bg-primary text-white font-bold rounded-full hover:scale-[1.02] active:scale-95 transition-all text-lg whitespace-nowrap shadow-xl shadow-primary/10">
              Get Free Resource
            </button>
          </form>
          <p className="mt-6 text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest">No spam, just pure nurturing content.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-background text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-tight">
            Start Your Family's <br />
            <span className="text-accent">Illuminated Path</span> Today
          </h2>
          <p className="text-xl text-on-surface-variant font-medium mb-12">
            Build a home library that helps your child love Islam through stories, books, and interactive learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/shop" className="inline-flex justify-center items-center px-12 py-5 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all text-lg shadow-2xl shadow-primary/20">
              Shop All Products
            </Link>
            <Link to="/academy" className="inline-flex justify-center items-center px-12 py-5 bg-white text-primary font-bold rounded-full hover:bg-surface-low border border-outline-variant/30 transition-all text-lg shadow-xl shadow-black/5">
              Join the Academy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
