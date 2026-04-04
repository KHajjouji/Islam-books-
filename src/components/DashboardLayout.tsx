import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  CreditCard, 
  History, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  HelpCircle,
  Plus,
  BookOpen,
  Heart,
  User,
  ChevronRight,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

export default function DashboardLayout() {
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/subscription', label: 'Subscription', icon: CreditCard },
    { path: '/dashboard/orders', label: 'Orders', icon: History },
    { path: '/dashboard/profile', label: 'Family Profile', icon: Users },
  ];

  if (isAdmin) {
    menuItems.push({ path: '/admin', label: 'Admin Panel', icon: Settings });
  }

  return (
    <div className="min-h-screen bg-background flex font-body">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-primary text-white flex flex-col z-50 shadow-2xl">
        <div className="p-8 mb-4">
          <Link to="/" className="flex items-center gap-3 text-2xl font-headline font-black text-secondary tracking-tight">
            <div className="bg-secondary text-primary p-2 rounded-2xl shadow-lg shadow-secondary/20">
              <BookOpen className="h-6 w-6" />
            </div>
            <span>Noor Academy</span>
          </Link>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-3 ml-1">Parent Dashboard</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${
                location.pathname === item.path
                  ? 'bg-secondary text-primary shadow-xl shadow-secondary/10 scale-[1.02]'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 backdrop-blur-sm">
            <button className="w-full py-4 bg-secondary text-primary rounded-full font-black text-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-secondary/20">
              <Plus className="h-4 w-4" />
              <span>Enroll New Student</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-72 flex flex-col">
        {/* TopNavBar */}
        <header className="h-24 bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-outline-variant/10 px-10 flex items-center justify-between">
          <div className="flex items-center gap-4 bg-surface-container-low px-6 py-3 rounded-full w-[450px] border border-outline-variant/5 group focus-within:border-primary/20 transition-all">
            <Search className="h-5 w-5 text-primary/40 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search stories, lessons, or settings..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium placeholder:text-primary/30"
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/5 transition-all relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
              </button>
              <button className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/5 transition-all">
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 pl-8 border-l border-outline-variant/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black font-headline text-primary leading-none mb-1">{user.displayName || 'Parent'}</p>
                <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">Main Account Holder</p>
              </div>
              <div className="relative group">
                <img 
                  src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop'} 
                  alt="User Avatar" 
                  className="w-12 h-12 rounded-2xl object-cover shadow-md border-2 border-white group-hover:border-secondary transition-all"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <button 
                onClick={signOut}
                className="p-3 rounded-2xl hover:bg-red-50 text-red-400 hover:text-red-600 transition-all"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-10 flex-grow">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-outline-variant/10 bg-surface-container-low flex justify-between items-center text-[10px] font-bold text-primary/40 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Noor & Nurture. The Illuminated Path.</p>
          <div className="flex gap-6">
            <Link to="/support" className="hover:text-primary">Support</Link>
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
            <Link to="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
