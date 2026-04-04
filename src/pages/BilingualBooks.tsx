import { Link } from 'react-router-dom';
import { Globe, BookOpen, Heart, ArrowRight, Languages, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

export default function BilingualBooks() {
  return (
    <>
      <SEO 
        title="Bilingual Islamic Books for Kids: Faith and Language Together | Noor & Nurture"
        description="Explore bilingual Islamic books that help children learn faith and language together, designed for Muslim families living between languages and cultures."
      />
      
      {/* Header */}
      <div className="bg-surface-low py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
          <Globe className="w-64 h-64 text-primary" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-8">
            <Languages className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Bilingual Learning</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-[1.1]">
            Faith and Language <br className="hidden md:block" />
            <span className="text-accent-dark">Together in Harmony</span>
          </h1>
          <p className="text-lg md:text-2xl text-on-surface-variant font-medium leading-relaxed max-w-3xl mx-auto mb-12">
            Explore bilingual Islamic books that help children learn faith and language together. Designed for Muslim families who want to support both Islamic understanding and heritage languages.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop" className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Shop Bilingual Books
            </Link>
            <Link to="/academy" className="w-full sm:w-auto px-10 py-5 bg-white text-primary border-2 border-primary/10 rounded-full font-bold text-lg hover:bg-primary/5 transition-colors">
              View Curriculum
            </Link>
          </div>
        </div>
      </div>

      {/* Why Bilingual */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
                <Sparkles className="h-3 w-3 text-accent-dark" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-dark">Dual Impact</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-tight">
                Faith Learning and Language Learning in One Experience
              </h2>
              <div className="space-y-6 text-xl text-on-surface-variant font-medium leading-relaxed">
                <p>
                  For many Muslim families, language is part of identity, heritage, and connection. Bilingual books help children engage with Islam while also becoming familiar with key vocabulary, expressions, and concepts across languages.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary rounded-[3rem] p-12 flex flex-col items-center justify-center text-center aspect-square shadow-2xl shadow-primary/20 group hover:scale-105 transition-transform">
                <span className="text-4xl md:text-5xl font-headline font-extrabold text-white mb-4">English</span>
                <span className="text-xl text-white/70 font-medium tracking-widest uppercase">Faith</span>
              </div>
              <div className="bg-accent rounded-[3rem] p-12 flex flex-col items-center justify-center text-center aspect-square shadow-2xl shadow-accent/20 mt-12 group hover:scale-105 transition-transform">
                <span className="text-4xl md:text-5xl font-headline font-extrabold text-secondary mb-4" dir="rtl">عربي</span>
                <span className="text-xl text-secondary/70 font-medium tracking-widest uppercase">إيمان</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-8 tracking-tight">
              Made for Muslim Families Living <br /> Between Languages and Cultures
            </h2>
            <p className="text-xl text-white/70 font-medium max-w-2xl mx-auto">
              These resources are especially valuable for families who:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              "Speak one language at home and another outside",
              "Want children to stay connected to Arabic",
              "Want more meaning from bilingual reading",
              "Want Islamic vocabulary to feel familiar and usable"
            ].map((item, i) => (
              <div key={i} className="bg-white/10 p-10 rounded-[2.5rem] flex items-start border border-white/10 hover:bg-white/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mr-6 flex-shrink-0">
                  <Heart className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-xl font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-background text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface p-12 md:p-24 rounded-[4rem] shadow-2xl shadow-primary/5 border border-outline-variant/10">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight">
              Discover Bilingual Islamic <br /> Books for Children
            </h2>
            <p className="text-xl text-on-surface-variant font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Help your child grow in faith, confidence, and language through books designed for Muslim family life.
            </p>
            <Link to="/shop" className="inline-flex justify-center items-center px-10 py-5 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all text-lg shadow-xl shadow-primary/20">
              Shop Bilingual Books <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
