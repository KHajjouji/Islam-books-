import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Sparkles, Zap, Mail } from 'lucide-react';
import SEO from '../components/SEO';

export default function Blog() {
  const articles = [
    {
      title: "Best Islamic Children's Books for Ages 3–5",
      category: "Reading Guides",
      date: "March 15, 2026",
      image: "https://picsum.photos/seed/blog1/800/600"
    },
    {
      title: "Quran Stories for Kids: What to Read First",
      category: "Quran",
      date: "March 10, 2026",
      image: "https://picsum.photos/seed/blog2/800/600"
    },
    {
      title: "How to Make Ramadan Meaningful for Young Children",
      category: "Ramadan",
      date: "March 5, 2026",
      image: "https://picsum.photos/seed/blog3/800/600"
    },
    {
      title: "Stories of the Prophets for Kids: A Parent's Guide",
      category: "Prophets",
      date: "February 28, 2026",
      image: "https://picsum.photos/seed/blog4/800/600"
    },
    {
      title: "Islamic Bedtime Stories That Build Daily Habits",
      category: "Bedtime",
      date: "February 20, 2026",
      image: "https://picsum.photos/seed/blog5/800/600"
    },
    {
      title: "Bilingual Islamic Books for Families in the West",
      category: "Bilingual",
      date: "February 15, 2026",
      image: "https://picsum.photos/seed/blog6/800/600"
    }
  ];

  return (
    <>
      <SEO 
        title="Resources for Muslim Families | Noor & Nurture Blog"
        description="Guides, ideas, and reading support for Muslim parents raising children with faith, stories, and learning."
      />
      
      {/* Header */}
      <div className="bg-surface-low py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
          <BookOpen className="w-64 h-64 text-primary" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Resource Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-[1.1]">
            Resources for <br className="hidden md:block" />
            <span className="text-accent-dark">Muslim Families</span>
          </h1>
          <p className="text-lg md:text-2xl text-on-surface-variant font-medium leading-relaxed max-w-3xl mx-auto mb-12">
            Thoughtful support around Islamic books, story-based learning, Ramadan, family routines, and interactive learning for Muslim kids.
          </p>
        </div>
      </div>

      {/* Blog Feed */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
              <Zap className="h-4 w-4 text-accent-dark" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-dark">Latest Articles</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 tracking-tight">
              Guides, Ideas, and Reading Support
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <article key={i} className="bg-surface rounded-[3rem] overflow-hidden border border-outline-variant/10 flex flex-col h-full group hover:shadow-2xl hover:shadow-primary/5 transition-all hover:-translate-y-2">
                <div className="h-64 bg-primary/5 relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest shadow-lg">
                    {article.category}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <span className="text-sm font-bold text-primary/40 mb-4 tracking-widest uppercase">{article.date}</span>
                  <h3 className="text-2xl font-headline font-extrabold text-primary mb-6 group-hover:text-accent-dark transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <div className="mt-auto pt-8 border-t border-outline-variant/10">
                    <Link to="#" className="text-primary font-bold flex items-center hover:text-accent-dark transition-colors group/link">
                      Read Article <ArrowRight className="ml-3 h-5 w-5 group-hover/link:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-32 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-accent/20">
            <Mail className="h-10 w-10 text-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-8 tracking-tight">
            Get Free Resources <br /> Delivered to Your Inbox
          </h2>
          <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Join our newsletter for weekly reading guides, free printables, and early access to new books.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-8 py-5 rounded-full border-2 border-white/10 bg-white/5 focus:bg-white/10 focus:border-accent outline-none text-white text-lg transition-all placeholder:text-white/30"
              required
            />
            <button type="submit" className="px-10 py-5 bg-accent text-secondary font-bold rounded-full hover:scale-105 transition-all text-lg shadow-xl shadow-accent/20 whitespace-nowrap">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
