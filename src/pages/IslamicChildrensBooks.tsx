import { Link } from 'react-router-dom';
import { BookOpen, Star, Heart, Sparkles, ArrowRight, HelpCircle, Loader2, Zap, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import ProductCarousel from '../components/ProductCarousel';
import { useProducts } from '../hooks/useProducts';

export default function IslamicChildrensBooks() {
  const { products, loading } = useProducts();
  const allBooks = products.filter(p => p.category === 'book');

  return (
    <>
      <SEO 
        title="Islamic Children's Books for Muslim Families | Noor & Nurture"
        description="Explore a growing collection of Islamic children's books created to help Muslim kids learn faith, values, stories, and identity through beautiful storytelling."
      />
      
      {/* Header */}
      <div className="bg-surface-low py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
          <BookOpen className="w-64 h-64 text-primary" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Curated Collection</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-[1.1]">
            Islamic Children's Books <br className="hidden md:block" />
            <span className="text-accent-dark">for Muslim Families</span>
          </h1>
          <p className="text-lg md:text-2xl text-on-surface-variant font-medium leading-relaxed max-w-3xl mx-auto mb-12">
            Explore a growing collection of Islamic children's books created to help Muslim kids learn faith, values, stories, and identity through beautiful storytelling and thoughtful design.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Quran stories", "Prophet stories", "Ramadan and Eid", "Bedtime stories", "Islamic values", "Muslim identity"].map((tag, i) => (
              <span key={i} className="px-6 py-2 bg-primary/5 text-primary border border-primary/10 rounded-full text-sm font-bold uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* All Books Carousel */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <ProductCarousel products={allBooks} title="Shop All Books" />
          )}
        </div>
      </section>

      {/* Shop by Age */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
              <Zap className="h-4 w-4 text-accent-dark" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-dark">Growth Stages</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 tracking-tight">
              Islamic Books for Every <br /> Stage of Childhood
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                age: "Toddlers & Early Learners",
                desc: "Simple, visual, repetitive books that introduce Islamic vocabulary, family moments, and gentle faith-centered routines.",
                icon: Heart
              },
              {
                age: "Ages 4–7",
                desc: "Picture books and guided stories that help children understand values, Prophets, the Quran, and Muslim life in a warm format.",
                icon: Star
              },
              {
                age: "Ages 8–12",
                desc: "More detailed books that deepen understanding, build reflection, and support stronger independent learning.",
                icon: ShieldCheck
              }
            ].map((item, i) => (
              <div key={i} className="bg-background p-12 rounded-[3rem] shadow-xl shadow-primary/5 border border-outline-variant/10 group hover:border-primary/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-headline font-extrabold text-primary mb-4">{item.age}</h3>
                <p className="text-lg text-on-surface-variant font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Theme */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-6">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Explore Themes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 tracking-tight">
              Find the Right Islamic <br /> Story or Book Theme
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Quran Stories for Kids",
                desc: "Stories inspired by the Quran that help children understand lessons, values, and the beauty of divine guidance.",
                link: "/quran-stories-for-kids"
              },
              {
                title: "Stories of the Prophets",
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
                title: "Values & Character",
                desc: "Books that support akhlaq, adab, gratitude, honesty, patience, compassion, and trust in Allah.",
                link: "#"
              }
            ].map((item, i) => (
              <Link key={i} to={item.link} className="group block h-full">
                <div className="bg-surface p-10 rounded-[2.5rem] hover:bg-primary transition-all h-full flex flex-col border border-outline-variant/10 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-headline font-extrabold text-primary mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-lg text-on-surface-variant font-medium flex-grow group-hover:text-white/70 transition-colors leading-relaxed">{item.desc}</p>
                  <div className="mt-8 flex items-center text-primary font-bold group-hover:text-accent transition-colors">
                    Explore Theme <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Parents Choose These Books */}
      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 p-20 opacity-5 pointer-events-none">
          <Sparkles className="w-64 h-64 text-white" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-8 tracking-tight leading-tight">
                Why Families Choose Our <br /> Islamic Books for Children
              </h2>
              <p className="text-xl text-white/70 font-medium leading-relaxed">
                Parents are not only searching for information. They are searching for resources that children enjoy, remember, and ask to revisit.
              </p>
            </div>
            <div className="bg-white/10 rounded-[3rem] p-12 backdrop-blur-md border border-white/10 shadow-2xl">
              <p className="text-xl font-bold mb-8 text-accent">Our books are created to offer:</p>
              <ul className="space-y-6">
                {[
                  "Natural Islamic learning through storytelling",
                  "Age-appropriate language",
                  "Strong visual quality",
                  "Meaningful family use",
                  "Relevance for Muslim children in the West"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center mr-6 flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-secondary" />
                    </div>
                    <span className="text-lg font-medium text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-6">
              <HelpCircle className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Common Questions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
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
                a: "Yes. These are among the main pillars of our collection and reflect strong audience interest."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-surface p-10 rounded-[2.5rem] border border-outline-variant/10">
                <h3 className="text-xl font-headline font-extrabold text-primary mb-4">{faq.q}</h3>
                <p className="text-lg text-on-surface-variant font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
