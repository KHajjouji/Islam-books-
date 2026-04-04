import { Link } from 'react-router-dom';
import { Moon, Star, Heart, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import SEO from '../components/SEO';

export default function RamadanBooks() {
  return (
    <>
      <SEO 
        title="Ramadan Books for Kids to Make the Month Meaningful | Noor & Nurture"
        description="Find Ramadan books for kids that help children understand the meaning of the month through stories, routines, values, and joyful family moments."
      />
      
      {/* Header */}
      <div className="bg-primary text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
          <Moon className="w-96 h-96 text-accent" />
        </div>
        <div className="absolute bottom-0 left-0 p-20 opacity-5 pointer-events-none">
          <Sparkles className="w-64 h-64 text-white" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-8">
            <Moon className="h-4 w-4 text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Blessed Month</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold mb-8 tracking-tight leading-[1.1]">
            Ramadan Books for Kids to <br className="hidden md:block" /> 
            <span className="text-accent">Make the Month Meaningful</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/70 font-medium leading-relaxed max-w-3xl mx-auto mb-12">
            Find Ramadan books that help children understand the meaning of the month through stories, routines, values, and joyful family moments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop" className="w-full sm:w-auto px-10 py-5 bg-accent text-secondary rounded-full font-bold text-lg shadow-xl shadow-accent/20 hover:scale-105 transition-transform">
              Browse Ramadan Books
            </Link>
            <Link to="/academy" className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white border-2 border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-colors">
              Ramadan Academy
            </Link>
          </div>
        </div>
      </div>

      {/* Why Ramadan Books */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
                <Heart className="h-3 w-3 text-accent-dark" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-dark">Spiritual Growth</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-tight">
                Helping Children Experience Ramadan with Understanding and Joy
              </h2>
              <div className="space-y-6 text-xl text-on-surface-variant font-medium leading-relaxed">
                <p>
                  Ramadan is a time of reflection, worship, gratitude, generosity, and family connection. Books help children understand these meanings in a way that fits their age and daily life.
                </p>
                <p>
                  Through Ramadan stories for kids, children can explore fasting, prayer, kindness, duas, community, Eid anticipation, and the beauty of the holy month.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="bg-primary rounded-[2.5rem] p-3 shadow-2xl shadow-primary/20 group overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/ramadan1/600/800" 
                  alt="Ramadan book" 
                  className="rounded-[2rem] w-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="bg-accent rounded-[2.5rem] p-3 shadow-2xl shadow-accent/20 mt-12 group overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/ramadan2/600/800" 
                  alt="Eid book" 
                  className="rounded-[2rem] w-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent rounded-full -z-10 blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Moments */}
      <section className="py-32 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-6">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Family Traditions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 tracking-tight">
              Books for Bedtime, Family Reading, <br /> and Ramadan Routines
            </h2>
            <p className="text-xl text-on-surface-variant font-medium">
              Our Ramadan books are ideal for creating lasting memories:
            </p>
          </div>
          <div className="bg-background p-12 md:p-16 rounded-[4rem] shadow-2xl shadow-primary/5 border border-outline-variant/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Bedtime during Ramadan",
                "Preparing children before the month",
                "Daily family reading circles",
                "Islamic school or home learning",
                "Introducing traditions simply",
                "Eid-ul-Fitr celebrations"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all">
                    <Star className="h-5 w-5 text-accent-dark group-hover:text-secondary" />
                  </div>
                  <span className="text-xl font-bold text-primary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
              <Zap className="h-4 w-4 text-accent-dark" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-dark">Core Themes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 tracking-tight">
              Themes Children Can <br /> Understand and Remember
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "What Ramadan is", icon: Moon },
              { title: "Why Muslims fast", icon: ShieldCheck },
              { title: "Ramadan Deeds", icon: Heart },
              { title: "Duas & Prayers", icon: Sparkles },
              { title: "Gratitude", icon: Star },
              { title: "Generosity", icon: Zap },
              { title: "Family Togetherness", icon: Moon },
              { title: "Preparing for Eid", icon: Sparkles }
            ].map((item, i) => (
              <div key={i} className="bg-surface p-10 rounded-[2.5rem] text-center border border-outline-variant/10 hover:border-primary/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-headline font-extrabold text-primary">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-surface-low text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 p-20 opacity-5 pointer-events-none">
          <Moon className="w-64 h-64 text-primary" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-primary text-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-primary/20">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-8 tracking-tight">
              Explore Ramadan Stories <br /> and Books for Kids
            </h2>
            <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Help your child enter Ramadan with knowledge, warmth, and positive memories through story-based learning.
            </p>
            <Link to="/shop" className="inline-flex justify-center items-center px-10 py-5 bg-accent text-secondary font-bold rounded-full hover:scale-105 transition-all text-lg shadow-xl shadow-accent/20">
              Shop Ramadan Books <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
