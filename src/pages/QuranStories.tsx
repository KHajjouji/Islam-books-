import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Heart, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function QuranStories() {
  return (
    <>
      <SEO 
        title="Quran Stories for Kids That Build Faith, Character, and Curiosity | NoorKids"
        description="Discover Quran stories for kids designed to help children connect with the message, values, and wisdom of the Quran in a simple and meaningful way."
      />
      
      {/* Header */}
      <div className="bg-amber-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-12 w-12 text-amber-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
            Quran Stories for Kids That Build Faith, Character, and Curiosity
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
            Discover Quran stories for kids designed to help children connect with the message, values, and wisdom of the Quran in a simple and meaningful way. These books support family reading, early Islamic learning, and story-based understanding for children at different ages.
          </p>
        </div>
      </div>

      {/* Why Quran Stories Matter */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
                Helping Children Connect with the Quran Through Story
              </h2>
              <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
                <p>
                  For many families, stories are one of the best ways to introduce children to the Quran. Stories make lessons easier to understand, easier to remember, and easier to connect to daily life.
                </p>
                <p>
                  Through Quran story books for children, kids can explore themes like trust, patience, gratitude, mercy, courage, and obedience to Allah in a way that feels engaging and age-appropriate.
                </p>
              </div>
            </div>
            <div>
              <img src="https://picsum.photos/seed/quranstories/800/600" alt="Child reading Quran stories" className="rounded-2xl shadow-xl w-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* What Children Learn */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">
              What Children Learn from Quran Stories
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Build love for Allah's words",
              "Connect values to real choices",
              "Understand examples from revelation",
              "Strengthen curiosity about Islam",
              "Develop a deeper sense of faith and belonging"
            ].map((item, i) => (
              <div key={i} className="bg-emerald-800/50 p-6 rounded-xl flex items-center">
                <Heart className="h-6 w-6 text-rose-400 mr-4 flex-shrink-0" />
                <span className="text-lg text-emerald-50">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Family Reading */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
              Quran Stories for Bedtime, Family Learning, and Reflection
            </h2>
            <p className="text-lg text-stone-600">
              These books work well for:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Bedtime Routines", icon: BookOpen },
              { title: "Weekend Family Reading", icon: Heart },
              { title: "Ramadan Family Moments", icon: Sparkles },
              { title: "Homeschooling or Islamic Learning at Home", icon: BookOpen },
              { title: "Classroom or School Support", icon: BookOpen }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <item.icon className="h-5 w-5 text-amber-600" />
                </div>
                <span className="font-medium text-stone-800">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connected Learning */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
            Go Beyond the Story
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-10">
            Our long-term vision is to connect Quran stories for kids with guided audio, activities, and interactive learning pathways so children can move from listening to understanding, reflection, and practice.
          </p>
          <Link to="/academy" className="inline-flex justify-center items-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors text-lg">
            Explore Interactive Learning
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-amber-50 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">
            Explore Quran Story Books for Children
          </h2>
          <p className="text-lg text-stone-600 mb-10">
            Browse age-appropriate stories designed to help Muslim kids discover the Quran with clarity, beauty, and love.
          </p>
          <Link to="/islamic-childrens-books" className="inline-flex justify-center items-center px-8 py-4 bg-emerald-800 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors text-lg">
            Shop Quran Stories <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
