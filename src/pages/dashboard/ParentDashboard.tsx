import { 
  TrendingUp, 
  BookOpen, 
  Award, 
  Clock, 
  ChevronRight, 
  CheckCircle2,
  Users,
  Sparkles,
  LayoutDashboard,
  CreditCard,
  History,
  Plus,
  Heart,
  ArrowRight,
  Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ParentDashboard() {
  const { user } = useAuth();

  const children = [
    { name: 'Hakim', age: 8, progress: 75, lastRead: 'The Story of Prophet Nuh', color: 'bg-primary' },
    { name: 'Hana', age: 6, progress: 45, lastRead: 'Quran Stories for Kids', color: 'bg-accent' },
  ];

  const recentActivity = [
    { child: 'Hakim', action: 'Completed Chapter 3', item: 'Prophet Stories', time: '2 hours ago' },
    { child: 'Hana', action: 'Earned a Badge', item: 'Ramadan Explorer', time: '5 hours ago' },
    { child: 'Hakim', action: 'Started new book', item: 'The Story of Prophet Musa', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-outline-variant/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full text-primary font-black text-xs uppercase tracking-widest mb-6 border border-primary/10">
              <Sparkles className="h-4 w-4" />
              <span>Level 4: Rising Star</span>
            </div>
            <h1 className="text-5xl font-headline font-black text-primary tracking-tight mb-4">
              As-Salamu Alaykum, {user?.displayName?.split(' ')[0] || 'Parent'}!
            </h1>
            <p className="text-lg text-primary/60 font-medium max-w-xl">
              Suleyman is making wonderful progress this week. He's currently a <span className="text-primary font-black underline decoration-secondary decoration-4 underline-offset-4">Prophet Story Explorer</span>.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 bg-primary text-white p-8 rounded-[2.5rem] shadow-2xl shadow-primary/20 min-w-[280px]">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Today's Goal</p>
              <p className="text-lg font-black">Read 'The Ark of Nuh' together</p>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-secondary w-[65%] rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            </div>
            <p className="text-xs font-bold opacity-80">65% of daily path complete</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Stories Read', value: '12', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
          { label: 'Quizzes Done', value: '8', icon: Award, color: 'bg-purple-50 text-purple-600' },
          { label: 'Total Learning Time', value: '4.5 hrs', icon: Clock, color: 'bg-green-50 text-green-600', chart: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-[3rem] p-10 shadow-sm border border-outline-variant/10 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500">
            <div className={`w-20 h-20 ${stat.color} rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-10 w-10" />
            </div>
            <h3 className="text-4xl font-headline font-black text-primary mb-2">{stat.value}</h3>
            <p className="text-sm font-bold text-primary/40 uppercase tracking-widest">{stat.label}</p>
            {stat.chart && (
              <div className="mt-6 flex items-end gap-1 h-12">
                {[40, 70, 45, 90, 60].map((h, j) => (
                  <div key={j} className="w-2 bg-primary/10 rounded-full overflow-hidden">
                    <div className="bg-primary rounded-full" style={{ height: `${h}%` }}></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Children Progress - Nurturing the Next Generation */}
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-headline font-black text-primary tracking-tight mb-2">Nurturing the Next Generation</h2>
            <p className="text-primary/60 font-medium">Active learner profiles under this account</p>
          </div>
          <button className="bg-secondary text-primary px-8 py-3 rounded-full font-black text-sm shadow-lg shadow-secondary/20 flex items-center gap-2 hover:scale-105 transition-transform">
            <Star className="h-4 w-4 fill-primary" />
            Premium Family Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {children.map((child) => (
            <div key={child.name} className="bg-white rounded-[3rem] p-10 shadow-sm border border-outline-variant/10 relative group hover:shadow-2xl transition-all duration-500">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl">
                  <img 
                    src={child.name === 'Hakim' ? 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop' : 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop'} 
                    alt={child.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="mt-16 text-center mb-10">
                <h3 className="text-2xl font-headline font-black text-primary mb-1">{child.name} Abdullah</h3>
                <p className="text-sm font-bold text-primary/40 uppercase tracking-widest">Age: {child.age} • Level: {child.name === 'Hakim' ? 'Explorer' : 'Seedling'}</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black text-primary uppercase tracking-widest">
                    <span>{child.name === 'Hakim' ? "QU'RAN JOURNEY" : "ARABIC LETTERS"}</span>
                    <span>{child.progress}%</span>
                  </div>
                  <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary rounded-full relative"
                      style={{ width: `${child.progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-secondary shadow-sm flex items-center justify-center">
                        <div className="w-1 h-1 bg-secondary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black text-primary uppercase tracking-widest">
                    <span>{child.name === 'Hakim' ? "ADAB & CHARACTER" : "PROPHET STORIES"}</span>
                    <span>{child.name === 'Hakim' ? '90%' : '65%'}</span>
                  </div>
                  <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary rounded-full relative"
                      style={{ width: `${child.name === 'Hakim' ? 90 : 65}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-secondary shadow-sm flex items-center justify-center">
                        <div className="w-1 h-1 bg-secondary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Profile */}
          <button className="bg-transparent rounded-[3rem] border-4 border-dashed border-outline-variant/20 p-10 flex flex-col items-center justify-center text-center group hover:border-primary/20 hover:bg-primary/5 transition-all duration-500">
            <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center text-primary/20 group-hover:text-primary group-hover:scale-110 transition-all mb-6">
              <Plus className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-headline font-black text-primary mb-2">Add New Profile</h3>
            <p className="text-sm font-medium text-primary/40">Expand your family journey</p>
          </button>
        </div>
      </div>
    </div>
  );
}
