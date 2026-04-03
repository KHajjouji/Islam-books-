import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function Blog() {
  const articles = [
    {
      title: "Best Islamic Children's Books for Ages 3–5",
      category: "Reading Guides",
      date: "March 15, 2026"
    },
    {
      title: "Quran Stories for Kids: What to Read First",
      category: "Quran",
      date: "March 10, 2026"
    },
    {
      title: "How to Make Ramadan Meaningful for Young Children",
      category: "Ramadan",
      date: "March 5, 2026"
    },
    {
      title: "Stories of the Prophets for Kids: A Parent's Reading Guide",
      category: "Prophets",
      date: "February 28, 2026"
    },
    {
      title: "Islamic Bedtime Stories That Help Build Daily Habits",
      category: "Bedtime",
      date: "February 20, 2026"
    },
    {
      title: "Bilingual Islamic Books for Muslim Families in the West",
      category: "Bilingual",
      date: "February 15, 2026"
    }
  ];

  return (
    <>
      <SEO 
        title="Resources for Muslim Families | NoorKids Blog"
        description="Guides, ideas, and reading support for Muslim parents raising children with faith, stories, and learning."
      />
      
      {/* Header */}
      <div className="bg-noor-light-green py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-12 w-12 text-noor-green mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-noor-dark mb-6 text-gradient">
            Resources for Muslim Families Raising Children with Faith, Stories, and Learning
          </h1>
          <p className="text-lg md:text-xl text-noor-dark/70 leading-relaxed">
            Our resource hub is designed for parents, educators, and caregivers looking for thoughtful support around Islamic books, story-based learning, Ramadan, family routines, Quran stories, Prophet stories, and interactive learning for Muslim kids.
          </p>
        </div>
      </div>

      {/* Blog Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-noor-dark mb-6">
              Guides, Ideas, and Reading Support for Muslim Parents
            </h2>
            <p className="text-lg text-noor-dark/70">
              Here you will find practical articles to help you navigate your child's Islamic learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <article key={i} className="bg-noor-cream rounded-2xl overflow-hidden border border-noor-light-green flex flex-col h-full group hover:shadow-md transition-shadow">
                <div className="h-48 bg-noor-light-green/50 relative overflow-hidden">
                  <img src={`https://picsum.photos/seed/blog${i}/600/400`} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-noor-green uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-sm text-noor-dark/60 mb-2">{article.date}</span>
                  <h3 className="text-xl font-bold text-noor-dark mb-4 group-hover:text-noor-green transition-colors">
                    {article.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-noor-light-green/50">
                    <Link to="#" className="text-noor-green font-medium flex items-center hover:text-noor-green">
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-24 bg-noor-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Get Free Resources Delivered to Your Inbox
          </h2>
          <p className="text-lg text-noor-light-green mb-10">
            Join our newsletter for weekly reading guides, free printables, and early access to new books.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-6 py-4 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-noor-yellow text-noor-dark text-lg"
              required
            />
            <button type="submit" className="px-8 py-4 bg-noor-yellow text-noor-dark font-bold rounded-full hover:bg-noor-yellow/80 transition-colors text-lg whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
