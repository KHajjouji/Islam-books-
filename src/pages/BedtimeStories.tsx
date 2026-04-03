import { Link } from 'react-router-dom';
import { Moon, Star, Heart, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function BedtimeStories() {
  return (
    <>
      <SEO 
        title="Islamic Bedtime Stories for Peaceful Family Reading | NoorKids"
        description="Discover Islamic bedtime stories that bring calm, reflection, and faith-centered family connection into your child's evening routine."
      />
      
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Moon className="h-12 w-12 text-blue-300 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gradient">
            Islamic Bedtime Stories for Peaceful, Meaningful Family Reading
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            Discover Islamic bedtime stories that bring calm, reflection, and faith-centered family connection into your child's evening routine. These stories are designed to make bedtime meaningful, soothing, and rooted in Islamic values.
          </p>
        </div>
      </div>

      {/* Why Bedtime Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img src="https://picsum.photos/seed/bedtime/800/600" alt="Parent reading bedtime story" className="rounded-2xl shadow-xl w-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-serif font-bold text-noor-dark mb-6">
                A Gentle Way to End the Day with Faith and Family
              </h2>
              <div className="space-y-4 text-lg text-noor-dark/70 leading-relaxed">
                <p>
                  Bedtime is one of the most powerful moments for connection. It is when children are calm, close, and ready to listen. That makes it the perfect time for stories that nurture trust, gratitude, kindness, and remembrance of Allah.
                </p>
                <p>
                  Our Muslim bedtime stories for kids are created to support parents who want bedtime to become a consistent and positive Islamic routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Themes */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-noor-dark mb-6">
              Short Islamic Stories Children Can Understand and Love
            </h2>
            <p className="text-lg text-noor-dark/70">
              Bedtime stories can include:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Everyday Muslim values",
              "Duas and remembrance",
              "Family kindness",
              "Gratitude to Allah",
              "Gentle Quran-inspired themes",
              "Ramadan bedtime reading",
              "Comforting stories about character and faith"
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <Star className="h-8 w-8 text-blue-400 mb-4" />
                <span className="font-medium text-noor-dark/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Modern Family Life */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-noor-dark mb-6">
            Meaningful Bedtime Reading for Busy Muslim Families
          </h2>
          <p className="text-lg text-noor-dark/70 leading-relaxed">
            Not every family has time for long lessons. Bedtime stories give parents a simple and realistic way to make Islamic learning part of the day without pressure. A short story each night can build vocabulary, values, memory, and emotional connection over time.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Explore Islamic Bedtime Books and Story Collections
          </h2>
          <p className="text-lg text-slate-300 mb-10">
            Create a peaceful bedtime routine with stories that help your child feel calm, connected, and loved.
          </p>
          <Link to="/islamic-childrens-books" className="inline-flex justify-center items-center px-8 py-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors text-lg">
            Shop Bedtime Stories <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
