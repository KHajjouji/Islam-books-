import { Link } from 'react-router-dom';
import { BookOpen, Star, Heart, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ProductCarousel from '../components/ProductCarousel';
import { products } from '../data/products';

export default function IslamicChildrensBooks() {
  const allBooks = products.filter(p => p.category === 'book');

  return (
    <>
      <SEO 
        title="Islamic Children's Books for Muslim Families | NoorKids"
        description="Explore a growing collection of Islamic children's books created to help Muslim kids learn faith, values, stories, and identity through beautiful storytelling."
      />
      
      {/* Header */}
      <div className="bg-stone-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
            Islamic Children's Books for Muslim Families
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
            Explore a growing collection of Islamic children's books created to help Muslim kids learn faith, values, stories, and identity through beautiful storytelling and thoughtful design. Whether you are looking for Islamic books for kids, Muslim kids books, or meaningful gifts for young Muslim children, this collection is designed to support family learning in a practical and inspiring way.
          </p>
        </div>
      </div>

      {/* Shop Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
              A Curated Collection of Islamic Books for Kids
            </h2>
            <p className="text-lg text-stone-600">
              Our books are designed for families who want Islamic learning to feel calm, joyful, and engaging. You will find titles across different themes, ages, and reading moments, including:
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["Quran stories", "Prophet stories", "Ramadan and Eid", "Bedtime stories", "Islamic values and character", "Family life and Muslim identity"].map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-emerald-50 text-emerald-800 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Books Carousel */}
      <section className="py-12 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCarousel products={allBooks} title="Shop All Books" />
        </div>
      </section>

      {/* Shop by Age */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-12 text-center">
            Islamic Books for Every Stage of Childhood
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                age: "For Toddlers and Early Learners",
                desc: "Simple, visual, repetitive books that introduce Islamic vocabulary, family moments, and gentle faith-centered routines."
              },
              {
                age: "For Ages 4–7",
                desc: "Picture books and guided stories that help children understand values, Prophets, the Quran, and Muslim life in a warm and memorable format."
              },
              {
                age: "For Ages 8–12",
                desc: "More detailed books that deepen understanding, build reflection, and support stronger independent learning."
              }
            ].map((item, i) => (
              <div key={i} className="bg-stone-50 p-8 rounded-2xl shadow-sm border border-stone-100">
                <h3 className="text-xl font-bold text-emerald-800 mb-4">{item.age}</h3>
                <p className="text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Theme */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-12 text-center">
            Find the Right Islamic Story or Book Theme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Quran Stories for Kids",
                desc: "Stories inspired by the Quran that help children understand lessons, values, and the beauty of divine guidance.",
                link: "/quran-stories-for-kids"
              },
              {
                title: "Stories of the Prophets for Kids",
                desc: "Character-rich Islamic storytelling that introduces children to the lives and lessons of the Prophets.",
                link: "/stories-of-the-prophets-for-kids"
              },
              {
                title: "Ramadan Books for Kids",
                desc: "Books that help children connect with fasting, family traditions, kindness, gratitude, and the joy of Ramadan.",
                link: "/ramadan-books-for-kids"
              },
              {
                title: "Islamic Bedtime Stories",
                desc: "Short, meaningful stories that help make bedtime calm, reflective, and faith-centered.",
                link: "/islamic-bedtime-stories"
              },
              {
                title: "Islamic Values and Character",
                desc: "Books that support akhlaq, adab, gratitude, honesty, patience, compassion, and trust in Allah.",
                link: "#"
              }
            ].map((item, i) => (
              <Link key={i} to={item.link} className="group block h-full">
                <div className="bg-white p-8 rounded-2xl hover:bg-emerald-50 transition-colors h-full flex flex-col border border-stone-100 hover:border-emerald-100 shadow-sm">
                  <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-emerald-800 transition-colors">{item.title}</h3>
                  <p className="text-stone-600 flex-grow">{item.desc}</p>
                  <div className="mt-6 flex items-center text-emerald-600 font-medium">
                    Explore Theme <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Parents Choose These Books */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Why Families Choose Our Islamic Books for Children
            </h2>
            <p className="text-lg text-emerald-50/90">
              Parents are not only searching for information. They are searching for resources that children enjoy, remember, and ask to revisit.
            </p>
          </div>
          <div className="bg-emerald-800/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <p className="text-lg font-medium mb-6 text-emerald-100">Our books are created to offer:</p>
            <ul className="space-y-4">
              {[
                "Natural Islamic learning through storytelling",
                "Age-appropriate language",
                "Strong visual quality",
                "Meaningful family use",
                "Relevance for Muslim children growing up in Western societies"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <Sparkles className="h-6 w-6 text-amber-400 mr-4 flex-shrink-0" />
                  <span className="text-lg text-emerald-50">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              Frequently Asked Questions About Islamic Children's Books
            </h2>
          </div>
          <div className="space-y-8">
            {[
              {
                q: "What age are these Islamic books for?",
                a: "Our collection is designed for different age groups, from early learners to older children."
              },
              {
                q: "Are these books suitable for Muslim families in the West?",
                a: "Yes. The content is designed with the reality of Muslim family life in the West in mind."
              },
              {
                q: "Do you offer Quran stories and Prophet stories?",
                a: "Yes. These are among the main pillars of our collection and reflect strong audience interest in current market categories."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-stone-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-stone-900 mb-2">{faq.q}</h3>
                <p className="text-stone-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
