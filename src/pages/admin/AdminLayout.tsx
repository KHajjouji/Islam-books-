import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Loader2, Users, Mail, CreditCard } from 'lucide-react';

export default function AdminLayout() {
  const { user, isAdmin, loading, signOut, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
        <h1 className="text-3xl font-headline font-black text-primary mb-4 tracking-tight">Admin Access Required</h1>
        <p className="text-primary/60 mb-8 font-medium">You must be logged in as an administrator to view this page.</p>
        <div className="flex gap-4">
          {!user && (
            <button 
              onClick={signInWithGoogle}
              className="px-8 py-4 bg-primary text-white font-black rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/10"
            >
              Sign In with Google
            </button>
          )}
          <Link to="/" className="px-8 py-4 bg-white text-primary border-2 border-primary/10 font-black rounded-full hover:bg-primary/5 transition-all">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Packs', path: '/admin/packs', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Campaigns', path: '/admin/campaigns', icon: Mail },
    { name: 'Subscriptions', path: '/admin/subscriptions', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-body">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-primary text-white flex flex-col shadow-2xl z-50">
        <div className="p-8 border-b border-white/10">
          <Link to="/" className="text-2xl font-headline font-black text-secondary tracking-tight">NoorKids Admin</Link>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2">Control Center</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                  isActive 
                    ? 'bg-secondary text-primary shadow-lg' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-white/10 bg-black/5">
          <div className="mb-4 px-2 text-xs font-bold text-white/40 truncate uppercase tracking-tighter">
            {user.email}
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-3 text-secondary hover:bg-white/10 rounded-xl transition-all font-bold text-sm"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-10 overflow-y-auto bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
