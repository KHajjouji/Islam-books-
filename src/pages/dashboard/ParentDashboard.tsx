import { 
  TrendingUp, 
  BookOpen, 
  Award, 
  Clock, 
  ChevronRight, 
  CheckCircle2,
  Users,
  Sparkles
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight mb-2">
            Salaam, {user?.displayName?.split(' ')[0] || 'Parent'}!
          </h1>
          <p className="text-primary/60 font-medium">Welcome to your family's nurturing sanctuary. Here's how everyone is growing.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-surface-container-low text-primary rounded-full font-bold text-sm border border-outline-variant/10 hover:bg-primary/5 transition-all">
            View Analytics
          </button>
          <button className="px-6 py-3 bg-primary text-white rounded-full font-bold text-sm shadow-lg shadow-primary/10 hover:scale-[1.02] transition-all">
            Manage Family
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary text-white p-8 rounded-3xl shadow-xl shadow-primary/10 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <TrendingUp className="h-24 w-24" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Total Learning Time</p>
            <h3 className="text-4xl font-headline font-extrabold">124h</h3>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full">
            <Sparkles className="h-3 w-3" />
            <span>+12% from last month</span>
          </div>
        </div>

        <div className="bg-secondary text-primary p-8 rounded-3xl shadow-xl shadow-secondary/10 flex flex-col justify-between relative overflow-hidden group border border-primary/5">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <BookOpen className="h-24 w-24" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Books Completed</p>
            <h3 className="text-4xl font-headline font-extrabold">18</h3>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold bg-primary/5 w-fit px-3 py-1.5 rounded-full">
            <CheckCircle2 className="h-3 w-3" />
            <span>4 this week</span>
          </div>
        </div>

        <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <Award className="h-24 w-24" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-2">Badges Earned</p>
            <h3 className="text-4xl font-headline font-extrabold text-primary">42</h3>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold bg-primary/5 text-primary w-fit px-3 py-1.5 rounded-full">
            <Users className="h-3 w-3" />
            <span>Top 5% of learners</span>
          </div>
        </div>
      </div>

      {/* Children Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface border border-outline-variant/10 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-headline font-extrabold text-primary">Child Progress</h3>
            <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">View All</button>
          </div>
          <div className="space-y-8">
            {children.map((child) => (
              <div key={child.name} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-lg font-bold text-primary">{child.name}</h4>
                    <p className="text-xs text-primary/60 font-medium">Last read: {child.lastRead}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{child.progress}%</span>
                </div>
                <div className="h-3 bg-surface-container-low rounded-full overflow-hidden border border-outline-variant/5">
                  <div 
                    className={`h-full ${child.color === 'bg-accent' ? 'bg-secondary' : 'bg-primary'} rounded-full transition-all duration-1000`}
                    style={{ width: `${child.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface border border-outline-variant/10 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-headline font-extrabold text-primary">Recent Activity</h3>
            <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">Full Log</button>
          </div>
          <div className="space-y-6">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-primary">
                    <span className="text-primary">{activity.child}</span> {activity.action}
                  </p>
                  <p className="text-xs text-primary/60 font-medium">{activity.item}</p>
                </div>
                <span className="text-[10px] font-bold text-primary/30 uppercase tracking-tighter">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Next Steps */}
      <div className="bg-primary text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Sparkles className="h-48 w-48" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-headline font-extrabold mb-4">Ready for the next adventure?</h3>
          <p className="text-lg opacity-80 mb-8 font-medium">Based on Hakim's interest in Prophet stories, we recommend starting "The Story of Prophet Ibrahim" next.</p>
          <button className="px-8 py-4 bg-secondary text-primary rounded-full font-bold text-sm shadow-xl shadow-black/10 hover:scale-105 transition-all flex items-center gap-2">
            <span>Start Reading Now</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
