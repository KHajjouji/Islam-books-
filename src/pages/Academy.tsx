import { Link } from 'react-router-dom';
import { Sparkles, PlayCircle, BookOpen, Users, ArrowRight, Heart, Loader2, Star, ShieldCheck, Zap, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ProductCarousel from '../components/ProductCarousel';
import { useProducts } from '../hooks/useProducts';

export default function Academy() {
  const { products, loading } = useProducts();
  const academyProducts = products.filter(p => p.category === 'academy');

  return (
    <>
      <SEO 
        title="Interactive Islamic Learning for Kids Beyond the Book | Noor & Nurture"
        description="Our academy is designed to extend the learning journey beyond the book with guided content, audio, and interactive learning experiences."
      />
      
      {/* Header */}
      <div className="bg-surface-low py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Digital Learning Ecosystem</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-[1.1]">
            Interactive Islamic Learning <br className="hidden md:block" /> 
            <span className="text-accent-dark">Beyond the Book</span>
          </h1>
          <p className="text-lg md:text-2xl text-on-surface-variant font-medium leading-relaxed max-w-3xl mx-auto mb-12">
            Our academy extends the learning journey beyond the page. It brings together guided content, family-friendly structure, and interactive experiences to help Muslim children grow in understanding, confidence, and love for Islam.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Start Learning Now
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-primary border-2 border-primary rounded-full font-bold text-lg hover:bg-primary/5 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Academy Products Carousel */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-24">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
              <p className="text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest">Fetching Academy Content...</p>
            </div>
          ) : (
            <ProductCarousel products={academyProducts} title="Academy Subscriptions & Packs" />
          )}
        </div>
      </section>

      {/* What It Is */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
                <Zap className="h-3 w-3 text-accent-dark" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-dark">The Vision</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-tight">
                Where Books, Audio, and Guided Learning Converge
              </h2>
              <div className="space-y-6 text-xl text-on-surface-variant font-medium leading-relaxed">
                <p>
                  Many families are looking for more than standalone books. They want support, structure, and continuity. They want children to read, listen, interact, and remember.
                </p>
                <p>
                  Our academy is built as a connected experience for families looking for online Islamic classes for kids, interactive learning, and guided faith-based learning at home.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-primary">Guided Content</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-primary">Interactive Audio</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-primary rounded-[3rem] p-4 shadow-2xl shadow-primary/20 relative group cursor-pointer">
                <div className="aspect-video rounded-[2.5rem] overflow-hidden relative">
                  <img 
                    src="https://picsum.photos/seed/academy/1200/800" 
                    alt="Academy Preview" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <PlayCircle className="h-12 w-12 text-secondary ml-1" />
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full -z-10 blur-2xl opacity-50"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-light rounded-full -z-10 blur-2xl opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Helps */}
      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5">
          <Sparkles className="w-96 h-96" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
              <Star className="h-3 w-3 text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">The Experience</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-6 tracking-tight">
              A More Engaging Way to <br /> Learn Islam at Home
            </h2>
            <p className="text-xl text-white/70 font-medium">
              The academy is designed to support your family's unique journey with:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Consistent Islamic learning", icon: BookOpen, desc: "Structured pathways that build knowledge week by week." },
              { title: "Audio-supported stories", icon: PlayCircle, desc: "Immersive audio experiences that bring our books to life." },
              { title: "Interactive activities", icon: Sparkles, desc: "Gamified learning that keeps children excited and engaged." },
              { title: "Child-friendly progression", icon: ArrowRight, desc: "Clear milestones that celebrate every step of growth." },
              { title: "Parent-guided pathways", icon: Users, desc: "Resources and tips for parents to lead with confidence." },
              { title: "Deeper connections", icon: Heart, desc: "Bridging the gap between theory and daily practice." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <item.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-headline font-extrabold mb-4">{item.title}</h3>
                <p className="text-white/60 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-32 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-8">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">For Every Family</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-tight">
            Designed for Muslim Families Who <br className="hidden md:block" /> Want More Than Passive Content
          </h2>
          <p className="text-xl text-on-surface-variant font-medium mb-12 max-w-3xl mx-auto">
            This is for parents who want Islamic learning to be meaningful, modern, and practical for children growing up in the West.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Structured but not rigid",
              "Meaningful but not overwhelming",
              "Modern but still rooted",
              "Practical for daily life",
              "Fun and engaging"
            ].map((item, i) => (
              <div key={i} className="px-8 py-4 bg-surface text-primary font-bold rounded-full shadow-lg shadow-primary/5 border border-outline-variant/10 hover:scale-105 transition-transform cursor-default">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-surface-low text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-primary/10 border border-outline-variant/10">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight">
              Ready to Explore the Academy?
            </h2>
            <p className="text-xl text-on-surface-variant font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover a more connected way to support your child's Islamic learning journey through stories, guidance, and interactive experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/shop" className="w-full sm:w-auto inline-flex justify-center items-center px-10 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all text-lg shadow-xl shadow-primary/20 hover:scale-105">
                Join the Academy <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
              <div className="flex items-center gap-3 text-primary font-bold">
                <ShieldCheck className="h-6 w-6" />
                <span>30-Day Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
