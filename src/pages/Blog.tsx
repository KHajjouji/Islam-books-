import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Sparkles, Zap, Mail, Loader2 } from 'lucide-react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import SEO from '../components/SEO';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  createdAt: any;
}

export default function Blog() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, 'blog_posts'),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setArticles(postsData);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article key={article.id} className="bg-surface rounded-[3rem] overflow-hidden border border-outline-variant/10 flex flex-col h-full group hover:shadow-2xl hover:shadow-primary/5 transition-all hover:-translate-y-2">
                  <div className="h-64 bg-primary/5 relative overflow-hidden">
                    {article.image ? (
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        referrerPolicy="no-referrer" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary/20">
                        <BookOpen className="h-16 w-16" />
                      </div>
                    )}
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <h3 className="text-2xl font-headline font-extrabold text-primary mb-6 group-hover:text-accent-dark transition-colors leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-on-surface-variant mb-8 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-8 border-t border-outline-variant/10">
                      <Link to={`/blog/${article.slug}`} className="text-primary font-bold flex items-center hover:text-accent-dark transition-colors group/link">
                        Read Article <ArrowRight className="ml-3 h-5 w-5 group-hover/link:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
              {articles.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-on-surface-variant font-medium text-lg">No articles published yet. Check back soon!</p>
                </div>
              )}
            </div>
          )}
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
