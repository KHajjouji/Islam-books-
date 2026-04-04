import { Link } from 'react-router-dom';
import { BookOpen, Star, Heart, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import ProductCarousel from '../components/ProductCarousel';
import { useProducts } from '../hooks/useProducts';

export default function Home() {
  const { products, loading } = useProducts();
  const featuredBooks = products.filter(p => p.category === 'book').slice(0, 5);

  return (
    <>
      <SEO 
        title="Islamic Children's Books & Interactive Learning for Muslim Kids | NoorKids"
        description="Discover Islamic children's books, Quran stories for kids, Prophet stories, Ramadan books, and interactive Islamic learning for Muslim families in the West."
      />
      
      {/* Hero Section */}
      <section className="relative bg-noor-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 text-gradient">
              Islamic Children's Books and Interactive Learning for Muslim Kids
            </h1>
            <p className="text-lg md:text-xl text-noor-light-green mb-4 font-medium">
              Beautiful books, meaningful stories, and guided learning experiences designed to help Muslim children grow with love for Islam, strong identity, and joyful family connection.
            </p>
            <p className="text-base md:text-lg text-noor-light-green mb-10">
              From Quran stories for kids and stories of the Prophets for kids to Ramadan books, Islamic bedtime stories, and interactive learning journeys, we create resources for Muslim families raising children in the West.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="inline-flex justify-center items-center px-8 py-4 bg-noor-yellow text-noor-dark font-bold rounded-full hover:bg-noor-yellow/80 transition-colors text-lg">
                Shop All Products
              </Link>
              <Link to="/academy" className="inline-flex justify-center items-center px-8 py-4 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green border border-noor-green transition-colors text-lg">
                Explore the Academy
              </Link>
            </div>
            <p className="mt-8 text-sm text-noor-light-green/80 flex items-center gap-2">
              <Star className="h-4 w-4 fill-current" />
              Created for Muslim families looking for modern, high-quality, faith-centered learning through books, stories, and interactive content.
            </p>
          </div>
        </div>
      </section>

      {/* Why This Brand Exists */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-12 w-12 text-rose-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-noor-dark mb-6">
            Helping Muslim Children Learn Islam Through Stories, Books, and Daily Family Moments
          </h2>
          <div className="space-y-4 text-lg text-noor-dark/70 leading-relaxed">
            <p>
              Many Muslim parents are looking for more than information. They want their children to feel connected to Islam in a way that is warm, beautiful, and relevant to everyday life.
            </p>
            <p>
              They want Islamic books for kids that are visually strong, easy to use, and rooted in faith. They want Muslim kids books that help children understand values, Prophets, Quran stories, Ramadan, duas, and identity in a language and format that fits family life in the West.
            </p>
            <p className="font-medium text-noor-dark/90">
              That is why we are building a complete ecosystem of Islamic children's books, story-based learning, and interactive experiences that help children love their deen from an early age.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Pathways */}
      <section className="py-20 bg-noor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-noor-dark mb-4">
              Start with the Learning Journey That Fits Your Family
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Islamic Children's Books",
                text: "Discover beautifully designed Islamic books for children across themes like faith, character, family, Ramadan, and everyday Muslim life.",
                link: "/islamic-childrens-books",
                icon: BookOpen,
                color: "bg-blue-50 text-blue-700"
              },
              {
                title: "Quran Stories for Kids",
                text: "Introduce children to the Quran through simple, age-appropriate stories that build curiosity, values, and love for Allah's guidance.",
                link: "/quran-stories-for-kids",
                icon: Sparkles,
                color: "bg-noor-cream text-noor-yellow"
              },
              {
                title: "Stories of the Prophets for Kids",
                text: "Help children connect with the Prophets through meaningful storytelling that teaches patience, courage, kindness, trust, and sincerity.",
                link: "/stories-of-the-prophets-for-kids",
                icon: Star,
                color: "bg-noor-light-green text-noor-green"
              },
              {
                title: "Interactive Islamic Learning",
                text: "Go beyond the book with guided pathways, audio, activities, and future-ready learning experiences designed for Muslim kids.",
                link: "/academy",
                icon: ArrowRight,
                color: "bg-purple-50 text-purple-700"
              }
            ].map((card, idx) => (
              <Link key={idx} to={card.link} className="group block h-full">
                <div className="bg-white rounded-2xl p-8 shadow-sm card-hover border border-noor-light-green h-full flex flex-col">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${card.color}`}>
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-noor-dark mb-3 group-hover:text-noor-green transition-colors">{card.title}</h3>
                  <p className="text-noor-dark/70 flex-grow">{card.text}</p>
                  <div className="mt-6 flex items-center text-noor-green font-medium">
                    Explore <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Carousel */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-noor-green" />
            </div>
          ) : (
            <ProductCarousel products={featuredBooks} title="Featured Islamic Books for Kids" />
          )}
          <div className="mt-12 text-center">
            <Link to="/shop" className="text-noor-green font-bold hover:text-noor-green flex items-center justify-center">
              View all products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Story-Based Learning */}
      <section className="py-20 bg-noor-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Why Stories Are One of the Best Ways to Teach Islam to Children
          </h2>
          <div className="space-y-6 text-lg text-noor-light-green/90 leading-relaxed">
            <p>
              Children learn deeply through repetition, emotion, imagery, and connection. Stories make abstract values easier to understand. They help children remember lessons, identify with characters, and build love for Islam through experience rather than instruction alone.
            </p>
            <p>
              That is why story-led learning is at the heart of our platform. From Quran stories for kids to Prophet stories for children and Islamic bedtime stories, our goal is to help families teach deen in a natural and memorable way.
            </p>
          </div>
        </div>
      </section>

      {/* For Muslim Families in the West */}
      <section className="py-20 bg-noor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img src="https://picsum.photos/seed/muslimfamily/800/600" alt="Muslim family reading together" className="rounded-2xl shadow-xl w-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-noor-dark mb-6">
                Made for Muslim Families Raising Children in the West
              </h2>
              <div className="space-y-4 text-lg text-noor-dark/70 leading-relaxed">
                <p>
                  Muslim families in the West often look for Islamic resources that are rooted in faith but also understand their daily reality: school life, language shifts, identity questions, social pressure, and the challenge of making Islamic learning part of busy routines.
                </p>
                <p>
                  Our books and learning experiences are designed with that reality in mind. We aim to support families who want Islamic education to feel accessible, joyful, and relevant, without losing depth, beauty, or authenticity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Learning / Academy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-noor-light-green rounded-3xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-noor-dark mb-6">
              Interactive Islamic Learning Beyond the Book
            </h2>
            <p className="text-lg text-noor-dark/80 mb-8 max-w-3xl mx-auto">
              Our vision goes beyond publishing. We are building a connected learning experience where children can read, listen, interact, and grow through guided Islamic content.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10 text-left">
              {[
                "Story-based learning journeys",
                "Audio-supported reading",
                "Child-friendly activities",
                "Parent-guided learning moments",
                "Future interactive experiences connected to books and themes"
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm flex items-start">
                  <Sparkles className="h-5 w-5 text-noor-orange/80 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-noor-dark font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-noor-dark/80 mb-8 max-w-2xl mx-auto">
              For families searching for online Islamic classes for kids, interactive Islamic learning, or a more structured way to support faith at home, this is where books and guided learning come together.
            </p>
            <Link to="/academy" className="inline-flex justify-center items-center px-8 py-4 bg-noor-orange text-white font-bold rounded-full hover:bg-noor-orange transition-colors text-lg">
              Discover the Academy
            </Link>
          </div>
        </div>
      </section>

      {/* Email Lead Magnet */}
      <section className="py-24 bg-noor-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-noor-dark mb-6">
            Get a Free Islamic Story Resource for Your Family
          </h2>
          <p className="text-lg text-noor-dark/70 mb-8">
            Join our email list to receive early access to new books, seasonal resources, family reading ideas, and a free story-based printable or sample chapter for Muslim kids.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-6 py-4 rounded-full border border-noor-light-green/80 focus:outline-none focus:ring-2 focus:ring-noor-green/80 focus:border-transparent text-lg"
              required
            />
            <button type="submit" className="px-8 py-4 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green transition-colors text-lg whitespace-nowrap">
              Download Free Resource
            </button>
          </form>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-noor-dark mb-6">
            Build a Home Library That Helps Your Child Love Islam
          </h2>
          <p className="text-lg text-noor-dark/70 mb-10">
            Explore Islamic children's books, Quran stories for kids, stories of the Prophets for kids, and interactive learning resources designed to support Muslim families with beauty, clarity, and purpose.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="inline-flex justify-center items-center px-8 py-4 bg-noor-green text-white font-bold rounded-full hover:bg-noor-green transition-colors text-lg">
              Shop All Products
            </Link>
            <Link to="/academy" className="inline-flex justify-center items-center px-8 py-4 bg-noor-light-green text-noor-dark font-bold rounded-full hover:bg-noor-light-green/50 transition-colors text-lg">
              Join the Academy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
