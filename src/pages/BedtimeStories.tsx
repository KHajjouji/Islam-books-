import { Link } from 'react-router-dom';
import { Moon, Star, Heart, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import SEO from '../components/SEO';

export default function BedtimeStories() {
  return (
    <>
      <SEO 
        title="Islamic Bedtime Stories for Peaceful Family Reading | Noor & Nurture"
        description="Discover Islamic bedtime stories that bring calm, reflection, and faith-centered family connection into your child's evening routine."
      />
      
      {/* Header */}
      <div className="bg-primary text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-8">
            <Moon className="h-4 w-4 text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Nightly Connection</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold mb-8 tracking-tight leading-[1.1]">
            Islamic Bedtime Stories for <br className="hidden md:block" /> 
            <span className="text-accent">Peaceful Family Reading</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/70 font-medium leading-relaxed max-w-3xl mx-auto mb-12">
            Discover Islamic bedtime stories that bring calm, reflection, and faith-centered family connection into your child's evening routine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop" className="w-full sm:w-auto px-10 py-5 bg-accent text-secondary rounded-full font-bold text-lg shadow-xl shadow-accent/20 hover:scale-105 transition-transform">
              Browse Bedtime Stories
            </Link>
            <Link to="/academy" className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white border-2 border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-colors">
              Audio Stories
            </Link>
          </div>
        </div>
      </div>

      {/* Why Bedtime Stories */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="bg-primary rounded-[3rem] p-4 shadow-2xl shadow-primary/20 relative z-10 overflow-hidden group">
                <img 
                  src="https://picsum.photos/seed/bedtime/1200/900" 
                  alt="Parent reading bedtime story" 
                  className="rounded-[2.5rem] w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent rounded-full -z-10 blur-3xl opacity-20"></div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
                <Heart className="h-3 w-3 text-accent-dark" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-dark">Gentle Nurturing</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-tight">
                A Gentle Way to End the Day with Faith and Family
              </h2>
              <div className="space-y-6 text-xl text-on-surface-variant font-medium leading-relaxed">
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
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-6">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Nightly Themes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 tracking-tight">
              Short Islamic Stories Children <br /> Can Understand and Love
            </h2>
            <p className="text-xl text-on-surface-variant font-medium">
              Bedtime stories can include:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Everyday Values", icon: Heart },
              { title: "Duas & Adhkar", icon: Sparkles },
              { title: "Family Kindness", icon: Star },
              { title: "Gratitude", icon: Zap },
              { title: "Quran Themes", icon: Moon },
              { title: "Ramadan Nights", icon: Sparkles },
              { title: "Character", icon: ShieldCheck },
              { title: "Faith", icon: Star }
            ].map((item, i) => (
              <div key={i} className="bg-background p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-outline-variant/10 group hover:border-primary/30 transition-all text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-headline font-extrabold text-primary">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Modern Family Life */}
      <section className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-8">
            <Zap className="h-4 w-4 text-accent-dark" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-dark">Modern Living</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight">
            Meaningful Reading for <br /> Busy Muslim Families
          </h2>
          <p className="text-xl text-on-surface-variant font-medium leading-relaxed max-w-3xl mx-auto">
            Not every family has time for long lessons. Bedtime stories give parents a simple and realistic way to make Islamic learning part of the day without pressure. A short story each night can build vocabulary, values, memory, and emotional connection over time.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-surface-low text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
          <Moon className="w-64 h-64 text-primary" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-primary text-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-primary/20">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-8 tracking-tight">
              Explore Islamic Bedtime Books <br /> and Story Collections
            </h2>
            <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Create a peaceful bedtime routine with stories that help your child feel calm, connected, and loved.
            </p>
            <Link to="/shop" className="inline-flex justify-center items-center px-10 py-5 bg-accent text-secondary font-bold rounded-full hover:scale-105 transition-all text-lg shadow-xl shadow-accent/20">
              Shop Bedtime Stories <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
