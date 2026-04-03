import { Link } from 'react-router-dom';
import { Moon, Star, Heart, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function RamadanBooks() {
  return (
    <>
      <SEO 
        title="Ramadan Books for Kids to Make the Month Meaningful | NoorKids"
        description="Find Ramadan books for kids that help children understand the meaning of the month through stories, routines, values, and joyful family moments."
      />
      
      {/* Header */}
      <div className="bg-indigo-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-10 right-10 opacity-20">
          <Moon className="h-48 w-48 text-amber-300" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Moon className="h-12 w-12 text-amber-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ramadan Books for Kids to Make the Month Meaningful and Memorable
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 leading-relaxed">
            Find Ramadan books for kids that help children understand the meaning of the month through stories, routines, values, and joyful family moments. These books are designed to support Muslim families who want Ramadan to feel memorable, educational, and spiritually meaningful for children.
          </p>
        </div>
      </div>

      {/* Why Ramadan Books */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
                Helping Children Experience Ramadan with Understanding and Joy
              </h2>
              <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
                <p>
                  Ramadan is a time of reflection, worship, gratitude, generosity, and family connection. Books help children understand these meanings in a way that fits their age and daily life.
                </p>
                <p>
                  Through Ramadan stories for kids, children can explore fasting, prayer, kindness, duas, community, Eid anticipation, and the beauty of the holy month.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/seed/ramadan1/400/500" alt="Ramadan book" className="rounded-xl shadow-lg w-full object-cover aspect-[4/5]" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/ramadan2/400/500" alt="Eid book" className="rounded-xl shadow-lg w-full object-cover aspect-[4/5] mt-8" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Family Moments */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
              Books for Bedtime, Family Reading, and Ramadan Routines
            </h2>
            <p className="text-lg text-stone-600">
              Our Ramadan books are ideal for:
            </p>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-amber-100">
            <ul className="space-y-4">
              {[
                "Bedtime during Ramadan",
                "Preparing children before the month begins",
                "Daily family reading",
                "Islamic school or home learning",
                "Introducing Ramadan traditions in a child-friendly way"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <Star className="h-6 w-6 text-amber-500 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-stone-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What These Books Cover */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
              Themes Children Can Understand and Remember
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "What Ramadan is",
              "Why Muslims fast",
              "What children can do in Ramadan",
              "Duas and good deeds",
              "Gratitude and generosity",
              "Family togetherness",
              "Preparing for Eid"
            ].map((item, i) => (
              <div key={i} className="bg-stone-50 p-6 rounded-xl text-center border border-stone-100 flex items-center justify-center min-h-[100px]">
                <span className="font-medium text-stone-800">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-stone-500 text-sm italic">
              Ramadan-related children's categories continue to show visible marketplace demand, which makes this both a meaningful and strategic content area for the site.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-indigo-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Explore Ramadan Stories and Books for Kids
          </h2>
          <p className="text-lg text-indigo-200 mb-10">
            Help your child enter Ramadan with knowledge, warmth, and positive memories through story-based learning.
          </p>
          <Link to="/islamic-childrens-books" className="inline-flex justify-center items-center px-8 py-4 bg-amber-500 text-amber-950 font-bold rounded-full hover:bg-amber-400 transition-colors text-lg">
            Shop Ramadan Books <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
