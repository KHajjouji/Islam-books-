import { Link } from 'react-router-dom';
import { Star, Heart, BookOpen, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import SEO from '../components/SEO';

export default function ProphetStories() {
  return (
    <>
      <SEO 
        title="Stories of the Prophets for Kids in a Simple and Beautiful Format | Noor & Nurture"
        description="Explore stories of the Prophets for kids written to help children learn from the lives of Allah's messengers through simple language and meaningful values."
      />
      
      {/* Header */}
      <div className="bg-surface-low py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-8">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Prophetic Legacy</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-[1.1]">
            Stories of the Prophets <br className="hidden md:block" /> 
            <span className="text-accent-dark">for Modern Muslim Kids</span>
          </h1>
          <p className="text-lg md:text-2xl text-on-surface-variant font-medium leading-relaxed max-w-3xl mx-auto mb-12">
            Explore stories of the Prophets written to help children learn from the lives of Allah's messengers through simple language and meaningful values.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop" className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Explore Prophet Stories
            </Link>
            <Link to="/academy" className="w-full sm:w-auto px-10 py-5 bg-white text-primary border-2 border-primary rounded-full font-bold text-lg hover:bg-primary/5 transition-colors">
              Interactive Learning
            </Link>
          </div>
        </div>
      </div>

      {/* Purpose */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="bg-primary rounded-[3rem] p-4 shadow-2xl shadow-primary/20 relative z-10 overflow-hidden group">
                <img 
                  src="https://picsum.photos/seed/prophetstories/1200/900" 
                  alt="Prophet stories for kids" 
                  className="rounded-[2.5rem] w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent rounded-full -z-10 blur-3xl opacity-30"></div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
                <Heart className="h-3 w-3 text-accent-dark" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-dark">Character Building</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight leading-tight">
                Why Prophet Stories Matter for Muslim Children
              </h2>
              <div className="space-y-6 text-xl text-on-surface-variant font-medium leading-relaxed">
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
      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5">
          <Sparkles className="w-96 h-96" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
              <Zap className="h-3 w-3 text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Timeless Lessons</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-6 tracking-tight">
              Values Through Beautiful <br /> Storytelling
            </h2>
            <p className="text-xl text-white/70 font-medium">
              Each prophetic story gives children a way to reflect on important Islamic values:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { prophet: "Prophet Nuh", value: "Trust & Resilience" },
              { prophet: "Prophet Ibrahim", value: "Submission & Faith" },
              { prophet: "Prophet Musa", value: "Courage & Justice" },
              { prophet: "Prophet Yusuf", value: "Patience & Forgiveness" },
              { prophet: "Prophet Muhammad ﷺ", value: "Mercy & Character" }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all">
                <span className="text-xl font-headline font-extrabold text-white/90">{item.prophet}</span>
                <span className="bg-accent text-secondary px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-accent/20">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Use */}
      <section className="py-32 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-[2rem] bg-primary/5 flex items-center justify-center mx-auto mb-10">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight">
            Ideal for Family Reading and <br /> Islamic Learning at Home
          </h2>
          <p className="text-xl text-on-surface-variant font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
            These stories are designed for parents, teachers, and caregivers who want to make Islamic learning personal, calm, and memorable. They can be used for bedtime reading, family circles, weekend learning, and seasonal study.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Bedtime", icon: BookOpen },
              { title: "Weekend", icon: Star },
              { title: "Ramadan", icon: Sparkles },
              { title: "Schooling", icon: ShieldCheck }
            ].map((item, i) => (
              <div key={i} className="bg-background p-6 rounded-[2rem] border border-outline-variant/10 flex flex-col items-center gap-4">
                <item.icon className="h-6 w-6 text-primary" />
                <span className="font-bold text-primary">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-surface-low text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-primary/10 border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent rounded-full blur-[100px] opacity-20"></div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 tracking-tight">
              Find Prophet Story Books <br /> for Muslim Kids
            </h2>
            <p className="text-xl text-on-surface-variant font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Build a home library that helps children know the Prophets, love their examples, and grow through Islamic storytelling.
            </p>
            <Link to="/shop" className="inline-flex justify-center items-center px-10 py-5 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all text-lg shadow-xl shadow-primary/20">
              Shop Prophet Stories <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
