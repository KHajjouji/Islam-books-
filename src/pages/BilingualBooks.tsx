import { Link } from 'react-router-dom';
import { Globe, BookOpen, Heart, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function BilingualBooks() {
  return (
    <>
      <SEO 
        title="Bilingual Islamic Books for Kids: Faith and Language Together | NoorKids"
        description="Explore bilingual Islamic books that help children learn faith and language together, designed for Muslim families living between languages and cultures."
      />
      
      {/* Header */}
      <div className="bg-teal-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="h-12 w-12 text-teal-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
            Bilingual Islamic Books for Kids: Faith and Language Together
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
            Explore bilingual Islamic books that help children learn faith and language together. These resources are designed for Muslim families who want to support both Islamic understanding and connection to Arabic or other heritage languages.
          </p>
        </div>
      </div>

      {/* Why Bilingual */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
                Faith Learning and Language Learning in One Experience
              </h2>
              <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
                <p>
                  For many Muslim families, language is part of identity, heritage, and connection. Bilingual books help children engage with Islam while also becoming familiar with key vocabulary, expressions, and concepts across languages.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-teal-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center aspect-square">
                <span className="text-4xl font-serif font-bold text-teal-800 mb-2">English</span>
                <span className="text-teal-600">Faith</span>
              </div>
              <div className="bg-amber-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center aspect-square mt-8">
                <span className="text-4xl font-serif font-bold text-amber-800 mb-2">عربي</span>
                <span className="text-amber-600">إيمان</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Made for Muslim Families Living Between Languages and Cultures
            </h2>
            <p className="text-lg text-stone-300">
              These resources are especially valuable for families who:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Speak one language at home and another outside",
              "Want children to stay connected to Arabic",
              "Want more meaning from bilingual reading",
              "Want Islamic vocabulary to feel familiar and usable"
            ].map((item, i) => (
              <div key={i} className="bg-stone-800 p-6 rounded-xl flex items-start border border-stone-700">
                <Heart className="h-6 w-6 text-teal-400 mr-4 flex-shrink-0 mt-0.5" />
                <span className="text-lg text-stone-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">
            Discover Bilingual Islamic Books for Children
          </h2>
          <p className="text-lg text-stone-600 mb-10">
            Help your child grow in faith, confidence, and language through books designed for Muslim family life.
          </p>
          <Link to="/islamic-childrens-books" className="inline-flex justify-center items-center px-8 py-4 bg-teal-700 text-white font-bold rounded-full hover:bg-teal-800 transition-colors text-lg">
            Shop Bilingual Books <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
