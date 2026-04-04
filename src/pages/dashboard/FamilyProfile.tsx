import { 
  User, 
  Plus, 
  Settings, 
  Trash2, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Award,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function FamilyProfile() {
  const { user } = useAuth();

  const familyMembers = [
    { 
      name: 'Hakim', 
      age: 8, 
      role: 'Child', 
      progress: 75, 
      books: 12, 
      badges: 24,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop',
      color: 'bg-primary'
    },
    { 
      name: 'Hana', 
      age: 6, 
      role: 'Child', 
      progress: 45, 
      books: 6, 
      badges: 18,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=100&h=100&fit=crop',
      color: 'bg-accent'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight mb-2">Family Profile</h1>
          <p className="text-on-surface-variant font-medium">Manage your family members and their individual learning journeys.</p>
        </div>
        <button className="px-8 py-4 bg-primary text-white rounded-full font-bold text-sm shadow-lg shadow-primary/10 hover:scale-[1.02] transition-all flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add New Member</span>
        </button>
      </div>

      {/* Main Account Holder */}
      <div className="bg-surface-low border border-outline-variant/30 rounded-[3rem] p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <ShieldCheck className="h-48 w-48" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            <img 
              src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'} 
              alt="Main Account Holder" 
              className="w-32 h-32 rounded-[2rem] object-cover shadow-xl border-4 border-white"
            />
            <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <h2 className="text-3xl font-headline font-extrabold text-primary">{user?.displayName || 'Parent'}</h2>
              <span className="px-4 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">Main Account Holder</span>
            </div>
            <p className="text-on-surface-variant font-medium max-w-md">The primary account manager for the Noor & Nurture subscription. Only you can manage billing and add new members.</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <button className="px-6 py-3 bg-white text-primary rounded-full font-bold text-xs border border-outline-variant/20 hover:bg-outline-variant/10 transition-all flex items-center gap-2">
                <Settings className="h-3.5 w-3.5" />
                <span>Account Settings</span>
              </button>
              <button className="px-6 py-3 bg-white text-primary rounded-full font-bold text-xs border border-outline-variant/20 hover:bg-outline-variant/10 transition-all flex items-center gap-2">
                <User className="h-3.5 w-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Family Members Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-headline font-extrabold text-primary">Family Members</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {familyMembers.map((member) => (
            <div key={member.name} className="bg-surface border border-outline-variant/20 rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="relative shrink-0">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-24 h-24 rounded-3xl object-cover shadow-sm border border-outline-variant/10"
                  />
                  <div className={`absolute -bottom-2 -right-2 ${member.color} text-white p-1.5 rounded-lg shadow-md`}>
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-2xl font-headline font-extrabold text-primary">{member.name}</h4>
                      <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">{member.age} Years Old • {member.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2.5 rounded-xl bg-surface-low text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/10">
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className="p-2.5 rounded-xl bg-surface-low text-on-surface-variant hover:text-red-500 transition-colors border border-outline-variant/10">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-low p-4 rounded-2xl border border-outline-variant/10 flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary opacity-40" />
                      <div>
                        <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-tighter">Books</p>
                        <p className="text-lg font-bold text-primary">{member.books}</p>
                      </div>
                    </div>
                    <div className="bg-surface-low p-4 rounded-2xl border border-outline-variant/10 flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary opacity-40" />
                      <div>
                        <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-tighter">Badges</p>
                        <p className="text-lg font-bold text-primary">{member.badges}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      <span>Learning Progress</span>
                      <span>{member.progress}%</span>
                    </div>
                    <div className="h-2 bg-surface-low rounded-full overflow-hidden border border-outline-variant/10">
                      <div 
                        className={`h-full ${member.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${member.progress}%` }}
                      />
                    </div>
                  </div>

                  <button className="w-full py-3 bg-surface-low text-primary rounded-full font-bold text-xs border border-outline-variant/20 hover:bg-outline-variant/10 transition-all flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                    <span>View Full Report</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Member Placeholder */}
          <button className="bg-surface-low border-2 border-dashed border-outline-variant/30 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 group hover:border-primary hover:bg-primary/5 transition-all">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
              <Plus className="h-8 w-8" />
            </div>
            <div className="text-center">
              <h4 className="text-xl font-headline font-extrabold text-primary">Add Family Member</h4>
              <p className="text-xs text-on-surface-variant font-medium mt-1">Create a new learning profile</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
