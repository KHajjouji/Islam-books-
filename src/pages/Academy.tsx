import { Link } from 'react-router-dom';
import { Sparkles, PlayCircle, BookOpen, Users, ArrowRight, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import ProductCarousel from '../components/ProductCarousel';
import { products } from '../data/products';

export default function Academy() {
  const academyProducts = products.filter(p => p.category === 'academy');

  return (
    <>
      <SEO 
        title="Interactive Islamic Learning for Kids Beyond the Book | NoorKids"
        description="Our academy is designed to extend the learning journey beyond the book with guided content, audio, and interactive learning experiences."
      />
      
      {/* Header */}
      <div className="bg-indigo-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-12 w-12 text-indigo-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-indigo-950 mb-6">
            Interactive Islamic Learning for Kids Beyond the Book
          </h1>
          <p className="text-lg md:text-xl text-indigo-900/80 leading-relaxed">
            Our academy is designed to extend the learning journey beyond the book. It brings together guided content, family-friendly structure, and interactive learning experiences to help Muslim children grow in understanding, confidence, and love for Islam.
          </p>
        </div>
      </div>

      {/* Academy Products Carousel */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCarousel products={academyProducts} title="Academy Subscriptions & Packs" />
        </div>
      </section>

      {/* What It Is */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
                Where Islamic Books, Audio, and Guided Learning Come Together
              </h2>
              <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
                <p>
                  Many families are looking for more than standalone books. They want support, structure, and continuity. They want children to read, listen, interact, and remember.
                </p>
                <p>
                  That is why our academy is built as a connected experience for families looking for online Islamic classes for kids, interactive Islamic learning, guided faith-based learning at home, story-centered Islamic education, and flexible resources for family life.
                </p>
              </div>
            </div>
            <div className="bg-indigo-100 rounded-3xl p-8 flex items-center justify-center aspect-video relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-900/10"></div>
              <PlayCircle className="h-20 w-20 text-indigo-600 relative z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Helps */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6">
              A More Engaging Way to Learn Islam at Home
            </h2>
            <p className="text-lg text-indigo-200">
              The academy is designed to support:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Consistent Islamic learning", icon: BookOpen },
              { title: "Audio-supported story experiences", icon: PlayCircle },
              { title: "Interactive activities", icon: Sparkles },
              { title: "Child-friendly progression", icon: ArrowRight },
              { title: "Parent-guided pathways", icon: Users },
              { title: "Deeper connection between books and practice", icon: Heart }
            ].map((item, i) => (
              <div key={i} className="bg-indigo-800/50 p-8 rounded-2xl border border-indigo-700">
                <item.icon className="h-8 w-8 text-indigo-300 mb-4" />
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
            Designed for Muslim Families Who Want More Than Passive Content
          </h2>
          <p className="text-lg text-stone-600 mb-10">
            This is for parents who want Islamic learning to be:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Structured but not rigid",
              "Meaningful but not overwhelming",
              "Modern but still rooted",
              "Practical for children growing up in the West"
            ].map((item, i) => (
              <span key={i} className="px-6 py-3 bg-white text-indigo-900 font-medium rounded-full shadow-sm border border-stone-200">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">
            Explore the Academy
          </h2>
          <p className="text-lg text-stone-600 mb-10">
            Discover a more connected way to support your child's Islamic learning journey through stories, guidance, and interactive experiences.
          </p>
          <Link to="#" className="inline-flex justify-center items-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors text-lg">
            Join the Waitlist <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
