import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Heart, ArrowRight, Star, ShieldCheck, CheckCircle, Users, Zap } from 'lucide-react';
import SEO from '../components/SEO';

export default function QuranStories() {
  return (
    <>
      <SEO 
        title="Quran Stories for Kids That Build Faith, Character, and Curiosity | Noor & Nurture"
        description="Discover Quran stories for kids designed to help children connect with the message, values, and wisdom of the Quran in a simple and meaningful way."
      />
      
      {/* Header */}
      <div className="bg-surface-low py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Sacred Knowledge</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-[1.1]">
            Quran Stories for Kids That <br className="hidden md:block" /> 
            <span className="text-accent-dark">Build Faith & Character</span>
          </h1>
          <p className="text-lg md:text-2xl text-on-surface-variant font-medium leading-relaxed max-w-3xl mx-auto mb-12">
            Discover Quran stories designed to help children connect with the message, values, and wisdom of the Quran in a simple and meaningful way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop" className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Browse Quran Stories
            </Link>
            <Link to="/academy" className="w-full sm:w-auto px-10 py-5 bg-white text-primary border-2 border-primary rounded-full font-bold text-lg hover:bg-primary/5 transition-colors">
              Explore Academy
            </Link>
          </div>
        </div>
      </div>

      {/* Why Quran Stories Matter */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
                <Heart className="h-3 w-3 text-accent-dark" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-dark">Heart Connection</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-tight">
                Helping Children Connect with the Quran Through Story
              </h2>
              <div className="space-y-6 text-xl text-on-surface-variant font-medium leading-relaxed">
                <p>
                  For many families, stories are one of the best ways to introduce children to the Quran. Stories make lessons easier to understand, easier to remember, and easier to connect to daily life.
                </p>
                <p>
                  Through Quran story books for children, kids can explore themes like trust, patience, gratitude, mercy, courage, and obedience to Allah in a way that feels engaging and age-appropriate.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary rounded-[3rem] p-4 shadow-2xl shadow-primary/20 relative z-10 overflow-hidden group">
                <img 
                  src="https://picsum.photos/seed/quranstories/1200/900" 
                  alt="Child reading Quran stories" 
                  className="rounded-[2.5rem] w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              {/* Decorative Background Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent rounded-full -z-10 blur-3xl opacity-30"></div>
              <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-primary-light rounded-full -z-10 blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* What Children Learn */}
      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5">
          <Sparkles className="w-96 h-96" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
              <Star className="h-3 w-3 text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Learning Outcomes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-6 tracking-tight">
              What Children Learn from <br /> Quran Stories
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Build love for Allah's words",
              "Connect values to real choices",
              "Understand examples from revelation",
              "Strengthen curiosity about Islam",
              "Develop a deeper sense of faith",
              "Foster a sense of belonging"
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 flex items-center group hover:bg-white/10 transition-all">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-6 w-6 text-secondary" />
                </div>
                <span className="text-xl font-bold text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Family Reading */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-6">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Family Moments</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 tracking-tight">
              Quran Stories for Bedtime, <br /> Family Learning, and Reflection
            </h2>
            <p className="text-xl text-on-surface-variant font-medium">
              These books are perfect for creating meaningful connections:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Bedtime Routines", icon: BookOpen, desc: "End the day with faith and peace." },
              { title: "Weekend Family Reading", icon: Heart, desc: "Quality time centered on values." },
              { title: "Ramadan Family Moments", icon: Sparkles, desc: "Special stories for the blessed month." },
              { title: "Homeschooling Support", icon: ShieldCheck, desc: "Rooted resources for home education." },
              { title: "Islamic Schooling", icon: Star, desc: "Trusted content for classrooms." },
              { title: "Daily Reflection", icon: Zap, desc: "Quick lessons for busy families." }
            ].map((item, i) => (
              <div key={i} className="bg-background p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-outline-variant/10 group hover:border-primary/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-headline font-extrabold text-primary mb-3">{item.title}</h3>
                <p className="text-on-surface-variant/60 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connected Learning */}
      <section className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-8">
            <Zap className="h-4 w-4 text-accent-dark" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-dark">Future of Learning</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight">
            Go Beyond the Story
          </h2>
          <p className="text-xl text-on-surface-variant font-medium leading-relaxed mb-12">
            Our long-term vision is to connect Quran stories for kids with guided audio, activities, and interactive learning pathways so children can move from listening to understanding, reflection, and practice.
          </p>
          <Link to="/academy" className="inline-flex justify-center items-center px-10 py-5 bg-accent text-secondary font-bold rounded-full hover:scale-105 transition-all text-lg shadow-xl shadow-accent/20">
            Explore Interactive Learning <ArrowRight className="ml-3 h-6 w-6" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-surface-low text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Sparkles className="w-48 h-48" />
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-8 tracking-tight">
              Explore Quran Story Books <br /> for Children
            </h2>
            <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Browse age-appropriate stories designed to help Muslim kids discover the Quran with clarity, beauty, and love.
            </p>
            <Link to="/shop" className="inline-flex justify-center items-center px-10 py-5 bg-white text-primary font-bold rounded-full hover:scale-105 transition-all text-lg shadow-xl">
              Shop Quran Stories <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
