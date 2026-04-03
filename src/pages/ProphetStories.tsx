import { Link } from 'react-router-dom';
import { Star, Heart, BookOpen, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function ProphetStories() {
  return (
    <>
      <SEO 
        title="Stories of the Prophets for Kids in a Simple and Beautiful Format | NoorKids"
        description="Explore stories of the Prophets for kids written to help children learn from the lives of Allah's messengers through simple language and meaningful values."
      />
      
      {/* Header */}
      <div className="bg-noor-light-green py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="h-12 w-12 text-noor-green mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-noor-dark mb-6 text-gradient">
            Stories of the Prophets for Kids in a Simple and Beautiful Format
          </h1>
          <p className="text-lg md:text-xl text-noor-dark/70 leading-relaxed">
            Explore stories of the Prophets for kids written to help children learn from the lives of Allah's messengers through simple language, memorable storytelling, and meaningful values.
          </p>
        </div>
      </div>

      {/* Purpose */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img src="https://picsum.photos/seed/prophetstories/800/600" alt="Prophet stories for kids" className="rounded-2xl shadow-xl w-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-serif font-bold text-noor-dark mb-6">
                Why Prophet Stories Matter for Muslim Children
              </h2>
              <div className="space-y-4 text-lg text-noor-dark/70 leading-relaxed">
                <p>
                  The stories of the Prophets are not just history. They are a source of guidance, character formation, and emotional strength for Muslim children.
                </p>
                <p>
                  Through Prophet stories for kids, children can learn about courage, patience, obedience, trust in Allah, leadership, mercy, and perseverance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-noor-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Timeless Lessons Through Beautiful Storytelling
            </h2>
            <p className="text-lg text-noor-light-green/80">
              Each prophetic story gives children a way to reflect on important Islamic values:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { prophet: "Prophet Nuh", value: "Trust" },
              { prophet: "Prophet Ibrahim", value: "Submission" },
              { prophet: "Prophet Musa", value: "Courage" },
              { prophet: "Prophet Yusuf", value: "Patience" },
              { prophet: "Prophet Muhammad ﷺ", value: "Mercy" }
            ].map((item, i) => (
              <div key={i} className="bg-noor-dark/90 p-6 rounded-xl flex items-center justify-between border border-noor-dark/80">
                <span className="text-lg font-medium text-noor-green/60">{item.prophet}</span>
                <span className="text-noor-light-green/80 bg-noor-dark/80 px-3 py-1 rounded-full text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Use */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-12 w-12 text-rose-400 mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-noor-dark mb-6">
            Ideal for Family Reading and Islamic Learning at Home
          </h2>
          <p className="text-lg text-noor-dark/70 leading-relaxed mb-10">
            These stories are designed for parents, teachers, and caregivers who want to make Islamic learning personal, calm, and memorable. They can be used for bedtime reading, family circles, weekend learning, and seasonal study.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-noor-light-green text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-noor-dark mb-6">
            Find Prophet Story Books for Muslim Kids
          </h2>
          <p className="text-lg text-noor-dark/70 mb-10">
            Build a home library that helps children know the Prophets, love their examples, and grow through Islamic storytelling.
          </p>
          <Link to="/islamic-childrens-books" className="inline-flex justify-center items-center px-8 py-4 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green transition-colors text-lg">
            Shop Prophet Stories <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
