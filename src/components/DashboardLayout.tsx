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
  BookOpen
} from 'lucide-react';

export default function DashboardLayout() {
  const { user, signOut } = useAuth();
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

  return (
    <div className="min-h-screen bg-background flex font-body">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-outline-variant/30 p-6 flex flex-col z-50">
        <div className="mb-10 px-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-headline font-extrabold text-primary tracking-tight">
            <div className="bg-primary text-white p-1 rounded-lg">
              <BookOpen className="h-5 w-5" />
            </div>
            <span>Noor & Nurture</span>
          </Link>
          <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mt-2">Management Dashboard</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all hover:scale-[1.02] font-bold text-sm ${
                location.pathname === item.path
                  ? 'bg-accent text-secondary shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-low'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-surface-low rounded-2xl border border-outline-variant/20">
          <button className="w-full py-3 bg-primary text-white rounded-full font-bold text-sm transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-primary/10">
            <Plus className="h-4 w-4" />
            <span>Add New Member</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* TopNavBar */}
        <header className="h-20 bg-surface/80 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant/30 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 bg-surface-low px-4 py-2 rounded-full w-96 border border-outline-variant/10">
            <Search className="h-4 w-4 text-primary" />
            <input 
              type="text" 
              placeholder="Search profiles or settings..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <HelpCircle className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-outline-variant/30">
              <div className="text-right">
                <p className="text-xs font-bold font-headline">{user.displayName || 'Parent'}</p>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">Main Account Holder</p>
              </div>
              <img 
                src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop'} 
                alt="User Avatar" 
                className="w-10 h-10 rounded-xl object-cover shadow-sm border border-outline-variant/20"
              />
              <button 
                onClick={signOut}
                className="ml-2 p-2 rounded-full hover:bg-surface-low text-on-surface-variant transition-colors"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-outline-variant/30 bg-surface-low flex justify-between items-center text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
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
